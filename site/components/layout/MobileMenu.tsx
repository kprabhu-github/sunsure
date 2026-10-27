'use client';
import { useEffect, useRef, useState } from 'react';
import { AppLink } from '@/components/ui/AppLink';
import { Button } from '@/components/ui/Button';
import { navItems, headerCta, type NavLink } from '@/content/navigation';
import { gsap } from '@/lib/motion/gsap';

type Props = { open: boolean; onClose: () => void; reduced: boolean };

function linksOf(item: (typeof navItems)[number]): { top?: NavLink; groups: { head?: NavLink; items: NavLink[] }[] } {
  if ('groups' in item) return { top: { label: `All ${item.label}`, href: item.href }, groups: item.groups.map((g) => ({ head: { label: g.label, href: g.href }, items: g.items })) };
  if ('links' in item) return { groups: [{ items: item.links }] };
  return { groups: [] };
}

export function MobileMenu({ open, onClose, reduced }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Scroll lock, focus trap, Esc, entrance
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!open) { el.hidden = true; return; }
    el.hidden = false;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';

    const focusables = () => Array.from(el.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')).filter((n) => n.offsetParent !== null);
    const first = el.querySelector<HTMLElement>('[data-close]');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey);

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.out' });
      gsap.fromTo('[data-mm-item]', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05, delay: 0.15 });
      gsap.fromTo('[data-mm-line]', { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'expo.inOut', delay: 0.1 });
    }, el);

    return () => { document.removeEventListener('keydown', onKey); html.style.overflow = prev; ctx.revert(); };
  }, [open, onClose, reduced]);

  return (
    <div ref={ref} id="mobile-menu" className="mm" role="dialog" aria-modal="true" aria-label="Site menu" hidden>
      <div className="mm__bar">
        <span className="label">Menu</span>
        <button type="button" className="mm__close" data-close onClick={onClose} aria-label="Close menu">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.8" /></svg>
        </button>
      </div>
      <nav className="mm__nav" aria-label="Primary mobile">
        <span className="mm__line" data-mm-line aria-hidden="true" />
        <ul>
          {navItems.map((item, i) => {
            const { top, groups } = linksOf(item);
            const has = groups.length > 0;
            const isOpen = expanded === item.id;
            return (
              <li key={item.id} data-mm-item className="mm__item">
                <div className="mm__row">
                  <span className="mm__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {has ? (
                    <button type="button" className="mm__top" aria-expanded={isOpen} aria-controls={`mm-${item.id}`} onClick={() => setExpanded(isOpen ? null : item.id)}>
                      {item.label}
                      <span className={`mm__plus ${isOpen ? 'is-open' : ''}`} aria-hidden="true" />
                    </button>
                  ) : (
                    <AppLink className="mm__top" href={(item as { href: string }).href} onClick={onClose}>{item.label}</AppLink>
                  )}
                </div>
                {has && (
                  <div id={`mm-${item.id}`} className="mm__sub" hidden={!isOpen}>
                    {top && <AppLink href={top.href} onClick={onClose} className="mm__sublink mm__sublink--all">{top.label}</AppLink>}
                    {groups.map((g, gi) => (
                      <div key={gi} className="mm__group">
                        {g.head && <AppLink href={g.head.href} onClick={onClose} className="mm__ghead">{g.head.label}</AppLink>}
                        {g.items.map((l) => <AppLink key={l.href} href={l.href} onClick={onClose} className="mm__sublink">{l.label}</AppLink>)}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div data-mm-item className="mm__cta"><Button href={headerCta.href}>{headerCta.label}</Button></div>
      </nav>
    </div>
  );
}
