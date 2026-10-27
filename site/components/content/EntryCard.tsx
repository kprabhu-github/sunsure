import type { Entry } from '@/content/knowledge';

/** Editorial typographic card. External links keep the original article URLs on the live site. */
export function EntryCard({ entry, size = 'md' }: { entry: Entry; size?: 'lg' | 'md' }) {
  const d = new Date(entry.date);
  const ok = !Number.isNaN(d.getTime());
  return (
    <a href={entry.href} className={`ec ec--${size}`} rel="noopener">
      <span className="ec__date" aria-hidden="true">
        <span className="ec__day">{ok ? d.getDate() : ''}</span>
        <span className="label">{ok ? d.toLocaleString('en-US', { month: 'short', year: 'numeric' }) : ''}</span>
      </span>
      <span className="ec__body">
        <span className="label ec__kind">{entry.kind}{entry.readTime ? ` · ${entry.readTime}` : ''}</span>
        <span className="ec__title">{entry.title}</span>
        {entry.excerpt && <span className="ec__ex">{entry.excerpt}</span>}
        <span className="ec__go">Read on sunsure-energy.com <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2 10L10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg></span>
      </span>
      <span className="sr-only"> ({entry.date})</span>
    </a>
  );
}
