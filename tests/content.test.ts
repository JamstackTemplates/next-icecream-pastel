import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  DAYS,
  creamery,
  formatTime,
  openState,
  publicLinks,
  toMinutes,
  type OpeningHours,
} from '../content/creamery.ts';
import {
  BASES,
  DIETS,
  allFlavours,
  allItems,
  allTakeHome,
  counterFlavours,
  counterOrder,
  featuredFlavours,
  flavourById,
  formatPrice,
  isAvailable,
  menu,
  scoopPrices,
  seasonalCalendar,
  type Diet,
  type FlavourItem,
  type FlavourPattern,
  type FlavourTone,
} from '../content/menu.ts';
import {
  businessLocalMonth,
  isEligibleInMonth,
  plannedForCurrentMonth,
} from '../lib/flavour-season.ts';
import { localClock } from '../lib/local-time.ts';
import { filterFlavours } from '../lib/menu-filter.ts';

const VALID_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_ANCHORS = new Set(['main', 'find-us', 'seasonal-calendar', 'scoop-sizes', 'extras', 'take-home-summary']);
const VALID_TONES = new Set<FlavourTone>(['mint', 'strawberry', 'vanilla', 'lavender', 'chocolate', 'peach']);
const VALID_PATTERNS = new Set<FlavourPattern>(['none', 'chips', 'ripple', 'pieces', 'seeds']);
const VALID_BASES = new Set(Object.keys(BASES));
const VALID_DIETS = new Set(Object.keys(DIETS) as Diet[]);
const VALID_TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

function hasAtMostTwoDecimals(amount: number): boolean {
  return Number.isFinite(amount) && amount >= 0 && Math.round(amount * 100) === amount * 100;
}

test('creamery details, story, FAQs and links are valid', () => {
  assert.ok(creamery.name.trim().length > 0, 'creamery.name must be nonempty');
  assert.ok(creamery.tagline.trim().length > 0, 'creamery.tagline must be nonempty');
  assert.ok(creamery.introduction.trim().length > 0, 'creamery.introduction must be nonempty');
  assert.ok(creamery.story.length >= 2 && creamery.story.every(p => p.trim().length > 0), 'creamery.story must have nonempty paragraphs');
  assert.match(creamery.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'creamery.email must look like a public email address');
  assert.ok(creamery.address.street.trim() && creamery.address.locality.trim() && creamery.address.country.trim(), 'creamery.address is incomplete');
  assert.ok(creamery.directions.length > 0 && creamery.directions.every(d => d.trim().length > 0), 'creamery.directions must be nonempty');
  assert.equal(creamery.faqs.length, 6, 'creamery.faqs must have six questions');
  for (const [i, faq] of creamery.faqs.entries()) {
    assert.ok(faq.question.trim().length > 0 && faq.answer.trim().length > 0, `FAQ #${i + 1} must have question and answer`);
  }
  assert.ok(creamery.enquiries.title.trim().length > 0, 'creamery.enquiries.title must be nonempty');
  assert.ok(creamery.enquiries.introduction.trim().length > 0, 'creamery.enquiries.introduction must be nonempty');
  assert.ok(creamery.enquiries.usefulToInclude.length > 0, 'creamery.enquiries.usefulToInclude must be nonempty');
  assert.ok(creamery.enquiries.disclaimer.trim().length > 0, 'creamery.enquiries.disclaimer must be nonempty');

  for (const link of creamery.links) {
    assert.ok(link.label.trim().length > 0, 'every social link needs a label');
    if (link.url.trim() !== '') {
      const parsed = new URL(link.url);
      assert.equal(parsed.protocol, 'https:', `link "${link.label}" must use https://`);
    }
  }
  assert.ok(publicLinks.every(link => link.url.startsWith('https://')));
});

test('opening hours cover all seven weekdays with valid times and closed-day omissions', () => {
  assert.equal(creamery.hours.length, 7, 'creamery.hours must have 7 entries');
  const seenDays = new Set<string>();
  for (const entry of creamery.hours) {
    assert.ok(DAYS.includes(entry.day), `unknown weekday "${entry.day}"`);
    assert.ok(!seenDays.has(entry.day), `duplicate weekday "${entry.day}"`);
    seenDays.add(entry.day);

    const hasOpen = entry.opens !== undefined;
    const hasClose = entry.closes !== undefined;
    assert.equal(hasOpen, hasClose, `${entry.day}: omit both opens and closes for a closed day`);
    if (hasOpen && hasClose) {
      assert.match(entry.opens!, VALID_TIME, `${entry.day}: invalid opens time "${entry.opens}"`);
      assert.match(entry.closes!, VALID_TIME, `${entry.day}: invalid closes time "${entry.closes}"`);
      assert.notEqual(toMinutes(entry.opens!), toMinutes(entry.closes!), `${entry.day}: zero-length interval`);
    }
  }
  assert.equal(seenDays.size, 7, 'every weekday Monday–Sunday must appear once');
});

