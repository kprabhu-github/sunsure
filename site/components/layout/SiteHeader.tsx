'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppLink } from '@/components/ui/AppLink';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { navItems, headerCta } from '@/content/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/motion/gsap';
import './header.css';

export function SiteHeader() {
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const last = useRef(0);

  const clear = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };
  const later = (fn: () => void, ms: number) => { clear(); timer.current = setTimeout(fn, ms); };
  const closeMenu = useCallback(() => setMenu(false), []);

  // Scroll: solid after 8px; hide on scroll down, reveal on scroll up (never while a panel/menu is open)
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 8);
        const dy = y - last.current;
        if (Math.abs(dy) > 6) setHidden(y > 160 && dy > 0);
        last.current = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Panel enter/leave
  useEffect(() => {
    const root = headerRef.current;
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
    panels.forEach((p) => {
      const on = p.dataset.panel === openId;
      if (on && p.hidden) {
        p.hidden = false;
        if (!reduced) {
          gsap.fromTo(p, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out' });
          gsap.fromTo(p.querySelectorAll('[data-p-item]'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out', stagger: 0.04, delay: 0.08 });
          gsap.fromTo(p.querySelector('[data-p-line]'), { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'expo.inOut' });
        }
      } else if (!on && !p.hidden) {
        gsap.killTweensOf([p, ...p.querySelectorAll('[data-p-item],[data-p-line]')]);
        p.hidden = true;
      }
    });
  }, [openId, reduced]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && openId) {
      const id = openId;
      setOpenId(null);
      triggers.current[id]?.focus();
    }
  };
  const onBlur = (e: React.FocusEvent) => {
    if (!headerRef.current?.contains(e.relatedTarget as Node)) setOpenId(null);
  };

  const hide = hidden && !openId && !menu;

  return (
    <header
      ref={headerRef}
      className={`sh ${solid || openId ? 'is-solid' : ''} ${hide ? 'is-hidden' : ''}`}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') later(() => setOpenId(null), 180); }}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') clear(); }}
    >
      <div className="sh__bar">
        <Logo />
        <nav className="sh__nav" aria-label="Primary">
          <ul>
            {navItems.map((item) => {
              const expandable = 'links' in item || 'groups' in item;
              const isOpen = openId === item.id;
              return (
                <li
                  key={item.id}
                  onPointerEnter={(e) => { if (e.pointerType === 'mouse') later(() => setOpenId(expandable ? item.id : null), 90); }}
                >
                  {expandable ? (
                    <button
                      type="button"
                      ref={(el) => { triggers.current[item.id] = el; }}
                      className="sh__link"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${item.id}`}
                      onClick={() => { clear(); setOpenId(isOpen ? null : item.id); }}
                    >
                      {item.label}
                      <span className="sh__chev" aria-hidden="true" />
                    </button>
                  ) : (
                    <AppLink className="sh__link" href={(item as { href: string }).href}>{item.label}</AppLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="sh__actions">
          <Button href={headerCta.href} size="sm" arrow={false} className="sh__cta">{headerCta.label}</Button>
          <button type="button" className="sh__burger" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => { setOpenId(null); setMenu(true); }}>
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true" className="sh__burger-lines" />
          </button>
        </div>
      </div>

      {navItems.map((item, idx) => {
        if (!('links' in item) && !('groups' in item)) return null;
        return (
          <div key={item.id} id={`panel-${item.id}`} className="sp" data-panel={item.id} hidden role="group" aria-label={`${item.label} menu`}>
            <div className="sp__inner">
              <div className="sp__head" data-p-item>
                <span className="label">{String(idx + 1).padStart(2, '0')}</span>
                <p className="sp__title">{item.label}</p>
              </div>
              <div className="sp__body">
                <span className="sp__line" data-p-line aria-hidden="true" />
                {'groups' in item ? (
                  <>
                    <AppLink data-p-item className="sp__all" href={item.href}>All {item.label}</AppLink>
                    <div className="sp__groups">
                      {item.groups.map((g) => (
                        <div key={g.href} data-p-item>
                          <AppLink className="sp__ghead" href={g.href}>{g.label}</AppLink>
                          <ul>{g.items.map((l) => <li key={l.href}><AppLink className="sp__link" href={l.href}>{l.label}</AppLink></li>)}</ul>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <ul className="sp__list">
                    {item.links.map((l) => <li key={l.href} data-p-item><AppLink className="sp__link sp__link--lg" href={l.href}>{l.label}</AppLink></li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <MobileMenu open={menu} onClose={closeMenu} reduced={reduced} />
    </header>
  );
}
