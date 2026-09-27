import React from 'react';
import './CampaignRevealCard.css';

function asPoints(body) {
  if (Array.isArray(body)) return body;
  if (!body) return [];
  return [body];
}

/**
 * Image + title card that reveals bullet descriptions on hover / mid-scroll.
 */
function CampaignRevealCard({ title, icon, image, body, tone = 'light' }) {
  const points = asPoints(body);

  return (
    <article
      className={`da-reveal-card da-reveal-card--${tone}`}
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
          {icon ? (
            <span className="da-reveal-card__icon" aria-hidden="true">
              <i className={icon} />
            </span>
          ) : null}
          <span>{title}</span>
        </h3>

        {points.length > 0 ? (
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
