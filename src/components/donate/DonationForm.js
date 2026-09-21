import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import erpnextDonationService from '../../services/erpnextDonationService';
import { openCashfreeCheckout } from '../../utils/cashfreeCheckout';

const PRESETS = [500, 1001, 2100, 5100, 11000];
const MIN_AMOUNT = 100;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  amount: '',
  customAmount: '',
  want80g: false,
  pan: '',
  address: '',
};

function DonationForm() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref') || '';

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form'); // form | paying | success | failed
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);
  const [matchedVolunteer, setMatchedVolunteer] = useState(null);

  const amountValue = useMemo(() => {
    if (form.amount === 'custom') {
      return parseFloat(form.customAmount);
    }
    return parseFloat(form.amount);
  }, [form.amount, form.customAmount]);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setErrorMessage('');
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Name is required';
    if (!/^\d{10}$/.test(form.phone.trim())) {
      next.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email';
    }
    if (!amountValue || Number.isNaN(amountValue) || amountValue < MIN_AMOUNT) {
      next.amount = `Minimum donation is ₹${MIN_AMOUNT}`;
    }
    if (form.want80g) {
      const pan = form.pan.trim().toUpperCase();
      if (!PAN_RE.test(pan)) next.pan = 'Enter a valid PAN (e.g. ABCDE1234F)';
      if (!form.address.trim()) next.address = 'Address is required for 80G';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const pollUntilFinal = async (donationId, statusToken) => {
    const delays = [800, 1500, 2000, 2500, 3000];
    for (const delay of delays) {
      await new Promise((r) => setTimeout(r, delay));
      const statusRes = await erpnextDonationService.getDonationStatus(
        donationId,
        statusToken
      );
      if (!statusRes.success) continue;
      const status = statusRes.data?.status;
      if (status === 'Success' || status === 'Failed') {
        return statusRes.data;
      }
    }
    const last = await erpnextDonationService.getDonationStatus(
      donationId,
      statusToken
    );
    return last.success ? last.data : { status: 'Pending', donation_id: donationId };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setStep('paying');

    const returnUrl = `${window.location.origin}/contribute/thank-you?donation_id={donation_id}&order_id={order_id}&status_token={status_token}`;

    const createRes = await erpnextDonationService.createDonationAndOrder({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
      amount: amountValue,
      want80g: form.want80g,
      pan: form.pan.trim().toUpperCase(),
      address: form.address.trim(),
      ref,
      returnUrl,
    });

    if (!createRes.success) {
      setErrorMessage(createRes.error || 'Could not start payment');
      setStep('form');
      setIsSubmitting(false);
      return;
    }

    const {
      payment_session_id: sessionId,
      donation_id: donationId,
      status_token: statusToken,
      environment,
      matched_existing_volunteer: matched,
      matched_volunteer_name: matchedName,
    } = createRes.data;

    if (matched && matchedName) {
      setMatchedVolunteer(matchedName);
    }

    try {
      await openCashfreeCheckout(sessionId, environment || 'sandbox');
    } catch (err) {
      console.error(err);
      setErrorMessage(
        'Unable to open payment window. Please allow popups and try again.'
      );
      setStep('form');
      setIsSubmitting(false);
      return;
    }

    const finalStatus = await pollUntilFinal(donationId, statusToken);
    setResult({ ...finalStatus, status_token: statusToken });

    if (finalStatus?.status === 'Success') {
      setStep('success');
      setForm(initialForm);
    } else if (finalStatus?.status === 'Failed') {
      setStep('failed');
    } else {
      setStep('pending');
    }
    setIsSubmitting(false);
  };

  if (step === 'success' && result) {
    return (
      <div className="donation-result success">
        <h3>Thank you for your donation</h3>
        <p>
          Receipt ID: <strong>{result.donation_id}</strong>
        </p>
        <p>
          Amount: <strong>₹{Number(result.amount).toLocaleString('en-IN')}</strong>
        </p>
        {result.want_80g ? (
          <p className="muted">
            An 80G receipt will be sent on the WhatsApp number you provided..
          </p>
        ) : (
          <p className="muted">A confirmation message will be sent on the WhatsApp number you provided.</p>
        )}
        <button type="button" className="btn-donate-submit" onClick={() => setStep('form')}>
          Donate again
        </button>
      </div>
    );
  }

  if (step === 'failed') {
    return (
      <div className="donation-result failed">
        <h3>Payment unsuccessful</h3>
        <p>No amount was charged (or the payment failed). You can try again.</p>
        <button type="button" className="btn-donate-submit" onClick={() => setStep('form')}>
          Try again
        </button>
      </div>
    );
  }

  if (step === 'pending') {
    const thankYouHref =
      result?.donation_id && result?.status_token
        ? `/contribute/thank-you?donation_id=${encodeURIComponent(result.donation_id)}&status_token=${encodeURIComponent(result.status_token)}`
        : '/contribute/thank-you';

    return (
      <div className="donation-result pending">
        <h3>Payment is being confirmed</h3>
        <p>
          Receipt ID: <strong>{result?.donation_id}</strong>. You will receive an email
          once payment is confirmed. You can also check status on the thank-you page.
        </p>
        <a href={thankYouHref} className="btn-donate-submit">
          Check donation status
        </a>
        <button type="button" className="btn-donate-submit" onClick={() => setStep('form')}>
          Back to form
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="donation-card-header">
        <h3>Make a Donation</h3>
        <h6>Secure online payment · Min ₹100</h6>
      </div>
      <form onSubmit={handleSubmit} className="donation-form" noValidate>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {matchedVolunteer && (
        <div className="alert alert-info" role="status">
          We found an existing volunteer profile matching this mobile: <strong>{matchedVolunteer}</strong>
        </div>
      )}

      <div className="amount-presets" role="group" aria-label="Suggested amounts">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`amount-chip ${form.amount === String(preset) ? 'active' : ''}`}
            onClick={() => updateField('amount', String(preset))}
          >
            ₹{preset.toLocaleString('en-IN')}
          </button>
        ))}
        <button
          type="button"
          className={`amount-chip ${form.amount === 'custom' ? 'active' : ''}`}
          onClick={() => updateField('amount', 'custom')}
        >
          Custom
        </button>
      </div>

      {form.amount === 'custom' && (
        <div className="form-group">
          <label htmlFor="customAmount">
            Amount (₹) <span className="required">*</span>
          </label>
          <input
            id="customAmount"
            type="number"
            min={MIN_AMOUNT}
            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
            value={form.customAmount}
            onChange={(e) => updateField('customAmount', e.target.value)}
            placeholder={`Minimum ₹${MIN_AMOUNT}`}
          />
          {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
        </div>
      )}
      {form.amount !== 'custom' && errors.amount && (
        <div className="invalid-feedback d-block">{errors.amount}</div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="fullName"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            value={form.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            autoComplete="name"
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Mobile <span className="required">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            maxLength={10}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
            autoComplete="tel"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          id="email"
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          autoComplete="email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="form-group checkbox-row">
        <label htmlFor="want80g" className="checkbox-label">
          <input
            id="want80g"
            type="checkbox"
            checked={form.want80g}
            onChange={(e) => updateField('want80g', e.target.checked)}
          />
          <span>I want an 80G tax exemption acknowledgement (PAN required)</span>
        </label>
      </div>

      {form.want80g && (
        <>
          <div className="form-group">
            <label htmlFor="pan">
              PAN <span className="required">*</span>
            </label>
            <input
              id="pan"
              className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
              value={form.pan}
              onChange={(e) => updateField('pan', e.target.value.toUpperCase())}
              maxLength={10}
              placeholder="ABCDE1234F"
            />
            {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="address">
              Address <span className="required">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
        </>
      )}

      <p className="trust-strip">
        Sec 8 · 12A · 80G registered · Payments via Cashfree (UPI, cards, netbanking)
      </p>

      <button type="submit" className="btn-donate-submit" disabled={isSubmitting || step === 'paying'}>
        {isSubmitting || step === 'paying' ? (
          <>
            <span className="spinner-border spinner-border-sm mr-2" />
            Opening secure checkout…
          </>
        ) : (
          <>
            <i className="fas fa-heart" /> Donate securely
          </>
        )}
      </button>
      </form>
    </>
  );
}

export default DonationForm;
