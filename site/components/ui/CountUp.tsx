'use client';
import { useEffect, useRef } from 'react';
import { gsap, registerGsap, ScrollTrigger } from '@/lib/motion/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Counts from 0 to the published value once, when scrolled into view. The final value is server-rendered. */
export function CountUp({ value, decimals = 0, suffix = '', className = '' }: { value: number; decimals?: number; suffix?: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const fmt = (n: number) => n.toFixed(decimals);
  useEffect(() => {
    const node = el.current;
    if (!node || reduced) return;
    registerGsap();
    const obj = { v: 0 };
    node.textContent = fmt(0);
    let tween: gsap.core.Tween | null = null;
    const st = ScrollTrigger.create({
      trigger: node, start: 'top 88%', once: true,
      onEnter: () => { tween = gsap.to(obj, { v: value, duration: 2.2, ease: 'power3.out', onUpdate: () => { node.textContent = fmt(obj.v); } }); },
    });
    return () => { st.kill(); tween?.kill(); node.textContent = fmt(value); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, value, decimals]);
  return <span className={className}><span ref={el}>{fmt(value)}</span>{suffix && <span className="suffix">{suffix}</span>}</span>;
}
