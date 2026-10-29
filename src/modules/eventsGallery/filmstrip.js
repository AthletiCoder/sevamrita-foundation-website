import gsap from 'gsap';

/** Idle filmstrip drift (px / sec) */
const MARQUEE_SPEED = 9;
/** Center-biggest falloff strength */
const DEPTH_STRENGTH = 0.38;

/**
 * Slow infinite filmstrip with panoramic depth (center largest).
 * @param {{
 *   track: HTMLElement,
 *   reverse?: boolean,
 *   isPaused?: () => boolean,
 * }} options
 */
export function createFilmstrip({ track, reverse = false, isPaused = () => false }) {
  let x = 0;
  let clonesReady = false;
  let tickerFn = null;

  const measureSetWidth = () => {
    const originals = [
      ...track.querySelectorAll('[data-hall-item]:not([data-hall-clone])'),
    ];
    if (!originals.length) return 0;
    const gap =
      parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) ||
      0;
    let width = 0;
    originals.forEach((el) => {
      width += el.offsetWidth;
    });
    return width + gap * Math.max(0, originals.length - 1);
  };

  const ensureLoopCopies = () => {
    if (clonesReady) return;
    const originals = [
      ...track.querySelectorAll('[data-hall-item]:not([data-hall-clone])'),
    ];
    if (!originals.length) return;
    for (let c = 0; c < 2; c += 1) {
      originals.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.dataset.hallClone = 'true';
        clone.setAttribute('tabindex', '-1');
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }
    clonesReady = true;
  };

  const wrapX = (setWidth) => {
    if (setWidth <= 0) return;
    if (reverse) {
      while (x >= 0) x -= setWidth;
      while (x < -setWidth) x += setWidth;
    } else {
      while (x <= -setWidth) x += setWidth;
      while (x > 0) x -= setWidth;
    }
  };

  const applyDepth = () => {
    const viewCenter = window.innerWidth / 2;
    track.querySelectorAll('[data-hall-item]').forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.right < -48 || rect.left > window.innerWidth + 48) {
        gsap.set(item, { scale: 0.78, opacity: 0.45 });
        return;
      }
      const mid = rect.left + rect.width / 2;
      const norm = gsap.utils.clamp(
        0,
        1,
        Math.abs(mid - viewCenter) / (viewCenter * 0.9)
      );
      gsap.set(item, {
        scale: 1 - norm * DEPTH_STRENGTH,
        opacity: 1 - norm * 0.35,
        transformOrigin: '50% 50%',
        force3D: true,
      });
    });
  };

  const applyX = () => {
    gsap.set(track, { x, yPercent: -50, force3D: true });
  };

  ensureLoopCopies();
  x = reverse ? -measureSetWidth() : 0;
  applyX();
  applyDepth();

  tickerFn = (_t, deltaTime) => {
    if (isPaused()) {
      applyDepth();
      return;
    }
    const setWidth = measureSetWidth();
    if (setWidth > 0) {
      const step = MARQUEE_SPEED * (deltaTime / 60);
      x += reverse ? step : -step;
      wrapX(setWidth);
      applyX();
    }
    applyDepth();
  };
  gsap.ticker.add(tickerFn);

  return {
    destroy() {
      if (tickerFn) gsap.ticker.remove(tickerFn);
    },
  };
}
