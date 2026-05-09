<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const scrolled = ref(false);
const mobileOpen = ref(false);

const onScroll = () => { scrolled.value = window.scrollY > 40; };

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
];

function closeMobile() { mobileOpen.value = false; }
</script>

<template>
  <header :class="['site-header', { 'site-header--scrolled': scrolled }]">
    <div class="site-header__inner">
      <a href="#top" class="site-header__logo" aria-label="Home">
        Jesrel <em>Agang</em>
      </a>

      <nav class="site-header__nav" aria-label="Main">
        <a v-for="link in links" :key="link.href" :href="link.href" class="site-header__link">
          {{ link.label }}
        </a>
      </nav>

      <BaseButton variant="primary" href="#contact" class="site-header__cta">
        Book a call
      </BaseButton>

      <button
        class="site-header__burger"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span /><span /><span />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="site-header__mobile">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMobile">
          {{ link.label }}
        </a>
        <BaseButton variant="primary" href="#contact" @click="closeMobile">Book a call</BaseButton>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  transition: box-shadow var(--tr-fast), border-color var(--tr-fast);
  border-bottom: 1px solid transparent;
}
.site-header--scrolled {
  border-bottom-color: var(--color-border);
}
.site-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px var(--sp-6);
  display: flex;
  align-items: center;
  gap: var(--sp-6);
}
.site-header__logo {
  font-weight: 800;
  color: var(--color-ink);
  text-decoration: none;
  letter-spacing: -0.01em;
  font-size: 17px;
}
.site-header__logo em { color: var(--color-brand); font-style: normal; }
.site-header__nav {
  display: flex;
  gap: var(--sp-6);
  margin-left: auto;
}
.site-header__link {
  color: #555;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color var(--tr-fast);
}
.site-header__link:hover { color: var(--color-ink); }
.site-header__cta { margin-left: var(--sp-3); }
.site-header__burger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
}
.site-header__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-ink);
  margin: 4px 0;
  transition: transform var(--tr-fast);
}

.site-header__mobile {
  display: none;
  padding: var(--sp-4) var(--sp-6) var(--sp-6);
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  flex-direction: column;
  gap: var(--sp-4);
}
.site-header__mobile a {
  color: var(--color-ink);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
}
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity var(--tr-fast); }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .site-header__nav, .site-header__cta { display: none; }
  .site-header__burger { display: block; }
  .site-header__mobile { display: flex; }
}
</style>
