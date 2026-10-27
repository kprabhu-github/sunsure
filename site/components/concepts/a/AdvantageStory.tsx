'use client';
import { useEffect, useRef, useState } from 'react';
import { Photo } from '../shared/Photo';
import { advantage } from '../shared/data';

const figs = ['', 'up to 40%', '', '', '< 3%', '70%'];
/** Scroll storytelling: the photograph zooms from the whole plant to a single row of panels as the six advantages pass. CSS sticky, no scroll-jacking. */
export function AdvantageStory() {
  const [on, setOn] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: '-45% 0px -45% 0px' });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const zoom = [1, 1.2, 1.45, 1.7, 1.95, 2.25][on];
  return (
    <div className="ca-adv__wrap">
      <div className="ca-adv__stick" aria-hidden="true">
        <div className="ca-adv__frame">
          <div className="ca-adv__zoom" style={{ transform: `scale(${zoom})` }}><Photo k="solar" pos="50% 78%" sizes="(min-width: 900px) 40vw, 100vw" /></div>
          <div className="ca-adv__fig"><span className="ca-label">{String(on + 1).padStart(2, '0')} / 06</span><strong>{figs[on] || advantage.items[on].title}</strong></div>
        </div>
      </div>
      <ol className="ca-adv__list">
        {advantage.items.map((it, i) => (
          <li key={it.title} data-i={i} data-on={i === on} ref={(el) => { refs.current[i] = el; }}>
            <span className="ca-label">{String(i + 1).padStart(2, '0')}</span>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
