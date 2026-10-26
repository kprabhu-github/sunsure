# Sunsure Energy: Design System (marketing site)

Source of truth: the supplied Design.md/Skill.md brief for sunsure-energy.com. Tokens live in `css/style.css` under `:root`. Tokens marked **ext** extend the brief where layout needed a value it does not define; everything else is verbatim from the brief.

## 1. Context and goals
Intent: present Sunsure as the fastest route to round-the-clock renewable power, in a structured, accessible, implementation-first interface for buyers and decision-makers.
Surface: marketing site, WCAG 2.2 AA, keyboard-first.
Signature: the S-mark (two parallelograms) spins apart, flips and locks together. It appears in the loader, header logo (hover, focus, every 7s), advantage cards (hover), hero background and scroll dial. Rebuilt from the supplied hover animation video; swap in the original Lottie/SVG when available.

## 2. Tokens and foundations

| Group | Token | Value | Notes |
|---|---|---|---|
| Colour | `color.surface.base` | #000000 | Default dark surface |
| | `color.surface.strong` | #242222 | Raised dark surface (cards, chart panel) |
| | `color.border.default` | #ffffff | Ghost buttons, hover borders |
| | `color.text.secondary` | #878787 | AA on base only (5.8:1). Never on strong (4.4:1) |
| | `color.accent` (brief: text.tertiary) | #fe3a20 | Text on base only (5.8:1). White on accent = large/bold text only (3.6:1) |
| | `color.surface.inverse` **ext** | #ffffff | Light sections |
| | `color.surface.inverse-subtle` **ext** | #f4f2f2 | Cards on inverse |
| | `color.text.muted` **ext** | #b8b8b8 | AA on base and strong (8.9:1 / 7.0:1) |
| | `color.text.on-inverse-muted` **ext** | #595959 | 7:1 on white |
| | `color.data.solar/wind/storage` **ext** | #ffb020 / #6fb6ff / accent | Chart only; never the sole carrier of meaning (labels + values shown) |
| Type | `font.family.primary` | Anek Latin | Weights 400/500/600/700 |
| | base | 18px / 400 / 1.38 (24.84px) | |
| | scale | sm 14, md 16, lg 18, xl 21, 2xl 22, 3xl 25, 4xl 26 | |
| | display **ext** | 5xl clamp(32,4.4vw,58), display clamp(46,8.4vw,116), button 19px bold | 19px bold qualifies as WCAG "large text" |
| Space | `space.1-8` | 2, 5, 10, 12, 17, 18, 20, 22 px | **ext** 9-11: 30, 44, 66 for layout rhythm |
| Radius | `radius.xs / sm` | 50px / 100px | `radius.pill`=100px for buttons, pills, tabs; **ext** `radius.card` 24px |
| Motion | `motion.duration.instant/fast/normal` | 150 / 300 / 500 ms | **ext** slow 900ms for scroll reveals only |
| Target | `target.min` **ext** | 44px | Exceeds WCAG 2.2 minimum of 24px |

Rule: components must reference tokens, never raw hex.

## 3. Component rules

All interactive components must define: default, hover, focus-visible, active, disabled, loading, error. Focus ring: 3px solid `--color-focus` (white on dark, black on `.inverse` sections), 3px offset, never removed.

**Button** (`.btn`, `.btn-sm`, `.btn-ghost`). Anatomy: optional dot + label. Default accent fill, white label 19px bold. Hover inverts to white fill/black label (black fill/white label on inverse sections). Active: 1px down, scale .98. Disabled: strong fill, secondary text, `not-allowed`. Loading: `aria-busy="true"` hides label, shows spinner, blocks pointer. Error: n/a (errors live on the form). Keyboard: Enter/Space. Touch: min 44px. Labels must be specific ("Explore Our Solutions", "Send enquiry").

**Navigation** (`.nav`). Fixed, transparent over hero, solid black after 40px scroll. Current section marked `aria-current="true"`. At ≤820px a full-screen menu: button toggles `aria-expanded`, focus moves into menu, Esc closes and returns focus. Skip link is first tab stop.

**Stat strip**. Final values are in the markup; JS animates count-up only when motion is allowed. Wraps to 2 columns ≤980px; last item spans.

**Marquee**. Pausable (`aria-pressed`), static under `prefers-reduced-motion`. Duplicate set is `aria-hidden`.

**Card / Solution tile / Project tile / Post** . Radius `card`. Hover: lift 5-6px, border to full-contrast. Whole tile is the link target when it is a link; link text must describe the destination ("Ask about storage", "Read article (new tab)"). Long content wraps; project cards scroll in a labelled, focusable region (`tabindex=0`, arrow keys scroll). Empty state: tiles without a status use a spacer so numerals align.

**Tabs** (Solutions). `role=tablist/tab/tabpanel`, roving tabindex, Left/Right/Home/End, selected tab = black fill. Hidden panels use `hidden`.

**Time explorer (RTC chart)**. `role=img` with a text description; the native range input carries `aria-valuetext` ("13:00, Midday. Solar 98 percent, wind 2 percent, storage 0 percent"). Play/pause button toggles label. Autoplays once on first view and stops on any input; static under reduced motion.

**Testimonial carousel**. Manual only (no auto-advance), `aria-live=polite`, prev/next 44px.

