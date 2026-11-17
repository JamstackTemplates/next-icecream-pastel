// The scoop-shop menu. Add, remove, reorder or mark flavours sold out here; every page reads from this file.
// Flavour names, prices and seasonal plans are sample content — replace them with your own.
// Plain strings only: text is rendered as text, never as HTML.

/** Size and price pair, e.g. Single $5. */
export interface SizePrice {
  /** Display label for the size, e.g. "Single". */
  label: string;
  /** Finite nonnegative price in USD with at most two decimal places. */
  amount: number;
}

/** Ingredient and recipe markers shown on flavours and toppings. Never an allergy-safe guarantee. */
export type Diet =
  | 'vegetarian'
  | 'vegan'
  | 'dairy-free-ingredients'
  | 'gluten-free-ingredients'
  | 'contains-nuts';

export const DIETS: Record<Diet, { label: string; short: string }> = {
  vegetarian: { label: 'Vegetarian', short: 'V' },
  vegan: { label: 'Vegan', short: 'VG' },
  'dairy-free-ingredients': { label: 'Made without dairy ingredients', short: 'DF' },
  'gluten-free-ingredients': { label: 'Made without gluten ingredients', short: 'GF' },
  'contains-nuts': { label: 'Contains nuts', short: 'N' },
};

/** Pastel tub colour tokens mapped to CSS variables in app/tailwind.input.css. */
export type FlavourTone = 'mint' | 'strawberry' | 'vanilla' | 'lavender' | 'chocolate' | 'peach';

/** Decorative inclusion motif drawn inside the tub SVG. */
export type FlavourPattern = 'none' | 'chips' | 'ripple' | 'pieces' | 'seeds';

/** Recipe base shown beside each flavour. */
export type FlavourBase = 'dairy' | 'oat' | 'coconut' | 'fruit-water';

export const BASES: Record<FlavourBase, { label: string }> = {
  dairy: { label: 'Dairy' },
  oat: { label: 'Oat base' },
  coconut: { label: 'Coconut base' },
  'fruit-water': { label: 'Fruit sorbet' },
};

/** Standard scoop sizes and prices shared by the hero price rail and every flavour record. */
export const scoopPrices: SizePrice[] = [
  { label: 'Single', amount: 5 },
  { label: 'Double', amount: 7.5 },
  { label: 'Triple', amount: 9.5 },
];

export interface BaseMenuItem {
  /** Unique, URL-safe id used for page anchors such as /menu/#vanilla-cloud. */
  id: string;
  /** Visible item title. */
  name: string;
  /** Short plain-text description. */
  description: string;
  /** Single price or array of size prices in USD. */
  price: number | SizePrice[];
  /** Optional recipe/ingredient markers. */
  diet?: Diet[];
  /** Optional highlight badge. */
  badge?: 'signature' | 'seasonal' | 'new';
  /** Set to false to mark "Scooped out" without deleting the record. Missing means available. */
  available?: boolean;
  /** Whether to highlight this flavour on the home counter. */
  featured?: boolean;
}

export interface FlavourItem extends BaseMenuItem {
  /** Discriminant for counter flavours. */
  kind: 'flavour';
  /** Illustration kind matching `kind`. */
  art: 'tub';
  /** Primary recipe base. */
  base: FlavourBase;
  /** Theme-token colour for the tub illustration. */
  tone: FlavourTone;
  /** Inclusion motif inside the tub illustration. */
  pattern: FlavourPattern;
  /** Distinct month integers 1–12 when this flavour is planned; all 12 means year-round. */
  months: number[];
}

export interface TakeHomeItem extends BaseMenuItem {
  /** Discriminant for take-home tubs. */
  kind: 'take-home';
  /** Illustration kind matching `kind`. */
  art: 'take-home';
  /** Tub volume in millilitres. */
  volumeMl: number;
  /** How flavours are chosen for take-home tubs. */
  flavourChoice: 'counter-selection';
}

export type MenuItem = FlavourItem | TakeHomeItem;

