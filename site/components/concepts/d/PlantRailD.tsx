'use client';
import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { projects } from '../shared/data';

type P = (typeof projects)[number];
const filters = [
  { id: 'all', label: 'All plants', test: () => true },
  { id: 'mh', label: 'Maharashtra', test: (p: P) => p.state === 'Maharashtra' },
  { id: 'up', label: 'Uttar Pradesh', test: (p: P) => p.state === 'Uttar Pradesh' },
  { id: 'gm', label: 'Ground Mounted', test: (p: P) => p.technology === 'Ground Mounted' },
] as const;
const tones = ['sun', 'red', 'green', 'sky'] as const;

/** Content exploration: a swipeable rail of plant tickets with filters. Drag, swipe, scroll, arrows or keys. */
export function PlantRailD() {
  const [f, setF] = useState<(typeof filters)[number]['id']>('all');
  const list = useMemo(() => projects.filter(filters.find((x) => x.id === f)!.test).sort((a, b) => b.mwp - a.mwp), [f]);
  const track = useRef<HTMLUListElement>(null);
  const [pr, setPr] = useState(0);
  const drag = useRef({ on: false, x: 0, s: 0, moved: false });
  const upd = () => { const el = track.current; if (el) setPr(el.scrollWidth > el.clientWidth ? el.scrollLeft / (el.scrollWidth - el.clientWidth) : 0); };
  const by = (d: number) => track.current?.scrollBy({ left: d * 340, behavior: 'smooth' });
  return (
    <div className="cd-pc">
      <div className="cd-pc__bar">
        <div role="group" aria-label="Filter plants" className="cd-pc__f">
          {filters.map((x) => <button key={x.id} type="button" aria-pressed={f === x.id} onClick={() => { setF(x.id); track.current?.scrollTo({ left: 0 }); }}>{x.label}</button>)}
        </div>
        <div className="cd-pc__arrows"><button type="button" onClick={() => by(-1)} aria-label="Previous plants">←</button><button type="button" onClick={() => by(1)} aria-label="Next plants">→</button></div>
      </div>
      <ul ref={track} className="cd-pc__track" tabIndex={0} aria-label={`${list.length} plants, scroll sideways`} onScroll={upd}
        onPointerDown={(e) => { if (e.pointerType !== 'mouse') return; drag.current = { on: true, x: e.clientX, s: track.current!.scrollLeft, moved: false }; }}
        onPointerMove={(e) => { const d = drag.current; if (!d.on) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; track.current!.scrollLeft = d.s - dx; }}
        onPointerUp={() => { drag.current.on = false; }} onPointerLeave={() => { drag.current.on = false; }}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}>
        {list.map((p, i) => (
          <li key={p.slug} data-tone={tones[i % 4]}>
            <article>
              <div className="cd-pc__img"><Photo k={p.image === 'sunrise' ? 'solar' : 'crew'} pos={i % 2 ? '30% 62%' : '70% 70%'} sizes="320px" /><i aria-hidden="true" /></div>
              <p className="cd-pc__cap"><b>{p.mwp}</b><span>MWp</span></p>
              <h3>{p.name.split(' – ')[0]}</h3>
              <p className="cd-pc__meta">{p.state ?? p.transmission} · {p.technology}{p.commissioned ? ` · ${p.commissioned}` : ''}</p>
              <Link href={`/projects/${p.slug}/`} className="cd-pc__go" aria-label={`${p.name}, project page`}>→</Link>
            </article>
          </li>
        ))}
      </ul>
      <div className="cd-pc__prog" aria-hidden="true"><i style={{ width: `${20 + 80 * pr}%` }} /></div>
    </div>
  );
}
