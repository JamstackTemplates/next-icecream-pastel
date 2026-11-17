import type { Metadata } from 'next';
import { ScoopCountIcon, TakeHomeTubArt } from '../../components/icons';
import { MenuBoard } from '../../components/menu-board';
import { PageHead } from '../../components/page-head';
import { PlannedMonthBadge } from '../../components/planned-month-badge';
import {
  DIETS,
  allFlavours,
  allTakeHome,
  flavourById,
  formatPrice,
  isAvailable,
  menu,
  scoopPrices,
  seasonalCalendar,
  seasonalCalendarMeta,
} from '../../content/menu';
import { creamery } from '../../content/creamery';
import { monthName } from '../../lib/flavour-season';
import { absoluteUrl } from '../../lib/paths';

const canonical = absoluteUrl('/menu/');

export const metadata: Metadata = {
  title: 'Flavours & Menu',
  description: `All twelve flavours, scoop prices, toppings, take-home tubs and the twelve-month seasonal rotation at ${creamery.name}.`,
  ...(canonical ? { alternates: { canonical } } : {}),
};

export default function MenuPage() {
  return (
    <div>
      <PageHead eyebrow="Menu" title="Flavour counter">
        <p>
          Twelve small-batch recipes churned in dairy, oat, coconut and fruit-water bases. Availability is
          published by the shop and can change before your visit.
        </p>
      </PageHead>

      {/* Scoop price rail */}
      <section aria-label="Scoop prices" className="wrap mb-8">
        <div className="flex flex-wrap items-center gap-4 rounded-(--radius-tub) border border-rule bg-surface px-5 py-3.5">
          {scoopPrices.map((size, index) => (
            <div key={size.label} className="flex items-center gap-2.5 pr-4">
              <ScoopCountIcon count={(index + 1) as 1 | 2 | 3} />
              <span className="font-semibold text-ink">{size.label}</span>
              <span className="font-bold text-accent-ink tabular-nums">{formatPrice(size.amount)}</span>
            </div>
          ))}
          <span className="text-sm text-muted">Cups included · waffle cone upgrade {formatPrice(menu.extras[0]?.price ?? 1)}</span>
        </div>
      </section>

      {/* Interactive 12-flavour counter */}
      <section aria-labelledby="flavours-heading" className="wrap">
        <h2 id="flavours-heading" className="sr-only">All twelve flavours</h2>
        <MenuBoard flavours={allFlavours} />

        {/* Dietary legend and shared-equipment notice */}
        <aside aria-label="Ingredient markers and allergy notice" className="mt-6 rounded-(--radius-tub) border border-rule bg-surface-alt p-5 text-sm text-muted">
          <p className="font-semibold text-ink">Ingredient markers &amp; shared equipment</p>
          <div className="mt-2 space-y-1.5">
            {menu.notes.map(note => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </aside>
      </section>

      {/* Scoop sizes, extras and take-home tubs as ruled lists */}
      <section className="wrap mt-14 grid gap-10 lg:grid-cols-3">
        <div id="scoop-sizes" className="scroll-mt-24">
          <h2 className="text-2xl text-ink">Scoop sizes</h2>
          <p className="mt-1 text-sm text-muted">Served in a cup, or add a rolled waffle cone.</p>
          <ul className="mt-4">
            {scoopPrices.map(size => (
              <li key={size.label} className="ruled-row flex items-center justify-between gap-4">
                <span className="font-semibold text-ink">{size.label}</span>
                <span className="font-bold text-ink tabular-nums">{formatPrice(size.amount)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="extras" className="scroll-mt-24">
          <h2 className="text-2xl text-ink">Cones &amp; toppings</h2>
          <p className="mt-1 text-sm text-muted">Added at the counter.</p>
          <ul className="mt-4">
            {menu.extras.map(extra => (
              <li key={extra.id} className="ruled-row flex items-start justify-between gap-4">
                <div>
                  <span className="font-semibold text-ink">{extra.name}</span>
                  {extra.diet && extra.diet.length > 0 ? (
                    <span className="block text-xs text-muted">
                      {extra.diet.map(tag => DIETS[tag].label).join(' · ')}
                    </span>
                  ) : null}
                </div>
                <span className="font-bold text-ink tabular-nums">{formatPrice(extra.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="take-home" className="scroll-mt-24">
          <h2 className="text-2xl text-ink">Take-home tubs</h2>
          <p className="mt-1 text-sm text-muted">Packed from current counter stock.</p>
          <ul className="mt-4">
            {allTakeHome.map(tub => (
              <li key={tub.id} id={tub.id} className="ruled-row flex items-start justify-between gap-4 scroll-mt-24">
                <div className="flex items-start gap-3">
                  <TakeHomeTubArt className="h-9 w-9 shrink-0" />
                  <div>
                    <p className="font-semibold text-ink">{tub.name}</p>
                    <p className="text-xs text-muted">{tub.volumeMl}ml · {tub.description}</p>
                  </div>
                </div>
                <span className="shrink-0 font-bold text-ink tabular-nums">
                  {typeof tub.price === 'number' ? formatPrice(tub.price) : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Twelve-month seasonal flavour calendar */}
      <section id="seasonal-calendar" aria-labelledby="calendar-heading" className="wrap mt-16 scroll-mt-24">
        <div className="wafer-corner rounded-(--radius-frame) border border-rule bg-surface-alt p-6 sm:p-8">
          <p className="eyebrow">Seasonal rotation</p>
          <h2 id="calendar-heading" className="mt-2 text-3xl text-ink">{seasonalCalendarMeta.heading}</h2>
          <p className="mt-2 max-w-(--measure) text-sm text-muted">{seasonalCalendarMeta.note}</p>
          <PlannedMonthBadge />

          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {seasonalCalendar.map(entry => {
              const flavours = entry.flavourIds
                .map(id => flavourById.get(id))
                .filter((f): f is NonNullable<typeof f> => Boolean(f));

              return (
                <li
                  key={entry.month}
                  className="rounded-(--radius-tub) border border-rule bg-surface p-4"
                >
                  <p className="text-xs font-bold tracking-wider uppercase text-accent-ink">
                    {monthName(entry.month)}
                  </p>
                  <div className="mt-1.5 space-y-1">
                    {flavours.map(flavour => (
                      <p key={flavour.id} className="font-semibold text-ink">
                        <a href={`#${flavour.id}`} className="text-link">
                          {flavour.name}
                        </a>
                        {!isAvailable(flavour) ? (
                          <span className="ml-2 text-xs font-normal text-muted">(Scooped out)</span>
                        ) : null}
                      </p>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted">{entry.note}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
