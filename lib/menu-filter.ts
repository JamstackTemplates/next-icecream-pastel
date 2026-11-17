import { isAvailable, type FlavourItem } from '../content/menu.ts';

export type FlavourFilter = 'all' | 'dairy-free-ingredients' | 'seasonal' | 'available';

export const FLAVOUR_FILTERS: { id: FlavourFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'dairy-free-ingredients', label: 'Made without dairy ingredients' },
  { id: 'seasonal', label: 'Seasonal' },
  { id: 'available', label: 'Available' },
];

export function matchesFlavourFilter(flavour: FlavourItem, filter: FlavourFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'dairy-free-ingredients':
      return flavour.diet?.includes('dairy-free-ingredients') ?? false;
    case 'seasonal':
      return flavour.months.length < 12;
    case 'available':
      return isAvailable(flavour);
  }
}

export function filterFlavours(flavours: readonly FlavourItem[], filter: FlavourFilter): FlavourItem[] {
  return flavours.filter(flavour => matchesFlavourFilter(flavour, filter));
}