**Plan your switch** (`#plan`). A guided brief builder that turns browsing into a qualified enquiry. Anatomy: step 1 need chips, step 2 industry chips, live summary, optional step 3 savings estimator, "Start my enquiry" button.
- Chips are native radio buttons styled as pills (`role` comes free from the input). Selected = white fill, black text and a check glyph (not colour alone). Min height 44px, wraps on narrow screens. Arrow keys move within a group; Tab moves between groups.
- Summary (`aria-live=polite`) shows the chosen solution's own description and the real customers in that industry (all named on sunsure-energy.com). No invented claims.
- Estimator: monthly consumption (kWh), current tariff, expected green tariff, renewable share slider. Result = consumption × share × (current − green) × 12, shown in lakh/crore. Inputs validate inline (`aria-invalid`, message, no colour-only error). "No saving" is shown when green ≥ current. Example values are pre-filled and labelled; the result is labelled illustrative, not a quote.
- "Start my enquiry" scrolls to the form, pre-fills Interested in, Industry and Consumption, announces what was filled in (`role=status`), and moves focus to Name. All pre-filled fields stay editable. Choices and the self-estimate are added to the email body.
- States: chip default / hover (border to white) / focus-visible (3px ring) / checked; inputs default / hover / focus / error / disabled.

**Mobile quick-action bar** (`.mbar`, ≤820px). Appears after 80% of the first viewport, hides when the enquiry form is in view. "Plan your switch" (primary) and "Call" (tel link). Respects the iOS safe area; footer has bottom padding so nothing is covered.

**Form**. Labels always visible and associated. Required fields marked in the accessible name. Includes optional "Interested in" and "Industry" selects, pre-filled by Plan your switch. Error state: 3px accent border, `aria-invalid`, message below (white text with ⚠ glyph, not colour alone), focus moves to the first invalid field; validation re-runs on input once invalid. Loading: submit shows spinner and `aria-busy`. Success/failure message in `role=status`. Submission currently opens the user's mail client (`mailto:`); replace with an endpoint when available.

Responsive: single column ≤640px, 2 columns ≤980px, 4 columns desktop. Parallax and fixed backgrounds disabled on small screens.

## 4. Accessibility requirements and acceptance tests

| # | Requirement (must) | Pass / fail check |
|---|---|---|
| 1 | Text contrast ≥ 4.5:1 (≥ 3:1 for ≥ 24px or ≥ 18.66px bold) | axe `color-contrast` reports 0 violations; manual check of text over photos with the overlays in place |
| 2 | Every interactive element shows a ≥ 2px focus indicator | Tab through the page; no stop without a visible ring |
| 3 | All functionality available by keyboard; no traps | Tabs arrow-navigate, menu closes on Esc, slider adjustable with arrows |
| 4 | Touch targets ≥ 24px (design target 44px) | Measure bounding boxes; slider thumb 28px |
| 5 | Moving content > 5s can be paused | Marquee button and RTC play/pause present; reduced-motion honoured |
| 6 | Form errors identified in text and programmatically | `aria-invalid` + visible message + focus to first error |
| 7 | Links and buttons have descriptive names | No bare "Read more" / "Click here"; new-tab links say so |
| 8 | Meaning never by colour alone | Chart values and legend labels in text; errors carry ⚠ and message |
| 9 | Page works at 200% zoom and 320px width | No horizontal scroll, no clipped content |
| 10 | Choices are never conveyed by colour alone | Selected chips carry a check glyph; estimator errors carry text |
| 11 | Prefill is announced and editable | `role=status` message; focus lands on Name; every field editable |

Verified in build: axe-core (wcag2a/2aa/21aa/22aa + best-practice) 0 violations on desktop; 70-stop keyboard pass found no missing focus indicators. axe could not auto-judge text over photographs, so contrast on hero, solution tile and contact imagery relies on the black overlays and must be re-checked with the real photos.

## 5. Content and tone
Concise, confident, specific. Lead with the benefit and a number.
Do: "Power in about 6 months, not 12." / "Ask about storage."
Don't: "Click here", "Learn more", unsupported superlatives. Claims such as "Fastest", "100% round-the-clock" and "industry-leading retention" come from Sunsure's own site and must stay substantiated by the client.

## 6. Anti-patterns (prohibited)
- Raw hex values in components; one-off spacing or type sizes.
- `color.text.secondary` on `color.surface.strong`; accent as small text on strong or inverse surfaces.
- White 14-18px regular text on the accent fill.
- Removing outlines; hover-only information; auto-advancing carousels.
- Non-descriptive actions ("Read more", "Explore").

## 7. Migration notes
- Original Sunsure logo animation: replace the inline SVG mark (`.mk-a`, `.mk-b`) with the supplied Lottie/SVG; keep the same trigger points.
- Replace hot-linked images (sunsure-energy.com/wp-content) with self-hosted, compressed copies before launch.
- Confirm: Pailani capacity (30 vs 15 MWp), Solapur 1 status, full testimonial wording, Knowledge Hub article URLs, form endpoint.

## 8. QA checklist
- [ ] axe + manual contrast with real photographs
- [ ] Keyboard-only run of every section, menu on mobile
- [ ] Screen reader pass (NVDA/VoiceOver): chart description, slider value text, form errors
- [ ] 320px, 390px, 768px, 1440px layouts
- [ ] `prefers-reduced-motion` and forced-colors modes
- [ ] Anek Latin loading and fallback
- [ ] Lighthouse performance after self-hosting images
