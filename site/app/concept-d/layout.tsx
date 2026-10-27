import localFont from 'next/font/local';
import type { ReactNode } from 'react';
const grot = localFont({ src: [
  { path: '../../public/fonts/concepts/space-grotesk-latin-400-normal.woff2', weight: '400' },
  { path: '../../public/fonts/concepts/space-grotesk-latin-500-normal.woff2', weight: '500' },
  { path: '../../public/fonts/concepts/space-grotesk-latin-700-normal.woff2', weight: '700' },
], variable: '--font-grot', display: 'swap' });
const jb = localFont({ src: [
  { path: '../../public/fonts/concepts/jetbrains-mono-latin-400-normal.woff2', weight: '400' },
  { path: '../../public/fonts/concepts/jetbrains-mono-latin-500-normal.woff2', weight: '500' },
], variable: '--font-jb', display: 'swap' });
const serif = localFont({ src: [
  { path: '../../public/fonts/concepts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
  { path: '../../public/fonts/concepts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
], variable: '--font-serif', display: 'swap' });
export const metadata = { title: 'Concept D — Night Shift | Sunsure design preview', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: ReactNode }) { return <div className={`cb cd ${grot.variable} ${jb.variable} ${serif.variable}`}>{children}</div>; }
