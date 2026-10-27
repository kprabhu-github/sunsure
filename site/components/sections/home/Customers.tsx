'use client';
import { Container } from '@/components/ui/Container';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap } from '@/lib/motion/gsap';
import { customers } from '@/content/about';
import { showPlaceholders } from '@/content/flags';
import './customers.css';

const rowA = customers.slice(0, 7);
const rowB = customers.slice(7);

/** Customer names as typography; two rows travel in opposite directions, driven by scroll (no autoplay marquee). */
export function Customers() {
  const ref = useGsapScope<HTMLElement>(({ root, reduced }) => {
    if (reduced) return;
    const t = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 };
    gsap.fromTo(root.querySelector('[data-row="a"]'), { xPercent: 4 }, { xPercent: -14, ease: 'none', scrollTrigger: t });
    gsap.fromTo(root.querySelector('[data-row="b"]'), { xPercent: -16 }, { xPercent: 2, ease: 'none', scrollTrigger: t });
  });
  return (
    <section ref={ref} className="cu" aria-labelledby="cu-h">
      <Container>
        <p className="label eyebrow">Customers</p>
        <RevealHeading id="cu-h" className="cu__h" lines={['The preferred partner for', 'India’s leading industrials']} />
      </Container>
      <div className="cu__rows">
        <ul className="cu__row" data-row="a">{rowA.map((c) => <li key={c}>{c}</li>)}</ul>
        <ul className="cu__row" data-row="b">{rowB.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>
      <Container>
        <p className="cu__note">…and 100+ other industrial customers across over 16 Indian States.</p>
        {showPlaceholders && (
          <aside className="cu__ph" aria-label="Placeholder">
            <p className="label">Placeholder — testimonials</p>
            <p>No customer testimonials are published on the current Sunsure website. Approved client quotes will appear here once supplied.</p>
          </aside>
        )}
      </Container>
    </section>
  );
}
