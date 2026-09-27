import gsap from 'gsap';
import { prefersReducedMotion } from '../scroll';

const TOP_REVEAL_PX = 24;
const EDGE_REVEAL_PX = 28;
const EDGE_LEAVE_PX = 72;
const DELTA_PX = 8;

/** @type {WeakMap<HTMLElement, { forceExpand: () => void }>} */
const controllers = new WeakMap();

/**
 * Header chrome hide/show:
 * - scroll down → nav chrome exits; Sevamrita logo stays top-left
 * - scroll up / page top / cursor near top → full header returns
 *
 * @param {HTMLElement | null} headerEl
 * @param {{ isMenuOpen?: () => boolean }} [options]
 * @returns {() => void} cleanup
 */
export function createHeaderChrome(headerEl, options = {}) {
  if (!headerEl) {
    return () => {};
  }

  const brand = headerEl.querySelector('.navbar-brand');
  const desktopChrome = headerEl.querySelector('.navbar-collapse');
  const mobileControls = headerEl.querySelector('.header-mobile-controls');
  const exitTargets = [desktopChrome, mobileControls].filter(Boolean);

  let hidden = false;
  let lastY = window.scrollY;
  let edgeReveal = false;
  let hoveringHeader = false;
  let tween = null;

  const setHiddenClass = (next) => {
    headerEl.classList.toggle('header--hidden', next);
    document.documentElement.classList.toggle('header-hidden', next);
  };

  const shouldStayOpen = () =>
    Boolean(options.isMenuOpen?.()) ||
    window.scrollY <= TOP_REVEAL_PX ||
    edgeReveal ||
    hoveringHeader;

  const clearInline = () => {
    exitTargets.forEach((el) => {
      gsap.set(el, { clearProps: 'x,autoAlpha,pointerEvents' });
    });
    if (brand) {
      gsap.set(brand, { clearProps: 'x,autoAlpha' });
    }
  };

  const expandInstant = () => {
    tween?.kill();
    clearInline();
    setHiddenClass(false);
    hidden = false;
  };

  /**
   * @param {boolean} nextHidden
   */
  const animateTo = (nextHidden) => {
    if (nextHidden === hidden) {
      return;
    }
    if (nextHidden && shouldStayOpen()) {
      return;
    }

    hidden = nextHidden;
    tween?.kill();

    if (prefersReducedMotion()) {
      setHiddenClass(nextHidden);
      exitTargets.forEach((el) => {
        gsap.set(el, {
          autoAlpha: nextHidden ? 0 : 1,
          x: 0,
          pointerEvents: nextHidden ? 'none' : 'auto',
        });
      });
      return;
    }

    if (nextHidden) {
      // Exit: chrome slides away horizontally; logo stays put
      setHiddenClass(true);
      tween = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      if (desktopChrome) {
        tween.to(
          desktopChrome,
          {
            x: 64,
            autoAlpha: 0,
            pointerEvents: 'none',
            duration: 0.4,
            ease: 'power3.in',
          },
          0
        );
      }
      if (mobileControls) {
        tween.to(
          mobileControls,
          {
            x: 48,
            autoAlpha: 0,
            pointerEvents: 'none',
            duration: 0.36,
            ease: 'power3.in',
          },
          0
        );
      }
      return;
    }

    // Enter: chrome slides in from the right; logo already visible
    setHiddenClass(false);
    tween = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: clearInline,
    });

    if (desktopChrome) {
      tween.fromTo(
        desktopChrome,
        { x: 72, autoAlpha: 0, pointerEvents: 'none' },
        {
          x: 0,
          autoAlpha: 1,
          pointerEvents: 'auto',
          duration: 0.5,
          ease: 'power3.out',
        },
        0
      );
    }
    if (mobileControls) {
      tween.fromTo(
        mobileControls,
        { x: 56, autoAlpha: 0, pointerEvents: 'none' },
        {
          x: 0,
          autoAlpha: 1,
          pointerEvents: 'auto',
          duration: 0.42,
          ease: 'power3.out',
        },
        0.04
      );
    }
  };

  controllers.set(headerEl, {
    forceExpand: () => {
      edgeReveal = true;
      animateTo(false);
    },
  });

  const onScroll = () => {
    const y = window.scrollY;
    const menuOpen = Boolean(options.isMenuOpen?.());

    if (menuOpen || y <= TOP_REVEAL_PX || edgeReveal || hoveringHeader) {
      animateTo(false);
    } else if (y > lastY + DELTA_PX) {
      animateTo(true);
    } else if (y < lastY - DELTA_PX) {
      animateTo(false);
    }

    lastY = y;
  };

  const onPointerMove = (event) => {
    if (event.clientY <= EDGE_REVEAL_PX) {
      if (!edgeReveal) {
        edgeReveal = true;
        animateTo(false);
      }
      return;
    }

    if (
      edgeReveal &&
      !hoveringHeader &&
      event.clientY > EDGE_LEAVE_PX &&
      window.scrollY > TOP_REVEAL_PX &&
      !options.isMenuOpen?.()
    ) {
      edgeReveal = false;
      animateTo(true);
    }
  };

  const onHeaderEnter = () => {
    hoveringHeader = true;
    animateTo(false);
  };

  const onHeaderLeave = (event) => {
    hoveringHeader = false;
    const nextY = event.clientY;
    if (
      nextY > EDGE_LEAVE_PX &&
      window.scrollY > TOP_REVEAL_PX &&
      !options.isMenuOpen?.()
    ) {
      edgeReveal = false;
      animateTo(true);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  headerEl.addEventListener('pointerenter', onHeaderEnter);
  headerEl.addEventListener('pointerleave', onHeaderLeave);
  // Logo stays interactive while chrome is hidden
  brand?.addEventListener('pointerenter', onHeaderEnter);

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pointermove', onPointerMove);
    headerEl.removeEventListener('pointerenter', onHeaderEnter);
    headerEl.removeEventListener('pointerleave', onHeaderLeave);
    brand?.removeEventListener('pointerenter', onHeaderEnter);
    tween?.kill();
    controllers.delete(headerEl);
    expandInstant();
  };
}

/**
 * Force the header fully open (e.g. when the mobile menu expands).
 * @param {HTMLElement | null} headerEl
 */
export function revealHeaderChrome(headerEl) {
  if (!headerEl) {
    return;
  }
  const controller = controllers.get(headerEl);
  if (controller) {
    controller.forceExpand();
    return;
  }
  headerEl.classList.remove('header--hidden');
  document.documentElement.classList.remove('header-hidden');
}
