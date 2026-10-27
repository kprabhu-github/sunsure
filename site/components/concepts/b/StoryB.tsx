'use client';
import { useEffect, useRef, useState } from 'react';
import { networkSteps, networkIndustries } from '../shared/data';

/** Scroll storytelling: the schematic stays in view while the four stages pass; the active stage lights its part of the system. CSS sticky, no scroll-jacking. */
export function StoryB() {
  const [on, setOn] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: '-40% 0px -50% 0px' });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className="cb-story">
      <div className="cb-story__stick" data-step={on}>
        <svg viewBox="0 0 560 400" role="img" aria-label={`Power system schematic. Current stage: ${networkSteps[on].label}`}>
          <g className="g-gen">
            <rect x="24" y="52" width="92" height="56" /><path d="M24 80h92M54 52v56M85 52v56" />
            <path d="M70 262V318M70 262l-22 24M70 262l26-10M70 262l-2-34" />
            <text x="24" y="136">SOLAR</text><text x="24" y="346">WIND</text>
          </g>
          <path className="l l-gen" d="M116 80H190V196H214M70 318v14H190V204H214" />
          <g className="g-store"><rect x="214" y="158" width="116" height="84" /><path d="M232 176v48M254 176v48M276 176v48M298 176v48M312 176v48" /><text x="214" y="262">BATTERY STORAGE</text></g>
          <path className="l l-tr" d="M330 200H470" />
          {[360, 400, 440].map((px) => <path key={px} className="g-tr" d={`M${px} 200l-9 -34h18z`} />)}
          <text className="g-tr-t" x="340" y="128">INTER / INTRA STATE GRID</text>
          <g className="g-del"><path d="M470 240V170l30 18V170l30 18V140h8v100z" /><text x="470" y="262">INDUSTRY</text></g>
        </svg>
        <ul className="cb-story__chips" aria-label="Industries named in the copy" data-on={on === 3}>{networkIndustries.map((i) => <li key={i}>{i}</li>)}</ul>
      </div>
      <ol className="cb-story__list">
        {networkSteps.map((s, i) => (
          <li key={s.id} data-i={i} data-on={i === on} ref={(el) => { refs.current[i] = el; }}>
            <p className="cb-tag">Stage 0{i + 1}</p>
            <h3>{s.label}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
