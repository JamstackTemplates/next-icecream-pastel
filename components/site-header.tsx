'use client';

import { DarkModeToggle } from 'jamstacks';
import { creamery } from '../content/creamery';
import { CreameryTrim, LogoMark } from './icons';
import { SiteLink } from './site-link';

function splitBrandName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return [name, ''];
  return [parts[0], parts.slice(1).join(' ')];
}

export function SiteHeader() {
  const [primary, secondary] = splitBrandName(creamery.name);

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-(--container-wrap) items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <SiteLink
          href="/"
          className="flex shrink-0 items-center gap-2 text-ink no-underline"
        >
          <LogoMark className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-display)] text-[1rem] font-bold tracking-tight text-ink sm:text-[1.15rem]">
              {primary}
            </span>
            {secondary ? (
              <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-muted sm:text-[0.7rem]">
                {secondary}
              </span>
            ) : null}
          </span>
        </SiteLink>

        <nav aria-label="Primary" className="flex items-center gap-2.5 sm:gap-6">
          <SiteLink
            href="/menu/"
            markCurrent="page"
            className="whitespace-nowrap text-[0.8125rem] font-semibold text-ink no-underline transition-colors hover:text-accent-ink aria-[current=page]:text-accent-ink aria-[current=page]:underline aria-[current=page]:underline-offset-4 sm:text-[0.95rem]"
          >
            Flavours
          </SiteLink>
          <SiteLink
            href="/menu/#seasonal-calendar"
            className="whitespace-nowrap text-[0.8125rem] font-semibold text-ink no-underline transition-colors hover:text-accent-ink sm:text-[0.95rem]"
          >
            Seasons
          </SiteLink>
          <SiteLink
            href="/contact/"
            markCurrent="page"
            className="whitespace-nowrap text-[0.8125rem] font-semibold text-ink no-underline transition-colors hover:text-accent-ink aria-[current=page]:text-accent-ink aria-[current=page]:underline aria-[current=page]:underline-offset-4 sm:text-[0.95rem]"
          >
            Contact
          </SiteLink>
          <DarkModeToggle />
        </nav>
      </div>
      <CreameryTrim edge="bottom" className="border-t border-rule/60" />
    </header>
  );
}
