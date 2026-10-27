import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { projectsPage } from '@/content/projects';

/** Closing band reused by inner pages. Text is the published "power struggle" CTA. */
export function CtaBand() {
  return (
    <section className="pg pg--alt" aria-labelledby="cta-h">
      <Container>
        <h2 id="cta-h" className="pg__h2" style={{ maxWidth: '20ch' }}>{projectsPage.cta.heading}</h2>
        <p className="pg__p">{projectsPage.cta.body}</p>
        <div className="pg__cta"><Button href="/contact/">Contact Us</Button></div>
      </Container>
    </section>
  );
}
