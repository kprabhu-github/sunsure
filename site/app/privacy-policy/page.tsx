import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { legalIntro, legalSections } from '@/content/legal';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.privacy, '/privacy-policy/');
export default function Page() {
  return (
    <>
      <PageHero eyebrow={legalIntro.effective} lines={['Privacy Policy']} lead={legalIntro.lead} crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <section className="pg"><Container>
        <div className="legal">
          <nav aria-label="Policy sections"><ul>{legalSections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ul></nav>
          <div>{legalSections.map((s) => <section key={s.id} id={s.id}><h2>{s.title}</h2>{s.blocks.map((b, i) => <p key={i}>{b}</p>)}</section>)}</div>
        </div>
      </Container></section>
    </>
  );
}
