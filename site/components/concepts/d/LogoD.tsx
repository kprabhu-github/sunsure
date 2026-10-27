'use client';
import { useEffect, useRef } from 'react';
import data from './logo-lottie.json';

/** Sunsure header logo: the same looping Lottie animation the live site plays (white, 180x40, 90 frames at 30 fps). */
export function LogoD({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let anim: { destroy: () => void; goToAndStop: (f: number, isFrame: boolean) => void } | undefined;
    let dead = false;
    import('lottie-web/build/player/lottie_light').then((m) => {
      if (dead || !ref.current) return;
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
      anim = m.default.loadAnimation({ container: ref.current, renderer: 'svg', loop: !still, autoplay: !still, animationData: JSON.parse(JSON.stringify(data)), rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
      if (still) anim.goToAndStop(89, true);
    });
    return () => { dead = true; anim?.destroy(); };
  }, []);
  return <span ref={ref} className={`cd-lottie ${className}`} role="img" aria-label="Sunsure Energy" />;
}
