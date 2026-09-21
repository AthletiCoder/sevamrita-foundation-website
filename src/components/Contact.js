import React from 'react';
import {
  CONTACT_INFO,
  SOCIAL_LINKS,
  REGISTERED_OFFICE,
  BRANCH_OFFICES,
  MAP_EMBED_SRC,
  PAGE_COPY,
  getLocationMapsUrl,
} from '../modules/contact';
import ContactPhoneChannel from './ContactPhoneChannel';
import './CSS/Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">{PAGE_COPY.title}</h1>
          <p className="page-subtitle">{PAGE_COPY.subtitle}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="contact-layout">
          <div className="contact-details">
            <h2 className="contact-section-title">Get in touch</h2>
            <p className="contact-section-lead">
              Write to us, give us a call, or follow along on social media.
            </p>

            <ul className="contact-channels">
              <li>
                <ContactPhoneChannel />
              </li>
              <li>
                <a href={CONTACT_INFO.emailHref} className="contact-channel">
                  <span className="contact-channel-icon" aria-hidden="true">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="contact-channel-body">
                    <span className="contact-channel-label">Email</span>
                    <span className="contact-channel-value">
                      {CONTACT_INFO.email}
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            <div className="contact-social-block">
              <h3 className="contact-social-title">Connect with us</h3>
              <p className="contact-social-lead">{PAGE_COPY.socialLead}</p>
              <ul className="contact-social-list">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="contact-social-link"
                      data-platform={link.key}
                      style={{
                        '--social-accent': link.accent,
                        ...(link.accentDark
                          ? { '--social-accent-dark': link.accentDark }
                          : null),
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <span className="contact-social-icon" aria-hidden="true">
                        <i className={link.icon} />
                      </span>
                      <span className="contact-social-label">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="contact-presence">
            <h2 className="contact-section-title">Our presence</h2>

            <div className="contact-locations-block">
              <article className="contact-office-card contact-office-card--registered">
                <div className="contact-office-card-top">
                  <span className="contact-office-badge">Registered office</span>
                  <i className="fas fa-building" aria-hidden="true" />
                </div>
                <p className="contact-office-address">
                  {REGISTERED_OFFICE.address}
                </p>
              </article>

              <div className="contact-branches">
                <h3 className="contact-branches-title">Branch offices</h3>
                <ul className="contact-branch-grid">
                  {BRANCH_OFFICES.map((office) => (
                    <li key={office.key}>
                      <a
                        href={getLocationMapsUrl(office)}
                        className="contact-branch-card"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="contact-branch-pin" aria-hidden="true">
                          <i className="fas fa-map-marker-alt" />
                        </span>
                        <span className="contact-branch-text">
                          <span className="contact-branch-name">{office.name}</span>
                          <span className="contact-branch-region">
                            {office.region}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="contact-map-panel">
              <div className="contact-map-frame">
                <iframe
                  title="Sevamrita Foundation locations — Mumbai, Pune, Amravati, Delhi, and Hyderabad"
                  src={MAP_EMBED_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="contact-map-caption">
                Markers show our branch presence in Mumbai, Pune, Amravati
                (Maharashtra), Delhi, and Hyderabad (Telangana).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
