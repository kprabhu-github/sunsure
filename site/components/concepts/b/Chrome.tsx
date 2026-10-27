'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const sections = [
  { id: 'overview', n: '01', l: 'Overview' }, { id: 'about', n: '02', l: 'About' }, { id: 'system', n: '03', l: 'System' }, { id: 'solutions', n: '04', l: 'Solutions' },
  { id: 'projects', n: '05', l: 'Projects' }, { id: 'advantage', n: '06', l: 'Advantage' }, { id: 'customers', n: '07', l: 'Customers' },
  { id: 'knowledge', n: '08', l: 'Knowledge' }, { id: 'contact', n: '09', l: 'Contact' },
];
export const Mark = ({ s = 26 }: { s?: number }) => (
  <svg viewBox="0 0 32 32" width={s} height={s} aria-hidden="true"><path d="M22 9.5c-1.7-2-4-3-6.6-3-3.4 0-6 1.8-6 4.4 0 6.6 14.4 3.2 14.4 10.6 0 3-2.8 5-6.6 5-3 0-5.7-1.2-7.6-3.4" fill="none" stroke="#fe3a20" strokeWidth="3.4" strokeLinecap="square" /></svg>
);

/** Vertical wayfinding rail (desktop): shows the section index and follows scroll. */
export function Rail() {
  const [cur, setCur] = useState('overview');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setCur(e.target.id); }), { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <aside className="cb-rail">
      <Link href="/concept-b/" className="cb-rail__mark" aria-label="Sunsure Energy — concept B home"><Mark s={30} /></Link>
      <nav aria-label="Page sections">
        <ol>
          {sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`} aria-current={cur === s.id ? 'location' : undefined}><span>{s.n}</span><b>{s.l}</b></a></li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
