'use client';
import { useRef, type ReactNode } from 'react';

export type TabItem = { id: string; label: ReactNode };
type Props = { items: TabItem[]; value: string; onChange: (id: string) => void; prefix: string; label: string; orientation?: 'horizontal' | 'vertical'; className?: string; tabClassName?: string };

/** WAI-ARIA tabs (automatic activation): roving tabindex, arrows/Home/End. Pair with an element carrying id `${prefix}-panel`. */
export function TabList({ items, value, onChange, prefix, label, orientation = 'horizontal', className = '', tabClassName = '' }: Props) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const onKey = (e: React.KeyboardEvent) => {
    const i = items.findIndex((t) => t.id === value);
    const next = orientation === 'vertical' ? ['ArrowDown', 'ArrowUp'] : ['ArrowRight', 'ArrowLeft'];
    let n = -1;
    if (e.key === next[0]) n = (i + 1) % items.length;
    else if (e.key === next[1]) n = (i - 1 + items.length) % items.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = items.length - 1;
    if (n < 0) return;
    e.preventDefault();
    onChange(items[n].id);
    refs.current[items[n].id]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} aria-orientation={orientation} className={className} onKeyDown={onKey}>
      {items.map((t) => (
        <button
          key={t.id} type="button" role="tab" id={`${prefix}-tab-${t.id}`} aria-selected={t.id === value} aria-controls={`${prefix}-panel`}
          tabIndex={t.id === value ? 0 : -1} className={tabClassName} ref={(el) => { refs.current[t.id] = el; }} onClick={() => onChange(t.id)}
        >{t.label}</button>
      ))}
    </div>
  );
}
