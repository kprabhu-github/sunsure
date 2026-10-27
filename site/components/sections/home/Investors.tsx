'use client';
import { AppLink } from '@/components/ui/AppLink';
import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { investorStats } from '@/content/stats';
import { investors } from '@/content/investors';
import './investors.css';

/** The site's one deep-ink band besides the footer. Ledger layout: figures read as rows of a statement. */
export function Investors() {
  const ref = useGsapScope<HTMLElement>(({ root, reduced }) => {
    if (reduced) return;
    root.querySelectorAll('[data-row]').forEach((row) => {
      const line = row.querySelector('[data-line]');
      gsap.set(line, { scaleX: 0 });
      ScrollTrigger.create({ trigger: row, start: 'top 88%', once: true, onEnter: () => gsap.to(line, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }) });
    });
  });
  return (
    <section ref={ref} className="inv" aria-labelledby="inv-h">
      <Container>
        <div className="inv__grid">
          <div className="inv__lead">
            <p className="label eyebrow inv__eyebrow">{investors.eyebrow}</p>
            <h2 id="inv-h" className="inv__name">{investors.name}</h2>
            <AppLink href="/csr-sustainability-investor-relations/" className="tlink inv__link">Know More</AppLink>
          </div>
          <ul className="inv__ledger">
            {investorStats.map((s) => (
              <li key={s.label} className="inv__row" data-row>
                <span className="inv__line" data-line aria-hidden="true" />
                <p className="inv__fig"><CountUp value={s.value} suffix={s.suffix} /></p>
                <p className="inv__lab">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
