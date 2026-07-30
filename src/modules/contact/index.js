import {
  CONTACT_INFO,
  SOCIAL_LINKS,
  LOCATIONS,
  MAP_EMBED_SRC,
  PAGE_COPY,
} from './data';

export {
  CONTACT_INFO,
  SOCIAL_LINKS,
  LOCATIONS,
  MAP_EMBED_SRC,
  PAGE_COPY,
};

/** Google Maps place URL for a named location. */
export function getLocationMapsUrl(location) {
  const query = encodeURIComponent(`${location.name}, ${location.region}, India`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
