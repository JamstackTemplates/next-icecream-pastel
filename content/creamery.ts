// Creamery details. Edit this file to make the website yours.
// Everything here is placeholder content for a fictitious scoop shop. The sample address is a
// well-known public landmark (20 Times Square, New York) so the map has something to show; replace it with yours.
// Plain strings only: text is rendered as text, never as HTML.

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const DAYS: readonly Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export interface OpeningHours {
  /** Weekday name. */
  day: Day;
  /** 24-hour "HH:MM" local time, e.g. "12:00". Omit both to mark the day closed. */
  opens?: string;
  /** 24-hour "HH:MM" local time, e.g. "20:00". Omit both to mark the day closed. */
  closes?: string;
}

export interface Amenity {
  /** Icon name from components/icons.tsx. */
  icon: 'cup' | 'cone' | 'tub';
  /** Short feature heading. */
  title: string;
  /** Brief supporting detail. */
  detail: string;
}

export interface Faq {
  /** Question heading shown in the accordion summary. */
  question: string;
  /** Plain-text answer shown when expanded. */
  answer: string;
}

export interface CreameryLink {
  /** Visible profile name, e.g. "Instagram". */
  label: string;
  /** Absolute https:// URL. Entries with an empty URL are not rendered. */
  url: string;
}

export interface EnquiriesConfig {
  /** Page and section heading for party and catering enquiries. */
  title: string;
  /** Introductory sentence shown above the form or email fallback. */
  introduction: string;
  /** Helpful details visitors can include in their message. */
  usefulToInclude: string[];
  /** Clear scope note explaining that submitting is an enquiry only. */
  disclaimer: string;
}

export interface Address {
  /** Street number and name. */
  street: string;
  /** City or neighbourhood. */
  locality: string;
  /** State, province or region code. */
  region: string;
  /** Postal or ZIP code. */
  postalCode: string;
  /** ISO 3166-1 alpha-2 country code, e.g. "US". */
  country: string;
  /** Optional landmark or sample-location note shown beside the address. */
  note: string;
}

export interface Creamery {
  /** Business name shown in the header, metadata and schema.org data. */
  name: string;
  /** Short line under the name or in page titles. */
  tagline: string;
  /** One or two sentences: the first thing visitors read. */
  introduction: string;
  /** Home page story paragraphs. */
  story: string[];
  /** Public contact address. Choose an address you are happy to publish. */
  email: string;
  /** Public phone number as written for people, e.g. "(212) 555-0147". Set to '' to hide it. */
  phone: string;
  /** Postal address used for Find us, map links and structured data. */
  address: Address;
  /** How to find you using nearby streets and transit landmarks. */
  directions: string[];
  /** Local times in the creamery's time zone, which is set by `timeZone` in site.config.json. */
  hours: OpeningHours[];
  /** Optional one-off notice such as holiday hours. Set to '' to hide it. */
  notice: string;
  /** Highlighted shop offerings (cups/cones, plant-based recipes, take-home tubs). */
  amenities: Amenity[];
  /** Frequently asked questions on the home page. */
  faqs: Faq[];
  /** Public social or map profiles. Leave `url` empty to hide an entry. */
  links: CreameryLink[];
  /** Copy for the Contact / Parties & catering enquiries page. */
  enquiries: EnquiriesConfig;
}

