'use client';
import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/content/projects';
import type { Entry } from '@/content/knowledge';

export function ProjectList() {
  const techs = ['All', ...Array.from(new Set(projects.map((p) => p.technology)))];
  const [t, setT] = useState('All');
  const list = projects.filter((p) => t === 'All' || p.technology === t);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter by technology">
        {techs.map((x) => <button key={x} aria-pressed={t === x} onClick={() => setT(x)}>{x}</button>)}
      </div>
      <ul className="rows">
        {list.map((p) => (
          <li key={p.slug}><Link className="row" href={`/concept-e/projects/${p.slug}/`}>
            <h3>{p.name}</h3>
            <p>{[p.state, p.technology, p.transmission].filter(Boolean).join(' · ')}</p>
            <span className="meta">{p.capacityLabel}</span>
          </Link></li>
        ))}
      </ul>
    </>
  );
}

export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="rows">
      {entries.map((e) => (
        <li key={e.href}><a className="row" href={e.href} target="_blank" rel="noopener noreferrer">
          <h3>{e.title}</h3>
          <p>{e.excerpt ?? (e.readTime ? `${e.readTime} read` : e.kind)}</p>
          <span className="meta">{e.date}</span>
        </a></li>
      ))}
    </ul>
  );
}
