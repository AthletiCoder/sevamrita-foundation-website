import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO, SOCIAL_LINKS } from '../modules/contact';
import './CSS/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <h6>Contact Us</h6>
          <div className="footer-contact">
            {CONTACT_INFO.phone}
          </div>
          <a href={CONTACT_INFO.emailHref} className="footer-link">
            {CONTACT_INFO.email}
          </a>
        </div>

        <div className="footer-item">
          <h6>Quick Links</h6>
          <Link to="/contact" className="footer-link">Contact</Link><br />
          <Link to="/contribute" className="footer-link">Support Us</Link>
        </div>

        <div className="footer-item">
          <h6>Connect With Us</h6>
          <div className="social-media">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="mb-0">© {new Date().getFullYear()} Sevamrita Foundation. All Rights Reserved.</p>
          <small className="text-muted">Last Updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
