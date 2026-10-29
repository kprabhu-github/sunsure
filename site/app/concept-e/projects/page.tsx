import Link from 'next/link';
import { Ch, H, Cta, B } from '@/components/concepts/e/parts';
import { PgTheme, PlantsExplorer, PlantTable } from '@/components/concepts/e/pg';
import { projectsPage } from '@/content/projects';
export const metadata = { title: 'Projects | Concept E' };
export default function Page() {
  const p = projectsPage;
  return (
    <>
      <PgTheme name="projects" solid light />
      <PlantsExplorer>
        <nav className="crumbs" aria-label="Breadcrumb"><Link href={`${B}/`}>Home</Link><span>Projects</span></nav>
        <span className="eyebrow">{p.presenceEyebrow}</span>
        <h1 className="pgp-h"><span className="ln"><span style={{ ['--i' as string]: 0 }}>Our Pan India</span></span><span className="ln"><span style={{ ['--i' as string]: 1 }}>Presence</span></span></h1>
        <p className="pgp-p">{p.lead}</p>
      </PlantsExplorer>
      <Ch t={16} name="Afternoon" label="All plants" id="all" className="pgp-all">
        <div className="wrap">
          <span className="eyebrow">Portfolio</span>
          <H lines={[p.listHeading]} />
          <p className="copy rv" style={{ margin: '16px 0 34px' }}>{p.body}</p>
          <PlantTable />
        </div>
      </Ch>
      <Cta heading={["Turn your business'", 'power struggle into', 'a power move']} body={p.cta.body} t={21} />
    </>
  );
}
