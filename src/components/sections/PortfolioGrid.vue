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
