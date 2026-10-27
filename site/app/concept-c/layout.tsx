import localFont from 'next/font/local';
import type { ReactNode } from 'react';
const brico = localFont({ src: '../../public/fonts/concepts/bricolage-grotesque-latin-wdth-normal.woff2', weight: '200 800', variable: '--font-brico', display: 'swap' });
export const metadata = { title: 'Concept C — Sunrise Poster | Sunsure design preview', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: ReactNode }) { return <div className={`cc2 ${brico.variable}`}>{children}</div>; }
