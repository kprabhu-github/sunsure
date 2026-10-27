'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { heroCta } from '../shared/data';

type Src = 'solar' | 'wind' | 'storage';
const W = 600, H = 170, base = H - 16, top = 22;
const hours = Array.from({ length: 49 }, (_, i) => i / 2);
const solar = (h: number) => (h > 6 && h < 18 ? Math.pow(Math.sin(Math.PI * (h - 6) / 12), 1.4) * 1.05 : 0);
const wind = (h: number) => 0.3 + 0.22 * Math.sin((2 * Math.PI * (h + 4)) / 24);
const x = (h: number) => (h / 24) * W;
const y = (v: number) => base - Math.min(v, 1.2) * (base - top);
const mixc = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const part = (h: number) => (h < 5 || h >= 20 ? 'Night' : h < 9 ? 'Dawn' : h < 16 ? 'Midday' : 'Dusk');

/** Hero interaction: one time-of-day control drives the light on the photograph AND a playhead on an illustrative 24 h supply chart. Toggle sources to see which hours each mix covers. Illustrative shape, not data. */
export function HeroD() {
  const [on, setOn] = useState<Record<Src, boolean>>({ solar: true, wind: false, storage: false });
  const [h, setH] = useState(6.5);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);
  useEffect(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setStill(true); setAuto(false); } }, []);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setH((p) => (p >= 23.5 ? 0 : p + 0.5)), 450);
    return () => clearInterval(t);
  }, [auto]);
  const toggle = (k: Src) => { setAuto(false); setOn((p) => ({ ...p, [k]: !p[k] })); };
  const g = useMemo(() => {
    const s = hours.map((t) => (on.solar ? solar(t) : 0));
    const w = hours.map((t) => (on.wind ? wind(t) : 0));
    const b2 = s.map((v, i) => v + w[i]);
    const st = hours.map((_, i) => (on.storage ? Math.max(0, 1 - b2[i]) : 0));
    const tot = b2.map((v, i) => v + st[i]);
    const area = (lo: number[], hi: number[]) => 'M' + hours.map((t, i) => `${x(t).toFixed(1)},${y(hi[i]).toFixed(1)}`).join(' L') + ' L' + [...hours].reverse().map((t, i) => `${x(t).toFixed(1)},${y(lo[hours.length - 1 - i]).toFixed(1)}`).join(' L') + ' Z';
    const zero = hours.map(() => 0);
    return { s, w, st, tot, solar: area(zero, s), wind: area(s, b2), store: area(b2, tot), gap: area(tot.map((v) => Math.min(v, 1)), hours.map(() => 1)), full: !tot.some((v) => v < 0.98) };
  }, [on]);
  const i = Math.round(h * 2);
  const covered = g.tot[i] >= 0.98;
  const by = [on.solar && g.s[i] > 0.05 && 'solar', on.wind && g.w[i] > 0.05 && 'wind', on.storage && g.st[i] > 0.05 && 'storage'].filter(Boolean).join(' + ');
  const day = Math.max(0, Math.sin(Math.PI * (h - 6) / 12));
  const warm = Math.max(0, 1 - Math.abs(h - 6.5) / 2.5) + Math.max(0, 1 - Math.abs(h - 18) / 2.5);
  const night = h < 5 || h > 20 ? 1 : h < 6.5 ? (6.5 - h) / 1.5 : h > 18 ? (h - 18) / 2 : 0;
  const tint = mixc([20, 34, 58], [255, 150, 60], Math.min(1, warm));
  const st = (h - 5.2) / 13.6; /* sun path across the sky */
  const mt = ((((h - 17.6) % 24) + 24) % 24) / 12.8; /* moon path */
  const arc = (t: number) => ({ left: `${8 + 84 * t}%`, top: `${40.9 - 33 * Math.sin(Math.PI * t)}%` });
  const sunUp = st > -0.04 && st < 1.04;
  const moonUp = mt > -0.04 && mt < 1.04;
  const sunPos = arc(st);
  const moonPos = arc(mt);
  const low = sunUp ? 1 - Math.min(1, Math.abs(Math.sin(Math.PI * st)) * 1.6) : 1; /* 1 near horizon */
  const skyRGB = night > 0.05 ? '8,14,40' : '255,120,70';
  const skyA = Math.max(night * 0.55, warm * 0.28);
  const hh = `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`;
  return (
    <section id="overview" className="cd-hero" aria-labelledby="cd-h1">
      <div className="cd-hero__ph" style={{ filter: `brightness(${1.08 + 0.2 * day - 0.4 * night}) saturate(${0.95 + 0.2 * warm - 0.35 * night})` }}>
        <Photo k="solarSky" pos="50% 62%" sizes="100vw" priority />
        
      </div>
      <i className="cd-hero__wash" aria-hidden="true" style={{ background: `linear-gradient(180deg, rgba(${tint.join(',')},${0.12 + 0.3 * night}) 0%, rgba(14,26,22,0) 40%)` }} />
      <i className="cd-hero__shade" aria-hidden="true" />
      <div className="cd-hero__sky" aria-hidden="true">
        <div className="cd-skybox">
          <div className="cd-sky__stars" style={{ opacity: Math.min(1, night * 1.1) }}>{Array.from({ length: 54 }, (_, k) => <b key={k} style={{ left: `${(k * 53 + 7) % 100}%`, top: `${(k * 29 + 5) % 38}%`, ['--tw' as string]: `${2 + (k % 5)}s`, ['--sz' as string]: `${2 + (k % 3)}px` }} />)}<u className="cd-shoot" /></div>
          <div className="cd-cloud cd-cloud--1" style={{ opacity: 0.55 - 0.4 * night }} /><div className="cd-cloud cd-cloud--2" style={{ opacity: 0.45 - 0.3 * night }} />
          <i className="cd-hglow" style={{ left: sunPos.left, opacity: sunUp ? 0.25 + 0.75 * low : 0 }} />
          <div className="cd-sun" style={{ ...sunPos, opacity: sunUp ? 1 : 0, ['--low' as string]: low, ['--sc' as string]: 1 + 0.55 * low }}><span className="cd-sun__bloom" /><span className="cd-sun__streak" /><span className="cd-sun__core" /></div>
          <div className="cd-moon" style={{ ...moonPos, opacity: moonUp ? Math.max(0, Math.min(1, (night - 0.8) * 5)) : 0 }}><span /></div>
        </div>
      </div>
      <div className="cd-sky" aria-hidden="true">
        <i className="cd-sky__tone" style={{ background: `linear-gradient(180deg, rgba(${skyRGB},${skyA}) 0%, rgba(${skyRGB},${skyA * 0.35}) 55%, transparent 80%)` }} />
      </div>
      <i className="cd-hero__glint" aria-hidden="true" />
      <div className="cd-hero__motes" aria-hidden="true">{Array.from({ length: 22 }, (_, k) => <b key={k} style={{ ['--x' as string]: `${(k * 37) % 100}%`, ['--d' as string]: `${6 + (k * 7) % 9}s`, ['--s' as string]: `${(k * 1.3) % 7}s`, ['--z' as string]: `${3 + (k % 4)}px` }} />)}</div>
      <div className="cd-hero__in">
        <div className="cd-hero__copy">
          <p className="cd-tag"><i className="cd-dot" aria-hidden="true" /> India’s Independent Power Producer</p>
          <h1 id="cd-h1">Making India’s <em>Power Move</em></h1>
          <p className="cd-hero__sub">Creating Round-the-Clock Renewable Energy Assets, Powering India’s Unstoppable Growth</p>
          <div className="cd-hero__cta"><Link href={heroCta.href} className="cd-btn">{heroCta.label}<span aria-hidden="true">→</span></Link><Link href="/projects/" className="cd-btn cd-btn--line">Our projects</Link></div>
        </div>
        <div className="cd-panel">
          <div className="cd-panel__top">
            <p className="cd-tag">How a day of supply works · {hh}, {part(h)}</p>
            <div role="group" aria-label="Power sources" className="cd-sw">
              {([['solar', 'Solar'], ['wind', 'Wind'], ['storage', 'Storage']] as const).map(([k, l]) => <button key={k} type="button" aria-pressed={on[k]} data-k={k} onClick={() => toggle(k)}><i aria-hidden="true" />{l}</button>)}
            </div>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="cd-chart" role="img" aria-label={g.full ? 'Selected sources cover the whole day' : 'Selected sources leave part of the day uncovered'}>
            <defs><pattern id="cd-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#c9604a" strokeWidth="1.3" /></pattern></defs>
            {[0, 6, 12, 18, 24].map((t) => <g key={t}><line x1={x(t)} x2={x(t)} y1={top - 6} y2={base} className="cd-chart__grid" /><text x={x(t)} y={H - 2} textAnchor={t === 0 ? 'start' : t === 24 ? 'end' : 'middle'} className="cd-chart__t">{String(t).padStart(2, '0')}</text></g>)}
            <path d={g.gap} fill="url(#cd-hatch)" opacity={g.full ? 0 : 0.8} style={{ transition: 'opacity .4s' }} />
            <path d={g.solar} className="cd-a cd-a--solar" /><path d={g.wind} className="cd-a cd-a--wind" /><path d={g.store} className="cd-a cd-a--store" />
            <line x1="0" x2={W} y1={top} y2={top} className="cd-chart__dem" /><text x="4" y={top - 6} className="cd-chart__t cd-chart__t--d">Demand</text>
            <line x1={x(h)} x2={x(h)} y1={top - 8} y2={base} className="cd-chart__head" /><circle cx={x(h)} cy={y(Math.min(g.tot[i], 1))} r="5" className="cd-chart__dot" />
          </svg>
          <button type="button" className="cd-play" aria-pressed={auto} onClick={() => setAuto((a) => !a)} disabled={still}>{auto ? 'Pause day cycle' : 'Play day cycle'}</button>
          <label className="cd-time"><span>Time of day</span>
            <input type="range" min={0} max={47} value={Math.round(h * 2)} onChange={(e) => { setAuto(false); setH(Number(e.target.value) / 2); }} aria-valuetext={`${hh}, ${part(h)}`} style={{ ['--p' as string]: `${(h / 23.5) * 100}%` }} />
          </label>
          <p className="cd-read" role="status"><b data-ok={covered}>{covered ? 'Covered' : 'Not covered'}</b> {covered ? `at ${hh} by ${by || 'your mix'}.` : `at ${hh} with this mix. Add a source.`} <span>Illustrative profile, not measured data</span></p>
        </div>
      </div>
    </section>
  );
}
