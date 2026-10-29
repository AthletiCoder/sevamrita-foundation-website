import React, { useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { SEVA_SMRITI_GIFTS, SEVA_SMRITI_HERO } from '../modules/sevaSmriti/data';
import './CSS/SevaSmriti.css';

/* ─── Marquee Strip (pure CSS dual-group infinite loop) ─── */

const ensureMinItems = (items, minCount = 10) => {
  if (!items || items.length === 0) return [];
  let result = [...items];
  while (result.length < minCount) {
    result = [...result, ...items];
  }
  return result;
};

function MarqueeStrip({ images, direction, giftName, onImageClick }) {
  const displayItems = ensureMinItems(images, 10);
  if (displayItems.length === 0) return null;

  const duration = `${Math.max(25, displayItems.length * 3.5)}s`;

  return (
    <div
      className="smriti-gallery__marquee"
      aria-label={`${giftName} photos`}
    >
      <div className={`smriti-gallery__marquee-track smriti-gallery__marquee-track--${direction}`}>
        <div
          className="smriti-gallery__marquee-group"
          style={{ animationDuration: duration }}
        >
          {displayItems.map((img, i) => (
            <button
              key={`${img.file || i}-a-${i}`}
              type="button"
              className="smriti-gallery__marquee-item"
              onClick={() => onImageClick(img, giftName)}
              aria-label={`View ${giftName} photo ${(i % images.length) + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </div>
        <div
          className="smriti-gallery__marquee-group"
          style={{ animationDuration: duration }}
          aria-hidden="true"
        >
          {displayItems.map((img, i) => (
            <button
              key={`${img.file || i}-b-${i}`}
              type="button"
              tabIndex={-1}
              className="smriti-gallery__marquee-item"
              onClick={() => onImageClick(img, giftName)}
            >
              <img
                src={img.src}
                alt={img.alt}
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

/* ─── Lightbox ─── */

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="smriti-gallery__lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.giftName}
      onClick={onClose}
    >
      <button
        type="button"
        className="smriti-gallery__lightbox-close"
        aria-label="Close"
        onClick={onClose}
      >
        <i className="fas fa-times" aria-hidden="true" />
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ─── Page ─── */

function SevaSmriti() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((img, giftName) => {
    setLightbox({ ...img, giftName });
  }, []);

  return (
    <div className="smriti-page">

      {/* ── Hero ── */}
      <header className="smriti-hero">
        <motion.div
          className="smriti-hero__ornament"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          aria-hidden="true"
        >
          <i className="fas fa-gift" />
        </motion.div>

        <motion.h1
          className="smriti-hero__title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {SEVA_SMRITI_HERO.title}
        </motion.h1>

        <motion.p
          className="smriti-hero__subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {SEVA_SMRITI_HERO.subtitle}
        </motion.p>

        <motion.div
          className="smriti-hero__divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          aria-hidden="true"
        >
          <hr className="smriti-hero__divider-line" />
          <div className="smriti-hero__divider-dot" />
          <div className="smriti-hero__divider-dot" />
          <div className="smriti-hero__divider-dot" />
          <hr className="smriti-hero__divider-line" />
        </motion.div>
      </header>

      {/* ── Gift Sections (vertical, one per gift) ── */}
      <section className="smriti-gallery" aria-label="Gift collection">
        {SEVA_SMRITI_GIFTS.map((giftItem, index) => (
          <div
            key={giftItem.key}
            id={`gift-${giftItem.key}`}
            className={`smriti-gallery__section${index % 2 === 1 ? ' smriti-gallery__section--alt' : ''}`}
          >
            <div className="container-custom">
              <div className="smriti-gallery__heading">
                <h2>
                  <i className={giftItem.icon} aria-hidden="true" />
                  {giftItem.name}
                </h2>
                <p>{giftItem.description}</p>
              </div>
            </div>

            {giftItem.images.length > 0 ? (
              <MarqueeStrip
                images={giftItem.images}
                direction={index % 2 === 0 ? 'left' : 'right'}
                giftName={giftItem.name}
                onImageClick={openLightbox}
              />
            ) : (
              <div className="container-custom">
                <p className="smriti-gallery__empty">Photos coming soon.</p>
              </div>
            )}
          </div>
        ))}
      </section>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}

export default SevaSmriti;
