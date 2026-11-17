import { FlavourTubArt } from '../components/flavour-tub-art';
import { GoogleMap } from '../components/google-map';
import { AmenityIcon, CounterDripEdge, ScoopCountIcon } from '../components/icons';
import { OpenBadge } from '../components/open-badge';
import { SiteLink } from '../components/site-link';
import { TimeZoneNote } from '../components/time-zone-note';
import { creamery, formatAddress, formatHours } from '../content/creamery';
import {
  BASES,
  allTakeHome,
  counterFlavours,
  flavourById,
  formatPrice,
  isAvailable,
  menu,
  scoopPrices,
  seasonalCalendar,
  seasonalCalendarMeta,
} from '../content/menu';
import { mapDirectionsUrl, mapSearchUrl } from '../lib/maps';
import { menuAnchor } from '../lib/paths';
import { creameryStructuredData, jsonLd } from '../lib/structured-data';

const SEASONAL_HIGHLIGHTS = [
  { label: 'Winter & spring (Dec – May)', month: 1 },
  { label: 'Summer (Jun – Aug)', month: 7 },
  { label: 'Autumn (Sep – Nov)', month: 10 },
] as const;

export default function HomePage() {
  const address = formatAddress();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(creameryStructuredData()) }}
      />

      {/* 1. Compact Hero + Price Rail + Location/Hours Line + Signature Tub Counter */}
      <section className="wrap pt-6 pb-10 sm:pt-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">{creamery.name} · {creamery.tagline}</p>
            <OpenBadge fallback="Hours & visiting" />
          </div>

          <h1 className="max-w-[16ch] text-[clamp(2.4rem,6vw,5.25rem)] leading-[1.02] text-ink">
            A little cloud in every <span className="text-accent-ink">scoop.</span>
          </h1>

          <p className="max-w-(--measure) text-[1.0625rem] text-muted">
            {creamery.introduction}
          </p>

          {/* Narrow price rail + primary actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-rule py-3.5">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Scoop sizes and prices">
              {scoopPrices.map((size, index) => (
                <li key={size.label} className="flex items-center gap-2">
                  <ScoopCountIcon count={(index + 1) as 1 | 2 | 3} />
                  <span className="text-sm font-semibold text-ink">{size.label}</span>
                  <span className="text-sm font-bold text-accent-ink tabular-nums">
                    {formatPrice(size.amount)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <SiteLink href="/menu/" className="button">See all flavours</SiteLink>
              <a href="#find-us" className="button-ghost">Find us</a>
            </div>
          </div>

          {/* Compact visiting line before the rack */}
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{creamery.address.street}, {creamery.address.locality}</span>
            {' · '}
            {creamery.address.note}
          </p>
        </div>

        {/* Signature Chilled Flavour Counter */}
        <div className="counter-frame counter-reveal mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-alt px-4 py-3 sm:px-6">
            <h2 className="text-xl text-ink sm:text-2xl">Flavour counter</h2>
            <SiteLink href="/menu/" className="text-link text-sm">
              View all 12 flavours &amp; filters →
            </SiteLink>
          </div>
          <CounterDripEdge className="block h-3 w-full" />

          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:gap-4 sm:p-6">
            {counterFlavours.map((flavour, index) => {
              const available = isAvailable(flavour);
              const dairyFree = flavour.diet?.includes('dairy-free-ingredients');
              return (
                <SiteLink
                  key={flavour.id}
                  href={menuAnchor(flavour.id)}
                  className={`tub-well text-left no-underline ${index >= 4 ? 'hidden sm:flex' : ''}`}
                >
                  <FlavourTubArt
                    tone={flavour.tone}
                    pattern={flavour.pattern}
                    available={available}
                  />
                  <span className="mt-2.5 font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-snug text-ink">
                    {flavour.name}
                  </span>
                  <span className="mt-0.5 text-xs font-medium text-muted">
                    {BASES[flavour.base].label}
                    {dairyFree ? ' · Made without dairy ingredients' : ''}
                  </span>
                  {!available ? (
                    <span className="mt-1.5 inline-block self-start rounded-(--radius-ui) border border-control-border bg-surface px-2 py-0.5 text-[0.7rem] font-bold text-ink">
                      Scooped out
                    </span>
                  ) : null}
                </SiteLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Find us directly under the hero */}
      <section id="find-us" aria-labelledby="find-us-heading" className="wrap scroll-mt-24 py-10">
        <div className="grid gap-8 rounded-(--radius-frame) border border-rule bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="space-y-5">
            <div>
              <p className="eyebrow">Find us</p>
              <h2 id="find-us-heading" className="mt-2 text-3xl text-ink">Visit the counter</h2>
              <p className="mt-2 font-semibold text-ink">{address}</p>
              <p className="mt-1 text-sm text-muted">{creamery.address.note}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className="button"
                href={mapDirectionsUrl(address)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Get directions
              </a>
              <a
                className="button-ghost"
                href={mapSearchUrl(address)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open in Google Maps
              </a>
            </div>

            <ul className="space-y-1.5 text-sm text-muted">
              {creamery.directions.map(line => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <div className="border-t border-rule pt-4">
              <h3 className="text-lg text-ink">Opening hours</h3>
              <dl className="mt-2 space-y-1 text-sm tabular-nums">
                {creamery.hours.map(entry => (
                  <div key={entry.day} className="flex justify-between gap-4 max-w-xs">
                    <dt className="font-medium text-ink">{entry.day}</dt>
                    <dd className="text-muted">{formatHours(entry)}</dd>
                  </div>
                ))}
              </dl>
              <TimeZoneNote />
              {creamery.notice ? (
                <p className="mt-2 text-sm font-medium text-accent-ink">{creamery.notice}</p>
              ) : null}
            </div>
          </div>

          <GoogleMap />
        </div>
      </section>

      {/* 3. A year of little daydreams */}
      <section aria-labelledby="seasons-heading" className="wrap py-8">
        <div className="wafer-corner rounded-(--radius-frame) border border-rule bg-surface-alt p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Seasonal calendar</p>
              <h2 id="seasons-heading" className="mt-2 text-3xl text-ink">{seasonalCalendarMeta.heading}</h2>
            </div>
            <SiteLink href="/menu/#seasonal-calendar" className="text-link">
              See all twelve months →
            </SiteLink>
          </div>
          <p className="mt-2 max-w-(--measure) text-sm text-muted">{seasonalCalendarMeta.note}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SEASONAL_HIGHLIGHTS.map(slot => {
              const entry = seasonalCalendar.find(item => item.month === slot.month);
              const flavour = entry ? flavourById.get(entry.flavourIds[0]) : undefined;
              if (!flavour || !entry) return null;
              return (
                <div key={slot.label} className="rounded-(--radius-tub) border border-rule bg-surface p-4">
                  <p className="text-xs font-bold tracking-wider uppercase text-accent-ink">{slot.label}</p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-ink">
                    {flavour.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{flavour.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Cups, cones & a little extra */}
      <section aria-labelledby="cups-cones-heading" className="wrap py-8">
        <h2 id="cups-cones-heading" className="text-3xl text-ink">Cups, cones &amp; a little extra</h2>
        <div className="mt-4">
          <div className="ruled-row flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h3 className="text-lg text-ink">Scoop sizes</h3>
              <p className="text-sm text-muted">
                {scoopPrices.map(s => `${s.label} ${formatPrice(s.amount)}`).join(' · ')} — cups included
              </p>
            </div>
            <SiteLink href="/menu/#scoop-sizes" className="text-link text-sm">Scoop sizes</SiteLink>
          </div>

          <div className="ruled-row flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h3 className="text-lg text-ink">Cones &amp; toppings</h3>
              <p className="text-sm text-muted">
                {menu.extras.map(e => `${e.name} (${formatPrice(e.price)})`).join(' · ')}
              </p>
            </div>
            <SiteLink href="/menu/#extras" className="text-link text-sm">Toppings</SiteLink>
          </div>

          <div className="ruled-row flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h3 className="text-lg text-ink">Take-home tubs</h3>
              <p className="text-sm text-muted">
                {allTakeHome
                  .map(t => `${t.name} (${t.volumeMl}ml, ${typeof t.price === 'number' ? formatPrice(t.price) : ''})`)
                  .join(' · ')}
              </p>
            </div>
            <SiteLink href="/menu/#take-home" className="text-link text-sm">Take-home tubs</SiteLink>
          </div>
        </div>
      </section>

      {/* 5. Story + Parties & catering enquiries */}
      <section aria-labelledby="story-heading" className="wrap grid gap-8 py-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">Our story</p>
          <h2 id="story-heading" className="text-3xl text-ink">Small batches, unhurried scoops</h2>
          {creamery.story.map(paragraph => (
            <p key={paragraph} className="max-w-(--measure) text-muted">{paragraph}</p>
          ))}

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {creamery.amenities.map(item => (
              <div key={item.title} className="rounded-(--radius-tub) border border-rule bg-surface p-4">
                <AmenityIcon name={item.icon} />
                <h3 className="mt-2 text-base text-ink">{item.title}</h3>
                <p className="mt-1 text-xs text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-(--radius-frame) border border-rule bg-surface-alt p-6 sm:p-7">
          <p className="eyebrow">Gatherings</p>
          <h2 className="mt-2 text-2xl text-ink">{creamery.enquiries.title}</h2>
          <p className="mt-2 text-sm text-muted">{creamery.enquiries.introduction}</p>
          <p className="mt-3 text-xs text-muted">{creamery.enquiries.disclaimer}</p>
          <div className="mt-5">
            <SiteLink href="/contact/" className="button">Send an enquiry</SiteLink>
          </div>
        </aside>
      </section>

      {/* 6. Six <details> FAQs */}
      <section aria-labelledby="faq-heading" className="wrap py-8">
        <h2 id="faq-heading" className="text-3xl text-ink">Questions &amp; answers</h2>
        <div className="mt-4">
          {creamery.faqs.map(faq => (
            <details key={faq.question} className="ruled-row group">
              <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-lg font-bold text-ink flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span className="text-accent-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-2 max-w-(--measure) text-sm text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
