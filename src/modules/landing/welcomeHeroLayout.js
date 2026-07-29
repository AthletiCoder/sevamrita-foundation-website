/**
 * Welcome-hero layout math (desktop squeeze → portrait full-bleed).
 *
 * 1. Design (wide): fixed design scale + right margin (action-card center align).
 *    Used while left margin >= right margin.
 * 2. Squeeze: when design would make left < right, scale DOWN and shrink
 *    equal side margins together.
 * 3. Full-bleed: when viewport aspect ratio hits 9:16 (or narrower),
 *    image width = viewport width and margins = 0.
 */

export const WELCOME_HERO_LAYOUT = {
  /** Portrait aspect (width:height) at which the image goes full-bleed */
  fullBleedAspect: 9 / 16,
  containerMax: 1280,
  containerPadPx: 16, // --spacing-md
  actionStackWidth: 269,
  /** Cap matching ~1.08× of the prior 800×720 desktop size */
  maxWidthPx: 864,
  maxHeightPx: 778,
  maxViewportFraction: 0.864,
  naturalWidth: 1193,
  naturalHeight: 880,
};

function designRightMargin(viewportWidth, config) {
  const gutter = Math.max(0, (viewportWidth - config.containerMax) / 2);
  return gutter + config.containerPadPx + config.actionStackWidth / 2;
}

function designImageSize(viewportWidth, viewportHeight, config) {
  const maxW = Math.min(
    config.maxWidthPx,
    config.maxViewportFraction * viewportWidth,
  );
  const maxH = Math.min(
    config.maxHeightPx,
    config.maxViewportFraction * viewportHeight,
  );
  const scale = Math.min(
    maxW / config.naturalWidth,
    maxH / config.naturalHeight,
  );
  return {
    width: config.naturalWidth * scale,
    height: config.naturalHeight * scale,
    scale,
  };
}

/** Viewport width at which aspect is exactly 9:16 for the current height. */
function fullBleedWidth(viewportHeight, config) {
  return viewportHeight * config.fullBleedAspect;
}

/**
 * Narrowest viewport where design left margin >= design right margin.
 * Below this, design scale would make left < right (start of squeeze).
 */
function findEqualMarginViewportWidth(viewportHeight, config) {
  const bleedW = fullBleedWidth(viewportHeight, config);
  let lo = bleedW;
  let hi = Math.max(config.containerMax * 2, 2400);
  let found = hi;

  for (let i = 0; i < 28; i += 1) {
    const mid = (lo + hi) / 2;
    const mr = designRightMargin(mid, config);
    const { width: iw } = designImageSize(mid, viewportHeight, config);
    const ml = mid - mr - iw;
    if (ml >= mr) {
      found = mid;
      hi = mid;
    } else {
      lo = mid;
    }
  }

  return found;
}

/**
 * @param {number} viewportWidth
 * @param {number} viewportHeight
 * @param {Partial<typeof WELCOME_HERO_LAYOUT>} [overrides]
 * @returns {{
 *   mode: 'fullBleed' | 'design' | 'squeeze',
 *   width: number,
 *   height: number,
 *   marginRight: number,
 *   marginLeft: number,
 *   scale: number,
 *   equalViewportWidth: number,
 *   fullBleedViewportWidth: number,
 * }}
 */
export function calculateWelcomeHeroLayout(
  viewportWidth,
  viewportHeight,
  overrides = {},
) {
  const config = { ...WELCOME_HERO_LAYOUT, ...overrides };
  const { naturalWidth, naturalHeight, fullBleedAspect } = config;
  const bleedW = fullBleedWidth(viewportHeight, config);
  const aspect = viewportHeight > 0 ? viewportWidth / viewportHeight : 1;

  // 9:16 or narrower → width matches the screen.
  if (aspect <= fullBleedAspect + 1e-6) {
    const width = viewportWidth;
    const height = width * (naturalHeight / naturalWidth);
    return {
      mode: 'fullBleed',
      width,
      height,
      marginRight: 0,
      marginLeft: 0,
      scale: width / naturalWidth,
      equalViewportWidth: findEqualMarginViewportWidth(viewportHeight, config),
      fullBleedViewportWidth: bleedW,
    };
  }

  const equalViewportWidth = findEqualMarginViewportWidth(viewportHeight, config);
  const design = designImageSize(viewportWidth, viewportHeight, config);
  const designMr = designRightMargin(viewportWidth, config);
  const designMl = viewportWidth - designMr - design.width;

  // Room enough: design right margin + design scale (left >= right).
  if (viewportWidth >= equalViewportWidth && designMl >= designMr - 0.5) {
    return {
      mode: 'design',
      width: design.width,
      height: design.height,
      marginRight: designMr,
      marginLeft: designMl,
      scale: design.scale,
      equalViewportWidth,
      fullBleedViewportWidth: bleedW,
    };
  }

  // Squeeze: scale DOWN from equal-margin size → full-bleed width at 9:16.
  // Image width lerps Iw_eq → bleedW (monotonic shrink). Side margins stay equal.
  const atEqual = designImageSize(equalViewportWidth, viewportHeight, config);
  const iwEq = atEqual.width;
  const span = Math.max(1, equalViewportWidth - bleedW);
  const t = Math.min(1, Math.max(0, (viewportWidth - bleedW) / span));

  let width = t * iwEq + (1 - t) * bleedW;

  // Never exceed current viewport; keep equal side margins.
  width = Math.min(width, viewportWidth);
  let marginRight = Math.max(0, (viewportWidth - width) / 2);

  // Honor height cap while keeping margins equal.
  const maxH = Math.min(
    config.maxHeightPx,
    config.maxViewportFraction * viewportHeight,
  );
  const heightIfWidth = width * (naturalHeight / naturalWidth);
  if (heightIfWidth > maxH) {
    width = maxH * (naturalWidth / naturalHeight);
    marginRight = Math.max(0, (viewportWidth - width) / 2);
  }

  const height = width * (naturalHeight / naturalWidth);
  const marginLeft = viewportWidth - marginRight - width;

  return {
    mode: 'squeeze',
    width,
    height,
    marginRight,
    marginLeft,
    scale: width / naturalWidth,
    equalViewportWidth,
    fullBleedViewportWidth: bleedW,
  };
}
