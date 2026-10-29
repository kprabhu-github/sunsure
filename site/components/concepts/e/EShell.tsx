'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { company } from '@/content/site';
import './e.css';

const B = '/concept-e';
const menu = [
  { label: 'About', href: `${B}/about/`, items: [['Company Overview', `${B}/about/`], ['Media & Awards', `${B}/knowledge-hub/#media`]] },
  { label: 'Solutions', href: `${B}/solutions/`, items: [['RE RTC Solutions', `${B}/solutions/re-100-solutions/`], ['Green Energy Open Access', `${B}/solutions/green-energy-off-site/`]] },
  { label: 'Projects', href: `${B}/projects/`, items: [['Portfolio', `${B}/projects/`], ['Our plants in India', `${B}/projects/#plants`]] },
  { label: 'Careers', href: `${B}/careers/`, items: [['Careers at Sunsure', `${B}/careers/`], ['Job Openings', `${B}/job-openings/`]] },
  { label: 'Knowledge Hub', href: `${B}/knowledge-hub/`, items: [['Blogs', `${B}/knowledge-hub/#blogs`], ['Webinars', `${B}/knowledge-hub/#webinars`]] },
] as const;
const footNav = [['About', `${B}/about/`], ['Solutions', `${B}/solutions/`], ['Projects', `${B}/projects/`], ['Contact Us', `${B}/contact/`], ['Privacy Policy', '/privacy-policy/'], ['Careers', `${B}/careers/`], ['Knowledge Hub', `${B}/knowledge-hub/`], ['Media & Awards', `${B}/knowledge-hub/#media`], ['Sunsure Power Market', '/sunsure-power-market/']] as const;

/* the clock: scroll = time of day (same stops as the homepage) */
const TK: [number, number[], number[]][] = [[5.5, [255, 138, 76, .30], [27, 24, 24]], [9, [255, 214, 160, .17], [33, 30, 29]], [12, [255, 246, 232, .12], [40, 37, 36]], [15.5, [255, 196, 130, .15], [35, 32, 30]], [18.5, [255, 90, 51, .26], [26, 22, 22]], [21.5, [60, 82, 150, .22], [20, 20, 26]], [25, [28, 39, 72, .2], [18, 18, 23]], [29.5, [255, 138, 76, .30], [27, 24, 24]]];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function paintSky(el: HTMLElement, h: number) {
  let i = 0; while (i < TK.length - 2 && h > TK[i + 1][0]) i++;
  const a = TK[i], b = TK[i + 1]; let t = Math.max(0, Math.min(1, (h - a[0]) / (b[0] - a[0]))); t = t * t * (3 - 2 * t);
  const g = a[1].map((v, k) => lerp(v, b[1][k], t)), bg = a[2].map((v, k) => lerp(v, b[2][k], t));
  el.style.setProperty('--glow', `rgba(${g[0].toFixed(0)},${g[1].toFixed(0)},${g[2].toFixed(0)},${g[3].toFixed(3)})`);
  el.style.backgroundColor = `rgb(${bg.map(Math.round).join(',')})`;
  const p = Math.max(0, Math.min(1, (h - 5.5) / 13));
  el.style.setProperty('--sx', (h < 18.5 ? lerp(12, 88, p) : 50) + '%');
  el.style.setProperty('--sy', (h < 18.5 ? 78 - Math.sin(p * Math.PI) * 62 : h < 24 ? 100 : 118 - (h - 24) * 3) + '%');
}

export function EShell({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const skyEl = useRef<HTMLDivElement>(null);
  const clockEl = useRef<HTMLDivElement>(null);
  const chapEl = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [ticks, setTicks] = useState<{ label: string; id: string }[]>([]);
  const [on, setOn] = useState(0);
  const path = usePathname();

  useEffect(() => { root.current?.classList.add('js'); }, []);

  useEffect(() => {
    const el = root.current; if (!el) return;
    setOpen(false);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    const scan = () => el.querySelectorAll('.rv:not(.in),.hl:not(.in),.rise:not(.in)').forEach((n) => io.observe(n));
    const mo = new MutationObserver(scan); mo.observe(el, { childList: true, subtree: true }); scan();

    let chs: HTMLElement[] = [];
    const collect = () => {
      chs = Array.from(el.querySelectorAll<HTMLElement>('.ch'));
      chs.forEach((c, i) => { if (!c.id) c.id = `ch${i}`; });
      setTicks(chs.map((c) => ({ label: c.dataset.label ?? '', id: c.id })));
    };
    collect();
    let lastH = -1, lastI = -1, raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      setSolid(scrollY > 40);
      if (!chs.length || !skyEl.current) return;
      const probe = innerHeight * 0.5; let idx = 0, local = 0;
      for (let i = 0; i < chs.length; i++) { const r = chs[i].getBoundingClientRect(); if (r.top <= probe) { idx = i; local = Math.max(0, Math.min(1, (probe - r.top) / Math.max(1, r.height))); } }
      const t0 = +(chs[idx].dataset.t ?? 5.5), t1 = idx < chs.length - 1 ? +(chs[idx + 1].dataset.t ?? t0 + .5) : t0 + .5;
      const h = lerp(t0, t1, local);
      if (Math.abs(h - lastH) > .01) {
        lastH = h; paintSky(skyEl.current, h);
        const hh = Math.floor(h) % 24, mi = Math.floor((h % 1) * 60 / 5) * 5;
        if (clockEl.current) clockEl.current.textContent = `${String(hh).padStart(2, '0')}:${String(mi).padStart(2, '0')}`;
      }
      if (idx !== lastI) { lastI = idx; setOn(idx); if (chapEl.current) chapEl.current.innerHTML = `${chs[idx].dataset.name}<br>${chs[idx].dataset.label}`; }
    };
    paintSky(skyEl.current!, 5.5); raf = requestAnimationFrame(frame);
    const late = setTimeout(collect, 400);
    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); clearTimeout(late); };
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', k); return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { if (!location.hash) window.scrollTo(0, 0); }, [path]);

  return (
    <div className="ce" ref={root}>
      <a className="skip" href="#ce-main">Skip to main content</a>
      <div className="ce-sky" ref={skyEl} aria-hidden="true" />
      <header className={`top${solid ? ' solid' : ''}`}>
        <Link className="logo" href={`${B}/`} aria-label="Sunsure Energy, home"><img src="/images/sunsure-logo.svg" alt="Sunsure Energy" width={150} height={45} /></Link>
        <nav className="hnav" aria-label="Primary">
          {menu.map((g) => (
            <div className="nv has" key={g.label} onClick={(e) => { e.currentTarget.classList.add('shut'); (document.activeElement as HTMLElement | null)?.blur(); }} onMouseLeave={(e) => e.currentTarget.classList.remove('shut')}>
              <Link href={g.href}>{g.label}</Link>
              <div className="dd">{g.items.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}</div>
            </div>
          ))}
          <Link className="btn" href={`${B}/contact/`}>Contact Us</Link>
        </nav>
      </header>
      <aside className="hud" aria-label="Page clock">
        <div className="clock" ref={clockEl} aria-hidden="true">05:30</div>
        <div className="chap" ref={chapEl} aria-hidden="true">Dawn</div>
        <ul>{ticks.map((t, i) => (
          <li key={t.id} className={i === on ? 'on' : ''}><button aria-label={t.label} onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' })}><span>{t.label}</span><i /></button></li>
        ))}</ul>
      </aside>
      <main id="ce-main" tabIndex={-1} style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      <EFooter />
    </div>
  );
}

