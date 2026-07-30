import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Scrolls to top on forward navigation (PUSH/REPLACE).
 * Restores the previous scroll position on Back/Forward (POP).
 * Leaves hash destinations alone so page-level hash handlers can run.
 */
function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positionsRef = useRef(new Map());

  useEffect(() => {
    const key = location.key || 'default';

    if (navigationType === 'POP') {
      const y = positionsRef.current.get(key) ?? 0;
      // Restore immediately so Back doesn't flash at top of page.
      window.scrollTo({ top: y, left: 0, behavior: 'auto' });
    } else if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    const savePosition = () => {
      positionsRef.current.set(key, window.scrollY);
    };

    savePosition();
    window.addEventListener('scroll', savePosition, { passive: true });
    return () => window.removeEventListener('scroll', savePosition);
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
}

export default ScrollManager;
