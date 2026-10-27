import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { ContentGrid } from '@/components/content/ContentGrid';
import { AppLink } from '@/components/ui/AppLink';
import { blogs, webinars, media } from '@/content/knowledge';
import { meta, titles } from '@/lib/seo';
export const metadata = meta(titles.knowledge, '/knowledge-hub/');
const groups = [{ t: 'Blogs', h: '/blogs/', e: blogs }, { t: 'Webinars', h: '/webinars/', e: webinars }, { t: 'Media', h: '/media/', e: media }];
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Knowledge Hub" lines={['Knowledge Hub']} crumbs={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub' }]} />
      {groups.map((g, i) => (
        <section key={g.t} className={`pg${i % 2 ? ' pg--alt' : ''}`} aria-labelledby={`kh-${g.t}`}>
          <Container>
            <h2 id={`kh-${g.t}`} className="pg__h2">{g.t}</h2>
            <ContentGrid entries={g.e} label={g.t} />
            <div className="pg__cta"><AppLink href={g.h} className="tlink">All {g.t.toLowerCase()}</AppLink></div>
          </Container>
        </section>
      ))}
    </>
  );
}
