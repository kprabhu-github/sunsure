'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initAbout } from './about-motion';
import { about } from './about-data';
import './about.css';

const Line = ({ children }: { children: React.ReactNode }) => (
  <span className="ln"><span className="ln__in">{children}</span></span>
);

const Arrow = () => <span className="more__tick" aria-hidden="true" />;

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return initAbout(ref.current, { gsap, ScrollTrigger });
  }, []);

  const { image } = about;
  const sizes = '(min-width: 900px) 52vw, 100vw';

  return (
    <section ref={ref} className="about" id="about" data-about aria-labelledby="about-title">
      <div className="about__top">
        <div className="about__text">
          <p className="eyebrow" data-reveal data-eyebrow>
            <span className="eyebrow__tick" data-tick aria-hidden="true" />
            <span className="ln"><span className="ln__in">{about.eyebrow}</span></span>
          </p>
          <h2 className="about__title" id="about-title" data-reveal data-title>
            {about.headingLines.map((l) => <Line key={l}>{l}</Line>)}
          </h2>
          <p className="about__body" data-reveal data-body>{about.body}</p>
          <div className="about__cta" data-reveal data-cta>
            <a className="more" href={about.cta.href}><span>{about.cta.label}</span><Arrow /></a>
          </div>
        </div>

        <div className="about__art" data-reveal data-art>
          <div className="art">
            {(['a', 'b'] as const).map((h) => (
              <div key={h} className={`art__half art__half--${h}`} data-half={h} aria-hidden={h === 'b' ? true : undefined}>
                <div className="art__in">
                  <Image
                    src={image.src} width={image.width} height={image.height} sizes={sizes}
                    alt={h === 'a' ? 'Wind turbines at sunset and an engineer overlooking solar panels, arranged as the Sunsure mark' : ''}
                    priority={false}
                  />
                  {h === 'b' && <span className="art__blade" data-blade aria-hidden="true" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className="stats" data-reveal data-stats aria-label="Sunsure in numbers">
        {about.stats.map((s) => (
          <li key={s.label} className="stat" data-stat>
            <span className="rule" data-rule aria-hidden="true" />
            <span className="stat__mark" data-stat-mark aria-hidden="true" />
            <p className="stat__num">
              <span className="sr-only">{s.value}+</span>
              <span aria-hidden="true" className="ln"><span className="ln__in"><span data-count={s.value}>{s.value}</span><i>+</i></span></span>
            </p>
            <p className="stat__label" data-stat-label>{s.label}</p>
          </li>
        ))}
      </ul>

      <div className="backed" data-reveal data-backed>
        <span className="rule" data-rule aria-hidden="true" />
        <p className="backed__label">{about.backed.label}</p>
        {/* TEMPORARY text treatment — replace with the official partners_group.svg when supplied. */}
        <p className="backed__name" data-placeholder="partners-group-logo">{about.backed.name}</p>
        <a className="more" href={about.backed.cta.href}><span>{about.backed.cta.label}</span><Arrow /></a>
      </div>
    </section>
  );
}
