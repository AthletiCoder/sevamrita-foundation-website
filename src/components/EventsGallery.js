import React, { useEffect } from 'react';
import { EventsHero, EventsSubNav } from './EventsShell';
import EventPhotoGallery from './EventPhotoGallery';
import { createSmoothScroll } from '../modules/scroll';
import './CSS/Calendar.css';

const EventsGallery = () => {
  useEffect(() => {
    const smooth = createSmoothScroll({
      duration: 1.35,
      wheelMultiplier: 0.8,
    });
    return () => smooth?.destroy();
  }, []);

  return (
    <div className="calendar-page">
      <EventsHero
        title="Photo Gallery"
        subtitle="Moments from our programs across Sevamrita’s initiatives."
      />
      <EventsSubNav />
      <EventPhotoGallery />
    </div>
  );
};

export default EventsGallery;
