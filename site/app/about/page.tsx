import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/sections/pages/CtaBand';
import { about, customers } from '@/content/about';
import { meta, titles } from '@/lib/seo';

export const metadata = meta(titles.about, '/about/');

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" lines={[about.pageHeading]} lead={about.subHeading} crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <section className="pg">
        <Container>
          {about.paragraphs.map((p) => <p key={p} className="pg__p">{p}</p>)}
        </Container>
      </section>
      <section className="pg pg--alt" aria-labelledby="values-h">
        <Container>
          <h2 id="values-h" className="pg__h2">What we stand for</h2>
          <ul className="vals">
            {about.values.map((v) => <li key={v.title}><h3>{v.title}</h3><p>{v.body}</p></li>)}
          </ul>
        </Container>
      </section>
      <section className="pg" aria-labelledby="cust-h">
        <Container>
          <h2 id="cust-h" className="pg__h2">Our customers</h2>
          <ul className="cats">{customers.map((c) => <li key={c}>{c}</li>)}</ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
