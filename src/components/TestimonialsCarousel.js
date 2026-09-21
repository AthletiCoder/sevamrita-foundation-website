import React, { useEffect, useRef, useState } from 'react';
import {
  TYPEWRITER,
  createMotionState,
  nextIndex,
  prefersReducedMotion,
  prevIndex,
  runTypewriter,
} from '../modules/testimonials';
import TestimonialCard from './TestimonialCard';
import './CSS/TestimonialsCarousel.css';

function TestimonialsCarousel({ items = [] }) {
  const length = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleText, setVisibleText] = useState('');
  const [phase, setPhase] = useState('prep');
  const [paused, setPaused] = useState(false);
  const [personRevealed, setPersonRevealed] = useState(false);
  const [motion, setMotion] = useState(() => createMotionState());
  const timersRef = useRef([]);
  const cycleIdRef = useRef(0);
  const cancelTypewriterRef = useRef(() => {});
  const pausedRef = useRef(false);
  const motionRef = useRef(motion);

  const active = items[activeIndex];
  pausedRef.current = paused;
  motionRef.current = motion;

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const later = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  const invalidateCycle = () => {
    cycleIdRef.current += 1;
    cancelTypewriterRef.current();
    cancelTypewriterRef.current = () => {};
    clearTimers();
  };

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const whenUnpaused = (cycleId, fn) => {
      const tryRun = () => {
        if (cycleId !== cycleIdRef.current) return;
        if (pausedRef.current) {
          later(tryRun, 250);
          return;
        }
        fn();
      };
      tryRun();
    };

    const cycleId = cycleIdRef.current + 1;
    cycleIdRef.current = cycleId;
    clearTimers();

    const nextMotion = prefersReducedMotion()
      ? { id: 'fade', side: null }
      : createMotionState(motionRef.current);
    setMotion(nextMotion);
    motionRef.current = nextMotion;

    setVisibleText('');
    setPersonRevealed(false);
    setPhase('prep');

    const rafId = window.requestAnimationFrame(() => {
      if (cycleId !== cycleIdRef.current) return;
      setPhase('enter');

      later(() => {
        if (cycleId !== cycleIdRef.current) return;
        setPhase('typing');

        cancelTypewriterRef.current = runTypewriter({
          text: active.quote,
          reducedMotion: prefersReducedMotion(),
          onUpdate: (slice) => {
            if (cycleId !== cycleIdRef.current) return;
            setVisibleText(slice);
          },
          onComplete: () => {
            if (cycleId !== cycleIdRef.current) return;
            setPersonRevealed(true);
            setPhase('emphasize');

            later(() => {
              if (cycleId !== cycleIdRef.current) return;
              setPhase('holding');

              if (length < 2) return;

              later(() => {
                whenUnpaused(cycleId, () => {
                  setPhase('exit');
                  later(() => {
                    if (cycleId !== cycleIdRef.current) return;
                    setActiveIndex((current) => nextIndex(current, length));
                  }, TYPEWRITER.transitionMs);
                });
              }, TYPEWRITER.holdMs);
            }, TYPEWRITER.emphasizeMs);
          },
        });
      }, TYPEWRITER.transitionMs);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      cancelTypewriterRef.current();
      cancelTypewriterRef.current = () => {};
      clearTimers();
    };
  }, [active, length]);

  const goTo = (targetIndex) => {
    if (length < 2 || phase === 'exit') return;
    const normalized = ((targetIndex % length) + length) % length;
    if (normalized === activeIndex) return;

    invalidateCycle();
    setPhase('exit');
    later(() => {
      setActiveIndex(normalized);
    }, TYPEWRITER.transitionMs);
  };

  if (!active) {
    return null;
  }

  return (
    <div
      className="testimonials-spotlight"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="testimonials-spotlight__viewport">
        <button
          type="button"
          className="testimonials-spotlight__nav testimonials-spotlight__nav--prev"
          onClick={() => goTo(prevIndex(activeIndex, length))}
          aria-label="Previous testimonial"
          disabled={length < 2}
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>

        <div className="testimonials-spotlight__stage">
          <TestimonialCard
            key={active.id}
            item={active}
            phase={phase}
            visibleText={visibleText}
            showCaret={phase === 'typing'}
            personRevealed={personRevealed}
            motion={motion}
          />
        </div>

        <button
          type="button"
          className="testimonials-spotlight__nav testimonials-spotlight__nav--next"
          onClick={() => goTo(nextIndex(activeIndex, length))}
          aria-label="Next testimonial"
          disabled={length < 2}
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>

      {length > 1 && (
        <div
          className="testimonials-spotlight__dots"
          role="tablist"
          aria-label="Testimonials"
        >
          {items.map((item, dotIndex) => (
            <button
              type="button"
              key={item.id}
              role="tab"
              className={`testimonials-spotlight__dot${
                dotIndex === activeIndex ? ' is-active' : ''
              }`}
              aria-selected={dotIndex === activeIndex}
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TestimonialsCarousel;
