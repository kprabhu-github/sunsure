import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { buildCable, slice, type CableState } from '@/lib/motion/catenary';
import { hero as cfg, ease } from '@/lib/motion/config';

type Opts = { reduced: boolean; onSlide: (i: number) => void; count: number };

export function initHero(root: HTMLElement, { reduced, onSlide, count }: Opts) {
  const cleanups: Array<() => void> = [];
  const q = <T extends Element>(s: string) => root.querySelector<T>(s)!;
  const qa = <T extends Element>(s: string) => Array.from(root.querySelectorAll<T>(s));

  const clipPath = document.querySelector<SVGPathElement>('#hero-clip path')!;
  const line = q<SVGPathElement>('[data-cable-line]');
  const pulse = q<SVGPathElement>('[data-cable-pulse]');
  const plate = q<HTMLElement>('[data-plate]');
  const slides = qa<HTMLElement>('[data-slide]');
  const imgs = qa<HTMLElement>('[data-img]');
  const pars = qa<HTMLElement>('[data-par]');
  const bars = qa<HTMLElement>('[data-bar] i');
  const lines = (el: Element) => el.querySelectorAll('.mask-line__in');
  const reveals = ['[data-sub]', '[data-cta]', '[data-ctrl]'].map((s) => qa(s)).flat();
  const mqDesk = window.matchMedia('(min-width: 900px)');
  const mqFine = window.matchMedia('(pointer: fine)');

  const sagBase = () => parseFloat(getComputedStyle(root).getPropertyValue('--sag')) || 0.3;
  const state: CableState & { pulse: number } = { sag: sagBase(), centre: 0.5, pluck: 0, reveal: reduced ? 1 : 0, tension: 0, pulse: -1 };

  function render() {
    const c = buildCable(state, cfg.tensionRelief);
    clipPath.setAttribute('d', c.fill);
    line.setAttribute('d', c.line);
    pulse.setAttribute('d', state.pulse >= 0 && state.pulse <= 1.05 ? slice(c.pts, state.pulse - 0.07, state.pulse) : '');
  }

  let current = 0;
  let busy = false;
  let userPaused = false;
  let inView = true;
  let focusPaused = false;
  let timer: gsap.core.Tween | null = null;

  const ctx = gsap.context(() => {
    gsap.set(slides[current].querySelectorAll('.mask-line__in'), { yPercent: 110 });

    function syncTimer() {
      if (!timer) return;
      const run = !reduced && !userPaused && inView && !focusPaused && !busy;
      run ? timer.play() : timer.pause();
    }
    function startTimer() {
      timer?.kill();
      gsap.set(bars, { scaleX: 0 });
      if (reduced || count < 2) { gsap.set(bars[current], { scaleX: 1 }); return; }
      timer = gsap.fromTo(bars[current], { scaleX: 0 }, { scaleX: 1, duration: cfg.slideSeconds, ease: 'none', onComplete: () => go(current + 1) });
      syncTimer();
    }

    function setActive(i: number) {
      slides.forEach((s, n) => { s.classList.toggle('is-active', n === i); s.inert = n !== i; s.setAttribute('aria-hidden', String(n !== i)); });
      imgs.forEach((m, n) => m.classList.toggle('is-active', n === i));
      onSlide(i);
    }

    function go(next: number) {
      next = (next + count) % count;
      if (next === current || busy) return;
      if (reduced) { current = next; setActive(current); startTimer(); return; }
      busy = true; timer?.kill(); gsap.set(bars, { scaleX: 0 });
      const from = current;
      const tl = gsap.timeline({ onComplete: () => { current = next; busy = false; startTimer(); } });
      // pluck the cable
      tl.to(state, { pluck: 1, duration: 0.22, ease: 'power2.out', onUpdate: render }, 0)
        .to(state, { pluck: 0, duration: 1.5, ease: ease.pluck, onUpdate: render }, 0.22)
        .fromTo(state, { pulse: 0 }, { pulse: 1.08, duration: 1.1, ease: 'power2.inOut', onUpdate: render }, 0.05)
        // copy out
        .to(lines(slides[from]), { yPercent: -110, duration: 0.55, ease: 'power3.in', stagger: 0.05 }, 0)
        .to(slides[from].querySelectorAll('[data-sub]'), { autoAlpha: 0, duration: 0.3 }, 0)
        // photo crossfade, incoming settles from a slight push
        .set(imgs[next], { opacity: 0, zIndex: 2 }, 0)
        .to(imgs[next], { opacity: 1, duration: 1.1, ease: 'power2.inOut' }, 0.1)
        .fromTo(pars[next], { scale: 1.08 }, { scale: 1, duration: 1.8, ease: ease.out }, 0.1)
        .add(() => { setActive(next); gsap.set(imgs[from], { opacity: 0 }); gsap.set(imgs[next], { zIndex: 1, clearProps: 'opacity' }); }, 0.75)
        .set(slides[next].querySelectorAll('.mask-line__in'), { yPercent: 110 }, 0.7)
        .fromTo(slides[next].querySelectorAll('.mask-line__in'), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: ease.out, stagger: 0.07 }, 0.8)
        .fromTo(slides[next].querySelectorAll('[data-sub]'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: ease.out }, 1.0);
    }

    setActive(0);
    render();

    // ---- intro ----
    if (reduced) {
      gsap.set(lines(slides[0]), { yPercent: 0 });
      root.dataset.state = 'ready';
      render();
      startTimer();
    } else {
      gsap.set(lines(slides[0]), { yPercent: 110 });
      gsap.set(reveals, { autoAlpha: 0, y: 16 });
      gsap.set([plate, q('[data-cable]')], { opacity: 1 });
      gsap.set(pars[0], { scale: 1.12 });
      root.dataset.state = 'ready';
      const intro = gsap.timeline({ defaults: { ease: ease.out }, onComplete: () => { state.pulse = -1; render(); startTimer(); armScroll(); } });
      intro
        .to(state, { reveal: 1, duration: cfg.introCurtain, ease: ease.inOut, onUpdate: render }, 0)
        .to(pars[0], { scale: 1, duration: 2.4 }, 0)
        .to(lines(slides[0]), { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.55)
        .fromTo(state, { pulse: 0 }, { pulse: 1.08, duration: 1.4, ease: 'power2.inOut', onUpdate: render }, 0.9)
        .to(reveals, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 1.0);
    }

    // ---- scroll: cable tightens, photo drifts. No pinning, no scroll hijack. ----
    function armScroll() {
      if (reduced) return;
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 } })
        .to(state, { tension: 1, ease: 'none', onUpdate: render }, 0)
        .to(pars, { yPercent: 7, ease: 'none' }, 0);
    }

    // ---- pointer: low point follows the cursor within a narrow band (desktop, fine pointer only) ----
    if (!reduced && mqFine.matches && mqDesk.matches) {
      const to = gsap.quickTo(state, 'centre', { duration: 1.1, ease: 'power3', onUpdate: render });
      const [lo, hi] = cfg.centreRange;
      const onMove = (e: PointerEvent) => to(lo + (hi - lo) * (e.clientX / window.innerWidth));
      const onLeave = () => to(0.5);
      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerleave', onLeave);
      cleanups.push(() => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); });
    }

    // ---- controls ----
    const on = (sel: string, fn: () => void) => { const el = root.querySelector(sel); if (!el) return; el.addEventListener('click', fn); cleanups.push(() => el.removeEventListener('click', fn)); };
    on('[data-prev]', () => go(current - 1));
    on('[data-next]', () => go(current + 1));
    const pauseBtn = root.querySelector<HTMLButtonElement>('[data-pause]');
    const setPauseUI = () => { if (!pauseBtn) return; const p = userPaused || reduced; pauseBtn.setAttribute('aria-pressed', String(p)); pauseBtn.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow'); pauseBtn.dataset.paused = String(p); const ic = pauseBtn.querySelector('svg'); if (ic) ic.innerHTML = p ? '<path d="M5 3l10 6-10 6z"/>' : '<rect x="4" y="3" width="3.2" height="12"/><rect x="10.8" y="3" width="3.2" height="12"/>'; };
    on('[data-pause]', () => { userPaused = !userPaused; setPauseUI(); syncTimer(); });
    setPauseUI();

    const fin = () => { focusPaused = true; syncTimer(); };
    const fout = (e: FocusEvent) => { if (!root.contains(e.relatedTarget as Node)) { focusPaused = false; syncTimer(); } };
    root.addEventListener('focusin', fin); root.addEventListener('focusout', fout);
    cleanups.push(() => { root.removeEventListener('focusin', fin); root.removeEventListener('focusout', fout); });

    const io = new IntersectionObserver(([en]) => { inView = en.isIntersecting; syncTimer(); }, { threshold: 0.3 });
    io.observe(root); cleanups.push(() => io.disconnect());

    // Keep sag in sync with the breakpoint
    const onResize = () => { state.sag = sagBase(); render(); };
    window.addEventListener('resize', onResize); cleanups.push(() => window.removeEventListener('resize', onResize));
  }, root);

  return () => { cleanups.forEach((f) => f()); cleanups.length = 0; ctx.revert(); ScrollTrigger.refresh(); };
}
