'use client';
import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { homeStats } from '@/content/stats';
import './stats.css';

export function Stats() {
  const ref = useGsapScope<HTMLElement>(({ root, reduced }) => {
    if (reduced) return;
    const rules = root.querySelectorAll('[data-rule]');
    gsap.set(rules, { scaleX: 0 });
    ScrollTrigger.create({ trigger: root, start: 'top 75%', once: true, onEnter: () => gsap.to(rules, { scaleX: 1, duration: 1.4, ease: 'expo.inOut', stagger: 0.15 }) });
  });
  return (
    <section ref={ref} className="stats" aria-label="Sunsure in numbers">
      <Container>
        <ul className="stats__list">
          {homeStats.map((s) => (
            <li key={s.label} className="stats__item">
              <span className="stats__rule" data-rule aria-hidden="true" />
              <p className="stats__num"><CountUp value={s.value} suffix={s.suffix} className="stats__n" /></p>
              <p className="label stats__label">{s.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
