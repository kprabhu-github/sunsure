import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger';

export interface AboutDeps { gsap: typeof Gsap; ScrollTrigger: typeof ST }
/** Wires the About section's reveals, count-ups and parallax. Returns destroy() for cleanup. */
export function initAbout(el: HTMLElement, deps: AboutDeps): () => void;
