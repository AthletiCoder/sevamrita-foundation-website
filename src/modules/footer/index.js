import { FOOTER_BRAND, FOOTER_QUICK_LINKS } from './data';

export { FOOTER_BRAND, FOOTER_QUICK_LINKS };

/** Opens the site auth modal in register (volunteer) mode. */
export function openVolunteerSignup() {
  window.dispatchEvent(
    new CustomEvent('openAuthModal', { detail: { view: 'register' } }),
  );
}
