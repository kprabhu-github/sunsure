'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import MAPJSON from '@/content/india-map.json';
import { startFilm } from './bandFilm';
import { projects } from '@/content/projects';
import { projectImage } from '@/components/projects/project-images';

const PHOTOS = ['/images/solar-plant-sunrise.webp', '/images/hero-wind-sunrise.webp', '/images/solar-plant-robotic-cleaning.webp', '/images/hero-solar-sunrise.webp', '/images/hero-solar-nosun.webp'];

/* ---- expanding photo panels (homepage solutions) ---- */
export function Panels({ items }: { items: { id: string; label: string; body: string; href?: string }[] }) {
  const [on, setOn] = useState(0);
  return (
    <div className="srow rv">
      {items.map((it, i) => (
        <div key={it.id} className={`sp${on === i ? ' on' : ''}`} tabIndex={0} role="button" aria-expanded={on === i} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)}>
          <img src={PHOTOS[i % PHOTOS.length]} alt="" loading="lazy" />
          <div className="shd" /><span className="n">0{i + 1}</span><span className="vt">{it.label}</span>
          <div className="bd"><h3>{it.label}</h3><p>{it.body}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ---- one day of supply: solar + wind + storage fill the 24 hours ---- */
const sol = (h: number) => Math.max(0, Math.sin(((h - 6) / 12) * Math.PI)) ** 1.3;
const wnd = (h: number) => .42 + .3 * Math.cos(((h - 2) / 24) * Math.PI * 2) + .06 * Math.sin(h * 1.7);
export function DayChart({ title = 'One day of supply', storage = true }: { title?: string; storage?: boolean }) {
  const [h, setH] = useState(13);
  const [play, setPlay] = useState(true);
  const [withS, setWithS] = useState(storage);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current; if (!el || !play) return; let vis = false;
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }); io.observe(el);
    const id = setInterval(() => { if (vis) setH((x) => (x + 1) % 24); }, 700);
    return () => { io.disconnect(); clearInterval(id); };
  }, [play]);
  const bars = Array.from({ length: 24 }, (_, i) => { const s = Math.min(1, sol(i) * 1.1), tot = Math.min(1, s + wnd(i) * .55); return { s, w: tot - s, b: withS ? 1 - tot : 0 }; });
  const c = bars[h];
  const X = 20, Wd = 560, Hh = 200, bw = Wd / 24;
  return (
    <div className="dayc rv" ref={box}>
      <h4>{title}<small>{withS ? 'Solar + wind + storage' : 'Solar + wind only'}</small></h4>
      <div className="mode" role="group" aria-label="Supply mix">
        <button aria-pressed={!withS} onClick={() => setWithS(false)}>Without storage</button>
        <button aria-pressed={withS} onClick={() => setWithS(true)}>With storage (RTC)</button>
      </div>
      <svg viewBox={`0 0 ${X + Wd + 10} ${Hh + 28}`} role="img" aria-label="Hourly share of demand met by solar, wind and battery storage">
        {bars.map((b, i) => { const x = X + i * bw; const hs = b.s * Hh, hw = b.w * Hh, hb = b.b * Hh; return (
          <g key={i}><rect className="bg0" x={x + 1} y={0} width={bw - 2} height={Hh} rx="2" />
            <rect className="bs" x={x + 1} y={Hh - hs} width={bw - 2} height={hs} /><rect className="bw" x={x + 1} y={Hh - hs - hw} width={bw - 2} height={hw} /><rect className="bb" x={x + 1} y={Hh - hs - hw - hb} width={bw - 2} height={hb} /></g>); })}
        <line className="cur" x1={X + h * bw + bw / 2} x2={X + h * bw + bw / 2} y1="0" y2={Hh + 6} />
        {[0, 6, 12, 18, 23].map((t) => <text key={t} className="ax" x={X + t * bw + bw / 2} y={Hh + 20} textAnchor="middle">{String(t).padStart(2, '0')}:00</text>)}
      </svg>
      <div className="ro">
        <span><i style={{ background: '#f2b04a' }} />Solar <b>{Math.round(c.s * 100)}%</b></span>
        <span><i style={{ background: '#8aa4b8' }} />Wind <b>{Math.round(c.w * 100)}%</b></span>
        <span><i style={{ background: 'var(--red)' }} />Storage <b>{Math.round(c.b * 100)}%</b></span>
        <span>Met <b>{Math.round((c.s + c.w + c.b) * 100)}%</b></span>
      </div>
      <div className="ctl">
        <button className="pp" aria-label={play ? 'Pause' : 'Play'} onClick={() => setPlay(!play)}>{play ? <svg viewBox="0 0 14 14"><rect x="2" y="1" width="3.5" height="12" /><rect x="8.5" y="1" width="3.5" height="12" /></svg> : <svg viewBox="0 0 14 14"><path d="M3 1l10 6-10 6z" /></svg>}</button>
        <output>{String(h).padStart(2, '0')}:00</output>
        <input type="range" min={0} max={23} value={h} aria-label="Hour of day" onChange={(e) => { setPlay(false); setH(+e.target.value); }} />
      </div>
    </div>
  );
}

