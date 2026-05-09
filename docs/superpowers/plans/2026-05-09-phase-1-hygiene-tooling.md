# Phase 1: Hygiene + Tooling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the repo to a clean, conventional baseline — delete unused root folders, fix `.gitignore` footguns, rename the `utilits.js` typo, install ESLint + Prettier (Vue 3 flat config), and add `README.md` + `CLAUDE.md`. Zero behavior change to the running app.

**Architecture:** Mechanical hygiene only. Each task ends with a verifiable command (`npm run dev`, `git status`, etc.) and a small commit. The app must keep starting cleanly after every task.

**Tech Stack:** Vue 3.5, Vite 6, ESLint 9 (flat config), `eslint-plugin-vue` v9, Prettier 3, `eslint-config-prettier`.

---

## File Structure

**Created:**
- `eslint.config.js` — ESLint 9 flat config
- `.prettierrc.json` — Prettier config
- `.prettierignore`
- `.editorconfig`
- `README.md` — project overview, scripts, layout
- `CLAUDE.md` — conventions for AI assistants
- `src/utils/dom-effects.js` — renamed from `src/utilits.js`

**Modified:**
- `.gitignore` — remove dangerous globs, add deletions defensively
- `package.json` — add `lint`, `lint:fix`, `format`, `format:check` scripts
- `src/App.vue` — update import path
- `src/views/IndexView.vue` — update import path
- `src/views/IndexDarkView.vue` — update import path
- `src/components/layout/Cursor.vue` — update import path
- `src/components/layout/PreLoader.vue` — update import path
- `src/components/layout/ScrollTop.vue` — update import path

**Deleted:**
- `claudedocs/` (18 historical AI session reports)
- `documentation/` (Bootstrap 3 + jQuery + font-awesome 4 vendor theme docs, ~90 files, zero references in `src/`)
- `.playwright-mcp/` (6 stale screenshots)
- `src/utilits.js` (renamed → `src/utils/dom-effects.js`)
- `env` (untracked stray env file — see Task 2 for decision)

**Not changed in Phase 1** (deferred to Phase 2/3/4):
- Component naming (`*Component.vue` suffix)
- API style (mixed Options/Composition API)
- Router structure
- Stores, composables, Firebase boundary

---

## Pre-flight

Before starting: confirm working tree is clean and `npm run build` succeeds. If it doesn't build, stop and surface the error — don't refactor on top of broken state.

```bash
git status
npm run build
```

If `build` fails, halt and report.

---

## Task 1: Create work branch and snapshot baseline

**Files:** None changed.

- [ ] **Step 1: Create branch**

```bash
git switch -c refactor/phase-1-hygiene
```

- [ ] **Step 2: Verify clean tree**

```bash
git status
```

Expected: `nothing to commit, working tree clean` (apart from the previously-staged `package.json` / `package-lock.json` changes from removing `vue-awesome-swiper`, which should be committed first if not already).

If those changes are uncommitted, commit them now:

```bash
git add package.json package-lock.json src/components/TestimonialsComponent.vue
git commit -m "fix: replace vue-awesome-swiper with swiper/vue (Vue 3 compat)"
```

- [ ] **Step 3: Confirm dev server still runs**

```bash
npm run dev
```

Visit `http://localhost:5173/`, confirm page renders. Stop the server (`Ctrl+C`).

---

## Task 2: Handle the stray `env` file

**Files:**
- Delete: `env` (repo root, ~1.6KB, untracked)

**Background:** A file literally named `env` (no leading dot) sits in the repo root. It contains real Firebase web config keys. It is **not** tracked in git history (verified: `git ls-files | grep -E "^env$"` returns nothing). Firebase web keys are designed to be shipped to browsers — Firebase protects via Security Rules, not by hiding the key. Even so, env files don't belong on disk next to source code.

The repo already has `.env.example` as a template.

- [ ] **Step 1: Confirm not tracked**

```bash
git ls-files | grep -E "^env$" || echo "OK: not tracked"
```

Expected: `OK: not tracked`

- [ ] **Step 2: If you actually use this file for local dev, rename it to `.env` first**

