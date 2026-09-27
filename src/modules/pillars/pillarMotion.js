/**
 * Geometry helpers for cinematic pillar title travel / zoom.
 */

/**
 * Delta that places `titleEl` over `navEl` (center-aligned).
 * Caller should reset the title transform to identity before measuring.
 * @param {Element | null} navEl
 * @param {Element | null} titleEl
 * @returns {{ x: number, y: number, scale: number }}
 */
export function measureTitleTravel(navEl, titleEl) {
  if (!navEl || !titleEl) {
    return { x: 0, y: 48, scale: 0.42 };
  }

  const nav = navEl.getBoundingClientRect();
  const title = titleEl.getBoundingClientRect();

  if (!title.width || !title.height) {
    return { x: 0, y: 48, scale: 0.42 };
  }

  const navCx = nav.left + nav.width / 2;
  const navCy = nav.top + nav.height / 2;
  const titleCx = title.left + title.width / 2;
  const titleCy = title.top + title.height / 2;

  return {
    x: navCx - titleCx,
    y: navCy - titleCy,
    scale: Math.min(0.55, Math.max(0.28, nav.height / title.height)),
  };
}

/**
 * Snapshot travel deltas with transforms temporarily cleared.
 * @param {Element | null} navEl
 * @param {HTMLElement | null} titleEl
 * @param {typeof import('gsap').default} gsap
 * @returns {{ x: number, y: number, scale: number }}
 */
export function snapshotTitleTravel(navEl, titleEl, gsap) {
  if (!titleEl || !gsap) {
    return measureTitleTravel(navEl, titleEl);
  }

  const prev = {
    x: gsap.getProperty(titleEl, 'x'),
    y: gsap.getProperty(titleEl, 'y'),
    scale: gsap.getProperty(titleEl, 'scale'),
    autoAlpha: gsap.getProperty(titleEl, 'autoAlpha'),
  };

  gsap.set(titleEl, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
  const travel = measureTitleTravel(navEl, titleEl);
  gsap.set(titleEl, prev);
  return travel;
}

/**
 * Set panel transform-origin to the title's center (percent of panel).
 * @param {HTMLElement | null} panel
 * @param {Element | null} titleEl
 */
export function setZoomOrigin(panel, titleEl) {
  if (!panel || !titleEl) {
    return;
  }

  const panelRect = panel.getBoundingClientRect();
  const titleRect = titleEl.getBoundingClientRect();

  if (!panelRect.width || !panelRect.height) {
    return;
  }

  const ox =
    ((titleRect.left + titleRect.width / 2 - panelRect.left) /
      panelRect.width) *
    100;
  const oy =
    ((titleRect.top + titleRect.height / 2 - panelRect.top) /
      panelRect.height) *
    100;

  panel.style.transformOrigin = `${ox}% ${oy}%`;
}
