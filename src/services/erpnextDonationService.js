/**
 * ERPNext volunteering donation APIs (Cashfree).
 * Guest methods on the Frappe site — separate from the legacy Java apiClient.
 */

const ERP_BASE = (process.env.REACT_APP_ERPNEXT_URL || '').replace(/\/$/, '');

const METHOD = (name) =>
  `${ERP_BASE}/api/method/volunteering.volunteering.api.donations.${name}`;

async function callMethod(methodName, body = {}) {
  if (!ERP_BASE) {
    return {
      success: false,
      error:
        'REACT_APP_ERPNEXT_URL is not configured. Set it to your ERPNext site URL.',
    };
  }

  try {
    const response = await fetch(METHOD(methodName), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'omit',
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        payload?.message ||
        payload?._error_message ||
        payload?.exc_type ||
        `Request failed (${response.status})`;
      return { success: false, error: typeof message === 'string' ? message : 'Request failed' };
    }

    // Frappe wraps return value in { message: ... }
    const data = payload.message !== undefined ? payload.message : payload;
    if (data && data.exc) {
      return { success: false, error: 'Server error while creating donation' };
    }
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network error contacting payment server',
    };
  }
}

const erpnextDonationService = {
  createDonationAndOrder: (donation) =>
    callMethod('create_donation_and_order', {
      full_name: donation.fullName,
      email: donation.email,
      mobile_number: donation.phone,
      amount: donation.amount,
      want_80g: donation.want80g ? 1 : 0,
      pan: donation.pan || '',
      address: donation.address || '',
      ref: donation.ref || '',
      return_url: donation.returnUrl || undefined,
    }),

  getDonationStatus: (donationId, statusToken) =>
    callMethod('get_donation_status', {
      donation_id: donationId,
      status_token: statusToken,
    }),

  getReceipt: (donationId, statusToken) =>
    callMethod('get_donation_receipt_payload', {
      donation_id: donationId,
      status_token: statusToken,
    }),
};

export default erpnextDonationService;
