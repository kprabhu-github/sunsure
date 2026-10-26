'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHero } from './hero-motion';
import { heroCta, heroSlides } from './hero-data';
import './hero.css';

const Line = ({ children }: { children: React.ReactNode }) => (
  <span className="ln"><span className="ln__in">{children}</span></span>
);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return initHero(ref.current, { gsap, ScrollTrigger }); // returns destroy(): kills tweens + ScrollTriggers
  }, []);

  const total = heroSlides.length;

  return (
    <section ref={ref} className="hero" data-hero aria-roledescription="carousel" aria-label="Sunsure Energy">
      <div className="hero__media" data-media>
        <div className="hero__imgs" data-imgs>
          {heroSlides.map((s, i) => (
            <div key={s.id} className="sl-img" data-img aria-hidden={i !== 0}>
              <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" priority={i === 0} />
            </div>
          ))}
        </div>
        <div className="hero__scrim" />
      </div>
      <span className="hero__rule" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__slides">
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className={`hero__slide${i === 0 ? ' is-active' : ''}`}
              data-slide
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={i !== 0}
              inert={i !== 0}
            >
              <h1 className="hero__title">{s.title.map((t) => <Line key={t}>{t}</Line>)}</h1>
              <span className="hero__tick" data-tick aria-hidden="true" />
              <p className="hero__sub">{s.sub.map((t) => <Line key={t}>{t}</Line>)}</p>
            </div>
          ))}
        </div>
        <div className="hero__cta" data-cta>
          <a className="btn" href={heroCta.href}>
            <span>{heroCta.label}</span>
            <svg className="btn__arrow" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M0 8h20M13 1l7 7-7 7" /></svg>
          </a>
        </div>
      </div>

      <div className="hero__ctrl" data-ctrl>
        <span className="hero__count" aria-hidden="true"><span data-current>01</span> / {String(total).padStart(2, '0')}</span>
        <div className="hero__bars" aria-hidden="true">
          {heroSlides.map((s) => <span key={s.id} className="hero__bar" data-bar><i /></span>)}
        </div>
        <div className="hero__btns">
          <button type="button" className="ctrl-btn" data-prev aria-label="Previous slide">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 1 3 7l6 6" /></svg>
          </button>
          <button type="button" className="ctrl-btn" data-pause aria-pressed="false" aria-label="Pause slideshow">
            <svg className="i-pause" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1h3v12H3zM8 1h3v12H8z" /></svg>
            <svg className="i-play" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1l9 6-9 6z" /></svg>
          </button>
          <button type="button" className="ctrl-btn" data-next aria-label="Next slide">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m5 1 6 6-6 6" /></svg>
          </button>
        </div>
        <p className="sr-only" data-live aria-live="polite" />
      </div>

      <div className="hero__cue" data-cue aria-hidden="true"><span>Scroll</span></div>
    </section>
  );
}