```bash
# Only if you need it for local development:
mv env .env
```

`.env` is matched by the existing `.gitignore` rules (`.env` line near top), so this keeps it local-only.

If you don't need it (everything works without it, or values are duplicated elsewhere):

```bash
rm env
```

- [ ] **Step 3: Verify dev server still runs**

```bash
npm run dev
```

If the app starts and shows live data, you're done. If Firebase fails, you needed the file — restore it from git/backup and rename to `.env`.

- [ ] **Step 4: Commit**

```bash
git add -u
git commit -m "chore: remove stray env file from repo root"
```

(No file change to commit if you renamed to `.env` — `.env` is gitignored. Skip the commit in that case.)

---

## Task 3: Fix `.gitignore`

**Files:**
- Modify: `.gitignore`

The current `.gitignore` has three dangerous entries near the bottom: `*.json` (would ignore every JSON file going forward), `package-lock.json` (lockfile MUST be committed for reproducibility), and `package.json` (manifest MUST be committed). Currently they don't break anything because the files are already tracked, but they make the file misleading.

It also doesn't explicitly ignore the folders we're about to delete, leaving the door open for them to come back.

- [ ] **Step 1: Replace `.gitignore` with the cleaned-up version**

Open `.gitignore` and replace the entire contents with:

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Environment files (SECURITY: Never commit these)
.env
.env.local
.env.*.local
.env.production
.env.development
.env.staging
*.env
env

# Firebase credentials (SECURITY: Never commit these)
*-firebase-adminsdk-*.json
firebase-debug.log
.firebaserc

# Dependencies and build output
node_modules
dist
dist-ssr
coverage
*.local

# Build artifacts
dist/stats.html
*.gz
*.br

# OS / Editor
.DS_Store
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
*.tsbuildinfo

# Cypress (if reintroduced)
/cypress/videos/
/cypress/screenshots/

# AI-session artifacts
claudedocs/
.playwright-mcp/

# Vendor theme docs (deleted in Phase 1; defensively ignored to prevent re-add)
documentation/
```

- [ ] **Step 2: Verify no surprise files now show as ignored**

```bash
git status --ignored
```

Expected: only `node_modules`, `dist` (if built), and any local env files appear as ignored. If `package.json` or `package-lock.json` show as ignored, the gitignore replacement was wrong — fix.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: clean up .gitignore (drop dangerous globs, ignore deletions defensively)"
```

---

## Task 4: Delete `claudedocs/`

**Files:**
- Delete: `claudedocs/` (18 markdown files)

- [ ] **Step 1: Remove the directory from git**

```bash
git rm -r claudedocs/
```

- [ ] **Step 2: Verify**

```bash
ls claudedocs/ 2>&1 || echo "deleted"
git status
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove claudedocs/ (historical AI session artifacts)"
```

---

## Task 5: Delete `documentation/`

**Files:**
- Delete: `documentation/` (~90 files: Bootstrap 3, jQuery, font-awesome 4, glyphicons, vendor theme docs)

**Verified:** Only references are in two `claudedocs/*.md` files (already deleted in Task 4). No `src/` file imports anything from `documentation/`.

- [ ] **Step 1: Final reference check**

```bash
git grep "documentation/" -- ':!documentation/**' ':!docs/**' || echo "no references"
```

Expected: `no references`. If anything pops up, stop and investigate before deleting.

- [ ] **Step 2: Remove**

```bash
git rm -r documentation/
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove documentation/ vendor theme docs (Bootstrap 3 / jQuery / font-awesome 4)"
```

---

## Task 6: Delete `.playwright-mcp/`

**Files:**
- Delete: `.playwright-mcp/` (6 PNG/JPG screenshots)

- [ ] **Step 1: Remove**

```bash
git rm -r .playwright-mcp/
```

- [ ] **Step 2: Commit**

```bash
git commit -m "chore: remove .playwright-mcp/ stale screenshots"
```

---

## Task 7: Decide on `google search console logs/`

**Files:**
- Move OR delete: `google search console logs/` (4 CSVs: Chart, Critical issues, Metadata, Non-critical issues)

