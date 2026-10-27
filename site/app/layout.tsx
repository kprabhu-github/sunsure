import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteChrome } from '@/components/layout/SiteChrome';
import './globals.css';

const anek = localFont({
  src: [
    { path: '../public/fonts/anek-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/anek-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/anek-latin-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-anek',
  display: 'swap',
});
const plexMono = localFont({
  src: [
    { path: '../public/fonts/ibm-plex-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/ibm-plex-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
});

// Title/description are the live site's published values (see lib/seo.ts).
export const metadata: Metadata = {
  title: { default: "India's Leading Renewable Energy Company for Businesses - Sunsure Energy", template: '%s' },
  description: "Sunsure is India's leading Independent Power Producer with expertise in utility-scale and distributed RE projects.",
  metadataBase: new URL('https://sunsure-energy.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anek.variable} ${plexMono.variable}`}>
      <body>
        <noscript><style>{`[data-state="pending"] *{opacity:1!important;visibility:visible!important}`}</style></noscript>
        <SiteChrome header={<SiteHeader />} footer={<SiteFooter />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
