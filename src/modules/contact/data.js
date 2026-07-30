/**
 * Contact page content — phone, email, social links, and presence locations.
 */

export const CONTACT_INFO = {
  phone: '+91 8087650684',
  phoneHref: 'tel:+918087650684',
  email: 'info@sevamrita.org',
  emailHref: 'mailto:info@sevamrita.org',
};

export const SOCIAL_LINKS = [
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/sevamritafoundation/',
    icon: 'fab fa-instagram',
  },
  {
    key: 'twitter',
    label: 'X (Twitter)',
    href: 'https://x.com/sevamrita',
    icon: 'fab fa-twitter',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sevamrita-foundation',
    icon: 'fab fa-linkedin',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61566335922155',
    icon: 'fab fa-facebook',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@SevamritaFoundation-w6u',
    icon: 'fab fa-youtube',
  },
];

/** Presence locations shown on the contact map. */
export const LOCATIONS = [
  {
    key: 'pune',
    name: 'Pune',
    region: 'Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    key: 'amravati',
    name: 'Amravati',
    region: 'Maharashtra',
    lat: 20.9374,
    lng: 77.7796,
  },
  {
    key: 'delhi',
    name: 'Delhi',
    region: 'India',
    lat: 28.6139,
    lng: 77.209,
  },
  {
    key: 'hyderabad',
    name: 'Hyderabad',
    region: 'Telangana',
    lat: 17.385,
    lng: 78.4867,
  },
];

/** Path to the embedded multi-marker presence map. */
export const MAP_EMBED_SRC = '/maps/presence.html';

export const PAGE_COPY = {
  title: 'Contact Us',
  subtitle:
    'Reach out to Sevamrita Foundation — we would love to hear from you.',
};
