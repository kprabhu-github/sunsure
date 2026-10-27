import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { projectsPage } from '@/content/projects';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.market, '/sunsure-power-market/');
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sunsure Power Market" lines={[projectsPage.cta.heading]} crumbs={[{ label: 'Home', href: '/' }, { label: 'Sunsure Power Market' }]} />
      <section className="pg"><Container>
        <p className="pg__p">{projectsPage.cta.body}</p>
        <div className="pg__cta"><Button href="/contact/">Contact Us</Button></div>
      </Container></section>
    </>
  );
}
