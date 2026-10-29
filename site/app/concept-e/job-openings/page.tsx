import { Ch, H, Cta, B } from '@/components/concepts/e/parts';
import { PgTheme, PgHead } from '@/components/concepts/e/pg';
import { jobsIntro, jobCategories, jobs } from '@/content/careers';
import { company } from '@/content/site';
export const metadata = { title: 'Job openings | Concept E' };
export default function Page() {
  return (
    <>
      <PgTheme name="jobs" solid />
      <PgHead img="/images/engineers.jpg" eyebrow="Careers" lines={['Job openings']} sub={jobsIntro} crumbs={[{ label: 'Careers', href: `${B}/careers/` }, { label: 'Job openings' }]} />
      <Ch t={9} name="Morning" label="Roles">
        <div className="wrap"><span className="eyebrow">Open roles</span><H lines={['Come and build with us']} />
          <ul className="chips">{jobCategories.map((c) => <li key={c.name} className="rv">{c.name}<b>{c.count}</b></li>)}</ul>
          <ul className="rise c2" style={{ marginTop: 40 }}>{jobs.map((j, i) => (
            <li key={j.title} className="rc" style={{ ['--i' as string]: i }}>
              <header><span>{j.location} · {j.experience}</span><h3>{j.title}</h3></header>
              <p>{j.summary.length > 380 ? j.summary.slice(0, 377).trimEnd() + '…' : j.summary}</p>
              <p style={{ paddingTop: 0 }}><a className="link" href={`mailto:${company.careersEmail}?subject=${encodeURIComponent(j.title)}`}>Apply by email</a></p>
            </li>))}</ul>
          <p className="copy" style={{ marginTop: 26 }}>Only listings published on sunsure-energy.com are shown here.</p></div>
      </Ch>
      <Cta heading={['Make your power move', 'with Sunsure']} body="Email your resume to careers@sunsure.in with the job title in the subject." t={18.5} />
    </>
  );
}
