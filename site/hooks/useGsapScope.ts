'use client';
import { useEffect, useRef, type RefObject } from 'react';
import { gsap, registerGsap } from '@/lib/motion/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Runs `setup` inside a gsap.context scoped to the returned ref. Everything created (tweens, ScrollTriggers)
 * is reverted on unmount or when the reduced-motion preference changes.
 */
export function useGsapScope<T extends HTMLElement>(
  setup: (a: { root: T; reduced: boolean }) => void | (() => void),
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    registerGsap();
    let extra: void | (() => void);
    const ctx = gsap.context(() => { extra = setup({ root, reduced }); }, root);
    return () => { if (typeof extra === 'function') extra(); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
  return ref;
}
