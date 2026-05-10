<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  dark: { type: Boolean, default: false },
});

const route = useRoute();
const mobileOpen = ref(false);

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function isActive(to) {
  return route.path === to || (to !== '/' && route.path.startsWith(to));
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value;
}

function closeMobile() {
  mobileOpen.value = false;
}
</script>

<template>
  <!-- Desktop header (hidden on mobile via existing CSS) -->
  <header class="ja_header" role="banner">
    <div class="container">
      <div class="inner">
        <router-link to="/" class="logo" aria-label="Jesrel Agang — Home">
          <img
            :src="`/img/logo/${dark ? 'dark' : 'logo'}.png`"
            :alt="dark ? 'Jesrel Agang Logo (Dark)' : 'Jesrel Agang Logo'"
          />
        </router-link>
        <nav class="menu" role="navigation" aria-label="Main navigation">
          <ul class="anchor_nav">
            <li
              v-for="link in links"
              :key="link.to"
              :class="{ current: isActive(link.to) }"
            >
              <router-link
                :to="link.to"
                :aria-current="isActive(link.to) ? 'page' : undefined"
                :aria-label="`Go to ${link.label} page`"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </nav>
        <router-link to="/contact" class="site-nav-cta" aria-label="Book a call — go to Contact">
          Book a call
        </router-link>
      </div>
    </div>
  </header>

  <!-- Mobile header (hidden on desktop via existing CSS) -->
  <div class="ja_mobile_menu">
    <div class="mobile_menu_inner">
      <div class="mobile_in">
        <router-link to="/" class="logo" aria-label="Jesrel Agang — Home">
          <img
            :src="`/img/logo/${dark ? 'dark' : 'logo'}.png`"
            :alt="dark ? 'Jesrel Agang Logo (Dark)' : 'Jesrel Agang Logo'"
          />
        </router-link>
        <button
          class="trigger"
          @click="toggleMobile"
          :aria-expanded="mobileOpen.toString()"
          aria-controls="mobile-menu-dropdown"
          aria-label="Toggle mobile navigation menu"
        >
          <div
            class="hamburger hamburger--slider"
            :class="mobileOpen ? 'is-active' : ''"
          >
            <div class="hamburger-box">
              <div class="hamburger-inner"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
    <div
      id="mobile-menu-dropdown"
      class="dropdown"
      :style="{ display: mobileOpen ? 'block' : 'none' }"
      :aria-hidden="(!mobileOpen).toString()"
      role="navigation"
      aria-label="Mobile navigation menu"
    >
      <div class="dropdown_inner">
        <nav>
          <ul class="anchor_nav">
            <li
              v-for="link in links"
              :key="link.to"
              :class="{ current: isActive(link.to) }"
            >
              <router-link
                :to="link.to"
                :aria-current="isActive(link.to) ? 'page' : undefined"
                @click="closeMobile"
              >
                {{ link.label }}
              </router-link>
            </li>
            <li>
              <router-link to="/contact" @click="closeMobile" class="mobile-cta">
                Book a call →
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: #1a1a2e;
  color: #fff !important;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  margin-left: 16px;
  transition: transform .15s ease, box-shadow .15s ease;
  box-shadow: 0 4px 12px rgba(26, 26, 46, .15);
}
.site-nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(26, 26, 46, .22);
}

/* Active-link underline (brand color), 2px, applies to desktop nav */
.ja_header .anchor_nav li.current > a {
  position: relative;
}
.ja_header .anchor_nav li.current > a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  background: #C41E3A;
}

.mobile-cta {
  display: inline-block;
  padding: 12px 18px !important;
  background: #1a1a2e;
  color: #fff !important;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 8px;
}
</style>
