'use client';

import { useEffect, useState } from 'react';
import { formatTime, openState, type Day, type OpenState } from '../content/creamery';
import { localClock } from '../lib/local-time';
import { site } from '../lib/site';

function describe(state: OpenState, today: Day): string {
  if (state.open) return `Open now · until ${formatTime(state.closes)}`;
  if (!state.next) return 'Closed';
  const when = state.next.day === today ? 'today' : state.next.day;
  return `Closed · opens ${when} at ${formatTime(state.next.opens)}`;
}

/**
 * Live open/closed status badge.
 * Renders a neutral fallback ("Hours & visiting") before hydration, without JS, or when
 * `site.timeZone` is missing or invalid so build-time status is never baked into static HTML.
 */
export function OpenBadge({ fallback = 'Hours & visiting' }: { fallback?: string }) {
  const [label, setLabel] = useState<{ text: string; open: boolean } | null>(null);

  useEffect(() => {
    if (!site.timeZone) return;
    const update = () => {
      const now = localClock(site.timeZone);
      if (!now) {
        setLabel(null);
        return;
      }
      const state = openState(now.day, now.minutes);
      setLabel({ text: describe(state, now.day), open: state.open });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="inline-flex items-center gap-2 rounded-(--radius-ui) border border-control-border bg-surface px-3 py-1 text-[0.875rem] font-semibold text-ink"
      data-open={label ? String(label.open) : undefined}
    >
      <span className="open-dot" aria-hidden="true" />
      <span>{label?.text ?? fallback}</span>
    </span>
  );
}
