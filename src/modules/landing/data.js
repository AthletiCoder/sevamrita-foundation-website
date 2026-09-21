/**
 * Homepage focus sections shown under Flagship volunteering activities.
 */
export const FOCUS_SECTIONS = [
  {
    id: 'education-for-all',
    title: 'Education for all',
    subtitle: 'make a life',
    align: 'left',
    image: '/images/Sevamrita_Education_heroimg.webp',
    imageAlt: 'A smiling child holding a new school backpack',
    body:
      'Through scholarships, mentoring, and community learning spaces, we help children and youth stay in school and discover their potential. Every classroom we support is a doorway to dignity, opportunity, and a future written by the student—not by circumstance.',
  },
  {
    id: 'de-addiction',
    title: 'De-addiction awareness',
    subtitle: 'save a life',
    align: 'right',
    image: '/images/Sevamrita_Deaddiction_heroimg.webp',
    imageAlt: 'An elderly man holding a walking stick, smiling gently',
    body:
      'Addiction isolates families and steals years of possibility. Our de-addiction work walks with individuals through counseling, community care, and sustained recovery support—so healing is not a single moment, but a path back to purpose and belonging.',
  },
];

/**
 * Full-bleed auto-carousel for the landing hero.
 * Sticky single-image backup: `/images/Sevamrita_welcome_heroimg.sticky-backup.webp`
 * Layout restore notes: `docs/welcome-hero-sticky-backup.md`
 */
export const LANDING_HERO_CAROUSEL = [
  { src: '/images/landing-carousel/01.webp', alt: 'Sevamrita community service' },
  { src: '/images/landing-carousel/02.webp', alt: 'Sevamrita volunteers in action' },
  { src: '/images/landing-carousel/03.webp', alt: 'Sevamrita outreach' },
  { src: '/images/landing-carousel/04.webp', alt: 'Sevamrita field work' },
  { src: '/images/landing-carousel/05.webp', alt: 'Sevamrita community gathering' },
  { src: '/images/landing-carousel/06.webp', alt: 'Sevamrita education support' },
  { src: '/images/landing-carousel/07.webp', alt: 'Sevamrita care initiatives' },
  { src: '/images/landing-carousel/08.webp', alt: 'Sevamrita impact moments' },
];

/** @deprecated Prefer LANDING_HERO_CAROUSEL — kept for reference / revert */
export const WELCOME_HERO_IMAGE = {
  src: '/images/Sevamrita_welcome_heroimg.sticky-backup.webp',
  alt: 'A Sevamrita volunteer sharing a meal with an elderly woman',
  width: 1193,
  height: 880,
};

export const STATS_SECTION_ID = 'our-impact';
export const EDUCATION_SECTION_ID = 'education-for-all';
export const FLAGSHIP_SECTION_ID = 'flagship-volunteering';
export const SIX_PILLARS_PATH = '/whatwedo';

export const IMPACT_SECTION_COPY = {
  title: 'Our Impact in last 1 year',
  tagline: 'Small acts, multiplied.',
};

/** Hero metrics shown large with count-up (merged capacity + impact). */
export const IMPACT_HERO_STATS = [
  { id: 'lives', value: '15,000+', label: 'lives touched', icon: 'fas fa-heart' },
  { id: 'hours', value: '3,000+', label: 'volunteer hours', icon: 'fas fa-stopwatch' },
  { id: 'schools', value: '50+', label: 'schools reached', icon: 'fas fa-school' },
];

/** Compact supporting stats grouped by program theme. */
export const IMPACT_GROUPS = [
  {
    id: 'education',
    label: 'Education',
    icon: 'fas fa-graduation-cap',
    stats: [
      { value: '5,000+', label: 'school bags' },
      { value: '2,000+', label: 'summer kits' },
      { value: '5', label: 'students sponsored' },
    ],
  },
  {
    id: 'youth',
    label: 'Youth',
    icon: 'fas fa-user-group',
    stats: [
      { value: '60+', label: 'youths benefited' },
      { value: '500+', label: 'seminar participants' },
      { value: '50+', label: 'senior citizens' },
    ],
  },
  {
    id: 'environment',
    label: 'Environment',
    icon: 'fas fa-tree',
    stats: [
      { value: '3', label: 'tree plantation phases' },
    ],
  },
];
