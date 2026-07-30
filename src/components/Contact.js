import React from 'react';
import {
  CONTACT_INFO,
  SOCIAL_LINKS,
  LOCATIONS,
  MAP_EMBED_SRC,
  PAGE_COPY,
  getLocationMapsUrl,
} from '../modules/contact';
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
                <a href={CONTACT_INFO.phoneHref} className="contact-channel">
                  <span className="contact-channel-icon" aria-hidden="true">
                    <i className="fas fa-phone" />
                  </span>
                  <span className="contact-channel-body">
                    <span className="contact-channel-label">Phone</span>
                    <span className="contact-channel-value">{CONTACT_INFO.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.emailHref} className="contact-channel">
                  <span className="contact-channel-icon" aria-hidden="true">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="contact-channel-body">
                    <span className="contact-channel-label">Email</span>
                    <span className="contact-channel-value">{CONTACT_INFO.email}</span>
                  </span>
                </a>
              </li>
            </ul>

            <div className="contact-social-block">
              <h3 className="contact-social-title">Connect with us</h3>
              <ul className="contact-social-list">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="contact-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <i className={link.icon} aria-hidden="true" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-locations-block">
              <h3 className="contact-social-title">Our presence</h3>
              <ul className="contact-location-list">
                {LOCATIONS.map((location) => (
                  <li key={location.key}>
                    <a
                      href={getLocationMapsUrl(location)}
                      className="contact-location-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-map-marker-alt" aria-hidden="true" />
                      <span>
                        {location.name}
                        <span className="contact-location-region">
                          {location.region}
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
                title="Sevamrita Foundation locations — Pune, Amravati, Delhi, and Hyderabad"
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="contact-map-caption">
              Markers show our presence in Pune, Amravati (Maharashtra), Delhi, and Hyderabad (Telangana).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
