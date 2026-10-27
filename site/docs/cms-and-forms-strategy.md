# CMS / forms / careers / blogs — proposal (no changes made)

Observed: live site is WordPress with Yoast sitemaps (47 project pages, 2 solution pages, 2 transmission pages, blogs, webinars, media, job categories).

Proposal (needs approval before any infrastructure change):
1. **Content**: keep WordPress as the CMS; consume it headless through the WP REST API (read-only, server-side, in Next route handlers/ISR). Confirm `/wp-json/wp/v2/` is enabled. Start with blogs, webinars, media, projects.
2. **Forms**: UI will be built in the frontend only. The live contact form currently errors ("Contact form not found"), so the working backend is unknown. Needs from client: which plugin (Contact Form 7 / Gravity / WPForms / other) and its endpoint. Any submission will go through a Next server route so no keys reach the browser. No endpoint is invented.
3. **Careers**: preserve existing listings and application destinations (links out); not yet audited per category.
4. **Secrets**: only in server env vars, never in frontend code.
