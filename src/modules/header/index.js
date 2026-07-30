import {
  NAV_ITEMS,
  HEADER_ACTIONS,
  HEADER_ACTIONS_ALWAYS_VISIBLE_ROUTES,
  EMPTY_VISIBLE_ACTIONS,
  ALL_VISIBLE_ACTIONS,
} from './data';

export {
  NAV_ITEMS,
  HEADER_ACTIONS,
  HEADER_ACTIONS_ALWAYS_VISIBLE_ROUTES,
  EMPTY_VISIBLE_ACTIONS,
  ALL_VISIBLE_ACTIONS,
};

export function shouldAlwaysShowHeaderActions(pathname) {
  return HEADER_ACTIONS_ALWAYS_VISIBLE_ROUTES.includes(pathname);
}

/**
 * Resolve which header actions should be visible.
 * On always-visible routes: all actions.
 * On home (or pages with action cards): based on scroll past each card under the header.
 * Elsewhere without cards: none (unless always-visible route).
 */
export function resolveVisibleHeaderActions({ pathname, headerBottom = 96 } = {}) {
  if (shouldAlwaysShowHeaderActions(pathname)) {
    return { ...ALL_VISIBLE_ACTIONS };
  }

  const next = { ...EMPTY_VISIBLE_ACTIONS };

  HEADER_ACTIONS.forEach(({ key, selector }) => {
    const card = document.querySelector(selector);
    if (!card) {
      return;
    }
    const rect = card.getBoundingClientRect();
    next[key] = rect.bottom <= headerBottom;
  });

  return next;
}

export function areVisibleActionsEqual(a, b) {
  return (
    a.donation === b.donation &&
    a.volunteer === b.volunteer &&
    a.events === b.events
  );
}
