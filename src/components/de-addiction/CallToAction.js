import React from 'react';
import { Link } from 'react-router-dom';
import { CALL_TO_ACTION } from '../../modules/deAddiction';
import './CallToAction.css';

function CallToAction() {
  return (
    <section
      className="da-cta"
      data-nav-tone="dark"
      id={CALL_TO_ACTION.id}
      aria-labelledby="da-cta-title"
    >
      <div className="da-shell da-cta__inner">
        <h2 id="da-cta-title" className="da-cta__title">
          {CALL_TO_ACTION.title}
        </h2>
        <p className="da-cta__tagline">{CALL_TO_ACTION.tagline}</p>

        <div className="da-cta__actions">
          <Link className="da-btn da-btn--primary da-btn--lg" to={CALL_TO_ACTION.primary.href}>
            {CALL_TO_ACTION.primary.label}
          </Link>
          <Link className="da-btn da-btn--outline da-btn--lg" to={CALL_TO_ACTION.secondary.href}>
            {CALL_TO_ACTION.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
