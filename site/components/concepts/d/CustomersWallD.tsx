'use client';
import { useEffect, useRef, useState } from 'react';
import { customers } from '../shared/data';

function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const k = Math.min(1, (t - t0) / 1600); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref} aria-label={`${to}${suffix}`}>{v}{suffix}</span>;
}

const IMG = '/images/customers/';
/** Logo files are the ones published on sunsure-energy.com; customers without a published logo are set as plain name tiles. */
const logos: Record<string, { f: string; w: number; h: number; name: string }> = {
  'Bharat Forge Ltd.': { f: 'bharat-forge.webp', w: 1426, h: 336, name: 'Bharat Forge' },
  'Lupin Ltd.': { f: 'lupin.webp', w: 776, h: 936, name: 'Lupin' },
  'Emcure Pharmaceuticals Ltd.': { f: 'emcure.webp', w: 600, h: 119, name: 'Emcure' },
};
const extra = [
  { f: 'alkem.webp', w: 220, h: 167, name: 'Alkem Laboratories' },
  { f: 'esab.webp', w: 1000, h: 559, name: 'ESAB' },
  { f: 'kirloskar.webp', w: 300, h: 161, name: 'Kirloskar' },
  { f: 'orientbell.webp', w: 880, h: 215, name: 'Orientbell Tiles' },
];
type Tile = { name: string; logo?: { f: string; w: number; h: number } };
const tiles: Tile[] = [
  ...customers.map((c) => ({ name: logos[c]?.name ?? c, logo: logos[c] })),
  ...extra.map((e) => ({ name: e.name, logo: e })),
];
// Logos first so the wall opens on real marks, then plain names.
tiles.sort((a, b) => Number(!!b.logo) - Number(!!a.logo));

export function CustomersWallD() {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const g = el.querySelector('.cd-cw__grid') ?? el;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(g); return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} data-seen={seen} id="customers" className="cd-cw" aria-labelledby="cd-cw-h">
      <div className="cd-cw__in">
        <p className="cd-tag">Customers</p>
        <div className="cd-cw__top">
          <h2 id="cd-cw-h">We are the preferred renewable energy partner for some of India’s leading industrial companies</h2>
          <dl className="cd-cw__nums">
            <div><dd><Count to={100} suffix="+" /></dd><dt>industrial customers</dt></div>
            <div><dd><Count to={16} /></dd><dt>Indian states</dt></div>
          </dl>
        </div>
      </div>
      <ul className="cd-cw__grid">
        {tiles.map((t, i) => (
          <li key={t.name} style={{ ['--i' as string]: i }} className={t.logo ? 'has-logo' : ''}>
            {t.logo ? <img src={`${IMG}${t.logo.f}`} width={t.logo.w} height={t.logo.h} alt={t.name} loading="lazy" /> : <span>{t.name}</span>}
          </li>
        ))}
      </ul>
      <div className="cd-cw__in"><p className="cd-cw__pending"><span>Testimonials</span> None are published on the current site. Approved quotes will go here.</p></div>
    </section>
  );
}
