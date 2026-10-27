import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { ConceptForm } from '../shared/ConceptForm';
import { PlantIndex } from './PlantIndex';
import { AdvantageStory } from './AdvantageStory';
import { about, homeStats, investorStats, investors, solutions, solutionsIntro, advantage, customers, blogs, webinars, media, offices, company, footerLinks, parseDate } from '../shared/data';
import { navItems } from '@/content/navigation';

const Mark = () => (
  <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path d="M22 9.5c-1.7-2-4-3-6.6-3-3.4 0-6 1.8-6 4.4 0 6.6 14.4 3.2 14.4 10.6 0 3-2.8 5-6.6 5-3 0-5.7-1.2-7.6-3.4" fill="none" stroke="#fe3a20" strokeWidth="3.4" strokeLinecap="square" /></svg>
);
const Brand = () => <Link href="/concept-a/" className="ca-brand" aria-label="Sunsure Energy — concept A home"><Mark /><span>sunsure</span></Link>;

export function HeaderA() {
  const left = [{ l: 'About', h: '/about/' }, { l: 'Solutions', h: '/solutions/' }, { l: 'Projects', h: '/projects/' }];
  const right = [{ l: 'Careers', h: '/careers-hiring/' }, { l: 'Knowledge Hub', h: '/knowledge-hub/' }];
  return (
    <header className="ca-head">
      <div className="ca-head__strip">
        <p>Making India’s Power Move</p>
        <p><a href={company.phoneHref}>{company.phone}</a><span aria-hidden="true"> · </span><a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></p>
      </div>
      <div className="ca-head__bar">
        <nav aria-label="Primary" className="ca-head__nav ca-head__nav--l">{left.map((x) => <Link key={x.h} href={x.h}>{x.l}</Link>)}</nav>
        <Brand />
        <nav aria-label="Secondary" className="ca-head__nav ca-head__nav--r">{right.map((x) => <Link key={x.h} href={x.h}>{x.l}</Link>)}<Link href="/contact/" className="ca-btn ca-btn--sm">Contact Us</Link></nav>
        <details className="ca-head__menu">
          <summary>Menu</summary>
          <ul>{[...left, ...right, { l: 'Contact Us', h: '/contact/' }].map((x) => <li key={x.h}><Link href={x.h}>{x.l}</Link></li>)}</ul>
        </details>
      </div>
    </header>
  );
}

export function AboutA() {
  return (
    <section className="ca-sec ca-about" aria-labelledby="ca-about-h">
      <div className="ca-wrap ca-grid">
        <div className="ca-side"><p className="ca-label">§ 01 — {about.homeEyebrow}</p><Link href="/about/" className="ca-link">Know more →</Link></div>
        <div className="ca-main">
          <h2 id="ca-about-h" className="ca-lede">{about.paragraphs[0]}</h2>
          <div className="ca-cols">
            <p>{about.paragraphs[1]}</p>
          </div>
        </div>
      </div>
      <div className="ca-wrap">
        <dl className="ca-ledger">
          {homeStats.map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd><span>{s.value}</span><sup>{s.suffix}</sup></dd></div>
          ))}
        </dl>
      </div>
      <div className="ca-wrap ca-backed">
        <div><p className="ca-label">{investors.eyebrow}</p><p className="ca-backed__n">{investors.name}</p></div>
        <dl>{investorStats.map((s) => <div key={s.label}><dd>{s.value}{s.suffix.trim()}</dd><dt>{s.label}</dt></div>)}</dl>
      </div>
    </section>
  );
}

