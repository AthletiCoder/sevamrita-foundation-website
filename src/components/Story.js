import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './CSS/Story.css';

function Story() {
  const events = useMemo(() => [
    { date: '2018', title: 'Giving Back to Society', image: '/images/story1.webp', description: 'Team members took deep interest in giving back to society while holding positions in social bodies of IITB like Abhyuday and Samwad.' },
    { date: '2019', title: 'Expanding Reach', image: '/images/story2.webp', description: 'Formed an informal team with aligned interests to expand our reach beyond IITB. Started conducting value education drives.' },
    { date: '2020', title: 'Large-Scale Event', image: '/images/story3.webp', description: 'Successfully organized college level leadership and skill development programs, attracting 500+ participants.' },
    { date: '2024', title: 'Formal Registration', image: '/images/story4.webp', description: 'Sevamrita is registered as a Section 8 company to focus on long term vision and CSR impact projects.' },
    { date: '2025', title: 'City Expansion', image: '/images/story5.webp', description: 'Sevamrita expanded its reach to Amravati (MH) and Gurgaon.' },
  ], []);

  return (
    <div className="story-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey: The Making of Sevamrita
          </motion.h1>
          <p className="page-subtitle">
            From humble beginnings to making a lasting impact in communities across India.
          </p>
        </div>
      </section>

      <div className="timeline-container">
        {events.map((event, index) => (
          <motion.div
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="timeline-content">
              <span className="event-date">{event.date}</span>
              <img src={event.image} alt={event.title} className="event-img" />
              <h3 className="event-title">{event.title}</h3>
              <p className="event-desc">{event.description}</p>
            </div>
            <div className="timeline-dot"></div>
          </motion.div>
        ))}
        <div className="timeline-line"></div>
      </div>
    </div>
  );
}

export default Story;