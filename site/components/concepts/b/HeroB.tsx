'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { heroCta } from '../shared/data';

type Src = 'solar' | 'wind' | 'storage';
const W = 600, H = 190, T = 24, base = H - 14, top = 26; // demand line at y = top
const hours = Array.from({ length: 49 }, (_, i) => i / 2);
const solar = (h: number) => (h > 6 && h < 18 ? Math.pow(Math.sin(Math.PI * (h - 6) / 12), 1.4) * 1.05 : 0);
const wind = (h: number) => 0.3 + 0.22 * Math.sin((2 * Math.PI * (h + 4)) / 24);
const x = (h: number) => (h / T) * W;
const y = (v: number) => base - Math.min(v, 1.2) * (base - top);

/** Hero interaction: build a 24-hour supply profile from solar, wind and storage. Illustrative shape, not data. */
export function HeroB() {
  const [on, setOn] = useState<Record<Src, boolean>>({ solar: true, wind: false, storage: false });
  const toggle = (k: Src) => setOn((p) => ({ ...p, [k]: !p[k] }));
  const g = useMemo(() => {
    const s = hours.map((h) => (on.solar ? solar(h) : 0));
    const w = hours.map((h) => (on.wind ? wind(h) : 0));
    const base2 = s.map((v, i) => v + w[i]);
    const st = hours.map((_, i) => (on.storage ? Math.max(0, Math.min(1 - base2[i], 0.7)) : 0));
    const tot = base2.map((v, i) => v + st[i]);
    const area = (lo: number[], hi: number[]) => 'M' + hours.map((h, i) => `${x(h).toFixed(1)},${y(hi[i]).toFixed(1)}`).join(' L') + ' L' + [...hours].reverse().map((h, i) => `${x(h).toFixed(1)},${y(lo[hours.length - 1 - i]).toFixed(1)}`).join(' L') + ' Z';
    const zero = hours.map(() => 0);
    const gapHi = hours.map(() => 1), gapLo = tot.map((v) => Math.min(v, 1));
    const gaps = tot.some((v) => v < 0.98);
    return { solar: area(zero, s), wind: area(s, base2), store: area(base2, tot), gap: area(gapLo, gapHi), gaps };
  }, [on]);
  const full = !g.gaps;
  return (
    <section id="overview" className="cb-hero" aria-labelledby="cb-h1">
      <div className="cb-cell cb-hero__head">
        <p className="cb-tag"><i className="cb-dot" aria-hidden="true" /> India’s Independent Power Producer</p>
        <h1 id="cb-h1" className="cb-hero__h">Making India’s <span>Power Move</span></h1>
        <p className="cb-hero__sub">Creating Round-the-Clock Renewable Energy Assets, Powering India’s Unstoppable Growth</p>
        <div className="cb-hero__cta"><Link href={heroCta.href} className="cb-btn">{heroCta.label}<span aria-hidden="true">→</span></Link><Link href="/projects/" className="cb-btn cb-btn--line">Our projects</Link></div>
      </div>
      <figure className="cb-cell cb-hero__ph">
        <div className="cb-duo"><Photo k="solar" pos="50% 66%" sizes="(min-width: 1100px) 38vw, 100vw" priority /><i aria-hidden="true" /></div>
        <figcaption className="cb-tag">CAM 01 — Solar plant at sunrise</figcaption>
        <span className="cb-tick cb-tick--tl" aria-hidden="true" /><span className="cb-tick cb-tick--br" aria-hidden="true" />
      </figure>
      <div className="cb-cell cb-hero__rtc">
        <div className="cb-rtc__top">
          <p className="cb-tag">Build a round-the-clock supply · 24 h</p>
          <div role="group" aria-label="Power sources" className="cb-rtc__sw">
            {([['solar', 'Solar'], ['wind', 'Wind'], ['storage', 'Battery storage']] as const).map(([k, l]) => (
              <button key={k} type="button" aria-pressed={on[k]} onClick={() => toggle(k)} data-k={k}><i aria-hidden="true" />{l}</button>
            ))}
          </div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="cb-rtc__svg" role="img" aria-label={full ? 'Solar, wind and storage together cover the whole day' : 'Selected sources leave parts of the day uncovered'}>
          <defs><pattern id="cb-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#fe3a20" strokeWidth="1.6" /></pattern></defs>
          {[0, 6, 12, 18, 24].map((h) => <g key={h}><line x1={x(h)} x2={x(h)} y1={top - 8} y2={base} stroke="#232b33" /><text x={x(h)} y={H - 1} textAnchor={h === 0 ? 'start' : h === 24 ? 'end' : 'middle'} className="cb-rtc__t">{String(h).padStart(2, '0')}:00</text></g>)}
          <path d={g.gap} fill="url(#cb-hatch)" opacity={full ? 0 : 0.85} className="cb-rtc__gap" />
          <path d={g.solar} className="cb-a cb-a--solar" /><path d={g.wind} className="cb-a cb-a--wind" /><path d={g.store} className="cb-a cb-a--store" />
          <line x1="0" x2={W} y1={top} y2={top} stroke="#e8ecef" strokeDasharray="4 4" /><text x="4" y={top - 7} className="cb-rtc__t cb-rtc__t--d">Demand</text>
        </svg>
        <p className="cb-rtc__read" role="status"><b data-full={full}>{full ? 'Round-the-clock supply' : 'Uncovered hours'}</b> {full ? 'Solar, wind and storage together close the gaps.' : 'Hatched red marks where this mix cannot meet demand. Add sources to close it.'} <span>Illustrative profile, not measured data.</span></p>
      </div>
    </section>
  );
}
