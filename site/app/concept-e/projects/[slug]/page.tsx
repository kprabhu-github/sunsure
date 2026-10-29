import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Ch, H, Cta, B } from '@/components/concepts/e/parts';
import { PgTheme, PgHead } from '@/components/concepts/e/pg';
import { IndiaMap } from '@/components/concepts/e/client';
import { projects } from '@/content/projects';
import { projectImage } from '@/components/projects/project-images';
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const i = projects.findIndex((x) => x.slug === slug); if (i < 0) notFound();
  const p = projects[i], next = projects[(i + 1) % projects.length], img = projectImage[p.image];
  const facts: [string, string][] = [['Capacity', p.capacityLabel], ['Technology', p.technology], ['Status', p.status]];
  if (p.state) facts.push(['State', p.state]);
  if (p.transmission) facts.push(['Transmission', p.transmission]);
  if (p.commissioned) facts.push(['Commissioned', p.commissioned]);
  const onMap = ['dhule', 'solapur-1', 'erach-solar', 'augasi-solar', 'pailani-solar', 'pailani-2', 'gursarai-solar', 'panwari-solar', 'pinahat-solar', 'kabrai-solar'].includes(p.slug);
  return (
    <>
      <PgTheme name="pdetail" solid />
      <PgHead img={img.src} eyebrow={p.state ?? p.technology} lines={[p.name]} sub={p.capacityLabel + ' · ' + p.technology} crumbs={[{ label: 'Projects', href: `${B}/projects/` }, { label: p.name }]} />
      <Ch t={9} name="Morning" label="Plant">
        <div className="wrap two" style={{ alignItems: 'start' }}>
          <div><span className="eyebrow">About the plant</span><H lines={[p.name]} /><p className="copy rv" style={{ marginTop: 18 }}>{p.body}</p>
            <dl className="facts">{facts.map(([k, v]) => <div key={k} className="rv"><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
          <div className="photo rv"><img src={img.src} alt={img.alt} /></div>
        </div>
      </Ch>
      {onMap && <Ch t={12} name="Noon" label="Location"><div className="wrap"><span className="eyebrow">Where it is</span><H lines={['On the map']} /><div style={{ marginTop: 36 }}><IndiaMap focus={p.slug} interactive={false} /></div></div></Ch>}
      <Cta t={18.5} />
      <div className="wrap nextp" style={{ paddingBottom: 60, position: 'relative' }}><Link className="link" href={`${B}/projects/`}>All projects</Link><Link className="link" href={`${B}/projects/${next.slug}/`}>Next: {next.name}</Link></div>
    </>
  );
}
