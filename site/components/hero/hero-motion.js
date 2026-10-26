/* ==========================================================================
   Hero motion — framework-agnostic. Used verbatim by the Next.js <Hero/> and
   the standalone preview, so what you review is what ships.
   Dependencies are injected: initHero(el, { gsap, ScrollTrigger }) -> destroy()
   ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SunsureHero = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SLIDE_SECONDS = 7;

  function initHero(hero, deps) {
    var gsap = deps && deps.gsap;
    var ScrollTrigger = deps && deps.ScrollTrigger;
    if (!hero || !gsap || !ScrollTrigger) return function () {};
    gsap.registerPlugin(ScrollTrigger);

    var qa = function (s) { return Array.prototype.slice.call(hero.querySelectorAll(s)); };
    var q = function (s) { return hero.querySelector(s); };

    var slides = qa('[data-slide]');
    var imgs = qa('[data-img]');
    var bars = qa('[data-bar] > i');
    var imgsWrap = q('[data-imgs]');
    var tick = qa('[data-tick]');
    var cta = q('[data-cta]');
    var ctrl = q('[data-ctrl]');
    var cue = q('[data-cue]');
    var counter = q('[data-current]');
    var live = q('[data-live]');
    var btnPrev = q('[data-prev]');
    var btnNext = q('[data-next]');
    var btnPause = q('[data-pause]');
    var lines = function (el) { return el.querySelectorAll('.ln__in'); };

    var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mqFine = window.matchMedia('(pointer: fine)');
    var current = 0, busy = false, userPaused = false, inView = true, focusPaused = false;
    var reduced = false, timer = null, introTl = null, slideTl = null, mm = null, armed = false;
    var io = null, destroyed = false;

    /* ---------- state helpers ---------- */
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function setActive(i) {
      slides.forEach(function (s, n) {
        var on = n === i;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
        s.inert = !on;
      });
      imgs.forEach(function (el, n) { el.setAttribute('aria-hidden', n === i ? 'false' : 'true'); });
      if (counter) counter.textContent = pad(i + 1);
    }

    function announce(i) {
      if (live) live.textContent = 'Slide ' + (i + 1) + ' of ' + slides.length;
    }

    function updatePauseUI() {
      if (!btnPause) return;
      var paused = userPaused || reduced;
      btnPause.setAttribute('aria-pressed', paused ? 'true' : 'false');
      btnPause.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    }

    /* ---------- autoplay timer (progress bar IS the timer) ---------- */
    function killTimer() { if (timer) { timer.kill(); timer = null; } }

    function syncTimer() {
      var run = !reduced && !userPaused && inView && !focusPaused && !busy;
      if (timer) { if (run) timer.play(); else timer.pause(); }
    }

    function restartTimer() {
      killTimer();
      gsap.set(bars, { scaleX: 0 });
      if (reduced) { gsap.set(bars[current], { scaleX: 1 }); return; }
      timer = gsap.fromTo(bars[current], { scaleX: 0 }, {
        scaleX: 1, duration: SLIDE_SECONDS, ease: 'none',
        onComplete: function () { go(current + 1, false); }
      });
      syncTimer();
    }

    /* ---------- slide transition ---------- */
    function go(next, manual) {
      var n = slides.length;
      next = (next + n) % n;
      if (next === current || (busy && !reduced)) return;
      if (introTl && introTl.isActive()) return;
      if (manual) announce(next);

      if (reduced) { current = next; setActive(current); restartTimer(); return; }

      busy = true; killTimer(); gsap.set(bars, { scaleX: 0 });
      var from = slides[current], to = slides[next];
      var toImg = imgs[next], fromImg = imgs[current];
      gsap.set(toImg, { zIndex: 2 }); gsap.set(fromImg, { zIndex: 1 });
      gsap.set(lines(to), { yPercent: 110 });

      slideTl = gsap.timeline({
        onComplete: function () {
          current = next; busy = false;
          gsap.set(imgs, { zIndex: 0, clearProps: 'clipPath' });
          gsap.set(toImg, { zIndex: 1 });
          restartTimer();
        }
      });
      slideTl
        .to(lines(from), { yPercent: -110, duration: 0.6, ease: 'power3.in', stagger: 0.05 }, 0)
        .fromTo(toImg, { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut' }, 0.05)
        .fromTo(toImg.querySelector('img'), { '--k': 1.3 }, { '--k': 1, duration: 1.5, ease: 'expo.out' }, 0.05)
        .add(function () { setActive(next); }, 0.85)
        .to(lines(to), { yPercent: 0, duration: 0.95, ease: 'expo.out', stagger: 0.07 }, 0.9);
    }

    /* ---------- intro ---------- */
    function playIntro() {
      var cs = getComputedStyle(hero);
      var edgeT = cs.getPropertyValue('--edge').trim() || '46%';
      var slantT = cs.getPropertyValue('--slant').trim() || '16vh';

      gsap.set(qa('.ln__in'), { yPercent: 110 });
      gsap.set(tick, { scaleX: 0 });
      gsap.set([cta, ctrl, cue].filter(Boolean), { autoAlpha: 0, y: 16 });
      gsap.set(hero, { '--edge': '100%', '--slant': '0vh' });
      hero.classList.add('is-ready');

      introTl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: function () {
          hero.style.removeProperty('--edge'); hero.style.removeProperty('--slant');
          armScroll(); restartTimer();
        }
      });
      introTl
        .to(hero, { '--edge': edgeT, '--slant': slantT, duration: 1.6, ease: 'expo.inOut' }, 0)
        .fromTo(imgs[current].querySelector('img'), { '--k': 1.35 }, { '--k': 1, duration: 2.3 }, 0)
        .to(lines(slides[current]), { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.55)
        .to(tick, { scaleX: 1, duration: 0.8 }, 0.9)
        .to([cta, ctrl, cue].filter(Boolean), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 1.05);

      if (window.scrollY > 80) introTl.progress(1);
    }

    /* ---------- scroll storytelling (desktop pins; mobile eases only) ---------- */
    function armScroll() {
      if (armed) return; armed = true;
      mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', function () {
        var tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero, start: 'top top', end: '+=90%', scrub: 0.6,
            pin: true, anticipatePin: 1, invalidateOnRefresh: true
          }
        });
        tl.to(hero, { '--edge': '0%', '--slant': '0vh' }, 0)
          .to(imgsWrap, { '--s': 1 }, 0)
          .to(cue, { autoAlpha: 0, duration: 0.2 }, 0);

        var cleanup = function () {};
        if (mqFine.matches) {
          var xTo = gsap.quickTo(imgsWrap, 'x', { duration: 1.2, ease: 'power3' });
          var yTo = gsap.quickTo(imgsWrap, 'y', { duration: 1.2, ease: 'power3' });
          var onMove = function (e) {
            xTo((e.clientX / window.innerWidth - 0.5) * -22);
            yTo((e.clientY / window.innerHeight - 0.5) * -14);
          };
          hero.addEventListener('pointermove', onMove);
          cleanup = function () { hero.removeEventListener('pointermove', onMove); };
        }
        return cleanup;
      });

      mm.add('(max-width: 899px)', function () {
        gsap.to(imgsWrap, {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
        });
      });
    }

    /* ---------- build / teardown (re-run when reduced-motion preference changes) ---------- */
    function build() {
      reduced = mqReduce.matches;
      hero.classList.toggle('is-reduced', reduced);
      setActive(current);
      gsap.set(imgs, { zIndex: function (i) { return i === current ? 1 : 0; } });
      updatePauseUI();
      if (reduced) { hero.classList.add('is-ready'); restartTimer(); return; }
      playIntro();
    }

    function teardown() {
      killTimer();
      if (introTl) { introTl.kill(); introTl = null; }
      if (slideTl) { slideTl.kill(); slideTl = null; }
      if (mm) { mm.revert(); mm = null; }
      armed = false; busy = false;
      var targets = [hero, imgsWrap, cta, ctrl, cue].concat(imgs, tick, bars, qa('.ln__in'), qa('.sl-img img')).filter(Boolean);
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: 'all' });
      ['--edge', '--slant'].forEach(function (p) { hero.style.removeProperty(p); });
      hero.classList.remove('is-ready');
    }

    /* ---------- events ---------- */
    var onPrev = function () { go(current - 1, true); };
    var onNext = function () { go(current + 1, true); };
    var onPause = function () { userPaused = !userPaused; updatePauseUI(); syncTimer(); };
    var onFocusIn = function () { focusPaused = true; syncTimer(); };
    var onFocusOut = function (e) {
      if (!hero.contains(e.relatedTarget)) { focusPaused = false; syncTimer(); }
    };
    var onMq = function () { teardown(); build(); };

    if (btnPrev) btnPrev.addEventListener('click', onPrev);
    if (btnNext) btnNext.addEventListener('click', onNext);
    if (btnPause) btnPause.addEventListener('click', onPause);
    hero.addEventListener('focusin', onFocusIn);
    hero.addEventListener('focusout', onFocusOut);
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onMq);

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting; syncTimer();
      }, { threshold: 0.35 });
      io.observe(hero);
    }

    // Warm the next slide's image so the wipe never reveals an empty frame.
    imgs.forEach(function (el) { var im = el.querySelector('img'); if (im && im.decode) im.decode().catch(function () {}); });

    build();

    return function destroy() {
      if (destroyed) return; destroyed = true;
      if (btnPrev) btnPrev.removeEventListener('click', onPrev);
      if (btnNext) btnNext.removeEventListener('click', onNext);
      if (btnPause) btnPause.removeEventListener('click', onPause);
      hero.removeEventListener('focusin', onFocusIn);
      hero.removeEventListener('focusout', onFocusOut);
      if (mqReduce.removeEventListener) mqReduce.removeEventListener('change', onMq);
      if (io) io.disconnect();
      teardown();
    };
  }

  return { initHero: initHero };
});
