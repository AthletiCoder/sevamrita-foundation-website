import React from 'react';
import { RESOURCE_SECTIONS, EMPTY_SECTION_MESSAGE } from '../modules/resources';
import './CSS/Resources.css';

const ResourceSection = ({ section }) => (
  <div className="unified-card resource-card">
    <div className="resource-card-header">
      <span className="resource-card-icon">
        <i className={section.icon} aria-hidden="true"></i>
      </span>
      <h3 className="resource-card-title">{section.title}</h3>
    </div>
    <p className="resource-card-description">{section.description}</p>

    {section.documents.length > 0 ? (
      <ul className="resource-doc-list">
        {section.documents.map((doc) => (
          <li key={doc.href}>
            <a
              href={doc.href}
              className="resource-doc-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-file-pdf" aria-hidden="true"></i>
              <span>{doc.label}</span>
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <p className="resource-empty">
        <i className="fas fa-hourglass-half" aria-hidden="true"></i>
        {EMPTY_SECTION_MESSAGE}
      </p>
    )}
  </div>
);

const Resources = () => (
  <div className="resources-page">
    <section className="page-hero">
      <div className="page-hero-content">
        <h1 className="page-title">
          Resources
        </h1>
        <p className="page-subtitle">
          Legal documents, audited financial reports and yearly activity reports of
          Sevamrita Foundation — available for everyone, in the spirit of transparency.
        </p>
      </div>
    </section>

    <section className="page-section">
      <div className="resources-grid">
        {RESOURCE_SECTIONS.map((section) => (
          <ResourceSection key={section.key} section={section} />
        ))}
      </div>
    </section>
  </div>
);

export default Resources;
