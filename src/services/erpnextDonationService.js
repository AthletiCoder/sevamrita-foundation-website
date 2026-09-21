/**
 * ERPNext volunteering donation APIs (Cashfree).
 * Guest methods on the Frappe site — separate from the legacy Java apiClient.
 */

const ERP_BASE = (process.env.REACT_APP_ERPNEXT_URL || '').replace(/\/$/, '');

const METHOD = (name) =>
  `${ERP_BASE}/api/method/volunteering.volunteering.api.donations.${name}`;

/**
 * Frappe often returns ValidationError with the useful text in
 * exception / _server_messages, while message is only the type name.
 */
function extractFrappeError(payload, status) {
  if (!payload || typeof payload !== 'object') {
    return `Request failed (${status})`;
  }

  const fromServerMessages = () => {
    const raw = payload._server_messages;
    if (!raw) return null;
    try {
      const list = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!Array.isArray(list) || list.length === 0) return null;
      const first = typeof list[0] === 'string' ? JSON.parse(list[0]) : list[0];
      if (first?.message) {
        // Strip simple HTML from frappe.throw messages
        return String(first.message).replace(/<[^>]+>/g, '').trim();
      }
    } catch {
      return null;
    }
    return null;
  };

  const fromException = () => {
    const exc = payload.exception;
    if (typeof exc !== 'string' || !exc.trim()) return null;
    // "frappe.exceptions.ValidationError: Actual reason"
    const parts = exc.split(':');
    if (parts.length >= 2) {
      return parts.slice(1).join(':').trim();
    }
    return exc.trim();
  };

  const candidates = [
    fromServerMessages(),
    fromException(),
    typeof payload._error_message === 'string' ? payload._error_message : null,
    typeof payload.message === 'string' && payload.message !== 'ValidationError'
      ? payload.message
      : null,
    typeof payload.exc_type === 'string' ? payload.exc_type : null,
  ].filter(Boolean);

  return candidates[0] || `Request failed (${status})`;
}

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
      return { success: false, error: extractFrappeError(payload, response.status) };
    }

    // Frappe HTTP 200 with exc string = failed method
    if (typeof payload.exc === 'string' && payload.exc.length > 0) {
      return { success: false, error: extractFrappeError(payload, response.status) };
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
