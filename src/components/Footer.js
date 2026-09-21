import React from 'react';
import { Link } from 'react-router-dom';
import {
  FOOTER_CONTACT_ITEMS,
  SOCIAL_LINKS,
  resolveFooterContactItem,
} from '../modules/contact';
import {
  FOOTER_BRAND,
  FOOTER_QUICK_LINKS,
  openVolunteerSignup,
} from '../modules/footer';
import './CSS/Footer.css';

function FooterQuickLink({ item }) {
  if (item.action === 'volunteer') {
    return (
      <button
        type="button"
        className="footer-link footer-link--button"
        onClick={openVolunteerSignup}
      >
        {item.label}
      </button>
    );
  }

  return (
    <Link to={item.path} className="footer-link">
      {item.label}
    </Link>
  );
}

function FooterContactValue({ item }) {
  const valueClass = [
    'footer-contact-value',
    item.isPlaceholder ? 'footer-contact-value--placeholder' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (item.href && !item.isPlaceholder) {
    return (
      <a
        href={item.href}
        className={`${valueClass} footer-contact-link`}
        {...(item.maps
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : null)}
      >
        {item.value}
      </a>
    );
  }

  return <span className={valueClass}>{item.value}</span>;
}

function Footer() {
  const year = new Date().getFullYear();
  const contactItems = FOOTER_CONTACT_ITEMS.map(resolveFooterContactItem);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <section className="footer-col footer-col--brand" aria-labelledby="footer-brand-heading">
            <Link to={FOOTER_BRAND.homePath} className="footer-brand">
              <img
                src={FOOTER_BRAND.logoSrc}
                alt=""
                width={FOOTER_BRAND.logoWidth}
                height={FOOTER_BRAND.logoHeight}
                className="footer-brand-logo"
                loading="lazy"
                decoding="async"
              />
              <span id="footer-brand-heading" className="footer-brand-name">
                {FOOTER_BRAND.name}
              </span>
            </Link>

            <p className="footer-mission">{FOOTER_BRAND.mission}</p>

            <ul className="footer-social" aria-label="Social media">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="footer-social-link"
                  >
                    <i className={link.icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <nav className="footer-col footer-col--links" aria-labelledby="footer-links-heading">
            <h2 id="footer-links-heading" className="footer-heading">
              Quick Links
            </h2>
            <ul className="footer-link-list">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.key}>
                  <FooterQuickLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <section className="footer-col footer-col--contact" aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="footer-heading">
              Contact Info
            </h2>
            <ul className="footer-contact-list">
              {contactItems.map((item) => (
                <li key={item.key} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <i className={item.icon} />
                  </span>
                  <div className="footer-contact-body">
                    <span className="footer-contact-label">{item.label}</span>
                    <FooterContactValue item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Sevamrita Foundation. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
