import React, { useEffect, useState } from 'react';
import { getCurrentTheme, THEME_ATTRIBUTE, THEMES, toggleTheme } from '../modules/theme';

function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => getCurrentTheme());
  const isDark = theme === THEMES.DARK;

  useEffect(() => {
    const syncTheme = () => setTheme(getCurrentTheme());
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [THEME_ATTRIBUTE],
    });
    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    setTheme(toggleTheme());
  };

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`.trim()}
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <i className={isDark ? 'far fa-sun' : 'far fa-moon'} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
