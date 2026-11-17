import type { Metadata } from 'next';
import { SiteLink } from '../components/site-link';
import { creamery } from '../content/creamery';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="wrap py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.6rem)] text-ink">That scoop rolled away.</h1>
      <p className="mt-4 max-w-(--measure) text-muted">
        We couldn’t find the page you were looking for. Head back to the flavour counter or check our full menu.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <SiteLink href="/" className="button">Back to home</SiteLink>
        <SiteLink href="/menu/" className="button-ghost">See all flavours</SiteLink>
      </div>
      <p className="mt-6 text-sm text-muted">
        Need help? Email{' '}
        <a className="text-link" href={`mailto:${creamery.email}`}>{creamery.email}</a>.
      </p>
    </section>
  );
}
