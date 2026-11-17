'use client';

import { useEffect, useState } from 'react';
import { allFlavours, seasonalCalendar } from '../content/menu';
import { plannedForCurrentMonth, type PlannedMonthSelection } from '../lib/flavour-season';
import { site } from '../lib/site';

/**
 * Browser-only seasonal indicator: highlights which flavour is planned for the business-local month
 * without reordering or hiding any of the static twelve-month calendar.
 */
export function PlannedMonthBadge() {
  const [selection, setSelection] = useState<PlannedMonthSelection | null>(null);

  useEffect(() => {
    if (!site.timeZone) return;
    const update = () => {
      setSelection(plannedForCurrentMonth(new Date(), site.timeZone, seasonalCalendar, allFlavours));
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!selection || selection.flavours.length === 0) return null;

  return (
    <p
      className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-(--radius-ui) border border-control-border bg-surface px-3.5 py-2 text-sm text-ink"
      role="status"
      aria-live="polite"
    >
      <span className="font-bold text-accent-ink">Planned this month ({selection.monthLabel}):</span>
      <span>
        {selection.flavours
          .map(({ flavour, available }) => (available ? flavour.name : `${flavour.name} (Scooped out)`))
          .join(', ')}
      </span>
    </p>
  );
}
