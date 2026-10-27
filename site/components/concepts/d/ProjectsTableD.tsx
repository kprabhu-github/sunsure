'use client';
import { useState } from 'react';
import Link from 'next/link';
import { projects, projectsPage } from '../shared/data';

const tabs = ['All', 'Maharashtra', 'Uttar Pradesh', 'Ground Mounted'] as const;
type Tab = (typeof tabs)[number];
const max = Math.max(...projects.map((p) => p.mwp));

export function ProjectsTableD() {
  const [tab, setTab] = useState<Tab>('All');
  const rows = projects.filter((p) => tab === 'All' || p.state === tab || p.technology === tab);
  const total = rows.reduce((s, p) => s + p.mwp, 0);
  return (
    <div className="cd-pt">
      <div className="cd-pt__bar">
        <div role="group" aria-label="Filter projects" className="cd-pt__tabs">
          {tabs.map((t) => <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        <p className="cd-pt__sum"><b>{rows.length}</b> projects · <b>{Math.round(total * 10) / 10} MWp</b> listed</p>
      </div>
      <div className="cd-pt__scroll">
        <table>
          <caption className="cd-pt__cap">Commissioned projects, as published on the Sunsure website</caption>
          <thead><tr><th scope="col">Project</th><th scope="col">Location</th><th scope="col">Type</th><th scope="col">Commissioned</th><th scope="col" className="cd-pt__cc">Capacity</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.slug}>
                <th scope="row"><Link href="/projects/">{p.name}</Link></th>
                <td>{p.state ?? p.transmission ?? '—'}</td>
                <td>{p.technology}</td>
                <td>{p.commissioned ?? '—'}</td>
                <td className="cd-pt__cc"><div className="cd-pt__cell"><span className="cd-pt__bg" aria-hidden="true"><i style={{ width: `${(p.mwp / max) * 100}%` }} /></span><b>{p.capacityLabel}</b></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="cd-pt__foot">{projectsPage.stats[1].value}+ MW commissioned across Sunsure’s portfolio. <Link href="/projects/">View all projects →</Link></p>
    </div>
  );
}
