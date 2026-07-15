import React from 'react';
import DonationForm from './donate/DonationForm';
import './CSS/Contribute.css';

function Contribute() {
  return (
    <div className="contribute-page">
      <div
        className="contribute-background"
        style={{ backgroundImage: "url('/images/volunteer1.jpg')" }}
      />

      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">
            <span className="highlight">Contribute</span> to Sevamrita
          </h1>
          <p className="page-subtitle">
            Your contributions help us bring meaningful change to society. Whether it&apos;s
            through donations or volunteering, your support makes a difference in the lives of many.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="donation-form-section">
          <div className="donation-card">
            <DonationForm />
          </div>
        </div>

        <p className="policy-links">
          By donating you acknowledge our contact channels for queries (
          <a href="mailto:info@sevamrita.org">info@sevamrita.org</a>
          ). Online 80G requests are captured in the form above (PAN required).
        </p>
      </div>
    </div>
  );
}

export default Contribute;
