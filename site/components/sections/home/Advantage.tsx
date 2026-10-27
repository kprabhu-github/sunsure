'use client';
import { Container } from '@/components/ui/Container';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { advantage } from '@/content/solutions';
import './advantage.css';

/** Figures are pulled verbatim from each item's own copy. */
const figures: Record<string, { pre?: string; big: string }> = {
  'Save Costs, Power Profits': { pre: 'up to', big: '40%' },
  'Expert Guidance': { pre: 'less than', big: '3%' },
  'Long Term Partnerships': { big: '70%' },
};

export function Advantage() {
  const ref = useGsapScope<HTMLElement>(({ root, reduced }) => {
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-item]'));
    if (reduced) { items.forEach((i) => i.classList.add('is-on')); return; }
    gsap.fromTo(root.querySelector('[data-rail]'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.querySelector('.adv__list'), start: 'top 60%', end: 'bottom 60%', scrub: 0.5 } });
    items.forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%', toggleClass: { targets: el, className: 'is-on' } }));
  });
  return (
    <section ref={ref} className="adv" aria-labelledby="adv-h">
      <Container>
        <div className="adv__grid">
          <header className="adv__head">
            <p className="label eyebrow">{advantage.eyebrow}</p>
            <RevealHeading id="adv-h" className="adv__h" lines={advantage.heading} />
          </header>
          <ol className="adv__list">
            <span className="adv__rail" data-rail aria-hidden="true" />
            {advantage.items.map((it, i) => {
              const f = figures[it.title];
              return (
                <li key={it.title} className="adv__item" data-item>
                  <span className="adv__node" aria-hidden="true" />
                  <p className="label adv__n">0{i + 1}</p>
                  <h3 className="adv__t">{it.title}</h3>
                  <p className="adv__b">{it.body}</p>
                  {f && <p className="adv__fig" aria-hidden="true">{f.pre && <small>{f.pre}</small>}{f.big}</p>}
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
