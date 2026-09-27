import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AWARENESS_TO_ACTION, revealOnScroll, revealSteps } from '../../modules/deAddiction';
import './AwarenessToAction.css';

gsap.registerPlugin(useGSAP);

function AwarenessToAction() {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);

  useGSAP(
    () => {
      revealOnScroll('.da-path__media', {
        scope: sectionRef.current,
        from: { opacity: 0, x: -28 },
        start: 'top 80%',
      });
      revealSteps(stepsRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="da-path"
      id={AWARENESS_TO_ACTION.id}
      aria-labelledby="da-path-title"
    >
      <div className="da-shell">
        <header className="da-section-head">
          <h2 id="da-path-title" className="da-section-title">
            {AWARENESS_TO_ACTION.title}
          </h2>
          <p className="da-path__subtitle">
            {AWARENESS_TO_ACTION.subtitle}
          </p>
        </header>

        <div className="da-path__layout">
          <figure className="da-path__media">
            <img
              src={AWARENESS_TO_ACTION.image.src}
              alt={AWARENESS_TO_ACTION.image.alt}
              width={AWARENESS_TO_ACTION.image.width}
              height={AWARENESS_TO_ACTION.image.height}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <ol className="da-path__steps" ref={stepsRef}>
            {AWARENESS_TO_ACTION.steps.map((step, index) => (
              <li key={step.label} className="da-path__step">
                <span className="da-path__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="da-path__icon" aria-hidden="true">
                  <i className={step.icon} />
                </span>
                <span className="da-path__step-label">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default AwarenessToAction;
