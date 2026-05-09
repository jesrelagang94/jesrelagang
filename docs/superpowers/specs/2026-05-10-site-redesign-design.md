# Site Redesign Design Spec

**Status:** Approved (brainstorm complete 2026-05-10) — pending implementation plan.
**Scope:** Public-facing portfolio site only (`jesrelagang.pro`). Admin/CRM (`src/admin/*`) is out of scope.
**Direction selected:** "Hybrid Bold Catalog" (Direction C from brainstorm). Light + bold red accent, two CTAs, four-service catalog, prominent trust signals.

---

## 1. Goal & Success Metrics

**Goal:** Convert site visitors into US/UK/AU client leads. Replace the purchased ThemeForest-era template with a conversion-focused catalog design that surfaces trust signals strongly.

**Success metrics** (track post-launch):

- Lead form submissions / month
- Bounce rate on `/`
- Time-to-first-CTA-click
- Lighthouse Performance ≥ 95, Accessibility ≥ 95
- LCP < 2.5s, CLS < 0.1, TBT < 200ms

---

## 2. Audience & Positioning

**Buyer:** Broad — small business owners, mid-size businesses, students, anyone needing development help. The site is intentionally not narrow-niche; the design compensates with strong trust signals (rating, client count, geography, response-time promise) so credibility carries across audiences.

**Positioning headline framing:** "Partner" framing — emphasizes ongoing relationship rather than one-off projects. Working hero copy:

> *"Your full-stack partner for shipping, scaling, and supporting software."*

(Exact wording is a final-mile content decision; the framing is locked.)

**Service offer (4 services, in order of prominence):**

1. **Web Development** — Vue 3, React, Node, Firebase
2. **Mobile Apps** — React Native, Expo, Stripe
3. **N8N Automation** — Workflow automation, CRM sync, lead routing
4. **Technical Support** — Retainers, monitoring, on-call dev help (new — added as part of this redesign)

---

## 3. Page Architecture

Section order on `/` (top to bottom):

| # | Section       | Purpose                              |
|---|---------------|--------------------------------------|
| 1 | Hero          | Pitch + primary CTAs + stats band    |
| 2 | Services      | 4-card catalog of what's offered     |
| 3 | Trust strip   | 5.0 rating · client circles · flags  |
| 4 | Portfolio     | 6 case studies w/ outcome metrics    |
| 5 | Process       | 4-step "how we work together"        |
| 6 | About         | Jesrel as a person — story + photo   |
| 7 | Testimonials  | Rotating + client cards              |
| 8 | FAQ           | 6–8 buyer-objection questions        |
| 9 | Contact       | Form + Calendly + 24h reply promise  |
| 10| Footer        | Links + copyright                    |

**Why this order:** First-time visitor flows WHAT (services) → PROOF (trust + portfolio) → HOW (process) → WHO (about) → DECISION (FAQ + contact). Current site puts About early — that reads as "personal site," weaker for converting strangers.

---

## 4. Section Designs

### 4.1 Hero

- **Layout:** Two-column desktop. Left = text + CTAs (60%). Right = portrait photo with floating trust badges (40%). Single column on mobile, photo below text.
- **Eyebrow:** Pill-shaped tag — "Web · Mobile · N8N · Tech Support"
- **H1:** Partner-framing headline (above)
- **Lede:** One-paragraph value prop — eight years, SMB clients, USA/UK/Australia
- **Primary CTA:** "Book free consultation →" (Ink-colored solid button) — opens Calendly or scrolls to Contact
- **Secondary CTA:** "View work" (outline button) — scrolls to Portfolio
- **Trust micro-line:** Green dot + "Replies within 24 hours · USD payments · NDA-friendly"
- **Photo block:** Real portrait (not 3D canvas). Floating overlay badges: "★ 5.0 (20+ clients)" top-left and "🇺🇸 🇬🇧 🇦🇺 Trusted globally" bottom-right.
- **Stats band (full-width, below hero):** 4 columns — `35+ Projects` · `20+ Clients` · `8+ Years` · `15h/wk Saved via N8N`
- **Drop:** Three.js 3D canvas (moves to Portfolio as live demo — see §4.4)
- **Background:** Subtle linear gradient `#fff → #fef0f2` (Brand-soft).

### 4.2 Services

- **Centered header:** Eyebrow "What I build" → H2 "Four services. One developer." → sub-line "Pick one or bundle several — most clients start with web or N8N and grow from there."
- **Layout:** 2×2 grid desktop, 1-column mobile.
- **Each card contains:**
  - Icon in soft-brand-tinted rounded square (42×42)
  - H3 title
  - 1-line description
  - 3–4 tech tags (rounded pills, neutral surface)
  - "See [service] work →" link in Brand color
