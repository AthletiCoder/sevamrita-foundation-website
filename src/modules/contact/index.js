import {
  CONTACT_INFO,
  FOOTER_CONTACT_ITEMS,
  SOCIAL_LINKS,
  REGISTERED_OFFICE,
  BRANCH_OFFICES,
  LOCATIONS,
  MAP_EMBED_SRC,
  PAGE_COPY,
} from './data';
import { copyPhoneNumber, prefersReducedMotion } from './phoneActions';

export {
  CONTACT_INFO,
  FOOTER_CONTACT_ITEMS,
  SOCIAL_LINKS,
  REGISTERED_OFFICE,
  BRANCH_OFFICES,
  LOCATIONS,
  MAP_EMBED_SRC,
  PAGE_COPY,
  copyPhoneNumber,
  prefersReducedMotion,
};

/** Google Maps place URL for a named location. */
export function getLocationMapsUrl(location) {
  const query = encodeURIComponent(
    location.mapsQuery ||
      `${location.name || location.address}, ${location.region || 'India'}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Resolve a footer contact row against CONTACT_INFO. */
export function resolveFooterContactItem(item) {
  const value = CONTACT_INFO[item.valueKey];
  const isPlaceholder =
    typeof value === 'string' &&
    (value.includes('goes here') || value.startsWith('['));

  let href = null;
  if (item.maps) {
    href = getLocationMapsUrl(REGISTERED_OFFICE);
  } else if (item.hrefKey && CONTACT_INFO[item.hrefKey]) {
    href = CONTACT_INFO[item.hrefKey];
  }

  return {
    ...item,
    value,
    href,
    isPlaceholder,
  };
}