test('opening hours logic handles Monday closure, Sunday-to-Tuesday next opening, DST and overnight hours', () => {
  // Monday is closed -> opens Tuesday at 12:00
  const monday = openState('Monday', 13 * 60);
  assert.deepEqual(monday, { open: false, next: { day: 'Tuesday', opens: '12:00' } });

  // Sunday after 19:00 closing -> skips closed Monday, opens Tuesday at 12:00
  const sundayClosed = openState('Sunday', 19 * 60);
  assert.deepEqual(sundayClosed, { open: false, next: { day: 'Tuesday', opens: '12:00' } });

  // Opening inclusive, closing exclusive
  assert.deepEqual(openState('Tuesday', 12 * 60), { open: true, closes: '20:00' });
  assert.deepEqual(openState('Tuesday', 20 * 60), { open: false, next: { day: 'Wednesday', opens: '12:00' } });
  assert.equal(formatTime('12:00'), '12pm');
  assert.equal(formatTime('20:00'), '8pm');

  // Overnight hours support
  const overnightHours: OpeningHours[] = [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '18:00', closes: '02:00' },
    { day: 'Wednesday', opens: '12:00', closes: '20:00' },
    { day: 'Thursday', opens: '12:00', closes: '20:00' },
    { day: 'Friday', opens: '12:00', closes: '20:00' },
    { day: 'Saturday', opens: '12:00', closes: '20:00' },
    { day: 'Sunday', opens: '12:00', closes: '20:00' },
  ];
  assert.deepEqual(openState('Tuesday', 23 * 60, overnightHours), { open: true, closes: '02:00' });
  assert.deepEqual(openState('Wednesday', 1 * 60, overnightHours), { open: true, closes: '02:00' });
  assert.deepEqual(openState('Wednesday', 2 * 60, overnightHours), { open: false, next: { day: 'Wednesday', opens: '12:00' } });

  // DST transition in America/New_York (spring forward 2026-03-08 02:00 -> 03:00)
  const springDst = localClock('America/New_York', new Date('2026-03-08T17:30:00Z')); // 13:30 EDT
  assert.ok(springDst !== null);
  assert.equal(springDst.day, 'Sunday');
  assert.equal(springDst.minutes, 13 * 60 + 30);
});

