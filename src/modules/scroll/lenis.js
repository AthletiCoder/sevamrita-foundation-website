import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

/** @type {import('lenis').default | null} */
let activeLenis = null;

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Shared smooth-scroll instance synced with GSAP ScrollTrigger.
 * Call once per page mount; destroy on unmount.
 * @param {{
 *   duration?: number,
 *   wheelMultiplier?: number,
 *   touchMultiplier?: number,
 * }} [options]
 * @returns {{ instance: import('lenis').default, destroy: () => void } | null}
 */
export function createSmoothScroll(options = {}) {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return null;
  }

  const {
    duration = 1.1,
    wheelMultiplier = 1,
    touchMultiplier = 1,
  } = options;

  const lenis = new Lenis({
    duration,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier,
    touchMultiplier,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  activeLenis = lenis;
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return {
    instance: lenis,
    destroy() {
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (activeLenis === lenis) {
        activeLenis = null;
      }
      ScrollTrigger.refresh();
    },
  };
}

/** Active Lenis instance for the current page, if any. */
export function getSmoothScroll() {
  return activeLenis;
}

/**
 * Scroll the window/document to a Y position via Lenis when available.
 * @param {number} y
 * @param {{ duration?: number, immediate?: boolean }} [options]
 */
export function scrollWindowTo(y, options = {}) {
  const { duration = 1.2, immediate = false } = options;
  const lenis = activeLenis;

  if (lenis) {
    lenis.scrollTo(y, { duration: immediate ? 0 : duration, immediate });
    return;
  }

  window.scrollTo({
    top: y,
    behavior: immediate ? 'auto' : 'smooth',
  });
}

/** @deprecated Prefer createSmoothScroll — kept for de-addiction call sites */
export const createCampaignLenis = createSmoothScroll;
