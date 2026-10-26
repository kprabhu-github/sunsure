import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger';

export interface HeroDeps { gsap: typeof Gsap; ScrollTrigger: typeof ST }
/** Wires the hero's intro, slider, autoplay and scroll storytelling. Returns a destroy() for cleanup. */
export function initHero(hero: HTMLElement, deps: HeroDeps): () => void;