/* ---- off-site power: plant -> grid -> your factory ---- */
export function GridPath({ tag = 'Intra-state and inter-state connectivity' }: { tag?: string }) {
  return (
    <div className="gpath rv">
      <svg viewBox="0 0 640 260" role="img" aria-label="Power flows from an off-site solar and wind plant over the grid to your factory">
        <g transform="translate(20 120)">{[0, 1, 2].map((i) => <path key={i} className="pn" d={`M${i * 34} 70 l12 -34 h40 l-12 34z`} />)}<text x="0" y="104">Off-site plant</text></g>
        <g transform="translate(150 40)"><path d="M0 100 V20 M-20 40 H20" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none" /><path d="M170 100 V10 M150 32 H190" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none" /></g>
        <path className="ln1" d="M110 170 C150 170 150 80 200 80 S300 80 340 80 S420 170 480 170" />
        <path className="fl1" d="M110 170 C150 170 150 80 200 80 S300 80 340 80 S420 170 480 170" />
        <text x="215" y="62">{tag}</text>
        <g transform="translate(470 110)"><rect className="fac" x="0" y="20" width="130" height="60" /><rect className="fac" x="14" y="0" width="50" height="22" />{[0, 1, 2, 3, 4].map((i) => <rect key={i} className="win" x={12 + i * 22} y="46" width="10" height="9" opacity=".85" />)}<text x="0" y="104">Your site</text></g>
      </svg>
    </div>
  );
}

/* ---- night band: the live film ---- */
export function NightBand({ lines, sub, cta }: { lines: string[]; sub: string; cta?: { label: string; href: string } }) {
  const cv = useRef<HTMLCanvasElement>(null); const host = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!cv.current || !host.current) return;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    return startFilm(cv.current, host.current);
  }, []);
  return (
    <section id="band" className="ch ce-band" ref={host} data-t="21" data-name="Night" data-label="Round the clock">
      <div className="bg"><canvas ref={cv} width={1280} height={720} aria-hidden="true" /></div>
      <div className="in">
        <span className="eyebrow">Round-the-clock</span>
        <h2>{lines.map((l, i) => <span key={l} className="bl">{i === lines.length - 1 ? <em className="r">{l}</em> : l}</span>)}</h2>
        <p>{sub}</p>
        {cta && <Link className="btn" href={cta.href}>{cta.label}</Link>}
      </div>
    </section>
  );
}

