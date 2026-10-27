import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { ProjectExplorer } from '@/components/projects/ProjectExplorer';
import { CtaBand } from '@/components/sections/pages/CtaBand';
import { projectsPage } from '@/content/projects';
import { meta, titles } from '@/lib/seo';

export const metadata = meta(titles.projects, '/projects/');

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow={projectsPage.presenceEyebrow} lines={[projectsPage.presenceHeading]} lead={projectsPage.lead} crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
      <section className="pg">
        <Container>
          <p className="pg__p pg__p--body">{projectsPage.body}</p>
          <div className="pg__facts">
            {projectsPage.stats.map((s) => <div key={s.label}><dd style={{ margin: 0 }}><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} className="pg__big" /></dd><dt className="label">{s.label}</dt></div>)}
          </div>
        </Container>
      </section>
      <section className="pg pg--alt" aria-labelledby="pl-h">
        <Container>
          <h2 id="pl-h" className="pg__h2">{projectsPage.listHeading}</h2>
          <ProjectExplorer groups={['state', 'technology', 'status']} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
