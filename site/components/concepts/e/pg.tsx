'use client';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import MAPJSON from '@/content/india-map.json';
import { projects } from '@/content/projects';
import { solutions, advantage, rtcFaqs } from '@/content/solutions';
import { customers } from '@/content/about';
import type { Entry } from '@/content/knowledge';
import './pg.css';

const B = '/concept-e';
const st = (o: Record<string, string | number>) => o as CSSProperties;

/** Gives each inner page its own look: adds a page class to the shell and optionally keeps the header solid. */
export function PgTheme({ name, solid = false, light = false }: { name: string; solid?: boolean; light?: boolean }) {
  useEffect(() => {
    const el = document.querySelector('.ce'); if (!el) return;
    const cls = ['pg', `pg-${name}`, ...(solid ? ['navsolid'] : []), ...(light ? ['lightpg'] : [])];
    el.classList.add(...cls);
    return () => el.classList.remove(...cls);
  }, [name, solid, light]);
  return null;
}

function useIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { el.classList.add('on'); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}

export function Count({ to, suffix = '', dur = 1800 }: { to: number; suffix?: string; dur?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let raf = 0;
    const run = () => {
      if (still) { el.textContent = to + suffix; return; }
      const t0 = performance.now();
      const step = (n: number) => { const t = Math.min(1, (n - t0) / dur), e = 1 - Math.pow(1 - t, 3); el.textContent = Math.round(to * e) + suffix; if (t < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, suffix, dur]);
  return <b ref={ref as never}>0{suffix}</b>;
}

/* ============ ABOUT ============ */
/** The S-mark built from two photographs; its halves slide together when it enters the view. */
export function SMark() {
  const ref = useIn<HTMLDivElement>();
  return (
    <div className="smk" ref={ref} role="img" aria-label="Sunsure mark made of two photographs: wind turbines at sunset and an engineer on a solar field">
      <div className="a"><img src="/images/powerd_image.webp" alt="" /></div>
      <div className="b"><img src="/images/powerd_image.webp" alt="" /></div>
      <i className="ring" />
    </div>
  );
}

export function ValuesList({ items }: { items: { title: string; body: string }[] }) {
  const [on, setOn] = useState(0);
  return (
    <ol className="vlist">
      {items.map((v, i) => (
        <li key={v.title} className={i === on ? 'on' : ''} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)}>
          <button type="button" aria-expanded={i === on}><em>0{i + 1}</em><h3>{v.title}</h3><i aria-hidden="true" /></button>
          <div className="vb"><p>{v.body}</p></div>
        </li>
      ))}
    </ol>
  );
}

const LOGOS = ['alkem', 'bharat-forge', 'emcure', 'esab', 'kirloskar', 'lupin', 'orientbell'];
export function LogoWall() {
  return (
    <div className="lwall">
      <ul>{LOGOS.map((l) => <li key={l}><img src={`/images/customers/${l}.webp`} alt="" loading="lazy" /></li>)}</ul>
      <div className="names" aria-label="Customers">{customers.map((c) => <span key={c}>{c}</span>)}</div>
    </div>
  );
}