export interface MenuSection {
  /** Unique, URL-safe section id used as a page anchor. */
  id: string;
  /** Section heading. */
  title: string;
  /** Short supporting line under the section heading. */
  description: string;
  /** Items in display order. */
  items: MenuItem[];
}

export interface Extra {
  /** Unique, URL-safe extra id. */
  id: string;
  /** Topping or cone upgrade name. */
  name: string;
  /** Price in USD. */
  price: number;
  /** Optional availability flag; missing means available. */
  available?: boolean;
  /** Optional ingredient markers. */
  diet?: Diet[];
}

export interface SeasonalEntry {
  /** Calendar month number (1 = January, 12 = December). */
  month: number;
  /** Ordered flavour IDs planned for this month. */
  flavourIds: string[];
  /** Short note for the month. */
  note: string;
}

export interface Menu {
  /** ISO 4217 currency code. */
  currency: 'USD';
  /** Locale used for Intl.NumberFormat. */
  locale: 'en-US';
  /** Menu sections in display order. */
  sections: MenuSection[];
  /** Cones and toppings offered with scoops. */
  extras: Extra[];
  /** Visible legend and shared-equipment notes. */
  notes: string[];
}

const ALL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const menu: Menu = {
  currency: 'USD',
  locale: 'en-US',
  sections: [
    {
      id: 'flavours',
      title: 'Flavour counter',
      description: 'Twelve small-batch recipes. Owner-published availability can change at the counter before your visit.',
      items: [
        {
          id: 'vanilla-cloud',
          name: 'Vanilla Cloud',
          description: 'Steeped Madagascar vanilla bean in sweet cream, whipped light and speckled with pods.',
          price: scoopPrices,
          diet: ['vegetarian', 'gluten-free-ingredients'],
          badge: 'signature',
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'dairy',
          tone: 'vanilla',
          pattern: 'seeds',
          months: ALL_MONTHS,
        },
        {
          id: 'strawberry-ribbon',
          name: 'Strawberry Ribbon',
          description: 'Sweet-cream ice cream folded with tart macerated strawberry compote.',
          price: scoopPrices,
          diet: ['vegetarian', 'gluten-free-ingredients'],
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'dairy',
          tone: 'strawberry',
          pattern: 'ripple',
          months: ALL_MONTHS,
        },
        {
          id: 'cocoa-daydream',
          name: 'Cocoa Daydream',
          description: 'Velvety Dutch-process cocoa with crisp dark chocolate flakes.',
          price: scoopPrices,
          diet: ['vegetarian', 'gluten-free-ingredients'],
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'dairy',
          tone: 'chocolate',
          pattern: 'chips',
          months: ALL_MONTHS,
        },
        {
          id: 'mint-confetti',
          name: 'Mint Confetti',
          description: 'Fresh garden mint steeped in cream and dotted with bittersweet chocolate shards.',
          price: scoopPrices,
          diet: ['vegetarian', 'gluten-free-ingredients'],
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'dairy',
          tone: 'mint',
          pattern: 'chips',
          months: ALL_MONTHS,
        },
        {
          id: 'oat-cookie-cloud',
          name: 'Oat Cookie Cloud',
          description: 'Toasted oat base swirled with brown-sugar oat cookie crumble.',
          price: scoopPrices,
          diet: ['vegan', 'dairy-free-ingredients'],
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'oat',
          tone: 'vanilla',
          pattern: 'pieces',
          months: ALL_MONTHS,
        },
        {
          id: 'lemon-daylight',
          name: 'Lemon Daylight Sorbet',
          description: 'Bright pressed lemon juice and grated zest churned into a clean, icy sorbet.',
          price: scoopPrices,
          diet: ['vegan', 'dairy-free-ingredients', 'gluten-free-ingredients'],
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'fruit-water',
          tone: 'vanilla',
          pattern: 'none',
          months: ALL_MONTHS,
        },
        {
          id: 'raspberry-ripple',
          name: 'Raspberry Ripple Sorbet',
          description: 'Crushed red raspberries ribboned through tangy berry sorbet.',
          price: scoopPrices,
          diet: ['vegan', 'dairy-free-ingredients', 'gluten-free-ingredients'],
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'fruit-water',
          tone: 'strawberry',
          pattern: 'ripple',
          months: ALL_MONTHS,
        },
        {
          id: 'pistachio-petal',
          name: 'Pistachio Petal',
          description: 'Roasted green pistachio cream studded with lightly salted pistachio pieces.',
          price: scoopPrices,
          diet: ['vegetarian', 'contains-nuts', 'gluten-free-ingredients'],
          available: false,
          featured: true,
          kind: 'flavour',
          art: 'tub',
          base: 'dairy',
          tone: 'mint',
          pattern: 'pieces',
          months: ALL_MONTHS,
        },
        {
          id: 'coconut-snow',
          name: 'Coconut Snow',
          description: 'Silky pressed coconut cream with a soft, clean tropical finish.',
          price: scoopPrices,
          diet: ['vegan', 'dairy-free-ingredients', 'gluten-free-ingredients'],
          kind: 'flavour',
          art: 'tub',
          base: 'coconut',
          tone: 'vanilla',
          pattern: 'none',
          months: ALL_MONTHS,
        },
        {
          id: 'peach-postcard',
          name: 'Peach Postcard Sorbet',
          description: 'Ripe yellow peaches and diced stone-fruit pieces churned for warm afternoons.',
          price: scoopPrices,
          diet: ['vegan', 'dairy-free-ingredients', 'gluten-free-ingredients'],
          badge: 'seasonal',
          kind: 'flavour',
          art: 'tub',
          base: 'fruit-water',
          tone: 'peach',
          pattern: 'pieces',
          months: [6, 7, 8],
        },
        {
          id: 'maple-wafer',
          name: 'Maple Wafer',
          description: 'Amber maple cream folded with crisp caramelised wafer bits.',
          price: scoopPrices,
          diet: ['vegetarian'],
          badge: 'seasonal',
          kind: 'flavour',
          art: 'tub',
          base: 'dairy',
          tone: 'vanilla',
          pattern: 'pieces',
          months: [9, 10, 11],
        },
        {
          id: 'blueberry-lavender',
          name: 'Blueberry Lavender',
          description: 'Wild blueberry swirl in sweet cream kissed with dried culinary lavender.',
          price: scoopPrices,
          diet: ['vegetarian', 'gluten-free-ingredients'],
          badge: 'seasonal',
          kind: 'flavour',
          art: 'tub',
          base: 'dairy',
          tone: 'lavender',
          pattern: 'ripple',
          months: [12, 1, 2, 3, 4, 5],
        },
      ],
    },
    {
      id: 'take-home',
      title: 'Take-home tubs',
      description: 'Packed to order from whichever flavours are on the counter when you visit.',
      items: [
        {
          id: 'little-cloud-tub',
          name: 'Little Cloud Tub',
          description: '500ml insulated tub packed with up to two flavours from the counter.',
          price: 10,
          kind: 'take-home',
          art: 'take-home',
          volumeMl: 500,
          flavourChoice: 'counter-selection',
        },
        {
          id: 'sharing-cloud-tub',
          name: 'Sharing Cloud Tub',
          description: '1000ml insulated tub packed with up to three flavours from the counter.',
          price: 18,
          kind: 'take-home',
          art: 'take-home',
          volumeMl: 1000,
          flavourChoice: 'counter-selection',
        },
      ],
    },
  ],
  extras: [
    { id: 'waffle-cone-upgrade', name: 'Waffle cone upgrade', price: 1, diet: ['vegetarian'] },
    { id: 'chocolate-drizzle', name: 'Chocolate drizzle', price: 0.75, diet: ['vegetarian', 'gluten-free-ingredients'] },
    { id: 'wafer-pieces', name: 'Wafer pieces', price: 0.75, diet: ['vegetarian'] },
    { id: 'toasted-nut-pieces', name: 'Toasted nut pieces', price: 1, diet: ['vegan', 'dairy-free-ingredients', 'gluten-free-ingredients', 'contains-nuts'] },
  ],
  notes: [
    'Cups are included with every scoop. V vegetarian · VG vegan · DF made without dairy ingredients · GF made without gluten ingredients · N contains nuts.',
    'Ingredient markers describe recipes only and are not an allergy-safe guarantee. All tubs are scooped on shared equipment in a kitchen that handles dairy, nuts, soy and gluten.',
  ],
};

