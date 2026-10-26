/** Copy is taken verbatim from the live homepage hero (audited 26 Oct 2026). */
export const heroSlides = [
  {
    id: 'rtc',
    title: ['Making India’s', 'Power Move'],
    sub: ['Creating Round-the-Clock Renewable Energy Assets,', 'Powering India’s Unstoppable Growth'],
    image: { src: '/images/solar-plant-sunrise.webp', alt: 'Solar plant at sunrise' },
  },
  {
    id: 'green',
    title: ['Power your', 'business green'],
    sub: ['Developing renewable energy assets,', 'Powering India’s growth'],
    image: { src: '/images/solar-plant-robotic-cleaning.webp', alt: 'Solar plant with robotic cleaning' },
  },
] as const;

export const heroCta = { label: 'Explore Our Solutions', href: '/solutions/' } as const;
