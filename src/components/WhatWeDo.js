import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SixPillars from './six-pillars/SixPillars';
import { createSmoothScroll } from '../modules/scroll';
import { PILLARS, scrollToPillarIndex } from '../modules/pillars';
import { scrollToHash } from '../utils/scrollToHash';

const WhatWeDo = () => {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = createSmoothScroll({
      duration: 1.45,
      wheelMultiplier: 0.85,
      touchMultiplier: 0.9,
    });
    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const id = location.hash.replace(/^#/, '');
    const pillarIndex = PILLARS.findIndex((pillar) => pillar.id === id);

    const timeoutId = window.setTimeout(() => {
      if (pillarIndex >= 0) {
        scrollToPillarIndex(pillarIndex, PILLARS.length);
      } else {
        scrollToHash(location.hash);
      }
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  return <SixPillars />;
};

export default WhatWeDo;