/* ---- the India map as an interface ---- */
const SPOT: Record<string, { s: 'mh' | 'up'; f: [number, number] }> = {
  dhule: { s: 'mh', f: [.3, .2] }, 'solapur-1': { s: 'mh', f: [.46, .72] }, 'erach-solar': { s: 'up', f: [.2, .76] }, 'augasi-solar': { s: 'up', f: [.36, .7] },
  'pailani-solar': { s: 'up', f: [.5, .78] }, 'pailani-2': { s: 'up', f: [.54, .84] }, 'gursarai-solar': { s: 'up', f: [.3, .62] }, 'panwari-solar': { s: 'up', f: [.38, .84] },
  'pinahat-solar': { s: 'up', f: [.14, .52] }, 'kabrai-solar': { s: 'up', f: [.12, .7] },
};
const STN = { mh: 'Maharashtra', up: 'Uttar Pradesh' } as const;
const M = MAPJSON as unknown as Record<string, [string, string]>;
export function IndiaMap({ focus, interactive = true }: { focus?: string; interactive?: boolean }) {
  const list = projects.filter((p) => SPOT[p.slug]);
  const start = Math.max(0, list.findIndex((p) => p.slug === focus));
  const [cur, setCur] = useState(start);
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>({});
  const [vb, setVb] = useState({ x: 0, y: 0, w: 612, h: 696 });
  const paths = useRef<Record<string, SVGPathElement | null>>({});
  const box = useRef<HTMLDivElement>(null);
  const auto = useRef(interactive && !focus); const hover = useRef(false);
  const vbRef = useRef(vb); vbRef.current = vb;

  useEffect(() => {
    const o: Record<string, { x: number; y: number }> = {};
    list.forEach((p) => { const el = paths.current[SPOT[p.slug].s]; if (!el) return; const b = el.getBBox(); o[p.slug] = { x: b.x + b.width * SPOT[p.slug].f[0], y: b.y + b.height * SPOT[p.slug].f[1] }; });
    setPos(o);
  }, []); // eslint-disable-line

  useEffect(() => {
    const p = list[cur]; const q = pos[p.slug]; if (!q) return;
    const z = 2.6, w = 612 / z, h = 696 / z;
    const to = { x: Math.max(-20, Math.min(612 - w + 20, q.x - w / 2)), y: Math.max(-20, Math.min(696 - h + 20, q.y - h / 2)), w, h };
    const from = { ...vbRef.current }; const t0 = performance.now(); let raf = 0;
    const ease = (t: number) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now: number) => { const t = Math.min(1, (now - t0) / 1300), e = ease(t); setVb({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e }); if (t < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [cur, pos]); // eslint-disable-line

  useEffect(() => {
    if (!auto.current) return; const el = box.current; if (!el) return; let vis = false;
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }); io.observe(el);
    const id = setInterval(() => { if (vis && !hover.current && auto.current) setCur((c) => (c + 1) % list.length); }, 5200);
    return () => { io.disconnect(); clearInterval(id); };
  }, []); // eslint-disable-line

  const go = (i: number) => { auto.current = false; setCur((i + list.length) % list.length); };
  const p = list[cur]; const img = projectImage[p.image]; const z = 612 / vb.w;
  const act = SPOT[p.slug].s;
  return (
    <div className="pj" ref={box} onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}>
      <div className="pj-l">
        <div className="pcard" aria-live="polite">
          <div className="ph"><img src={img.src} alt={img.alt} /></div>
          <div className="pt">
            <div className="idx"><em>{String(cur + 1).padStart(2, '0')}</em><span>{STN[act]}</span></div>
            <h3>{p.name}<small>{p.capacityLabel}</small></h3>
            <p>{p.body.length > 190 ? p.body.slice(0, 187).trimEnd() + '…' : p.body}</p>
            <div className="tags"><span className="tag">{p.technology}</span><span className="tag live">{p.commissioned ? `Commissioned ${p.commissioned}` : p.status}</span></div>
          </div>
        </div>
        <div className="pctl">
          <button className="rb" aria-label="Previous plant" onClick={() => go(cur - 1)}><svg viewBox="0 0 16 16"><path d="M10 2L4 8l6 6" /></svg></button>
          <div className="bar"><i style={{ width: `${((cur + 1) / list.length) * 100}%` }} /></div>
          <button className="rb" aria-label="Next plant" onClick={() => go(cur + 1)}><svg viewBox="0 0 16 16"><path d="M6 2l6 6-6 6" /></svg></button>
        </div>
        <Link className="link" href={`/concept-e/projects/${p.slug}/`}>Open the {p.name} page</Link>
      </div>
      <div className="pj-map">
        <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} role="img" aria-label="Map of India with Sunsure plants" preserveAspectRatio="xMidYMid meet">
          <g>{Object.keys(M).map((k) => <path key={k} ref={(el) => { paths.current[k] = el; }} d={M[k][1]} className={`st${k === 'mh' || k === 'up' ? ' hl' : ''}${k === act ? ' act' : ''}`}><title>{M[k][0]}</title></path>)}</g>
          <g>{list.map((q, i) => { const o = pos[q.slug]; if (!o) return null; return (
            <g key={q.slug} className={`pin${i === cur ? ' on' : ''}`} style={{ cursor: 'pointer' }} onClick={() => go(i)}>
              <circle className="r" cx={o.x} cy={o.y} r={2} style={{ strokeWidth: (.7 / Math.sqrt(z)).toFixed(2) }} />
              <circle className="d" cx={o.x} cy={o.y} r={(3.2 / Math.sqrt(z)).toFixed(2)} /></g>); })}
            {pos[p.slug] && <text className="mlabel" x={pos[p.slug].x} y={pos[p.slug].y - 6} style={{ fontSize: 6 }} textAnchor="middle">{p.name}</text>}</g>
        </svg>
        <div className={`mini${z > 1.2 ? ' on' : ''}`} aria-hidden="true"><svg viewBox="0 0 612 696">{Object.keys(M).map((k) => <path key={k} d={M[k][1]} />)}<rect x={vb.x} y={vb.y} width={vb.w} height={vb.h} /></svg></div>
        <span className="map-note">Plants in Maharashtra and Uttar Pradesh shown</span>
      </div>
    </div>
  );
}