const solPhoto = { rtc: { k: 'crew', pos: '50% 62%' }, oa: { k: 'wind', pos: '55% 55%' } } as const;
export function SolutionsA() {
  return (
    <section className="ca-sec ca-sol" aria-labelledby="ca-sol-h">
      <div className="ca-wrap">
        <p className="ca-label">§ 02 — {solutionsIntro.eyebrow}</p>
        <h2 id="ca-sol-h" className="ca-h2">A swift and seamless transition to <em>renewable energy,</em> with Sunsure</h2>
        <div className="ca-sol__grid">
          {solutions.map((s) => (
            <article key={s.id} className="ca-sol__card">
              <div className="ca-sol__img"><Photo k={solPhoto[s.id as 'rtc' | 'oa'].k} pos={solPhoto[s.id as 'rtc' | 'oa'].pos} sizes="(min-width: 900px) 46vw, 100vw" /></div>
              <p className="ca-label">{s.tagline}</p>
              <h3>{s.name}</h3>
              <p className="ca-sol__head">{s.headline}</p>
              <ol>{s.items.map((it, i) => <li key={it.id}><Link href={it.href}><span>{String(i + 1).padStart(2, '0')}</span>{it.label}<b aria-hidden="true">→</b></Link></li>)}</ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsA() {
  return (
    <section className="ca-sec" aria-labelledby="ca-pr-h" id="projects">
      <div className="ca-wrap">
        <div className="ca-grid ca-head2">
          <div className="ca-side"><p className="ca-label">§ 03 — Our presence</p></div>
          <div className="ca-main"><h2 id="ca-pr-h" className="ca-h2">Our plants <em>in India</em></h2></div>
        </div>
        <PlantIndex />
        <p className="ca-more"><Link href="/projects/" className="ca-btn ca-btn--ghost">See all projects <span aria-hidden="true">→</span></Link></p>
      </div>
    </section>
  );
}

export function AdvantageA() {
  return (
    <section className="ca-sec ca-adv" aria-labelledby="ca-adv-h">
      <div className="ca-wrap">
        <p className="ca-label">§ 04 — {advantage.eyebrow}</p>
        <h2 id="ca-adv-h" className="ca-h2 ca-h2--light">{advantage.heading[0]} <em>{advantage.heading[1]}</em> {advantage.heading[2]}</h2>
        <AdvantageStory />
      </div>
    </section>
  );
}

export function CustomersA() {
  return (
    <section className="ca-sec ca-cust" aria-labelledby="ca-cu-h">
      <div className="ca-wrap ca-grid">
        <div className="ca-side"><p className="ca-label">§ 05 — Customers</p></div>
        <div className="ca-main">
          <h2 id="ca-cu-h" className="ca-roster">
            <span className="ca-roster__lead">We are the preferred renewable energy partner for </span>
            {customers.map((c) => <span key={c} className="ca-roster__n">{c}<i>, </i></span>)}
            <span className="ca-roster__lead"> and 100+ other industrial customers across over 16 Indian States.</span>
          </h2>
          <p className="ca-quote-slot"><span className="ca-label">Testimonials</span>No customer testimonials are published on the current site. Approved quotes will be set here in this typographic style.</p>
        </div>
      </div>
    </section>
  );
}

export function KnowledgeA() {
  const lead = media[0];
  const d = parseDate(lead.date);
  return (
    <section className="ca-sec ca-kh" aria-labelledby="ca-kh-h">
      <div className="ca-wrap">
        <div className="ca-kh__top"><div><p className="ca-label">§ 06 — Media, blogs & webinars</p><h2 id="ca-kh-h" className="ca-h2">Knowledge <em>Hub</em></h2></div><Link href="/knowledge-hub/" className="ca-link">All articles →</Link></div>
        <div className="ca-kh__grid">
          <article className="ca-kh__lead">
            <p className="ca-label">Media · {d.d} {d.m} {d.y}</p>
            <h3><a href={lead.href}>{lead.title}</a></h3>
            {lead.excerpt && <p>{lead.excerpt}</p>}
            <ul className="ca-kh__more">{media.slice(1).map((m) => <li key={m.href}><span className="ca-label">{m.date}</span><a href={m.href}>{m.title}</a></li>)}</ul>
          </article>
          {[{ t: 'Blogs', e: blogs }, { t: 'Webinars', e: webinars }].map((g) => (
            <div key={g.t} className="ca-kh__col">
              <p className="ca-label ca-kh__colh">{g.t}</p>
              <ul>{g.e.map((e) => <li key={e.href}><span className="ca-label">{e.date}</span><a href={e.href}>{e.title}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactA() {
  return (
    <section className="ca-contact" aria-labelledby="ca-ct-h">
      <div className="ca-wrap ca-contact__grid">
        <div>
          <p className="ca-label">§ 07 — Contact us</p>
          <h2 id="ca-ct-h" className="ca-contact__h">Turn your power struggle into a <em>power move</em></h2>
          <ul className="ca-offices">{offices.map((o) => <li key={o.name}><p className="ca-label">{o.name}</p><address>{o.address}</address></li>)}</ul>
        </div>
        <ConceptForm prefix="ca" title="Reach out to get a free quote" />
      </div>
    </section>
  );
}

export function FooterA() {
  return (
    <footer className="ca-foot">
      <div className="ca-wrap">
        <div className="ca-foot__grid">
          <div><Brand /><address>{company.headOffice}</address><p><a href={company.phoneHref}>{company.phone}</a><br /><a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></p></div>
          <nav aria-label="Footer"><ul>{footerLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul></nav>
        </div>
        <p className="ca-foot__giant" aria-hidden="true">Making India’s Power Move</p>
        <p className="ca-foot__legal">© Sunsure Energy. All rights Reserved.</p>
      </div>
    </footer>
  );
}
