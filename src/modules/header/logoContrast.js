/**
 * Adaptive header logo contrast from content behind the brand.
 * Returns 'dark' when the backdrop is dark (use light-on-dark logo),
 * or 'light' when the backdrop is light (use dark-on-light logo).
 */

const SAMPLE_COUNT = 5;
const DARK_THRESHOLD = 0.52;

/** @type {WeakMap<HTMLImageElement, HTMLCanvasElement>} */
const imageCanvasCache = new WeakMap();

/**
 * @param {string} color
 * @returns {{ r: number, g: number, b: number, a: number } | null}
 */
function parseCssColor(color) {
  if (!color || color === 'transparent') {
    return null;
  }
  const match = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i
  );
  if (!match) {
    return null;
  }
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

/**
 * @param {{ r: number, g: number, b: number }} rgb
 */
function relativeLuminance({ r, g, b }) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * @param {HTMLImageElement} img
 * @param {number} clientX
 * @param {number} clientY
 * @returns {number | null}
 */
function sampleImageLuminance(img, clientX, clientY) {
  if (!img.complete || img.naturalWidth === 0) {
    return null;
  }

  const rect = img.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) {
    return null;
  }

  const nx = ((clientX - rect.left) / rect.width) * img.naturalWidth;
  const ny = ((clientY - rect.top) / rect.height) * img.naturalHeight;
  if (nx < 0 || ny < 0 || nx > img.naturalWidth || ny > img.naturalHeight) {
    return null;
  }

  try {
    let canvas = imageCanvasCache.get(img);
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      imageCanvasCache.set(img, canvas);
    }
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return null;
    }
    ctx.clearRect(0, 0, 1, 1);
    ctx.drawImage(img, nx, ny, 1, 1, 0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    return relativeLuminance({ r: data[0], g: data[1], b: data[2] });
  } catch {
    // Tainted canvas (cross-origin) — fall back
    return null;
  }
}

/**
 * @param {number} clientX
 * @param {number} clientY
 * @param {Element} brandEl
 * @returns {'dark' | 'light'}
 */
function toneAtPoint(clientX, clientY, brandEl) {
  const stack = document.elementsFromPoint(clientX, clientY);

  for (const node of stack) {
    if (!(node instanceof Element)) {
      continue;
    }
    if (node === brandEl || brandEl.contains(node) || node.closest('.header')) {
      continue;
    }

    const toneAttr = node.closest('[data-nav-tone]')?.getAttribute('data-nav-tone');
    if (toneAttr === 'dark' || toneAttr === 'light') {
      return toneAttr;
    }

    if (node instanceof HTMLImageElement) {
      const lum = sampleImageLuminance(node, clientX, clientY);
      if (lum !== null) {
        return lum < DARK_THRESHOLD ? 'dark' : 'light';
      }
      // Unreadable image — prefer dark-safe logo over photos
      return 'dark';
    }

    const style = window.getComputedStyle(node);
    const bgImage = style.backgroundImage;
    if (bgImage && bgImage !== 'none') {
      // Gradient / photo backgrounds are usually dark enough to need light logo
      // unless explicitly marked; check solid fallback first.
    }

    const bg = parseCssColor(style.backgroundColor);
    if (bg && bg.a > 0.4) {
      return relativeLuminance(bg) < DARK_THRESHOLD ? 'dark' : 'light';
    }
  }

  const themeDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return themeDark ? 'dark' : 'light';
}

/**
 * @param {Element} brandEl
 * @returns {'dark' | 'light'}
 */
export function detectNavBackdropTone(brandEl) {
  const header = brandEl.closest('.header');
  // When the frosted bar is visible, the logo sits on a light glass surface.
  if (header && !header.classList.contains('header--hidden')) {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light';
  }

  const rect = brandEl.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) {
    return 'light';
  }

  const y = rect.top + rect.height * 0.55;
  let darkVotes = 0;

  for (let i = 0; i < SAMPLE_COUNT; i += 1) {
    const t = (i + 0.5) / SAMPLE_COUNT;
    const x = rect.left + rect.width * t;
    if (toneAtPoint(x, y, brandEl) === 'dark') {
      darkVotes += 1;
    }
  }

  return darkVotes >= Math.ceil(SAMPLE_COUNT / 2) ? 'dark' : 'light';
}

/**
 * Keeps `.header--over-dark` / `.header--over-light` in sync with backdrop.
 * @param {HTMLElement | null} headerEl
 * @returns {() => void} cleanup
 */
export function createLogoContrast(headerEl) {
  if (!headerEl) {
    return () => {};
  }

  const brand = headerEl.querySelector('.navbar-brand');
  if (!brand) {
    return () => {};
  }

  let raf = 0;
  let lastTone = '';

  const apply = () => {
    raf = 0;
    const tone = detectNavBackdropTone(brand);
    if (tone === lastTone) {
      return;
    }
    lastTone = tone;
    headerEl.classList.toggle('header--over-dark', tone === 'dark');
    headerEl.classList.toggle('header--over-light', tone === 'light');
  };

  const schedule = () => {
    if (raf) {
      return;
    }
    raf = window.requestAnimationFrame(apply);
  };

  apply();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('themechange', schedule);

  // Theme toggles + chrome hide/show change what sits behind the logo
  const attrObserver = new MutationObserver(schedule);
  attrObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  attrObserver.observe(headerEl, {
    attributes: true,
    attributeFilter: ['class'],
  });

  return () => {
    if (raf) {
      window.cancelAnimationFrame(raf);
    }
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    document.removeEventListener('themechange', schedule);
    attrObserver.disconnect();
    headerEl.classList.remove('header--over-dark', 'header--over-light');
  };
}
