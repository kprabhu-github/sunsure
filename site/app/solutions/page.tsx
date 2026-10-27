import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { AppLink } from '@/components/ui/AppLink';
import { CtaBand } from '@/components/sections/pages/CtaBand';
import { solutionsIntro, solutions } from '@/content/solutions';
import { meta, titles } from '@/lib/seo';

export const metadata = meta(titles.solutions, '/solutions/');

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow={solutionsIntro.eyebrow} lines={solutionsIntro.heading} lead={solutionsIntro.body} crumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]} />
      <section className="pg">
        <Container>
          <div className="sol-cards">
            {solutions.map((s) => (
              <AppLink key={s.id} href={`/solutions/${s.slug}/`} className="sol-card">
                <p className="label eyebrow">{s.tagline}</p>
                <h2>{s.name}</h2>
                <ul>{s.items.map((i) => <li key={i.id}>{i.label}</li>)}</ul>
                <span className="tlink">Explore {s.name}</span>
              </AppLink>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
