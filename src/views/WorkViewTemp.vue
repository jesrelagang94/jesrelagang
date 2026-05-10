<script setup>
import { useHead } from '@vueuse/head';
import PortfolioComponent from '@/components/PortfolioComponent.vue';
import CTASection from '@/components/sections/CTASection.vue';

useHead({
  title: 'Work · Jesrel Agang',
  meta: [
    {
      name: 'description',
      content: 'Recent projects: SaaS dashboards, mobile apps, N8N automations, and more.',
    },
    { property: 'og:url', content: 'https://jesrelagang.pro/work' },
  ],
  link: [{ rel: 'canonical', href: 'https://jesrelagang.pro/work' }],
});
</script>

<template>
  <main class="work-view-temp">
    <PortfolioComponent />
    <CTASection
      headline="Like what you see? Let's build something."
      primary-label="Book a call"
      primary-href="/contact"
      variant="alt"
    />
  </main>
</template>

<style scoped>
.work-view-temp { overflow: hidden; }
</style>
