/**
 * Enter / exit motion variants for the testimonials spotlight.
 * One is picked at random per slide (avoids immediate repeats).
 */

export const MOTION_IDS = ['from-top', 'from-side', 'zoom', 'page-turn'];

/** Side direction only used when motion is `from-side`. */
export function pickSide(exclude) {
  const sides = ['left', 'right'].filter((side) => side !== exclude);
  return sides[Math.floor(Math.random() * sides.length)];
}

export function pickMotion(excludeId) {
  const pool = MOTION_IDS.filter((id) => id !== excludeId);
  const choices = pool.length > 0 ? pool : MOTION_IDS;
  return choices[Math.floor(Math.random() * choices.length)];
}

export function createMotionState(previous = null) {
  const id = pickMotion(previous?.id);
  const side =
    id === 'from-side' ? pickSide(previous?.side) : null;

  return { id, side };
}
