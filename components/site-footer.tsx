import { creamery, formatAddress, groupedHours, publicLinks } from '../content/creamery';
import { CreameryTrim } from './icons';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const hours = groupedHours();

  return (
    <footer className="mt-16 bg-bg text-[0.9375rem] text-muted">
      <CreameryTrim edge="top" className="border-b border-rule/60" />
      <div className="wrap grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
            {creamery.name}
          </p>
          <p className="mt-1">{creamery.tagline}</p>
          <p className="mt-3">
            <a className="text-link" href={`mailto:${creamery.email}`}>
              {creamery.email}
            </a>
          </p>
          {creamery.phone ? (
            <p className="mt-1 tabular-nums">
              <a className="text-link" href={`tel:${creamery.phone.replace(/[^+\d]/g, '')}`}>
                {creamery.phone}
              </a>
            </p>
          ) : null}
          {publicLinks.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-3">
              {publicLinks.map(link => (
                <li key={link.label}>
                  <a className="text-link" href={link.url} rel="noopener noreferrer" target="_blank">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <p className="font-semibold text-ink">Visiting</p>
          <p className="mt-2">{formatAddress()}</p>
          <p className="mt-1 text-xs">{creamery.address.note}</p>
          <ul className="mt-3 space-y-1 text-sm tabular-nums">
            {hours.map(group => (
              <li key={group.label} className="flex justify-between gap-4 max-w-xs">
                <span>{group.label}</span>
                <span>{group.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="font-semibold text-ink">Explore</p>
            <ul className="mt-2 space-y-1.5">
              <li><SiteLink href="/menu/" className="text-link">All flavours</SiteLink></li>
              <li><SiteLink href="/menu/#seasonal-calendar" className="text-link">Seasonal calendar</SiteLink></li>
              <li><SiteLink href="/#find-us" className="text-link">Find us</SiteLink></li>
              <li><SiteLink href="/contact/" className="text-link">Parties &amp; catering</SiteLink></li>
            </ul>
          </div>

          <p className="text-xs text-muted">
            <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="no-underline hover:text-accent-ink hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
