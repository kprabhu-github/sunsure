# Content discrepancies — NOT changed, need client approval
(From fetch summaries of the live site; re-verify in a browser before sending to client.)

- Equity raised: homepage "400+ million USD" vs About "$400 million".
- Customers: homepage 80+ vs About 100+.
- Homepage counters animate 396 / 79 / 792 up to 400 / 80 / 800. Homepage figures kept as published; not applied to other pages.
- Projects page: 800+ MW and 8.3+ GW, but its metadata says 700MW+ and 7.1GW.
- States: text "over 16", filter lists 9, About lists 7.
- Commissioned list sums to 596.5 MWp.
- Solapur 1: described as under construction (est. March 2025) yet listed as commissioned.
- Pailani Solar: title 30 MWp, body 15 MWp.
- Augasi, Erach, Solapur 1 appear in both commissioned and in-development lists.
- Kabrai Solar (105 MWp, commissioned May 2026) appears on Projects only.
- Map note "Zoom to Madhya Pradesh" but no MP filter/projects.
- Partners Group AUM: "over USD 150 billion" vs 186+ in stats block.
- Contact form on live site shows "Contact form not found".
- Hero slides 2–4 identical.

## Added in the full-site pass
- CSR page Partners Group figures (174 / 11 / 36 / 130) differ from earlier notes (186+, "150 billion"). Page figures used as published.
- /about/ says "$400 million" and "100+ other industrial customers"; /projects/ says "70+ others". Both kept where they appear.
- /about/ says "800 MW operational"; homepage says "800+ MW Commissioned". Kept as published.
- Project capacity wording is inconsistent in places (e.g. Pailani Solar labelled 30 MWp, body text says 15 MWp). Kept verbatim; client to confirm.
- /contact/ on the live site shows "Contact form not found"; the new form is frontend-only.
- Jobs: category counts total 8, only 1 listing is published.
- **Security finding:** the live WordPress post-sitemap.xml contains dozens of casino/gambling spam posts in several languages. Looks like a compromise. Not imported. Client/hosting should investigate.
- Live /project/<slug>/ URLs redirect to /projects/, so only 12 projects have detail pages.
