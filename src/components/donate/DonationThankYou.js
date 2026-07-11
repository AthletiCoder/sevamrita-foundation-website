import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import erpnextDonationService from '../../services/erpnextDonationService';
import '../CSS/Contribute.css';

function DonationThankYou() {
  const [searchParams] = useSearchParams();
  const donationId = searchParams.get('donation_id') || searchParams.get('order_id');
  const statusToken = searchParams.get('status_token');

  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!donationId || !statusToken) {
        setError('Missing donation reference. If you completed payment, check your email for the receipt ID.');
        setLoading(false);
        return;
      }

      const statusRes = await erpnextDonationService.getDonationStatus(donationId, statusToken);
      if (cancelled) return;

      if (!statusRes.success) {
        setError(statusRes.error || 'Unable to load donation status');
        setLoading(false);
        return;
      }

      if (statusRes.data?.status === 'Success') {
        const receiptRes = await erpnextDonationService.getReceipt(donationId, statusToken);
        if (!cancelled && receiptRes.success) {
          setReceipt(receiptRes.data);
        } else if (!cancelled) {
          setReceipt(statusRes.data);
        }
      } else {
        setReceipt(statusRes.data);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [donationId, statusToken]);

  return (
    <div className="contribute-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">
            <span className="highlight">Donation</span> status
          </h1>
        </div>
      </section>
      <div className="container">
        <div className="donation-card thank-you-card">
          {loading && <p>Confirming your payment…</p>}
          {!loading && error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {!loading && receipt && (
            <div className="donation-result">
              <h3>
                {receipt.status === 'Success'
                  ? 'Thank you for your donation'
                  : receipt.status === 'Failed'
                    ? 'Payment unsuccessful'
                    : 'Payment pending confirmation'}
              </h3>
              <p>
                Receipt ID: <strong>{receipt.donation_id}</strong>
              </p>
              {receipt.amount != null && (
                <p>
                  Amount: <strong>₹{Number(receipt.amount).toLocaleString('en-IN')}</strong>
                </p>
              )}
              {receipt.acknowledgement_note && <p className="muted">{receipt.acknowledgement_note}</p>}
              <Link to="/contribute" className="btn-donate-submit">
                Back to Contribute
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DonationThankYou;
