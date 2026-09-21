import React from 'react';
import './CSS/Team.css';
import PersonCard from './PersonCard';
import { getDirectors, getTeamGallery } from '../modules/team';

function Team() {
  const directors = getDirectors();
  const gallery = getTeamGallery();

  return (
    <div className="people-container-wrapper">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">Our Team</h1>
          <p className="page-subtitle">
            Meet the dedicated individuals driving our mission forward.
          </p>
        </div>
      </section>

      <section className="people-directors" aria-labelledby="directors-heading">
        <h2 id="directors-heading" className="people-section-title">
          Directors
        </h2>
        <div className="people-directors-row">
          {directors.map((person) => (
            <PersonCard
              key={person.name}
              person={person}
              className="person-card--director"
            />
          ))}
        </div>
      </section>

      <section className="people-gallery" aria-labelledby="team-gallery-heading">
        <h2 id="team-gallery-heading" className="people-section-title">
          Team
        </h2>
        <div className="people-container">
          {gallery.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
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
