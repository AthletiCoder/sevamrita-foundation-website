import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * @param {HTMLElement} card
 */
function createCardTimeline(card) {
  const media = card.querySelector('.da-reveal-card__media');
  const img = media?.querySelector('img');
  const points = card.querySelector('.da-reveal-card__points');
  if (!media || !points) return null;

  // Lock card box so description never grows the section.
  const lockedHeight = card.offsetHeight;
  gsap.set(card, { height: lockedHeight });
  gsap.set(points, { autoAlpha: 0, y: 28, height: 0 });
  if (img) gsap.set(img, { scale: 1 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  });

  tl.to(
    points,
    {
      height: 'auto',
      autoAlpha: 1,
      y: 0,
      duration: 0.48,
    },
    0
  );

  if (img) {
    tl.to(
      img,
      {
        scale: 1.14,
        duration: 0.6,
        ease: 'power2.out',
      },
      0
    );
  }

  return tl;
}

/**
 * Desktop hover + mobile mid-viewport expand for `.da-reveal-card`.
 * @param {ParentNode | null} scope
 * @param {string} [selector]
 * @returns {gsap.MatchMedia | null}
 */
export function bindRevealCards(scope, selector = '.da-reveal-card') {
  if (!scope) return null;

  const cards = Array.from(scope.querySelectorAll(selector));
  if (!cards.length) return null;

  if (prefersReducedMotion()) {
    cards.forEach((card) => {
      const points = card.querySelector('.da-reveal-card__points');
      const img = card.querySelector('.da-reveal-card__media img');
      if (points) gsap.set(points, { clearProps: 'all', autoAlpha: 1, y: 0, height: 'auto' });
      if (img) gsap.set(img, { clearProps: 'all' });
      card.classList.add('is-expanded');
    });
    return null;
  }

  const mm = gsap.matchMedia();

  // Desktop / wide: hover expand
  mm.add('(min-width: 801px) and (hover: hover) and (pointer: fine)', () => {
    const cleanups = cards.map((card) => {
      const tl = createCardTimeline(card);
      if (!tl) return () => {};

      const expand = () => {
        card.classList.add('is-expanded');
        tl.play();
      };
      const collapse = () => {
        card.classList.remove('is-expanded');
        tl.reverse();
      };

      card.addEventListener('mouseenter', expand);
      card.addEventListener('mouseleave', collapse);
      card.addEventListener('focusin', expand);
      card.addEventListener('focusout', collapse);

      return () => {
        card.removeEventListener('mouseenter', expand);
        card.removeEventListener('mouseleave', collapse);
        card.removeEventListener('focusin', expand);
        card.removeEventListener('focusout', collapse);
        tl.kill();
      };
    });

    return () => cleanups.forEach((fn) => fn());
  });

  // Stacked / touch layouts: mid-viewport scroll reveal (same as Mission & Approach)
  mm.add('(max-width: 800px), (hover: none), (pointer: coarse)', () => {
    const triggers = cards
      .map((card) => {
        const tl = createCardTimeline(card);
        if (!tl) return null;

        return ScrollTrigger.create({
          trigger: card,
          start: 'center center',
          end: 'bottom top',
          onEnter: () => {
            card.classList.add('is-expanded');
            tl.play();
          },
          onEnterBack: () => {
            card.classList.add('is-expanded');
            tl.play();
          },
          onLeave: () => {
            card.classList.remove('is-expanded');
            tl.reverse();
          },
          onLeaveBack: () => {
            card.classList.remove('is-expanded');
            tl.reverse();
          },
        });
      })
      .filter(Boolean);

    return () => triggers.forEach((st) => st.kill());
  });

  return mm;
}
