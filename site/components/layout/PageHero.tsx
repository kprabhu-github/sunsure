import { Container } from '@/components/ui/Container';
import { AppLink } from '@/components/ui/AppLink';
import './page.css';

type Crumb = { label: string; href?: string };
/** Inner-page hero. CSS-only line rise (no flash), crumbs for orientation. */
export function PageHero({ eyebrow, lines, lead, crumbs }: { eyebrow?: string; lines: readonly string[]; lead?: string; crumbs?: Crumb[] }) {
  return (
    <section className="ph">
      <Container>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="ph__crumbs">
            <ol>{crumbs.map((c, i) => <li key={c.label}>{c.href ? <AppLink href={c.href}>{c.label}</AppLink> : <span aria-current="page">{c.label}</span>}{i < crumbs.length - 1 && <span aria-hidden="true"> / </span>}</li>)}</ol>
          </nav>
        )}
        {eyebrow && <p className="label eyebrow">{eyebrow}</p>}
        <h1 className="ph__h rise">{lines.map((l) => <span key={l} className="mask-line"><span className="mask-line__in">{l}</span></span>)}</h1>
        {lead && <p className="ph__lead">{lead}</p>}
      </Container>
    </section>
  );
}
