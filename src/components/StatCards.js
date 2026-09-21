import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import {
  IMPACT_SECTION_COPY,
  IMPACT_HERO_STATS,
  IMPACT_GROUPS,
} from '../modules/landing';
import './CSS/stat-card.css';

/**
 * Formats a stat string into a display value for CountUp.
 * Examples: "15,000+" -> 15k+, "250+" -> 250+, "5" -> 5
 */
function parseStatValue(value) {
  const hasPlus = String(value).includes('+');
  const numeric = parseInt(String(value).replace(/\D/g, ''), 10) || 0;

  if (numeric >= 1000) {
    return {
      end: Math.round(numeric / 1000),
      suffix: `k${hasPlus ? '+' : ''}`,
    };
  }

  return {
    end: numeric,
    suffix: hasPlus ? '+' : '',
  };
}

/** True once the element has enough pixels in the viewport (scroll-based, IO-independent). */
function useStartsWhenVisible() {
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      return undefined;
    }

    const check = () => {
      const node = ref.current;
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      const visiblePx = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const minVisible = Math.min(160, Math.max(48, rect.height * 0.18));

      if (visiblePx >= minVisible) {
        setHasStarted(true);
      }
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    const intervalId = window.setInterval(check, 250);

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      window.clearInterval(intervalId);
    };
  }, [hasStarted]);

  return { ref, hasStarted };
}

function AnimatedValue({ value, className, startCount }) {
  const { end, suffix } = parseStatValue(value);

  if (!startCount) {
    return <span className={className}>0{suffix}</span>;
  }

  return (
    <CountUp
      className={className}
      start={0}
      end={end}
      duration={3.8}
      suffix={suffix}
      separator=""
      useEasing
    />
  );
}

AnimatedValue.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  startCount: PropTypes.bool.isRequired,
};

AnimatedValue.defaultProps = {
  className: '',
};

function StatCards() {
  const { ref, hasStarted } = useStartsWhenVisible();

  return (
    <div className="landing-impact" ref={ref}>
      <header className="landing-impact-header">
        <h2 className="landing-impact-title">{IMPACT_SECTION_COPY.title}</h2>
        <p className="landing-impact-tagline">{IMPACT_SECTION_COPY.tagline}</p>
      </header>

      <div className="impact-hero">
        {IMPACT_HERO_STATS.map((stat) => (
          <div key={stat.id} className="impact-hero-stat">
            <span className="impact-hero-icon" aria-hidden="true">
              <i className={stat.icon} />
            </span>
            <AnimatedValue
              value={stat.value}
              className="impact-hero-value"
              startCount={hasStarted}
            />
            <span className="impact-hero-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="impact-groups">
        {IMPACT_GROUPS.map((group) => (
          <div key={group.id} className="impact-group">
            <h3 className="impact-group-label">
              <span className="impact-group-icon" aria-hidden="true">
                <i className={group.icon} />
              </span>
              {group.label}
            </h3>
            <ul className="impact-group-stats">
              {group.stats.map((stat) => (
                <li key={`${group.id}-${stat.label}`} className="impact-group-stat">
                  <AnimatedValue
                    value={stat.value}
                    className="impact-group-value"
                    startCount={hasStarted}
                  />
                  <span className="impact-group-stat-label">{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatCards;
