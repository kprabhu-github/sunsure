/** Hero copy: verbatim from the live homepage (26 Oct 2026). Slides 2–4 are identical on the live site; one is kept. */
export const heroSlides = [
  {
    id: 'rtc',
    title: ['Making India’s', 'Power Move'],
    sub: ['Creating Round-the-Clock Renewable Energy Assets,', 'Powering India’s Unstoppable Growth'],
    image: { src: '/images/hero-solar-sunrise.webp', alt: 'Solar plant at sunrise', position: '50% 62%' },
  },
  {
    id: 'green',
    title: ['Power your', 'business green'],
    sub: ['Developing renewable energy assets,', 'Powering India’s growth'],
    // Live-site image (banner2). Which image the live slide uses is unconfirmed — see docs/asset-register.md.
    image: { src: '/images/hero-wind-sunrise.webp', alt: 'Wind turbines across farmland at sunrise', position: '50% 55%' },
  },
] as const;

export const heroCta = { label: 'Explore Our Solutions', href: '/solutions/' } as const;
