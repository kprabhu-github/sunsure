'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { heroSlides, heroCta } from '@/content/hero';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { registerGsap } from '@/lib/motion/gsap';
import { buildCable } from '@/lib/motion/catenary';
import { hero as cfg } from '@/lib/motion/config';
import { initHero } from './hero-controller';
import './hero.css';

const staticCable = buildCable({ sag: 0.3, centre: 0.5, pluck: 0, reveal: 1, tension: 0 }, cfg.tensionRelief);
const pad = (n: number) => String(n).padStart(2, '0');

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    return initHero(el, { reduced, onSlide: setIndex, count: heroSlides.length });
  }, [reduced]);

  return (
    <section ref={root} className="hero" data-state="pending" aria-roledescription="carousel" aria-label="Sunsure Energy">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="hero-clip" clipPathUnits="objectBoundingBox"><path d={staticCable.fill} /></clipPath>
        </defs>
      </svg>

      <div className="hero__copy">
        <div className="hero__stage">
          {heroSlides.map((s, i) => (
            <div key={s.id} data-slide className={`hero__slide ${i === 0 ? 'is-active' : ''}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${heroSlides.length}`}>
              {i === 0 ? (
                <h1 className="hero__title">{s.title.map((l) => <span key={l} className="mask-line"><span className="mask-line__in">{l}</span></span>)}</h1>
              ) : (
                <p className="hero__title" role="heading" aria-level={2}>{s.title.map((l) => <span key={l} className="mask-line"><span className="mask-line__in">{l}</span></span>)}</p>
              )}
              <p className="hero__sub" data-sub>{s.sub.map((l) => <span key={l}>{l}</span>)}</p>
            </div>
          ))}
        </div>
        <div className="hero__cta" data-cta><Button href={heroCta.href}>{heroCta.label}</Button></div>
      </div>

      <div className="hero__plate" data-plate>
        {heroSlides.map((s, i) => (
          <div key={s.id} data-img className={`hero__img ${i === 0 ? 'is-active' : ''}`} aria-hidden="true">
            <div className="hero__par" data-par>
              <Image src={s.image.src} alt="" fill priority={i === 0} sizes="100vw" style={{ objectPosition: s.image.position }} />
            </div>
          </div>
        ))}
        <div className="hero__shade" />
      </div>

      <svg className="hero__cable" data-cable viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="hero__cable-line" data-cable-line d={staticCable.line} />
        <path className="hero__cable-pulse" data-cable-pulse d="" />
      </svg>

      <div className="hero__ctrl" data-ctrl>
        <span className="hero__count" aria-hidden="true">{pad(index + 1)} / {pad(heroSlides.length)}</span>
        <div className="hero__bars" data-bar-wrap aria-hidden="true">
          {heroSlides.map((s) => <span key={s.id} className="hero__bar" data-bar><i /></span>)}
        </div>
        <div className="hero__btns">
          <button type="button" className="hero__btn" data-prev aria-label="Previous slide"><svg viewBox="0 0 18 18" fill="none"><path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.8" /></svg></button>
          <button type="button" className="hero__btn" data-pause aria-label="Pause slideshow" aria-pressed="false">
            <svg viewBox="0 0 18 18" fill="currentColor" data-icon="pause"><rect x="4" y="3" width="3.2" height="12" /><rect x="10.8" y="3" width="3.2" height="12" /></svg>
          </button>
          <button type="button" className="hero__btn" data-next aria-label="Next slide"><svg viewBox="0 0 18 18" fill="none"><path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.8" /></svg></button>
        </div>
        <span className="sr-only" aria-live="polite">Slide {index + 1} of {heroSlides.length}</span>
      </div>
    </section>
  );
}
