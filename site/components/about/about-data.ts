/** Copy verbatim from the live homepage About block (read 26 Oct 2026; paragraph approved by client). */
export const about = {
  eyebrow: 'ABOUT SUNSURE',
  headingLines: ['Powering', 'India’s energy', 'independence'],
  body:
    'Founded in 2014, Sunsure Energy is India’s preferred round-the-clock renewable energy (RE-RTC) solutions provider for leading businesses and utilities transitioning to green power. As a leading Independent Power Producer (IPP), Sunsure enables businesses across India to embrace clean energy with ease and confidence through long-term Power Purchase Agreements (PPAs) that offset up to 100% of power use to renewable energy through a mix of solar, wind, and battery storage technologies.',
  cta: { label: 'Know More', href: '/about/' },
  stats: [
    { value: 400, label: 'Million USD Raised in Equity Capital' },
    { value: 80, label: 'Happy Industrial Customers' },
    { value: 800, label: 'MW commissioned' },
  ],
  backed: { label: 'We are backed by', name: 'Partners Group', cta: { label: 'Know More', href: '/about#investor' } },
  image: { src: '/images/powerd_image.webp', width: 948, height: 870 },
} as const;
