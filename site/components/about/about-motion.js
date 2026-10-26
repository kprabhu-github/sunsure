/* ==========================================================================
   About motion — framework-agnostic (shared by the Next.js <About/> and the
   standalone preview). initAbout(el, { gsap, ScrollTrigger }) -> destroy()
   No pinning. Parallax is desktop-only; reduced motion shows the final state.
   ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SunsureAbout = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function initAbout(el, deps) {
    var gsap = deps && deps.gsap, ScrollTrigger = deps && deps.ScrollTrigger;
    if (!el || !gsap || !ScrollTrigger) return function () {};
    gsap.registerPlugin(ScrollTrigger);

    var qa = function (s) { return Array.prototype.slice.call(el.querySelectorAll(s)); };
    var q = function (s) { return el.querySelector(s); };
    var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var triggers = [], tweens = [], mm = null, destroyed = false;

    var tick = q('[data-tick]'), eyebrow = qa('[data-eyebrow] .ln__in'), title = qa('[data-title] .ln__in');
    var body = q('[data-body]'), cta = qa('[data-cta]'), art = q('[data-art]');
    var halfA = q('[data-half="a"]'), halfB = q('[data-half="b"]');
    var inA = q('[data-half="a"] .art__in'), inB = q('[data-half="b"] .art__in'), blade = q('[data-blade]');
    var stats = q('[data-stats]'), rules = qa('[data-rule]'), marks = qa('[data-stat-mark]');
    var nums = qa('[data-stat] .ln__in'), labels = qa('[data-stat-label]'), counts = qa('[data-count]');
    var backed = q('[data-backed]');

    function setFinalCounts() { counts.forEach(function (c) { c.textContent = c.getAttribute('data-count'); }); }

    function build() {
      if (mqReduce.matches) { setFinalCounts(); el.classList.add('is-ready'); return; }

      /* opening state (CSS keeps everything hidden until is-ready) */
      gsap.set(tick, { scaleX: 0 });
      gsap.set(eyebrow.concat(title, nums), { yPercent: 110 });
      gsap.set(body, { clipPath: 'inset(0% 0% 100% 0%)', y: 24 });
      gsap.set(cta, { autoAlpha: 0, y: 16 });
      gsap.set(inA, { clipPath: 'inset(100% 0% 0% 0%)', xPercent: -7, yPercent: 5 });
      gsap.set(inB, { clipPath: 'inset(0% 0% 100% 0%)', xPercent: 7, yPercent: -5 });
      gsap.set(blade, { scaleY: 0 });
      gsap.set(rules.concat(marks), { scaleX: 0 });
      gsap.set(labels, { autoAlpha: 0, y: 12 });
      gsap.set(backed ? [backed] : [], { autoAlpha: 0, y: 16 });
      counts.forEach(function (c) { c.textContent = '0'; });
      el.classList.add('is-ready');

      /* 1 — text + artwork, once, when the section comes into view */
      triggers.push(ScrollTrigger.create({
        trigger: q('.about__top'), start: 'top 72%', once: true,
        onEnter: function () {
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.to(tick, { scaleX: 1, duration: 0.8 }, 0)
            .to(eyebrow, { yPercent: 0, duration: 0.9 }, 0.05)
            .to(title, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.15)
            .to(body, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.3 }, 0.5)
            .to(cta, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.8)
            .to(inA, { clipPath: 'inset(0% 0% 0% 0%)', xPercent: 0, yPercent: 0, duration: 1.7, ease: 'expo.inOut' }, 0.2)
            .to(inB, { clipPath: 'inset(0% 0% 0% 0%)', xPercent: 0, yPercent: 0, duration: 1.7, ease: 'expo.inOut' }, 0.55)
            .to(blade, { scaleY: 1, duration: 1, ease: 'expo.inOut' }, 1.5);
          tweens.push(tl);
        }
      }));

      /* 2 — stats: dividers draw, numerals rise, counters run */
      if (stats) triggers.push(ScrollTrigger.create({
        trigger: stats, start: 'top 85%', once: true,
        onEnter: function () {
          var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
          tl.to(rules, { scaleX: 1, duration: 1.3, stagger: 0.14, ease: 'expo.inOut' }, 0)
            .to(marks, { scaleX: 1, duration: 0.7, stagger: 0.14 }, 0.3)
            .to(nums, { yPercent: 0, duration: 1.1, stagger: 0.14 }, 0.35)
            .to(labels, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14 }, 0.6);
          counts.forEach(function (c, i) {
            var o = { v: 0 }, end = parseFloat(c.getAttribute('data-count'));
            tl.to(o, { v: end, duration: 2, ease: 'power2.out', onUpdate: function () { c.textContent = Math.round(o.v); } }, 0.35 + i * 0.14);
          });
          if (backed) tl.to(backed, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.1);
          tweens.push(tl);
        }
      }));

      /* 3 — gentle, opposed parallax on the two halves (desktop only; neutral when centred) */
      mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', function () {
        var opts = { trigger: art, start: 'top bottom', end: 'bottom top', scrub: 0.8 };
        gsap.fromTo(halfA, { yPercent: 3.5 }, { yPercent: -3.5, ease: 'none', scrollTrigger: opts });
        gsap.fromTo(halfB, { yPercent: -4.5 }, { yPercent: 4.5, ease: 'none', scrollTrigger: opts });
      });
    }

    function teardown() {
      triggers.forEach(function (t) { t.kill(); }); triggers = [];
      tweens.forEach(function (t) { t.kill(); }); tweens = [];
      if (mm) { mm.revert(); mm = null; }
      var targets = [tick, body, art, halfA, halfB, inA, inB, blade].concat(eyebrow, title, nums, cta, rules, marks, labels, backed ? [backed] : []).filter(Boolean);
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: 'all' });
      el.classList.remove('is-ready');
    }

    var onMq = function () { teardown(); build(); };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onMq);
    build();

    return function destroy() {
      if (destroyed) return; destroyed = true;
      if (mqReduce.removeEventListener) mqReduce.removeEventListener('change', onMq);
      teardown();
      setFinalCounts();
    };
  }

  return { initAbout: initAbout };
});