- **Card behavior:** Border `#eaeaea` → border `#C41E3A` + 2px lift on hover.
- **Linking:** Each card links to a filtered Portfolio view (e.g. `/work?type=web`). Filtered view is a stretch goal; v1 can scroll to Portfolio section.

### 4.3 Trust strip

- **Placement:** Between Services and Portfolio. Full-bleed band on `#fafaf8`.
- **Single row, three groups:** (1) Star rating + "5.0 / 20+ verified clients", (2) Stacked initials avatars (5 visible + "+15 more"), (3) Flag trio + "Trusted across USA, UK, Australia".
- **Initials are placeholder until clients consent to logos.** Spec note: collect consent on existing testimonial clients to upgrade initials → real names/logos in a future iteration.

### 4.4 Portfolio

- **Centered header:** Eyebrow "Selected work" → H2 "Recent projects" → sub-line "Six case studies showing real outcomes — not just screenshots."
- **Grid:** 3 columns desktop × 2 rows = 6 cards. 1 column mobile.
- **Each card:**
  - Thumbnail (16:10, gradient or screenshot — fall back to gradient if no screenshot)
  - H4 project title
  - Tech stack chips (small, neutral)
  - Outcome metric in Success green (`#22c55e`) — *"Saved 18 hrs/week"*, *"+45% conversions"*, etc.
- **One slot reserved for the relocated 3D Hero canvas** as "Interactive 3D landing — Live demo" with a "Live demo" badge (Brand-colored pill, top-right of thumbnail).
- **Each card links to a case-study detail page at `/work/<slug>`.** Case-study pages are a stretch goal; v1 can link to "View case →" anchor that opens an inline modal or external Notion/Github link.
- **Specific case studies to feature: TBD by Jesrel.** Spec assumes 6 real projects exist; if not, ship with 3 + clearly marked "more coming" for the rest.

### 4.5 Process

- **Layout:** 4-step horizontal flow on desktop (vertical on mobile).
- **Steps:**
  1. **Discovery call** — 30 min, free, no obligation
  2. **Proposal + estimate** — fixed-fee or hourly, written scope
  3. **Build** — weekly demo, async-first, Slack/Loom updates
  4. **Launch + support** — handover + optional retainer for ongoing tech support
- **Visual:** Numbered circles + connecting line. Brand color on active step.

### 4.6 About

- **Two-column:** Left = portrait + animated stats counters (`8+ years` / `35+ projects`). Right = headline + 2-paragraph story + signature/handwritten name (SVG).
- **Drop:** Brush-stroke PNG decorations (template-era).
- **CTA at end:** "Hire me →" anchor to Contact.
- **Content:** Reuse current copy as-is — it's good. Edit lightly for first-person voice consistency.

### 4.7 Testimonials

- **Layout:** Swiper carousel (already installed) showing 1 testimonial at a time on mobile, 3 on desktop. Auto-advance with pause-on-hover.
- **Card design:** White card · 5-star row · quote · client avatar + name + title/location.
- **Reuse:** Current testimonials data; refresh with the new card design (drop legacy `ja_testimonials_*` styles).

### 4.8 FAQ

- **Accordion list, 6–8 questions.** Suggested seed questions (Jesrel to refine):
  - "How fast can we start?"
  - "What's your typical project timeline?"
  - "How do you handle revisions?"
  - "Do you sign NDAs?"
  - "What payment methods do you accept?"
  - "Do you offer ongoing support after launch?"
  - "What if I only need help with N8N (not web/mobile)?"
  - "Can you work in my timezone?"
- **Pure CSS / `<details>` accordion** — no JS dependency.

### 4.9 Contact

- **Two-column:**
  - Left: short form — Name · Email · Project type (select: Web / Mobile / N8N / Tech Support / Other) · Message · Submit. Uses existing `@emailjs/browser` integration.
  - Right: "Book a call instead" panel with embedded Calendly OR a button to Calendly. Plus quick-stats: "⏱ Reply within 24 hours" · "🇺🇸 USD payments" · "📝 NDA on request".
- **Sanitization:** Continue using `src/utils/security.js` (DOMPurify wrapper) for input.

### 4.10 Footer

- Three-column: Links (Services / Work / Process / About) · Contact (email · LinkedIn · GitHub) · Legal (Privacy · Terms · `© 2026 Jesrel Agang`)
- Drop the heavy "copyright component" of the legacy theme; replace with a minimal footer.

---

## 5. Header / Navigation

- **Single responsive Header.** Merge `src/components/layout/Header.vue` and `MobileHeader.vue` into one component with a CSS-driven mobile breakpoint.
- **Layout:** Logo (left) · Nav links (center: Services · Work · Process · About) · Primary CTA "Book a call" (right).
- **Behavior:** Sticky on scroll, shrinks slightly + adds subtle bottom border at scroll Y > 40px.
- **Mobile:** Hamburger → full-screen overlay menu with the same links + CTA.

