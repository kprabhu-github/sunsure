'use client';
import { useEffect, useRef, useState } from 'react';
import { offices } from '../shared/data';
import { ConceptForm } from '../shared/ConceptForm';

const short = (n: string) => n.replace('Regional Office - ', '').replace('Head office', 'Gurugram');

export function ContactD() {
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const o = offices[i];
  const tel = o.phone ? 'tel:' + o.phone.replace(/\s/g, '') : undefined;
  return (
    <section ref={ref} id="contact" className="cd-ct" data-seen={seen} aria-labelledby="cd-ct-h">
      <div className="cd-ct__l">
        <p className="cd-ct__tag">Contact us</p>
        <h2 id="cd-ct-h">
          <span>Turn your power struggle</span> <span>into a power move</span>
        </h2>
        <div role="tablist" aria-label="Sunsure offices" className="cd-ct__tabs">
          {offices.map((x, k) => (
            <button key={x.name} role="tab" type="button" id={`cd-ct-t${k}`} aria-selected={i === k} aria-controls="cd-ct-p" tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}
              onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); setI((i + 1) % offices.length); } if (e.key === 'ArrowLeft') { e.preventDefault(); setI((i + offices.length - 1) % offices.length); } }}>
              {short(x.name)}
            </button>
          ))}
        </div>
        <div role="tabpanel" id="cd-ct-p" aria-labelledby={`cd-ct-t${i}`} className="cd-ct__office" key={i}>
          <span className="cd-ct__pin" aria-hidden="true"><i /><i /><b /></span>
          <p className="cd-ct__k">{o.name}</p>
          <address>{o.address}</address>
          <p className="cd-ct__lines">
            {tel && <a href={tel}>{o.phone}</a>}
            <a href={`mailto:${o.email}`}>{o.email}</a>
          </p>
        </div>
      </div>
      <div className="cd-ct__r"><ConceptForm prefix="cdf" title="Reach out to get a free quote" /></div>
    </section>
  );
}
