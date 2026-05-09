# Phase 2: Public Redesign — Foundation + Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the redesigned public site at `/v2` — design tokens, six UI primitives, and seven page sections (Header, Hero, Services, Trust, Portfolio, Process, About) per `docs/superpowers/specs/2026-05-10-site-redesign-design.md`. The legacy `/` route keeps working untouched.

**Architecture:** Additive only — no deletions in Phase 2. New components live in `src/components/ui/` (primitives) and `src/components/sections/` (page sections), composed by `src/views/IndexV2View.vue`. Legacy components and CSS stay until Phase 3 cleanup. All new code uses Vue 3 `<script setup>` and the `@/` alias per `CLAUDE.md`.

**Tech Stack:** Vue 3.5, Vite 6, scoped Vue styles, CSS custom properties (no Tailwind/no CSS framework), existing `vue-js-counter` for animated stats, existing `Three.js` for the relocated 3D demo.

---

## File Structure

**Created (15 new files):**

- `src/assets/tokens.css` — design tokens as CSS custom properties
- `src/components/ui/BaseContainer.vue` — `max-width: 1200px` content wrapper
- `src/components/ui/BaseSection.vue` — `<section>` with vertical padding + optional alt background
- `src/components/ui/BaseButton.vue` — 3 variants (primary/secondary/ghost)
- `src/components/ui/BaseTag.vue` — pill chip
- `src/components/ui/BaseStat.vue` — number + label
- `src/components/ui/BaseCard.vue` — slot-based card
- `src/views/IndexV2View.vue` — composes the new sections
- `src/components/sections/SiteHeader.vue` — sticky responsive nav, replaces `Header.vue` + `MobileHeader.vue`
- `src/components/sections/Hero.vue` — per spec §4.1
- `src/components/sections/ServiceGrid.vue` — per spec §4.2
- `src/components/sections/TrustStrip.vue` — per spec §4.3
- `src/components/sections/PortfolioGrid.vue` — per spec §4.4
- `src/components/sections/ProcessSteps.vue` — per spec §4.5
- `src/components/sections/About.vue` — per spec §4.6

**Modified:**

- `src/main.js` — add `import "./assets/tokens.css";`
- `src/router/index.js` — add `/v2` route

**Not changed (deferred to Phase 3):**

- All existing `src/components/*Component.vue` files
- All `public/css/*.css` files
- `src/components/layout/{Header,MobileHeader,Cursor,PreLoader,ScrollTop}.vue`
- `src/components/HeroCanvas.vue` — Phase 2 imports it from its current location into the new `PortfolioGrid.vue`. Renamed/moved in Phase 3.
- The current `/` route + `IndexView.vue`

---

## Pre-flight

Verify clean state before starting. If any check fails, halt and surface the error.

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang status
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run build
```

Both must succeed. The build will emit lint warnings — that's fine; Phase 1 baseline already documented them.

**Branch decision:**
- If `refactor/phase-1-hygiene` has been merged to `main`: branch from `main`.
- Otherwise: branch from `refactor/phase-1-hygiene` (this Phase 2 work depends on the ESLint config + tokens convention introduced in Phase 1).

```bash
# If Phase 1 merged:
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang switch main
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang pull
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang switch -c refactor/phase-2-public-redesign

# If Phase 1 NOT yet merged (most likely right now):
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang switch refactor/phase-1-hygiene
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang switch -c refactor/phase-2-public-redesign
```

---

## Task 1: Design tokens

**Files:**
- Create: `src/assets/tokens.css`
- Modify: `src/main.js` (line 1 area — add import)

- [ ] **Step 1: Create `src/assets/tokens.css`**

```css
/* Design tokens for the v2 public site. Imported once in main.js.
 * Use via var(--color-ink) etc. inside scoped component styles. */
:root {
  /* Colors */
  --color-ink: #1a1a2e;
  --color-brand: #C41E3A;
  --color-brand-soft: #fef0f2;
  --color-surface: #fafaf8;
  --color-success: #22c55e;
  --color-muted: #666;
  --color-border: #eaeaea;
  --color-white: #ffffff;

  /* Type */
  --font-display: 'Montserrat', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Type scale (values live here; components reference) */
  --fs-display: clamp(28px, 5vw, 42px);
  --fs-h2: clamp(22px, 3.2vw, 30px);
  --fs-h3: 17px;
  --fs-body: 16px;
  --fs-small: 13px;
  --fs-eyebrow: 11px;

  /* Spacing scale */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 20px;
  --sp-6: 24px;
  --sp-8: 32px;
  --sp-10: 40px;
  --sp-12: 48px;
  --sp-16: 64px;
  --sp-20: 80px;

  /* Radius */
  --r-sm: 6px;
  --r-md: 8px;
  --r-lg: 12px;
  --r-pill: 999px;

  /* Shadows */
  --sh-sm: 0 2px 8px rgba(0, 0, 0, .06);
  --sh-md: 0 6px 18px rgba(26, 26, 46, .12);
  --sh-lg: 0 12px 32px rgba(0, 0, 0, .12);

  /* Transitions */
  --tr-fast: 150ms ease;
  --tr-med: 250ms ease;
}
```

- [ ] **Step 2: Add the import to `src/main.js`**

Open `src/main.js`. Currently line 1 is `import "./assets/main.css";`. Add the new tokens import on the line ABOVE so tokens load first:

```js
import "./assets/tokens.css";
import "./assets/main.css";
import "swiper/css";
```

- [ ] **Step 3: Verify dev server still runs**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run dev
```

Background it via `run_in_background: true`. Confirm Vite "ready" line, no errors. Stop the server.

- [ ] **Step 4: Smoke-test a token in DevTools (manual)**

Open `http://localhost:5173/` in browser, open DevTools console, run:

```js
getComputedStyle(document.documentElement).getPropertyValue('--color-brand')
```

Expected: `' #C41E3A'`. If empty, tokens.css didn't load.

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/assets/tokens.css src/main.js
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add design tokens (colors, type, spacing, radius)"
```

---

## Task 2: Layout primitives — BaseContainer + BaseSection

**Files:**
- Create: `src/components/ui/BaseContainer.vue`
- Create: `src/components/ui/BaseSection.vue`

These are the two layout primitives every section uses. `BaseSection` provides vertical padding; `BaseContainer` provides the centered max-width wrapper.

- [ ] **Step 1: Create `src/components/ui/BaseContainer.vue`**

```vue
<script setup>
// Centered content wrapper. Use as the inner shell of every section.
</script>