test('menu IDs, prices, currency, diet wording and item invariants are valid', () => {
  assert.equal(menu.currency, 'USD');
  assert.equal(menu.locale, 'en-US');
  assert.ok(scoopPrices.length >= 1, 'scoopPrices must be nonempty');
  const scoopLabels = new Set<string>();
  for (const size of scoopPrices) {
    assert.ok(size.label.trim().length > 0, 'scoop size label must be nonempty');
    assert.ok(!scoopLabels.has(size.label), `duplicate scoop size label "${size.label}"`);
    scoopLabels.add(size.label);
    assert.ok(hasAtMostTwoDecimals(size.amount), `invalid scoop price for "${size.label}"`);
  }
  assert.equal(formatPrice(5), '$5');
  assert.equal(formatPrice(7.5), '$7.50');

  const seenIds = new Set<string>();
  for (const section of menu.sections) {
    assert.match(section.id, VALID_ID, `section "${section.id}" must be URL-safe`);
    assert.ok(!RESERVED_ANCHORS.has(section.id), `section "${section.id}" collides with a reserved anchor`);
    assert.ok(!seenIds.has(section.id), `duplicate ID "${section.id}"`);
    seenIds.add(section.id);
    assert.ok(section.title.trim().length > 0 && section.description.trim().length > 0, `section "${section.id}" needs title and description`);

    for (const item of section.items) {
      assert.match(item.id, VALID_ID, `item "${item.id}" must be URL-safe`);
      assert.ok(!RESERVED_ANCHORS.has(item.id), `item "${item.id}" collides with a reserved anchor`);
      assert.ok(!seenIds.has(item.id), `duplicate ID "${item.id}"`);
      seenIds.add(item.id);
      assert.ok(item.name.trim().length > 0 && item.description.trim().length > 0, `item "${item.id}" needs name and description`);

      if (item.available !== undefined) assert.equal(typeof item.available, 'boolean', `item "${item.id}" available must be boolean`);
      if (item.featured !== undefined) assert.equal(typeof item.featured, 'boolean', `item "${item.id}" featured must be boolean`);

      if (typeof item.price === 'number') {
        assert.ok(hasAtMostTwoDecimals(item.price), `item "${item.id}" has invalid price`);
      } else {
        assert.ok(item.price.length > 0, `item "${item.id}" size price array must be nonempty`);
        const sizeSet = new Set<string>();
        for (const sp of item.price) {
          assert.ok(sp.label.trim().length > 0 && !sizeSet.has(sp.label), `item "${item.id}" has invalid size label "${sp.label}"`);
          sizeSet.add(sp.label);
          assert.ok(hasAtMostTwoDecimals(sp.amount), `item "${item.id}" size "${sp.label}" has invalid amount`);
        }
      }

      for (const diet of item.diet ?? []) {
        assert.ok(VALID_DIETS.has(diet), `item "${item.id}" has unknown diet "${diet}"`);
      }

      if (item.kind === 'flavour') {
        assert.equal(item.art, 'tub', `flavour "${item.id}" must have art: 'tub'`);
        assert.ok(VALID_BASES.has(item.base), `flavour "${item.id}" has unknown base "${item.base}"`);
        assert.ok(VALID_TONES.has(item.tone), `flavour "${item.id}" has unknown tone "${item.tone}"`);
        assert.ok(VALID_PATTERNS.has(item.pattern), `flavour "${item.id}" has unknown pattern "${item.pattern}"`);
        assert.strictEqual(item.price, scoopPrices, `flavour "${item.id}" should share scoopPrices`);

        if (item.base === 'dairy') {
          assert.ok(!item.diet?.includes('vegan'), `dairy flavour "${item.id}" cannot be vegan`);
          assert.ok(!item.diet?.includes('dairy-free-ingredients'), `dairy flavour "${item.id}" cannot be marked dairy-free-ingredients`);
        }
        if (item.diet?.includes('vegan')) {
          assert.ok(item.diet.includes('dairy-free-ingredients'), `vegan flavour "${item.id}" must include dairy-free-ingredients`);
        }

        assert.ok(item.months.length >= 1 && item.months.length <= 12, `flavour "${item.id}" months must be 1–12 entries`);
        const monthSet = new Set<number>();
        for (const m of item.months) {
          assert.ok(Number.isInteger(m) && m >= 1 && m <= 12, `flavour "${item.id}" has invalid month ${m}`);
          assert.ok(!monthSet.has(m), `flavour "${item.id}" has duplicate month ${m}`);
          monthSet.add(m);
        }
      } else {
        assert.equal(item.kind, 'take-home');
        assert.equal(item.art, 'take-home', `take-home "${item.id}" must have art: 'take-home'`);
        assert.ok(item.volumeMl > 0, `take-home "${item.id}" volumeMl must be positive`);
        assert.equal(item.flavourChoice, 'counter-selection');
        assert.ok(!item.featured, `take-home "${item.id}" must not be featured on the flavour counter`);
      }
    }
  }

  for (const extra of menu.extras) {
    assert.match(extra.id, VALID_ID, `extra "${extra.id}" must be URL-safe`);
    assert.ok(!seenIds.has(extra.id), `duplicate ID "${extra.id}"`);
    seenIds.add(extra.id);
    assert.ok(extra.name.trim().length > 0, `extra "${extra.id}" needs a name`);
    assert.ok(hasAtMostTwoDecimals(extra.price), `extra "${extra.id}" has invalid price`);
    for (const diet of extra.diet ?? []) {
      assert.ok(VALID_DIETS.has(diet), `extra "${extra.id}" has unknown diet "${diet}"`);
    }
  }

  assert.match(DIETS['dairy-free-ingredients'].label, /Made without dairy ingredients/);
  assert.match(DIETS['gluten-free-ingredients'].label, /Made without gluten ingredients/);
  assert.ok(menu.notes.length >= 2 && menu.notes.every(n => n.trim().length > 0), 'menu.notes must include legend and shared-equipment notice');
  assert.ok(menu.notes.some(n => /shared equipment/i.test(n)), 'menu.notes must disclose shared equipment');
});

