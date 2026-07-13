import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pillars from './Pillars';

const scrollToPillarHash = (hash) => {
  const id = hash.replace(/^#/, '');
  if (!id) {
    return;
  }

  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  const headerEl = document.querySelector('.header');
  const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 80;
  const top = section.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
  window.scrollTo({ top, behavior: 'smooth' });
};

const WhatWeDo = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToPillarHash(location.hash);
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  return (
    <div className="whatwedo-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">
            Six <span className="highlight">Pillars</span> of Service
          </h1>
          <p className="page-subtitle">
            Dedicated initiatives focusing on holistic development and support for the underprivileged.
          </p>
        </div>
      </section>
      <Pillars />
    </div>
  );
};

export default WhatWeDo;
