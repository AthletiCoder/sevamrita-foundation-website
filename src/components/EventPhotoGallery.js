import React, { useEffect, useState, useCallback } from 'react';
import { GALLERY_SECTIONS, buildHallSlots } from '../modules/eventsGallery';
import './CSS/EventPhotoGallery.css';

function EventPhotoGallery() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const openLightbox = useCallback((image, sectionTitle) => {
    setLightbox({ ...image, sectionTitle });
  }, []);

  return (
    <section
      id="gallery"
      className="event-gallery"
      aria-labelledby="event-gallery-title"
    >
      <div className="container-custom">
        <header className="event-gallery__intro">
          <h2 id="event-gallery-title" className="section-title">
            <i className="fas fa-images" aria-hidden="true" /> Photo Gallery
          </h2>
          <p className="section-description">
            Browse moments from our events — hover to pause, click to enlarge.
          </p>
        </header>
      </div>

      {GALLERY_SECTIONS.map((section, index) => (
        <div
          key={section.key}
          id={`gallery-${section.key}`}
          className={`event-gallery__section${index % 2 === 1 ? ' event-gallery__section--alt' : ''}`}
        >
          <div className="container-custom">
            <div className="event-gallery__heading">
              <h3>
                <i className={section.icon} aria-hidden="true" />
                {section.title}
              </h3>
              <p>{section.description}</p>
            </div>
          </div>

          {section.images.length > 0 ? (
            <MarqueeStrip
              images={buildHallSlots(section.images)}
              direction={index % 2 === 0 ? 'left' : 'right'}
              sectionTitle={section.title}
              onImageClick={openLightbox}
            />
          ) : (
            <div className="container-custom">
              <p className="event-gallery__empty">Photos coming soon.</p>
            </div>
          )}
        </div>
      ))}

      {lightbox && (
        <div
          className="event-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.sectionTitle}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="event-gallery__lightbox-close"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

/* ─── Marquee strip: infinite loop, pauses on hover ─── */

const ensureMinItems = (items, minCount = 10) => {
  if (!items || items.length === 0) return [];
  let result = [...items];
  while (result.length < minCount) {
    result = [...result, ...items];
  }
  return result;
};

function MarqueeStrip({ images, direction, sectionTitle, onImageClick }) {
  const displayItems = ensureMinItems(images, 10);
  if (displayItems.length === 0) return null;

  const duration = `${Math.max(25, displayItems.length * 3.5)}s`;

  return (
    <div
      className="event-gallery__marquee"
      aria-label={`${sectionTitle} photo gallery`}
    >
      <div className={`event-gallery__marquee-track event-gallery__marquee-track--${direction}`}>
        <div
          className="event-gallery__marquee-group"
          style={{ animationDuration: duration }}
        >
          {displayItems.map((image, imgIndex) => (
            <button
              key={`${image.key || image.src || imgIndex}-a-${imgIndex}`}
              type="button"
              className="event-gallery__marquee-item"
              onClick={() => onImageClick(image, sectionTitle)}
              aria-label={`View ${sectionTitle} photo ${(imgIndex % images.length) + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </div>
        <div
          className="event-gallery__marquee-group"
          style={{ animationDuration: duration }}
          aria-hidden="true"
        >
          {displayItems.map((image, imgIndex) => (
            <button
              key={`${image.key || image.src || imgIndex}-b-${imgIndex}`}
              type="button"
              tabIndex={-1}
              className="event-gallery__marquee-item"
              onClick={() => onImageClick(image, sectionTitle)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventPhotoGallery;
