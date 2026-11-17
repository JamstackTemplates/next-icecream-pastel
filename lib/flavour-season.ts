import {
  isAvailable,
  type FlavourItem,
  type SeasonalEntry,
} from '../content/menu.ts';
import { localClock } from './local-time.ts';

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export function monthName(month: number): string {
  return MONTH_NAMES[month - 1] ?? '';
}

/** True when a flavour's `months` list includes `month` (1–12), including year-spanning lists like [12, 1, 2]. */
export function isEligibleInMonth(flavour: Pick<FlavourItem, 'months'>, month: number): boolean {
  return Number.isInteger(month) && month >= 1 && month <= 12 && flavour.months.includes(month);
}

/** Business-local month (1–12) for `now` in `timeZone`, or `null` when `timeZone` is missing or invalid. */
export function businessLocalMonth(now: Date, timeZone: string): number | null {
  return localClock(timeZone, now)?.month ?? null;
}

export interface PlannedMonthSelection {
  month: number;
  monthLabel: string;
  note: string;
  flavours: { flavour: FlavourItem; available: boolean }[];
}

/**
 * Pure selector for the flavours planned in the business-local month for `now` and `timeZone`.
 * Returns `null` if `timeZone` is missing/invalid or if the calendar has no matching month entry.
 * Out-of-season or unknown IDs are filtered out; sold-out flavours remain marked `available: false`.
 */
export function plannedForCurrentMonth(
  now: Date,
  timeZone: string,
  calendar: readonly SeasonalEntry[],
  flavours: readonly FlavourItem[],
): PlannedMonthSelection | null {
  const month = businessLocalMonth(now, timeZone);
  if (!month) return null;
  const entry = calendar.find(item => item.month === month);
  if (!entry) return null;
  const byId = new Map(flavours.map(item => [item.id, item]));
  const planned = entry.flavourIds
    .map(id => byId.get(id))
    .filter((flavour): flavour is FlavourItem => Boolean(flavour && isEligibleInMonth(flavour, month)))
    .map(flavour => ({ flavour, available: isAvailable(flavour) }));
  return {
    month,
    monthLabel: monthName(month),
    note: entry.note,
    flavours: planned,
  };
}

/** Format a flavour's planned months into a readable range, e.g. "Year-round", "Jun – Aug", "Dec – May". */
export function formatSeasonMonths(months: readonly number[]): string {
  if (months.length === 12) return 'Year-round';
  if (months.length === 0) return '';
  if (months.length === 1) return monthName(months[0]).slice(0, 3);
  return `${monthName(months[0]).slice(0, 3)} – ${monthName(months.at(-1)!).slice(0, 3)}`;
}
