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

## Change log

| Date | What changed |
|------|----------------|
| 2026-07-11 | Donate flow live against local ERPNext; CORS set; local `.env` with `REACT_APP_ERPNEXT_URL=http://sevamrita.local:8000`. |
| | |

Add a row whenever you change URLs, CORS, Cashfree env, or Vercel vars.
