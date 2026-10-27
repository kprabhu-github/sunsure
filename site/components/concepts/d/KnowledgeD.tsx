'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { blogs, webinars, media } from '../shared/data';

const all = [...media, ...blogs, ...webinars].sort((a, b) => Date.parse(b.date + ' UTC') - Date.parse(a.date + ' UTC'));
const N = all.length;
const fmt = (s: string) => new Date(s + ' UTC').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const MS = 3000;

/** A 3D deck: the open story sits in front, the others fan away on either side. It turns by itself, pauses on hover or focus, and also answers to arrows, dots, a click on a side card, and the keyboard. */
export function KnowledgeD() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [on, setOn] = useState(false);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const go = (n: number) => setI(((n % N) + N) % N);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) setStill(true);
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (still || hold || !on) return;
    const t = setTimeout(() => go(i + 1), MS);
    return () => clearTimeout(t);
  }, [i, still, hold, on]);
  return (
    <section id="knowledge" className="cd-kh" aria-labelledby="cd-kh-h">
      <div className="cd-kh__in">
        <div className="cd-kh__head">
          <div><p className="cd-tag">Knowledge Hub</p><h2 id="cd-kh-h">News, insights and webinars</h2></div>
          <Link href="/knowledge-hub/" className="cd-kh__all">All entries →</Link>
        </div>
      </div>
      <div ref={root} className="cd-deck" role="region" aria-roledescription="carousel" aria-label="Knowledge Hub entries"
        onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); } }}>
        <div className="cd-deck__stage">
          {all.map((e, k) => {
            let o = k - i; if (o > N / 2) o -= N; if (o < -N / 2) o += N;
            const a = Math.abs(o), act = o === 0;
            return (
              <article key={e.href} className={act ? 'cd-deck__c is-on' : 'cd-deck__c'} data-k={e.kind} aria-hidden={a > 2 ? true : undefined}
                style={{ ['--o' as string]: o, ['--a' as string]: Math.min(a, 3), opacity: a > 2 ? 0 : 1, pointerEvents: a > 2 ? 'none' : 'auto', zIndex: 10 - a }}
                onClick={() => { if (!act) go(k); }}>
                <span className="cd-deck__n" aria-hidden="true">{String(k + 1).padStart(2, '0')}</span>
                <span className="cd-deck__band"><b>{e.kind}</b><time>{fmt(e.date)}</time></span>
                <h3>{e.title}</h3>
                {e.excerpt && <p>{e.excerpt}</p>}
                <a href={e.href} target="_blank" rel="noopener noreferrer" tabIndex={act ? 0 : -1}>Read on sunsure-energy.com <i aria-hidden="true">→</i></a>
              </article>
            );
          })}
        </div>
        <div className="cd-deck__bar">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous entry">←</button>
          <ol aria-label="Choose entry">{all.map((e, k) => <li key={e.href}><button type="button" aria-label={`Entry ${k + 1}`} aria-current={k === i} onClick={() => go(k)} /></li>)}</ol>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next entry">→</button>
        </div>
      </div>
    </section>
  );
}