export const creamery: Creamery = {
  name: 'Cloudpetal Creamery',
  tagline: 'Small scoops. Soft afternoons.',
  introduction:
    'A sunny neighbourhood scoop shop churning small batches of ice cream and fruit sorbets, scooped into cups, waffle cones or take-home tubs.',
  story: [
    'Cloudpetal Creamery began with a tiny tasting counter and a fondness for unhurried afternoons — the kind where choosing between two flavours is the biggest decision of the day.',
    'We churn in small batches each week with real fruit, toasted nuts and cocoa, keeping both dairy classics and plant-based sorbets on the board for a quick pause at the counter.',
  ],
  email: 'hello@example.com',
  phone: '(212) 555-0147',
  address: {
    street: '20 Times Square',
    locality: 'New York',
    region: 'NY',
    postalCode: '10036',
    country: 'US',
    note: 'Sample location — northeast corner of 7th Avenue and West 47th Street',
  },
  directions: [
    'Set at the northeast corner of 7th Avenue and West 47th Street (sample landmark address).',
    'A short walk from Times Sq–42 St subway station via 7th Avenue, or two blocks south from 49 St station.',
  ],
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '12:00', closes: '20:00' },
    { day: 'Wednesday', opens: '12:00', closes: '20:00' },
    { day: 'Thursday', opens: '12:00', closes: '20:00' },
    { day: 'Friday', opens: '12:00', closes: '21:00' },
    { day: 'Saturday', opens: '12:00', closes: '21:00' },
    { day: 'Sunday', opens: '12:00', closes: '19:00' },
  ],
  notice: '',
  amenities: [
    {
      icon: 'cup',
      title: 'Cups or crisp waffle cones',
      detail: 'Cups are included with every scoop, or upgrade to a rolled waffle cone and toppings at the counter.',
    },
    {
      icon: 'cone',
      title: 'Dairy & plant-based tubs',
      detail: 'Alongside our dairy ice creams, we churn oat, coconut and fruit-water sorbets without dairy ingredients.',
    },
    {
      icon: 'tub',
      title: 'Take-home tubs',
      detail: 'Bring a 500ml or 1000ml tub home, packed to order from the flavours currently in the counter.',
    },
  ],
  faqs: [
    {
      question: 'Which flavours are on the counter?',
      answer:
        'Our flavour counter lists the current lineup and marks tubs that have been scooped out, though stock can change before you arrive. Ask at the counter for what is freshly scooped right now.',
    },
    {
      question: 'Do you have recipes made without dairy ingredients?',
      answer:
        'Yes. Our sorbets, coconut and oat-based flavours are made without dairy ingredients and are clearly marked on the flavours page.',
    },
    {
      question: 'Can you accommodate allergies?',
      answer:
        'Our ingredient markers describe recipes only and are not an allergy-safe guarantee. All tubs are scooped on shared equipment in a kitchen that handles dairy, nuts, soy and gluten, so please ask at the counter before ordering.',
    },
    {
      question: 'Can I choose a cup or cone?',
      answer:
        'Every single ($5), double ($7.50) or triple ($9.50) scoop includes a cup. You can also upgrade to a waffle cone ($1) or add toppings like chocolate drizzle or wafer pieces.',
    },
    {
      question: 'Can I take a tub home?',
      answer:
        'Yes — we pack 500ml ($10) and 1000ml ($18) take-home tubs from any flavour available on the counter at the time of your visit.',
    },
    {
      question: 'Can I enquire about a party?',
      answer:
        'Yes. Send us a note through the Contact page with your preferred date, approximate guest count, location and flavour preferences, and we will reply to discuss availability and details.',
    },
  ],
  links: [
    // Add your public profiles. Entries with an empty URL are hidden, so no dead links ship.
    { label: 'Instagram', url: '' },
    { label: 'TikTok', url: '' },
    { label: 'Google Maps', url: '' },
  ],
  enquiries: {
    title: 'Parties & catering enquiries',
    introduction: 'Tell us about your gathering. We’ll reply to discuss availability and the details.',
    usefulToInclude: [
      'Preferred date and time',
      'Approximate guest count',
      'Event location',
      'Flavour preferences and ingredient questions',
    ],
    disclaimer: 'This is an enquiry. Nothing is booked, ordered or paid for until we reply and confirm the details.',
  },
};

/** Profile links that have a non-empty URL. */
export const publicLinks = creamery.links.filter(link => link.url.trim() !== '');

/** Single-line postal address. */
export function formatAddress(address = creamery.address): string {
  return `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`;
}

/** "12:00" → "12pm", "20:00" → "8pm", "12:30" → "12:30pm". */
export function formatTime(value: string): string {
  const [h, m] = value.split(':').map(Number);
  const suffix = h >= 12 && h < 24 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}

/** "12pm – 8pm" or "Closed". */
export function formatHours(entry: OpeningHours): string {
  return entry.opens && entry.closes ? `${formatTime(entry.opens)} – ${formatTime(entry.closes)}` : 'Closed';
}

/** Consecutive days with the same hours, e.g. [{ label: 'Tue – Thu', hours: '12pm – 8pm' }]. */
export function groupedHours(hours = creamery.hours): { label: string; hours: string }[] {
  const groups: { days: Day[]; hours: string }[] = [];
  for (const entry of hours) {
    const text = formatHours(entry);
    const last = groups.at(-1);
    if (last && last.hours === text) last.days.push(entry.day);
    else groups.push({ days: [entry.day], hours: text });
  }
  const short = (day: Day) => day.slice(0, 3);
  return groups.map(group => ({
    label: group.days.length === 1 ? group.days[0] : `${short(group.days[0])} – ${short(group.days.at(-1)!)}`,
    hours: group.hours,
  }));
}

/** Minutes after midnight for "HH:MM". */
export function toMinutes(value: string): number {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
}

export type OpenState = { open: true; closes: string } | { open: false; next?: { day: Day; opens: string } };

/**
 * Whether the shop is open at a given local day/time. Pure, so it is unit tested and
 * the browser only supplies the current time in the shop's time zone.
 */
export function openState(day: Day, minutes: number, hours = creamery.hours): OpenState {
  const today = hours.find(entry => entry.day === day);
  if (today?.opens && today.closes) {
    const openAt = toMinutes(today.opens);
    const closeAt = toMinutes(today.closes);
    if (closeAt < openAt) {
      // Overnight interval starting today (e.g. 18:00–02:00).
      if (minutes >= openAt) return { open: true, closes: today.closes };
    } else if (minutes >= openAt && minutes < closeAt) {
      return { open: true, closes: today.closes };
    }
  }
  const start = DAYS.indexOf(day);
  // Also check yesterday for an overnight shift spilling past midnight into today.
  const yesterday = hours.find(entry => entry.day === DAYS[(start + 6) % 7]);
  if (yesterday?.opens && yesterday.closes && toMinutes(yesterday.closes) < toMinutes(yesterday.opens)) {
    if (minutes < toMinutes(yesterday.closes)) {
      return { open: true, closes: yesterday.closes };
    }
  }
  for (let offset = 0; offset < 8; offset++) {
    const candidate = DAYS[(start + offset) % 7];
    const entry = hours.find(item => item.day === candidate);
    if (!entry?.opens || !entry.closes) continue;
    if (offset === 0 && minutes >= toMinutes(entry.opens)) continue;
    return { open: false, next: { day: candidate, opens: entry.opens } };
  }
  return { open: false };
}
