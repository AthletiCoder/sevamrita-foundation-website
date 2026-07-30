import React, { useCallback, useEffect, useState } from 'react';
import './CSS/TestimonialsCarousel.css';

const AUTO_SCROLL_MS = 5000;
const FADE_MS = 450;

function TestimonialsCarousel({ items }) {
  const length = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const goTo = useCallback(
    (targetIndex) => {
      if (length < 2 || isFading) {
        return;
      }

      const normalized = ((targetIndex % length) + length) % length;
      if (normalized === activeIndex) {
        return;
      }

      setIsFading(true);
      window.setTimeout(() => {
        setActiveIndex(normalized);
        setIsFading(false);
      }, FADE_MS);
    },
    [activeIndex, isFading, length],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (paused || length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      goNext();
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(intervalId);
  }, [paused, length, goNext]);

  if (length === 0) {
    return null;
  }

  return (
    <div
      className="testimonials-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="testimonials-carousel-viewport">
        <button
          type="button"
          className="testimonials-carousel-nav testimonials-carousel-nav--prev"
          onClick={goPrev}
          aria-label="Previous testimonial"
          disabled={length < 2}
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>

        <div
          className={`testimonials-carousel-stage${isFading ? ' is-fading' : ''}`}
          aria-live="polite"
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id}
                className={`testimonials-carousel-quote${isActive ? ' is-active' : ''}`}
                aria-hidden={!isActive}
              >
                <i className="fas fa-quote-left testimonials-carousel-icon" aria-hidden="true" />
                <blockquote className="testimonials-carousel-text">
                  {item.quote}
                </blockquote>
                <cite className="testimonials-carousel-author">
                  — {item.author}
                </cite>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="testimonials-carousel-nav testimonials-carousel-nav--next"
          onClick={goNext}
          aria-label="Next testimonial"
          disabled={length < 2}
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>

      {length > 1 && (
        <div
          className="testimonials-carousel-dots"
          role="tablist"
          aria-label="Testimonials"
        >
          {items.map((item, dotIndex) => (
            <button
              type="button"
              key={item.id}
              role="tab"
              className={`testimonials-carousel-dot${dotIndex === activeIndex ? ' is-active' : ''}`}
              aria-selected={dotIndex === activeIndex}
              aria-label={`Go to testimonial ${dotIndex + 1}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TestimonialsCarousel;
