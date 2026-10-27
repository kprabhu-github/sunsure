'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LogoD } from './LogoD';
import { company } from '../shared/data';

const links = [{ l: 'About', h: '/about/' }, { l: 'Solutions', h: '/solutions/' }, { l: 'Projects', h: '/projects/' }, { l: 'Careers', h: '/careers-hiring/' }, { l: 'Knowledge Hub', h: '/knowledge-hub/' }, { l: 'Contact Us', h: '/contact/' }];

/** Floating pill navigation that opens a full-screen index. */
export function NavD() {
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
      <header className="cd-pill">
        <Link href="/concept-d/" className="cd-brand" aria-label="Sunsure Energy — concept D home"><LogoD /></Link>
        <nav aria-label="Primary" className="cd-pill__nav"><Link href="/solutions/">Solutions</Link><Link href="/projects/">Projects</Link><Link href="/knowledge-hub/">Knowledge Hub</Link></nav>
        <Link href="/contact/" className="cd-pill__cta">Contact Us</Link>
        <button ref={opener} type="button" className="cd-pill__menu" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><span>Menu</span><i aria-hidden="true" /></button>
      </header>
      <div className="cd-ov" role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <button ref={close} type="button" className="cd-ov__x" onClick={() => setOpen(false)}>Close <span aria-hidden="true">×</span></button>
        <ul>{links.map((x, i) => <li key={x.h} style={{ ['--i' as string]: i }}><Link href={x.h} onClick={() => setOpen(false)}>{x.l}</Link></li>)}</ul>
        <p className="cd-ov__f"><a href={company.phoneHref}>{company.phone}</a> · <a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></p>
      </div>
    </>
  );
}
