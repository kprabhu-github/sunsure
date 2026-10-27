import type { Metadata } from 'next';

/** Titles and the (site-wide) meta description are exactly those published on the live site. */
export const siteDescription = "Sunsure is India's leading Independent\nPower Producer with expertise in utility-scale and distributed RE projects.".replace('\n', ' ');

export const titles = {
  home: "India's Leading Renewable Energy Company for Businesses - Sunsure Energy",
  about: 'About Sunsure Energy - Your Trusted Renewable Partner',
  solutions: 'Green Energy Solutions for Large Scale Businesses in India - Sunsure Energy',
  rtc: 'Renewable Energy Solutions for Businesses in India - Sunsure Energy',
  openAccess: 'Green Energy Open Access for Commercial & Industrial Customers - Sunsure Energy',
  projects: 'Projects - Sunsure Energy',
  ctu: 'Inter State (CTU) Archives - Sunsure Energy',
  stu: 'Intra State (STU) Archives - Sunsure Energy',
  media: 'Media - Sunsure Energy',
  careers: 'Careers - Sunsure Energy | Renewable Energy Jobs in India',
  jobs: 'Job Openings - Sunsure Energy',
  blogs: 'Blogs - Sunsure Energy',
  webinars: 'Webinars - Sunsure Energy',
  knowledge: 'Knowledge Hub - Sunsure Energy',
  contact: 'Contact - Sunsure Energy',
  privacy: 'Privacy Policy - Sunsure Energy',
  csr: 'CSR, Sustainability, Investor Relations - Sunsure Energy',
  market: 'Sunsure Power Market - Sunsure Energy',
} as const;

export function meta(title: string, path: string): Metadata {
  return { title: { absolute: title }, description: siteDescription, alternates: { canonical: path }, openGraph: { title, description: siteDescription, url: path, siteName: 'Sunsure Energy', type: 'website' } };
}
