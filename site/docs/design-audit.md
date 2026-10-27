# Design audit of the rejected build (26 Oct 2026)

Honest critique of the "Conductor" implementation, based on the actual screenshots.

## Why it looks generic
1. **Hero is half empty.** The headline sits on a flat beige field and the only photograph is a thin curved strip at the bottom. The strongest asset (a sunrise over a solar plant) is shrunk to decoration.
2. **One typeface voice everywhere.** A single bold grotesque at similar sizes on every section; hierarchy comes from size alone. No editorial contrast (e.g. serif vs mono vs sans), so every section reads the same.
3. **Photography is nearly absent.** Only 3 real photos exist; the build uses them in two places and otherwise relies on type. Sections 4–10 have no image treatment at all, so the page feels like a text document.
4. **Beige on beige.** Paper, paper-2 and paper-0 backgrounds differ by a few percent, so section changes are invisible. Rhythm comes only from hairlines.
5. **Red is spent on trivia.** The accent appears as tiny dashes, "+" suffixes and bullets, not as a deliberate colour field or focal point.
6. **Large dead areas.** Projects header and Customers header leave the right half empty with no purpose; filters render as many dashed, greyed pills (9 states, 6 technologies) of which most are disabled, which is noisy and low-value.
7. **Cards are standard.** Content cards and solution cards are bordered boxes with a small hover shift; nothing is specific to energy or to Sunsure.
8. **Customer proof is a marquee of names** at display size; legible but without any structure, and the testimonial slot is a dashed "placeholder" box.
9. **Inner pages are thin templates.** Hero + text + grey cards, no image, no rhythm.

## UX / motion weaknesses
- The cable/catenary hero line is a clever idea but reads as a decorative curve; it removes space from the headline and photo.
- Pinned Energy Network section is a long scroll for four sentences; its diagram is small and abstract.
- Count-ups and mask reveals are applied almost everywhere, so none feels meaningful.
- Header dropdowns are fine functionally, but visually identical to a template.

## Constraints that any new direction must respect
- Only four distinct approved photographs (solar sunrise, wind sunrise, robotic cleaning, plus a transparent S-mark composite). Art direction must come from crop, colour treatment and composition, not from more photos.
- Verified content only: no invented stats, testimonials, project photos or map data.
