import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, scrollWindowTo } from '../scroll';
import { measureTitleTravel } from './pillarMotion';

gsap.registerPlugin(ScrollTrigger);

export const PILLAR_SCROLL_ID = 'sp-pillars-master';

/** Desktop scroll length in viewport heights (within 600–800vh). */
const DESKTOP_SCROLL_VH = 8.5;
/** Slightly shorter on smaller screens. */
const MOBILE_SCROLL_VH = 7;

const STAGE = 1;
/** Portion of each stage used for the sequenced handoff (rest is hold/drift). */
const CROSSFADE = 0.86;

/**
 * Image sits left on `--start`, right on `--end`.
 * Exit pushes it further outward on its own side.
 * @param {HTMLElement} panel
 */
function imageSideDir(panel) {
  return panel.classList.contains('sp-panel--end') ? 1 : -1;
}

/**
 * @param {HTMLElement[]} links
 * @param {number} activeIndex
 */
function setProgressActive(links, activeIndex) {
  links.forEach((link, i) => {
    const active = i === activeIndex;
    link.classList.toggle('is-active', active);
    if (active) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Scroll the pinned pillars timeline to a pillar index (via Lenis when present).
 * @param {number} index
 * @param {number} total
 */
export function scrollToPillarIndex(index, total) {
  const st = ScrollTrigger.getById(PILLAR_SCROLL_ID);
  if (!st || total < 2) return;

  const clamped = Math.max(0, Math.min(total - 1, index));
  const progress = clamped / (total - 1);
  const y = st.start + (st.end - st.start) * progress;
  scrollWindowTo(y, { duration: 1.25 });
}

/**
 * @param {HTMLElement} panel
 */
function panelParts(panel) {
  return {
    image: panel.querySelector('.sp-panel__image'),
    media: panel.querySelector('.sp-panel__media'),
    body: panel.querySelector('.sp-panel__body'),
    title: panel.querySelector('.sp-panel__title'),
    reveals: panel.querySelectorAll('[data-reveal]'),
    watermark: panel.querySelector('.sp-panel__watermark'),
  };
}

/**
 * Master pinned ScrollTrigger timeline for the Six Pillars experience.
 * @param {HTMLElement | null} root `.sp-stage` element
 * @returns {() => void} cleanup
 */
export function createPillarScroll(root) {
  if (!root) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    const pinTarget = root.querySelector('.sp-stage__pin');
    const panels = gsap.utils.toArray('.sp-panel', root);
    const progressLinks = gsap.utils.toArray('.sp-stage__progress-link', root);

    if (!pinTarget || panels.length === 0) {
      return;
    }

    if (prefersReducedMotion()) {
      root.classList.add('sp-stage--static');
      setProgressActive(progressLinks, 0);
      return;
    }

    root.classList.remove('sp-stage--static');

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 993px)',
        isMobile: '(max-width: 992px)',
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const scrollVh = isDesktop ? DESKTOP_SCROLL_VH : MOBILE_SCROLL_VH;
        const n = panels.length;

        const travels = panels.map(() => ({ x: 0, y: 48, scale: 0.42 }));

        const refreshGeometry = () => {
          panels.forEach((panel, i) => {
            const { title } = panelParts(panel);
            const wasHidden = gsap.getProperty(panel, 'autoAlpha') < 0.05;
            const titlePrev = {
              x: gsap.getProperty(title, 'x'),
              y: gsap.getProperty(title, 'y'),
              scale: gsap.getProperty(title, 'scale'),
              autoAlpha: gsap.getProperty(title, 'autoAlpha'),
            };

            if (wasHidden) {
              gsap.set(panel, { autoAlpha: 1, visibility: 'hidden' });
            }

            gsap.set(title, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
            travels[i] = measureTitleTravel(progressLinks[i], title);
            gsap.set(title, titlePrev);

            if (wasHidden) {
              gsap.set(panel, { autoAlpha: 0, visibility: 'visible' });
            }
          });
        };

        panels.forEach((panel, i) => {
          const { image, media, body, title, reveals, watermark } =
            panelParts(panel);

          if (i === 0) {
            gsap.set(panel, { autoAlpha: 1, zIndex: 2 });
            gsap.set([image, media], { xPercent: 0, autoAlpha: 1 });
            gsap.set(image, { scale: 1 });
            gsap.set(body, { autoAlpha: 1 });
            gsap.set(title, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
            gsap.set(reveals, { autoAlpha: 1, y: 0 });
            gsap.set(watermark, { autoAlpha: 1, yPercent: 0 });
          } else {
            const dir = imageSideDir(panel);
            gsap.set(panel, { autoAlpha: 0, zIndex: 1 });
            gsap.set(media, { xPercent: dir * 28, autoAlpha: 0 });
            gsap.set(image, { scale: 1.02, xPercent: 0 });
            gsap.set(body, { autoAlpha: 1 });
            gsap.set(title, { x: 0, y: 0, scale: 1, autoAlpha: 0 });
            gsap.set(reveals, { autoAlpha: 0, y: 16 });
            gsap.set(watermark, { autoAlpha: 0, yPercent: 8 });
          }
        });

        refreshGeometry();

        panels.forEach((panel, i) => {
          if (i === 0) return;
          const { title } = panelParts(panel);
          gsap.set(title, {
            x: travels[i].x,
            y: travels[i].y,
            scale: travels[i].scale,
            autoAlpha: 0,
          });
        });

        setProgressActive(progressLinks, 0);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: PILLAR_SCROLL_ID,
            trigger: root,
            pin: pinTarget,
            scrub: 1.6,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * scrollVh)}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: refreshGeometry,
            onUpdate(self) {
              const index = Math.min(
                n - 1,
                Math.round(self.progress * (n - 1))
              );
              setProgressActive(progressLinks, index);
            },
          },
        });

        const first = panelParts(panels[0]);
        tl.addLabel('stage-0', 0);
        tl.to(
          first.image,
          {
            scale: 1.04,
            duration: STAGE,
            ease: 'none',
          },
          0
        );

        for (let i = 1; i < n; i += 1) {
          const t = i * STAGE;
          const prev = panels[i - 1];
          const next = panels[i];
          const fade = STAGE * CROSSFADE;
          const holdStart = t + fade;
          const holdDur = STAGE * (1 - CROSSFADE);

          const prevParts = panelParts(prev);
          const nextParts = panelParts(next);
          const prevDir = imageSideDir(prev);
          const nextDir = imageSideDir(next);

          // Sequenced beats within the handoff window
          const exitImgAt = t;
          const exitImgDur = fade * 0.18;
          const exitCopyAt = t + fade * 0.14;
          const exitCopyDur = fade * 0.24;
          const exitTitleAt = t + fade * 0.34;
          const exitTitleDur = fade * 0.2;
          const enterTitleAt = t + fade * 0.5;
          const enterTitleDur = fade * 0.2;
          const enterImgAt = t + fade * 0.66;
          const enterImgDur = fade * 0.14;
          const enterCopyAt = t + fade * 0.76;
          const enterCopyDur = fade * 0.22;

          tl.addLabel(`stage-${i}`, t);

          // Keep outgoing on top through its exit; incoming under until title lands
          tl.set(prev, { zIndex: 3 }, t);
          tl.set(next, { autoAlpha: 1, zIndex: 2 }, enterTitleAt);

          // —— EXIT 1: push image out on its side ——
          tl.to(
            prevParts.media,
            {
              xPercent: prevDir * 42,
              autoAlpha: 0,
              duration: exitImgDur,
              ease: 'power2.in',
            },
            exitImgAt
          );
          tl.to(
            prevParts.image,
            {
              scale: 1.08,
              duration: exitImgDur,
              ease: 'power1.in',
            },
            exitImgAt
          );

          // —— EXIT 2: erase description ——
          tl.to(
            prevParts.reveals,
            {
              autoAlpha: 0,
              y: -6,
              duration: exitCopyDur,
              stagger: { each: 0.035, ease: 'sine.in' },
              ease: 'sine.inOut',
            },
            exitCopyAt
          );
          tl.to(
            prevParts.watermark,
            {
              autoAlpha: 0,
              duration: exitCopyDur,
              ease: 'sine.inOut',
            },
            exitCopyAt
          );

          // —— EXIT 3: merge title back into bottom nav source ——
          tl.to(
            prevParts.title,
            {
              x: () => travels[i - 1].x,
              y: () => travels[i - 1].y,
              scale: () => travels[i - 1].scale,
              autoAlpha: 0,
              duration: exitTitleDur,
              ease: 'sine.inOut',
            },
            exitTitleAt
          );
          tl.to(
            prev,
            {
              autoAlpha: 0,
              duration: exitTitleDur * 0.55,
              ease: 'sine.inOut',
            },
            exitTitleAt + exitTitleDur * 0.5
          );

          // —— ENTER 1: title rises from its nav source ——
          tl.fromTo(
            nextParts.title,
            {
              x: () => travels[i].x,
              y: () => travels[i].y,
              scale: () => travels[i].scale,
              autoAlpha: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: enterTitleDur,
              ease: 'sine.out',
            },
            enterTitleAt
          );
          tl.set(next, { zIndex: 3 }, enterTitleAt + enterTitleDur * 0.35);
          tl.set(prev, { zIndex: 1 }, enterTitleAt + enterTitleDur * 0.35);

          // —— ENTER 2: image slides in from its side ——
          tl.fromTo(
            nextParts.media,
            { xPercent: nextDir * 36, autoAlpha: 0 },
            {
              xPercent: 0,
              autoAlpha: 1,
              duration: enterImgDur,
              ease: 'power2.out',
            },
            enterImgAt
          );
          tl.fromTo(
            nextParts.image,
            { scale: 1.06 },
            {
              scale: 1,
              duration: enterImgDur,
              ease: 'sine.out',
            },
            enterImgAt
          );

          // —— ENTER 3: description ——
          tl.fromTo(
            nextParts.reveals,
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: enterCopyDur,
              stagger: { each: 0.05, ease: 'sine.out' },
              ease: 'sine.out',
            },
            enterCopyAt
          );
          tl.fromTo(
            nextParts.watermark,
            { autoAlpha: 0, yPercent: 4 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: enterCopyDur,
              ease: 'sine.out',
            },
            enterCopyAt
          );

          // Hold / drift
          tl.to(
            nextParts.image,
            {
              scale: 1.04,
              duration: holdDur,
              ease: 'none',
            },
            holdStart
          );

          // Reset outgoing media for clean reverse scrub
          tl.set(
            prevParts.media,
            { xPercent: 0, autoAlpha: 1 },
            holdStart
          );
        }

        const onProgressClick = (event) => {
          const link = event.currentTarget;
          const index = Number(link.getAttribute('data-pillar-index'));
          if (Number.isNaN(index)) return;
          event.preventDefault();
          scrollToPillarIndex(index, n);
        };

        progressLinks.forEach((link) => {
          link.addEventListener('click', onProgressClick);
        });

        return () => {
          progressLinks.forEach((link) => {
            link.removeEventListener('click', onProgressClick);
          });
        };
      }
    );
  }, root);

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    ctx.revert();
    ScrollTrigger.refresh();
  };
}