This folder name has spaces and is at the repo root — both are smells. The CSVs are SEO audit data; you may want to keep them as a reference, but they don't belong at the repo root.

- [ ] **Step 1: Decide:**
  - **A.** Move to `docs/seo/` (keep as reference, properly nested, no spaces).
  - **B.** Delete (data is recoverable from Search Console at any time).

- [ ] **Step 2A: If keeping (Option A):**

```bash
mkdir -p docs/seo
git mv "google search console logs" docs/seo/gsc-export-2026-05-09
git status
```

- [ ] **Step 2B: If deleting (Option B):**

```bash
git rm -r "google search console logs"
```

- [ ] **Step 3: Commit**

```bash
# Option A
git commit -m "chore: move GSC logs to docs/seo/"

# Option B
git commit -m "chore: remove google search console logs/ from repo root"
```

---

## Task 8: Rename `src/utilits.js` → `src/utils/dom-effects.js`

**Files:**
- Move: `src/utilits.js` → `src/utils/dom-effects.js`
- Modify: `src/App.vue:14`
- Modify: `src/views/IndexView.vue:56`
- Modify: `src/views/IndexDarkView.vue:54`
- Modify: `src/components/layout/Cursor.vue:9`
- Modify: `src/components/layout/PreLoader.vue:8`
- Modify: `src/components/layout/ScrollTop.vue:11`

**Why this name:** the file's exports (`customCursor`, `dataImage`, `scroll_`, `stickyNav`, `scrollTop`, `portfolioHover`, `activeSkillProgress`, `preloader`) are all DOM/window manipulation helpers. `dom-effects.js` is descriptive; sits alongside existing `src/utils/security.js`.

- [ ] **Step 1: Move the file with git**

```bash
git mv src/utilits.js src/utils/dom-effects.js
```

- [ ] **Step 2: Update import in `src/App.vue`**

In `src/App.vue` line 14, replace:

```js
import { dataImage, portfolioHover, scroll_, stickyNav } from "./utilits";
```

with:

```js
import { dataImage, portfolioHover, scroll_, stickyNav } from "@/utils/dom-effects";
```

- [ ] **Step 3: Update import in `src/views/IndexView.vue`**

In line 56, replace:

```js
import { activeSkillProgress } from "@/utilits";
```

with:

```js
import { activeSkillProgress } from "@/utils/dom-effects";
```

- [ ] **Step 4: Update import in `src/views/IndexDarkView.vue`**

In line 54, replace:

```js
import { activeSkillProgress } from "@/utilits";
```

with:

```js
import { activeSkillProgress } from "@/utils/dom-effects";
```

- [ ] **Step 5: Update import in `src/components/layout/Cursor.vue`**

In line 9, replace:

```js
import { customCursor } from "@/utilits";
```

with:

```js
import { customCursor } from "@/utils/dom-effects";
```

- [ ] **Step 6: Update import in `src/components/layout/PreLoader.vue`**

In line 8, replace:

```js
import { preloader } from "@/utilits";
```

with:

```js
import { preloader } from "@/utils/dom-effects";
```

- [ ] **Step 7: Update import in `src/components/layout/ScrollTop.vue`**

In line 11, replace:

```js
import { scrollTop } from "@/utilits";
```

with:

```js
import { scrollTop } from "@/utils/dom-effects";
```

- [ ] **Step 8: Verify zero residual references**

```bash
git grep "utilits"
```

Expected: no matches.

- [ ] **Step 9: Verify dev build**

```bash
npm run dev
```

App must start without import errors. Stop the server.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: rename src/utilits.js -> src/utils/dom-effects.js"
```

---

## Task 9: Install ESLint 9 + Prettier 3

**Files:**
- Modify: `package.json` (devDependencies)
- Modify: `package-lock.json`

- [ ] **Step 1: Install dev dependencies**

```bash
npm i -D eslint@^9 eslint-plugin-vue@^9 eslint-config-prettier@^9 prettier@^3 @eslint/js globals
```

- [ ] **Step 2: Verify versions installed**

```bash
npm ls eslint eslint-plugin-vue prettier
```

Expected: all three resolve, no `UNMET DEPENDENCY` warnings.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add ESLint 9, eslint-plugin-vue, Prettier 3"
```

