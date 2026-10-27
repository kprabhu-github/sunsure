/** Verbatim from /solutions/, /solutions/re-100-solutions/ and /solutions/green-energy-off-site/. */
export const solutionsIntro = {
  heading: ['A swift and seamless', 'transition to renewable', 'energy, with Sunsure'],
  eyebrow: 'Our Solutions',
  body: 'Sunsure empowers businesses of all sizes to embrace clean energy and build a greener tomorrow. We offer a comprehensive suite of renewable energy solutions tailored to your unique needs and goals.',
} as const;

export type SolutionItem = { id: string; label: string; body: string; href: string; facts?: { k: string; v: string }[] };
export type Solution = { id: string; slug: string; name: string; tagline: string; headline: string; intro: string[]; benefits?: { title: string; body: string }[]; items: SolutionItem[] };

export const solutions: Solution[] = [
  {
    id: 'rtc', slug: 're-100-solutions', name: 'RE RTC Solutions',
    tagline: 'Join the group of companies committed to 100% Renewable energy',
    headline: 'Decarbonise your future with us',
    intro: [
      'Sunsure Energy offers a variety of clean energy solutions for corporations to switch to 100% green energy. The benefits of switching to RE100 go beyond just environmental benefits. These are:',
      'At Sunsure, we design custom combinations of solar, wind, and battery storage systems to ensure reliable, firm and dispatchable green power supply. We go beyond just providing clean power by offering strategic energy trading and access to green certificates to manage your environmental impact and achieve ESG leadership.',
    ],
    benefits: [
      { title: 'Cost Savings', body: 'Switch to RE100 can lead to long-term price stability through power purchase agreements.' },
      { title: 'Competitive Advantage', body: 'As consumers are increasingly drawn to sustainable businesses, you can attract eco-conscious investors and customers.' },
      { title: 'Innovation', body: 'RE100 fosters collaboration among member companies, which can drive innovation in renewable energy solutions.' },
    ],
    items: [
      { id: 'rtc-power', label: 'RTC Power', href: '/solutions/re-100-solutions/?servid=box_263_lt1', body: 'We combine customised solar, wind, and battery storage solutions with strategic energy trading to deliver 24/7 clean and reliable renewable power for energy intensive industries. Our solutions are specifically designed to address the energy decarbonisation challenges of industries like Steel, Cement, Data Centres, Pharmaceutical, Automobile, and more.' },
      { id: 'storage', label: 'Energy Storage', href: '/solutions/re-100-solutions/?servid=box_263_lt2', body: 'Our advanced Battery Energy Storage Systems (BESS) ensure uninterrupted, dispatchable clean energy for your Commercial & Industrial (C&I) operations, even during peak demand. Our solutions are focused on providing reliable renewable power for your business in non-generation hours.' },
      { id: 'recs', label: 'Renewable Energy Certificates (RECs)', href: '/solutions/re-100-solutions/?servid=box_263_lt3', body: 'We help C&I clients develop a comprehensive green attribute strategy, providing access to Renewable Energy Certificates (RECs), Carbon Credits, and other instruments to achieve—and surpass—your ESG goals, ensuring full compliance. Rely on us to streamline you path to ESG leadership.' },
    ],
  },
  {
    id: 'oa', slug: 'green-energy-off-site', name: 'Green Energy Open Access',
    tagline: 'Open access renewable energy solutions in India',
    headline: 'Off-site energy, On-site impact',
    intro: [
      'Sunsure’s open access green energy solutions unlock the benefits of renewable energy for businesses of all sizes, regardless of space constraints. These benefits are:',
      'We connect you to clean, reliable power from solar and wind farms located off-site with intra-state and inter-state connectivity, so you can reduce your carbon footprint, save on power costs and achieve your sustainability goals without breaking ground.',
    ],
    benefits: [
      { title: 'Cost Savings', body: 'Depending on the program structure, off-site renewables can lower your electricity costs.' },
      { title: 'Price Stability', body: 'Renewable energy sources offer more predictable pricing compared to fluctuating fossil fuel costs.' },
      { title: 'No On-Site Installation', body: 'This eliminates the need for upfront investment in installing and maintaining renewable energy systems on your property.' },
      { title: 'Suitable for Limited Space', body: 'If your property doesn’t have suitable space for solar panels or wind turbines, off-site solutions allow you to participate in the benefits of renewable energy.' },
    ],
    items: [
      { id: 'hybrid', label: 'Hybrid PPAs', href: '/solutions/green-energy-off-site/?tabid=sub_services_tab_1&servid=v2_tab_section', body: 'Our Hybrid Power Purchase Agreements (PPAs) combine the strengths of solar and wind, delivering a more consistent and reliable energy supply compared to traditional renewable options. This innovative approach optimises power generation from multiple sources, ensuring you benefit from a stable and predictable energy output.', facts: [{ k: 'Capacity utilization factor', v: 'upto 80%' }, { k: 'Technology', v: 'Solar and Wind' }] },
      { id: 'solar', label: 'Solar PPAs', href: '/solutions/green-energy-off-site/?tabid=sub_services_tab_2&servid=v2_tab_section', body: 'Power your business with fixed tariff solar energy. Our turnkey Solar PPAs offer a hassle-free way to leverage solar power. Benefit from clean energy, reduced carbon footprint, and predictable pricing with no upfront costs – all while achieving your sustainability goals.', facts: [{ k: 'Capacity utilization factor', v: 'upto 30%' }, { k: 'Technology', v: 'Solar' }] },
      { id: 'wind', label: 'Wind PPAs', href: '/solutions/green-energy-off-site/?tabid=sub_services_tab_3&servid=v2_tab_section', body: 'Source sustainable energy and stabilise power costs with Sunsure’s Wind PPAs. Source clean, reliable power for your business through our customised Power Purchase Agreements (PPAs). Leverage state-of-the-art wind farms and achieve your sustainability goals without upfront investment.', facts: [{ k: 'Capacity utilization factor', v: 'upto 45%' }, { k: 'Technology', v: 'Wind' }] },
    ],
  },
];

