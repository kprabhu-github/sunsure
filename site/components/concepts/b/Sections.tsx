import Link from 'next/link';
import { Photo } from '../shared/Photo';
import { ConceptForm } from '../shared/ConceptForm';
import { SolutionsB } from './SolutionsB';
import { StoryB } from './StoryB';
import { Mark } from './Chrome';
import { about, homeStats, investorStats, investors, projects, advantage, customers, blogs, webinars, media, offices, company, footerLinks, parseDate } from '../shared/data';

export function HeaderB() {
  const nav = [{ l: 'About', h: '/about/' }, { l: 'Solutions', h: '/solutions/' }, { l: 'Projects', h: '/projects/' }, { l: 'Careers', h: '/careers-hiring/' }, { l: 'Knowledge Hub', h: '/knowledge-hub/' }];
  return (
    <header className="cb-top">
      <Link href="/concept-b/" className="cb-top__brand" aria-label="Sunsure Energy — concept B home"><Mark /><span>sunsure</span></Link>
      <p className="cb-top__status"><i className="cb-dot" aria-hidden="true" /> Making India’s Power Move</p>
      <nav aria-label="Primary" className="cb-top__nav">{nav.map((n) => <Link key={n.h} href={n.h}>{n.l}</Link>)}</nav>
      <Link href="/contact/" className="cb-btn cb-btn--sm">Contact Us</Link>
      <details className="cb-top__menu"><summary>Menu</summary><ul>{[...nav, { l: 'Contact Us', h: '/contact/' }].map((n) => <li key={n.h}><Link href={n.h}>{n.l}</Link></li>)}</ul></details>
    </header>
  );
}

export function AboutB() {
  return (
    <section id="about" className="cb-sec" aria-labelledby="cb-about-h">
      <div className="cb-secH"><span>02</span><h2 id="cb-about-h">{about.homeEyebrow.toLowerCase()}</h2></div>
      <div className="cb-grid cb-about">
        <div className="cb-cell cb-about__txt">
          <p className="cb-about__lead">{about.homeHeading}</p>
          <p>{about.paragraphs[0]}</p>
          <p>{about.paragraphs[1]}</p>
          <Link href="/about/" className="cb-btn cb-btn--line">Know more<span aria-hidden="true">→</span></Link>
        </div>
        <dl className="cb-about__stats">
          {homeStats.map((s) => <div key={s.label} className="cb-cell"><dd><span>{s.value}</span><sup>{s.suffix}</sup></dd><dt>{s.label}</dt></div>)}
        </dl>
        <div className="cb-cell cb-about__bk">
          <p className="cb-tag">{investors.eyebrow}</p><p className="cb-about__pg">{investors.name}</p>
          <dl>{investorStats.map((s) => <div key={s.label}><dd>{s.value}{s.suffix.trim()}</dd><dt>{s.label}</dt></div>)}</dl>
        </div>
      </div>
    </section>
  );
}

export function SystemB() {
  return (
    <section id="system" className="cb-sec" aria-labelledby="cb-sys-h">
      <div className="cb-secH"><span>03</span><h2 id="cb-sys-h">how the system works</h2></div>
      <p className="cb-sys__lead">24/7 clean and reliable renewable power for energy intensive industries.</p>
      <StoryB />
    </section>
  );
}

export function SolutionsSec() {
  return (
    <section id="solutions" className="cb-sec" aria-labelledby="cb-sol-h">
      <div className="cb-secH"><span>04</span><h2 id="cb-sol-h">solutions</h2></div>
      <p className="cb-sys__lead">A swift and seamless transition to renewable energy, with Sunsure.</p>
      <SolutionsB />
    </section>
  );
}

