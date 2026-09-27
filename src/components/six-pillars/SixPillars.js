import React from 'react';
import Intro from './Intro';
import PillarStage from './PillarStage';
import MissionBreak from './MissionBreak';
import { PILLARS } from '../../modules/pillars';
import './SixPillars.css';

function SixPillars() {
  return (
    <div className="sp-page">
      <a className="sp-skip" href={`#${PILLARS[0]?.id}`}>
        Skip to content
      </a>

      <Intro />

      <main>
        <PillarStage />
        <MissionBreak />
      </main>
    </div>
  );
}

export default SixPillars;
