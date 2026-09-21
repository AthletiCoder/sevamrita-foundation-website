import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_COPY, WHY_WE_DO_SECTIONS } from '../modules/whyWeDo';
import { scrollToHash } from '../utils/scrollToHash';
import WhyWeDoCard from './WhyWeDoCard';
import './CSS/WhyWeDo.css';

function WhyWeDo() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToHash(location.hash);
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  return (
    <div className="whywedo-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">{PAGE_COPY.title}</h1>
          <p className="page-subtitle">{PAGE_COPY.subtitle}</p>
        </div>
      </section>

      {WHY_WE_DO_SECTIONS.map((section, index) => (
        <section
          key={section.key}
          id={section.id}
          className={`whywedo-section ${index % 2 === 1 ? 'whywedo-section--alt' : ''}`}
        >
          <div className="whywedo-section-inner">
            <header className="whywedo-section-header">
              <p className="whywedo-section-eyebrow">{section.title}</p>
              {section.lead ? (
                <h2 className="whywedo-section-title">{section.lead}</h2>
              ) : null}
            </header>

            <div className="whywedo-card-grid">
              {section.cards.map((card) => (
                <WhyWeDoCard
                  key={card.key}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default WhyWeDo;
