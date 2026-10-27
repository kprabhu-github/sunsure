'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mark } from '../b/Chrome';
import { company } from '../shared/data';

const links = [{ l: 'About', h: '/about/' }, { l: 'Solutions', h: '/solutions/' }, { l: 'Projects', h: '/projects/' }, { l: 'Careers', h: '/careers-hiring/' }, { l: 'Knowledge Hub', h: '/knowledge-hub/' }, { l: 'Contact Us', h: '/contact/' }];

/** Floating pill navigation that opens a full-screen index. */
export function NavC() {
  const [open, setOpen] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden'; close.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); opener.current?.focus(); };
  }, [open]);
  return (
    <>
      <header className="cc2-pill">
        <Link href="/concept-c/" className="cc2-brand" aria-label="Sunsure Energy — concept C home"><Mark s={24} /><span>sunsure</span></Link>
        <nav aria-label="Primary" className="cc2-pill__nav"><Link href="/solutions/">Solutions</Link><Link href="/projects/">Projects</Link><Link href="/knowledge-hub/">Knowledge Hub</Link></nav>
        <Link href="/contact/" className="cc2-pill__cta">Contact Us</Link>
        <button ref={opener} type="button" className="cc2-pill__menu" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><span>Menu</span><i aria-hidden="true" /></button>
      </header>
      <div className="cc2-ov" role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <button ref={close} type="button" className="cc2-ov__x" onClick={() => setOpen(false)}>Close <span aria-hidden="true">×</span></button>
        <ul>{links.map((x, i) => <li key={x.h} style={{ ['--i' as string]: i }}><Link href={x.h} onClick={() => setOpen(false)}><span>0{i + 1}</span>{x.l}</Link></li>)}</ul>
        <p className="cc2-ov__f"><a href={company.phoneHref}>{company.phone}</a> · <a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></p>
      </div>
    </>
  );
}