<template>
  <div class="base-container">
    <slot />
  </div>
</template>

<style scoped>
.base-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-6);
  width: 100%;
}
</style>
```

- [ ] **Step 2: Create `src/components/ui/BaseSection.vue`**

```vue
<script setup>
defineProps({
  // 'default' | 'alt' — alt uses --color-surface bg (for striped sections)
  variant: { type: String, default: 'default' },
  // optional id for anchor scrolling
  id: { type: String, default: null },
});
</script>

<template>
  <section
    :id="id"
    :class="['base-section', `base-section--${variant}`]"
  >
    <slot />
  </section>
</template>

<style scoped>
.base-section {
  padding: var(--sp-20) 0;
  position: relative;
}
.base-section--alt {
  background: var(--color-surface);
}
@media (max-width: 768px) {
  .base-section {
    padding: var(--sp-16) 0;
  }
}
</style>
```

- [ ] **Step 3: Verify both files exist and parse**

```bash
ls C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang/src/components/ui/Base*.vue
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run build 2>&1 | grep -E "(error|✓ built)" | head -5
```

Expected: both files listed; build line `✓ built in NN.NNs`. If a parse error surfaces, fix the SFC syntax before committing.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/ui/BaseContainer.vue src/components/ui/BaseSection.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add BaseContainer and BaseSection layout primitives"
```

---

## Task 3: Display primitives — BaseTag + BaseStat + BaseCard

**Files:**
- Create: `src/components/ui/BaseTag.vue`
- Create: `src/components/ui/BaseStat.vue`
- Create: `src/components/ui/BaseCard.vue`

- [ ] **Step 1: Create `src/components/ui/BaseTag.vue`**

```vue
<script setup>
defineProps({
  // 'eyebrow' (UPPERCASE pill, brand color) | 'tech' (small neutral chip)
  variant: { type: String, default: 'eyebrow' },
});
</script>

<template>
  <span :class="['base-tag', `base-tag--${variant}`]">
    <slot />
  </span>
</template>

<style scoped>
.base-tag {
  display: inline-block;
  border-radius: var(--r-pill);
  font-weight: 700;
  line-height: 1;
}
.base-tag--eyebrow {
  background: var(--color-white);
  border: 1px solid #f3d0d6;
  color: var(--color-brand);
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 11px;
}
.base-tag--tech {
  background: #f5f5f3;
  color: #444;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  letter-spacing: 0;
  text-transform: none;
}
</style>
```

- [ ] **Step 2: Create `src/components/ui/BaseStat.vue`**

```vue
<script setup>
defineProps({
  value: { type: String, required: true },  // e.g. "35+", "5.0", "15h/wk"
  label: { type: String, required: true },  // e.g. "Projects"
  // optional accent — wraps part of value in brand color via slot 'accent'
});
</script>

<template>
  <div class="base-stat">
    <strong class="base-stat__value"><slot name="value">{{ value }}</slot></strong>
    <span class="base-stat__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.base-stat {
  text-align: center;
}
.base-stat__value {
  display: block;
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  line-height: 1;
}
.base-stat__label {
  display: block;
  margin-top: 6px;
  font-size: var(--fs-eyebrow);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}
</style>
```

- [ ] **Step 3: Create `src/components/ui/BaseCard.vue`**

```vue
<script setup>
defineProps({
  // 'plain' | 'interactive' (interactive: hover lift + brand border)
  variant: { type: String, default: 'plain' },
  // optional anchor href — if provided, renders the whole card as <a>
  href: { type: String, default: null },
});
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="['base-card', `base-card--${variant}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-card {
  display: block;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  padding: var(--sp-6);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--tr-fast), transform var(--tr-fast), box-shadow var(--tr-fast);
}
.base-card--interactive:hover {
  border-color: var(--color-brand);
  transform: translateY(-2px);
  box-shadow: var(--sh-md);
}
</style>
```

- [ ] **Step 4: Verify build**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run build 2>&1 | grep -E "(error|✓ built)" | head -5
```

Expected: `✓ built in NN.NNs`.

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/ui/BaseTag.vue src/components/ui/BaseStat.vue src/components/ui/BaseCard.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add BaseTag, BaseStat, BaseCard primitives"
```

---

## Task 4: BaseButton primitive (3 variants)

**Files:**
- Create: `src/components/ui/BaseButton.vue`

- [ ] **Step 1: Create `src/components/ui/BaseButton.vue`**

```vue
<script setup>
defineProps({
  // 'primary' (Ink solid) | 'secondary' (outlined Ink) | 'ghost' (Brand text)
  variant: { type: String, default: 'primary' },
  // if provided, renders as <a href>; otherwise <button>
  href: { type: String, default: null },
  // forwarded to native button
  type: { type: String, default: 'button' },
  disabled: Boolean,
});
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? null : type"
    :disabled="!href && disabled"
    :class="['base-btn', `base-btn--${variant}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  border-radius: var(--r-md);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform var(--tr-fast), box-shadow var(--tr-fast), background var(--tr-fast);
  line-height: 1;
}
.base-btn--primary {
  background: var(--color-ink);
  color: var(--color-white);
  box-shadow: 0 6px 18px rgba(26, 26, 46, .18);
}
.base-btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(26, 26, 46, .22);
}
.base-btn--secondary {
  background: var(--color-white);
  border: 1.5px solid var(--color-ink);
  color: var(--color-ink);
  padding: 12.5px 20px;
}
.base-btn--secondary:hover {
  background: var(--color-ink);
  color: var(--color-white);
}
.base-btn--ghost {
  background: transparent;
  color: var(--color-brand);
  padding: 10px 14px;
}
.base-btn--ghost:hover {
  text-decoration: underline;
}
.base-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
```

- [ ] **Step 2: Verify build**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run build 2>&1 | grep -E "(error|✓ built)" | head -5
```

Expected: `✓ built`.

- [ ] **Step 3: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/ui/BaseButton.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add BaseButton with primary/secondary/ghost variants"
```

---

## Task 5: /v2 route scaffold

**Files:**
- Create: `src/views/IndexV2View.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/IndexV2View.vue` as a verifiable stub**

```vue
<script setup>
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import BaseStat from '@/components/ui/BaseStat.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
</script>

