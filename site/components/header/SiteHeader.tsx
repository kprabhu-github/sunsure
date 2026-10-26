import './site-header.css';

/** Nav labels/links audited from the live site. Placeholder styling — real header is its own section. */
const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Careers', href: '/careers-hiring/' },
  { label: 'Knowledge Hub', href: '/knowledge-hub/' },
];

export default function SiteHeader() {
  return (
    <header className="site-head">
      <a className="brand" href="/" aria-label="Sunsure Energy, home">
        <svg className="brand__mark" viewBox="0 0 53 50" aria-hidden="true">
          <path d="M38.9 1.4H19.4L.6 31.4l18.2-.2A9.9 9.9 0 0 1 29.5 16Z" />
          <path d="M38.9 1.4H19.4L.6 31.4l18.2-.2A9.9 9.9 0 0 1 29.5 16Z" transform="rotate(180 26.5 25.1)" />
        </svg>
        <span className="brand__word">Sunsure</span>
      </a>
      <nav className="site-nav" aria-label="Primary">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <a className="head-cta" href="/contact/">Contact Us</a>
    </header>
  );
}
