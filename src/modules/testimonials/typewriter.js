/**
 * Typewriter + dwell timing for the testimonials spotlight.
 * UI owns React state; this module owns timing rules.
 */

export const TYPEWRITER = {
  /** Base delay between characters (ms). */
  charMs: 28,
  /** Extra pause after sentence-ending punctuation. */
  sentencePauseMs: 220,
  /** Extra pause after commas / soft breaks. */
  clausePauseMs: 90,
  /** After typing: gentle enlarge beat before the hold (ms). */
  emphasizeMs: 700,
  /** How long to hold the completed quote before advancing (ms). */
  holdMs: 3200,
  /** Enter / exit transition duration (ms) — keep in sync with CSS. */
  transitionMs: 580,
};

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Natural pacing: brief pauses at punctuation so typing feels spoken. */
export function delayForChar(char, config = TYPEWRITER) {
  if (char === '.' || char === '!' || char === '?') {
    return config.charMs + config.sentencePauseMs;
  }
  if (char === ',' || char === ';' || char === ':' || char === '—') {
    return config.charMs + config.clausePauseMs;
  }
  return config.charMs;
}

/**
 * Reveals `text` one character at a time.
 * Calls onUpdate(visibleSlice) and onComplete() when finished.
 * Returns a cancel function.
 */
export function runTypewriter({
  text,
  onUpdate,
  onComplete,
  reducedMotion = false,
  config = TYPEWRITER,
}) {
  if (!text) {
    onUpdate('');
    onComplete();
    return () => {};
  }

  if (reducedMotion) {
    onUpdate(text);
    onComplete();
    return () => {};
  }

  let index = 0;
  let timeoutId = 0;
  let cancelled = false;

  const step = () => {
    if (cancelled) return;

    index += 1;
    onUpdate(text.slice(0, index));

    if (index >= text.length) {
      if (!cancelled) onComplete();
      return;
    }

    const nextChar = text[index - 1];
    timeoutId = window.setTimeout(step, delayForChar(nextChar, config));
  };

  timeoutId = window.setTimeout(step, config.charMs);

  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };
}

export function nextIndex(current, length) {
  if (length < 1) return 0;
  return (current + 1) % length;
}

export function prevIndex(current, length) {
  if (length < 1) return 0;
  return (current - 1 + length) % length;
}