<template>
  <main class="v2-shell">
    <BaseSection>
      <BaseContainer>
        <BaseTag>v2 scaffold</BaseTag>
        <h1 class="v2-h1">Phase 2 site rebuild</h1>
        <p class="v2-lede">
          Each section will be added one task at a time. This stub also smoke-tests every
          UI primitive so we know the foundation is wired up correctly.
        </p>

        <div class="v2-row">
          <BaseButton variant="primary" href="#">Primary button</BaseButton>
          <BaseButton variant="secondary" href="#">Secondary</BaseButton>
          <BaseButton variant="ghost" href="#">Ghost</BaseButton>
        </div>

        <div class="v2-grid">
          <BaseStat value="35+" label="Projects" />
          <BaseStat value="20+" label="Clients" />
          <BaseStat value="8+" label="Years" />
        </div>

        <div class="v2-grid v2-grid--cards">
          <BaseCard variant="interactive" href="#">
            <h3>Interactive card</h3>
            <p>Hover me — should lift + show brand border.</p>
          </BaseCard>
          <BaseCard>
            <h3>Plain card</h3>
            <p>No hover effect.</p>
          </BaseCard>
        </div>
      </BaseContainer>
    </BaseSection>
  </main>
</template>

<style scoped>
.v2-shell {
  min-height: 100vh;
  background: var(--color-white);
  font-family: var(--font-body);
  color: var(--color-ink);
}
.v2-h1 {
  font-family: var(--font-display);
  font-size: var(--fs-display);
  margin: var(--sp-4) 0 var(--sp-3);
  letter-spacing: -0.02em;
}
.v2-lede {
  color: var(--color-muted);
  margin: 0 0 var(--sp-8);
  max-width: 560px;
}
.v2-row {
  display: flex;
  gap: var(--sp-3);
  margin-bottom: var(--sp-10);
  flex-wrap: wrap;
}
.v2-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-4);
  margin-bottom: var(--sp-10);
}
.v2-grid--cards {
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 768px) {
  .v2-grid, .v2-grid--cards { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Add `/v2` route to `src/router/index.js`**

Open `src/router/index.js`. Add the new route ABOVE the `// Admin routes` line. Final routes block:

```js
routes: [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/IndexView.vue"),
  },
  {
    path: "/dark",
    name: "IndexDarkView",
    component: () => import("../views/IndexDarkView.vue"),
  },
  {
    path: "/v2",
    name: "IndexV2",
    component: () => import("../views/IndexV2View.vue"),
  },
  // Admin routes
  ...adminRoutes,
  // 404 Not Found - must be last
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
],
```

- [ ] **Step 3: Verify the route loads**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run dev
```

Background it. Visit `http://localhost:5173/v2` in browser. Confirm:
- Page renders (no white screen)
- Three buttons (primary/secondary/ghost) visible with correct colors
- Three stats (35+/20+/8+) in a row
- Two cards; hover the interactive one — should lift + show brand-color border
- No console errors

If the page is blank or errors, check the browser console + the dev server output. Common issues: typo in import path, forgotten alias, scoped style leak.

Stop the dev server.

- [ ] **Step 4: Verify build**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run build 2>&1 | grep -E "(error|✓ built)" | head -5
```

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/views/IndexV2View.vue src/router/index.js
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): scaffold /v2 route with primitives smoke-test"
```

From here on, every new component gets imported into `IndexV2View.vue` and verified by visiting `/v2`.

---

## Task 6: SiteHeader

**Files:**
- Create: `src/components/sections/SiteHeader.vue`
- Modify: `src/views/IndexV2View.vue` (add SiteHeader at top)

Replaces both `Header.vue` and `MobileHeader.vue` with one responsive component. CSS-driven mobile breakpoint; no JS-detected user agent.

- [ ] **Step 1: Create `src/components/sections/SiteHeader.vue`**

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const scrolled = ref(false);
const mobileOpen = ref(false);

const onScroll = () => { scrolled.value = window.scrollY > 40; };

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
];

function closeMobile() { mobileOpen.value = false; }
</script>

<template>
  <header :class="['site-header', { 'site-header--scrolled': scrolled }]">
    <div class="site-header__inner">
      <a href="#top" class="site-header__logo" aria-label="Home">
        Jesrel <em>Agang</em>
      </a>

      <nav class="site-header__nav" aria-label="Main">
        <a v-for="link in links" :key="link.href" :href="link.href" class="site-header__link">
          {{ link.label }}
        </a>
      </nav>

      <BaseButton variant="primary" href="#contact" class="site-header__cta">
        Book a call
      </BaseButton>

      <button
        class="site-header__burger"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span /><span /><span />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="site-header__mobile">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMobile">
          {{ link.label }}
        </a>
        <BaseButton variant="primary" href="#contact" @click="closeMobile">Book a call</BaseButton>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  transition: box-shadow var(--tr-fast), border-color var(--tr-fast);
  border-bottom: 1px solid transparent;
}
.site-header--scrolled {
  border-bottom-color: var(--color-border);
}
.site-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px var(--sp-6);
  display: flex;
  align-items: center;
  gap: var(--sp-6);
}
.site-header__logo {
  font-weight: 800;
  color: var(--color-ink);
  text-decoration: none;
  letter-spacing: -0.01em;
  font-size: 17px;
}
.site-header__logo em { color: var(--color-brand); font-style: normal; }
.site-header__nav {
  display: flex;
  gap: var(--sp-6);
  margin-left: auto;
}
.site-header__link {
  color: #555;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color var(--tr-fast);
}
.site-header__link:hover { color: var(--color-ink); }
.site-header__cta { margin-left: var(--sp-3); }
.site-header__burger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
}
.site-header__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-ink);
  margin: 4px 0;
  transition: transform var(--tr-fast);
}

.site-header__mobile {
  display: none;
  padding: var(--sp-4) var(--sp-6) var(--sp-6);
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  flex-direction: column;
  gap: var(--sp-4);
}
.site-header__mobile a {
  color: var(--color-ink);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
}
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity var(--tr-fast); }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .site-header__nav, .site-header__cta { display: none; }
  .site-header__burger { display: block; }
  .site-header__mobile { display: flex; }
}
</style>
```

- [ ] **Step 2: Add SiteHeader to `IndexV2View.vue`**

In `src/views/IndexV2View.vue`, update the import block and template:

```vue
<script setup>
import SiteHeader from '@/components/sections/SiteHeader.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import BaseStat from '@/components/ui/BaseStat.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
</script>

<template>
  <SiteHeader />
  <main class="v2-shell">
    <!-- ... existing content unchanged ... -->
  </main>
