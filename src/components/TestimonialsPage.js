import React from 'react';
import TestimonialsCarousel from './TestimonialsCarousel';
import TestimonialsVideoFilmstrip from './TestimonialsVideoFilmstrip';
import { PAGE_COPY, testimonialVideos, testimonials } from '../modules/testimonials';
import './CSS/Testimonial.css';

const TestimonialsPage = () => (
  <div className="testimonials-page">
    <section className="page-hero">
      <div className="page-hero-content">
        <h1 className="page-title">{PAGE_COPY.title}</h1>
        <p className="page-subtitle">{PAGE_COPY.subtitle}</p>
      </div>
    </section>

    <section className="testimonial-section">
      <TestimonialsCarousel items={testimonials} />
    </section>

    <section className="testimonial-video-section" aria-labelledby="testimonial-videos-title">
      <h2 id="testimonial-videos-title" className="testimonial-video-title">
        {PAGE_COPY.videoTitle}
      </h2>
      <TestimonialsVideoFilmstrip videos={testimonialVideos} />
    </section>
  </div>
);

export default TestimonialsPage;
