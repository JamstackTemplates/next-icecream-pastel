import { creamery } from '../content/creamery';
import { formatPrice, menu, scoopPrices } from '../content/menu';
import { absoluteUrl } from './paths';

const SCHEMA_DAYS = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
} as const;

/** schema.org IceCreamShop for search engines and maps. Built from the same content as the pages. */
export function creameryStructuredData() {
  const url = absoluteUrl('/');
  const minScoop = Math.min(...scoopPrices.map(size => size.amount));
  const maxScoop = Math.max(...scoopPrices.map(size => size.amount));

  return {
    '@context': 'https://schema.org',
    '@type': 'IceCreamShop',
    name: creamery.name,
    description: creamery.introduction,
    ...(url ? { url, hasMenu: absoluteUrl('/menu/') } : {}),
    email: creamery.email,
    ...(creamery.phone ? { telephone: creamery.phone } : {}),
    servesCuisine: ['Ice Cream', 'Sorbet'],
    priceRange: `${formatPrice(minScoop)}–${formatPrice(maxScoop)}`,
    currenciesAccepted: menu.currency,
    address: {
      '@type': 'PostalAddress',
      streetAddress: creamery.address.street,
      addressLocality: creamery.address.locality,
      addressRegion: creamery.address.region,
      postalCode: creamery.address.postalCode,
      addressCountry: creamery.address.country,
    },
    openingHoursSpecification: creamery.hours
      .filter(entry => entry.opens && entry.closes)
      .map(entry => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SCHEMA_DAYS[entry.day],
        opens: entry.opens,
        closes: entry.closes,
      })),
    sameAs: creamery.links.filter(link => link.url.trim()).map(link => link.url),
  };
}

/** JSON for an inline <script type="application/ld+json">, safe against closing the script tag. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
