import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven reveal for gallery section headings.
 * Panorama strips handle their own scrub motion separately.
 * @returns {() => void} cleanup
 */
export function initGalleryScroll(root) {
  if (!root) return () => {};

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const ctx = gsap.context(() => {
    const headings = root.querySelectorAll('[data-gallery-heading]');

    if (prefersReducedMotion) {
      gsap.set(headings, { clearProps: 'all', opacity: 1 });
      return;
    }

    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, root);

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('resize', onResize);
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    window.removeEventListener('resize', onResize);
    ctx.revert();
  };
}
