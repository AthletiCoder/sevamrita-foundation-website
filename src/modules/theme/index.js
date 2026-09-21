import { THEME_ATTRIBUTE, THEME_STORAGE_KEY, THEMES } from './data';

export { THEME_ATTRIBUTE, THEME_STORAGE_KEY, THEMES };

export function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return THEMES.LIGHT;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

export function getStoredTheme() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === THEMES.LIGHT || stored === THEMES.DARK) {
      return stored;
    }
  } catch {
    // Ignore storage access errors (private browsing, etc.)
  }
  return null;
}

export function resolveTheme() {
  return getStoredTheme() || getSystemTheme();
}

export function getCurrentTheme() {
  if (typeof document === 'undefined') {
    return THEMES.LIGHT;
  }
  const attr = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  if (attr === THEMES.LIGHT || attr === THEMES.DARK) {
    return attr;
  }
  return resolveTheme();
}

export function applyTheme(theme) {
  const next = theme === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, next);
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors
    }
  }
  return next;
}

export function toggleTheme() {
  const current = getCurrentTheme();
  return applyTheme(current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
}

/** Apply saved/system theme before first paint. Call once at app startup. */
export function initTheme() {
  return applyTheme(resolveTheme());
}
