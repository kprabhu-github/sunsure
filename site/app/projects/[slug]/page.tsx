import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { MaskImage } from '@/components/ui/MaskImage';
import { AppLink } from '@/components/ui/AppLink';
import { CtaBand } from '@/components/sections/pages/CtaBand';
import { projects } from '@/content/projects';
import { projectImage } from '@/components/projects/project-images';
import { meta } from '@/lib/seo';

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = projects.find((x) => x.slug === slug);
  return p ? meta(`${p.name} - Sunsure Energy`, `/projects/${p.slug}/`) : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i]; const next = projects[(i + 1) % projects.length];
  const img = projectImage[p.image];
  const facts: [string, string][] = [['Capacity', p.capacityLabel], ['Technology', p.technology], ['Status', p.status]];
  if (p.state) facts.push(['State', p.state]);
  if (p.transmission) facts.push(['Transmission', p.transmission]);
  if (p.commissioned) facts.push(['Commissioned', p.commissioned]);
  return (
    <>
      <PageHero eyebrow="Project" lines={[p.name]} crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects/' }, { label: p.name }]} />
      <section className="pg">
        <Container>
          <div className="pg__grid pg__grid--split">
            <div>
              <p className="pg__p pg__p--body">{p.body}</p>
              <dl className="pg__facts">{facts.map(([k, v]) => <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>)}</dl>
              <p className="label" style={{ marginTop: '2rem' }}>Image is representative of Sunsure plants and not specific to this project.</p>
            </div>
            <MaskImage src={img.src} alt={img.alt} ratio="4 / 3" />
          </div>
          <div className="pg__cta"><AppLink href="/projects/" className="tlink">All projects</AppLink><AppLink href={`/projects/${next.slug}/`} className="tlink">Next: {next.name}</AppLink></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