test('counterOrder and seasonalCalendar invariants hold', () => {
  assert.ok(counterOrder.length >= 4 && counterOrder.length <= 8, 'counterOrder should have 4–8 flavours');
  const seenCounter = new Set<string>();
  for (const id of counterOrder) {
    assert.ok(!seenCounter.has(id), `duplicate id "${id}" in counterOrder`);
    seenCounter.add(id);
    const item = allItems.find(x => x.id === id);
    assert.ok(item && item.kind === 'flavour', `counterOrder id "${id}" must reference a flavour`);
  }
  assert.equal(counterFlavours.length, counterOrder.length);

  assert.equal(seasonalCalendar.length, 12, 'seasonalCalendar must cover 12 months');
  const seenMonths = new Set<number>();
  for (const entry of seasonalCalendar) {
    assert.ok(Number.isInteger(entry.month) && entry.month >= 1 && entry.month <= 12, `invalid calendar month ${entry.month}`);
    assert.ok(!seenMonths.has(entry.month), `duplicate calendar month ${entry.month}`);
    seenMonths.add(entry.month);
    assert.ok(entry.flavourIds.length >= 1 && entry.flavourIds.length <= 2, `month ${entry.month} should reference 1–2 flavours`);
    assert.ok(entry.note.trim().length > 0, `month ${entry.month} needs a note`);
    const seenIds = new Set<string>();
    for (const id of entry.flavourIds) {
      assert.ok(!seenIds.has(id), `duplicate flavour "${id}" in month ${entry.month}`);
      seenIds.add(id);
      const flavour = flavourById.get(id);
      assert.ok(flavour, `calendar month ${entry.month} references unknown flavour "${id}"`);
      assert.ok(isEligibleInMonth(flavour, entry.month), `flavour "${id}" is not eligible in month ${entry.month}`);
    }
  }
});

test('seed demonstration coverage: twelve flavours, eight featured, four bases, unavailable and seasonal items', () => {
  assert.equal(allFlavours.length, 12, 'seed should include 12 flavours');
  assert.equal(allTakeHome.length, 2, 'seed should include 2 take-home tubs');
  assert.equal(featuredFlavours.length, 8, 'seed should include 8 featured flavours');
  assert.ok(featuredFlavours.filter(isAvailable).length >= 4, 'at least 4 featured flavours must be available');
  assert.ok(allFlavours.some(f => !isAvailable(f)), 'seed should include an unavailable flavour');
  for (const base of Object.keys(BASES)) {
    assert.ok(allFlavours.some(f => f.base === base), `seed should cover base "${base}"`);
  }
  assert.ok(allFlavours.some(f => f.months.length < 12), 'seed should include seasonal flavours');
  assert.ok(filterFlavours(allFlavours, 'dairy-free-ingredients').length > 0);
  assert.ok(filterFlavours(allFlavours, 'seasonal').length === 3);
});

test('flavour-season pure selectors handle boundaries, invalid zones, out-of-season IDs and sold-out flavours', () => {
  // Missing or invalid time zone -> neutral null
  assert.equal(businessLocalMonth(new Date('2026-07-15T12:00:00Z'), ''), null);
  assert.equal(businessLocalMonth(new Date('2026-07-15T12:00:00Z'), 'Mars/Olympus'), null);
  assert.equal(plannedForCurrentMonth(new Date('2026-07-15T12:00:00Z'), '', seasonalCalendar, allFlavours), null);

  // UTC vs America/New_York month boundary (2026-01-01T03:00:00Z is still Dec 31 22:00 in New York)
  const decNy = plannedForCurrentMonth(new Date('2026-01-01T03:00:00Z'), 'America/New_York', seasonalCalendar, allFlavours);
  assert.equal(decNy?.month, 12);
  assert.equal(decNy?.monthLabel, 'December');
  assert.equal(decNy?.flavours[0]?.flavour.id, 'blueberry-lavender');

  // One hour later: 2026-01-01T05:00:00Z is Jan 1 00:00 in New York
  const janNy = plannedForCurrentMonth(new Date('2026-01-01T05:00:00Z'), 'America/New_York', seasonalCalendar, allFlavours);
  assert.equal(janNy?.month, 1);
  assert.equal(janNy?.monthLabel, 'January');
  assert.equal(janNy?.flavours[0]?.flavour.id, 'blueberry-lavender');

  // Out-of-season ID is filtered out; sold-out current flavour remains marked available: false
  const soldOutSeasonal: FlavourItem = {
    ...allFlavours[0],
    id: 'winter-test',
    available: false,
    months: [12, 1],
  };
  const customCal = [{ month: 1, flavourIds: ['peach-postcard', 'winter-test', 'missing-id'], note: 'Test' }];
  const res = plannedForCurrentMonth(new Date('2026-01-15T12:00:00Z'), 'America/New_York', customCal, [...allFlavours, soldOutSeasonal]);
  assert.equal(res?.flavours.length, 1);
  assert.equal(res?.flavours[0]?.flavour.id, 'winter-test');
  assert.equal(res?.flavours[0]?.available, false);

  // Empty selection in calendar
  const emptyRes = plannedForCurrentMonth(new Date('2026-06-15T12:00:00Z'), 'America/New_York', [{ month: 6, flavourIds: [], note: 'Pause' }], allFlavours);
  assert.deepEqual(emptyRes?.flavours, []);
});
