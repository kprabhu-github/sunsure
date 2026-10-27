/** Company facts and contact details, verbatim from sunsure-energy.com (26 Oct 2026). */
export const company = {
  name: 'Sunsure Energy',
  legalName: 'Sunsure Energy Private Limited',
  phone: '+91124-6928499',
  phoneHref: 'tel:+911246928499',
  marketingEmail: 'marketing@sunsure.in',
  careersEmail: 'careers@sunsure.in',
  infoEmail: 'info@sunsure.in',
  headOffice: '1101A-1107, 11th Floor, BPTP Park Centra, Jal Vayu Vihar, Sector 30, Gurugram, Haryana 122001',
  liveSite: 'https://sunsure-energy.com',
} as const;

export const offices = [
  { name: 'Head office', address: company.headOffice, phone: '+91 124 6928499', email: 'info@sunsure.in' },
  { name: 'Regional Office - Pune', address: 'H1080B, Solitaire Business Hub, Konark Nagar, Clover Park, Viman Nagar, Pune, Maharashtra 411014', phone: '+91 2041241329', email: 'info@sunsure.in' },
  { name: 'Regional Office - Chennai', address: 'Sunsure Energy Pvt Ltd. Awfis No. 143, 2nd floor, Uthamar Gandhi road, opposite to park hotel, Nungambakkam - 600034', phone: undefined, email: 'info@sunsure.in' },
] as const;

export const footerLinks = [
  { label: 'About', href: '/about/' },
  { label: 'Careers', href: '/careers-hiring/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Knowledge Hub', href: '/knowledge-hub/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Media & Awards', href: '/media/' },
  { label: 'Contact Us', href: '/contact/' },
  { label: 'Sunsure Power Market', href: '/sunsure-power-market/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
] as const;
// Social links exist on the live site footer but their URLs were not captured. See docs/content-gaps.md.
