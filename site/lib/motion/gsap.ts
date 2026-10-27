import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

let registered = false;
/** Idempotent. Call from client effects only. */
export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
}
export { gsap, ScrollTrigger, Flip };
