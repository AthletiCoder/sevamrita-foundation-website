# Cashfree donate — frontend contract

Shared API source of truth for the React app. Paste updates here when the ERPNext window changes backend contracts.

## Env (`.env` / Vercel)

```
REACT_APP_ERPNEXT_URL=http://sevamrita.local:8000
```

No trailing slash. No Cashfree secrets in the browser.

## Guest API methods

Base: `{REACT_APP_ERPNEXT_URL}/api/method/`

| Method | Purpose |
|--------|---------|
| `volunteering.volunteering.api.donations.create_donation_and_order` | Create Volunteer+Donation + Cashfree order |
| `volunteering.volunteering.api.donations.get_donation_status` | Poll status (needs `status_token`) |
| `volunteering.volunteering.api.donations.get_donation_receipt_payload` | Thank-you / receipt data |
| `volunteering.volunteering.api.donations.cashfree_webhook` | **Server-only** — Cashfree → ERPNext |

### `create_donation_and_order` body (JSON POST)

```json
{
  "full_name": "Ada Lovelace",
  "email": "ada@example.com",
  "mobile_number": "9876543210",
  "amount": 500,
  "want_80g": 0,
  "pan": "",
  "address": "",
  "ref": "",
  "return_url": "http://localhost:3000/contribute/thank-you?donation_id={donation_id}&order_id={order_id}&status_token={status_token}"
}
```

If `want_80g: 1` → `pan` + `address` required (PAN format `ABCDE1234F`).

**Response (`message`):** `donation_id`, `payment_session_id`, `status_token`, `environment` (`sandbox`|`production`), `matched_existing_volunteer`, `matched_volunteer_name`, `amount`.

### Checkout

Load Cashfree v3 SDK → `cashfree.checkout({ paymentSessionId, redirectTarget: '_modal' })` with fallback `_self`.

Then poll `get_donation_status` with `donation_id` + `status_token` until Success/Failed.

### Thank-you route

`/contribute/thank-you?donation_id=...&status_token=...`

## React files

- `src/services/erpnextDonationService.js`
- `src/utils/cashfreeCheckout.js`
- `src/components/donate/DonationForm.js`
- `src/components/donate/DonationThankYou.js`
- Routes: `/contribute`, `/contribute/thank-you`
