import { DAYS, type Day } from '../content/creamery.ts';

/**
 * Current weekday, minutes after midnight, and 1-based month (1–12) in the shop's own IANA time zone.
 * Returns `null` when the zone is empty or invalid so callers stay neutral.
 */
export function localClock(timeZone: string, now = new Date()): { day: Day; minutes: number; month: number } | null {
  if (!timeZone) return null;
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      month: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
    const part = (type: string) => parts.find(item => item.type === type)?.value ?? '';
    const day = part('weekday') as Day;
    const month = Number(part('month'));
    const hour = Number(part('hour')) % 24;
    const minute = Number(part('minute'));
    if (!DAYS.includes(day) || !Number.isInteger(month) || month < 1 || month > 12) return null;
    return { day, minutes: hour * 60 + minute, month };
  } catch {
    return null;
  }
}