</template>
```

(Keep the existing `<style scoped>` and the `<main>` body.)

- [ ] **Step 3: Verify visually**

`npm run dev`, visit `/v2`:
- Header is sticky (scroll the page; it stays at top)
- After scrolling > 40px, a faint bottom border appears on the header
- On desktop (>768px): logo · nav links · "Book a call" CTA visible
- On mobile (resize browser to <768px): burger appears, nav + CTA hidden; click burger → menu drops down with links + CTA; click a link → menu closes
- No console errors

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/sections/SiteHeader.vue src/views/IndexV2View.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add responsive SiteHeader with mobile menu"
```

---

## Task 7: Hero

**Files:**
- Create: `src/components/sections/Hero.vue`
- Modify: `src/views/IndexV2View.vue` (replace stub content with Hero)

Per spec §4.1. Two-column desktop, single-column mobile. Drops the 3D canvas (relocates in Task 10). Includes the stats band as part of Hero (lives at the bottom of the section).

- [ ] **Step 1: Create `src/components/sections/Hero.vue`**

```vue
<script setup>
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import BaseStat from '@/components/ui/BaseStat.vue';

// Placeholder portrait. Jesrel can swap /img/banner/avatar.png with a higher-res photo later.
const portraitSrc = '/img/banner/avatar.png';
</script>

<template>
  <section id="top" class="hero">
    <BaseContainer>
      <div class="hero__grid">
        <div class="hero__text">
          <BaseTag>Web · Mobile · N8N · Tech Support</BaseTag>
          <h1 class="hero__title">
            Your <em>full-stack partner</em><br />
            for shipping, scaling,<br />
            and supporting software.
          </h1>
          <p class="hero__lede">
            Eight years building web apps, mobile apps, N8N automations, and ongoing technical
            support for SMBs in the USA, UK, and Australia.
          </p>
          <div class="hero__ctas">
            <BaseButton variant="primary" href="#contact">Book free consultation →</BaseButton>
            <BaseButton variant="secondary" href="#portfolio">View work</BaseButton>
          </div>
          <p class="hero__reply">
            <span class="hero__dot" aria-hidden="true" />
            <strong>Replies within 24 hours</strong> · USD payments · NDA-friendly
          </p>
        </div>

        <div class="hero__photo">
          <div class="hero__photo-frame">
            <img :src="portraitSrc" alt="Jesrel Agang" loading="eager" />
          </div>
          <div class="hero__badge hero__badge--tl">
            <span class="hero__stars" aria-label="Five star rating">★★★★★</span>
            <div>
              5.0 rating
              <small>20+ clients</small>
            </div>
          </div>
          <div class="hero__badge hero__badge--br">
            <span class="hero__flags" aria-hidden="true">🇺🇸 🇬🇧 🇦🇺</span>
            <div>
              Trusted globally
              <small>USA · UK · AU</small>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>

    <div class="hero__stats-band">
      <BaseContainer>
        <div class="hero__stats">
          <BaseStat value="35+" label="Projects" />
          <BaseStat value="20+" label="Clients" />
          <BaseStat value="8+" label="Years" />
          <BaseStat value="15h/wk" label="Saved via N8N" />
        </div>
      </BaseContainer>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--color-white) 0%, var(--color-brand-soft) 100%);
  padding-top: var(--sp-16);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--sp-12);
  align-items: center;
  padding-bottom: var(--sp-16);
}
.hero__title {
  font-family: var(--font-body);
  font-size: var(--fs-display);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin: var(--sp-5) 0 var(--sp-5);
}
.hero__title em { color: var(--color-brand); font-style: normal; }
.hero__lede {
  font-size: var(--fs-body);
  color: #555;
  line-height: 1.55;
  margin: 0 0 var(--sp-8);
  max-width: 480px;
}
.hero__ctas {
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
  margin-bottom: var(--sp-8);
}
.hero__reply {
  font-size: var(--fs-small);
  color: var(--color-muted);
  margin: 0;
}
.hero__reply strong { color: var(--color-ink); }
.hero__dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--color-success);
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}

.hero__photo {
  position: relative;
  aspect-ratio: 1 / 1.05;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--color-ink), #3d0d1a);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.hero__photo-frame {
  width: 88%;
  height: 96%;
  margin-bottom: 6px;
  border-radius: 14px 14px 0 0;
  overflow: hidden;
  background: radial-gradient(circle at 50% 35%, #9a3a4d 0%, var(--color-ink) 70%);
}
.hero__photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero__badge {
  position: absolute;
  background: var(--color-white);
  border-radius: 10px;
  padding: 10px 14px;
  box-shadow: var(--sh-md);
  font-size: 11px;
  color: var(--color-ink);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.2;
}
.hero__badge small {
  display: block;
  color: var(--color-muted);
  font-weight: 400;
  font-size: 9px;
}
.hero__badge--tl { top: var(--sp-5); left: var(--sp-5); }
.hero__badge--br { bottom: var(--sp-6); right: var(--sp-5); }
.hero__stars { color: #ffc107; font-size: 10px; }
.hero__flags { font-size: 18px; }

.hero__stats-band {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--sp-6) 0;
}
.hero__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-4);
}

@media (max-width: 900px) {
  .hero__grid { grid-template-columns: 1fr; gap: var(--sp-8); }
  .hero__photo { max-width: 360px; margin: 0 auto; }
  .hero__stats { grid-template-columns: repeat(2, 1fr); gap: var(--sp-6); }
}
</style>
```

- [ ] **Step 2: Replace `IndexV2View.vue` content with Hero**

Open `src/views/IndexV2View.vue`. Replace the entire file contents with:

```vue
<script setup>
import SiteHeader from '@/components/sections/SiteHeader.vue';
import Hero from '@/components/sections/Hero.vue';
</script>

<template>
  <SiteHeader />
  <main>
    <Hero />
  </main>
</template>
```

(All the primitive smoke-test content goes away — the primitives are now exercised by the section components themselves.)

- [ ] **Step 3: Verify visually**

`npm run dev`, visit `/v2`:
- Two-column hero on desktop: text left, photo with floating badges right
- Eyebrow pill with brand color, big H1 with red-accented "full-stack partner"
- Two CTAs with proper variants
- Green dot + "Replies within 24 hours" line
- Photo placeholder shows the existing `/img/banner/avatar.png`
- Two floating badges: "5.0 rating" top-left, flags top-right (sorry, **bottom**-right)
- Below: full-bleed stats band on surface color, 4 stats
- Mobile (resize <900px): single column, photo below text, stats become 2×2
- No console errors

