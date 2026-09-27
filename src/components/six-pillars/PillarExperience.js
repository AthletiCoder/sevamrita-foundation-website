import React from 'react';
import './PillarExperience.css';

function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}

/**
 * Single pillar panel inside the pinned stage.
 * @param {{
 *   pillar: object,
 *   index: number,
 *   total: number,
 *   priority?: boolean,
 *   align?: 'start' | 'end',
 * }} props
 */
function PillarExperience({
  pillar,
  index,
  total,
  priority = false,
  align = 'start',
}) {
  const {
    id,
    title,
    english,
    description,
    listItems,
    descriptionEnd,
    imgSrc,
    alt,
  } = pillar;

  const current = formatIndex(index);
  const totalDisplay = String(total).padStart(2, '0');

  return (
    <article
      className={`sp-panel sp-panel--${align}`}
      id={id}
      data-pillar-index={index}
      data-nav-tone="dark"
      aria-labelledby={`${id}-title`}
    >
      <span className="sp-panel__watermark" aria-hidden="true">
        {current}
      </span>

      <div className="sp-panel__frame">
        <div className="sp-panel__media">
          <img
            className="sp-panel__image"
            src={imgSrc}
            alt={alt}
            width={1200}
            height={800}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        </div>

        <div className="sp-panel__body">
          <p className="sp-panel__counter" data-reveal>
            <span className="sp-panel__counter-current">{current}</span>
            <span className="sp-panel__counter-sep" aria-hidden="true">
              {' / '}
            </span>
            <span className="sp-panel__counter-total">{totalDisplay}</span>
          </p>

          <h2 className="sp-panel__title" id={`${id}-title`}>
            <span className="sp-panel__sanskrit">{title}</span>
            {english && <span className="sp-panel__english">{english}</span>}
          </h2>

          {description?.map((text, i) => (
            <p className="sp-panel__copy" data-reveal key={i}>
              {text}
            </p>
          ))}

          {listItems?.length > 0 && (
            <ul className="sp-panel__list" data-reveal>
              {listItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {descriptionEnd && (
            <p className="sp-panel__copy sp-panel__copy--end" data-reveal>
              {descriptionEnd}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default PillarExperience;
