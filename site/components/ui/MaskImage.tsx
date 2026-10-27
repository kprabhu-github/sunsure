'use client';
import Image from 'next/image';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';

type Props = { src: string; alt: string; ratio: string; sizes?: string; position?: string; className?: string; from?: 'bottom' | 'left' | 'right' | 'top'; priority?: boolean };
const inset = { bottom: 'inset(100% 0% 0% 0%)', top: 'inset(0% 0% 100% 0%)', left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)' } as const;

/** Image revealed through a moving mask, with a counter-scale on the photo. Fixed aspect ratio: no layout shift. */
export function MaskImage({ src, alt, ratio, sizes = '(min-width: 900px) 50vw, 100vw', position = '50% 50%', className = '', from = 'bottom', priority }: Props) {
  const ref = useGsapScope<HTMLDivElement>(({ root, reduced }) => {
    if (reduced) return;
    const img = root.querySelector('.mask-img__photo');
    gsap.set(root, { clipPath: inset[from] });
    gsap.set(img, { scale: 1.25 });
    ScrollTrigger.create({
      trigger: root, start: 'top 88%', once: true,
      onEnter: () => {
        gsap.to(root, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
        gsap.to(img, { scale: 1, duration: 2, ease: 'expo.out' });
      },
    });
  });
  return (
    <div ref={ref} className={`mask-img ${className}`} style={{ aspectRatio: ratio }}>
      <Image className="mask-img__photo" src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover', objectPosition: position }} />
    </div>
  );
}
