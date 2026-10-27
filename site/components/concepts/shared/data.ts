/** Verified Sunsure content re-exported for the concept previews. Nothing is invented here; see /content. */
export { heroSlides, heroCta } from '@/content/hero';
export { homeStats, investorStats } from '@/content/stats';
export { about, customers } from '@/content/about';
export { solutions, solutionsIntro, advantage } from '@/content/solutions';
export { projects, projectsPage } from '@/content/projects';
export { blogs, webinars, media } from '@/content/knowledge';
export { offices, company, footerLinks } from '@/content/site';
export { investors } from '@/content/investors';
export { networkSteps, networkIndustries, cufBars } from '@/components/sections/home/network-data';

export const photo = {
  solar: { src: '/images/hero-solar-sunrise.webp', alt: 'Solar plant at sunrise', w: 1900, h: 1069 },
  wind: { src: '/images/hero-wind-sunrise.webp', alt: 'Wind turbines across farmland at sunrise', w: 2560, h: 1372 },
  solarSky: { src: '/images/hero-solar-nosun.webp', alt: 'Solar plant at sunrise', w: 1900, h: 1069 },
  crew: { src: '/images/solar-plant-robotic-cleaning.webp', alt: 'Solar rows with maintenance crew', w: 1900, h: 1069 },
} as const;
export type PhotoKey = keyof typeof photo;

/** Short date helper: "September 7, 2026" -> { d: '07', m: 'Sep', y: '2026' } */
export function parseDate(s: string) {
  const dt = new Date(s + ' UTC'); const m = dt.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' });
  return { d: String(dt.getUTCDate()).padStart(2, '0'), m, y: String(dt.getUTCFullYear()) };
}
