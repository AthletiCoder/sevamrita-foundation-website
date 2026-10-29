import gsap from 'gsap';
import { createFilmstrip } from './filmstrip';
import { createCinemaMode } from './cinemaMode';

const FOCUS_LERP = 0.08;

/**
 * Gallery sections: inactive tiny filmstrips (alternating drift + panoramic depth).
 * Hover a section to activate cinematic 3-up mode; edge-scroll to exit.
 *
 * @param {HTMLElement} root
 * @returns {() => void}
 */
export function initPanoramaGalleries(root) {
  if (!root) return () => {};

  const sections = [...root.querySelectorAll('[data-gallery-section]')];
  if (!sections.length) return () => {};

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /** @type {{ deactivate: () => void } | null} */
  let activeApi = null;

  const cleanups = sections.map((section, index) =>
    initOneSection(section, index, prefersReducedMotion, {
      getActive: () => activeApi,
      setActive: (api) => {
        activeApi = api;
      },
    })
  );

  return () => {
    activeApi?.deactivate();
    activeApi = null;
    cleanups.forEach((fn) => fn());
  };
}

/**
 * @param {HTMLElement} section
 * @param {number} index
 * @param {boolean} prefersReducedMotion
 * @param {{ getActive: () => any, setActive: (api: any) => void }} coordinator
 */
function initOneSection(section, index, prefersReducedMotion, coordinator) {
  const hall = section.querySelector('[data-panorama-gallery]');
  const track = section.querySelector('[data-hall-track]');
  const film = section.querySelector('[data-filmstrip]');
  if (!hall || !track) return () => {};

  const reverse = index % 2 === 1;
  section.dataset.panoramaDir = reverse ? 'rtl' : 'ltr';

  const images = [
    ...track.querySelectorAll('[data-hall-item]:not([data-hall-clone])'),
  ].map((btn) => {
    const img = btn.querySelector('img');
    return {
      src: img?.currentSrc || img?.src || '',
      alt: img?.alt || '',
    };
  }).filter((img) => img.src);

  let focusCurrent = 0;
  let focusTarget = 0;
  let isActive = false;
  let cinema = null;
  let focusTicker = null;
  let filmstrip = null;
  let hoverTimer = null;

  const writeFocus = (focus) => {
    const f = gsap.utils.clamp(0, 1, focus);
    hall.style.setProperty('--focus', String(f));
    section.style.setProperty('--section-focus', String(f));
    section.classList.toggle('is-active', isActive);
    hall.classList.toggle('is-active', isActive);
  };

  const deactivate = () => {
    if (!isActive) return;
    isActive = false;
    focusTarget = 0;
    cinema?.destroy();
    cinema = null;
    film?.removeAttribute('hidden');
    writeFocus(focusCurrent);
    if (coordinator.getActive()?.section === section) {
      coordinator.setActive(null);
    }
  };

  const activate = () => {
    if (isActive || !images.length) return;

    const current = coordinator.getActive();
    if (current && current.section !== section) {
      current.deactivate();
    }

    isActive = true;
    focusTarget = 1;
    film?.setAttribute('hidden', '');
    cinema = createCinemaMode({
      hall,
      images,
      onExit: deactivate,
    });
    coordinator.setActive({ section, deactivate });
    writeFocus(focusCurrent);
  };

  if (prefersReducedMotion) {
    hall.classList.add('is-reduced-motion');
    writeFocus(0);
    return () => {};
  }

  filmstrip = createFilmstrip({
    track,
    reverse,
    isPaused: () => isActive,
  });

  focusTicker = (_t, deltaTime) => {
    const lerp = 1 - Math.pow(1 - FOCUS_LERP, deltaTime || 1);
    focusCurrent += (focusTarget - focusCurrent) * lerp;
    if (Math.abs(focusTarget - focusCurrent) < 0.001) focusCurrent = focusTarget;
    writeFocus(focusCurrent);
  };
  gsap.ticker.add(focusTicker);
  writeFocus(0);

  const onEnter = () => {
    if (isActive) return;
    window.clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(() => activate(), 180);
  };

  const onLeave = (event) => {
    // Still inside section (moving between children) — ignore
    if (event.relatedTarget && section.contains(event.relatedTarget)) return;
    window.clearTimeout(hoverTimer);
    hoverTimer = null;
  };

  section.addEventListener('pointerenter', onEnter);
  section.addEventListener('pointerleave', onLeave);

  return () => {
    window.clearTimeout(hoverTimer);
    section.removeEventListener('pointerenter', onEnter);
    section.removeEventListener('pointerleave', onLeave);
    if (focusTicker) gsap.ticker.remove(focusTicker);
    cinema?.destroy();
    filmstrip?.destroy();
    if (coordinator.getActive()?.section === section) {
      coordinator.setActive(null);
    }
  };
}
