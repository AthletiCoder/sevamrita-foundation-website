import React from 'react';
import { PAGE, PILLARS } from '../../modules/pillars';
import './Intro.css';

function Intro() {
  const { intro } = PAGE;
  const firstId = PILLARS[0]?.id;

  return (
    <header className="sp-intro" data-nav-tone="dark">
      <div className="sp-intro__content">
        <h1 className="sp-intro__title">
          <span className="sp-intro__line">Six Pillars</span>
          <span className="sp-intro__line">of Service</span>
        </h1>
        <p className="sp-intro__subtitle">{intro.subtitle}</p>
        {firstId && (
          <a
            className="sp-intro__scroll"
            href={`#${firstId}`}
            aria-label={`Continue to ${PILLARS[0].title}`}
          >
            <span className="sp-intro__scroll-icon" aria-hidden="true" />
          </a>
        )}
      </div>
    </header>
  );
}

export default Intro;
