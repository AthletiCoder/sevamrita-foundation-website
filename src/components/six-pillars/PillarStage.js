import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PillarExperience from './PillarExperience';
import { PILLARS, createPillarScroll } from '../../modules/pillars';
import './PillarStage.css';

gsap.registerPlugin(useGSAP);

function PillarStage() {
  const stageRef = useRef(null);
  const total = PILLARS.length;

  useGSAP(
    (_context, _contextSafe) => {
      return createPillarScroll(stageRef.current);
    },
    { scope: stageRef, dependencies: [] }
  );

  return (
    <section
      className="sp-stage"
      ref={stageRef}
      aria-label="Six Pillars experience"
    >
      <div className="sp-stage__pin">
        <div className="sp-stage__panels">
          {PILLARS.map((pillar, index) => (
            <PillarExperience
              key={pillar.id}
              pillar={pillar}
              index={index}
              total={total}
              align={index % 2 === 0 ? 'start' : 'end'}
              priority={index === 0}
            />
          ))}
        </div>

        <nav className="sp-stage__progress" aria-label="Pillar navigation">
          <ol className="sp-stage__progress-list">
            {PILLARS.map((pillar, index) => (
              <li key={pillar.id} className="sp-stage__progress-item">
                <a
                  href={`#${pillar.id}`}
                  className="sp-stage__progress-link"
                  data-pillar-index={index}
                  aria-label={`${pillar.title}${pillar.english ? ` — ${pillar.english}` : ''}`}
                >
                  <span className="sp-stage__progress-name">{pillar.title}</span>
                  {pillar.english && (
                    <span className="sp-stage__progress-english">
                      {pillar.english}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

export default PillarStage;
