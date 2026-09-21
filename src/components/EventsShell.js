import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CSS/Calendar.css';

export const EVENTS_TABS = [
  { key: 'social', label: 'Social & News', path: '/events/social', icon: 'fas fa-share-alt' },
  { key: 'gallery', label: 'Photo Gallery', path: '/events/gallery', icon: 'fas fa-images' },
];

export function EventsHero({ title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero-content">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="page-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}

export function EventsSubNav() {
  return (
    <nav className="events-subnav" aria-label="Events sections">
      <div className="container-custom events-subnav__inner">
        {EVENTS_TABS.map((tab) => (
          <NavLink
            key={tab.key}
            to={tab.path}
            className={({ isActive }) =>
              `events-subnav__link${isActive ? ' is-active' : ''}`
            }
            end
          >
            <i className={tab.icon} aria-hidden="true" />
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