If the photo file `/img/banner/avatar.png` doesn't exist, the placeholder `<img>` is broken. That's OK for v2 development — Jesrel will replace it later.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/sections/Hero.vue src/views/IndexV2View.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add Hero section with photo, CTAs, badges, stats band"
```

---

## Task 8: ServiceGrid

**Files:**
- Create: `src/components/sections/ServiceGrid.vue`
- Modify: `src/views/IndexV2View.vue` (add `<ServiceGrid />` after `<Hero />`)

- [ ] **Step 1: Create `src/components/sections/ServiceGrid.vue`**

```vue
<script setup>
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTag from '@/components/ui/BaseTag.vue';

// 4 services per spec §4.2. Adjust copy with Jesrel later if needed.
const services = [
  {
    icon: '⚡',
    title: 'Web Development',
    desc: 'Marketing sites, dashboards, internal tools, SaaS products. Fast, accessible, SEO-ready.',
    tags: ['Vue 3', 'React', 'Node', 'Firebase'],
    href: '#portfolio',
    cta: 'See web work →',
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS + Android apps with React Native. Push, payments, offline.',
    tags: ['React Native', 'Expo', 'Stripe'],
    href: '#portfolio',
    cta: 'See mobile work →',
  },
  {
    icon: '🔗',
    title: 'N8N Automation',
    desc: 'Workflow automation that saves teams 15+ hours/week. CRM sync, lead routing, billing.',
    tags: ['N8N', 'Webhooks', 'CRM APIs'],
    href: '#portfolio',
    cta: 'See automation work →',
  },
  {
    icon: '🛟',
    title: 'Technical Support',
    desc: 'Ongoing maintenance, bug fixes, monitoring, on-call dev help. Monthly retainers available.',
    tags: ['Retainer', 'SLA', 'DevOps'],
    href: '#contact',
    cta: 'See support plans →',
  },
];
</script>

<template>
  <BaseSection id="services">
    <BaseContainer>
      <header class="svc-header">
        <BaseTag>What I build</BaseTag>
        <h2 class="svc-h2">Four services. One developer.</h2>
        <p class="svc-sub">
          Pick one or bundle several — most clients start with web or N8N and grow from there.
        </p>
      </header>

      <div class="svc-grid">
        <BaseCard v-for="s in services" :key="s.title" variant="interactive" :href="s.href">
          <div class="svc-icon" aria-hidden="true">{{ s.icon }}</div>
          <h3 class="svc-title">{{ s.title }}</h3>
          <p class="svc-desc">{{ s.desc }}</p>
          <div class="svc-tags">
            <span v-for="t in s.tags" :key="t" class="svc-tag">{{ t }}</span>
          </div>
          <span class="svc-cta">{{ s.cta }}</span>
        </BaseCard>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<style scoped>
.svc-header { text-align: center; margin-bottom: var(--sp-10); }
.svc-h2 {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: var(--sp-3) 0 var(--sp-3);
  line-height: 1.15;
}
.svc-sub {
  color: var(--color-muted);
  margin: 0 auto;
  max-width: 520px;
  font-size: 14px;
}

.svc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-5);
}
.svc-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--color-brand-soft), #fce4e8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: var(--sp-4);
}
.svc-title {
  font-size: var(--fs-h3);
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 var(--sp-2);
}
.svc-desc {
  font-size: var(--fs-small);
  color: #555;
  line-height: 1.55;
  margin: 0 0 var(--sp-4);
}
.svc-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: var(--sp-4);
}
.svc-tag {
  background: #f5f5f3;
  color: #444;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: var(--r-pill);
}
.svc-cta {
  font-size: 12px;
  color: var(--color-brand);
  font-weight: 600;
}

@media (max-width: 768px) {
  .svc-grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Add to `IndexV2View.vue`**

```vue
<script setup>
import SiteHeader from '@/components/sections/SiteHeader.vue';
import Hero from '@/components/sections/Hero.vue';
import ServiceGrid from '@/components/sections/ServiceGrid.vue';
</script>

<template>
  <SiteHeader />
  <main>
    <Hero />
    <ServiceGrid />
  </main>
</template>
```

- [ ] **Step 3: Verify visually**

`/v2`: 4-card grid below the hero, each with icon + title + description + tech tags + CTA link. Hover: card lifts and gets brand-color border. Mobile: cards stack 1-column.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/sections/ServiceGrid.vue src/views/IndexV2View.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add ServiceGrid (4 services with icons + tech tags)"
```

---

## Task 9: TrustStrip

**Files:**
- Create: `src/components/sections/TrustStrip.vue`
- Modify: `src/views/IndexV2View.vue` (add after ServiceGrid)

- [ ] **Step 1: Create `src/components/sections/TrustStrip.vue`**

```vue
<script setup>
// Per spec §4.3. Initials placeholder until clients consent to logos.
const initials = ['SM', 'MR', 'JK', 'DL', 'ES'];
const moreCount = 15;
</script>

<template>
  <section class="trust" aria-label="Client trust signals">
    <div class="trust__inner">
      <div class="trust__rating">
        <span class="trust__stars" aria-hidden="true">★★★★★</span>
        <div>
          <div class="trust__num">5.0</div>
          <small>{{ initials.length + moreCount }}+ verified clients</small>
        </div>
      </div>

      <div class="trust__clients">
        <div class="trust__avatars">
          <span v-for="i in initials" :key="i" class="trust__avatar">{{ i }}</span>
        </div>
        <small>+{{ moreCount }} more</small>
      </div>

      <div class="trust__flags">
        <span aria-hidden="true">🇺🇸 🇬🇧 🇦🇺</span>
        <span>Trusted across USA, UK, Australia</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--sp-8) 0;
}
.trust__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-6);
  flex-wrap: wrap;
}

.trust__rating {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
}
.trust__stars {
  color: #ffc107;
  font-size: 22px;
  letter-spacing: 2px;
}
.trust__num {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-ink);
  line-height: 1;
  font-family: var(--font-display);
}
.trust__rating small {
  display: block;
  font-size: 11px;
  color: var(--color-muted);
}

