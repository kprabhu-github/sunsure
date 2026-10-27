'use client';
import { useState } from 'react';
import Link from 'next/link';
import { solutions } from '../shared/data';

/** Content exploration: switch solution, then offering; the panel wipes in with the matching facts. */
export function SolutionsB() {
  const [si, setSi] = useState(0);
  const [ii, setIi] = useState(0);
  const s = solutions[si]; const it = s.items[Math.min(ii, s.items.length - 1)];
  return (
    <div className="cb-sx">
      <div className="cb-sx__seg" role="group" aria-label="Solution">
        {solutions.map((x, i) => <button key={x.id} type="button" aria-pressed={i === si} onClick={() => { setSi(i); setIi(0); }}><span>0{i + 1}</span>{x.name}</button>)}
      </div>
      <div className="cb-sx__body">
        <div className="cb-sx__list" role="group" aria-label="Offerings">
          <p className="cb-tag">{s.tagline}</p>
          {s.items.map((x, i) => <button key={x.id} type="button" aria-pressed={i === ii} onClick={() => setIi(i)}><span>0{i + 1}</span>{x.label}<b aria-hidden="true">→</b></button>)}
        </div>
        <article key={`${s.id}-${it.id}`} className="cb-sx__panel" aria-live="polite">
          <p className="cb-tag">{s.headline}</p>
          <h3>{it.label}</h3>
          <p>{it.body}</p>
          {it.facts && <dl>{it.facts.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}</dl>}
          <Link href={it.href} className="cb-btn cb-btn--line">Open {it.label}<span aria-hidden="true">→</span></Link>
        </article>
        {s.benefits && <ul className="cb-sx__ben" aria-label="Benefits">{s.benefits.map((b) => <li key={b.title}><b>{b.title}</b><span>{b.body}</span></li>)}</ul>}
      </div>
    </div>
  );
}
