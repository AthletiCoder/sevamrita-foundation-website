import gsap from 'gsap';
import { prefersReducedMotion } from './lenis';

/**
 * @param {HTMLElement} el
 * @param {string} text
 * @param {number} duration
 */
function typeChars(el, text, duration) {
  const state = { n: 0 };
  el.textContent = '';
  return gsap.to(state, {
    n: text.length,
    duration,
    ease: 'none',
    onUpdate: () => {
      el.textContent = text.slice(0, Math.round(state.n));
    },
  });
}

/**
 * @param {HTMLElement} el
 * @param {number} duration
 */
function eraseChars(el, duration) {
  const full = el.textContent || '';
  const state = { n: full.length };
  return gsap.to(state, {
    n: 0,
    duration,
    ease: 'none',
    onUpdate: () => {
      el.textContent = full.slice(0, Math.round(state.n));
    },
  });
}

/**
 * Hero: alternate Clarity ↔ Life.
 * @param {HTMLElement | null} root
 */
export function animateHeroTagline(root) {
  if (!root) return null;

  const word = root.querySelector('[data-hero-swap]');
  if (!word) return null;

  if (prefersReducedMotion()) {
    word.textContent = 'Clarity';
    return null;
  }

  word.textContent = 'Clarity';

  const master = gsap.timeline({ repeat: -1 });

  master
    .to({}, { duration: 1.7 })
    .to(word, { y: -14, autoAlpha: 0, duration: 0.32, ease: 'power2.in' })
    .add(() => {
      word.textContent = 'Life';
    })
    .set(word, { y: 14 })
    .to(word, { y: 0, autoAlpha: 1, duration: 0.38, ease: 'power2.out' })
    .to({}, { duration: 1.7 })
    .to(word, { y: -14, autoAlpha: 0, duration: 0.32, ease: 'power2.in' })
    .add(() => {
      word.textContent = 'Clarity';
    })
    .set(word, { y: 14 })
    .to(word, { y: 0, autoAlpha: 1, duration: 0.38, ease: 'power2.out' });

  return master;
}

/**
 * The Need: prohibition (red + ✕) ↔ liberation (green + ✓).
 * @param {HTMLElement | null} root
 */
export function animateNeedLead(root) {
  if (!root) return null;

  const word = root.querySelector('[data-need-word]');
  const mark = root.querySelector('[data-need-mark]');
  if (!word || !mark) return null;

  if (prefersReducedMotion()) {
    word.textContent = 'liberation';
    word.classList.add('is-good');
    mark.textContent = '✓';
    mark.className = 'da-need__mark da-need__mark--tick';
    gsap.set(mark, { autoAlpha: 1, scale: 1 });
    return null;
  }

  const prohibition = 'prohibition';
  const liberation = 'liberation';

  gsap.set(mark, { autoAlpha: 0, scale: 0.6 });
  word.textContent = '';
  word.style.color = '';

  const master = gsap.timeline({ repeat: -1, repeatDelay: 0.25 });

  master
    .add(() => {
      word.classList.remove('is-bad', 'is-good');
      mark.textContent = '';
      gsap.set(mark, { autoAlpha: 0, scale: 0.6 });
      word.style.color = '';
    })
    .add(typeChars(word, prohibition, 1.15))
    .add(() => {
      word.classList.add('is-bad');
    })
    .to(word, { color: '#c62828', duration: 0.32 })
    .add(() => {
      mark.textContent = '✕';
      mark.className = 'da-need__mark da-need__mark--cross';
    })
    .to(mark, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'back.out(1.7)' })
    .to({}, { duration: 1.15 })
    .add(eraseChars(word, 0.55))
    .to(mark, { autoAlpha: 0, scale: 0.5, duration: 0.2 }, '<')
    .add(() => {
      word.classList.remove('is-bad');
      word.style.color = '';
      mark.textContent = '';
    })
    .to({}, { duration: 0.25 })
    .add(typeChars(word, liberation, 1.15))
    .add(() => {
      word.classList.add('is-good');
    })
    .to(word, { color: '#1b8a4a', duration: 0.32 })
    .add(() => {
      mark.textContent = '✓';
      mark.className = 'da-need__mark da-need__mark--tick';
    })
    .to(mark, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'back.out(1.7)' })
    .to({}, { duration: 2.8 })
    .add(eraseChars(word, 0.55))
    .to(mark, { autoAlpha: 0, scale: 0.5, duration: 0.2 }, '<')
    .add(() => {
      word.classList.remove('is-good');
      word.style.color = '';
      mark.textContent = '';
    });

  return master;
}