.trust__clients {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}
.trust__avatars { display: flex; }
.trust__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-brand), #7a1226);
  color: var(--color-white);
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-white);
  margin-left: -8px;
}
.trust__avatar:first-child { margin-left: 0; }
.trust__clients small { font-size: 12px; color: #444; }

.trust__flags {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  font-size: 13px;
  color: #444;
  font-weight: 600;
}
.trust__flags > span:first-child { font-size: 18px; }

@media (max-width: 768px) {
  .trust__inner { justify-content: center; flex-direction: column; gap: var(--sp-5); text-align: center; }
}
</style>
```

- [ ] **Step 2: Add to `IndexV2View.vue`**

```vue
<script setup>
import SiteHeader from '@/components/sections/SiteHeader.vue';
import Hero from '@/components/sections/Hero.vue';
import ServiceGrid from '@/components/sections/ServiceGrid.vue';
import TrustStrip from '@/components/sections/TrustStrip.vue';
</script>

<template>
  <SiteHeader />
  <main>
    <Hero />
    <ServiceGrid />
    <TrustStrip />
  </main>
</template>
```

- [ ] **Step 3: Verify visually**

`/v2`: Below ServiceGrid, a horizontal band on the surface color showing rating · stacked client circles · flags. Mobile: stacks vertically, centered.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/sections/TrustStrip.vue src/views/IndexV2View.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add TrustStrip (rating + client circles + geo flags)"
```

---

## Task 10: PortfolioGrid (with relocated 3D demo)

**Files:**
- Create: `src/components/sections/PortfolioGrid.vue`
- Modify: `src/views/IndexV2View.vue`

The 3D canvas (`src/components/HeroCanvas.vue`) gets imported INTO this section as one of the 6 cards. The original file is not deleted (Phase 3 cleanup); it's just no longer rendered in the hero of /v2.

- [ ] **Step 1: Create `src/components/sections/PortfolioGrid.vue`**

```vue
<script setup>
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import HeroCanvas from '@/components/HeroCanvas.vue';

// Spec §4.4: 6 cards. Real projects TBD by Jesrel — placeholder data here.
const projects = [
  {
    title: 'Sales pipeline SaaS',
    stack: ['Vue 3', 'Pinia', 'Firebase'],
    metric: 'Cut manual data entry 80%',
    thumbBg: 'linear-gradient(135deg,#1a1a2e,#3d0d1a)',
  },
  {
    title: 'Interactive 3D landing',
    stack: ['Three.js', 'Vue 3'],
    metric: '2.3s LCP · 95 Lighthouse',
    isLiveDemo: true,
  },
  {
    title: 'Lead-to-CRM automation',
    stack: ['N8N', 'HubSpot', 'Slack'],
    metric: 'Saved 18 hrs/week',
    thumbBg: 'linear-gradient(135deg,#252a44,#5d2c66)',
  },
  {
    title: 'Salon booking app',
    stack: ['React Native', 'Expo', 'Stripe'],
    metric: '2,000+ bookings/mo',
    thumbBg: 'linear-gradient(135deg,#0d2434,#185a8e)',
  },
  {
    title: 'Inventory ops dashboard',
    stack: ['Vue 3', 'PostgreSQL'],
    metric: '3 sites unified',
    thumbBg: 'linear-gradient(135deg,#252a44,#5d2c66)',
  },
  {
    title: 'Agency rebrand site',
    stack: ['Vue 3', 'Vite', 'Sanity'],
    metric: '+45% conversions',
    thumbBg: 'linear-gradient(135deg,#1a1a2e,#3d0d1a)',
  },
];
</script>

<template>
  <BaseSection id="portfolio">
    <BaseContainer>
      <header class="port-header">
        <BaseTag>Selected work</BaseTag>
        <h2 class="port-h2">Recent projects</h2>
        <p class="port-sub">Six case studies showing real outcomes — not just screenshots.</p>
      </header>

      <div class="port-grid">
        <BaseCard v-for="p in projects" :key="p.title" variant="interactive" class="port-card">
          <div class="port-thumb" :style="p.isLiveDemo ? null : { background: p.thumbBg }">
            <HeroCanvas v-if="p.isLiveDemo" :dark="false" />
            <span v-if="p.isLiveDemo" class="port-live-badge">Live demo</span>
            <span v-else class="port-thumb-label">{{ p.title }}</span>
          </div>
          <div class="port-body">
            <h4 class="port-title">{{ p.title }}</h4>
            <div class="port-stack">
              <span v-for="s in p.stack" :key="s">{{ s }}</span>
            </div>
            <div class="port-metric">{{ p.metric }}</div>
          </div>
        </BaseCard>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<style scoped>
.port-header { text-align: center; margin-bottom: var(--sp-10); }
.port-h2 {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: var(--sp-3) 0 var(--sp-3);
  line-height: 1.15;
}
.port-sub { color: var(--color-muted); margin: 0 auto; max-width: 520px; font-size: 14px; }

.port-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-4);
}
.port-card { padding: 0 !important; overflow: hidden; }

.port-thumb {
  aspect-ratio: 16 / 10;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  overflow: hidden;
}
.port-thumb-label { position: relative; z-index: 1; }
.port-live-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-brand);
  color: var(--color-white);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 7px;
  border-radius: var(--r-pill);
  text-transform: uppercase;
  z-index: 2;
}

.port-body { padding: var(--sp-4) var(--sp-4) var(--sp-4); }
.port-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 6px;
}
.port-stack {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.port-stack span {
  background: #f5f5f3;
  color: #555;
  font-size: 9px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}
.port-metric {
  font-size: 12px;
  color: var(--color-success);
  font-weight: 600;
}

@media (max-width: 900px) {
  .port-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .port-grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Add to `IndexV2View.vue`**

```vue
<script setup>
import SiteHeader from '@/components/sections/SiteHeader.vue';
import Hero from '@/components/sections/Hero.vue';
import ServiceGrid from '@/components/sections/ServiceGrid.vue';
import TrustStrip from '@/components/sections/TrustStrip.vue';
import PortfolioGrid from '@/components/sections/PortfolioGrid.vue';
</script>

<template>
  <SiteHeader />
  <main>
    <Hero />
    <ServiceGrid />
    <TrustStrip />
    <PortfolioGrid />
  </main>
</template>
```

- [ ] **Step 3: Verify visually**

`/v2`: 6-card portfolio grid (3×2 on desktop, 2×N on tablet, 1×6 on mobile). One card has the actual Three.js canvas spinning inside it with a "Live demo" badge. Other 5 are gradient placeholder thumbnails. Each card shows title + tech chips + green outcome metric. Hover lifts card.

If the 3D card breaks the grid (the canvas can be misbehaving with `position:absolute`), check the console. The original `HeroCanvas.vue` styles its container with `position:absolute; top:0` which is fine inside `.port-thumb` because that has `overflow:hidden` + a defined aspect ratio. If the canvas escapes the card, we may need to add `position:relative` to `.port-thumb` (already there).

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/sections/PortfolioGrid.vue src/views/IndexV2View.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add PortfolioGrid with relocated 3D canvas as live demo"
```

---

## Task 11: ProcessSteps

**Files:**
- Create: `src/components/sections/ProcessSteps.vue`
- Modify: `src/views/IndexV2View.vue`

Per spec §4.5. 4-step horizontal flow on desktop, vertical on mobile.

- [ ] **Step 1: Create `src/components/sections/ProcessSteps.vue`**

```vue
<script setup>
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseTag from '@/components/ui/BaseTag.vue';

const steps = [
  { n: 1, title: 'Discovery call', desc: '30 min, free, no obligation. We talk through the problem.' },
  { n: 2, title: 'Proposal + estimate', desc: 'Fixed-fee or hourly, written scope, clear deliverables.' },
  { n: 3, title: 'Build', desc: 'Weekly demo, async-first, Slack/Loom updates throughout.' },
  { n: 4, title: 'Launch + support', desc: 'Handover + optional retainer for ongoing tech support.' },
];
</script>

<template>
  <BaseSection id="process" variant="alt">
    <BaseContainer>
      <header class="proc-header">
        <BaseTag>How we work</BaseTag>
        <h2 class="proc-h2">Four steps from hello to live</h2>
      </header>

      <ol class="proc-steps">
        <li v-for="s in steps" :key="s.n" class="proc-step">
          <div class="proc-num">{{ s.n }}</div>
          <h3 class="proc-title">{{ s.title }}</h3>
          <p class="proc-desc">{{ s.desc }}</p>
        </li>
      </ol>
    </BaseContainer>
  </BaseSection>
</template>

<style scoped>
.proc-header { text-align: center; margin-bottom: var(--sp-10); }
.proc-h2 {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: var(--sp-3) 0 0;
  line-height: 1.15;
}

.proc-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-6);
  position: relative;
}
.proc-steps::before {
  content: '';
  position: absolute;
  top: 22px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--color-border) 8%, var(--color-border) 92%, transparent);
  z-index: 0;
}
.proc-step {
  position: relative;
  z-index: 1;
  text-align: center;
  background: var(--color-surface);
  padding: 0 var(--sp-3);
}
.proc-num {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-white);
  border: 2px solid var(--color-brand);
  color: var(--color-brand);
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--sp-4);
}
.proc-title {
  font-size: var(--fs-h3);
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 6px;
}
.proc-desc {
  font-size: var(--fs-small);
  color: var(--color-muted);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 768px) {
  .proc-steps { grid-template-columns: 1fr; }
  .proc-steps::before { display: none; }
}
</style>
```

- [ ] **Step 2: Add to `IndexV2View.vue`**

```vue
<script setup>
import SiteHeader from '@/components/sections/SiteHeader.vue';
import Hero from '@/components/sections/Hero.vue';
import ServiceGrid from '@/components/sections/ServiceGrid.vue';
import TrustStrip from '@/components/sections/TrustStrip.vue';
import PortfolioGrid from '@/components/sections/PortfolioGrid.vue';
import ProcessSteps from '@/components/sections/ProcessSteps.vue';
</script>

<template>
  <SiteHeader />
  <main>
    <Hero />
    <ServiceGrid />
    <TrustStrip />
    <PortfolioGrid />
    <ProcessSteps />
  </main>
</template>
```

- [ ] **Step 3: Verify visually**

`/v2`: Section on the surface color. Header centered, then 4-step horizontal flow (numbered red-bordered circles connected by a dashed-feel line). Mobile: steps stack vertically, line hides.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/sections/ProcessSteps.vue src/views/IndexV2View.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add ProcessSteps (4-step horizontal flow)"
```

---

## Task 12: About v2

**Files:**
- Create: `src/components/sections/About.vue`
- Modify: `src/views/IndexV2View.vue`

Per spec §4.6. Two-column with portrait + animated counters on the left, headline + story + CTA on the right. Reuses existing `vue-js-counter` package.

- [ ] **Step 1: Create `src/components/sections/About.vue`**

```vue
<script setup>
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import VueJsCounter from 'vue-js-counter';

const portraitSrc = '/img/banner/avatar.png';
</script>

<template>
  <BaseSection id="about">
    <BaseContainer>
      <div class="about-grid">
        <div class="about-photo">
          <img :src="portraitSrc" alt="Jesrel Agang" loading="lazy" />
          <div class="about-stat about-stat--years">
            <strong><VueJsCounter end="8" />+</strong>
            <small>Years of<br />Experience</small>
          </div>
          <div class="about-stat about-stat--projects">
            <strong><VueJsCounter end="35" />+</strong>
            <small>Projects<br />Completed</small>
          </div>
        </div>

        <div class="about-text">
          <BaseTag>About Jesrel</BaseTag>
          <h2 class="about-h2">N8N Automation + Web/Mobile Development + Tech Support</h2>
          <p>
            Hello! I'm Jesrel Agang, serving clients in the USA, UK, Australia, and worldwide. I
            specialize in N8N workflow automation that saves businesses 15+ hours weekly,
            full-stack web and mobile development with Vue.js, React, and React Native, plus
            reliable technical support.
          </p>
          <p>
            <strong>Why clients choose me:</strong> competitive rates, significant timezone
            overlap for real-time collaboration, excellent English communication, and a proven
            track record. I sign NDAs, accept USD payments, and deliver enterprise-quality work.
          </p>
          <BaseButton variant="primary" href="#contact">Hire me →</BaseButton>
        </div>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--sp-12);
  align-items: center;
}

