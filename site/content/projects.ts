/**
 * Projects with real published text. Source: /projects/ ("COMMISSIONED PROJECTS") and the two
 * /power-transmission/ pages. Wording and figures are exactly as published, including internal
 * inconsistencies (see docs/content-discrepancies.md). The live /project/<slug>/ URLs redirect to /projects/,
 * so no further per-project detail exists to import.
 */
export type Technology = 'Open Access Solar' | 'Ground Mounted';
export type Project = {
  slug: string; name: string; capacityLabel: string; mwp: number; state?: 'Maharashtra' | 'Uttar Pradesh';
  technology: Technology; status: 'Commissioned'; commissioned?: string; body: string; transmission?: 'Inter State (CTU)' | 'Intra State (STU)'; image: 'sunrise' | 'robotic';
};

export const projects: Project[] = [
  { slug: 'dhule', name: 'Dhule', capacityLabel: '120 MWp', mwp: 120, state: 'Maharashtra', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'July 2025', image: 'sunrise', body: 'Sunsure Energy has commissioned a 120 MWp Open Access Solar project in Dhule, Maharashtra. Commissioned in July 2025, the project supplies clean energy to marquee customers like Deepak Fertilizers and Sify.' },
  { slug: 'solapur-1', name: 'Solapur 1', capacityLabel: '150 MWp', mwp: 150, state: 'Maharashtra', technology: 'Open Access Solar', status: 'Commissioned', image: 'robotic', body: 'Sunsure Energy is constructing a 150 MWp Open Access Solar project in Solapur, Maharashtra. Estimated to be commissioned in March 2025, the project supplies clean energy to industries across the state.' },
  { slug: 'erach-solar', name: 'Erach Solar', capacityLabel: '82.5 MWp', mwp: 82.5, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'September 2025', image: 'sunrise', body: "Sunsure Energy has developed a 82.5 MWp Open Access Solar project in Jhansi, Uttar Pradesh. Commisioned in September 2025, the project supplies clean energy to Haldiram's, Bisleri, Sify, and APL Apollo." },
  { slug: 'augasi-solar', name: 'Augasi Solar', capacityLabel: '49 MWp', mwp: 49, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', image: 'robotic', body: 'Sunsure Energy has developed a 49 MWp Open Access Solar Project in Uttar Pradesh’s Augasi. The project is successfully supplying clean energy to industries across the state.' },
  { slug: 'pailani-solar', name: 'Pailani Solar', capacityLabel: '30 MWp', mwp: 30, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'October 2023', image: 'sunrise', body: 'Sunsure Energy developed a 15 MWp Open Access Solar project in Pailani, Uttar Pradesh. Commissioned in October 2023, the project supplies clean energy to industries across the state.' },
  { slug: 'pailani-2', name: 'Pailani – 2 (U.P.)', capacityLabel: '15 MWp', mwp: 15, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'August 2023', image: 'robotic', body: 'Sunsure Energy developed a 15 MWp Open Access Solar project in Pailani, Uttar Pradesh. Commissioned in August 2023, the project supplies clean energy to industries across the state.' },
  { slug: 'gursarai-solar', name: 'Gursarai Solar', capacityLabel: '18 MWp', mwp: 18, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'March 2024', image: 'sunrise', body: 'Sunsure Energy developed a 18 MWp Open Access Solar project in Gursarai, Uttar Pradesh. Commissioned in March 2024, the project supplies clean energy to industries across the state.' },
  { slug: 'panwari-solar', name: 'Panwari Solar', capacityLabel: '15 MWp', mwp: 15, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'March 2024', image: 'robotic', body: 'Sunsure Energy developed a 15 MWp Open Access Solar project in Panwari, Uttar Pradesh. Commissioned in March 2024, the project supplies clean energy to industries across the state.' },
  { slug: 'pinahat-solar', name: 'Pinahat Solar', capacityLabel: '12 MWp', mwp: 12, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'November 2023', image: 'sunrise', body: 'Sunsure Energy developed a 12 MWp Open Access Solar project in Pinahat, Uttar Pradesh. Commissioned in November 2023, the project supplies clean energy to industries across the state.' },
  { slug: 'kabrai-solar', name: 'Kabrai Solar', capacityLabel: '105 MWp', mwp: 105, state: 'Uttar Pradesh', technology: 'Open Access Solar', status: 'Commissioned', commissioned: 'May 2026', image: 'robotic', body: 'Sunsure Energy developed a 105 MWp Open Access Solar project in Kabrai, Uttar Pradesh. Commissioned in May 2026, the project supplies clean energy to industries across the state.' },
  { slug: 'kapilas', name: 'Kapilas – Ground Mounted Solar', capacityLabel: '17.5 MWp', mwp: 17.5, technology: 'Ground Mounted', status: 'Commissioned', transmission: 'Inter State (CTU)', image: 'robotic', body: 'The 17.5 MWp Ground-mounted Solar Power Plant is installed within the premises of the Kapilas Cement Works factory of Dalmia Cement (Bharat) Ltd. This plant is one of the largest behind-the-meter plants in India at the time of its commissioning and was completed by Sunsure within record construction timelines of 60 days from start of construction at the site. This is also DCBL’s largest captive solar power plant till date.' },
  { slug: 'bangarmau', name: 'Bangarmau – Ground Mounted Solar', capacityLabel: '21.3 MWp', mwp: 21.3, technology: 'Ground Mounted', status: 'Commissioned', transmission: 'Intra State (STU)', image: 'sunrise', body: 'Sunsure Energy succesfully commissioned 21.3 MWp ground mounted solar capex plant for Inox Air Products. It’s the largest renewable energy installation in the region and INOXAP’s first dedicated Open Access Power Plant in India.' },
];

export const projectsPage = {
  presenceEyebrow: 'OUR PRESENCE',
  presenceHeading: 'Our Pan India Presence',
  lead: 'Sunsure Energy’s Commercial, Industrial, and Institutional customers have improved the bottom-line by transitioning to renewable energy.',
  body: 'Born from a vision for a greener tomorrow, Sunsure was established with the unwavering belief that renewable energy holds the key to India’s bright future. We are the partner-of-choice for some of India’s leading industrial companies including Sify technologies Ltd., Sandoz, Jindal Stainless Ltd., Lupin Ltd., Emcure Pharmaceuticals Ltd., APL Apollo, KSB Pumps, Kajaria Ceramics Ltd., INOX Air Products, Dabur Ltd., Flipkart, and 70+ others across over 16 Indian States.',
  stats: [{ value: 8.3, suffix: '+', decimals: 1, label: 'GW Pipeline' }, { value: 800, suffix: '+', decimals: 0, label: 'MW Commissioned' }],
  listHeading: 'Our plants in India',
  filters: {
    state: ['Andhra Pradesh', 'Gujarat', 'Haryana', 'Karnataka', 'Maharashtra', 'Odisha', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh'],
    technology: ['BESS', 'Ground Mounted', 'Open Access Solar', 'Open Access Wind', 'Rooftop Solar', 'Wind'],
    transmission: ['Behind The Meter (BTM)', 'Inter State (CTU)', 'Intra State (STU)'],
    status: ['Commissioned', 'Under Construction', 'Under Development'],
    capacity: ['0-100', '100-250', '250-500', '500+'],
  },
  cta: { heading: "Turn your business' power struggle into a power move", body: 'We help you with everything from conceptualizing your renewable energy investment to commissioning of the asset and its operations over the complete lifetime - all from under one roof!' },
} as const;
