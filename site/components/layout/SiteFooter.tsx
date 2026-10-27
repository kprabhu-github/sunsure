import { AppLink } from '@/components/ui/AppLink';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';
import { company, footerLinks } from '@/content/site';
import './footer.css';

export function SiteFooter() {
  return (
    <footer className="sf">
      <Container>
        <div className="sf__top">
          <div className="sf__brand">
            <Logo />
            <address className="sf__addr">{company.headOffice}</address>
            <p className="sf__contact"><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.marketingEmail}`}>{company.marketingEmail}</a></p>
          </div>
          <nav aria-label="Footer"><ul className="sf__links">{footerLinks.map((l) => <li key={l.href}><AppLink href={l.href}>{l.label}</AppLink></li>)}</ul></nav>
        </div>
        <p className="sf__big" aria-hidden="true">Making India’s Power Move</p>
        <p className="sf__legal">© Sunsure Energy. All rights Reserved.</p>
      </Container>
    </footer>
  );
}
