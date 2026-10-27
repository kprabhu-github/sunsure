import Link from 'next/link';
import { LogoStatic } from './LogoStatic';
import { AboutFx } from './AboutFx';
import { IndiaMapD } from './IndiaMapD';
import { AdvantageTabsD } from './AdvantageTabsD';
import { CustomersWallD } from './CustomersWallD';
import { Photo } from '../shared/Photo';
import { solutions, solutionsIntro, about, homeStats, investors, advantage, customers, company, footerLinks } from '../shared/data';

export function ProjectsD() {
  return (
    <section id="projects" className="cb-sec cd-proj" aria-labelledby="cd-pr-h">
      <div className="cb-secH"><span>05</span><h2 id="cd-pr-h">our plants in india</h2><Link href="/projects/" className="cb-secH__more">All projects →</Link></div>
      <div className="cd-proj__head">
        <p className="cd-proj__lead">Commercial, Industrial and Institutional customers have improved their bottom line by moving to renewable energy.</p>
        <dl><div><dd>8.3+</dd><dt>GW pipeline</dt></div><div><dd>800+</dd><dt>MW commissioned</dt></div></dl>
      </div>
      <IndiaMapD />
    </section>
  );
}

export function FooterD() {
  return (
    <footer className="cb-foot">
      <div className="cb-foot__grid">
        <div><Link href="/concept-d/" className="cb-top__brand" aria-label="Sunsure Energy home"><LogoStatic tagline height={64} /></Link><address>{company.headOffice}</address></div>
        <div><p className="cb-tag">Contact</p><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></div>
        <nav aria-label="Footer"><p className="cb-tag">Site</p><ul>{footerLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul></nav>
      </div>
      <p className="cb-foot__legal"><i className="cb-dot" aria-hidden="true" /> © Sunsure Energy. All rights Reserved.</p>
    </footer>
  );
}

const fig = ['01', 'up to 40%', '03', '04', '< 3%', '70%'];
const keyFig = [1, 4, 5];
/** Advantage cards stack as the reader scrolls (CSS sticky, no scroll-jacking). Each carries a large figure: the published number where there is one, the item number otherwise. */
export function AdvantageStackD() {
  return <AdvantageTabsD />;
}

export function CustomersD() {
  return <CustomersWallD />;
}

const ico = {
  capital: <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 8h26v10M8 8v32h20M14 16h14M14 22h8" /><path d="M31 41l1-6 11-11a3 3 0 0 1 4 4L36 39z" /><path d="M20 28c0-2 6-2 6 0s-6 2-6 4 6 2 6 0M23 26v8" /></svg>,
  people: <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="12" r="5" /><circle cx="10" cy="22" r="4.5" /><circle cx="38" cy="22" r="4.5" /><path d="M14 40c0-7 4-12 10-12s10 5 10 12M2 38c0-5 3-9 8-9M46 38c0-5-3-9-8-9" /></svg>,
  solar: <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 44L14 24h20l6 20zM11 34h26M9 40h30M19 24l-2 20M29 24l2 20M24 24v20" /><path d="M24 6v6M10 10l4 4M38 10l-4 4M4 20h6M38 20h6" /></svg>,
};
const icoKeys = ['capital', 'people', 'solar'] as const;

/** Section 2 follows the live site: text, a two-photo split mark with a circular cut-out, three stats, and the "We are backed by" bar. Photos are the approved library images. */
export function AboutD() {
  return (
    <section id="about" className="cb-sec cd-about" aria-labelledby="cd-about-h">
      <div className="cb-secH"><span>02</span><h2 id="cd-about-h">{about.homeEyebrow.toLowerCase()}</h2></div>
      <AboutFx><div className="cd-about__grid">
        <div className="cd-about__txt">
          <p className="cd-about__h">{about.homeHeading}</p>
          <p>{about.paragraphs[0]}</p>
          <Link href="/about/" className="cd-more"><i aria-hidden="true" />Know More</Link>
        </div>
        <div className="cd-split" aria-hidden="true">
          <div className="cd-split__a"><Photo k="wind" pos="68% 55%" sizes="(min-width: 1000px) 24vw, 70vw" /></div>
          <div className="cd-split__b"><Photo k="crew" pos="42% 55%" sizes="(min-width: 1000px) 24vw, 70vw" /></div>
          <i className="cd-split__dot" />
        </div>
        <dl className="cd-about__stats">
          {homeStats.map((s, i) => (
            <div key={s.label}>
              <span className="cd-ico">{ico[icoKeys[i]]}</span>
              <dd>{s.value}{s.suffix.trim()}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div></AboutFx>
      <div className="cd-backed">
        <p>We are backed by</p>
        <p className="cd-backed__n">{investors.name}</p>
        <Link href="/about/" className="cd-more"><i aria-hidden="true" />Know More</Link>
      </div>
    </section>
  );
}

const solPhoto = { rtc: ['solar', '50% 60%'], oa: ['wind', '60% 55%'] } as const;
const short = (s: string) => { const first = s.split('. ')[0]; return first.length > 140 ? first.slice(0, 137).replace(/\s+\S*$/, '') + '…' : first.replace(/\.$/, '') + '.'; };
/** Solutions: two side-by-side cards. Every offering and benefit is visible, each offering links to its page. */
export function SolutionsD() {
  return (
    <section id="solutions" className="cb-sec" aria-labelledby="cd-sol-h">
      <div className="cb-secH"><h2 id="cd-sol-h">{solutionsIntro.eyebrow}</h2></div>
      <div className="cd-sol__top">
        <h3>{solutionsIntro.heading.join(' ')}</h3>
        <p>{solutionsIntro.body}</p>
      </div>
      <div className="cd-sol__cards">
        {solutions.map((s) => {
          const [k, pos] = solPhoto[s.id as 'rtc' | 'oa'] ?? ['solar', '50% 50%'];
          return (
            <article key={s.id} className="cd-sol__card">
              <div className="cd-sol__ph"><Photo k={k} pos={pos} sizes="(min-width: 900px) 46vw, 100vw" /><h3>{s.name}</h3></div>
              <div className="cd-sol__in">
                <p>{s.tagline}</p>
                <ul className="cd-sol__list">{s.items.map((it) => <li key={it.id}><Link href={it.href}><b>{it.label}</b><span>{short(it.body)}</span><i aria-hidden="true">→</i></Link></li>)}</ul>
                {s.benefits && <ul className="cd-sol__ben" aria-label={`${s.name} benefits`}>{s.benefits.map((b) => <li key={b.title}><b>{b.title}.</b> {b.body}</li>)}</ul>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
