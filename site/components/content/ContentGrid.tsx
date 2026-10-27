import type { Entry } from '@/content/knowledge';
import { EntryCard } from './EntryCard';
import './content.css';

export function ContentGrid({ entries, label }: { entries: Entry[]; label: string }) {
  return (
    <ul className="cg" aria-label={label}>
      {entries.map((e, i) => <li key={e.href} className={i === 0 ? 'cg__first' : ''}><EntryCard entry={e} size={i === 0 ? 'lg' : 'md'} /></li>)}
    </ul>
  );
}
