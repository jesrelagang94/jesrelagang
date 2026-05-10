<script setup>
defineProps({
  headline: { type: String, required: true },
  primaryLabel: { type: String, default: 'Book a call' },
  primaryHref: { type: String, default: '/contact' },
  secondaryLabel: { type: String, default: '' },
  secondaryHref: { type: String, default: '' },
  // Visual variant: 'default' (light bg) or 'alt' (surface bg)
  variant: { type: String, default: 'alt' },
});
</script>

<template>
  <section :class="['ja_section', 'cta-section', `cta-section--${variant}`]" aria-label="Call to action">
    <div class="container">
      <div class="cta-section__inner">
        <h2 class="cta-section__headline">{{ headline }}</h2>
        <div class="cta-section__buttons">
          <router-link :to="primaryHref" class="cta-section__primary">
            {{ primaryLabel }} →
          </router-link>
          <a
            v-if="secondaryLabel"
            :href="secondaryHref"
            class="cta-section__secondary"
          >
            {{ secondaryLabel }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 80px 0;
  text-align: center;
}
.cta-section--alt { background: #fafaf8; border-top: 1px solid #eaeaea; }
.cta-section--default { background: #fff; }
.cta-section__inner {
  max-width: 720px;
  margin: 0 auto;
}
.cta-section__headline {
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 32px;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
.cta-section__buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.cta-section__primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 14px 28px;
  background: #1a1a2e;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(26, 26, 46, .18);
  transition: transform .15s ease, box-shadow .15s ease;
}
.cta-section__primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(26, 26, 46, .25);
}
.cta-section__secondary {
  color: #C41E3A;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
}
.cta-section__secondary:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .cta-section { padding: 56px 0; }
}
</style>
