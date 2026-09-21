import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GALLERY_SECTIONS } from '../modules/eventsGallery';
import './CSS/EventPhotoGallery.css';

function EventPhotoGallery() {
  const rootRef = useRef(null);
  const navRef = useRef(null);
  const sectionRefs = useRef([]);
  const [lightbox, setLightbox] = useState(null);
  const [activeKey, setActiveKey] = useState(GALLERY_SECTIONS[0]?.key ?? '');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let cancelled = false;
    let cleanupScroll = () => {};
    let cleanupNav = () => {};

    Promise.all([
      import('../modules/eventsGallery/galleryScroll'),
      import('../modules/eventsGallery/galleryNav'),
    ])
      .then(([{ initGalleryScroll }, { initGalleryNav }]) => {
        if (cancelled) return;
        cleanupScroll = initGalleryScroll(root);
        cleanupNav = initGalleryNav({
          root,
          nav: navRef.current,
          sections: sectionRefs.current.filter(Boolean),
          onActiveChange: setActiveKey,
        });
      })
      .catch((error) => {
        console.error('Failed to init gallery animations:', error);
      });

    return () => {
      cancelled = true;
      cleanupScroll();
      cleanupNav();
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  useEffect(() => {
    const activeBtn = navRef.current?.querySelector(`[data-nav-key="${activeKey}"]`);
    activeBtn?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [activeKey]);

  const openLightbox = useCallback((image, sectionTitle) => {
    setLightbox({ ...image, sectionTitle });
  }, []);

  const scrollToSection = useCallback((key) => {
    const el = document.getElementById(`gallery-${key}`);
    if (!el) return;
    setActiveKey(key);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section
      id="gallery"
      className="event-gallery"
      ref={rootRef}
      aria-labelledby="event-gallery-title"
    >
      <div className="container-custom">
        <header className="event-gallery__intro">
          <h2 id="event-gallery-title" className="section-title section-title-left">
            <i className="fas fa-images" aria-hidden="true" /> Photo Gallery
          </h2>
          <p className="section-description">
            Moments from our programs — scroll to explore each initiative.
          </p>
        </header>
      </div>

      <div className="event-gallery__nav-wrap">
        <nav ref={navRef} className="event-gallery__nav" aria-label="Gallery sections">
          {GALLERY_SECTIONS.map((section) => (
            <button
              key={section.key}
              type="button"
              data-nav-key={section.key}
              className={`event-gallery__nav-link${activeKey === section.key ? ' is-active' : ''}`}
              onClick={() => scrollToSection(section.key)}
              aria-current={activeKey === section.key ? 'true' : undefined}
            >
              <span className="event-gallery__nav-label">
                <i className={section.icon} aria-hidden="true" />
                {section.title}
              </span>
              <span className="event-gallery__nav-track" aria-hidden="true">
                <span
                  className="event-gallery__nav-progress"
                  data-nav-progress={section.key}
                />
              </span>
            </button>
          ))}
        </nav>
      </div>

      {GALLERY_SECTIONS.map((section, index) => (
        <div
          key={section.key}
          id={`gallery-${section.key}`}
          className={`event-gallery__section${index % 2 === 1 ? ' event-gallery__section--alt' : ''}`}
          data-gallery-section={section.key}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
        >
          <div className="container-custom">
            <div className="event-gallery__heading" data-gallery-heading>
              <h3>
                <i className={section.icon} aria-hidden="true" />
                {section.title}
              </h3>
              <p>{section.description}</p>
            </div>

            <div className="event-gallery__grid">
              {section.images.map((image, imgIndex) => (
                <button
                  key={image.src}
                  type="button"
                  className={`event-gallery__tile event-gallery__tile--${(imgIndex % 5) + 1}`}
                  data-gallery-tile
                  onClick={() => openLightbox(image, section.title)}
                  aria-label={`View ${section.title} photo ${imgIndex + 1}`}
                >
                  <span className="event-gallery__media">
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                  </span>
                </button>
              ))}
            </div>
          </div>
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

export default EventPhotoGallery;
