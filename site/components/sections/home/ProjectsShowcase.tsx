import { AppLink } from '@/components/ui/AppLink';
import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { ProjectExplorer } from '@/components/projects/ProjectExplorer';
import { projectsPage } from '@/content/projects';
import './showcase.css';

export function ProjectsShowcase() {
  return (
    <section className="ps" aria-labelledby="ps-h">
      <Container>
        <div className="ps__head">
          <div>
            <p className="label eyebrow">{projectsPage.presenceEyebrow}</p>
            <RevealHeading id="ps-h" className="ps__h" lines={['Our Pan India', 'Presence']} />
          </div>
          <div className="ps__side">
            <p className="ps__lead">{projectsPage.lead}</p>
            <ul className="ps__stats">
              {projectsPage.stats.map((s) => (
                <li key={s.label}><span className="ps__sn"><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} /></span><span className="label">{s.label}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="label ps__sub">COMMISSIONED PROJECTS — {projectsPage.listHeading}</p>
        <ProjectExplorer groups={['state', 'technology']} limit={6} />
        <p className="ps__more"><AppLink href="/projects/" className="tlink">See all Projects</AppLink></p>
      </Container>
    </section>
  );
}