function EFooter() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current; if (!c) return; const a = c.getContext('2d'); if (!a) return;
    const RAMP = ' .,:;i1tfLCG08@'; const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let raf = 0, cols = 0, rows = 0, vis = true;
    const size = () => { const r = c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); c.width = Math.round(r.width * d); c.height = Math.round(r.height * d); a.setTransform(d, 0, 0, d, 0, 0); cols = Math.ceil(r.width / 9); rows = Math.ceil(r.height / 14); };
    const ground = (x: number) => .62 + .07 * Math.sin(5.1 * x + 1.2) + .04 * Math.sin(11.3 * x);
    const T = [.14, .33, .7, .88].map((x, i) => ({ x, h: .3 + (i % 2) * .06, ph: 1.7 * i }));
    const draw = (time: number) => {
      const W = 9 * cols, k = W / (14 * rows);
      a.clearRect(0, 0, W, 14 * rows); a.font = '12px "Anek Latin","Courier New",monospace'; a.textBaseline = 'top';
      for (let l = 0; l < rows; l++) for (let d = 0; d < cols; d++) {
        const nx = d / cols, ny = l / rows, g = ground(nx); let u = 0;
        if (ny > g) { const e = ny - g, L = Math.floor(e * rows * .7); u = Math.max(0, .62 - 2.6 * e) * ((d + 3 * L) % 3 === 0 ? 1 : .35); }
        else { const ex = (nx - .5) * 2.2, ey = (ny - .5) * 1.6; u = .9 * Math.max(0, .7 - Math.sqrt(ex * ex + ey * ey)); }
        for (const tb of T) {
          const sx = tb.x, gy = ground(sx), top = gy - tb.h;
          if (.0035 > Math.abs(9 * d / W - sx) && ny > top && ny < gy) u = .95;
          const bl = .55 * tb.h;
          for (let b = 0; b < 3; b++) {
            const ang = (still ? .6 : time / 1800) + tb.ph + b * Math.PI * 2 / 3, cx = Math.cos(ang) * bl * rows * 14 / W, my = Math.sin(ang) * bl, x2 = cx * cx * k * k + my * my, px = k * cx;
            const f = Math.max(0, Math.min(1, (k * (nx - sx) * px + (ny - top) * my) / (x2 || 1))), kx = k * sx + px * f;
            if (.012 > Math.hypot(k * nx - kx, ny - (top + my * f))) u = Math.max(u, .9);
          }
        }
        if (u < .08) continue;
        const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(u * RAMP.length))];
        if (ch !== ' ') { a.fillStyle = `rgba(255,106,61,${Math.min(.95, .25 + .7 * u)})`; a.fillText(ch, 9 * d, 14 * l); }
      }
    };
    const loop = (t: number) => { if (vis) draw(t); raf = requestAnimationFrame(loop); };
    size(); draw(0);
    const ro = new ResizeObserver(() => { size(); draw(0); }); ro.observe(c);
    const io = new IntersectionObserver((es) => { vis = es[0].isIntersecting; }); io.observe(c);
    if (!still) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  return (
    <footer className="fx" aria-label="Footer" style={{ position: 'relative', zIndex: 1 }}>
      <div className="fx-in">
        <div className="fx-top">
          <div className="fx-brand"><div className="logo-f"><img src="/images/sunsure-logo.svg" alt="Sunsure Energy" width={150} height={45} /></div><address>{company.headOffice}</address></div>
          <nav className="fx-nav" aria-label="Footer"><ul>{footNav.map(([l, h]) => <li key={l}><Link href={h}>{l}</Link></li>)}</ul></nav>
          <div className="fx-contact"><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></div>
        </div>
        <div className="fx-mid"><canvas id="fxAscii" ref={cv} aria-hidden="true" /><p className="fx-legal">&copy; Sunsure Energy.<br />All rights Reserved.</p></div>
        <p className="fx-word" aria-hidden="true">Sunsure</p>
      </div>
    </footer>
  );
}
