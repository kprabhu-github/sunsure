import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

export const B = '/concept-e';
const st = (o: Record<string, string | number>) => o as CSSProperties;

/** Full-height photo hero, as on the homepage: line-by-line headline, facts bar, scroll cue. */
export function Hero({ img, pos = '50% 55%', alt = '', eyebrow, lines, sub, crumbs, facts, cta, t = 5.5 }: {
  img: string; pos?: string; alt?: string; eyebrow: string; lines: string[]; sub?: string; crumbs?: { label: string; href?: string }[];
  facts?: { v: string; l: string }[]; cta?: { label: string; href: string }; t?: number;
}) {
  return (
    <section id="hero" className="ch" data-t={t} data-name="Dawn" data-label="Intro" aria-label="Introduction">
      <div className="hero-pin">
        <div className="hero-media"><img src={img} alt={alt} style={{ objectPosition: pos }} fetchPriority="high" /></div>
        <div className="hero-shade" />
        <div className="hero-copy"><div className="wrap">
          {crumbs && <nav className="crumbs" aria-label="Breadcrumb"><Link href={`${B}/`}>Home</Link>{crumbs.map((c) => c.href ? <Link key={c.label} href={c.href}>{c.label}</Link> : <span key={c.label}>{c.label}</span>)}</nav>}
          <span className="eyebrow">{eyebrow}</span>
          <h1>{lines.map((l, i) => <span key={l} className="ln"><span style={st({ '--i': i })}>{l}</span></span>)}</h1>
          {sub && <p className="sub">{sub}</p>}
          {cta && <div className="hero-cta"><Link className="btn" href={cta.href}>{cta.label}</Link></div>}
        </div></div>
        <div className="hero-facts"><div className="wrap">
          {facts ? <dl>{facts.map((f) => <div key={f.l}><dt>{f.v}</dt><dd>{f.l}</dd></div>)}</dl> : <span />}
          <span className="cue"><i />Scroll</span>
        </div></div>
      </div>
    </section>
  );
}

/** A chapter of the day: the page clock reads data-t as the hour. */
export function Ch({ t, name, label, id, className = '', children }: { t: number; name: string; label: string; id?: string; className?: string; children: ReactNode }) {
  return <section id={id} className={`ch sec ${className}`} data-t={t} data-name={name} data-label={label}>{children}</section>;
}

/** Headline that slides up line by line when it enters the viewport. */
export function H({ lines, big, as: Tag = 'h2' }: { lines: string[]; big?: boolean; as?: 'h2' | 'h3' }) {
  return <Tag className={`hl${big ? ' big' : ''}`}>{lines.map((l, i) => <span key={l} className="ln"><span style={st({ '--i': i })}>{l}</span></span>)}</Tag>;
}

export function Rise({ items, cols = 4 }: { items: { title: string; body: string; img?: string }[]; cols?: 2 | 3 | 4 }) {
  return (
    <ul className={`rise${cols === 3 ? ' c3' : cols === 2 ? ' c2' : ''}`}>
      {items.map((it, i) => (
        <li key={it.title} className="rc" style={st({ '--i': i % 4 })}>
          <header><span>0{i + 1}</span><h3>{it.title}</h3></header>
          <p>{it.body}</p>
          {it.img && <div className="zph"><img src={it.img} alt="" loading="lazy" /></div>}
        </li>
      ))}
    </ul>
  );
}

export function Cta({ heading = ["Turn your business'", 'power struggle into', 'a power move'], body = 'Tell us about your load and we will map the cleanest, most reliable route to renewable power.', t = 21.5 }: { heading?: string[]; body?: string; t?: number }) {
  return (
    <Ch t={t} name="Night" label="Talk to us" className="ctaband">
      <div className="wrap">
        <span className="eyebrow">Talk to us</span>
        <H lines={heading} big />
        <p className="rv">{body}</p>
        <Link className="btn rv" href={`${B}/contact/`}>Contact Us</Link>
      </div>
    </Ch>
  );
}
