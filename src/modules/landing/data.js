/**
 * Homepage focus sections shown below the impact (stats) tracker.
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

/** Welcome hero visual — fixed bottom-right behind hero content. */
export const WELCOME_HERO_IMAGE = {
  src: '/images/Sevamrita_welcome_heroimg.webp',
  alt: 'A Sevamrita volunteer sharing a meal with an elderly woman',
  width: 1193,
  height: 880,
  /** Previous asset kept for easy revert: `/images/Sevamrita_welcome_heroimg.prev.webp` */
};

export const EDUCATION_SECTION_ID = 'education-for-all';
