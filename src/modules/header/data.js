/**
 * Header action buttons configuration.
 * On the landing page, buttons appear as hero action cards scroll under the header.
 * On listed routes, all actions stay visible in the header at all times.
 */

export const HEADER_ACTIONS = [
  {
    key: 'events',
    selector: '.action-card--events',
    icon: 'fas fa-calendar-alt',
    label: 'Join Events',
    shortLabel: 'Events',
    action: 'events',
    path: '/events-calender',
  },
  {
    key: 'donation',
    selector: '.action-card--donation',
    icon: 'fas fa-hand-holding-heart',
    label: 'Offer Donation',
    shortLabel: 'Donate',
    action: 'donate',
    path: '/contribute',
  },
  {
    key: 'volunteer',
    selector: '.action-card--volunteer',
    icon: 'fas fa-users',
    label: 'Become Volunteer',
    shortLabel: 'Volunteer',
    action: 'volunteer',
    path: null,
  },
];

/** Routes where header actions are always visible (not scroll-gated). */
export const HEADER_ACTIONS_ALWAYS_VISIBLE_ROUTES = [
  '/team',
  '/story',
  '/whatwedo',
  '/contribute',
  '/events-calender',
];

export const EMPTY_VISIBLE_ACTIONS = {
  donation: false,
  volunteer: false,
  events: false,
};

export const ALL_VISIBLE_ACTIONS = {
  donation: true,
  volunteer: true,
  events: true,
};
