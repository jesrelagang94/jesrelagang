<script setup>
import ServiceIcon from '@/components/ui/ServiceIcon.vue';

defineProps({
  anchorId: { type: String, required: true },     // 'web-development', 'mobile-apps', etc.
  iconName: { type: String, required: true },     // 'web' | 'mobile' | 'n8n' | 'support'
  title: { type: String, required: true },
  paragraphs: { type: Array, required: true },    // string[]; 3 paragraphs typical
  audience: { type: String, required: true },     // 'Who it's for' content
  deliverables: { type: Array, required: true },  // string[]; 4-6 bulleted items
  techs: { type: Array, required: true },         // string[]; tech-stack chips
  exampleLabel: { type: String, default: '' },    // e.g. 'Sales pipeline SaaS'
  exampleHref: { type: String, default: '/work' },
  ctaLabel: { type: String, required: true },     // e.g. 'Start a Web project →'
  ctaHref: { type: String, default: '/contact' },
  // 'default' (text-left) or 'reverse' (text-right) for alternating layout
  layout: { type: String, default: 'default' },
});
</script>

<template>
  <article :id="anchorId" :class="['service-block', `service-block--${layout}`]">
    <div class="container">
      <div class="service-block__inner">
        <div class="service-block__visual">
          <div class="service-block__icon" aria-hidden="true">
            <ServiceIcon :name="iconName" />
          </div>
        </div>
        <div class="service-block__content">
          <h2 class="service-block__title">{{ title }}</h2>
          <div class="service-block__paras">
            <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
          </div>

          <div class="service-block__group">
            <h3 class="service-block__sub">Who it's for</h3>
            <p>{{ audience }}</p>
          </div>

          <div class="service-block__group">
            <h3 class="service-block__sub">What you get</h3>
            <ul class="service-block__deliverables">
              <li v-for="(d, i) in deliverables" :key="i">{{ d }}</li>
            </ul>
          </div>

          <div class="service-block__group">
            <h3 class="service-block__sub">Tech stack</h3>
            <div class="service-block__techs">
              <span v-for="t in techs" :key="t">{{ t }}</span>
            </div>
          </div>

          <div v-if="exampleLabel" class="service-block__example">
            <strong>Recent example:</strong>
            <router-link :to="exampleHref">{{ exampleLabel }} →</router-link>
          </div>

          <router-link :to="ctaHref" class="service-block__cta">
            {{ ctaLabel }}
          </router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.service-block {
  padding: 80px 0;
  border-bottom: 1px solid #eaeaea;
  scroll-margin-top: 80px; /* offset for sticky nav when anchor-jumping */
}
.service-block:last-child { border-bottom: none; }

.service-block__inner {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 48px;
  align-items: start;
}
.service-block--reverse .service-block__inner {
  grid-template-columns: 1.6fr 1fr;
}
.service-block--reverse .service-block__visual { order: 2; }
.service-block--reverse .service-block__content { order: 1; }

.service-block__visual {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
}
.service-block__icon {
  width: 96px;
  height: 96px;
  background: linear-gradient(135deg, #fef0f2, #fce4e8);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.service-block__icon :deep(.service-icon) {
  width: 44px;
  height: 44px;
}

.service-block__title {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 20px;
}
.service-block__paras p {
  font-size: 15px;
  color: #444;
  line-height: 1.65;
  margin: 0 0 14px;
}
.service-block__group { margin-top: 24px; }
.service-block__sub {
  font-size: 12px;
  font-weight: 700;
  color: #C41E3A;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 8px;
}
.service-block__group p {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}
.service-block__deliverables {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 16px;
}
.service-block__deliverables li {
  font-size: 14px;
  color: #444;
  position: relative;
  padding-left: 18px;
}
.service-block__deliverables li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: #22c55e;
  font-weight: 700;
}
.service-block__techs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.service-block__techs span {
  background: #f5f5f3;
  color: #444;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
}
.service-block__example {
  margin-top: 24px;
  padding: 14px 18px;
  background: #fafaf8;
  border-radius: 8px;
  font-size: 13px;
}
.service-block__example strong { color: #1a1a2e; margin-right: 6px; }
.service-block__example a { color: #C41E3A; font-weight: 600; text-decoration: none; }
.service-block__example a:hover { text-decoration: underline; }

.service-block__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  padding: 12px 22px;
  background: #1a1a2e;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
}
.service-block__cta:hover { background: #C41E3A; }

@media (max-width: 900px) {
  .service-block__inner,
  .service-block--reverse .service-block__inner { grid-template-columns: 1fr; gap: 24px; }
  .service-block--reverse .service-block__visual,
  .service-block--reverse .service-block__content { order: unset; }
  .service-block__icon { width: 72px; height: 72px; }
  .service-block__icon :deep(.service-icon) { width: 36px; height: 36px; }
  .service-block__deliverables { grid-template-columns: 1fr; }
}
</style>
