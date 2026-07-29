import React from 'react';
import TestimonialsCarousel from './TestimonialsCarousel';
import { testimonials } from '../modules/testimonials';
import './CSS/Testimonial.css';

const TestimonialsPage = () => (
  <div className="testimonials-page">
    <section className="page-hero">
      <div className="page-hero-content">
        <h1 className="page-title">Testimonials</h1>
        <p className="page-subtitle">
          Voices from the communities, partners, and volunteers we serve alongside.
        </p>
      </div>
    </section>

    <section className="testimonial-section">
      <TestimonialsCarousel items={testimonials} />
    </section>

    <section className="testimonial-video-section">
      <div className="testimonial-video-inner">
        <h2 className="testimonial-video-title">Watch their story</h2>
        <div className="testimonial-video-frame">
          <video controls className="testimonial-video-player" preload="metadata">
            <source src="/videos/testimonial1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  </div>
);

export default TestimonialsPage;