.about-photo {
  position: relative;
  aspect-ratio: 1 / 1.1;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-ink), #3d0d1a);
}
.about-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-stat {
  position: absolute;
  background: var(--color-white);
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--r-md);
  box-shadow: var(--sh-md);
}
.about-stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  line-height: 1;
}
.about-stat small {
  display: block;
  font-size: 10px;
  color: var(--color-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 4px;
  line-height: 1.2;
}
.about-stat--years { top: 18px; left: -18px; }
.about-stat--projects { bottom: 24px; right: -18px; }

.about-text :deep(p) {
  font-size: var(--fs-body);
  color: #444;
  line-height: 1.65;
  margin: 0 0 var(--sp-5);
}
.about-h2 {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: var(--sp-3) 0 var(--sp-5);
  line-height: 1.2;
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: var(--sp-10); }
  .about-photo { max-width: 360px; margin: 0 auto; }
  .about-stat--years { top: 12px; left: 12px; }
  .about-stat--projects { bottom: 12px; right: 12px; }
}
</style>
```

- [ ] **Step 2: Add to `IndexV2View.vue`**

```vue
<script setup>
import SiteHeader from '@/components/sections/SiteHeader.vue';
import Hero from '@/components/sections/Hero.vue';
import ServiceGrid from '@/components/sections/ServiceGrid.vue';
import TrustStrip from '@/components/sections/TrustStrip.vue';
import PortfolioGrid from '@/components/sections/PortfolioGrid.vue';
import ProcessSteps from '@/components/sections/ProcessSteps.vue';
import About from '@/components/sections/About.vue';
</script>

