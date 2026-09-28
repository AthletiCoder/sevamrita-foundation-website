import React from 'react';
import './CampaignRevealCard.css';

function asPoints(body) {
  if (Array.isArray(body)) return body;
  if (!body) return [];
  return [body];
}

/**
 * Image + title card that reveals content on hover / mid-scroll.
 * variant="danger": collapsed title only; reveal = icon + stat + one line (red).
 */
function CampaignRevealCard({
  title,
  stat,
  icon,
  image,
  body,
  line,
  tone = 'light',
  variant = 'default',
}) {
  const points = asPoints(body);
  const isDanger = variant === 'danger';

  return (
    <article
      className={[
        'da-reveal-card',
        `da-reveal-card--${tone}`,
        isDanger ? 'da-reveal-card--danger' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      tabIndex={0}
    >
      <div className="da-reveal-card__media">
        <img
          src={image.src}
          alt={image.alt || ''}
          loading="lazy"
          decoding="async"
          width={image.width || 640}
          height={image.height || 480}
        />
      </div>

      <div className="da-reveal-card__body">
        <h3 className="da-reveal-card__title">
          {!isDanger && icon ? (
            <span className="da-reveal-card__icon" aria-hidden="true">
              <i className={icon} />
            </span>
          ) : null}
          {!isDanger && stat ? (
            <span className="da-reveal-card__stat">{stat}</span>
          ) : null}
          <span className="da-reveal-card__title-text">{title}</span>
        </h3>

        {isDanger ? (
          <div className="da-reveal-card__points da-reveal-card__danger">
            {icon ? (
              <span className="da-reveal-card__danger-icon" aria-hidden="true">
                <i className={icon} />
              </span>
            ) : null}
            {stat ? (
              <span className="da-reveal-card__danger-stat">{stat}</span>
            ) : null}
            {line ? (
              <span className="da-reveal-card__danger-line">{line}</span>
            ) : null}
          </div>
        ) : points.length > 0 ? (
          <ul className="da-reveal-card__points">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export default CampaignRevealCard;
