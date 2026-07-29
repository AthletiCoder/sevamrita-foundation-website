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
            Contribute to Sevamrita
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
            <div className="donation-card-header">
              <h3>Make a Donation</h3>
              <h6>Secure online payment · Min ₹100</h6>
            </div>
            <DonationForm />
          </div>
        </div>

        <div className="donation-cards-container">
          <div className="donation-card">
            <div className="donation-card-header">
              <h3>Direct Transfer</h3>
              <h6>Bank Account Details</h6>
            </div>
            <table className="bank-details-table">
              <tbody>
                <tr>
                  <td>Account Name</td>
                  <td>Sevamrita Foundation</td>
                </tr>
                <tr>
                  <td>Account Number</td>
                  <td>924010074546075</td>
                </tr>
                <tr>
                  <td>IFSC Code</td>
                  <td>UTIB0005874</td>
                </tr>
                <tr>
                  <td>Bank</td>
                  <td>Axis Bank, Gopanpally</td>
                </tr>
                <tr>
                  <td>Account Type</td>
                  <td>Savings Trust Account</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="donation-card">
            <div className="donation-card-header">
              <h3>Scan &amp; Pay</h3>
              <h6>UPI / QR Code</h6>
            </div>
            <div className="qr-code-container">
              <img src="/images/sevamrita-qr.png" alt="Sevamrita Foundation UPI QR" className="qr-code-image" />
              <p className="mt-2 mb-0 font-weight-bold">Sevamrita Foundation</p>
            </div>
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
