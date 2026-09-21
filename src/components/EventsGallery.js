import React from 'react';
import { EventsHero, EventsSubNav } from './EventsShell';
import EventPhotoGallery from './EventPhotoGallery';
import './CSS/Calendar.css';

const EventsGallery = () => (
  <div className="calendar-page">
    <EventsHero
      title="Photo Gallery"
      subtitle="Moments from our programs across Sevamrita’s initiatives."
    />
    <EventsSubNav />
    <EventPhotoGallery />
  </div>
);

export default EventsGallery;
