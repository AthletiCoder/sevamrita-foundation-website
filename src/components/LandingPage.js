import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './CSS/LandingPage.css';
import StatCards from './StatCards';
import AuthModal from './AuthModal';
import {
  FOCUS_SECTIONS,
  WELCOME_HERO_IMAGE,
  EDUCATION_SECTION_ID,
  calculateWelcomeHeroLayout,
} from '../modules/landing';
import { scrollToHash } from '../utils/scrollToHash';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  // Back/forward remounts the route — skip entrance animations so it doesn't look like a refresh.
  const isReturning = navigationType === 'POP';
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');
  const heroPinRef = useRef(null);

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: isReturning,
  });

  useEffect(() => {
    const pin = heroPinRef.current;
    if (!pin) {
      return undefined;
    }

    const applyLayout = () => {
      const layout = calculateWelcomeHeroLayout(window.innerWidth, window.innerHeight);
      pin.dataset.heroLayoutMode = layout.mode;
      pin.style.setProperty('--hero-img-width', `${layout.width}px`);
      pin.style.setProperty('--hero-img-height', `${layout.height}px`);
      pin.style.setProperty('--hero-img-right', `${layout.marginRight}px`);
    };

    applyLayout();
    window.addEventListener('resize', applyLayout);
    return () => window.removeEventListener('resize', applyLayout);
  }, []);

  const actionCards = [
    { id: 1, title: 'Our Events', titleLines: ['Our', 'Events'], icon: 'fas fa-calendar-alt', variant: 'events', path: '/events-calender' },
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
    scrollToHash(`#${EDUCATION_SECTION_ID}`);
  };

  return (
    <div className="landing-page">
      <section className="hero-modern-section">
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

        <div className="hero-visual-spacer" aria-hidden="true" />
        <div className="hero-sticky-pin" ref={heroPinRef} aria-hidden="true">
          <img
            src={WELCOME_HERO_IMAGE.src}
            alt=""
            className="hero-visual-img"
            width={WELCOME_HERO_IMAGE.width}
            height={WELCOME_HERO_IMAGE.height}
            decoding="async"
          />
        </div>
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className="container-custom">
          <StatCards inView={statsInView} animate={!isReturning} />
        </div>
      </section>

      {FOCUS_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`focus-section focus-section--${section.align}`}
        >
          <div className="container-custom">
            <div className="focus-grid">
              <div className="focus-copy">
                <h2 className="focus-section-title">{section.title}</h2>
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

      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        initialView={authView}
      />
    </div>
  );
}

export default LandingPage;
