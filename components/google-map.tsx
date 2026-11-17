import { creamery, formatAddress } from '../content/creamery';
import { mapEmbedUrl } from '../lib/maps';

/**
 * Keyless Google Maps embed for the shop's address. Lazy-loaded so pages only contact Google
 * when scrolled into view. Dark mode applies --map-filter (app/tailwind.input.css).
 */
export function GoogleMap({ className = '' }: { className?: string }) {
  return (
    <div className={`map ${className}`}>
      <iframe
        src={mapEmbedUrl(formatAddress())}
        title={`Map showing ${creamery.name} at ${formatAddress()}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
