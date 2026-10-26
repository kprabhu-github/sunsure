# Sunsure Energy: "Heritage" direction (classic and premium)

A second design direction beside the original build in the parent folder. Same content, same mark animation, different design language. Open `index.html` directly; no build step.

## Language
- Palette: ivory #f5efe3, paper #ebe3d1, ink #0e1726, brass #7a5c1c (text on light), gold #d4b06a (on dark). Muted text #5b5648 on light, #b9b4a6 on dark.
- Type: Cormorant Garamond (display, italic accents) + Jost (UI and body), Google Fonts.
- Hairline rules, arch frame, roman-numeral sections, rectangular uppercase buttons with a rising fill.

## Motion
Curtain intro with the S-mark turn · line-masked headline · arch window wipe + parallax · rotating badge driven by scroll · words of the manifesto fill as you read · hairline timeline draws · radial 24-hour dial (drag or play) · folio wipe in Solutions · ledger bars grow · quote fade · scroll progress line. All of it is disabled under `prefers-reduced-motion`; the marquee has a pause button.

## Checks run
axe-core (WCAG 2.0/2.1/2.2 A and AA + best practice): 0 violations desktop and mobile. No horizontal scroll at 390px. Keyboard: tabs (arrows/Home/End), chips, slider, menu (Esc), form errors.

## Still to confirm
- Photos are hot-linked from sunsure-energy.com; text over photos (ops band, solution folios) needs a contrast check with the real images. Self-host before launch.
- Wordmark is typeset in Cormorant; swap in the original logo SVG when available.
- Pailani capacity (30 vs 15 MWp), Solapur 1 status, form endpoint (currently opens email).
