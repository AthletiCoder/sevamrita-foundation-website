import React from 'react';
import { PAGE } from '../../modules/pillars';
import './MissionBreak.css';

function MissionBreak() {
  const { missionBreak } = PAGE;

  return (
    <section className="sp-break" data-nav-tone="dark" aria-labelledby="sp-break-title">
      <div className="sp-break__inner">
        <h2 className="sp-break__title" id="sp-break-title">
          {missionBreak.title}
        </h2>
        <p className="sp-break__subtitle">{missionBreak.subtitle}</p>
      </div>
    </section>
  );
}

export default MissionBreak;
