'use client';
import { AppLink } from '@/components/ui/AppLink';
import { Container } from '@/components/ui/Container';
import { MaskImage } from '@/components/ui/MaskImage';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap } from '@/lib/motion/gsap';
import { about } from '@/content/about';
import './about.css';

export function About() {
  const ref = useGsapScope<HTMLElement>(({ root, reduced }) => {
    if (reduced) return;
    const path = root.querySelector('[data-path]');
    gsap.fromTo(path, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
    // the small plate drifts against the large one
    gsap.fromTo(root.querySelector('[data-drift]'), { yPercent: 10 }, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  return (
    <section ref={ref} className="about" aria-labelledby="about-h">
      <Container>
        <div className="about__grid">
          <div className="about__copy">
            <span className="about__path" data-path aria-hidden="true" />
            <p className="label eyebrow">{about.homeEyebrow}</p>
            <RevealHeading id="about-h" className="about__h" lines={['Powering India’s', 'energy independence']} />
            <p className="about__p">{about.paragraphs[0]}</p>
            <AppLink href="/about/" className="tlink">Know More</AppLink>
          </div>
          <div className="about__media">
            <MaskImage className="about__big" src="/images/solar-plant-robotic-cleaning.webp" alt="Solar rows with maintenance crew" ratio="4 / 5" position="50% 50%" from="bottom" sizes="(min-width: 900px) 38vw, 90vw" />
            <div className="about__small" data-drift>
              <MaskImage src="/images/solar-plant-sunrise.webp" alt="Aerial view of a Sunsure solar plant at sunrise" ratio="3 / 2" from="left" sizes="(min-width: 900px) 24vw, 60vw" />
              <p className="label about__cap">Founded in 2014</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
