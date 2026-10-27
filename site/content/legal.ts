/** /privacy-policy/ verbatim (effective 1st January 2026). Policy bundle includes terms, cookies, etc. */
export type LegalSection = { id: string; title: string; blocks: string[] };
export const legalIntro = { effective: 'Effective Date: 1st January 2026', lead: 'At Sunsure Energy Private Limited (“Sunsure”, “we”, “our”, or “us”), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and protect the information you provide when you visit our website https://sunsure-energy.com or interact with us through other channels.' } as const;

export const legalSections: LegalSection[] = [
  { id: 'privacy', title: 'Privacy Policy', blocks: [
    '1. Information We Collect',
    'a. Personal Information — We may collect: Name; Email address; Phone number; Company name and designation; Location / address; Any other information voluntarily provided',
    'b. Non-Personal / Technical Information — When you visit our website, we automatically collect: Browser type and version; Device type, operating system, and IP address; Pages visited and time spent; Referring website or source; Cookies and similar tracking technologies',
    '2. How We Use Your Information — To respond to your inquiries or requests; To provide information about our services and solutions; To process job applications and partnerships; To improve our website and user experience; To send updates, newsletters, or marketing communications (if opted in); To comply with legal obligations',
    '3. How We Share Your Information — We do not sell or rent your data. We may share it: With authorized employees and departments; With trusted service providers (hosting, analytics, CRM); When required by law or legal process; During merger, acquisition, or restructuring',
    '4. Data Retention — We retain your information as long as necessary for stated purposes or legal requirements.',
    '5. Cookies & Tracking Technologies — Our site uses cookies and analytics (e.g., Google Analytics). You can disable cookies in your browser; however, it may affect functionality.',
    '6. Data Security — We use industry-standard measures to protect data from unauthorized access, misuse, loss, or disclosure.',
    '7. Your Rights — You may have rights to: Access and correct personal data; Withdraw marketing consent; Request deletion (where legally permissible). Contact us at [marketing@sunsure-energy.com] to exercise your rights.',
    '8. Third-Party Links — We are not responsible for the privacy practices or content of external sites linked from our website.',
    '9. Updates to this Policy — This Privacy Policy may be updated periodically. Updates will be reflected with a revised effective date.',
    '10. Contact Us — Sunsure Energy Private Limited, 1101A-1107, 11th Floor, BPTP Park Centra, Jal Vayu Vihar, Sector 30, Gurugram, Haryana 122001. Email: [marketing@sunsure-energy.com]. Website: https://sunsure-energy.com',
  ] },
  { id: 'terms', title: 'Terms of Use', blocks: [
    'Welcome to Sunsure Energy. By accessing our website, you agree to the following terms:',
    '1. Intellectual Property — All content, trademarks, and graphics are the property of Sunsure Energy. Unauthorized use or reproduction is prohibited.',
    '2. Website Usage — You agree not to use this site for unlawful purposes or activities that could damage Sunsure’s reputation or systems.',
    '3. Limitation of Liability — Sunsure Energy shall not be liable for any indirect, incidental, or consequential damages arising from website usage.',
    '4. Accuracy of Information — While we strive for accuracy, Sunsure makes no warranties about the completeness or reliability of information on this website.',
    '5. Links to Other Websites — We are not responsible for content on linked third-party websites.',
    '6. Governing Law — This agreement shall be governed by and construed in accordance with the laws of India.',
  ] },
  { id: 'cookies', title: 'Cookie Policy', blocks: [
    'Our website uses cookies to enhance your browsing experience.',
    '1. What Are Cookies? — Cookies are small text files stored on your device that help us remember your preferences and analyze site traffic.',
    '2. Types of Cookies We Use — Essential Cookies: Required for basic functionality. Analytics Cookies: Help us understand user behavior (e.g., Google Analytics). Marketing Cookies: Used for relevant advertising and retargeting.',
    '3. Managing Cookies — You can modify your browser settings to disable cookies, but this may affect functionality.',
  ] },
  { id: 'disclaimer', title: 'Disclaimer', blocks: [
    'The information on this website is provided for general informational purposes only. While Sunsure Energy strives for accuracy, we make no representations or warranties regarding completeness or reliability. All information is subject to change without notice.',
    'Sunsure Energy will not be liable for any loss or damage resulting from the use of this website or reliance on its content.',
  ] },
  { id: 'esg', title: 'ESG / Sustainability Policy', blocks: [
    'At Sunsure Energy, sustainability is at the heart of our mission to make India’s power move towards a greener future.',
    'We are committed to: Developing and operating renewable energy assets that reduce carbon emissions. Promoting responsible procurement and ethical labor practices. Ensuring health, safety, and wellbeing of our employees and partners. Fostering community development and environmental stewardship. Reporting transparently on our ESG performance.',
  ] },
  { id: 'whistleblower', title: 'Whistleblower / Ethics Policy', blocks: [
    'Sunsure Energy upholds the highest ethical standards. Employees, partners, or stakeholders may confidentially report unethical behavior or violations to [compliance.officer@sunsure.in]',
    'All complaints will be handled with confidentiality, fairness, and non-retaliation.',
  ] },
  { id: 'data-protection', title: 'Data Protection & Security Policy', blocks: [
    'We use advanced security measures to ensure data integrity, including: Secure data centers and encryption; Limited access based on roles; Regular security audits and backups; Compliance with applicable data protection laws (including Indian DPDP Act)',
  ] },
  { id: 'accessibility', title: 'Accessibility Policy', blocks: [
    'Sunsure Energy strives to make its website accessible to all users, including those with disabilities, in accordance with WCAG 2.1 standards. We continually improve usability and welcome feedback at [marketing@sunsure-energy.com].',
  ] },
  { id: 'grievance', title: 'Grievance Redressal Policy', blocks: [
    'For concerns related to data privacy or content, you may contact our Grievance Officer:',
    'Name: Arvinder Singh. Email: [compliance.officer@sunsure.in]. Address: 1101A-1107, 11th Floor, BPTP Park Centra, Jal Vayu Vihar, Sector 30, Gurugram, Haryana 122001',
    'Complaints will be acknowledged within 48 hours and resolved within 30 days.',
  ] },
];
