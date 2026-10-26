/* Preview bootstrap: same wiring as Next's <Hero/> + <SmoothScroll/>. */
(function () {
  var hero = document.querySelector('[data-hero]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduce && window.Lenis) {
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  SunsureHero.initHero(hero, { gsap: gsap, ScrollTrigger: ScrollTrigger });
})();
