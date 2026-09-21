import React from 'react';
import { PILLARS } from '../modules/pillars';
import './CSS/Pillars.css';

const Pillars = () => {
  return (
    <div className="pillars-container">
      {PILLARS.map((pillar) => (
        <div className="pillar-item" id={pillar.id} key={pillar.id}>
          <div className="pillar-image-container">
            <img
              className="pillar-image"
              src={pillar.imgSrc}
              alt={pillar.alt}
              loading="lazy"
            />
          </div>
          <div className="pillar-content">
            <h3 className="pillar-title">
              {pillar.title}{' '}
              {pillar.subtitle && (
                <span className="text-muted d-block fs-5 mt-1">
                  {pillar.subtitle}
                </span>
              )}
            </h3>

            {pillar.description?.map((text, i) => (
              <p className="pillar-description" key={i}>
                {text}
              </p>
            ))}

            {pillar.listItems && (
              <ul className="pillar-list">
                {pillar.listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {pillar.descriptionEnd && (
              <p className="pillar-description">{pillar.descriptionEnd}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pillars;
