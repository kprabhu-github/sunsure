import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { careersPage, jobsIntro, jobCategories } from '@/content/careers';
import { about } from '@/content/about';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.careers, '/careers-hiring/');
export default function Page() {
  return (
    <>
      <PageHero eyebrow={careersPage.eyebrow} lines={careersPage.heading} lead={careersPage.sub} crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />
      <section className="pg">
        <Container>
          <h2 className="pg__h2">Our values</h2>
          <ul className="vals">{about.values.map((v) => <li key={v.title}><h3>{v.title}</h3><p>{v.body}</p></li>)}</ul>
        </Container>
      </section>
      <section className="pg pg--alt" aria-labelledby="open-h">
        <Container>
          <h2 id="open-h" className="pg__h2">Job openings</h2>
          <p className="pg__p pg__p--body">{jobsIntro}</p>
          <div className="pg__cta"><Button href="/job-openings/">View openings</Button></div>
        </Container>
      </section>
    </>
  );
}
