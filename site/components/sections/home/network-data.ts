/** Copy is verbatim from the live Solutions pages; step labels are interface text only. */
export const networkSteps = [
  { id: 'generate', label: 'Generate', text: 'Our Hybrid Power Purchase Agreements (PPAs) combine the strengths of solar and wind, delivering a more consistent and reliable energy supply compared to traditional renewable options.' },
  { id: 'store', label: 'Store', text: 'Our advanced Battery Energy Storage Systems (BESS) ensure uninterrupted, dispatchable clean energy for your Commercial & Industrial (C&I) operations, even during peak demand.' },
  { id: 'transmit', label: 'Transmit', text: 'We connect you to clean, reliable power from solar and wind farms located off-site with intra-state and inter-state connectivity, so you can reduce your carbon footprint, save on power costs and achieve your sustainability goals without breaking ground.' },
  { id: 'deliver', label: 'Deliver', text: 'We combine customised solar, wind, and battery storage solutions with strategic energy trading to deliver 24/7 clean and reliable renewable power for energy intensive industries.' },
] as const;

/** Industries named in the RE RTC copy. */
export const networkIndustries = ['Steel', 'Cement', 'Data Centres', 'Pharmaceutical', 'Automobile'] as const;

/** "Capacity utilization factor" figures from the Open Access PPA tabs. */
export const cufBars = [{ label: 'Solar PPA', value: 30 }, { label: 'Wind PPA', value: 45 }, { label: 'Hybrid PPA', value: 80 }] as const;
