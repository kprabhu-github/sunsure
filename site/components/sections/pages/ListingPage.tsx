import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { ContentGrid } from '@/components/content/ContentGrid';
import type { Entry } from '@/content/knowledge';

/** Shared template for /blogs/, /webinars/ and /media/. */
export function ListingPage({ eyebrow, title, entries, note }: { eyebrow: string; title: string; entries: Entry[]; note?: string }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} lines={[title]} crumbs={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: title }]} />
      <section className="pg">
        <Container>
          <ContentGrid entries={entries} label={title} />
          {note && <p className="label" style={{ marginTop: '2rem' }}>{note}</p>}
        </Container>
      </section>
    </>
  );
}
