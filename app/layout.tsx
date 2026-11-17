import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import '@fontsource-variable/baloo-2';
import '@fontsource-variable/dm-sans';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { creamery } from '../content/creamery';
import { site } from '../lib/site';
import './tailwind.input.css';

// Absolute URLs only when the deployed URL is known at build time. Never fall back to localhost.
const socialImage = site.url
  ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${creamery.name} — ${creamery.tagline}` }]
  : undefined;
const description = site.description || creamery.introduction;

export const metadata: Metadata = {
  title: { default: `${creamery.name} — ${creamery.tagline}`, template: `%s — ${creamery.name}` },
  description,
  applicationName: site.name,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${creamery.name} — ${creamery.tagline}`,
    description,
    ...(site.url ? { url: `${site.url}/` } : {}),
    images: socialImage,
  },
  twitter: { card: socialImage ? 'summary_large_image' : 'summary' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF9F2' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1826' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body>
        <ThemeProvider>
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-(--radius-ui) focus:bg-accent focus:px-4 focus:py-2.5 focus:font-bold focus:text-on-accent focus:no-underline"
            href="#main"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
