/** Homepage figures exactly as published. Do NOT apply to other pages. See docs/content-discrepancies.md. */
export const homeStats = [
  { value: 400, suffix: '+', label: 'Million USD Raised in Equity Capital' },
  { value: 80, suffix: '+', label: 'Happy Industrial Customers' },
  { value: 800, suffix: '+', label: 'MW commissioned' },
] as const;

/** Partners Group figures as published on /csr-sustainability-investor-relations/. */
export const investorStats = [
  { value: 174, suffix: ' +', label: 'Billion USD assets under management' },
  { value: 11, suffix: ' +', label: 'GW Renewable Energy assets owned globally' },
  { value: 36, suffix: ' +', label: 'Billion USD Market Cap listed on the SIX Swiss Exchange since 2006' },
  { value: 130, suffix: ' +', label: 'Private Infrastructure Investments in 18 countries' },
] as const;
