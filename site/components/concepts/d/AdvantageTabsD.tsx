'use client';
import { useEffect, useRef, useState } from 'react';
import { advantage } from '../shared/data';

const fig = ['01', 'up to 40%', '03', '04', '< 3%', '70%'];
const keyFig = [1, 4, 5];
const MS = 6000;

/** Six advantages as tabs. The open one advances on its own every few seconds (a progress line shows the time left), pauses on hover or focus, and stops once the reader picks one. */
export function AdvantageTabsD() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [on, setOn] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setAuto(false); return; }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto || hold || !on) return;
    const t = setTimeout(() => setI((v) => (v + 1) % advantage.items.length), MS);
    return () => clearTimeout(t);
  }, [i, auto, hold, on]);
  const it = advantage.items[i];
  const running = auto && !hold && on;
  return (
    <div ref={root} className="cd-at" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <div role="tablist" aria-label="The Sunsure Advantage" className="cd-at__tabs">
        {advantage.items.map((x, k) => (
          <button key={x.title} role="tab" id={`cd-at-t${k}`} aria-selected={i === k} aria-controls="cd-at-p" tabIndex={i === k ? 0 : -1} type="button"
            onClick={() => { setI(k); setAuto(false); }}
            onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setI((i + 1) % 6); setAuto(false); } if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setI((i + 5) % 6); setAuto(false); } }}>
            <span className="cd-at__n">{String(k + 1).padStart(2, '0')}</span>
            <span className="cd-at__t">{x.title}</span>
            <i className="cd-at__bar" aria-hidden="true">{i === k && <b key={`${i}-${auto}`} style={{ animationDuration: `${MS}ms`, animationPlayState: running ? 'running' : 'paused' }} className={auto ? 'is-run' : 'is-done'} />}</i>
          </button>
        ))}
      </div>
      <div role="tabpanel" id="cd-at-p" aria-labelledby={`cd-at-t${i}`} className="cd-at__panel" key={i}>
        <p className="cd-at__fig" aria-hidden={!keyFig.includes(i)}>{keyFig.includes(i) ? fig[i] : String(i + 1).padStart(2, '0')}</p>
        <h3>{it.title}</h3>
        <p>{it.body}</p>
      </div>
    </div>
  );
}