/** Ordered unique flavour IDs shown on the home page counter rack. */
export const counterOrder: string[] = [
  'vanilla-cloud',
  'strawberry-ribbon',
  'cocoa-daydream',
  'mint-confetti',
  'oat-cookie-cloud',
  'lemon-daylight',
  'raspberry-ripple',
  'pistachio-petal',
];

/** Heading and note for the twelve-month seasonal flavour rotation. */
export const seasonalCalendarMeta = {
  heading: 'A year of little daydreams',
  note: 'A planned rotation, subject to change. Ask at the counter for current stock.',
};

/** Twelve-month planned seasonal flavour rotation referencing flavour records. */
export const seasonalCalendar: SeasonalEntry[] = [
  { month: 1, flavourIds: ['blueberry-lavender'], note: 'Cool-weather floral berry' },
  { month: 2, flavourIds: ['blueberry-lavender'], note: 'Cool-weather floral berry' },
  { month: 3, flavourIds: ['blueberry-lavender'], note: 'Early spring berry swirl' },
  { month: 4, flavourIds: ['blueberry-lavender'], note: 'Springtime blueberry & lavender' },
  { month: 5, flavourIds: ['blueberry-lavender'], note: 'Final weeks before summer' },
  { month: 6, flavourIds: ['peach-postcard'], note: 'Early summer stone fruit' },
  { month: 7, flavourIds: ['peach-postcard'], note: 'Peak sunny peach sorbet' },
  { month: 8, flavourIds: ['peach-postcard'], note: 'Late summer orchard batch' },
  { month: 9, flavourIds: ['maple-wafer'], note: 'First autumn maple batch' },
  { month: 10, flavourIds: ['maple-wafer'], note: 'Crisp wafer & amber maple' },
  { month: 11, flavourIds: ['maple-wafer'], note: 'Late autumn maple cream' },
  { month: 12, flavourIds: ['blueberry-lavender'], note: 'Winter berry & lavender return' },
];

