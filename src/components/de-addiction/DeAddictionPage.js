import React, { useEffect, useRef } from 'react';
import Hero from './Hero';
import TheNeed from './TheNeed';
import Mission from './Mission';
import Approach from './Approach';
import AwarenessToAction from './AwarenessToAction';
import CallToAction from './CallToAction';
import CampaignFooter from './CampaignFooter';
import { createCampaignLenis } from '../../modules/deAddiction';
import './DeAddictionPage.css';

function DeAddictionPage() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Freedom Begins from Within | Sevamrita De-addiction';
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    lenisRef.current = createCampaignLenis();
    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="da-page">
      <a className="da-skip" href="#the-need">
        Skip to content
      </a>
      <Hero />
      <main>
        <TheNeed />
        <Mission />
        <Approach />
        <AwarenessToAction />
        <CallToAction />
      </main>
      <CampaignFooter />
    </div>
  );
}

export default DeAddictionPage;
