import gsap from 'gsap';
import { getSmoothScroll } from '../scroll';

const HOLD_MS = 3000;
const EXIT_THRESHOLD = 140;

/**
 * Active cinematic mode: 3-up panoramic view, timed advances,
 * side clicks, progress pause-on-hover, edge-scroll to exit.
 *
 * @param {{
 *   hall: HTMLElement,
 *   images: { src: string, alt: string }[],
 *   onExit: () => void,
 * }} options
 */
export function createCinemaMode({ hall, images, onExit }) {
  const cinema = hall.querySelector('[data-cinema]');
  const slotPrev = hall.querySelector('[data-cinema-slot="prev"]');
  const slotCurrent = hall.querySelector('[data-cinema-slot="current"]');
  const slotNext = hall.querySelector('[data-cinema-slot="next"]');
  const progressFill = hall.querySelector('[data-cinema-progress-fill]');
  const progressHit = hall.querySelector('[data-cinema-progress]');
  const btnPrev = hall.querySelector('[data-cinema-prev]');
  const btnNext = hall.querySelector('[data-cinema-next]');
  const stretchLeft = hall.querySelector('[data-exit-stretch="left"]');
  const stretchRight = hall.querySelector('[data-exit-stretch="right"]');

  if (!cinema || !slotCurrent || !images.length) {
    return { destroy() {} };
  }

  let index = 0;
  let elapsed = 0;
  let paused = false;
  let transitioning = false;
  let exitAccum = 0;
  let exitSide = null;
  let tickerFn = null;
  let alive = true;
  let slideTween = null;

  const len = images.length;
  const at = (i) => images[((i % len) + len) % len];

  const paintSlot = (el, image) => {
    if (!el) return;
    const img = el.querySelector('img');
    if (img) {
      img.src = image.src;
      img.alt = image.alt || '';
    }
  };

  const renderSlots = () => {
    paintSlot(slotPrev, at(index - 1));
    paintSlot(slotCurrent, at(index));
    paintSlot(slotNext, at(index + 1));
  };

  const setProgress = (t) => {
    if (progressFill) {
      progressFill.style.transform = `scaleX(${gsap.utils.clamp(0, 1, t)})`;
    }
  };

  const setExitVisual = () => {
    const amount = gsap.utils.clamp(0, 1, exitAccum / EXIT_THRESHOLD);
    hall.style.setProperty('--exit-stretch', String(amount));
    hall.dataset.exitSide = exitSide || '';
    stretchLeft?.classList.toggle('is-hot', exitSide === 'left' && amount > 0.02);
    stretchRight?.classList.toggle('is-hot', exitSide === 'right' && amount > 0.02);
    if (stretchLeft) {
      stretchLeft.style.setProperty('--fill', String(exitSide === 'left' ? amount : 0));
    }
    if (stretchRight) {
      stretchRight.style.setProperty('--fill', String(exitSide === 'right' ? amount : 0));
    }
  };

  const resetSlotTransforms = () => {
    gsap.set(slotPrev, { x: 0, rotateY: 32, scale: 0.78, opacity: 0.72, z: 0 });
    gsap.set(slotCurrent, { x: 0, rotateY: 0, scale: 1, opacity: 1, z: 48 });
    gsap.set(slotNext, { x: 0, rotateY: -32, scale: 0.78, opacity: 0.72, z: 0 });
  };

  const goTo = (nextIndex, direction = 1) => {
    if (transitioning || !alive || len < 2) return;
    transitioning = true;
    elapsed = 0;
    setProgress(0);
    slideTween?.kill();

    const shift = direction >= 0 ? -1 : 1;

    slideTween = gsap.timeline({
      defaults: { duration: 0.7, ease: 'power2.inOut' },
      onComplete: () => {
        index = ((nextIndex % len) + len) % len;
        renderSlots();
        resetSlotTransforms();
        transitioning = false;
      },
    });

    slideTween.to(
      slotPrev,
      {
        xPercent: 55 * shift,
        opacity: 0.2,
        scale: 0.7,
        rotateY: 32 + 20 * shift,
      },
      0
    );
    slideTween.to(
      slotCurrent,
      {
        xPercent: 55 * shift,
        scale: 0.82,
        rotateY: 28 * shift,
        opacity: 0.75,
        z: 0,
      },
      0
    );
    slideTween.to(
      slotNext,
      {
        xPercent: 55 * shift,
        opacity: 0.2,
        scale: 0.7,
        rotateY: -32 + 20 * shift,
      },
      0
    );
  };

  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  renderSlots();
  resetSlotTransforms();
  setProgress(0);
  setExitVisual();

  tickerFn = (_t, deltaTime) => {
    if (!alive) return;

    // Soft decay of exit stretch
    if (exitAccum > 0) {
      exitAccum *= 0.978;
      if (exitAccum < 0.6) {
        exitAccum = 0;
        exitSide = null;
      }
      setExitVisual();
    }

    if (paused || transitioning) return;

    const msStep = deltaTime * (1000 / 60);
    elapsed += msStep;
    setProgress(elapsed / HOLD_MS);
    if (elapsed >= HOLD_MS) next();
  };
  gsap.ticker.add(tickerFn);

  const onProgressEnter = () => {
    paused = true;
    progressHit?.classList.add('is-paused');
  };
  const onProgressLeave = () => {
    paused = false;
    progressHit?.classList.remove('is-paused');
  };

  const onPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    prev();
  };
  const onNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    next();
  };

  const onWheel = (event) => {
    if (!alive) return;
    const rect = hall.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const edge = Math.max(72, rect.width * 0.16);
    const onLeft = relX < edge;
    const onRight = relX > rect.width - edge;
    if (!onLeft && !onRight) return;

    event.preventDefault();
    event.stopPropagation();
    getSmoothScroll()?.stop();

    exitSide = onLeft ? 'left' : 'right';
    exitAccum += Math.abs(event.deltaY) + Math.abs(event.deltaX) * 0.45;
    // Hold decay off while actively scrolling — bump then set visual
    exitAccum = Math.min(exitAccum, EXIT_THRESHOLD * 1.15);
    setExitVisual();

    if (exitAccum >= EXIT_THRESHOLD) {
      exitAccum = 0;
      getSmoothScroll()?.start();
      onExit?.();
    }
  };

  const onKey = (e) => {
    if (!alive) return;
    if (e.key === 'Escape') onExit?.();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  progressHit?.addEventListener('pointerenter', onProgressEnter);
  progressHit?.addEventListener('pointerleave', onProgressLeave);
  btnPrev?.addEventListener('click', onPrev);
  btnNext?.addEventListener('click', onNext);
  hall.addEventListener('wheel', onWheel, { passive: false, capture: true });
  window.addEventListener('keydown', onKey);

  cinema.hidden = false;
  cinema.setAttribute('aria-hidden', 'false');

  return {
    destroy() {
      alive = false;
      slideTween?.kill();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      progressHit?.removeEventListener('pointerenter', onProgressEnter);
      progressHit?.removeEventListener('pointerleave', onProgressLeave);
      btnPrev?.removeEventListener('click', onPrev);
      btnNext?.removeEventListener('click', onNext);
      hall.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('keydown', onKey);
      getSmoothScroll()?.start();
      cinema.hidden = true;
      cinema.setAttribute('aria-hidden', 'true');
      exitAccum = 0;
      exitSide = null;
      setExitVisual();
      setProgress(0);
    },
  };
}
