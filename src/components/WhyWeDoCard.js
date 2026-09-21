import React from 'react';

function WhyWeDoCard({ icon, title, description }) {
  return (
    <article className="whywedo-card">
      <span className="whywedo-card-icon" aria-hidden="true">
        <i className={icon} />
      </span>
      <h3 className="whywedo-card-title">{title}</h3>
      <p className="whywedo-card-body">{description}</p>
    </article>
  );
}

export default WhyWeDoCard;
