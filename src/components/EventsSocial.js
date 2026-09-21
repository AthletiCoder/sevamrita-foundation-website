import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { EventsHero, EventsSubNav } from './EventsShell';
import SocialPresence from './SocialPresence';
import InNewsFilmstrip from './InNewsFilmstrip';
import './CSS/Calendar.css';

function scrollToHash(hash) {
  if (!hash) return;
  const id = hash.replace(/^#/, '');
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const EventsSocial = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;
    const timer = window.setTimeout(() => scrollToHash(location.hash), 80);
    return () => clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <div className="calendar-page">
      <EventsHero
        title="Social & News"
        subtitle="Highlights from our channels and press coverage of Sevamrita Foundation."
      />
      <EventsSubNav />
      <SocialPresence />
      <InNewsFilmstrip />
    </div>
  );
};

export default EventsSocial;