---

## 6. Design System

### 6.1 Color tokens

| Token        | Hex        | Use                                      |
|--------------|------------|------------------------------------------|
| `ink`        | `#1a1a2e`  | Body text, primary CTA bg, headings      |
| `brand`      | `#C41E3A`  | Accent, links, eyebrow chips, badges     |
| `brand-soft` | `#fef0f2`  | Hero gradient end, brand-tinted surfaces |
| `surface`    | `#fafaf8`  | Section alternating background           |
| `success`    | `#22c55e`  | Outcome metrics, status dot              |
| `muted`      | `#666`     | Supporting copy                          |
| `border`     | `#eaeaea`  | Dividers, card borders                   |
| `white`      | `#ffffff`  | Card bg, hero left half                  |

Shipped as CSS custom properties in a single `src/assets/tokens.css` file imported once in `main.js`.

### 6.2 Type scale

- **Display** — Montserrat 800 · 42px (mobile 30px) · -0.02em tracking · 1.05 leading. Hero H1.
- **H2** — Inter 800 · 30px · -0.02em · 1.15. Section titles.
- **H3** — Inter 700 · 17px · 1.3. Card titles, service names.
- **Body** — Inter 400 · 16px · 1.6. Paragraphs.
- **Small** — Inter 500 · 13px · 1.5. Captions, metadata.
- **Eyebrow** — Inter 700 · 11px · UPPERCASE · 0.1em tracking. Section pre-headings.
- **Mono** — JetBrains Mono · 11–13px. Tech tags, code-feel accents.

### 6.3 UI primitives (`src/components/ui/`)

Build these small components first; compose everything else from them.

| Component   | Purpose                                                 |
|-------------|---------------------------------------------------------|
| `BaseButton`| 3 variants: primary, secondary, ghost. Slot for icon.   |
| `BaseInput` | Text/email/textarea wrapper with consistent styling.    |
| `BaseSelect`| Dropdown for the contact-form project-type field.       |
| `BaseCard`  | Slot-based card; reused by Service, Portfolio, FAQ, Testimonial. |
| `BaseStat`  | Number + label, used in Hero stats band + About.        |
| `BaseTag`   | Pill chip — used for tech stack badges and eyebrow.     |
| `BaseSection`| `<section>` wrapper with consistent vertical padding.  |
| `BaseContainer`| `max-width:1200px; margin:0 auto; padding:0 24px;` wrapper. |

Existing `src/components/ui/Toast.vue` stays as-is (used by admin and forms).

### 6.4 Higher-level composed components

| Component       | Replaces                            |
|-----------------|-------------------------------------|
| `Hero.vue`      | `HomeComponent.vue` (3D canvas removed from hero — see PortfolioGrid) |
| `ServiceGrid.vue`| `ServiceComponent.vue`             |
| `TrustStrip.vue`| (new — between Services & Portfolio)|
| `PortfolioGrid.vue`| `PortfolioComponent.vue`; embeds `HeroCanvas.vue` (relocated, may be renamed `LiveDemo3D.vue`) as one of the 6 portfolio cards |
| `ProcessSteps.vue`| `ProcessComponent.vue`             |
| `About.vue`     | `AboutComponent.vue`                |
| `Testimonials.vue`| `TestimonialsComponent.vue`       |
| `FAQ.vue`       | `FAQComponent.vue`                  |
| `ContactForm.vue`| `ContactComponent.vue`             |
| `SiteFooter.vue`| `CopyrightComponent.vue`            |
| `SiteHeader.vue`| `Header.vue` + `MobileHeader.vue`   |

All new components follow Phase-2 naming convention (no `Component` suffix, see `CLAUDE.md`).

---

## 7. Removals

Delete from the codebase as part of this redesign:

- **Legacy CSS:** `public/css/plugins.css`, `style.css`, `dark.css`, `intro.css`, `custom.css`, `custom-fixes.css`. Remove the corresponding `<link>` tags from `index.html`.
- **wow.js:** dependency removed from `package.json`; every `data-wow-*`/`wow fadeInUp` attribute scrubbed from templates. Replace with Vue `<Transition>` or native scroll-driven CSS animations.
- **Magic cursor:** delete `src/components/layout/Cursor.vue` + `customCursor` export from `src/utils/dom-effects.js` + remove `data-magic-cursor` from `IndexView.vue`.
- **Brush PNGs:** delete `public/img/brushes/` directory. Remove `<img>` references in About + other sections.
- **Preloader:** delete `src/components/layout/PreLoader.vue` + `preloader`/`aali_tm_preloader` exports from `dom-effects.js`. Skeleton states inline where needed.
- **Dark route:** delete `src/views/IndexDarkView.vue` + remove route from `src/router/index.js`. Defer dark mode to a separate phase.
- **Legacy class prefixes:** scrub `aali_tm_*`, `ja_*`, `kura_*` from all retained components.
- **`src/svg.js`** at repo root — confirm usage; if dead, delete. (Quick grep during implementation.)

