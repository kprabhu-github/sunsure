'use client';
import { Container } from '@/components/ui/Container';
import { useGsapScope } from '@/hooks/useGsapScope';
import { gsap } from '@/lib/motion/gsap';
import { networkSteps, networkIndustries, cufBars } from './network-data';
import './network.css';

const IND_Y = [90, 185, 280, 375, 470];
const HUB = { x: 610, y: 280 };

/** The homepage's single pinned storytelling section (desktop). Below 900px and with reduced motion it is a static, fully drawn diagram. */
export function EnergyNetwork() {
  const ref = useGsapScope<HTMLElement>(({ root, reduced }) => {
    const mm = gsap.matchMedia();
    mm.add({ desk: '(min-width: 900px)', ok: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      const { desk, ok } = ctx.conditions as { desk: boolean; ok: boolean };
      if (!desk || !ok || reduced) return;
      const q = (s: string) => root.querySelectorAll<SVGElement | HTMLElement>(s);
      root.dataset.pinned = 'true';
      const live = q('[data-live]');
      const steps = q('[data-step]');
      gsap.set(live, { strokeDashoffset: 1 });
      gsap.set(q('[data-node]'), { opacity: 0.18 });
      gsap.set(steps, { autoAlpha: 0 });
      gsap.set(steps[0], { autoAlpha: 1 });
      gsap.set(q('[data-bar] i'), { scaleX: 0 });
      gsap.set(q('[data-ind]'), { opacity: 0.18 });

      const counter = root.querySelector('[data-count]');
      const prog = root.querySelector('[data-prog]');
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.querySelector('.net__pin'), start: 'top top', end: '+=320%', pin: true, scrub: 0.8, anticipatePin: 1,
          onUpdate: (self) => { const i = Math.min(3, Math.floor(self.progress * 4)); if (counter) counter.textContent = `0${i + 1} / 04`; if (prog) (prog as HTMLElement).style.transform = `scaleX(${self.progress})`; },
        },
      });
      const swap = (i: number) => { tl.to(steps[i - 1], { autoAlpha: 0, duration: 0.15 }, i - 0.05).to(steps[i], { autoAlpha: 1, duration: 0.2 }, i); };

      // 1 generate
      tl.to(q('[data-node="solar"],[data-node="wind"]'), { opacity: 1, duration: 0.3, stagger: 0.1 }, 0.05)
        .to(q('[data-live="solar"],[data-live="wind"]'), { strokeDashoffset: 0, duration: 0.7 }, 0.2)
        .to(q('[data-node="hub"]'), { opacity: 1, duration: 0.2 }, 0.8)
        .to(q('[data-bar] i'), { scaleX: 1, duration: 0.6, stagger: 0.08 }, 0.25);
      // 2 store
      swap(1);
      tl.to(q('[data-bar]'), { autoAlpha: 0, duration: 0.2 }, 1)
        .to(q('[data-node="storage"]'), { opacity: 1, duration: 0.3 }, 1.1)
        .to(q('[data-live="storage"]'), { strokeDashoffset: 0, duration: 0.6 }, 1.25);
      // 3 transmit
      swap(2);
      tl.to(q('[data-live^="grid"]'), { strokeDashoffset: 0, duration: 0.8, stagger: 0.06 }, 2.1)
        .to(q('[data-tag]'), { opacity: 1, duration: 0.3 }, 2.5);
      // 4 deliver
      swap(3);
      tl.to(q('[data-ind]'), { opacity: 1, duration: 0.3, stagger: 0.08 }, 3.1)
        .to(q('[data-ind] circle'), { fill: 'var(--red)', duration: 0.3, stagger: 0.08 }, 3.2);
      tl.to({}, { duration: 0.15 }, 3.85); // hold the final frame

      return () => { delete root.dataset.pinned; };
    });
    return () => mm.revert();
  });

  const gridPath = (y: number) => `M${HUB.x + 36} ${HUB.y} C 760 ${HUB.y} 800 ${y} 900 ${y}`;

  return (
    <section ref={ref} className="net" aria-labelledby="net-h">
      <div className="net__pin">
        <Container>
          <div className="net__inner">
            <div className="net__copy">
              <p className="label eyebrow">Round-the-clock energy</p>
              <h2 id="net-h" className="net__h">From the plant to your plant</h2>
              <div className="net__steps">
                {networkSteps.map((s, i) => (
                  <div key={s.id} className="net__step" data-step>
                    <p className="label net__stepn">0{i + 1} — {s.label}</p>
                    <p className="net__text">{s.text}</p>
                  </div>
                ))}
              </div>
              <div className="net__meter" aria-hidden="true">
                <span className="label" data-count>01 / 04</span>
                <span className="net__track"><i data-prog /></span>
              </div>
            </div>

            <div className="net__viz">
              <svg viewBox="0 0 1240 560" role="img" aria-label="Diagram: solar, wind and battery storage feed the grid, which delivers power to industries" className="net__svg">
                {/* base network (always visible, hairline) */}
                <g className="net__base" fill="none">
                  <path d="M190 130 C 330 130 440 280 574 280" />
                  <path d="M190 290 C 330 290 440 285 574 282" />
                  <path d="M400 420 C 400 350 480 300 580 292" />
                  {IND_Y.map((y) => <path key={y} d={gridPath(y)} />)}
                </g>
                {/* energised paths */}
                <g className="net__live" fill="none">
                  <path data-live="solar" pathLength={1} d="M190 130 C 330 130 440 280 574 280" />
                  <path data-live="wind" pathLength={1} d="M190 290 C 330 290 440 285 574 282" />
                  <path data-live="storage" pathLength={1} d="M400 420 C 400 350 480 300 580 292" />
                  {IND_Y.map((y, i) => <path key={y} data-live={`grid${i}`} pathLength={1} d={gridPath(y)} />)}
                </g>

                <g data-node="solar"><circle cx="150" cy="130" r="38" className="net__n" /><circle cx="150" cy="130" r="11" className="net__glyph" /><path className="net__glyph" d="M150 104v-8M150 164v-8M124 130h-8M184 130h-8M132 112l-6-6M174 154l-6-6M168 112l6-6M126 154l6-6" /><text x="150" y="196" textAnchor="middle" className="net__t">Solar</text></g>
                <g data-node="wind"><circle cx="150" cy="290" r="38" className="net__n" /><path className="net__glyph" d="M150 290v30M150 290l0-24M150 290l21 12M150 290l-21 12" /><text x="150" y="356" textAnchor="middle" className="net__t">Wind</text></g>
                <g data-node="storage"><circle cx="400" cy="450" r="38" className="net__n" /><rect x="384" y="438" width="32" height="22" className="net__glyph" /><path className="net__glyph" d="M392 436v-5h16v5" /><text x="400" y="516" textAnchor="middle" className="net__t">Energy Storage</text></g>
                <g data-node="hub"><circle cx={HUB.x} cy={HUB.y} r="36" className="net__n" /><path className="net__glyph" d="M600 262l20 18-20 18M624 262l-20 18 20 18" /><text x={HUB.x} y="214" textAnchor="middle" className="net__t">Transmission</text>
                  <g data-tag className="net__tag"><text x="720" y="540" className="net__t net__t--s">Intra-state · Inter-state</text></g></g>
                {networkIndustries.map((n, i) => (
                  <g key={n} data-ind><circle cx="930" cy={IND_Y[i]} r="26" className="net__n" /><text x="968" y={IND_Y[i] + 7} className="net__t">{n}</text></g>
                ))}
              </svg>

              <p className="label net__note" data-bar>Capacity utilization factor</p>
              <ul className="net__bars" aria-label="Capacity utilization factor, up to">
                {cufBars.map((b) => (
                  <li key={b.label} data-bar>
                    <span className="label">{b.label} <b>up to {b.value}%</b></span>
                    <span className="net__bar"><i style={{ width: `${b.value}%` }} /></span>
                  </li>
                ))}
              </ul>
              
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