/** Every menu item, in section order. */
export const allItems: MenuItem[] = menu.sections.flatMap(section => section.items);

/** All flavour records, in menu order. */
export const allFlavours: FlavourItem[] = allItems.filter((item): item is FlavourItem => item.kind === 'flavour');

/** All take-home tub records, in menu order. */
export const allTakeHome: TakeHomeItem[] = allItems.filter((item): item is TakeHomeItem => item.kind === 'take-home');

/** Lookup map of flavours by ID. */
export const flavourById = new Map<string, FlavourItem>(allFlavours.map(item => [item.id, item]));

/** Flavours displayed in the home page counter rack, in `counterOrder`. */
export const counterFlavours: FlavourItem[] = counterOrder
  .map(id => flavourById.get(id))
  .filter((item): item is FlavourItem => Boolean(item));

/** Flavours marked `featured: true`. */
export const featuredFlavours: FlavourItem[] = allFlavours.filter(item => item.featured);

const formatter = new Intl.NumberFormat(menu.locale, { style: 'currency', currency: menu.currency });

/** "$5", "$7.50", or "Free" for $0. */
export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  const text = formatter.format(amount);
  return Number.isInteger(amount) ? text.replace(/[.,]00(?=\D*$)/, '') : text;
}

/** Lowest price, for compact summaries. */
export function startingPrice(item: BaseMenuItem): number {
  return typeof item.price === 'number' ? item.price : Math.min(...item.price.map(size => size.amount));
}

/** True unless `available` is explicitly `false`. */
export function isAvailable(item: { available?: boolean }): boolean {
  return item.available !== false;
}
