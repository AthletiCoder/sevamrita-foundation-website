import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { STORY_EVENTS } from '../modules/story/data';
import './CSS/Story.css';

function Story() {
  const containerRef = useRef(null);
  const markerRef = useRef(null);
  const progressFillRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeYear, setActiveYear] = useState(STORY_EVENTS[0]?.date ?? '');

  useEffect(() => {
    const container = containerRef.current;
    const marker = markerRef.current;
    const items = itemRefs.current.filter(Boolean);

    if (!container || !marker || items.length === 0) {
      return undefined;
    }

    let cancelled = false;
    let cleanup = () => {};

    import('../modules/story/timelineScroll')
      .then(({ initTimelineYearScroll }) => {
        if (cancelled) return;

        cleanup = initTimelineYearScroll({
          container,
          marker,
          progressFill: progressFillRef.current,
          items,
          years: STORY_EVENTS.map((event) => event.date),
          onYearChange: setActiveYear,
        });
      })
      .catch((error) => {
        console.error('Failed to init timeline scroll:', error);
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div className="story-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey: The Making of Sevamrita
          </motion.h1>
          <p className="page-subtitle">
            From humble beginnings to making a lasting impact in communities across India.
          </p>
        </div>
      </section>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-line" aria-hidden="true">
          <div className="timeline-progress" ref={progressFillRef} />
          <div className="timeline-year-marker" ref={markerRef}>
            <span className="timeline-year-value" aria-live="polite">
              {activeYear}
            </span>
          </div>
        </div>

        {STORY_EVENTS.map((event, index) => {
          const isActive = event.date === activeYear;

          return (
            <motion.div
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}${isActive ? ' is-active' : ''}`}
              key={event.date}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="timeline-content">
                <span className="event-date">{event.date}</span>
                <img src={event.image} alt={event.title} className="event-img" />
                <h3 className="event-title">{event.title}</h3>
                <p className="event-desc">{event.description}</p>
              </div>
              <div className="timeline-dot" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Story;
