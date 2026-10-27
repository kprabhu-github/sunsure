'use client';
import { useEffect, useRef, useState } from 'react';
import { advantage } from '../shared/data';

/** Brand statement: the three lines of the Sunsure promise resolve one after another the first time the section is read, then stay. Not tied to scroll position, so nothing is hijacked. */
export function Assured({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el.querySelector('.cd-assured__h') ?? el); return () => io.disconnect();
  }, []);
  const [a, b, c] = advantage.heading;
  return (
    <section ref={ref} id="advantage" className="cd-assured" data-seen={seen} aria-label={advantage.heading.join(' ')}>
      <p className="cd-tag">{advantage.eyebrow}</p>
      <p className="cd-assured__h" aria-hidden="true">
        <span style={{ ['--d' as string]: '0s' }}>{a}</span>
        <span style={{ ['--d' as string]: '.55s' }}>{b}</span>
        <span className="cd-assured__w" style={{ ['--d' as string]: '1.1s' }}>{c}<i /></span>
      </p>
      {children}
    </section>
  );
}
