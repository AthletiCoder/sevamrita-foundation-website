import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './CSS/LandingPage.css';
import StatCards from './StatCards';
import Testimonial from './Testimonial';
import AuthModal from './AuthModal';
import TypewriterTitle from './TypewriterTitle';
import PillarsCarousel from './PillarsCarousel';
import { pillarsCards } from '../modules/pillars';

function LandingPage() {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Action Cards Data
  const actionCards = [
    { id: 1, title: "Join Events", titleLines: ["Join", "Events"], icon: "fas fa-calendar-alt", variant: "events", delay: 0, path: "/events-calender" },
    { id: 2, title: "Offer Donation", titleLines: ["Offer", "Donation"], icon: "fas fa-hand-holding-heart", variant: "donation", delay: 0.2, path: "/contribute" },
    { id: 3, title: "Become Volunteer", titleLines: ["Become", "Volunteer"], icon: "fas fa-users", variant: "volunteer", delay: 0.4, action: "register" },
  ];

  // Handle action card clicks
  const handleActionCardClick = (card) => {
    if (card.action === "register") {
      setAuthView('register');
      setShowAuthModal(true);
    } else if (card.path) {
      navigate(card.path);
    }
  };

  const handleScrollToPillars = () => {
    const section = document.getElementById('our-pillars');
    if (!section) {
      return;
    }

    const headerEl = document.querySelector('.header');
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 80;
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Modern Minimalist Hero Section */}
      <section className="hero-modern-section">
        <div className="container-custom">
          <div className="hero-grid">
            {/* Left Column: Text Content (previously on right) */}
            <div className="hero-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TypewriterTitle
                  text="Welcome!"
                  className="hero-title-modern"
                />
                <h2 className="hero-subtitle-modern">
                सेवा परमो धर्मः
                </h2>
                <p className="hero-motto-modern">
                  sevā paramo dharmaḥ
                </p>
                <p className="hero-description-modern">
                  Sevamrita, a non-profit formed by IIT-Bombay alumni,
                  <span className="hero-description-line2"> stands for transformation brought about by rendering selfless service (sevā)</span>
                </p>
                <button
                  type="button"
                  className="what-we-do-scroll what-we-do-scroll--desktop"
                  onClick={handleScrollToPillars}
                >
                  <span>Know more</span>
                  <i className="fas fa-chevron-down" aria-hidden="true"></i>
                </button>
              </motion.div>
            </div>

            {/* Right Column: Action Card Stack (previously on left) */}
            <div className="hero-right">
              <div className="action-card-stack">
                {actionCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`action-card action-card--${card.variant}`}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: card.delay,
                      type: "spring",
                      stiffness: 100
                    }}
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

          <button
            type="button"
            className="what-we-do-scroll what-we-do-scroll--mobile"
            onClick={handleScrollToPillars}
          >
            <span>Know more</span>
            <i className="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container-custom">
          <StatCards inView={statsInView} />
        </div>
      </section>

      {/* Pillars Section */}
      <section id="our-pillars" className="pillars-section section-padding">
        <div className="container-custom">
          <div className="section-header pillars-section-header">
            <h2 className="section-title">Six Pillars of Service</h2>
            <p className="section-description">
              Dedicated initiatives focusing on holistic development and support for the underprivileged.
            </p>
          </div>

          <PillarsCarousel cards={pillarsCards} />

          <div className="text-center mt-12">
            <Link to="/whatwedo" className="btn-modern-outline hover-lift">
              Know more about our pillars
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <Testimonial />

      {/* Auth Modal for Volunteer Registration */}
      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        initialView={authView}
      />
    </div>
  );
}

export default LandingPage;
