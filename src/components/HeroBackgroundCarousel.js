import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LANDING_HERO_CAROUSEL } from '../modules/landing';
import './CSS/HeroBackgroundCarousel.css';

const INTERVAL_MS = 5500;

function HeroBackgroundCarousel({ images = LANDING_HERO_CAROUSEL }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="hero-bg-carousel" aria-hidden="true">
      {images.map((image, index) => {
        const isActive = index === activeIndex;
        return (
          <img
            key={image.src}
            src={image.src}
            alt=""
            className={`hero-bg-carousel__slide${isActive ? ' is-active' : ''}`}
            style={{ opacity: isActive ? 1 : 0 }}
            width={1600}
            height={900}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        );
      })}
      <div className="hero-bg-carousel__overlay" />
    </div>
  );
}

HeroBackgroundCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
};

export default HeroBackgroundCarousel;
