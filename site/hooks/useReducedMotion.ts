'use client';
import { useSyncExternalStore } from 'react';

const Q = '(prefers-reduced-motion: reduce)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(Q);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(Q).matches, () => false);
}
