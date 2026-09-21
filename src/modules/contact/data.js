/**
 * Contact page content — phone, email, social links, and presence locations.
 */

/**
 * Contact details used by the Contact page and Footer.
 * Update registered office details in CONTACT_INFO.
 */
export const CONTACT_INFO = {
  registeredOffice:
    '301, PLOT NO 6, SANGAREDDY, KANDI, Kandi, Sangareddy, Medak- 502285, Telangana',
  phone: '+91 8087650684',
  phoneDigits: '918087650684',
  phoneHref: 'tel:+918087650684',
  whatsappHref: 'https://wa.me/918087650684',
  email: 'info@sevamrita.org',
  emailHref: 'mailto:info@sevamrita.org',
  governmentId: 'U88900TS2024NPL190139',
};

/**
 * Footer contact rows — values/hrefs come from CONTACT_INFO so the
 * Contact page and Footer stay in sync.
 */
export const FOOTER_CONTACT_ITEMS = [
  {
    key: 'office',
    label: 'Regd. Office',
    icon: 'fas fa-map-marker-alt',
    valueKey: 'registeredOffice',
    href: null,
    maps: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    icon: 'fas fa-phone-alt',
    valueKey: 'phone',
    hrefKey: 'phoneHref',
  },
  {
    key: 'email',
    label: 'Email',
    icon: 'fas fa-envelope',
    valueKey: 'email',
    hrefKey: 'emailHref',
  },
  {
    key: 'government-id',
    label: 'CIN',
    icon: 'fas fa-id-card',
    valueKey: 'governmentId',
    hrefKey: null,
  },
];

export const SOCIAL_LINKS = [
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/sevamritafoundation/',
    icon: 'fab fa-instagram',
    accent: '#E4405F',
  },
    {
    key: 'twitter',
    label: 'X (Twitter)',
    href: 'https://x.com/sevamrita',
    icon: 'fab fa-x-twitter',
    accent: '#111827',
    accentDark: '#F3F4F6',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sevamrita-foundation',
    icon: 'fab fa-linkedin-in',
    accent: '#0A66C2',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61566335922155',
    icon: 'fab fa-facebook-f',
    accent: '#1877F2',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@SevamritaFoundation-w6u',
    icon: 'fab fa-youtube',
    accent: '#FF0000',
  },
];

/** Registered office card on the contact page. */
export const REGISTERED_OFFICE = {
  key: 'registered',
  title: 'Registered office',
  address: CONTACT_INFO.registeredOffice,
  mapsQuery:
    '301, PLOT NO 6, SANGAREDDY, KANDI, Sangareddy, Medak 502285, Telangana',
};

/** Branch offices listed on the contact page. */
export const BRANCH_OFFICES = [
  { key: 'mumbai', name: 'Mumbai', region: 'Maharashtra' },
  { key: 'delhi', name: 'Delhi', region: 'India' },
  { key: 'hyderabad', name: 'Hyderabad', region: 'Telangana' },
  { key: 'pune', name: 'Pune', region: 'Maharashtra' },
  { key: 'amravati', name: 'Amravati', region: 'Maharashtra' },
];

/** Presence locations shown on the contact map. */
export const LOCATIONS = [
  {
    key: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    lat: 19.076,
    lng: 72.8777,
  },
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
  socialLead: "We're present on all these platforms",
};
