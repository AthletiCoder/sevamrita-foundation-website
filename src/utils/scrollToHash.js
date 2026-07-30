/**
 * Smooth-scroll to the element matching a location hash (e.g. "#shikshamrita"),
 * offsetting for the sticky header height.
 */
export function scrollToHash(hash) {
  const id = (hash || '').replace(/^#/, '');
  if (!id) {
    return;
  }

  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  const headerEl = document.querySelector('.header');
  const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 80;
  const top = section.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}
