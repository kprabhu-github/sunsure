'use client';
import Image from 'next/image';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AppLink } from '@/components/ui/AppLink';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Flip, gsap, registerGsap } from '@/lib/motion/gsap';
import { projects as allProjects, projectsPage, type Project } from '@/content/projects';
import { projectImage } from './project-images';
import './projects.css';

type GroupKey = 'state' | 'technology' | 'transmission' | 'status' | 'capacity';
const LABEL: Record<GroupKey, string> = { state: 'State', technology: 'Technology', transmission: 'Power transmission', status: 'Project status', capacity: 'Capacity (MWp)' };

const inBand = (mwp: number, band: string) => { if (band.endsWith('+')) return mwp >= parseFloat(band); const [a, b] = band.split('-').map(Number); return mwp >= a && mwp < b; };
const valueOf = (p: Project, g: GroupKey): string | undefined => (g === 'capacity' ? undefined : (p[g] as string | undefined));
const matches = (p: Project, sel: Record<GroupKey, string[]>) =>
  (Object.keys(sel) as GroupKey[]).every((g) => !sel[g].length || (g === 'capacity' ? sel[g].some((b) => inBand(p.mwp, b)) : sel[g].includes(valueOf(p, g) ?? '')));
const hasValue = (g: GroupKey, opt: string) => allProjects.some((p) => (g === 'capacity' ? inBand(p.mwp, opt) : valueOf(p, g) === opt));

export function ProjectExplorer({ groups = ['state', 'technology', 'status'], limit }: { groups?: GroupKey[]; limit?: number }) {
  const reduced = useReducedMotion();
  const [sel, setSel] = useState<Record<GroupKey, string[]>>({ state: [], technology: [], transmission: [], status: [], capacity: [] });
  const list = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [hover, setHover] = useState<Project | null>(null);

  const visible = useMemo(() => allProjects.filter((p) => matches(p, sel)), [sel]);
  const shown = new Set((limit && !Object.values(sel).some((a) => a.length) ? visible.slice(0, limit) : visible).map((p) => p.slug));
  const anyFilter = Object.values(sel).some((a) => a.length);

  const toggle = (g: GroupKey, opt: string) => {
    if (!reduced && list.current) { registerGsap(); flip.current = Flip.getState(list.current.querySelectorAll('[data-flip]')); }
    setSel((s) => ({ ...s, [g]: s[g].includes(opt) ? s[g].filter((x) => x !== opt) : [...s[g], opt] }));
  };
  const reset = () => { if (!reduced && list.current) { registerGsap(); flip.current = Flip.getState(list.current.querySelectorAll('[data-flip]')); } setSel({ state: [], technology: [], transmission: [], status: [], capacity: [] }); };

  useLayoutEffect(() => {
    const st = flip.current; if (!st) return; flip.current = null;
    Flip.from(st, { duration: 0.7, ease: 'expo.inOut', stagger: 0.03, absolute: false, onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }), onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }) });
  }, [sel]);

  // cursor-following image preview (fine pointers only)
  const move = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = preview.current; if (!el || e.pointerType !== 'mouse' || reduced) return;
    registerGsap();
    if (!move.current) move.current = { x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' }) };
    move.current.x(e.clientX + 28); move.current.y(e.clientY - 120);
  };
  const enter = (p: Project, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    setHover(p);
    if (!reduced && preview.current) gsap.to(preview.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'expo.out', overwrite: true });
  };
  const leave = () => { setHover(null); if (!reduced && preview.current) gsap.to(preview.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.35, ease: 'power2.in', overwrite: true }); };

  return (
    <div className="pe" onPointerMove={onMove}>
      <div className="pe__filters" role="group" aria-label="Browse by filters">
        {groups.map((g) => (
          <fieldset key={g} className="pe__group">
            <legend className="label">{LABEL[g]}</legend>
            <div className="pe__chips">
              {projectsPage.filters[g].map((opt) => {
                const on = sel[g].includes(opt); const has = hasValue(g, opt);
                return (
                  <button key={opt} type="button" className="pe__chip" aria-pressed={on} disabled={!has} onClick={() => toggle(g, opt)} title={has ? undefined : 'No listed projects'}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
        <button type="button" className="tlink pe__reset" onClick={reset} disabled={!anyFilter}>Reset Filters</button>
      </div>

      <p className="label pe__count" role="status" aria-live="polite">{[...shown].filter((s) => visible.some((v) => v.slug === s)).length} of {allProjects.length} listed projects</p>

      <ul ref={list} className="pe__list">
        {allProjects.map((p, i) => {
          const hidden = !visible.includes(p) || !shown.has(p.slug);
          const img = projectImage[p.image];
          return (
            <li key={p.slug} data-flip data-flip-id={p.slug} hidden={hidden} className="pe__row">
              <AppLink href={`/projects/${p.slug}/`} className="pe__link" onPointerEnter={(e) => enter(p, e)} onPointerLeave={leave} onFocus={() => setHover(p)} onBlur={() => setHover(null)}>
                <span className="pe__thumb" aria-hidden="true"><Image src={img.src} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} /></span>
                <span className="pe__idx label">{String(i + 1).padStart(2, '0')}</span>
                <span className="pe__name">{p.name}</span>
                <span className="pe__cap">{p.capacityLabel}</span>
                <span className="pe__meta label">{[p.state, p.technology, p.commissioned && `Commissioned ${p.commissioned}`].filter(Boolean).join(' · ')}</span>
              </AppLink>
            </li>
          );
        })}
      </ul>

      <div ref={preview} className="pe__preview" aria-hidden="true">
        {hover && <Image src={projectImage[hover.image].src} alt="" fill sizes="320px" style={{ objectFit: 'cover' }} />}
      </div>
    </div>
  );
}
