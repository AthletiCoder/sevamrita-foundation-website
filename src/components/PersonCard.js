import React from 'react';

function PersonCard({ person, className = '' }) {
  return (
    <div className={`person-card ${className}`.trim()}>
      <div className="person-card-inner">
        <div className="person-card-front">
          <div className="person-photo">
            <img
              className="person-image"
              src={person.imageSrc}
              alt={person.name}
              loading="lazy"
            />
          </div>
          <div className="person-info">
            <h2>{person.designation}</h2>
            <h1>{person.name}</h1>
          </div>
        </div>

        <div className="person-card-back">
          <h2>{person.name}</h2>
          <p className="person-description">
            {person.longDescription || person.description}
          </p>
          <div className="contact-info">
            {person.linkedIn && (
              <a
                href={person.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon"
                aria-label={`${person.name} LinkedIn`}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            <a
              href={`mailto:${person.email}`}
              className="contact-icon"
              aria-label={`Email ${person.name}`}
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
