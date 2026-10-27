'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { projects } from '../shared/data';

const filters = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'mh', label: 'Maharashtra', test: (p: (typeof projects)[number]) => p.state === 'Maharashtra' },
  { id: 'up', label: 'Uttar Pradesh', test: (p: (typeof projects)[number]) => p.state === 'Uttar Pradesh' },
  { id: 'gm', label: 'Ground Mounted', test: (p: (typeof projects)[number]) => p.technology === 'Ground Mounted' },
] as const;
const MAX = Math.max(...projects.map((p) => p.mwp));

/** Content exploration: capacity-proportional index of the published plants, with a plate that follows selection. */
export function PlantIndex() {
  const [f, setF] = useState<(typeof filters)[number]['id']>('all');
  const list = useMemo(() => projects.filter(filters.find((x) => x.id === f)!.test).sort((a, b) => b.mwp - a.mwp), [f]);
  const [sel, setSel] = useState(projects.find((p) => p.slug === 'solapur-1')!.slug);
  const cur = list.find((p) => p.slug === sel) ?? list[0];
  return (
    <div className="ca-pi">
      <div className="ca-pi__bar" role="group" aria-label="Filter plants">
        {filters.map((x) => <button key={x.id} type="button" aria-pressed={f === x.id} onClick={() => setF(x.id)}>{x.label}</button>)}
        <span className="ca-label ca-pi__count" aria-live="polite">{list.length} of {projects.length} plants</span>
      </div>
      <div className="ca-pi__body">
        <ol className="ca-pi__list">
          {list.map((p, n) => {
            const on = p.slug === cur.slug;
            return (
              <li key={p.slug} data-on={on}>
                <button type="button" aria-expanded={on} onClick={() => setSel(p.slug)} onMouseEnter={() => setSel(p.slug)} onFocus={() => setSel(p.slug)}>
                  <span className="ca-pi__n">{String(n + 1).padStart(2, '0')}</span>
                  <span className="ca-pi__name">{p.name.split(' – ')[0]}</span>
                  <span className="ca-pi__meta">{p.state ?? p.transmission}</span>
                  <span className="ca-pi__track" aria-hidden="true"><i style={{ width: `${(p.mwp / MAX) * 100}%` }} /></span>
                  <span className="ca-pi__cap">{p.capacityLabel}</span>
                </button>
                <div className="ca-pi__inline"><p>{p.body}</p><Link href={`/projects/${p.slug}/`}>Project page →</Link></div>
              </li>
            );
          })}
        </ol>
        <aside className="ca-pi__plate" aria-label="Selected plant">
          <div className="ca-pi__img"><Photo k={cur.image === 'sunrise' ? 'solar' : 'crew'} pos={cur.image === 'sunrise' ? '50% 70%' : '50% 60%'} sizes="(min-width: 1000px) 34vw, 100vw" /></div>
          <p className="ca-label">{cur.technology} · {cur.status}{cur.commissioned ? ` · ${cur.commissioned}` : ''}</p>
          <h3>{cur.name.split(' – ')[0]} <span>{cur.capacityLabel}</span></h3>
          <p>{cur.body}</p>
          <Link href={`/projects/${cur.slug}/`} className="ca-link">Project page →</Link>
          <p className="ca-label ca-pi__note">Representative plant photograph; project-specific images pending.</p>
        </aside>
      </div>
    </div>
  );
}
