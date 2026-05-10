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
    <section class="ja_section page-hero">
      <div class="container">
        <div class="ja_main_title" data-align="center">
          <span>Let's work together</span>
          <h3>Let's talk about your project.</h3>
          <p>The first 30 minutes are free. Pick a time that works, or send a note.</p>
        </div>
      </div>
    </section>
    <ContactComponent />
    <FAQComponent />
  </main>
</template>

<style scoped>
.page-hero { padding: 80px 0 20px; }
</style>
