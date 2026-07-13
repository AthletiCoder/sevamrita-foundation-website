import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import './CSS/stat-card.css';

/**
 * Formats a stat string into a max-3-digit display value.
 * Examples: "20,000+" -> 20k+, "250+" -> 250+, "4+" -> 4+
 */
function parseStatValue(value) {
  const hasPlus = String(value).includes('+');
  const numeric = parseInt(String(value).replace(/\D/g, ''), 10) || 0;

  if (numeric >= 1000) {
    return {
      end: Math.round(numeric / 1000),
      suffix: 'k',
      hasPlus,
    };
  }

  return {
    end: numeric,
    suffix: '',
    hasPlus,
  };
}

function StatCard({ title, value, icon, iconBg, index, sectionInView }) {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);
  const { end, suffix, hasPlus } = parseStatValue(value);

  useEffect(() => {
    if (sectionInView) {
      setIsInView(true);
    }
  }, [sectionInView]);

  useEffect(() => {
    if (isInView) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView]);

  return (
    <div className={`stat-card-col animate-float-delay-${index + 1}`} ref={cardRef}>
      <div className="card card-stats mb-0 border-0">
        <div className="card-body">
          <div className="stat-card-inner">
            <div className="stat-card-text">
              <span className="h2 font-weight-bold mb-0">
                {isInView ? (
                  <span className="count-up text-gradient">
                    <CountUp
                      start={0}
                      end={end}
                      duration={2.5}
                      separator=""
                    />
                    {suffix}
                    {hasPlus ? '+' : ''}
                  </span>
                ) : (
                  <span className="count-up text-gradient">0{suffix}{hasPlus ? '+' : ''}</span>
                )}
              </span>
              <h5 className="card-title text-uppercase text-muted mb-0">{title}</h5>
            </div>
            <div className={`icon icon-shape ${iconBg} text-white rounded-circle shadow`}>
              <i className={icon}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconBg: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  sectionInView: PropTypes.bool,
};

StatCard.defaultProps = {
  sectionInView: false,
};

const statCardsData = [
  { title: 'Cities', value: '3', icon: 'fas fa-city', iconBg: 'bg-gradient-info' },
  { title: 'Offices', value: '4+', icon: 'fas fa-building', iconBg: 'bg-gradient-primary' },
  { title: 'Volunteers', value: '250+', icon: 'fas fa-users', iconBg: 'bg-gradient-warning' },
  { title: 'Lives Impacted', value: '20,000+', icon: 'fas fa-heart', iconBg: 'bg-gradient-danger' }
];

function StatCards({ inView = false }) {
  return (
    <div className="stat-cards-row">
      {statCardsData.map((card, index) => (
        <StatCard
          key={card.title}
          index={index}
          sectionInView={inView}
          {...card}
        />
      ))}
    </div>
  );
}

StatCards.propTypes = {
  inView: PropTypes.bool,
};

export default StatCards;
