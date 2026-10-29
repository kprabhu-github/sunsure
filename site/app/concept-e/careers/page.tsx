import Link from 'next/link';
import { Ch, H, B } from '@/components/concepts/e/parts';
import { PgTheme, RoleMarquee } from '@/components/concepts/e/pg';
import { careersPage, jobCategories, jobsIntro } from '@/content/careers';
import { about } from '@/content/about';
export const metadata = { title: 'Careers | Concept E' };
export default function Page() {
  const total = jobCategories.reduce((a, c) => a + c.count, 0);
  return (
    <>
      <PgTheme name="careers" solid />
      <section id="intro" className="ch pgc-hero" data-t={5.5} data-name="Dawn" data-label="Careers" aria-label="Careers at Sunsure">
        <RoleMarquee words={jobCategories.map((c) => c.name)} />
        <div className="wrap pgc-g">
          <div className="pgc-c">
            <nav className="crumbs" aria-label="Breadcrumb"><Link href={`${B}/`}>Home</Link><span>Careers</span></nav>
            <span className="eyebrow">{careersPage.eyebrow}</span>
            <h1 className="pgc-h">{careersPage.heading.map((l, i) => <span key={l} className="ln"><span style={{ ['--i' as string]: i }}>{l}</span></span>)}</h1>
            <p className="pgc-p">{careersPage.sub}. Join the team building India’s largest industrial decarbonisation company.</p>
            <div className="pgc-a"><Link className="btn" href={`${B}/job-openings/`}>See {total} open {total === 1 ? 'role' : 'roles'}</Link><a className="link" href="mailto:careers@sunsure.in">careers@sunsure.in</a></div>
          </div>
          <div className="pgc-f"><div className="fr"><img src="/images/engineers.jpg" alt="Sunsure engineers reviewing a plant" /></div><i className="sl" aria-hidden="true" /><b className="tag">Since 2014</b></div>
        </div>
      </section>

      <Ch t={9} name="Morning" label="Values" id="values" className="pgc-val">
        <div className="wrap">
          <span className="eyebrow">How we work</span>
          <H lines={['Four rules we', 'actually use']} />
          <ul className="pgc-vs">{about.values.map((v, i) => <li key={v.title} className="rv" style={{ ['--d' as string]: `${i * .07}s` }}><em>0{i + 1}</em><h3>{v.title}</h3><p>{v.body}</p></li>)}</ul>
        </div>
      </Ch>

      <Ch t={15.5} name="Afternoon" label="Open roles" id="open" className="pgc-open">
        <div className="wrap pgc-og">
          <div><span className="eyebrow">Open roles</span><H lines={['Find your', 'place on', 'the team']} />
            <p className="copy rv" style={{ marginTop: 18 }}>{jobsIntro}</p>
            <p style={{ marginTop: 26 }}><Link className="btn" href={`${B}/job-openings/`}>View openings</Link></p></div>
          <ul className="pgc-cat">{jobCategories.map((c) => <li key={c.name} className="rv"><span>{c.name}</span><b>{c.count}</b></li>)}</ul>
        </div>
      </Ch>

      <Ch t={21.5} name="Night" label="Apply" id="apply" className="pgc-apply">
        <div className="pgc-bg"><img src="/images/wind-turbines.jpg" alt="" loading="lazy" /></div>
        <div className="wrap">
          <span className="eyebrow">How to apply</span>
          <H lines={['Three steps,', 'one email']} />
          <ol className="pgc-st">
            <li className="rv"><em>1</em><h3>Pick a role</h3><p>Read the openings and choose the one that fits.</p></li>
            <li className="rv"><em>2</em><h3>Write to us</h3><p>Email your resume and details to careers@sunsure.in.</p></li>
            <li className="rv"><em>3</em><h3>Use the job title</h3><p>Put the job title in the subject so it reaches the right person.</p></li>
          </ol>
        </div>
      </Ch>
    </>
  );
}
