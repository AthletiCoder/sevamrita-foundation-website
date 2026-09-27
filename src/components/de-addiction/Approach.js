import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  APPROACH,
  revealOnScroll,
  bindRevealCards,
} from '../../modules/deAddiction';
import CampaignRevealCard from './CampaignRevealCard';
import './Approach.css';

gsap.registerPlugin(useGSAP);

function Approach() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      revealOnScroll('.da-approach__list > li', {
        scope: sectionRef.current,
        from: { opacity: 0, y: 32 },
      });

      const mm = bindRevealCards(sectionRef.current);
      return () => mm?.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="da-approach"
      id={APPROACH.id}
      aria-labelledby="da-approach-title"
    >
      <div className="da-shell">
        <header className="da-section-head">
          <h2 id="da-approach-title" className="da-section-title">
            {APPROACH.title}
          </h2>
          <p className="da-lead">{APPROACH.lead}</p>
        </header>

        <ul className="da-approach__list">
          {APPROACH.items.map((item) => (
            <li key={item.title}>
              <CampaignRevealCard
                title={item.title}
                icon={item.icon}
                image={item.image}
                body={item.body}
                tone="light"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Approach;
