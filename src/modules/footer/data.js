/**
 * Footer content — brand copy, quick links, and contact placeholders.
 * Update CONTACT_INFO fields when registered details are ready.
 */

export const FOOTER_BRAND = {
  name: 'Sevamrita Foundation',
  logoSrc: '/images/sevamrita-text-circle-favicon.png',
  logoAlt: 'Sevamrita Foundation',
  logoWidth: 56,
  logoHeight: 56,
  homePath: '/',
  mission:
    'Engaging communities in selfless service (Seva) — through education, health, rural development, and heritage — to build a more equitable and compassionate India.',
};

/**
 * Quick links. Use `action: 'volunteer'` to open the register modal
 * (same flow as the header Volunteer CTA).
 */
export const FOOTER_QUICK_LINKS = [
  { key: 'about', label: 'About Us', path: '/team' },
  { key: 'activities', label: 'Our Activities', path: '/whatwedo' },
  { key: 'volunteer', label: 'Volunteer', action: 'volunteer' },
  { key: 'donate', label: 'Donate', path: '/contribute' },
  { key: 'gallery', label: 'Gallery', path: '/events/gallery' },
];
