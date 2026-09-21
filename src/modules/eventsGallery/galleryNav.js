import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky gallery nav: section progress fills + active key updates on scroll.
 * @returns {() => void} cleanup
 */
export function initGalleryNav({
  root,
  nav,
  sections,
  onActiveChange,
}) {
  if (!root || !nav || !sections?.length) return () => {};

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const fills = new Map();
  sections.forEach((section) => {
    const key = section.dataset.gallerySection;
    const fill = nav.querySelector(`[data-nav-progress="${key}"]`);
    if (fill) fills.set(key, fill);
  });

  const setProgress = (key, progress) => {
    const fill = fills.get(key);
    if (!fill) return;
    const clamped = Math.min(1, Math.max(0, progress));
    fill.style.transform = `scaleX(${clamped})`;
  };

  const ctx = gsap.context(() => {
    sections.forEach((section) => {
      const key = section.dataset.gallerySection;

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) onActiveChange?.(key);
        },
        onUpdate: (self) => {
          if (!prefersReducedMotion) setProgress(key, self.progress);
        },
        onLeave: () => setProgress(key, 1),
        onLeaveBack: () => setProgress(key, 0),
      });
    });

    // Seed first section as active on load
    onActiveChange?.(sections[0]?.dataset.gallerySection);
  }, root);

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('resize', onResize);
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    window.removeEventListener('resize', onResize);
    ctx.revert();
  };
}
