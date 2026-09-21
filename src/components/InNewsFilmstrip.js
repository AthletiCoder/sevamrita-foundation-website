import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IN_NEWS_IMAGES } from '../modules/eventsGallery';
import './CSS/InNewsFilmstrip.css';

const SCROLL_SPEED = 0.45; // px per frame at ~60fps

function InNewsFilmstrip() {
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const hoveringRef = useRef(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  useEffect(() => {
    pausedRef.current = hoveringRef.current || Boolean(lightbox);
  }, [lightbox]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || IN_NEWS_IMAGES.length === 0) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let frameId = 0;

    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += SCROLL_SPEED;
        const loopAt = el.scrollWidth / 2;
        if (loopAt > 0 && el.scrollLeft >= loopAt) {
          el.scrollLeft -= loopAt;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const scrollByFrame = useCallback((direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.75, 420);
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }, []);

  const pause = useCallback(() => {
    hoveringRef.current = true;
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    hoveringRef.current = false;
    pausedRef.current = Boolean(lightbox);
  }, [lightbox]);

  if (!IN_NEWS_IMAGES.length) return null;

  const loopImages = [...IN_NEWS_IMAGES, ...IN_NEWS_IMAGES];

  return (
    <section id="news" className="in-news" aria-labelledby="in-news-title">
      <div className="container-custom">
        <header className="in-news__intro">
          <h2 id="in-news-title" className="section-title section-title-left">
            <i className="fas fa-newspaper" aria-hidden="true" /> In the News
          </h2>
          <p className="section-description">
            Press coverage highlighting Sevamrita Foundation’s work in the community.
          </p>
        </header>
      </div>

      <div
        className="in-news__film"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) resume();
        }}
      >
        <button
          type="button"
          className="in-news__arrow in-news__arrow--prev"
          onClick={() => scrollByFrame(-1)}
          aria-label="Scroll newspaper clippings left"
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>

        <div
          className="in-news__scroller"
          ref={scrollerRef}
          tabIndex={0}
          role="region"
          aria-label="Newspaper coverage filmstrip"
        >
          <div className="in-news__track">
            {loopImages.map((image, index) => (
              <button
                key={`${image.id}-${index}`}
                type="button"
                className="in-news__frame"
                onClick={() => setLightbox(image)}
                aria-label="View newspaper clipping"
                tabIndex={index >= IN_NEWS_IMAGES.length ? -1 : 0}
              >
                <span className="in-news__sprocket" aria-hidden="true" />
                <span className="in-news__media">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </span>
                <span className="in-news__sprocket" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="in-news__arrow in-news__arrow--next"
          onClick={() => scrollByFrame(1)}
          aria-label="Scroll newspaper clippings right"
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>

      {lightbox && (
        <div
          className="in-news__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Newspaper clipping"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="in-news__lightbox-close"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default InNewsFilmstrip;
