import React, { useState } from 'react';
import { useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CSS/LandingPage.css';
import StatCards from './StatCards';
import AuthModal from './AuthModal';
import HeroBackgroundCarousel from './HeroBackgroundCarousel';
import {
  FOCUS_SECTIONS,
  STATS_SECTION_ID,
  FLAGSHIP_SECTION_ID,
  SIX_PILLARS_PATH,
} from '../modules/landing';
import { scrollToHash } from '../utils/scrollToHash';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  // Back/forward remounts the route — skip entrance animations so it doesn't look like a refresh.
  // Note: React Router also reports POP on the very first page load.
  const isReturning = navigationType === 'POP';
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');

  const actionCards = [
    { id: 1, title: 'Our Events', titleLines: ['Our', 'Events'], icon: 'fas fa-calendar-alt', variant: 'events', path: '/events/social' },
    { id: 2, title: 'Offer Donation', titleLines: ['Offer', 'Donation'], icon: 'fas fa-hand-holding-heart', variant: 'donation', path: '/contribute' },
    { id: 3, title: 'Become Volunteer', titleLines: ['Become', 'Volunteer'], icon: 'fas fa-users', variant: 'volunteer', action: 'register' },
  ];

  const handleActionCardClick = (card) => {
    if (card.action === 'register') {
      setAuthView('register');
      setShowAuthModal(true);
      return;
    }

    if (card.path) {
      if (card.path === '/contribute' && location.pathname === '/' && location.hash) {
        navigate({ pathname: '/', hash: '' }, { replace: true });
      }
      navigate(card.path);
    }
  };

  const handleKnowMore = () => {
    scrollToHash(`#${STATS_SECTION_ID}`);
  };

  return (
    <div className="landing-page landing-page--hero-carousel">
      <section className="hero-modern-section hero-modern-section--carousel">
        <HeroBackgroundCarousel />

        <div className="container-custom">
          <div className="hero-grid">
            <div className="hero-left">
              <motion.div
                initial={isReturning ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="hero-title-modern">
                  <span className="hero-title-line">
                    service,
                    <img
                      src="/images/inline heart.webp"
                      alt=""
                      className="hero-title-heart"
                      aria-hidden="true"
                      decoding="async"
                    />
                  </span>
                  <span className="hero-title-line">before self</span>
                </h1>
                <p className="hero-description-modern">
                  Sevamrita, a non-profit formed by IIT-Bombay alumni,
                  <span className="hero-description-line2"> stands for transformation brought about by rendering selfless service (sevā)</span>
                </p>
                <button
                  type="button"
                  className="hero-know-more"
                  onClick={handleKnowMore}
                >
                  Know more
                  <i className="fas fa-arrow-down" aria-hidden="true"></i>
                </button>
              </motion.div>
            </div>

            <div className="hero-right">
              <div className="action-card-stack">
                {actionCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className={`action-card action-card--${card.variant}`}
                    initial={isReturning ? false : { x: 48, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      x: { duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.4, delay: index * 0.08, ease: 'easeOut' },
                      y: { duration: 0.2, ease: 'easeOut' },
                      scale: { duration: 0.15, ease: 'easeOut' },
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleActionCardClick(card)}
                  >
                    <div className="action-icon">
                      <i className={card.icon}></i>
                    </div>
                    <span className="action-title">
                      {card.titleLines.map((line) => (
                        <span key={line} className="action-title-line">{line}</span>
                      ))}
                    </span>
                    <div className="action-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" id={STATS_SECTION_ID}>
        <div className="container-custom">
          <StatCards />
        </div>
      </section>

      <section className="flagship-section" id={FLAGSHIP_SECTION_ID}>
        <div className="container-custom">
          <h2 className="flagship-section-heading">Flagship volunteering activities</h2>
        </div>

        {FOCUS_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`focus-section focus-section--${section.align}`}
          >
            <div className="container-custom">
              <div className="focus-grid">
                <div className="focus-copy">
                  <h3 className="focus-section-title">{section.title}</h3>
                  <p className="focus-section-subtitle">{section.subtitle}</p>
                  <p className="focus-section-body">{section.body}</p>
                </div>
                <div className="focus-media">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="focus-media-img"
                    width={600}
                    height={680}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        <div className="container-custom flagship-cta-wrap">
          <button
            type="button"
            className="flagship-know-more"
            onClick={() => navigate(SIX_PILLARS_PATH)}
          >
            Know more about all activities
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        initialView={authView}
      />
    </div>
  );
}

export default LandingPage;
