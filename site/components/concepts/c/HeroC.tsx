'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { heroCta } from '../shared/data';

const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
/** Hero interaction: drag the sun across the sky. Sky, sun and light on the photograph follow, expressing "round the clock". Native range input: keyboard and touch work. */
export function HeroC() {
  const [v, setV] = useState(0.08);
  const t = v;
  const dawn = Math.max(0, 1 - t / 0.5), noon = Math.max(0, 1 - Math.abs(t - 0.5) / 0.5), dusk = Math.max(0, (t - 0.5) / 0.5);
  const sunRGB = mix([255, 86, 40], [255, 196, 36], noon);
  const label = t < 0.33 ? 'Dawn' : t < 0.67 ? 'Midday' : 'Dusk';
  const light = dusk > 0.6;
  const sunY = 74 - 58 * Math.sin(Math.PI * t);
  return (
    <section className="cc2-hero" aria-labelledby="cc2-h1" data-light={light}>
      <div className="cc2-sky" aria-hidden="true">
        <i style={{ opacity: dawn }} className="cc2-sky__dawn" /><i style={{ opacity: noon }} className="cc2-sky__noon" /><i style={{ opacity: dusk }} className="cc2-sky__dusk" />
      </div>
      <h1 id="cc2-h1" className="cc2-hero__h"><span>Making India’s</span> <span>Power Move</span></h1>
      <div className="cc2-stage">
        <div className="cc2-sun" aria-hidden="true" style={{ left: `${8 + 84 * t}%`, top: `${sunY}%`, background: `radial-gradient(circle at 40% 38%, rgb(${sunRGB.map((c) => Math.min(255, c + 30)).join(',')}), rgb(${sunRGB.join(',')}) 70%)` }} />
        <div className="cc2-dome" style={{ filter: `brightness(${1 + 0.12 * noon - 0.4 * dusk}) saturate(${1 + 0.15 * dawn})` }}><Photo k="solar" pos="50% 64%" sizes="(min-width: 900px) 36vw, 80vw" priority /></div>
        <div className="cc2-hero__copy">
          <p>Creating Round-the-Clock Renewable Energy Assets, Powering India’s Unstoppable Growth</p>
          <Link href={heroCta.href} className="cc2-btn">{heroCta.label}<span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="cc2-ground">
        <label htmlFor="cc2-sun"><b>Move the sun</b><span aria-live="polite">{label}</span></label>
        <input id="cc2-sun" type="range" min={0} max={100} value={Math.round(v * 100)} onChange={(e) => setV(Number(e.target.value) / 100)} aria-valuetext={label} style={{ ['--p' as string]: `${v * 100}%` }} />
        <div className="cc2-ground__ticks" aria-hidden="true"><span>Dawn</span><span>Midday</span><span>Dusk</span></div>
      </div>
    </section>
  );
}
