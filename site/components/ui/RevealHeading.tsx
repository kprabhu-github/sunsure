'use client';
import type { ElementType } from 'react';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { ease } from '@/lib/motion/config';

/** Headline whose lines rise out of a mask when scrolled into view (explicit lines: deterministic, no re-split). */
export function RevealHeading({ lines, as: Tag = 'h2', className = '', start = 'top 85%', id }: { lines: readonly string[]; as?: ElementType; className?: string; start?: string; id?: string }) {
  const ref = useGsapScope<HTMLElement>(({ root, reduced }) => {
    if (reduced) return;
    const inner = root.querySelectorAll('.mask-line__in');
    gsap.set(inner, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: root, start, once: true,
      onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.1, ease: ease.out, stagger: 0.09 }),
    });
  });
  return (
    <Tag ref={ref as never} id={id} className={className}>
      {lines.map((l) => <span key={l} className="mask-line"><span className="mask-line__in">{l}</span></span>)}
    </Tag>
  );
}
