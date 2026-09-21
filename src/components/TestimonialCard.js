import React from 'react';

const VISIBLE_PHASES = new Set(['enter', 'typing', 'emphasize', 'holding']);

function TestimonialCard({
  item,
  phase,
  visibleText,
  showCaret,
  personRevealed,
  motion,
}) {
  const motionClass = motion?.id
    ? `motion-${motion.id}${motion.side ? ` motion-side-${motion.side}` : ''}`
    : '';

  return (
    <article
      className={[
        'testimonials-spotlight__card',
        motionClass,
        VISIBLE_PHASES.has(phase) ? 'is-visible' : '',
        phase === 'exit' ? 'is-exit' : '',
        phase === 'prep' ? 'is-prep' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="testimonials-spotlight__photo-wrap">
        <img
          className="testimonials-spotlight__photo"
          src={item.imageSrc}
          alt=""
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="testimonials-spotlight__body">
        <i
          className="fas fa-quote-left testimonials-spotlight__quote-icon"
          aria-hidden="true"
        />

        <blockquote
          className={`testimonials-spotlight__quote${
            phase === 'emphasize' || phase === 'holding' ? ' is-emphasized' : ''
          }`}
          aria-hidden="true"
        >
          <span className="testimonials-spotlight__typed">
            {visibleText}
            {showCaret && (
              <span className="testimonials-spotlight__caret" aria-hidden="true" />
            )}
          </span>
        </blockquote>

        <p className="visually-hidden">
          {item.quote} — {item.name}, {item.designation}
        </p>

        <footer
          className={`testimonials-spotlight__person${
            personRevealed ? ' is-revealed' : ''
          }`}
        >
          <cite className="testimonials-spotlight__name">{item.name}</cite>
          <span className="testimonials-spotlight__role">{item.designation}</span>
        </footer>
      </div>
    </article>
  );
}

export default TestimonialCard;