---

## Task 10: Add ESLint flat config

**Files:**
- Create: `eslint.config.js`

- [ ] **Step 1: Create `eslint.config.js` at repo root**

```js
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      '**/*.min.js',
      'docs/**',
    ],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Legacy components don't follow multi-word naming; lifted in Phase 2 rename.
      'vue/multi-word-component-names': 'off',
      // Allow underscore-prefixed unused vars (intentional discards).
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Phase 3 will tighten this when migrating to <script setup>.
      'vue/no-deprecated-slot-attribute': 'warn',
    },
  },
  eslintConfigPrettier,
];
```

- [ ] **Step 2: Smoke-test the config**

```bash
npx eslint --print-config src/App.vue > /dev/null && echo "config OK"
```

Expected: `config OK`. If ESLint errors out about plugin loading, the config is wrong — fix before committing.

- [ ] **Step 3: Commit**

```bash
git add eslint.config.js
git commit -m "chore: add ESLint 9 flat config (vue/recommended + prettier)"
```

---

## Task 11: Add Prettier config + ignore file

**Files:**
- Create: `.prettierrc.json`
- Create: `.prettierignore`

- [ ] **Step 1: Create `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf"
}
```

- [ ] **Step 2: Create `.prettierignore`**

```
node_modules
dist
public
*.min.js
*.min.css
package-lock.json
docs
```

- [ ] **Step 3: Smoke-test**

```bash
npx prettier --check eslint.config.js
```

