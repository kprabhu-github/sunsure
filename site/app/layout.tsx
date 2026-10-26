import type { Metadata } from 'next';
import localFont from 'next/font/local';
import SmoothScroll from '@/components/layout/SmoothScroll';
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

// TODO: replace with the live site's exact <title>/<meta description> once audited.
export const metadata: Metadata = {
  title: 'Sunsure Energy',
  description: 'Creating round-the-clock renewable energy assets, powering India’s unstoppable growth.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={anek.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