---

## 8. Migration plan

**Approach:** Incremental, section-by-section, on a `/v2` route. The live `/` keeps working untouched until the full v2 page is approved.

**Order of work** (each step a separate PR / mergeable unit):

1. **Foundation:** add `src/assets/tokens.css`, build the 8 `BaseX` UI primitives, scaffold `/v2` route with empty `IndexV2View.vue`. Ship to `/v2` behind nothing — visible to anyone who knows the URL.
2. **Hero v2 + new SiteHeader** — render on `/v2`. Verify visual + Lighthouse.
3. **ServiceGrid + TrustStrip** — verify in browser.
4. **PortfolioGrid + relocated 3D demo** — verify Three.js still works in its new home.
5. **ProcessSteps + About v2** — verify counters animate.
6. **Testimonials v2 + FAQ v2** — verify Swiper still works on the new card.
7. **ContactForm v2 + SiteFooter** — verify EmailJS submissions still work; verify rate limit + sanitization.
8. **Promote /v2 → /** — swap the route definitions so `IndexV2View.vue` becomes the `/` route; immediately remove the `/v2` route. The legacy `IndexView.vue` is deleted in this same step (no rollback path — if v2 isn't ready, don't promote).
9. **Cleanup** — delete legacy CSS files, remove dependencies (`wow.js`, `vue-js-counter` if replaced), scrub legacy class prefixes, final Lighthouse audit, ship.

Each step ends with: `npm run dev` verification + `npm run build` clean + Lighthouse spot-check + commit. The site at `/` works the entire time.

**Phase split for the implementation plan:** Steps 1–5 (foundation + Hero + Services + Trust + Portfolio + Process + About) form a coherent first plan ("Phase 2"). Steps 6–9 (Testimonials + FAQ + Contact + Footer + promotion + cleanup) form a second plan ("Phase 3"). Brainstorm-to-plan transition produces Phase 2 first; Phase 3 plan is written when Phase 2 ships.

---

## 9. Out of scope

Explicitly **not** part of this redesign:

- Admin/CRM (`src/admin/*`) — stays as-is. Future phase if wanted.
- Dark mode — drop the `/dark` route during cleanup; revisit dark mode as a system-aware feature in a future phase.
- Filtered-portfolio routes (`/work?type=web`) — stretch goal; v1 service cards can scroll to Portfolio anchor.
- Case-study detail pages (`/work/<slug>`) — stretch goal; v1 portfolio cards can open inline modal or link to external write-ups.
- Blog / writing section — not in current site, not adding it.
- Internationalization — site stays English-only.
- A/B testing infrastructure — not building this yet; rely on Lighthouse + lead-volume comparison post-launch.
- Service worker / PWA polish — keep current `/sw.js`; don't enhance.

---

## 10. Open questions (to resolve during implementation, not blocking)

1. **Final hero headline copy** — the framing is locked ("partner"); exact wording iterates with Jesrel.
2. **Which 6 portfolio projects** — Jesrel to provide titles + tech stacks + outcome metrics + thumbnail URLs.
3. **Real client logos vs initials** — depends on per-client consent; ship with initials, upgrade where consent obtained.
4. **Pricing transparency** — show starting prices on service cards or "Get a quote"? Current spec assumes the latter; revisit if conversion data later suggests otherwise.
5. **Calendly link** — Jesrel to provide URL; if no Calendly, contact form stands alone.
6. **Process step copy** — proposed 4 steps are placeholders; Jesrel to confirm or rewrite.
7. **About-section signature SVG** — Jesrel to provide handwritten name as SVG (or skip).

---

## 11. Inputs needed from Jesrel before Phase 2 of implementation

To unblock the most polished build, gather (no rush — implementation can proceed with placeholders):

- 6 portfolio project entries (title, tech, outcome, thumbnail)
- Calendly link (if any)
- LinkedIn + GitHub URLs (already in structured-data; confirm public profiles match)
- Final go on hero headline copy
- Updated "About" copy (or confirm current copy is good)
- 6–8 FAQ entries (suggestions in §4.8)
- A high-quality portrait photo for the Hero

---

## 12. References

- Current site: <https://jesrelagang.pro/>
- Direction inspiration: Resend, Linear (light marketing pages), Marc Lou's indie sites
- Design-system refs: shadcn/ui (token approach), Tailwind UI primitives (composition pattern)
- Phase 1 plan (sets the conventions this builds on): `docs/superpowers/plans/2026-05-09-phase-1-hygiene-tooling.md`