<template>
  <SiteHeader />
  <main>
    <Hero />
    <ServiceGrid />
    <TrustStrip />
    <PortfolioGrid />
    <ProcessSteps />
    <About />
  </main>
</template>
```

- [ ] **Step 3: Verify visually**

`/v2`: About section. Photo on left with two floating stat cards (years + projects, with counters that animate up when scrolled into view — courtesy of `vue-js-counter`'s built-in IntersectionObserver). Right: eyebrow + H2 + 2 paragraphs + "Hire me →" button. Mobile: stacks, photo above text.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add src/components/sections/About.vue src/views/IndexV2View.vue
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "feat(v2): add About section with portrait, animated counters, story"
```

---

## Task 13: Final verification + push

**Files:** None changed.

- [ ] **Step 1: Full visual smoke-test of `/v2`**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run dev
```

Background it. Visit `http://localhost:5173/v2` and check:

- Header sticky, nav links work (each one scrolls to its anchor: #services, #portfolio, #process, #about — except `#contact` which doesn't exist yet on /v2; that's OK, Phase 3 adds it)
- Hero renders with all elements
- ServiceGrid: 4 cards, hover lift works
- TrustStrip: rating + circles + flags
- PortfolioGrid: 6 cards including the live 3D demo card
- ProcessSteps: 4 numbered steps
- About: photo + counters + text
- Mobile (Chrome DevTools, iPhone-ish width): all sections stack correctly
- Browser console: zero errors

Stop the server.

- [ ] **Step 2: Production build**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run build 2>&1 | grep -E "(error|✓ built|warning)" | head -20
```

Expected: `✓ built in NN.NNs`. Lint warnings are OK (Phase 1 baseline). If a build error appears, fix before pushing.

- [ ] **Step 3: Lighthouse spot-check (manual)**

```bash
npm --prefix C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang run preview
```

Background it. Open `http://localhost:4173/v2` in Chrome. Run Lighthouse (mobile, performance + accessibility). Target per spec §1: Performance ≥ 95, Accessibility ≥ 95, LCP < 2.5s. Record numbers in commit message of the next step. If significantly below, list the worst offenders for Phase 3 to fix — but don't block the phase on this.

Stop the preview server.

- [ ] **Step 4: Commit Lighthouse numbers as a note**

If you have specific numbers to record, add them to the plan file:

Open `docs/superpowers/plans/2026-05-10-phase-2-public-redesign.md`, append at the bottom:

```markdown

## Phase 2 Lighthouse baseline (captured at end of Task 13)

- Performance: <number>/100
- Accessibility: <number>/100
- LCP: <X.X>s
- CLS: <0.0X>

Measured on `/v2` via `npm run preview` + Chrome Lighthouse, mobile profile.
```

Then:

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang add docs/superpowers/plans/2026-05-10-phase-2-public-redesign.md
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang commit -m "docs: record Phase 2 Lighthouse baseline"
```

If you don't have Chrome/Lighthouse handy, skip this commit step (no harm).

- [ ] **Step 5: Review history**

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang log --oneline refactor/phase-2-public-redesign ^refactor/phase-1-hygiene 2>/dev/null \
  || git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang log --oneline -15
```

Expected: ~12 small focused commits, each prefixed `feat(v2):` or `docs:`.

- [ ] **Step 6: Push branch (await user confirmation)**

This step publishes the branch. Pause and confirm with the user before running:

```bash
git -C C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang push -u origin refactor/phase-2-public-redesign
```

After push, GitHub returns a PR URL. Surface it to the user.

---

## Self-review checklist

Run before claiming done:

- [ ] Every spec section in `2026-05-10-site-redesign-design.md` §4.1–§4.6 has a corresponding Phase 2 task (Hero=7, Services=8, TrustStrip=9, Portfolio=10, Process=11, About=12). Sections §4.7–§4.10 (Testimonials, FAQ, Contact, Footer) are explicitly Phase 3.
- [ ] No placeholders ("TBD", "appropriate", "etc.") in any task — all code shown is concrete.
- [ ] Every component imports use `@/` alias, not `../../..`.
- [ ] Every new component is `<script setup>` per `CLAUDE.md`.
- [ ] No new file deletes legacy code — Phase 2 is additive only. Legacy `IndexView.vue`, `Header.vue`, `MobileHeader.vue`, `HomeComponent.vue`, etc. remain on disk.
- [ ] `HeroCanvas.vue` is imported (not deleted) into `PortfolioGrid.vue`.
- [ ] `vue-js-counter` works inside `About.vue` — it's already a dependency.
- [ ] Each task ends with a single, focused commit.
- [ ] All file paths are absolute Windows paths in commands (the project lives at `C:/Users/jesre/OneDrive/Documents/GitHub/jesrelagang`).

## Out of scope (deferred to Phase 3)

- Testimonials, FAQ, Contact form, Site footer (per spec §8 step 6–7)
- Promotion: swap `/v2` → `/` (per spec §8 step 8)
- Cleanup: delete legacy CSS, wow.js, magic cursor, brush PNGs, preloader, dark route, legacy class prefixes (per spec §7 + §8 step 9)
- Auto-format / ESLint baseline cleanup (Phase 1 baseline still valid; clean up alongside Phase 3 deletions)
- Real portfolio data, real client logos, Calendly link, final hero copy — content inputs from Jesrel (per spec §11)
- Filtered portfolio routes, case-study detail pages (spec stretch goals)
- Dark mode (spec out-of-scope)