/* ---- project list with filters ---- */
export function ProjectList() {
  const techs = ['All', ...Array.from(new Set(projects.map((p) => p.technology)))];
  const [t, setT] = useState('All');
  const list = projects.filter((p) => t === 'All' || p.technology === t);
  return (
    <>
      <div className="filt" role="group" aria-label="Filter by technology" style={{ marginTop: 6, flexWrap: 'wrap' }}>
        {techs.map((x) => <button key={x} aria-pressed={t === x} onClick={() => setT(x)}>{x}</button>)}
      </div>
      <ul className="rows">
        {list.map((p) => (
          <li key={p.slug}><Link className="row" href={`/concept-e/projects/${p.slug}/`}>
            <h3>{p.name}</h3><p>{[p.state, p.technology, p.transmission].filter(Boolean).join(' · ')}</p><span className="meta">{p.capacityLabel}</span>
          </Link></li>
        ))}
      </ul>
    </>
  );
}

/* ---- knowledge hub rail ---- */
export type PostItem = { title: string; date: string; href: string; kind: 'Blog' | 'Webinar' | 'Media'; excerpt?: string; readTime?: string };
export function Rail({ posts }: { posts: PostItem[] }) {
  const [f, setF] = useState<'All' | 'Blog' | 'Webinar' | 'Media'>('All');
  const list = posts.filter((p) => f === 'All' || p.kind === f);
  const ref = useRef<HTMLDivElement>(null); const bar = useRef<HTMLElement>(null);
  const drag = useRef({ d: false, x: 0, s: 0, moved: false });
  const upd = () => { const e = ref.current; if (!e || !bar.current) return; const m = e.scrollWidth - e.clientWidth; bar.current.style.width = `${30 + (m > 0 ? (e.scrollLeft / m) * 70 : 70)}%`; };
  useEffect(() => { upd(); if (ref.current) ref.current.scrollLeft = 0; }, [f]);
  return (
    <div className="rail-wrap">
      <div className="filt" role="group" aria-label="Filter" style={{ marginBottom: 22, flexWrap: 'wrap' }}>
        {(['All', 'Blog', 'Webinar', 'Media'] as const).map((x) => <button key={x} aria-pressed={f === x} onClick={() => setF(x)}>{x === 'All' ? 'All' : x === 'Media' ? 'Media & Awards' : x + 's'}</button>)}
      </div>
      <div className={`rail${drag.current.d ? ' drag' : ''}`} ref={ref} onScroll={upd}
        onPointerDown={(e) => { drag.current = { d: true, x: e.clientX, s: ref.current!.scrollLeft, moved: false }; }}
        onPointerMove={(e) => { const d = drag.current; if (!d.d) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; if (d.moved && e.pointerType === 'mouse') ref.current!.scrollLeft = d.s - dx; }}
        onPointerUp={() => { drag.current.d = false; }} onPointerLeave={() => { drag.current.d = false; }}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}>
        {list.map((p, i) => (
          <a key={p.href} className="post" href={p.href} target="_blank" rel="noopener noreferrer" draggable={false}>
            <div className="im"><img src={PHOTOS[i % PHOTOS.length]} alt="" loading="lazy" draggable={false} /><span className="cat">{p.kind}</span><b>{p.title.length > 70 ? p.title.slice(0, 68).trimEnd() + '…' : p.title}</b></div>
            <h3>{p.excerpt ?? (p.readTime ? `${p.readTime} read` : p.kind)}</h3>
            <time>{p.date}</time>
          </a>
        ))}
      </div>
      <div className="rail-ctl"><div className="bar"><i ref={bar as never} /></div></div>
    </div>
  );
}
