'use client';
import { useEffect, useRef, useState } from 'react';

/** About motion: when the section scrolls into view the two photo parallelograms swing in and lock together (like the logo mark), the centre dot pops, copy rises and the figures count up. */
export function AboutFx({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setSeen(true);
      if (still) return;
      el.querySelectorAll<HTMLElement>('.cd-about__stats dd').forEach((dd) => {
        const m = (dd.textContent ?? '').match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (!m) return;
        const to = parseFloat(m[1]), dec = (m[1].split('.')[1] ?? '').length, suf = m[2];
        const t0 = performance.now(), dur = 1500;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - k, 3));
          dd.textContent = v.toFixed(dec) + suf;
          if (k < 1) requestAnimationFrame(tick);
        };
        dd.textContent = (0).toFixed(dec) + suf;
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="cd-fx" data-seen={seen}>{children}</div>;
}
