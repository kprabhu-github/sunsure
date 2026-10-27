/** Titles, dates and excerpts as published. Article bodies stay on the live site (external links). */
const L = 'https://sunsure-energy.com';
export type Entry = { title: string; date: string; href: string; kind: 'Blog' | 'Webinar' | 'Media'; category?: string; readTime?: string; excerpt?: string };

export const blogs: Entry[] = [
  { kind: 'Blog', title: 'The Great Monsoon Illusion: Why Delhi’s Weather Averages Lie', date: 'September 11, 2026', readTime: '4 minutes', href: `${L}/the-great-monsoon-illusion-why-delhis-weather-averages-lie/` },
  { kind: 'Blog', title: 'What Is a VPPA? A Complete Guide for Indian Companies on Benefits of Vppa and How to Sign a Virtual Power Purchase Agreement', date: 'January 16, 2026', readTime: '4 minutes', href: `${L}/what-is-a-vppa-a-complete-guide-for-indian-companies-on-benefits-of-vppa-and-how-to-sign-a-virtual-power-purchase-agreement/` },
  { kind: 'Blog', title: 'Solar Power Subsidy in Telangana 2025 – Amount, Required Documents, Eligibility and Application Process', date: 'July 31, 2025', href: `${L}/solar-power-subsidy-in-telangana-2025-amount-required-documents-eligibility-and-application-process/` },
];
export const blogCategories = ['All', 'Regulatory', 'Solar'] as const;

export const webinars: Entry[] = [
  { kind: 'Webinar', title: 'The VPPA Route: Corporate Renewable Adoption in India | Sunsure Energy x FICCI Webinar', date: 'March 2, 2026', href: `${L}/the-vppa-route-corporate-renewable-adoption-in-india-sunsure-energy-x-ficci-webinar/` },
  { kind: 'Webinar', title: 'Webinar on BESS For C&I Power Leaders', date: 'October 7, 2025', href: `${L}/webinar-on-bess-for-ci-power-leaders/` },
  { kind: 'Webinar', title: 'Webinar on Interstate Transmission System: How India’s C&I Consumers Access Large Scale Green Power', date: 'July 17, 2025', href: `${L}/webinar-on-interstate-transmission-system-how-indias-ci-consumers-access-large-scale-green-power/` },
];

export const media: Entry[] = [
  { kind: 'Media', title: 'Sunsure Energy signs 20 MW Hybrid PPA with Kajaria Ceramics for supplying Round-The-Clock green power in Rajasthan', date: 'September 7, 2026', href: `${L}/medias/sunsure-energy-signs-20-mw-hybrid-ppa-with-kajaria-ceramics-for-supplying-round-the-clock-green-power-in-rajasthan/`, excerpt: '20 MW (10 MW Solar + 10 MW Wind) capacity for Round-the-Clock renewable energy supply Sunsure’s second PPA with Kajaria Ceramics following a 7 MW solar agreement in UP back in 2023 Jaipur, India [3rd Sep 2026]: Sunsure Energy, India’s preferred Round-the-Clock renewable energy solutions provider for business and utilities, has signed a long-term green…' },
  { kind: 'Media', title: 'Sunsure Energy Secures ₹262 Crore Project Financing from FMO and Axis Bank for 75 MWp Open Access Solar Project in Tamil Nadu', date: 'July 6, 2026', href: `${L}/medias/sunsure-energy-secures-%e2%82%b9262-crore-project-financing-from-fmo-and-axis-bank-for-75-mwp-open-access-solar-project-in-tamil-nadu/`, excerpt: 'This marks FMO’s first project financing in the Group Captive Commercial & Industrial (C&I) renewables space in India New Delhi, India [06.07.2026] — Sunsure Energy, India’s preferred renewable energy solutions provider for leading businesses and utilities, today announced that it has secured a total debt commitment of ₹262 Crore for its open access solar project…' },
  { kind: 'Media', title: 'Sunsure Energy awards 195 MW wind project order to Suzlon in Karnataka', date: 'June 25, 2026', href: `${L}/medias/sunsure-energy-awards-195-mw-wind-project-order-to-suzlon-in-karnataka/`, excerpt: 'Bijapur project expands Sunsure’s wind footprint to power industrial decarbonization through the ISTS network New Delhi, May 22, 2026: Sunsure Energy, India’s preferred Round-the-Clock (RTC) renewable energy solutions provider for leading businesses and utilities, has placed a 195 MW repeat wind order with the Suzlon Group for a project in Karnataka’s Bijapur district. The order…' },
];