Expected: either "All matched files use Prettier code style!" or a list of files that need formatting (acceptable — we're not auto-formatting in Phase 1).

- [ ] **Step 4: Commit**

```bash
git add .prettierrc.json .prettierignore
git commit -m "chore: add Prettier 3 config"
```

---

## Task 12: Add `.editorconfig`

**Files:**
- Create: `.editorconfig`

- [ ] **Step 1: Create `.editorconfig`**

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

- [ ] **Step 2: Commit**

```bash
git add .editorconfig
git commit -m "chore: add .editorconfig"
```

---

## Task 13: Add npm scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add four scripts to `package.json`**

In `package.json`, modify the `scripts` block to:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

(Note: ESLint 9 flat config infers extensions from the config itself — no `--ext` flag needed.)

- [ ] **Step 2: Verify scripts work**

```bash
npm run lint -- --max-warnings=9999
```

Expected: ESLint runs and reports issues (any number is fine — we baseline next, don't fix).

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add lint/format npm scripts"
```

---

## Task 14: Baseline lint run (record, don't auto-fix)

**Files:** None changed.

The goal here is **measurement, not remediation.** Auto-fixing across the whole codebase before Phase 2/3 will create a noisy diff and may collide with later renames. We just want a baseline number.

- [ ] **Step 1: Run lint and capture summary**

```bash
npm run lint 2>&1 | tail -20
```

Expected: a "✖ N problems (X errors, Y warnings)" line. Record both numbers in your phase notes.

- [ ] **Step 2: Run prettier check**

```bash
npm run format:check
```

Expected: a list of files needing formatting. Record the count.

- [ ] **Step 3: Note in plan**

Append to this file under a new `## Baseline (Task 14 results)` section, the captured counts. **Do not commit fixes** — the goal of Phase 1 is to install tooling, not to apply it. Phase 2/3 PRs will absorb the formatting changes naturally.

- [ ] **Step 4: Commit (no file changes — skip this commit step if no files changed)**

If you appended to this plan file:

```bash
git add docs/superpowers/plans/2026-05-09-phase-1-hygiene-tooling.md
git commit -m "docs: record Phase 1 lint/format baseline"
```

---

## Task 15: Add `README.md`

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md` at repo root**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README"
```

---

## Task 16: Add `CLAUDE.md`

**Files:**
- Create: `CLAUDE.md`

This file is read by Claude Code (and other AI assistants) at session start. Keep it short and concrete.

- [ ] **Step 1: Create `CLAUDE.md` at repo root**

```markdown
# Project conventions for AI assistants

This repo is a Vue 3 + Vite portfolio with a co-located admin/CRM (Firebase-backed). Treat it like a long-lived production codebase.

## Stack

Vue 3.5 (Composition API preferred), Vite 6, Pinia, Vue Router 4, Firebase (Auth + Firestore), Swiper 12, Three.js, Chart.js. ESLint 9 (flat config) + Prettier 3.

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

- ESLint + Prettier installed, **not yet auto-applied** across the codebase.
- `src/utilits.js` (typo) renamed to `src/utils/dom-effects.js`.
- `claudedocs/`, `documentation/`, `.playwright-mcp/` deleted from history.

## Useful commands

```bash
npm run dev         # local dev
npm run lint        # check (no fixes)
npm run format      # apply Prettier
firebase deploy     # ship to hosting (after npm run build)
```
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md project conventions"
```

---

## Task 17: Final verification

**Files:** None changed.

- [ ] **Step 1: Clean install (catches any package.json/lockfile drift)**

```bash
rm -rf node_modules
npm ci
```

Expected: clean install completes without errors.

- [ ] **Step 2: Dev build**

```bash
npm run dev
```

Visit `http://localhost:5173/`, click through 2–3 pages including the public home and one admin route (`/admin/login`). Confirm no console errors. Stop the server.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: build succeeds; `dist/` populated.

- [ ] **Step 4: Lint + format check**

```bash
npm run lint
npm run format:check
```

Both should run without crashing. They WILL report issues — that's expected. Phase 2/3 absorb the fixes.

- [ ] **Step 5: Review history**

```bash
git log --oneline refactor/phase-1-hygiene
```

Expected: roughly 14 small, focused commits, each with a `chore:` / `docs:` / `refactor:` prefix.

- [ ] **Step 6: Push branch**

```bash
git push -u origin refactor/phase-1-hygiene
```

(Stop here. Do not merge to `main` automatically. Open a PR or merge locally based on your workflow.)

---

## Self-review checklist

Run through these against the spec before claiming done:

- [ ] All four scoping decisions from the brainstorm are reflected (delete claudedocs/documentation/.playwright-mcp, ESLint+Prettier, README+CLAUDE.md, `@` alias verified).
- [ ] No task uses placeholders ("TODO", "implement later", "appropriate handling").
- [ ] Every step that changes code shows the actual code or exact diff.
- [ ] Every command has expected output.
- [ ] `src/utilits.js` rename touches all 6 known import sites (App.vue, IndexView, IndexDarkView, Cursor, PreLoader, ScrollTop).
- [ ] No tasks defer work that should be in Phase 1 (e.g. lockfile, dependency cleanup) into a later phase.
- [ ] Each task ends in a commit; no commit bundles unrelated changes.
- [ ] Phase boundary is respected: no component renames, no API migrations, no logic changes.

## Baseline (Task 14 results, captured 2026-05-09)

ESLint:
- 154 problems total
- 1 error: `'gtag' is not defined` (no-undef) — Google Analytics global injected by GA `<script>`. Add to `eslint.config.js` `languageOptions.globals` in Phase 2 or declare via `/* global gtag */` at usage sites.
- 153 warnings
- 139 of 154 are auto-fixable via `eslint --fix` (run during Phase 2 alongside file moves/renames).

Prettier:
- 63 files need formatting (run `npm run format` during Phase 2 — bundled with the structural rename so the formatting churn doesn't show up as a separate review surface).

Both were measured on commit `d030598` (post-Task 13).

---

## Out of scope (deferred)

- Renaming `*Component.vue` files (Phase 2)
- Restructuring `src/components/` into `sections/`, `layout/`, `ui/`, `popup/` consistently (Phase 2)
- Migrating Options API → `<script setup>` (Phase 3)
- Auto-applying Prettier formatting across all files (Phase 2 — bundled with file moves to minimize churn)
- Router consolidation (Phase 4)
- Firebase service-layer extraction (Phase 4)
- Admin subapp split decision (Phase 4)
