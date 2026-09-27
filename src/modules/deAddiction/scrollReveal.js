import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './lenis';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FROM = { opacity: 0, y: 48 };

/**
 * Reveal elements one-by-one as they enter the viewport.
 * @param {Element[] | NodeList | string} targets
 * @param {{
 *   scope?: Element | null,
 *   from?: gsap.TweenVars,
 *   start?: string,
 *   duration?: number,
 *   ease?: string,
 * }} [options]
 */
export function revealOnScroll(targets, options = {}) {
  const elements =
    typeof targets === 'string'
      ? Array.from((options.scope || document).querySelectorAll(targets))
      : Array.from(targets);

  if (!elements.length) return;

  if (prefersReducedMotion()) {
    gsap.set(elements, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  const {
    from = DEFAULT_FROM,
    start = 'top 88%',
    duration = 0.85,
    ease = 'power3.out',
  } = options;

  gsap.set(elements, from);

  elements.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });
  });
}

/**
 * Staggered step reveal for a vertical path (awareness → action).
 * @param {Element} container
 * @param {string} stepSelector
 */
export function revealSteps(container, stepSelector = '.da-path__step') {
  if (!container) return;

  const steps = container.querySelectorAll(stepSelector);
  if (!steps.length) return;

  if (prefersReducedMotion()) {
    gsap.set(steps, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.set(steps, { opacity: 0, y: 36 });

  gsap.to(steps, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.22,
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });
}
