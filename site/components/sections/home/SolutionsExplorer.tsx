'use client';
import { useEffect, useRef, useState } from 'react';
import { AppLink } from '@/components/ui/AppLink';
import { Container } from '@/components/ui/Container';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { TabList } from '@/components/ui/TabList';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, registerGsap } from '@/lib/motion/gsap';
import { solutions, solutionsIntro } from '@/content/solutions';
import './solutions.css';

/** Two-level explorer. Switching runs a mask wipe + text stagger on the panel. */
export function SolutionsExplorer() {
  const reduced = useReducedMotion();
  const [sid, setSid] = useState(solutions[0].id);
  const sol = solutions.find((s) => s.id === sid)!;
  const [iid, setIid] = useState(sol.items[0].id);
  const item = sol.items.find((i) => i.id === iid) ?? sol.items[0];
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const pickSolution = (id: string) => { setSid(id); setIid(solutions.find((s) => s.id === id)!.items[0].id); };

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = panel.current;
    if (!el || reduced) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'expo.out' });
      gsap.fromTo(el.querySelectorAll('[data-sw]'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.07, delay: 0.12 });
    }, el);
    return () => ctx.revert();
  }, [sid, iid, reduced]);

  return (
    <section className="sx" aria-labelledby="sx-h">
      <Container>
        <div className="sx__head">
          <p className="label eyebrow">{solutionsIntro.eyebrow}</p>
          <RevealHeading id="sx-h" className="sx__h" lines={solutionsIntro.heading} />
          <p className="sx__lead">{solutionsIntro.body}</p>
        </div>

        <div className="sx__grid">
          <TabList
            className="sx__primary" tabClassName="sx__ptab" prefix="sol" label="Solution" orientation="vertical" value={sid} onChange={pickSolution}
            items={solutions.map((s, i) => ({ id: s.id, label: <><span className="sx__idx">0{i + 1}</span><span>{s.name}</span></> }))}
          />

          <div className="sx__body">
            <div className="sx__meta">
              <p className="sx__tag">{sol.tagline}</p>
              <AppLink href={`/solutions/${sol.slug}/`} className="tlink">Explore {sol.name}</AppLink>
            </div>
            <TabList
              className="sx__secondary" tabClassName="sx__stab" prefix="sub" label={`${sol.name} sub-services`} value={item.id} onChange={setIid}
              items={sol.items.map((i) => ({ id: i.id, label: i.label }))}
            />
            <div ref={panel} id="sub-panel" role="tabpanel" aria-labelledby={`sub-tab-${item.id}`} tabIndex={0} className="sx__panel">
              <h3 className="sx__ph" data-sw>{item.label}</h3>
              <p className="sx__pb" data-sw>{item.body}</p>
              {item.facts && (
                <dl className="sx__facts" data-sw>
                  {item.facts.map((f) => <div key={f.k}><dt className="label">{f.k}</dt><dd>{f.v}</dd></div>)}
                </dl>
              )}
              <AppLink href={item.href} className="tlink" data-sw>Learn more</AppLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
