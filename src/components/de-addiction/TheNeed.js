import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  THE_NEED,
  revealOnScroll,
  animateNeedLead,
} from '../../modules/deAddiction';
import './TheNeed.css';

gsap.registerPlugin(useGSAP);

function TheNeed() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      revealOnScroll('.da-need__intro > *', {
        scope: sectionRef.current,
        from: { opacity: 0, y: 28 },
        start: 'top 85%',
      });
      revealOnScroll('.da-need__stat', {
        scope: sectionRef.current,
        from: { opacity: 0, y: 56 },
        start: 'top 90%',
        duration: 0.9,
      });
      animateNeedLead(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="da-need"
      id={THE_NEED.id}
      aria-labelledby="da-need-title"
    >
      <div className="da-shell">
        <div className="da-need__intro">
          <h2 id="da-need-title" className="da-need__title">
            {THE_NEED.title}
          </h2>
          <div className="da-need__copy">
            <p className="da-need__lead" aria-live="polite">
              <span className="da-need__lead-prefix">Our goal is</span>{' '}
              <span className="da-need__word-wrap">
                <span className="da-need__word" data-need-word />
                <span className="da-need__mark" data-need-mark aria-hidden="true" />
              </span>
              <span className="da-need__sr-only">
                Our goal is liberation.
              </span>
            </p>
            <blockquote className="da-need__quote">
              <p>“{THE_NEED.quote}”</p>
            </blockquote>
          </div>
        </div>

        <ul className="da-need__stats">
          {THE_NEED.stats.map((stat) => (
            <li key={stat.value} className="da-need__stat">
              <span className="da-need__icon" aria-hidden="true">
                <i className={stat.icon} />
              </span>
              <p className="da-need__value">{stat.value}</p>
              <p className="da-need__label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TheNeed;
