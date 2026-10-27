import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { ConceptForm } from '../shared/ConceptForm';
import { PlantCards } from './PlantCards';
import { Mark } from '../b/Chrome';
import { about, homeStats, investorStats, investors, solutions, advantage, customers, blogs, webinars, media, offices, company, footerLinks, parseDate } from '../shared/data';

export function AboutC() {
  return (
    <section className="cc2-about" aria-labelledby="cc2-ab-h">
      <div className="cc2-wrap">
        <p className="cc2-chip">{about.homeEyebrow}</p>
        <div className="cc2-about__top">
          <h2 id="cc2-ab-h" className="cc2-big">{about.homeHeading}</h2>
          <div className="cc2-about__txt"><p>{about.paragraphs[0]}</p><Link href="/about/" className="cc2-btn cc2-btn--cream">Know more<span aria-hidden="true">→</span></Link></div>
        </div>
        <dl className="cc2-discs">
          {homeStats.map((s, i) => (
            <div key={s.label} className="cc2-disc" data-i={i}><dd><span>{s.value}</span><sup>{s.suffix}</sup></dd><dt>{s.label}</dt></div>
          ))}
        </dl>
      </div>
      <div className="cc2-backed">
        <div className="cc2-wrap cc2-backed__in">
          <div><p className="cc2-chip cc2-chip--ink">{investors.eyebrow}</p><p className="cc2-backed__n">{investors.name}</p></div>
          <dl>{investorStats.map((s) => <div key={s.label}><dd>{s.value}{s.suffix.trim()}</dd><dt>{s.label}</dt></div>)}</dl>
        </div>
      </div>
    </section>
  );
}

export function SolutionsC() {
  const ph = { rtc: { k: 'crew', pos: '50% 62%' }, oa: { k: 'wind', pos: '58% 56%' } } as const;
  return (
    <section className="cc2-sol" aria-labelledby="cc2-sol-h">
      <div className="cc2-wrap">
        <p className="cc2-chip cc2-chip--ink">Our Solutions</p>
        <h2 id="cc2-sol-h" className="cc2-mid">A swift and seamless transition to renewable energy, with Sunsure</h2>
        {solutions.map((s, i) => {
          const p = ph[s.id as 'rtc' | 'oa'];
          return (
            <article key={s.id} className="cc2-sol__row" data-flip={i % 2 === 1}>
              <div className="cc2-sol__txt">
                <h3 className="cc2-big cc2-big--sm">{s.name}</h3>
                <p className="cc2-sol__tag">{s.tagline}</p>
                <p className="cc2-sol__head">{s.headline}</p>
                <ul>{s.items.map((it) => <li key={it.id}><Link href={it.href}>{it.label}<span aria-hidden="true">→</span></Link></li>)}</ul>
              </div>
              <div className="cc2-dome cc2-dome--sol"><Photo k={p.k} pos={p.pos} sizes="(min-width: 900px) 34vw, 80vw" /></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function AdvantageC() {
  const fig = ['01', 'up to 40%', '03', '04', '< 3%', '70%'];
  return (
    <section className="cc2-adv" aria-labelledby="cc2-adv-h">
      <div className="cc2-wrap">
        <p className="cc2-chip">{advantage.eyebrow}</p>
        <h2 id="cc2-adv-h" className="cc2-mid cc2-mid--cream">{advantage.heading.join(' ')}</h2>
        <ol className="cc2-stack">
          {advantage.items.map((it, i) => (
            <li key={it.title} data-i={i} style={{ ['--n' as string]: i }}>
              <div className="cc2-stack__card">
                <p className="cc2-stack__fig" aria-hidden={![1, 4, 5].includes(i)}>{fig[i]}</p>
                <div><h3>{it.title}</h3><p>{it.body}</p></div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CustomersC() {
  return (
    <section className="cc2-cust" aria-labelledby="cc2-cu-h">
      <div className="cc2-wrap">
        <h2 id="cc2-cu-h" className="cc2-mid">We are the preferred renewable energy partner for some of India’s leading industrial companies</h2>
        <ul className="cc2-stickers">
          {customers.map((c, i) => <li key={c} data-i={i % 7}>{c}</li>)}
        </ul>
        <p className="cc2-cust__more">…and <b>100+</b> other industrial customers across over 16 Indian States.</p>
        <p className="cc2-cust__pending"><span>Testimonials</span> None are published on the current site. Approved quotes will go here.</p>
      </div>
    </section>
  );
}

export function KnowledgeC() {
  const cols = [{ t: 'Blogs', e: blogs, tone: 'sun', h: '/blogs/' }, { t: 'Webinars', e: webinars, tone: 'red', h: '/webinars/' }, { t: 'Media', e: media, tone: 'green', h: '/media/' }] as const;
  return (
    <section className="cc2-kh" aria-labelledby="cc2-kh-h">
      <div className="cc2-wrap">
        <div className="cc2-kh__top"><h2 id="cc2-kh-h" className="cc2-big">Knowledge Hub</h2><Link href="/knowledge-hub/" className="cc2-btn">All articles<span aria-hidden="true">→</span></Link></div>
        <div className="cc2-kh__grid">
          {cols.map((c) => (
            <section key={c.t} className="cc2-poster" data-tone={c.tone} aria-label={c.t}>
              <h3>{c.t}</h3>
              <ul>{c.e.map((e) => { const d = parseDate(e.date); return <li key={e.href}><span className="cc2-poster__d"><b>{d.d}</b>{d.m} {d.y}</span><a href={e.href}>{e.title}</a></li>; })}</ul>
              <Link href={c.h} className="cc2-poster__all">See all {c.t.toLowerCase()} →</Link>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactC() {
  return (
    <section className="cc2-ct" aria-labelledby="cc2-ct-h">
      <div className="cc2-wrap">
        <h2 id="cc2-ct-h" className="cc2-ct__h">Turn your power struggle into a power move</h2>
        <div className="cc2-ct__grid">
          <ul className="cc2-ct__off">{offices.map((o) => <li key={o.name}><b>{o.name}</b><address>{o.address}</address></li>)}</ul>
          <ConceptForm prefix="cc2" title="Reach out to get a free quote" />
        </div>
      </div>
    </section>
  );
}

export function FooterC() {
  return (
    <footer className="cc2-foot">
      <div className="cc2-wrap">
        <div className="cc2-foot__grid">
          <div><Link href="/concept-c/" className="cc2-brand"><Mark s={26} /><span>sunsure</span></Link><address>{company.headOffice}</address><p><a href={company.phoneHref}>{company.phone}</a> · <a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></p></div>
          <nav aria-label="Footer"><ul>{footerLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul></nav>
        </div>
        <p className="cc2-foot__giant" aria-hidden="true">sunsure</p>
        <p className="cc2-foot__legal">© Sunsure Energy. All rights Reserved.</p>
      </div>
    </footer>
  );
}
