import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_COPY, WHY_WE_DO_SECTIONS } from '../modules/whyWeDo';
import { scrollToHash } from '../utils/scrollToHash';
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
            <p className="whywedo-section-eyebrow">{section.title}</p>
            <h2 className="whywedo-section-title">{section.lead}</h2>

            {section.body && (
              <p className="whywedo-section-body">{section.body}</p>
            )}

            {section.values && (
              <ul className="whywedo-values">
                {section.values.map((value) => (
                  <li key={value.key} className="whywedo-value">
                    <h3 className="whywedo-value-title">{value.title}</h3>
                    <p className="whywedo-value-body">{value.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default WhyWeDo;
