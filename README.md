# Jesrel Agang Portfolio

Personal portfolio + lightweight admin/CRM, built with Vue 3 and Vite. Deployed to Firebase Hosting.

## Stack

- **Vue 3.5** (Composition API, migrating away from Options API — see Phase 3)
- **Vite 6** for dev server and build
- **Pinia** for state, **Vue Router** for routing
- **Firebase** (Auth, Firestore) for the admin/CRM backend
- **Swiper**, **Three.js**, **Chart.js**, **WOW.js** for UI

## Layout

```
src/
├── admin/              # Authenticated admin/CRM (separate router, layouts, views)
│   ├── layouts/
│   ├── router/
│   └── views/
├── assets/             # Global CSS and static assets imported by Vite
├── components/         # Public-site components
│   ├── layout/         # Header, MobileHeader, Cursor, PreLoader, ScrollTop
│   ├── popup/          # MagnificPopUp, ModalBox
│   └── ui/             # Toast and other primitives
├── composables/        # Vue composables (use* functions)
├── data/               # Static data (portfolio entries, etc.)
├── firebase/           # Firebase SDK initialization
├── router/             # Public router (merges admin routes)
├── stores/             # Pinia stores
├── three/              # Three.js scene code (hero canvas)
├── utils/              # Pure utility modules (dom-effects, security)
├── views/              # Top-level public routes
├── App.vue
└── main.js
```

## Scripts

```bash
npm install            # install dependencies
npm run dev            # start Vite dev server (http://localhost:5173)
npm run build          # production build to dist/
npm run preview        # preview the production build
npm run lint           # ESLint (no fixes)
npm run lint:fix       # ESLint with --fix
npm run format         # Prettier --write across the repo
npm run format:check   # Prettier check (CI-friendly)
```

## Environment

Copy `.env.example` to `.env` and fill in Firebase + EmailJS values. Vite exposes only variables prefixed with `VITE_` to the client.

## Deployment

```bash
npm run build
# Then either:
firebase deploy
# Or, on Windows:
deploy-firebase.bat
```

Firebase Hosting config lives in `firebase.json`; Firestore rules in `firestore.rules`.

## Conventions

- Vue components use `<script setup>` where possible (migration in progress — see `docs/superpowers/plans/`).
- Path alias: `@/` maps to `src/`. Use it instead of `../../..` chains.
- Pure utility modules go in `src/utils/`. DOM-effecting helpers go in `src/utils/dom-effects.js`.
- New admin features: add the route in `src/admin/router/index.js` and the view in `src/admin/views/`.
