import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { careersPage, jobsIntro, jobCategories, jobs } from '@/content/careers';
import { company } from '@/content/site';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.jobs, '/job-openings/');
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Careers" lines={['Job openings']} lead={jobsIntro} crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers-hiring/' }, { label: 'Job openings' }]} />
      <section className="pg">
        <Container>
          <ul className="cats" aria-label="Job categories">{jobCategories.map((c) => <li key={c.name}>{c.name}<b>{c.count}</b></li>)}</ul>
          {jobs.map((j) => (
            <article key={j.title} className="job">
              <h3>{j.title}</h3>
              <p className="job__meta label"><span>{j.location}</span><span>{j.experience}</span><span>Posted {j.posted}</span></p>
              <p>{j.summary}</p>
              <p><a className="tlink" href={`mailto:${company.careersEmail}?subject=${encodeURIComponent(j.title)}`}>Apply by email</a></p>
            </article>
          ))}
          <p className="label" style={{ marginTop: '2rem' }}>Only listings published on sunsure-energy.com are shown here.</p>
        </Container>
      </section>
    </>
  );
}
