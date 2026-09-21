# Developer log — environment & config checklist

Living notes for what to configure per environment. **Do not put secrets in this file** — only keys, where they live, and example shapes.

Related: [cashfree-frontend-handoff.md](./cashfree-frontend-handoff.md)

---

## React app (this repo)

| Variable | Local | Vercel / production | Notes |
|----------|--------|---------------------|--------|
| `REACT_APP_ERPNEXT_URL` | `.env` → `http://sevamrita.local:8000` | Project → Settings → Environment Variables | No trailing slash. Donate APIs. |
| `REACT_APP_API_BASE_URL` | `.env` → `http://localhost:8080/api` | Same UI, set to live Java API if used | Legacy admin/volunteer Java backend. |
| `REACT_APP_ENV` | `development` | `production` | Optional label only. |

### How to set

**Local**

1. Copy `.env.example` → `.env` (gitignored).
2. Set values above.
3. Restart `npm start` after any `.env` change (CRA loads env at boot).

**Vercel**

1. Dashboard → project → **Settings → Environment Variables**.
2. Add each `REACT_APP_*` for Production (and Preview if needed).
3. Redeploy so the build picks them up.

No Cashfree App ID / Secret in React. Checkout uses `payment_session_id` from ERPNext.

---

## ERPNext / volunteering (other Cursor window / desk)

Track these on the ERPNext side when switching envs:

| Setting | Local | Production | Notes |
|---------|--------|------------|--------|
| **Cashfree Settings** — App ID, Secret | Desk → Cashfree Settings | Same, production keys | Never expose to React. |
| **Cashfree Settings** — Environment | `sandbox` | `production` | Returned to frontend as `environment`. |
| **Allowed Origins** | `http://localhost:3000` | Live React origin (e.g. `https://sevamrita.org`) | Must match browser origin. |
| **Return URL** | `http://localhost:3000/contribute/thank-you?...` | Live thank-you URL with placeholders | See handoff for query params. |
| **site_config CORS** `allow_cors` | `http://localhost:3000` | Live React origin | Required for guest API calls from browser. |
| **Cashfree webhook URL** | `http://sevamrita.local:8000/api/method/volunteering.volunteering.api.donations.cashfree_webhook` | Public HTTPS ERPNext URL + same method | Cashfree → ERPNext only. |
| Company / MoP / Paid To | Per accounting checklist | Same | Backend window owns this. |

---

## Quick env map

| Layer | Local | Production |
|-------|--------|------------|
| React UI | `http://localhost:3000` | Vercel / custom domain |
| ERPNext | `http://sevamrita.local:8000` | Live Frappe site URL |
| Java API (legacy) | `http://localhost:8080` | Live API host if still used |
| Cashfree | Sandbox dashboard | Live dashboard |

---

## Before deploying to production (Vercel)

Use this every time you promote `payment-gateway` (or main) to prod.

### 1. Code / git
- [ ] Branch builds cleanly: `CI=true npm run build`
- [ ] Merged latest `main` (no open conflicts)
- [ ] Pushed the branch Vercel deploys from
- [ ] Smoke-test locally once more: home, contribute donate modal, thank-you route

### 2. Vercel env (Settings → Environment Variables → Production)
- [ ] `REACT_APP_ERPNEXT_URL` = live ERPNext HTTPS URL (**no trailing slash**)
- [ ] `REACT_APP_ENV` = `production`
- [ ] `REACT_APP_API_BASE_URL` = live Java API if login/dashboard still used; otherwise leave or remove knowingly
- [ ] Redeploy after changing any `REACT_APP_*` (values are baked in at build time)

### 3. ERPNext (prod site)
- [ ] Cashfree Settings: **production** App ID + Secret, env = `production`
- [ ] Allowed Origins includes exact Vercel URL(s), e.g. `https://your-app.vercel.app` and custom domain if any
- [ ] Return URL base points at prod thank-you, with placeholders:  
  `https://<prod-site>/contribute/thank-you?donation_id={donation_id}&order_id={order_id}&status_token={status_token}`
- [ ] `site_config` CORS / `allow_cors` includes the same React origin(s)
- [ ] Company, Mode of Payment, Paid To (Cashfree Clearing) set per accounting checklist

### 4. Cashfree dashboard (production)
- [ ] Webhook URL =  
  `https://<prod-erpnext>/api/method/volunteering.volunteering.api.donations.cashfree_webhook`
- [ ] Webhook events for payment success/failure enabled
- [ ] Return / notify URLs match ERPNext Cashfree Settings

### 5. Go-live test (small real or approved test txn)
- [ ] Open prod `/contribute` → donate → Cashfree checkout opens (`environment` should be production)
- [ ] Complete payment → status becomes Success (webhook or poll)
- [ ] `/contribute/thank-you?donation_id=...&status_token=...` shows receipt
- [ ] Donation + Payment Entry (or your accounting docs) appear in ERPNext
- [ ] Failure/cancel path shows Failed / pending correctly (no false Success)

### 6. After deploy
- [ ] Log the prod URLs + date in the Change log below
- [ ] Confirm `.env` on laptop still points at **local** ERPNext (do not overwrite with prod secrets in git)

---

## Change log

| Date | What changed |
|------|----------------|
| 2026-07-11 | Donate flow live against local ERPNext; CORS set; local `.env` with `REACT_APP_ERPNEXT_URL=http://sevamrita.local:8000`. |
| 2026-07-13 | Merged main into `payment-gateway`; CI unused-var fix; Vercel build green. |
| | |

Add a row whenever you change URLs, CORS, Cashfree env, or Vercel vars.
