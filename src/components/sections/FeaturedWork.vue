<script setup>
// Featured 3. Real data populated in Phase 3b when Jesrel provides project info.
const featured = [
  {
    title: 'Sales pipeline SaaS',
    techs: ['Vue 3', 'Firebase'],
    metric: 'Cut manual data entry 80%',
    thumbBg: 'linear-gradient(135deg,#1a1a2e,#3d0d1a)',
  },
  {
    title: 'Lead-to-CRM automation',
    techs: ['N8N', 'HubSpot'],
    metric: 'Saved 18 hrs/week',
    thumbBg: 'linear-gradient(135deg,#252a44,#5d2c66)',
  },
  {
    title: 'Salon booking app',
    techs: ['React Native', 'Stripe'],
    metric: '2,000+ bookings/mo',
    thumbBg: 'linear-gradient(135deg,#0d2434,#185a8e)',
  },
];
</script>

<template>
  <section class="ja_section featured-work" id="featured-work">
    <div class="container">
      <div class="ja_main_title" data-align="center">
        <span>Selected work</span>
        <h3>Recent projects</h3>
        <p>Three of the most representative pieces — full portfolio on the Work page.</p>
      </div>

      <div class="featured-work__grid">
        <router-link
          v-for="p in featured"
          :key="p.title"
          to="/work"
          class="featured-work__card"
        >
          <div class="featured-work__thumb" :style="{ background: p.thumbBg }">
            <span class="featured-work__thumb-label">{{ p.title }}</span>
          </div>
          <div class="featured-work__body">
            <h4 class="featured-work__title">{{ p.title }}</h4>
            <div class="featured-work__techs">
              <span v-for="t in p.techs" :key="t">{{ t }}</span>
            </div>
            <div class="featured-work__metric">{{ p.metric }}</div>
          </div>
        </router-link>
      </div>

      <div class="featured-work__footer">
        <router-link to="/work" class="featured-work__all">
          View all work →
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-work { padding: 80px 0; background: #fafaf8; }
.featured-work__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}
.featured-work__card {
  display: block;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform .15s ease, box-shadow .15s ease;
}
.featured-work__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, .1);
}
.featured-work__thumb {
  aspect-ratio: 16 / 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, .5);
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.featured-work__body { padding: 18px 20px 20px; }
.featured-work__title {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
}
.featured-work__techs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.featured-work__techs span {
  background: #f5f5f3;
  color: #555;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}
.featured-work__metric {
  font-size: 13px;
  color: #22c55e;
  font-weight: 600;
}
.featured-work__footer {
  margin-top: 32px;
  text-align: center;
}
.featured-work__all {
  font-size: 14px;
  color: #C41E3A;
  font-weight: 700;
  text-decoration: none;
}
.featured-work__all:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .featured-work__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .featured-work__grid { grid-template-columns: 1fr; }
}
</style>
