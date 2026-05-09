# Project conventions for AI assistants

This repo is a Vue 3 + Vite portfolio with a co-located admin/CRM (Firebase-backed). Treat it like a long-lived production codebase.

## Stack

Vue 3.5 (Composition API preferred), Vite 6, Pinia, Vue Router 4, Firebase (Auth + Firestore), Swiper 12, Three.js, Chart.js. ESLint 10 (flat config) + Prettier 3.

## Conventions

- **Imports:** use `@/` alias (defined in `vite.config.js` and `jsconfig.json`); no `../../..` chains.
- **Vue API:** new components use `<script setup>`. Existing Options-API components are being migrated incrementally — don't mix styles within a single file.
- **Naming:** new components are PascalCase, no `Component` suffix (e.g. `Hero.vue`, not `HeroComponent.vue`). Legacy `*Component.vue` files will be renamed in Phase 2.
- **Folder layout:** sections under `src/components/sections/` (Phase 2), layout chrome under `src/components/layout/`, primitives under `src/components/ui/`.
- **Utilities:** pure helpers in `src/utils/`. Anything DOM/window-touching goes in `src/utils/dom-effects.js`.
- **Stores:** Pinia, in `src/stores/`. One file per domain.
- **Composables:** `src/composables/`, named `useXxx.js`.
- **Admin app:** lives in `src/admin/{layouts,router,views}/`; merged into the main router via `src/router/index.js`.

## Hard rules

- **Never** commit env files. `.env.example` is the template; real values go in local `.env` (gitignored).
- **Never** add a new dependency without a clear reason; prefer the libraries already in `package.json`.
- **Never** disable or weaken Firebase Security Rules in `firestore.rules` to make something work locally.
- **Never** auto-format the whole repo in one commit while a refactor phase is in progress — it collides with renames and review.

## Refactor in progress

Phase plans live in `docs/superpowers/plans/`. Read the most recent before making structural changes — it documents what's being touched and why. Phase 1 (hygiene + tooling) baseline:

- ESLint + Prettier installed, **not yet auto-applied** across the codebase. 154 ESLint findings (1 error: `gtag` global; 153 warnings, 139 auto-fixable). 63 files need Prettier formatting. Phase 2 absorbs these alongside the structural rename.
- `src/utilits.js` (typo) renamed to `src/utils/dom-effects.js`.
- `claudedocs/`, `documentation/`, `.playwright-mcp/` deleted from history.

## Useful commands

```bash
npm run dev         # local dev
npm run lint        # check (no fixes)
npm run format      # apply Prettier
firebase deploy     # ship to hosting (after npm run build)
```
