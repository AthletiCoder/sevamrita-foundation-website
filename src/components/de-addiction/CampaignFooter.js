import React from 'react';
import { Link } from 'react-router-dom';
import { CAMPAIGN_FOOTER } from '../../modules/deAddiction';
import {
  CONTACT_INFO,
  SOCIAL_LINKS,
} from '../../modules/contact';
import './CampaignFooter.css';

function CampaignFooter() {
  return (
    <footer className="da-footer" data-nav-tone="dark">
      <div className="da-shell da-footer__grid">
        <div className="da-footer__brand-block">
          <p className="da-footer__brand">{CAMPAIGN_FOOTER.brand}</p>
          <p className="da-footer__initiative">{CAMPAIGN_FOOTER.initiative}</p>
          <p className="da-footer__tagline">{CAMPAIGN_FOOTER.tagline}</p>
        </div>

        <div className="da-footer__contact">
          <p className="da-footer__label">Campaign contact</p>
          <a href={CONTACT_INFO.emailHref} className="da-footer__link">
            {CONTACT_INFO.email}
          </a>
          <a href={CONTACT_INFO.phoneHref} className="da-footer__link">
            {CONTACT_INFO.phone}
          </a>
          <Link to={CAMPAIGN_FOOTER.website.href} className="da-footer__link">
            {CAMPAIGN_FOOTER.website.label}
          </Link>
        </div>

        <ul className="da-footer__social" aria-label="Social links">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="da-footer__social-link"
              >
                <i className={link.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default CampaignFooter;
