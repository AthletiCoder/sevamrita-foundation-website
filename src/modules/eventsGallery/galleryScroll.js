import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven zoom / reveal for gallery sections and image tiles.
 * @returns {() => void} cleanup
 */
export function initGalleryScroll(root) {
  if (!root) return () => {};

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const ctx = gsap.context(() => {
    const sections = root.querySelectorAll('[data-gallery-section]');
    const tiles = root.querySelectorAll('[data-gallery-tile]');

    if (prefersReducedMotion) {
      gsap.set([sections, tiles], { clearProps: 'all', opacity: 1 });
      return;
    }

    sections.forEach((section) => {
      const heading = section.querySelector('[data-gallery-heading]');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    tiles.forEach((tile) => {
      const media = tile.querySelector('img');
      if (!media) return;

      gsap.fromTo(
        tile,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tile,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        media,
        { scale: 1.18 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: tile,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
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
