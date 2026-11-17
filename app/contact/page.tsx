import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { creamery } from '../../content/creamery';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

const canonical = absoluteUrl('/contact/');

export const metadata: Metadata = {
  title: 'Contact',
  description: `${creamery.enquiries.title} at ${creamery.name}.`,
  ...(canonical ? { alternates: { canonical } } : {}),
};

export default function ContactPage() {
  const hasEmbed = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <div>
      <PageHead eyebrow="Contact" title={creamery.enquiries.title}>
        <p>{creamery.enquiries.introduction}</p>
      </PageHead>

      <section className="wrap grid gap-8 pb-8 lg:grid-cols-[1.25fr_0.9fr] lg:items-start">
        <div className="rounded-(--radius-frame) border border-rule bg-surface p-6 sm:p-8">
          {hasEmbed ? (
            <JamstacksSupportForm
              siteId={site.jamstacksSite}
              embedUrl={site.jamstacksEmbedUrl}
              email={creamery.email}
            />
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl text-ink">Send us an email</h2>
              <p className="text-muted">
                Write to us directly with your gathering details and we’ll reply as soon as we can.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a className="button" href={`mailto:${creamery.email}`}>
                  Email {creamery.email}
                </a>
                <CopyEmail email={creamery.email} />
              </div>
            </div>
          )}

          <p className="mt-6 border-t border-rule pt-4 text-sm text-muted">
            {creamery.enquiries.disclaimer}
          </p>
        </div>

        <aside className="space-y-6 rounded-(--radius-frame) border border-rule bg-surface-alt p-6 sm:p-7">
          <div>
            <h2 className="text-xl text-ink">Useful to include</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
              {creamery.enquiries.usefulToInclude.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-rule pt-5">
            <h2 className="text-xl text-ink">Direct contact</h2>
            <p className="mt-2 text-sm text-muted">
              Email:{' '}
              <a className="text-link" href={`mailto:${creamery.email}`}>
                {creamery.email}
              </a>
            </p>
            {creamery.phone ? (
              <p className="mt-1.5 text-sm text-muted tabular-nums">
                Phone:{' '}
                <a className="text-link" href={`tel:${creamery.phone.replace(/[^+\d]/g, '')}`}>
                  {creamery.phone}
                </a>
              </p>
            ) : null}
          </div>
        </aside>
      </section>
    </div>
  );
}
