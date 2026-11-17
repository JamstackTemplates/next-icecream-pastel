'use client';

import { useEffect, useState } from 'react';
import {
  BASES,
  DIETS,
  isAvailable,
  type FlavourItem,
} from '../content/menu';
import { formatSeasonMonths } from '../lib/flavour-season';
import {
  FLAVOUR_FILTERS,
  filterFlavours,
  type FlavourFilter,
} from '../lib/menu-filter';
import { FlavourTubArt } from './flavour-tub-art';

/**
 * Interactive flavour counter on /menu/.
 * Without JS all twelve flavours render; deep links (#flavour-id) automatically clear any hiding filter.
 */
export function MenuBoard({ flavours }: { flavours: readonly FlavourItem[] }) {
  const [filter, setFilter] = useState<FlavourFilter>('all');

  useEffect(() => {
    const revealHashTarget = () => {
      const id = window.location.hash.replace(/^#/, '');
      if (!id) return;
      const target = flavours.find(item => item.id === id);
      if (!target) return;
      setFilter(current => {
        if (current === 'all') return current;
        const visible = filterFlavours(flavours, current).some(item => item.id === id);
        return visible ? current : 'all';
      });
    };
    revealHashTarget();
    window.addEventListener('hashchange', revealHashTarget);
    return () => window.removeEventListener('hashchange', revealHashTarget);
  }, [flavours]);

  const visible = filterFlavours(flavours, filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter flavours">
          {FLAVOUR_FILTERS.map(option => {
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.id)}
                className={`min-h-[44px] cursor-pointer rounded-(--radius-ui) border px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-accent bg-accent text-on-accent'
                    : 'border-control-border bg-surface text-ink hover:border-accent-ink'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p className="text-sm font-medium text-muted tabular-nums" aria-live="polite">
          Showing {visible.length} of {flavours.length} flavours
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-(--radius-tub) border border-rule bg-surface p-8 text-center">
          <p className="font-semibold text-ink">No flavours match this filter right now.</p>
          <p className="mt-1 text-sm text-muted">Reset to view all twelve counter recipes.</p>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="button-ghost mt-4"
          >
            Show all flavours
          </button>
        </div>
      ) : (
        <div className="counter-frame p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map(flavour => {
              const available = isAvailable(flavour);
              return (
                <article
                  key={flavour.id}
                  id={flavour.id}
                  className="tub-well scroll-mt-24 justify-between gap-3"
                >
                  <div>
                    <FlavourTubArt
                      tone={flavour.tone}
                      pattern={flavour.pattern}
                      available={available}
                    />
                    <div className="mt-3 flex items-start justify-between gap-2">
                      <h3 className="text-[1.15rem] text-ink">{flavour.name}</h3>
                      {!available ? (
                        <span className="shrink-0 rounded-(--radius-ui) border border-control-border bg-surface px-2 py-0.5 text-xs font-bold text-ink">
                          Scooped out
                        </span>
                      ) : flavour.badge ? (
                        <span className="shrink-0 rounded-(--radius-ui) bg-surface-alt px-2 py-0.5 text-xs font-semibold capitalize text-accent-ink">
                          {flavour.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs font-semibold tracking-wide uppercase text-muted">
                      {BASES[flavour.base].label} · {formatSeasonMonths(flavour.months)}
                    </p>
                    <p className="mt-2 text-sm text-muted">{flavour.description}</p>
                  </div>

                  {flavour.diet && flavour.diet.length > 0 ? (
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-rule pt-2 text-xs text-muted">
                      {flavour.diet.map(tag => (
                        <li key={tag}>{DIETS[tag].label}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
