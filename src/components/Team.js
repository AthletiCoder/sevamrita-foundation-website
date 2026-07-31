import React from 'react';
import './CSS/Team.css';

function Team() {
  return (
    <div className="people-container-wrapper">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">
            Our Team
          </h1>
          <p className="page-subtitle">
            The organisational structure of our NGO
          </p>
        </div>
      </section>

      <div className="org-structure">
        <img
          src="/images/Gemini_Generated_Image_cf4tzacf4tzacf4t.webp"
          alt="Organisational structure of Sevamrita Foundation"
          className="org-structure-img"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default Team;
