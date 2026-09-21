/**
 * Header action buttons configuration.
 * On the landing page, buttons appear as hero action cards scroll under the header.
 * On listed routes, all actions stay visible in the header at all times.
 */

/**
 * Main navbar items.
 * `children` renders as a dropdown (hover on desktop, inline in the mobile menu).
 * `path: null` means the item has no destination yet (placeholder).
 */
export const NAV_ITEMS = [
  {
    key: 'who-we-are',
    label: 'Who we are',
    path: '/',
    icon: 'fas fa-users',
    children: [
      { key: 'our-team', label: 'Our Team', path: '/team', icon: 'fas fa-user-group' },
      { key: 'our-journey', label: 'Our Journey', path: '/story', icon: 'fas fa-route' },
      { key: 'contact-us', label: 'Contact Us', path: '/contact', icon: 'fas fa-envelope' },
    ],
  },
  {
    key: 'what-we-do',
    label: 'What we do',
    path: '/whatwedo',
    icon: 'fas fa-hands-helping',
    children: [
      { key: 'six-pillars', label: 'Six Pillars', path: '/whatwedo', icon: 'fas fa-table-cells-large' },
      {
        key: 'events',
        label: 'Events',
        path: '/events/social',
        icon: 'fas fa-calendar-alt',
        children: [
          { key: 'social-media', label: 'Social media', path: '/events/social#social-media', icon: 'fas fa-share-nodes' },
          { key: 'news', label: 'News', path: '/events/social#news', icon: 'fas fa-newspaper' },
          { key: 'gallery', label: 'Gallery', path: '/events/gallery', icon: 'fas fa-images' },
        ],
      },
      { key: 'testimonials', label: 'Testimonials', path: '/testimonials', icon: 'fas fa-comment-dots' },
    ],
  },
  {
    key: 'why-we-do',
    label: 'Why we do',
    path: '/whywedo',
    icon: 'fas fa-compass',
    children: [
      { key: 'vision', label: 'Vision', path: '/whywedo#vision', icon: 'fas fa-eye' },
      { key: 'mission', label: 'Mission', path: '/whywedo#mission', icon: 'fas fa-bullseye' },
      { key: 'core-values', label: 'Core values', path: '/whywedo#core-values', icon: 'fas fa-heart' },
    ],
  },
  // Hidden for now — set hidden: false (or remove the flag) to restore in the navbar.
  {
    key: 'news',
    label: 'News',
    path: 'https://news.google.com/search?q=sevamrita',
    external: true,
    hidden: true,
    children: [
      { key: 'newsroom', label: 'Newsroom', path: null },
      { key: 'calendar', label: 'Calendar', path: null },
      { key: 'stay-updated', label: 'Stay Updated', path: null },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    path: '/resources',
    icon: 'fas fa-book-open',
    children: null,
  },
];

export const HEADER_ACTIONS = [
  {
    key: 'events',
    selector: '.action-card--events',
    icon: 'fas fa-calendar-alt',
    label: 'Our Events',
    shortLabel: 'Events',
    action: 'events',
    path: '/events/social',
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
  '/whywedo',
  '/testimonials',
  '/contribute',
  '/events/social',
  '/events/gallery',
  '/events-calender',
  '/resources',
  '/contact',
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
