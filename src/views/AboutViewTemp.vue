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
    <section class="ja_section page-hero">
      <div class="container">
        <div class="ja_main_title" data-align="center">
          <span>About me</span>
          <h3>A one-person boutique agency.</h3>
        </div>
      </div>
    </section>
    <AboutComponent />
    <SkillComponent />
    <CTASection
      headline="Want to work together?"
      primary-label="Book a call"
      primary-href="/contact"
      variant="default"
    />
  </main>
</template>

<style scoped>
.page-hero { padding: 80px 0 20px; }
</style>
