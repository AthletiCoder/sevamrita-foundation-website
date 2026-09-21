import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pillars from './Pillars';
import { scrollToHash } from '../utils/scrollToHash';

const WhatWeDo = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToHash(location.hash);
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  return (
    <div className="whatwedo-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">
            Six Pillars of Service
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
