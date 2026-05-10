<script setup>
import { useHead } from '@vueuse/head';
import ContactComponent from '@/components/ContactComponent.vue';
import FAQComponent from '@/components/FAQComponent.vue';

useHead({
  title: 'Contact · Jesrel Agang',
  meta: [
    {
      name: 'description',
      content: 'Book a free 30-minute discovery call. Reply within 24 hours.',
    },
    { property: 'og:url', content: 'https://jesrelagang.pro/contact' },
  ],
  link: [{ rel: 'canonical', href: 'https://jesrelagang.pro/contact' }],
});
</script>

<template>
  <main class="contact-view-temp">
    <ContactComponent />
    <FAQComponent />
  </main>
</template>

<style scoped>
.contact-view-temp { overflow: hidden; }
</style>