/* ============ SOLUTIONS ============ */
const SOLPHOTO: Record<string, string> = {
  'rtc-power': '/images/wind-turbines.jpg', storage: '/images/battery-storage.jpg', recs: '/images/factory-rooftop.jpg',
};
export function SolSwitch() {
  const [b, setB] = useState(0);
  const [open, setOpen] = useState(0);
  const sol = solutions[b];
  const photos = ['/images/wind-turbines.jpg', '/images/battery-storage.jpg', '/images/factory-rooftop.jpg', '/images/transmission.jpg'];
  const pick = (id: string, i: number) => SOLPHOTO[id] ?? photos[(i + b * 2) % photos.length];
  const it = sol.items[Math.min(open, sol.items.length - 1)];
  return (
    <div className="sw">
      <div className="sw-tabs" role="tablist" aria-label="Solutions">
        {solutions.map((s, i) => <button key={s.id} role="tab" aria-selected={i === b} onClick={() => { setB(i); setOpen(0); }}>{s.name}</button>)}
      </div>
      <div className="sw-panel" key={sol.id}>
        <div className="sw-l">
          <span className="eyebrow">{sol.name}</span>
          <h2>{sol.headline}</h2>
          <p className="tg">{sol.tagline}</p>
          <ul className="sw-acc">
            {sol.items.map((x, i) => (
              <li key={x.id} className={i === open ? 'on' : ''}>
                <button type="button" aria-expanded={i === open} onClick={() => setOpen(i)}><span>{x.label}</span><i aria-hidden="true" /></button>
                <div className="sw-ab"><p>{x.body}</p></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="sw-r">
          <div className="ph">{sol.items.map((x, i) => <img key={x.id} className={i === open ? 'on' : ''} src={pick(x.id, i)} alt="" loading="lazy" />)}</div>
          <div className="cap"><b>{it.label}</b><Link className="link" href={`${B}/solutions/${sol.slug}/`}>Know more</Link></div>
        </div>
      </div>
    </div>
  );
}

export function Months() {
  const ref = useIn<HTMLDivElement>();
  return (
    <div className="mos" ref={ref}>
      <div className="mo-h"><span className="eyebrow">Fastest power delivery</span><h3>About six months to power,<br />against about twelve</h3></div>
      <div className="mo-bars">
        <div className="bar us"><span>Sunsure</span><div><i style={st({ '--w': '50%' })}><b>~6 months</b></i></div></div>
        <div className="bar them"><span>Typical delivery</span><div><i style={st({ '--w': '100%' })}><b>~12 months</b></i></div></div>
      </div>
      <p className="mo-n">Delivery times as stated on sunsure-energy.com.</p>
    </div>
  );
}

export function Faq() {
  const [o, setO] = useState(0);
  return (
    <ul className="faq">
      {rtcFaqs.map((f, i) => (
        <li key={f.q} className={i === o ? 'on' : ''}>
          <button type="button" aria-expanded={i === o} onClick={() => setO(i === o ? -1 : i)}><span>{f.q}</span><i aria-hidden="true" /></button>
          <div className="fa"><p>{f.a}</p></div>
        </li>
      ))}
    </ul>
  );
}

export function AdvGrid() {
  return (
    <ul className="advg">
      {advantage.items.map((a, i) => (
        <li key={a.title} className="rv" style={st({ '--d': `${(i % 3) * .08}s` })}>
          <em>0{i + 1}</em><h3>{a.title}</h3><p>{a.body}</p>
        </li>
      ))}
    </ul>
  );
}

/* ============ PROJECTS ============ */
const M = MAPJSON as unknown as Record<string, [string, string]>;
const SPOT: Record<string, { s: 'mh' | 'up'; f: [number, number] }> = {
  dhule: { s: 'mh', f: [.3, .2] }, 'solapur-1': { s: 'mh', f: [.46, .72] }, 'erach-solar': { s: 'up', f: [.2, .76] }, 'augasi-solar': { s: 'up', f: [.36, .7] },
  'pailani-solar': { s: 'up', f: [.5, .78] }, 'pailani-2': { s: 'up', f: [.54, .84] }, 'gursarai-solar': { s: 'up', f: [.3, .62] }, 'panwari-solar': { s: 'up', f: [.38, .84] },
  'pinahat-solar': { s: 'up', f: [.14, .52] }, 'kabrai-solar': { s: 'up', f: [.12, .7] },
};
const PH = { sunrise: '/images/solar-plant-sunrise.webp', robotic: '/images/solar-plant-robotic-cleaning.webp' } as const;
const STATE = { mh: 'Maharashtra', up: 'Uttar Pradesh' } as const;

/** Map as the hero's spine and a one-plant-per-slide viewer, sharing one selection. */
export function PlantsExplorer({ children }: { children?: ReactNode }) {
  const list = useMemo(() => projects.filter((p) => SPOT[p.slug]), []);
  const [cur, setCur] = useState(0);
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>({});
  const paths = useRef<Record<string, SVGPathElement | null>>({});
  useEffect(() => {
    const o: Record<string, { x: number; y: number }> = {};
    list.forEach((p) => { const el = paths.current[SPOT[p.slug].s]; if (!el) return; const b = el.getBBox(); o[p.slug] = { x: b.x + b.width * SPOT[p.slug].f[0], y: b.y + b.height * SPOT[p.slug].f[1] }; });
    setPos(o);
  }, [list]);
  const sum = (s: 'mh' | 'up') => list.filter((p) => SPOT[p.slug].s === s).reduce((a, p) => a + p.mwp, 0);
  const p = list[cur]; const act = SPOT[p.slug].s;
  const go = (i: number) => setCur((i + list.length) % list.length);
  return (
    <>
      <section id="map" className="ch pgp-hero" data-t="5.5" data-name="Dawn" data-label="Presence" aria-label="Our presence">
        <div className="pgp-slant" aria-hidden="true" />
        <div className="wrap pgp-grid">
          <div className="pgp-copy">
            {children}
            <dl className="pgp-n">
              <div><dt>8.3+ GW</dt><dd>pipeline</dd></div>
              <div><dt>16+</dt><dd>states</dd></div>
              <div><dt>800+ MW</dt><dd>commissioned</dd></div>
            </dl>
          </div>
          <div className="pgp-map">
            <svg viewBox="0 0 612 696" role="img" aria-label="Map of India with Sunsure plants in Maharashtra and Uttar Pradesh" preserveAspectRatio="xMidYMid meet">
              <g>{Object.keys(M).map((k) => <path key={k} ref={(el) => { paths.current[k] = el; }} d={M[k][1]} className={`st${k === 'mh' || k === 'up' ? ' hl' : ''}${k === act ? ' act' : ''}`}><title>{M[k][0]}</title></path>)}</g>
              <g className="lead">
                <path d="M 215 332 L 120 332 L 96 318" /><path d="M 300 205 L 470 150 L 500 150" />
                <text x="14" y="352">Maharashtra</text><text className="v" x="14" y="372">{sum('mh')} MWp</text>
                <text x="436" y="140">Uttar Pradesh</text><text className="v" x="436" y="160">{sum('up')} MWp</text>
              </g>
              <g>{list.map((q, i) => { const o = pos[q.slug]; if (!o) return null; return (
                <g key={q.slug} className={`pin${i === cur ? ' on' : ''}`} onClick={() => go(i)} style={{ cursor: 'pointer' }}>
                  <circle className="r" cx={o.x} cy={o.y} r={3} /><circle className="d" cx={o.x} cy={o.y} r={4.2} />
                  <circle cx={o.x} cy={o.y} r={11} fill="transparent" />
                </g>); })}</g>
            </svg>
            <span className="note">Select a pin to open the plant below</span>
          </div>
        </div>
      </section>

      <section id="plants" className="ch pgp-viewer" data-t="12" data-name="Midday" data-label="Plants" aria-label="Commissioned plants">
        <div className="wrap">
          <div className="pgp-vh">
            <div><span className="eyebrow">Commissioned projects</span><h2 className="pgp-h2">Our plants in India</h2></div>
            <div className="pgp-ctl">
              <button className="rb" aria-label="Previous plant" onClick={() => go(cur - 1)}><svg viewBox="0 0 16 16"><path d="M10 2L4 8l6 6" /></svg></button>
              <span><em>{String(cur + 1).padStart(2, '0')}</em> / {String(list.length).padStart(2, '0')}</span>
              <button className="rb" aria-label="Next plant" onClick={() => go(cur + 1)}><svg viewBox="0 0 16 16"><path d="M6 2l6 6-6 6" /></svg></button>
            </div>
          </div>
          <div className="pgp-slide" key={p.slug}>
            <div className="ph"><img src={PH[p.image]} alt={`${p.name} solar plant`} /></div>
            <div className="tx">
              <span className="st">{STATE[act]}</span>
              <h3>{p.name}<small>{p.capacityLabel}</small></h3>
              <p>{p.body.length > 260 ? p.body.slice(0, 257).trimEnd() + '…' : p.body}</p>
              <div className="tags"><span>{p.technology}</span><span className="live">{p.commissioned ? `Commissioned ${p.commissioned}` : p.status}</span></div>
              <Link className="link" href={`${B}/projects/${p.slug}/`}>Open the {p.name} page</Link>
            </div>
          </div>
          <ol className="pgp-dots" aria-label="Plants">{list.map((q, i) => <li key={q.slug}><button className={i === cur ? 'on' : ''} onClick={() => go(i)}><span>{q.name}</span><em>{q.capacityLabel}</em></button></li>)}</ol>
        </div>
      </section>
    </>
  );
}

export function PlantTable() {
  const techs = ['All', ...Array.from(new Set(projects.map((p) => p.technology)))];
  const [t, setT] = useState('All');
  const list = projects.filter((p) => t === 'All' || p.technology === t);
  const max = Math.max(...projects.map((p) => p.mwp));
  return (
    <div className="ptab">
      <div className="pf" role="group" aria-label="Filter by technology">{techs.map((x) => <button key={x} aria-pressed={t === x} onClick={() => setT(x)}>{x}</button>)}</div>
      <ul>
        {list.map((p) => (
          <li key={p.slug}><Link href={`${B}/projects/${p.slug}/`}>
            <span className="n">{p.name}</span>
            <span className="m">{[p.state, p.transmission].filter(Boolean).join(' · ') || p.technology}</span>
            <span className="b"><i style={st({ '--w': `${Math.max(6, (p.mwp / max) * 100)}%` })} /></span>
            <b>{p.capacityLabel}</b>
          </Link></li>
        ))}
      </ul>
    </div>
  );
}

/* ============ CAREERS ============ */
export function RoleMarquee({ words }: { words: string[] }) {
  const w = [...words, ...words, ...words];
  return <div className="pgc-mq" aria-hidden="true"><div>{w.map((x, i) => <span key={i}>{x}<i /></span>)}</div></div>;
}

/* ============ KNOWLEDGE HUB ============ */
const KP = ['/images/transmission.jpg', '/images/wind-turbines.jpg', '/images/battery-storage.jpg', '/images/factory-rooftop.jpg', '/images/solar-plant-robotic-cleaning.webp', '/images/engineers.jpg', '/images/solar-plant-sunrise.webp'];
export function HubBrowser({ posts }: { posts: Entry[] }) {
  const kinds = ['All', 'Blog', 'Webinar', 'Media'] as const;
  const [k, setK] = useState<(typeof kinds)[number]>('All');
  const [q, setQ] = useState('');
  const list = posts.filter((p) => (k === 'All' || p.kind === k) && p.title.toLowerCase().includes(q.trim().toLowerCase()));
  const count = (x: string) => posts.filter((p) => x === 'All' || p.kind === x).length;
  const label = (x: string) => (x === 'All' ? 'All' : x === 'Media' ? 'Media & Awards' : x + 's');
  return (
    <div className="hub">
      <aside className="hub-side">
        <div className="hub-f" role="group" aria-label="Filter">
          {kinds.map((x) => <button key={x} aria-pressed={k === x} onClick={() => setK(x)}><span>{label(x)}</span><em>{count(x)}</em></button>)}
        </div>
        <label className="hub-s"><span>Search</span><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a word" /></label>
      </aside>
      <ul className="hub-g">
        {list.length === 0 && <li className="none">Nothing matches that. Try another word.</li>}
        {list.map((p, i) => (
          <li key={p.href} className={i === 0 && !q ? 'lead' : ''}>
            <a href={p.href} target="_blank" rel="noopener noreferrer">
              <div className="im"><img src={KP[(posts.indexOf(p)) % KP.length]} alt="" loading="lazy" /><span className="cat">{p.kind}</span><i className="sb" aria-hidden="true" /></div>
              <div className="tx"><time>{p.date}</time><h3>{p.title}</h3>{(p.excerpt || p.readTime) && <p>{p.excerpt ?? `${p.readTime} read`}</p>}<span className="go">Read on sunsure-energy.com</span></div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============ CONTACT ============ */
const NEEDS = ['RE RTC solutions (24/7 green power)', 'Green energy open access', 'Energy storage', 'Not sure yet, advise me'];
const LOADS = ['Under 1 MW', '1 to 5 MW', '5 to 20 MW', 'Above 20 MW'];
export function QuoteFlow({ to = 'info@sunsure.in' }: { to?: string }) {
  const [s, setS] = useState(0);
  const [need, setNeed] = useState('');
  const [load, setLoad] = useState('');
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', note: '' });
  const [sent, setSent] = useState(false);
  const ok = f.name.trim() && /\S+@\S+\.\S+/.test(f.email);
  const send = (e: React.FormEvent) => {
    e.preventDefault(); if (!ok) return;
    const body = [`Name: ${f.name}`, `Company: ${f.company}`, `Email: ${f.email}`, `Phone: ${f.phone}`, `Looking for: ${need}`, `Load: ${load}`, '', f.note].join('\n');
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('Free quote request: ' + (need || 'Sunsure'))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const steps = ['What you need', 'Your load', 'About you'];
  return (
    <div className="qf">
      <ol className="qf-s" aria-label="Steps">{steps.map((x, i) => <li key={x} className={i === s ? 'on' : i < s ? 'done' : ''}><button type="button" disabled={i > s} onClick={() => setS(i)}><em>{i + 1}</em>{x}</button></li>)}</ol>
      {sent ? (
        <div className="qf-ok"><h3>Your email app should have opened.</h3><p>Send the message there and the team will come back to you. If nothing opened, write to <a href={`mailto:${to}`}>{to}</a>.</p></div>
      ) : s === 0 ? (
        <div className="qf-b"><h3>What are you looking for?</h3>
          <div className="qf-c">{NEEDS.map((n) => <button key={n} type="button" className={need === n ? 'on' : ''} onClick={() => { setNeed(n); setS(1); }}>{n}</button>)}</div></div>
      ) : s === 1 ? (
        <div className="qf-b"><h3>How big is your power load?</h3>
          <div className="qf-c two">{LOADS.map((n) => <button key={n} type="button" className={load === n ? 'on' : ''} onClick={() => { setLoad(n); setS(2); }}>{n}</button>)}</div>
          <button type="button" className="qf-back" onClick={() => setS(0)}>Back</button></div>
      ) : (
        <form className="qf-b" onSubmit={send}><h3>Where should we send the quote?</h3>
          <div className="qf-r"><label>Name<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" required /></label>
            <label>Company<input value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} autoComplete="organization" /></label></div>
          <div className="qf-r"><label>Email<input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" required /></label>
            <label>Phone<input type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} autoComplete="tel" /></label></div>
          <label>Anything we should know<textarea rows={3} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></label>
          <p className="qf-sum">{need || 'Need not chosen'} · {load || 'Load not chosen'}</p>
          <div className="qf-a"><button type="button" className="qf-back" onClick={() => setS(1)}>Back</button><button className="btn" disabled={!ok}>Request free quote</button></div></form>
      )}
    </div>
  );
}

/* ============ shared compact page head for detail pages ============ */
export function PgHead({ eyebrow, lines, sub, img, crumbs, tone = 'dark', children }: { eyebrow: string; lines: string[]; sub?: string; img?: string; crumbs: { label: string; href?: string }[]; tone?: 'dark' | 'light'; children?: ReactNode }) {
  return (
    <section className={`ch pgh ${tone}`} data-t="5.5" data-name="Dawn" data-label="Intro">
      <div className="wrap pgh-g">
        <div className="pgh-c">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href={`${B}/`}>Home</Link>{crumbs.map((c) => c.href ? <Link key={c.label} href={c.href}>{c.label}</Link> : <span key={c.label}>{c.label}</span>)}</nav>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="pgh-h">{lines.map((l, i) => <span key={l} className="ln"><span style={st({ '--i': i })}>{l}</span></span>)}</h1>
          {sub && <p className="sub">{sub}</p>}
          {children}
        </div>
        {img && <div className="pgh-i"><img src={img} alt="" /></div>}
      </div>
    </section>
  );
}