/** "The Sunsure Advantage — Assured clean energy. Assured ROI. With Sunsure" (RE RTC page). */
export const advantage = {
  eyebrow: 'The Sunsure Advantage',
  heading: ['Assured clean energy.', 'Assured ROI.', 'With Sunsure'],
  items: [
    { title: 'Tailored Solutions', body: 'Our customized renewable energy solutions align perfectly with your business needs and budget, unlocking sustainable growth and savings for your future. Our team of experts can help you find the best plan to achieve your RE100 goals.' },
    { title: 'Save Costs, Power Profits', body: 'Reduce your energy bills by up to 40% and unlock long-term financial benefits with our efficient state-of-the-art energy solutions. Our fixed tariff PPAs secure you against rising grid prices in the future.' },
    { title: 'Clean Energy', body: 'Emissions-free energy to power all your operations. Achieve your RE100 and decarbonization goals with Sunsure’s energy solutions ranging from solar, wind, and energy storage.' },
    { title: 'On-time Delivery', body: 'Our in-house capabilities, meticulous planning, experienced team, and robust project management systems ensure your renewable energy project is delivered on time, every time.' },
    { title: 'Expert Guidance', body: 'Less than 3% of our value addition is outsourced. Our in-house EPC and Asset Management contribute to exceptional customer experience and speed of execution. Our team of experienced professionals will guide you every step of the way towards renewable energy success.' },
    { title: 'Long Term Partnerships', body: 'We believe in unequal partnerships - tilted towards our customers. Our DNA dictates us to go above and beyond to create a long-term partnership with a customer. Since 2014, 70% of our revenues come from repeat orders from existing customers.' },
  ],
} as const;

export const rtcFaqs = [
  { q: 'What is RE100?', a: 'As mentioned on Climate Group’s website – RE100 is the global corporate renewable energy initiative bringing together hundreds of large and ambitious businesses committed to 100% renewable electricity. RE100 goals are pursued by corporations aiming to source their 100% energy from renewable sources. At Susnsure Energy we provide a variety of clean energy solutions for businesses to switch to 100% renewable energy. We design custom combinations of solar, wind and battery energy storage systems to ensure reliable, firm and dispatchable green power supply.' },
  { q: 'What are the benefits of becoming an RE100 company in India?', a: 'Becoming an RE100 company in India enhances brand reputation, ensures regulatory compliance, and provides access to incentives. It leads to cost savings and improved energy efficiency, while increasing resilience and energy security. Supporting national goals for renewable energy helps meet ESG targets and aligns with India’s sustainability efforts. Additionally, it drives innovation and offers a competitive market advantage, making it a strategic move for businesses aiming for long-term growth and sustainability.' },
  { q: 'How can you join RE100?', a: 'To join RE100, ensure your company is committed to 100% renewable electricity and make a public pledge to this goal. Partner with a green power producer to manage your energy needs, develop and implement a detailed plan to transition to renewable energy, and regularly report your progress. For more details, visit the RE100 website.' },
  { q: 'Why should you choose Sunsure Energy for your RE100 commitment?', a: 'Our renewable energy solutions can help you fully transition to green power while reduce your energy bills by upto 40% and unlock long-term financial benefits. We offer emission-free energy to power your operations. Achieve your RE100 and decarbonisation goals with Sunsure Energy’s solutions ranging from solar, wind and energy storage.' },
] as const;
