import type { FlavourPattern, FlavourTone } from '../content/menu';

const TONE_VAR: Record<FlavourTone, string> = {
  mint: 'var(--mint)',
  strawberry: 'var(--strawberry)',
  vanilla: 'var(--vanilla)',
  lavender: 'var(--lavender)',
  chocolate: 'var(--chocolate)',
  peach: 'var(--peach)',
};

/**
 * Content-driven inline SVG tub: tub well, scoop surface, two scrape arcs and one inclusion pattern.
 * When `available` is false, renders a frosted lid motif across the tub. Decorative only (`aria-hidden`).
 */
export function FlavourTubArt({
  tone,
  pattern,
  available = true,
  className = 'w-full h-auto',
}: {
  tone: FlavourTone;
  pattern: FlavourPattern;
  available?: boolean;
  className?: string;
}) {
  const fill = TONE_VAR[tone];

  return (
    <svg className={className} viewBox="0 0 160 112" fill="none" aria-hidden="true">
      {/* Outer tub well */}
      <rect
        x="4"
        y="4"
        width="152"
        height="104"
        rx="20"
        fill="var(--surface)"
        stroke="var(--tub-rim)"
        strokeWidth="2"
      />
      {/* Ice cream surface */}
      <rect
        x="11"
        y="11"
        width="138"
        height="90"
        rx="15"
        fill={fill}
      />
      {/* Inner chilled-tub rim & soft cream ridge */}
      <rect
        x="11"
        y="11"
        width="138"
        height="90"
        rx="15"
        stroke="var(--tub-rim)"
        strokeWidth="1.5"
      />
      <path
        d="M19 29C19 20.5 25 17 36 17H118"
        stroke="var(--tub-highlight)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Two scoop-scrape arcs */}
      <path
        d="M26 40C46 25 74 25 95 39"
        stroke="var(--tub-scrape)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M64 76C87 62 114 63 135 76"
        stroke="var(--tub-scrape)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Inclusion pattern */}
      {pattern === 'chips' ? (
        <g fill="var(--tub-inclusion)">
          <rect x="36" y="48" width="9" height="6" rx="1.5" transform="rotate(-18 36 48)" />
          <rect x="74" y="34" width="8" height="5" rx="1.5" transform="rotate(24 74 34)" />
          <rect x="108" y="49" width="9" height="6" rx="1.5" transform="rotate(-10 108 49)" />
          <rect x="52" y="72" width="8" height="5" rx="1.5" transform="rotate(14 52 72)" />
          <rect x="94" y="70" width="7" height="5" rx="1.5" transform="rotate(-26 94 70)" />
        </g>
      ) : null}

      {pattern === 'ripple' ? (
        <path
          d="M22 60C40 44 58 72 78 55C98 38 114 66 138 50"
          stroke="var(--tub-inclusion)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
      ) : null}

      {pattern === 'pieces' ? (
        <g fill="var(--tub-inclusion)">
          <circle cx="42" cy="54" r="5" />
          <circle cx="80" cy="44" r="4.2" />
          <circle cx="116" cy="56" r="5.2" />
          <circle cx="62" cy="74" r="4.5" />
          <circle cx="102" cy="74" r="3.8" />
        </g>
      ) : null}

      {pattern === 'seeds' ? (
        <g fill="var(--tub-inclusion)">
          <circle cx="38" cy="46" r="1.8" />
          <circle cx="56" cy="60" r="1.6" />
          <circle cx="72" cy="42" r="1.7" />
          <circle cx="88" cy="58" r="1.8" />
          <circle cx="106" cy="44" r="1.6" />
          <circle cx="122" cy="62" r="1.8" />
          <circle cx="48" cy="76" r="1.6" />
          <circle cx="96" cy="76" r="1.7" />
        </g>
      ) : null}

      {/* Frosted lid motif when scooped out */}
      {!available ? (
        <g>
          <rect
            x="9"
            y="9"
            width="142"
            height="94"
            rx="16"
            fill="var(--lid-frost)"
            stroke="var(--control-border)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <path
            d="M44 56H116"
            stroke="var(--text)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      ) : null}
    </svg>
  );
}
