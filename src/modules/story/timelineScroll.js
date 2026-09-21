import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Moves a year marker along the timeline line and updates the active year
 * as each journey milestone crosses the viewport center.
 *
 * @returns {() => void} cleanup
 */
export function initTimelineYearScroll({
  container,
  marker,
  progressFill,
  items,
  years,
  onYearChange,
}) {
  if (!container || !marker || !items?.length) {
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const ctx = gsap.context(() => {
    const getTravelDistance = () =>
      Math.max(0, container.offsetHeight - marker.offsetHeight);

    const setProgress = (progress) => {
      const clamped = Math.min(1, Math.max(0, progress));
      gsap.set(marker, { y: clamped * getTravelDistance() });
      if (progressFill) {
        gsap.set(progressFill, { scaleY: clamped });
      }
    };

    setProgress(0);
    onYearChange?.(years[0]);

    if (prefersReducedMotion) {
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive) {
              onYearChange?.(years[index]);
              setProgress(index / Math.max(1, items.length - 1));
            }
          },
        });
      });
      return;
    }

    gsap.fromTo(
      marker,
      { y: 0 },
      {
        y: () => getTravelDistance(),
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressFill) {
              gsap.set(progressFill, { scaleY: self.progress });
            }
          },
        },
      }
    );

    items.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => onYearChange?.(years[index]),
        onEnterBack: () => onYearChange?.(years[index]),
      });
    });
  }, container);

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('resize', onResize);

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    window.removeEventListener('resize', onResize);
    ctx.revert();
  };
}
