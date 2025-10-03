# YOH Underground – Landing + Auth (Frontend)

A minimal React + Vite + Tailwind landing page wired to **your backend login API**. Artifact/preview-safe (no Firebase client SDK required).

## Stack
- React 18 + Vite
- Tailwind CSS
- React Router (`/` and `/portal`)
- Env-based config (VITE_API_BASE, VITE_FORMSPREE_ID)

## Quick Start

```bash
# 1) Install
npm i

# 2) Configure env
cp .env.example .env.local
# edit VITE_API_BASE, VITE_FORMSPREE_ID if needed

# 3) Dev
npm run dev

# 4) Build
npm run build
npm run preview
```

## Deploy

- **Vercel/Netlify/Static:** Build and deploy the `dist` directory.  
- Ensure your backend is reachable at `VITE_API_BASE`.

## Auth Flow

1. User enters email/password.
2. Frontend POSTs to `${VITE_API_BASE}/api/auth/login`.
3. Backend validates (Firebase Admin SDK server side).
4. Backend returns `{ token }` JWT.
5. Frontend stores `yoh_token` and redirects to `/portal`.

> **Security:** Keep Firebase Admin exclusively on the server. Do **not** expose Admin keys in the frontend.

## Customization

- Edit text/sections in `src/App.jsx`.
- Replace Portal content in `src/Portal.jsx`.
- Update fonts/colors in `src/styles.css` or Tailwind theme.
