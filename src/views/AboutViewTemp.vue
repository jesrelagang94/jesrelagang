<script setup>
import { useHead } from '@vueuse/head';
import AboutComponent from '@/components/AboutComponent.vue';
import SkillComponent from '@/components/SkillComponent.vue';
import CTASection from '@/components/sections/CTASection.vue';

useHead({
  title: 'About · Jesrel Agang',
  meta: [
    {
      name: 'description',
      content:
        'Independent boutique agency. Eight years, 35+ projects, USA/UK/AU clients.',
    },
    { property: 'og:url', content: 'https://jesrelagang.pro/about' },
  ],
  link: [{ rel: 'canonical', href: 'https://jesrelagang.pro/about' }],
});
</script>

<template>
  <main class="about-view-temp">
    <AboutComponent />
    <SkillComponent />
    <CTASection
      headline="Want to work together?"
      primary-label="Book a call"
      primary-href="/contact"
      variant="alt"
    />
  </main>
</template>

<style scoped>
.about-view-temp { overflow: hidden; }
</style>
