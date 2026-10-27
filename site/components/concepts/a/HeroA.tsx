'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { heroSlides, heroCta, photo } from '../shared/data';

const frames = [
  { k: 'solar', pos: '50% 58%', cap: 'Solar plant at sunrise' },
  { k: 'wind', pos: '40% 50%', cap: 'Wind turbines across farmland at sunrise' },
] as const;

/** Hero interaction: choose the asset context. A wipe swaps photograph and headline; no autoplay, nothing to chase. */
export function HeroA() {
  const [i, setI] = useState(0);
  const s = heroSlides[i];
  return (
    <section className="ca-hero" aria-labelledby="ca-h1">
      <div className="ca-hero__copy">
        <p className="ca-label">Independent Power Producer · Est. 2014</p>
        <h1 id="ca-h1" className="ca-hero__h" aria-live="polite">
          <span key={i} className="ca-hero__lines">
            <span>{s.title[0]}</span>
            <em>{s.title[1]}</em>
          </span>
        </h1>
        <p className="ca-hero__sub">{s.sub.join(' ')}</p>
        <div className="ca-hero__cta">
          <Link href={heroCta.href} className="ca-btn">{heroCta.label}<span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <figure className="ca-hero__fig">
        <div className="ca-hero__frame">
          {frames.map((f, n) => (
            <div key={f.k} className="ca-hero__layer" data-on={n === i} aria-hidden={n !== i}>
              <Photo k={f.k} pos={f.pos} sizes="(min-width: 900px) 45vw, 100vw" priority={n === 0} />
            </div>
          ))}
        </div>
        <figcaption className="ca-hero__cap">
          <span className="ca-label">Fig. 0{i + 1} — {frames[i].cap}</span>
          <div role="group" aria-label="Choose hero image" className="ca-hero__pick">
            {frames.map((f, n) => (
              <button key={f.k} type="button" aria-pressed={n === i} onClick={() => setI(n)}>
                <span>0{n + 1}</span>{f.k === 'solar' ? 'Solar' : 'Wind'}
              </button>
            ))}
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
