import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { AppLink } from '@/components/ui/AppLink';
import { CtaBand } from '@/components/sections/pages/CtaBand';
import { projects } from '@/content/projects';

/** /power-transmission/<type>/ lists projects tagged with that transmission category. */
export function TransmissionPage({ kind }: { kind: 'Inter State (CTU)' | 'Intra State (STU)' }) {
  const list = projects.filter((p) => p.transmission === kind);
  return (
    <>
      <PageHero eyebrow="Power transmission" lines={[kind]} crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects/' }, { label: kind }]} />
      <section className="pg">
        <Container>
          <div className="pg__cols pg__cols--2">
            {list.map((p) => (
              <AppLink key={p.slug} href={`/projects/${p.slug}/`} className="sol-card">
                <p className="label eyebrow">{p.capacityLabel}</p>
                <h2>{p.name}</h2>
                <p>{p.body}</p>
                <span className="tlink">View project</span>
              </AppLink>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
