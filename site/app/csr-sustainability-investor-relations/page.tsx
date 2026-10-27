import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { investors } from '@/content/investors';
import { investorStats } from '@/content/stats';
import { CtaBand } from '@/components/sections/pages/CtaBand';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.csr, '/csr-sustainability-investor-relations/');
export default function Page() {
  return (
    <>
      <PageHero eyebrow={investors.eyebrow} lines={investors.csrHeading} crumbs={[{ label: 'Home', href: '/' }, { label: 'CSR, Sustainability, Investor Relations' }]} />
      <section className="pg" aria-labelledby="pg-h">
        <Container>
          <h2 id="pg-h" className="pg__h2">{investors.name}</h2>
          <dl className="pg__cols pg__cols--4">
            {investorStats.map((s) => <div key={s.label} className="pg__card"><dd style={{ margin: 0 }}><CountUp value={s.value} suffix={s.suffix} className="pg__big" /></dd><dt>{s.label}</dt></div>)}
          </dl>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
