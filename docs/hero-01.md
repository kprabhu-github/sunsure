# Sunsure redesign — Section 01: Design system + Hero

## 1. Audit — live hero (sunsure-energy.com, read 26 Oct 2026)
| Item | Exact content |
|---|---|
| Slide 1 heading | Making India’s Power Move |
| Slide 1 sub | Creating Round-the-Clock Renewable Energy Assets, / Powering India’s Unstoppable Growth |
| Slides 2–4 (identical in CMS) | Power your business green / Developing renewable energy assets, / Powering India’s growth |
| CTA (all slides) | Explore Our Solutions → /solutions/ |
| Nav | About (Company Overview, Media & Awards) · Solutions (RE RTC, Green Energy Open Access) · Projects · Careers (Careers at Sunsure, Job Openings) · Knowledge Hub (Blogs, Webinars) · Contact Us |
| Behaviour | Rotating slider, 4 slides |
| Images | Live pages expose no hero image URLs to our fetch. Used the two real photos already in /images (sunrise solar plant; solar plant with robotic cleaning). Confirm these are the live hero images. |
| Not in the live hero | Statistics (800+ MW, 8.3+ GW, 80+, 16+, $400M+) belong to About/Projects — deliberately NOT in this hero. |

Kept unchanged: all copy above. Only change: typographic apostrophe (’) in the heading.
Collapsed the three identical “Power your business green” slides into one.

## 2. Three directions considered
- **A — Horizon Slice (recommended, built).** The S-mark’s slant becomes a window onto the sunrise photo; a red blade rides its edge. On scroll the window opens to full-bleed while the photo pulls back. Pinned ~0.9 screen only.
- **B — 24-Hour Timeline.** One full-bleed photo; a pinned scroll scrubs a 24h clock while the image crossfades sunrise → wind → battery → transmission, telling the round-the-clock story. Strongest narrative, but pins for 3–4 screens and puts a lot of weight on photos we only have at small sizes.
- **C — Editorial Ledger.** Strict 12-col grid, oversized type on rules, a narrow vertical slanted image strip, hairline details. Most “corporate editorial”, least ownable; photography plays a supporting role.

**Why A:** reuses the logo geometry (brand-ownable, not a template), keeps your “evolve the original” direction, makes the real photo the hero, and the one pinned moment is short. B’s timeline idea is better placed in the RTC section.

## 3. Design system
Tokens: `site/styles/tokens.css` (single source; Tailwind and CSS both read it).
- Colour: ink #151414 / #242222, paper #fff / #f4f2f2, signal #fe3a20 (S-mark red). Forest #064635, mint #ddf0ee, sky #e9f6ff reserved for later sections — ≤10% of any page.
- Type: Anek Latin 400/500/600. Display clamp 44→116px; h2 52px (as live); lead 21px; body 18px.
- Grid: 12 col, fluid gutter 20→56px. Space: 4px base. Brand angle: `--slant` (constant angle via vh).
- Motion: expo ease-out / in-out, 0.2/0.4/0.9s.
- Button: parallelogram, ink text on red (5.1:1 — white on red is only 3.6:1).

## 4. Motion concept
Load: window slides open → headline lines rise through masks → red tick draws → CTA/controls settle.
Scroll (≥900px): hero pins; window expands to full-bleed; photo scales 1.35→1; pointer parallax on fine pointers.
Slides: photo wipes up through a clip; text lines exit/enter through masks. Autoplay 7s; progress bar is the timer.
Mobile: full-bleed from the start, no pin, gentle parallax only.

## 5. Review
- Accessibility: one h1 exposed at a time (inactive slides `inert` + aria-hidden); pause/play, prev/next buttons ≥44px; autoplay pauses on focus, when offscreen, and via the pause button; focus rings never clipped; skip link; `prefers-reduced-motion` = no intro, no pin, no autoplay, no smooth scroll (switches live if the setting changes).
- Performance: only transform/opacity/clip-path/custom-property animation; no layout animation; CLS 0 (Next) / 0.003 (preview, font swap); first image `priority`; fonts local; Next serves AVIF/WebP. Cleanup: `initHero()` returns `destroy()` (kills tweens, ScrollTriggers, listeners, inline styles) — verified under React strict mode.
- Tested: Chromium at 1440×900 and 390×844, reduced-motion on/off; no console errors, no horizontal scroll.
- Known gaps: header nav is low contrast over the brightest part of the sky (header is its own section); mobile photo is dark to protect text legibility; real Lottie/SVG logo animation not yet used (mark is a rebuilt placeholder).

## 6. Run it
- Preview: open `preview/hero.html` (needs nothing installed).
- Next.js: `cd site && npm install && npm run dev`
- `hero.css` and `hero-motion.js` are shared verbatim by both.
