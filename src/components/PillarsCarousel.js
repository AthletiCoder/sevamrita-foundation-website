import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PillarsCarousel.css';

const AUTO_SCROLL_MS = 3000;
const SLIDE_MS = 550;

function orderWithPreviousFirst(cards) {
  if (cards.length === 0) {
    return [];
  }
  // [previous, active, ...rest] so a card always sits to the left of center
  return [cards[cards.length - 1], ...cards.slice(0, -1)];
}

function PillarsCarousel({ cards }) {
  const navigate = useNavigate();
  const length = cards.length;

  const trackRef = useRef(null);
  const stepRef = useRef(0);
  const busyRef = useRef(false);
  const pointerStartX = useRef(null);
  const didSwipe = useRef(false);
  const restingOffsetRef = useRef(0);

  const [items, setItems] = useState(() => orderWithPreviousFirst(cards));
  const [offset, setOffset] = useState(0);
  const [step, setStep] = useState(0);
  const [withTransition, setWithTransition] = useState(false);
  const [paused, setPaused] = useState(false);
  // items[0] = left, items[1] = center; updates as soon as a slide starts
  const [focusIndex, setFocusIndex] = useState(1);

  useEffect(() => {
    setItems(orderWithPreviousFirst(cards));
    setWithTransition(false);
    setFocusIndex(1);
    busyRef.current = false;
    const rest = stepRef.current > 0 ? -stepRef.current : 0;
    restingOffsetRef.current = rest;
    setOffset(rest);
  }, [cards]);

  const measureStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const card = track.querySelector('.pillar-carousel-card');
    if (!card) {
      return;
    }

    const gap = Number.parseFloat(window.getComputedStyle(track).gap || '0') || 0;
    const nextStep = card.offsetWidth + gap;

    if (nextStep <= 0 || Math.abs(nextStep - stepRef.current) <= 0.5) {
      return;
    }

    stepRef.current = nextStep;
    setStep(nextStep);

    if (!busyRef.current) {
      restingOffsetRef.current = -nextStep;
      setWithTransition(false);
      setOffset(-nextStep);
    }
  }, []);

  useLayoutEffect(() => {
    measureStep();

    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureStep);
      return () => window.removeEventListener('resize', measureStep);
    }

    const observer = new ResizeObserver(() => measureStep());
    observer.observe(track);
    window.addEventListener('resize', measureStep);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureStep);
    };
  }, [measureStep, items.length]);

  // items[0] = left (previous), items[1] = center (active)
  const activeCard = items[focusIndex] ?? items[1] ?? items[0];
  const activeId = activeCard?.id;
  const realIndex = cards.findIndex((card) => card.id === activeId);

  const goNext = useCallback(() => {
    if (busyRef.current || length < 2 || stepRef.current <= 0) {
      return;
    }

    busyRef.current = true;
    setFocusIndex(2);
    setWithTransition(true);
    setOffset(-2 * stepRef.current);
  }, [length]);

  const goPrev = useCallback(() => {
    if (busyRef.current || length < 2 || stepRef.current <= 0) {
      return;
    }

    busyRef.current = true;
    setFocusIndex(0);
    setWithTransition(true);
    setOffset(0);
  }, [length]);

  const handleTransitionEnd = (event) => {
    if (event.target !== trackRef.current || !busyRef.current) {
      return;
    }

    const rest = -stepRef.current;
    restingOffsetRef.current = rest;
    setWithTransition(false);

    if (offset <= rest - stepRef.current / 2) {
      // Finished next: old active becomes left card
      setItems((prev) => {
        if (prev.length < 2) {
          return prev;
        }
        return [...prev.slice(1), prev[0]];
      });
      setOffset(rest);
      setFocusIndex(1);
      busyRef.current = false;
      return;
    }

    // Finished prev: old left card becomes active; pull new previous from the end
    setItems((prev) => {
      if (prev.length < 2) {
        return prev;
      }
      return [prev[prev.length - 1], ...prev.slice(0, -1)];
    });
    setOffset(rest);
    setFocusIndex(1);
    busyRef.current = false;
  };

  const goToReal = useCallback((targetIndex) => {
    if (length < 2 || busyRef.current) {
      return;
    }

    const normalized = ((targetIndex % length) + length) % length;
    const targetId = cards[normalized]?.id;
    if (!targetId || targetId === activeId) {
      return;
    }

    setWithTransition(false);
    setItems(() => {
      const rotated = [...cards];
      while (rotated[0].id !== targetId) {
        rotated.push(rotated.shift());
      }
      // Put previous before active
      const previous = rotated[rotated.length - 1];
      return [previous, ...rotated.slice(0, -1)];
    });
    const rest = stepRef.current > 0 ? -stepRef.current : 0;
    restingOffsetRef.current = rest;
    setOffset(rest);
    setFocusIndex(1);
  }, [activeId, cards, length]);

  useEffect(() => {
    if (paused || length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      goNext();
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(intervalId);
  }, [paused, length, goNext]);

  const handleCardClick = (card) => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }

    if (card.id !== activeId) {
      const targetIndex = cards.findIndex((entry) => entry.id === card.id);
      if (targetIndex >= 0) {
        goToReal(targetIndex);
      }
      return;
    }

    navigate(`/whatwedo#${card.id}`);
  };

  const handlePointerDown = (event) => {
    pointerStartX.current = event.clientX;
    didSwipe.current = false;
  };

  const handlePointerUp = (event) => {
    if (pointerStartX.current == null) {
      return;
    }

    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    didSwipe.current = true;
    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  if (length === 0) {
    return null;
  }

  const trackStyle = {
    transform: `translate3d(${offset}px, 0, 0)`,
    transition: withTransition
      ? `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : 'none',
  };

  return (
    <div
      className="pillars-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="pillars-carousel-viewport">
        <button
          type="button"
          className="pillars-carousel-nav pillars-carousel-nav--prev"
          onClick={goPrev}
          aria-label="Previous pillar"
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>

        <div
          ref={trackRef}
          className="pillars-carousel-track"
          style={trackStyle}
          aria-live="polite"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartX.current = null;
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {items.map((card, index) => {
            const isActive = index === focusIndex;

            return (
              <button
                type="button"
                key={card.id}
                className={`pillar-carousel-card${isActive ? ' is-active' : ''}`}
                onClick={() => handleCardClick(card)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={
                  isActive
                    ? `View ${card.title} details`
                    : `Show ${card.title}`
                }
                tabIndex={isActive ? 0 : -1}
              >
                <img
                  src={card.imageSrc}
                  alt=""
                  className="pillar-carousel-image"
                  loading="lazy"
                  draggable={false}
                />
                <div className="pillar-carousel-glass">
                  <h3 className="pillar-carousel-title">{card.title}</h3>
                  <p className="pillar-carousel-subtitle">{card.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="pillars-carousel-nav pillars-carousel-nav--next"
          onClick={goNext}
          aria-label="Next pillar"
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>

      <div className="pillars-carousel-dots" role="tablist" aria-label="Pillar cards">
        {cards.map((card, dotIndex) => (
          <button
            type="button"
            key={card.id}
            role="tab"
            className={`pillars-carousel-dot${dotIndex === realIndex ? ' is-active' : ''}`}
            aria-selected={dotIndex === realIndex}
            aria-label={`Go to ${card.title}`}
            onClick={() => goToReal(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default PillarsCarousel;