export function ProjectsB() {
  const rows = [...projects].sort((a, b) => b.mwp - a.mwp);
  return (
    <section id="projects" className="cb-sec" aria-labelledby="cb-pr-h">
      <div className="cb-secH"><span>05</span><h2 id="cb-pr-h">asset register</h2></div>
      <div className="cb-reg">
        <div className="cb-reg__side cb-cell">
          <div className="cb-duo cb-reg__img"><Photo k="crew" pos="50% 62%" sizes="(min-width: 1100px) 28vw, 100vw" /><i aria-hidden="true" /></div>
          <p className="cb-tag">Our plants in India</p>
          <p>Sunsure Energy’s Commercial, Industrial, and Institutional customers have improved the bottom-line by transitioning to renewable energy.</p>
          <dl><div><dd>8.3+</dd><dt>GW pipeline</dt></div><div><dd>800+</dd><dt>MW commissioned</dt></div></dl>
          <Link href="/projects/" className="cb-btn">See all projects<span aria-hidden="true">→</span></Link>
          <p className="cb-tag cb-reg__note">Representative photograph; project images pending.</p>
        </div>
        <div className="cb-reg__tbl">
          <table>
            <caption className="sr-only">Commissioned projects by capacity</caption>
            <thead><tr><th scope="col">#</th><th scope="col">Plant</th><th scope="col">State</th><th scope="col">Technology</th><th scope="col">Commissioned</th><th scope="col" className="r">Capacity</th></tr></thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p.slug}>
                  <td>{String(i + 1).padStart(2, '0')}</td>
                  <th scope="row"><Link href={`/projects/${p.slug}/`}>{p.name.split(' – ')[0]}</Link></th>
                  <td>{p.state ?? p.transmission}</td><td>{p.technology}</td><td>{p.commissioned ?? '—'}</td>
                  <td className="r"><span className="cb-reg__bar" style={{ ['--k' as string]: p.mwp / 150 }} aria-hidden="true" />{p.capacityLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function AdvantageB() {
  const fig = ['', 'up to 40%', '', '', '< 3%', '70%'];
  return (
    <section id="advantage" className="cb-sec" aria-labelledby="cb-adv-h">
      <div className="cb-secH"><span>06</span><h2 id="cb-adv-h">{advantage.eyebrow.toLowerCase()}</h2></div>
      <p className="cb-sys__lead">{advantage.heading.join(' ')}</p>
      <ol className="cb-adv">
        {advantage.items.map((it, i) => (
          <li key={it.title} className="cb-cell">
            <p className="cb-tag">0{i + 1}</p>
            {fig[i] ? <p className="cb-adv__fig">{fig[i]}</p> : <i className="cb-adv__bar" aria-hidden="true" />}
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CustomersB() {
  return (
    <section id="customers" className="cb-sec" aria-labelledby="cb-cu-h">
      <div className="cb-secH"><span>07</span><h2 id="cb-cu-h">the preferred renewable energy partner for</h2></div>
      <ul className="cb-wall">
        {customers.map((c) => <li key={c} className="cb-cell">{c}</li>)}
        <li className="cb-cell cb-wall__more"><b>100+</b> other industrial customers across over 16 Indian States</li>
        <li className="cb-cell cb-wall__pending"><span className="cb-tag">Testimonials</span>None published on the current site. Approved quotes will appear here.</li>
      </ul>
    </section>
  );
}

export function KnowledgeB() {
  const all = [...media, ...blogs, ...webinars].sort((a, b) => Date.parse(b.date + ' UTC') - Date.parse(a.date + ' UTC'));
  return (
    <section id="knowledge" className="cb-sec" aria-labelledby="cb-kh-h">
      <div className="cb-secH"><span>08</span><h2 id="cb-kh-h">knowledge hub</h2><Link href="/knowledge-hub/" className="cb-secH__more">All entries →</Link></div>
      <ol className="cb-log">
        {all.map((e) => {
          const d = parseDate(e.date);
          return (
            <li key={e.href}>
              <time dateTime={`${d.y}-${d.m}-${d.d}`}>{d.d} {d.m} {d.y}</time>
              <span className="cb-log__k" data-k={e.kind}>{e.kind}</span>
              <a href={e.href}>{e.title}</a>
              <b aria-hidden="true">↗</b>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function ContactB() {
  return (
    <section id="contact" className="cb-sec" aria-labelledby="cb-ct-h">
      <div className="cb-secH"><span>09</span><h2 id="cb-ct-h">contact us</h2></div>
      <div className="cb-grid cb-ct">
        <div className="cb-cell cb-ct__l">
          <p className="cb-ct__h">Turn your power struggle into a <span>power move</span></p>
          <ul className="cb-ct__offices">{offices.map((o) => <li key={o.name}><span className="cb-tag">{o.name}</span><address>{o.address}</address></li>)}</ul>
        </div>
        <div className="cb-cell cb-ct__r"><ConceptForm prefix="cb" title="Reach out to get a free quote" /></div>
      </div>
    </section>
  );
}

export function FooterB() {
  return (
    <footer className="cb-foot">
      <div className="cb-foot__grid">
        <div><Link href="/concept-b/" className="cb-top__brand"><Mark /><span>sunsure</span></Link><address>{company.headOffice}</address></div>
        <div><p className="cb-tag">Contact</p><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></div>
        <nav aria-label="Footer"><p className="cb-tag">Site</p><ul>{footerLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul></nav>
      </div>
      <p className="cb-foot__legal"><i className="cb-dot" aria-hidden="true" /> © Sunsure Energy. All rights Reserved.</p>
    </footer>
  );
}
