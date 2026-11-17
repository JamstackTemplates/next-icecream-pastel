import type { Amenity } from '../content/creamery';

/** Small cloud-and-scoop mark matching app/icon.svg, coloured by CSS tokens. */
export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M9.5 18.5C9.5 12.7 12.6 8.5 16 8.5C19.4 8.5 22.5 12.7 22.5 18.5"
        fill="var(--strawberry)"
        stroke="var(--text)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.5 19C7.5 17.3 8.9 16 10.6 16C11.3 16 11.9 16.2 12.4 16.6C13.2 15.6 14.5 15 16 15C17.5 15 18.8 15.6 19.6 16.6C20.1 16.2 20.7 16 21.4 16C23.1 16 24.5 17.3 24.5 19C24.5 20.7 23.1 22 21.4 22H10.6C8.9 22 7.5 20.7 7.5 19Z"
        fill="var(--surface)"
        stroke="var(--text)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 22L14 27H18L19.5 22"
        fill="var(--vanilla)"
        stroke="var(--text)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Single, double or triple scoop silhouette for the price rail. */
export function ScoopCountIcon({ count }: { count: 1 | 2 | 3 }) {
  return (
    <svg className="h-7 w-7 shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {count >= 3 ? (
        <circle cx="14" cy="7.5" r="4.2" fill="var(--lavender)" stroke="var(--text)" strokeWidth="1.4" />
      ) : null}
      {count >= 2 ? (
        <circle
          cx={count === 2 ? '14' : '11.2'}
          cy={count === 2 ? '9.5' : '11.8'}
          r="4.3"
          fill="var(--strawberry)"
          stroke="var(--text)"
          strokeWidth="1.4"
        />
      ) : null}
      <circle
        cx={count === 3 ? '16.8' : '14'}
        cy={count === 1 ? '12.5' : count === 2 ? '13.5' : '12.2'}
        r="4.5"
        fill="var(--vanilla)"
        stroke="var(--text)"
        strokeWidth="1.4"
      />
      <path
        d="M9.5 16.5H18.5L16.5 24H11.5L9.5 16.5Z"
        fill="var(--surface-alt)"
        stroke="var(--text)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Outline illustration for take-home tubs. */
export function TakeHomeTubArt({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="7" y="10" width="26" height="5" rx="2.5" fill="var(--surface-alt)" stroke="var(--text)" strokeWidth="1.5" />
      <path d="M9.5 15H30.5L28 32H12L9.5 15Z" fill="var(--vanilla)" stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 21.5H27" stroke="var(--text)" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
      <circle cx="20" cy="26" r="2.2" fill="var(--strawberry)" opacity="0.85" />
    </svg>
  );
}

/** Shallow scalloped counter-edge drip accent. */
export function CounterDripEdge({ className = 'h-3 w-full' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 20"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 0H1200V6C1160 6 1140 16 1105 16C1070 16 1055 6 1015 6C975 6 955 13 915 13C875 13 855 6 810 6C765 6 745 17 705 17C665 17 645 6 600 6C555 6 535 14 495 14C455 14 435 6 390 6C345 6 325 16 285 16C245 16 225 6 180 6C135 6 115 14 75 14C35 14 20 6 0 6V0Z"
        fill="var(--surface-alt)"
      />
      <path
        d="M0 6C20 6 35 14 75 14C115 14 135 6 180 6C225 6 245 16 285 16C325 16 345 6 390 6C435 6 455 14 495 14C535 14 555 6 600 6C645 6 665 17 705 17C745 17 765 6 810 6C855 6 875 13 915 13C955 13 975 6 1015 6C1055 6 1070 16 1105 16C1140 16 1160 6 1200 6"
        stroke="var(--rule)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Seamless repeating scalloped & drippy creamery trim for the header (edge="bottom")
 * and footer (edge="top"). Uses CSS tokens so it adapts to light/dark automatically.
 */
export function CreameryTrim({
  edge,
  className = '',
}: {
  edge: 'top' | 'bottom';
  className?: string;
}) {
  const patternId = `creamery-trim-${edge}`;
  const isTop = edge === 'top';

  return (
    <svg
      className={`pointer-events-none block h-[11px] w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="96" height="11" patternUnits="userSpaceOnUse">
          <g transform={isTop ? 'translate(0, 11) scale(1, -1)' : undefined}>
            <path
              d="M0 0H96V3.5C90 3.5 88 9 80 9C72 9 70 3.5 64 3.5C58 3.5 55 7.5 48 7.5C41 7.5 38 3.5 32 3.5C26 3.5 24 9.5 16 9.5C8 9.5 6 3.5 0 3.5V0Z"
              fill="var(--surface-alt)"
            />
            <path
              d="M0 3.5C6 3.5 8 9.5 16 9.5C24 9.5 26 3.5 32 3.5C38 3.5 41 7.5 48 7.5C55 7.5 58 3.5 64 3.5C70 3.5 72 9 80 9C88 9 90 3.5 96 3.5"
              fill="none"
              stroke="var(--rule)"
              strokeWidth="1.4"
            />
            <circle cx="16" cy="4.2" r="1.6" fill="var(--strawberry)" />
            <circle cx="48" cy="3.6" r="1.5" fill="var(--mint)" />
            <circle cx="80" cy="4.2" r="1.6" fill="var(--vanilla)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="11" fill={`url(#${patternId})`} />
    </svg>
  );
}

/** Small icon for shop amenities. */
export function AmenityIcon({ name }: { name: Amenity['icon'] }) {
  if (name === 'cup') {
    return (
      <svg className="h-5 w-5 text-accent-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M7 11a5 5 0 0 1 10 0" />
        <path d="M5.5 11h13l-1.5 8.5h-10L5.5 11Z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'cone') {
    return (
      <svg className="h-5 w-5 text-accent-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M7.5 10.5a4.5 4.5 0 0 1 9 0" />
        <path d="M7 11l5 10.5L17 11H7Z" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5 text-accent-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="6" width="14" height="3.5" rx="1.5" />
      <path d="M6.5 9.5h11l-1.2 9.5H7.7L6.5 9.5Z" strokeLinejoin="round" />
    </svg>
  );
}
