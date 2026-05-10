<script setup>
import { useHead } from '@vueuse/head';

import HomeComponent from '@/components/HomeComponent.vue';
import TrustStrip from '@/components/sections/TrustStrip.vue';
import ServicesPreview from '@/components/sections/ServicesPreview.vue';
import FeaturedWork from '@/components/sections/FeaturedWork.vue';
import FeaturedTestimonial from '@/components/sections/FeaturedTestimonial.vue';
import AboutMicro from '@/components/sections/AboutMicro.vue';
import CTASection from '@/components/sections/CTASection.vue';

useHead({
  title: 'Jesrel Agang — Full-stack developer for SMBs · Web, Mobile, N8N, Support',
  meta: [
    {
      name: 'description',
      content:
        'Eight years building web apps, mobile apps, N8N automations, and ongoing technical support for SMBs in the USA, UK, and Australia.',
    },
    { property: 'og:title', content: 'Jesrel Agang — Full-stack developer for SMBs' },
    {
      property: 'og:description',
      content: 'Web, Mobile, N8N, Support. Replies within 24 hours.',
    },
    { property: 'og:url', content: 'https://jesrelagang.pro/' },
  ],
  link: [{ rel: 'canonical', href: 'https://jesrelagang.pro/' }],
});
</script>

<template>
  <main class="home-view">
    <!-- 1. Hero (reuses existing HomeComponent which wraps the 3D HeroCanvas) -->
    <HomeComponent :dark="false" />

    <!-- 2. Trust strip -->
    <TrustStrip />

    <!-- 3. Services preview -->
    <ServicesPreview />

    <!-- 4. Featured work -->
    <FeaturedWork />

    <!-- 5. One testimonial -->
    <FeaturedTestimonial
      quote="Jesrel built an incredible N8N automation system for our sales team. The workflow saves us 15+ hours per week on lead management. Highly recommend!"
      name="Sarah M."
      role="Sales Director"
      location="California, USA"
      avatar-src="https://randomuser.me/api/portraits/women/44.jpg"
      variant="default"
    />

    <!-- 6. About micro -->
    <AboutMicro />

    <!-- 7. Closing CTA -->
    <CTASection
      headline="Ready to build something?"
      primary-label="Book a call"
      primary-href="/contact"
      secondary-label="Email me directly"
      secondary-href="mailto:hello@jesrelagang.pro"
      variant="alt"
    />
  </main>
</template>

<style scoped>
.home-view {
  /* Each child section sets its own padding/background; no extra here */
}
</style>
