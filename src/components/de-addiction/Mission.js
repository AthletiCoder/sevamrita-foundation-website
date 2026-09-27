import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  MISSION,
  revealOnScroll,
  bindRevealCards,
} from '../../modules/deAddiction';
import CampaignRevealCard from './CampaignRevealCard';
import './Mission.css';

gsap.registerPlugin(useGSAP);

function Mission() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      revealOnScroll('.da-mission__head > *', {
        scope: sectionRef.current,
        from: { opacity: 0, y: 24 },
      });
      revealOnScroll('.da-mission__list > li', {
        scope: sectionRef.current,
        from: { opacity: 0, y: 40 },
        start: 'top 88%',
      });

      const mm = bindRevealCards(sectionRef.current);
      return () => mm?.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="da-mission"
      data-nav-tone="dark"
      id={MISSION.id}
      aria-labelledby="da-mission-title"
    >
      <div className="da-shell">
        <header className="da-mission__head">
          <h2 id="da-mission-title" className="da-mission__title">
            {MISSION.headline}
          </h2>
          <p className="da-mission__subtitle">{MISSION.subtitle}</p>
        </header>

        <ul className="da-mission__list">
          {MISSION.pillars.map((pillar) => (
            <li key={pillar.title}>
              <CampaignRevealCard
                title={pillar.title}
                icon={pillar.icon}
                image={pillar.image}
                body={pillar.body}
                tone="dark"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Mission;
