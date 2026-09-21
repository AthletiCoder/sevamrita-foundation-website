import React, { useState } from 'react';
import {
  RESOURCE_SECTIONS,
  EMPTY_SECTION_MESSAGE,
  DOC_PENDING_LABEL,
  DEFAULT_DOC_ICON,
} from '../modules/resources';
import DocumentViewer from './DocumentViewer';
import './CSS/Resources.css';

const DocumentItem = ({ doc, onOpen }) => {
  const icon = doc.icon || DEFAULT_DOC_ICON;
  const hasFile = Boolean(doc.href);

  if (hasFile) {
    return (
      <li>
        <button
          type="button"
          className="resource-doc-link"
          onClick={() => onOpen(doc)}
        >
          <i className={icon} aria-hidden="true"></i>
          <span>{doc.label}</span>
          {doc.year ? <span className="resource-doc-year">{doc.year}</span> : null}
        </button>
      </li>
    );
  }

  return (
    <li>
      <span className="resource-doc-pending" title={DOC_PENDING_LABEL}>
        <i className={icon} aria-hidden="true"></i>
        <span>{doc.label}</span>
        <span className="resource-doc-badge">{DOC_PENDING_LABEL}</span>
      </span>
    </li>
  );
};

const ResourceSection = ({ section, index, onOpenDocument }) => (
  <article className="unified-card resource-card">
    <div className="resource-card-header">
      <span className="resource-card-icon">
        <i className={section.icon} aria-hidden="true"></i>
      </span>
      <div className="resource-card-heading">
        <span className="resource-card-index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="resource-card-title">{section.title}</h2>
      </div>
    </div>

    {section.description ? (
      <p className="resource-card-description">{section.description}</p>
    ) : null}

    {section.documents.length > 0 ? (
      <ul className="resource-doc-list">
        {section.documents.map((doc) => (
          <DocumentItem
            key={doc.label}
            doc={doc}
            onOpen={onOpenDocument}
          />
        ))}
      </ul>
    ) : (
      <p className="resource-empty">
        <i className="fas fa-hourglass-half" aria-hidden="true"></i>
        {EMPTY_SECTION_MESSAGE}
      </p>
    )}
  </article>
);

const Resources = () => {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <div className="resources-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">Resources</h1>
          <p className="page-subtitle">
            Annual reports, tax &amp; compliance documents, governance papers, and
            certifications — shared in the spirit of transparency.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="resources-grid">
          {RESOURCE_SECTIONS.map((section, index) => (
            <ResourceSection
              key={section.key}
              section={section}
              index={index}
              onOpenDocument={setActiveDoc}
            />
          ))}
        </div>
      </section>

      <DocumentViewer doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </div>
  );
};

export default Resources;
