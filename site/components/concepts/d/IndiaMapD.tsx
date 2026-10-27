'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects } from '../shared/data';
import map from './indiaDots.json';
import { indiaOutline } from './indiaOutline';

type St = 'Maharashtra' | 'Uttar Pradesh';
const nodes: Record<St, { x: number; y: number }> = {
  Maharashtra: { x: map.mh[0], y: map.mh[1] },
  'Uttar Pradesh': { x: map.up[0], y: map.up[1] },
};
const R = 62;
const sum = (s: St) => projects.filter((p) => p.state === s).reduce((a, p) => a + p.mwp, 0);
function useCount(to: number) {
  const [v, setV] = useState(to);
  const from = useRef(to);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); from.current = to; return; }
    const a = from.current, t0 = performance.now(); let raf = 0;
    const tick = (t: number) => { const k = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - k, 3); setV(a + (to - a) * e); if (k < 1) raf = requestAnimationFrame(tick); else from.current = to; };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return Math.round(v * 10) / 10;
}
function Total({ s, to }: { s: St; to: number }) { return <b aria-label={`${s} ${to} MWp`}>{useCount(to)} MWp</b>; }
const near = (x: number, y: number, s: St) => Math.hypot(x - nodes[s].x, y - nodes[s].y) < R;

export function IndiaMapD() {
  const [st, setSt] = useState<St>('Uttar Pradesh');
  const [seen, setSeen] = useState(false);
  const fig = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = fig.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const list = projects.filter((p) => p.state === st);
  const a = nodes.Maharashtra, b = nodes['Uttar Pradesh'];
  const sunPath = `M${map.W - 20} ${map.H * 0.5} Q ${map.W / 2} ${-map.H * 0.12} 20 ${map.H * 0.5}`;
  const arc = `M${a.x} ${a.y} Q ${a.x + 70} ${(a.y + b.y) / 2 - 10} ${b.x} ${b.y}`;
  return (
    <div className="cd-map">
      <div className="cd-map__panel">
        <div role="group" aria-label="Choose a state" className="cd-map__tabs">
          {(Object.keys(nodes) as St[]).map((s) => (
            <button key={s} type="button" aria-pressed={st === s} onClick={() => setSt(s)}>
              <span>{s}</span><Total s={s} to={Math.round(sum(s) * 10) / 10} />
            </button>
          ))}
        </div>
        <ul className="cd-map__list" aria-live="polite">
          {list.map((p) => (
            <li key={p.slug}>
              <Link href="/projects/"><span>{p.name}</span><small>{p.commissioned ?? p.technology}</small></Link>
              <b>{p.capacityLabel}</b>
            </li>
          ))}
        </ul>
        <p className="cd-map__note">Schematic map. Markers show the state, not the plant site. Plants listed are those published on the Sunsure website.</p>
      </div>
      <figure className={seen ? "cd-map__fig is-in" : "cd-map__fig"}>
        <svg ref={fig} viewBox={`0 0 ${map.W} ${map.H}`} role="img" aria-label="Dot map of India with Sunsure commissioned plants in Maharashtra and Uttar Pradesh">
          <defs>
            <radialGradient id="cdSunG"><stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".25" stopColor="#ffb347" stopOpacity=".9" /><stop offset="1" stopColor="#ff6a3d" stopOpacity="0" /></radialGradient>
            <radialGradient id="cdMaskG"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
            <mask id="cdSunMask" maskUnits="userSpaceOnUse" x="0" y="0" width={map.W} height={map.H}>
              <circle r="130" fill="url(#cdMaskG)"><animateMotion dur="9s" repeatCount="indefinite" path={sunPath} /></circle>
            </mask>
          </defs>
          <path d={indiaOutline} className="cd-map__out" pathLength={1} fill="none" />          <g className="cd-map__dim">
            {map.dots.map(([x, y], i) => {
              const hot = near(x, y, st);
              return <circle key={i} cx={x} cy={y} r={hot ? 3.6 : 2.9} className={hot ? 'cd-map__d is-hot' : 'cd-map__d'} style={{ ['--d1' as string]: `${(Math.hypot(x - map.W / 2, y - map.H / 2) * 0.004).toFixed(2)}s` }} />;
            })}
          </g>
          <g mask="url(#cdSunMask)" className="cd-map__lit">{map.dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.4" />)}</g>
          <g className="cd-map__sun"><circle r="46" fill="url(#cdSunG)"><animateMotion dur="9s" repeatCount="indefinite" path={sunPath} /></circle><circle r="9" fill="#fff"><animateMotion dur="9s" repeatCount="indefinite" path={sunPath} /></circle></g>
          <path id="cdArc" d={arc} className="cd-map__arc" fill="none" />
          {(Object.keys(nodes) as St[]).map((s) => (
            <g key={s} className={st === s ? 'cd-map__n is-on' : 'cd-map__n'} transform={`translate(${nodes[s].x} ${nodes[s].y})`} onClick={() => setSt(s)}>
              {st === s && <g className="cd-map__rays">{Array.from({ length: 12 }, (_, k) => <line key={k} x1="16" x2="30" y1="0" y2="0" transform={`rotate(${k * 30})`} style={{ animationDelay: `${(k * 0.12).toFixed(2)}s` }} />)}</g>}
              <circle r="10" className="cd-map__r1" /><circle r="10" className="cd-map__r2" /><circle r="6" className="cd-map__c" />
              <text x={s === 'Maharashtra' ? -18 : 18} y="4" textAnchor={s === 'Maharashtra' ? 'end' : 'start'}>{s}</text>
            </g>
          ))}
        </svg>
      </figure>
    </div>
  );
}
