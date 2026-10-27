import localFont from 'next/font/local';
import type { ReactNode } from 'react';
const serif = localFont({ src: [
  { path: '../../public/fonts/concepts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
  { path: '../../public/fonts/concepts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
], variable: '--font-serif', display: 'swap' });
export const metadata = { title: 'Concept A — Meridian | Sunsure design preview', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: ReactNode }) { return <div className={`ca ${serif.variable}`}>{children}</div>; }
