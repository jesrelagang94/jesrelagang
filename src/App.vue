<template>
  <PreLoader v-if="!isAdminRoute" />
  <SiteNav v-if="!isAdminRoute" />
  <router-view />
  <SiteFooter v-if="!isAdminRoute" />
  <Toast />
  <CookieConsent v-if="!isAdminRoute" @consent-given="handleConsent" />
</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import PreLoader from "./components/layout/PreLoader.vue";
import SiteNav from "./components/layout/SiteNav.vue";
import SiteFooter from "./components/layout/SiteFooter.vue";
import Toast from "./components/ui/Toast.vue";
import CookieConsent from "./components/CookieConsent.vue";
import { dataImage, portfolioHover, scroll_, stickyNav } from "./utilits";
import { trackVisitor } from "./composables/useVisitorTracker";

import WOW from "wow.js";

export default {
  name: "App",
  setup() {
    const route = useRoute();
    const isAdminRoute = computed(() => route.path.startsWith('/admin'));
    const consentGiven = ref(false);

    const handleConsent = (consent) => {
      consentGiven.value = true;
      if (consent.tracking) {
        trackVisitor();
      }
    };

    return { isAdminRoute, consentGiven, handleConsent };
  },
  data() {
    return { dark: false };
  },
  mounted() {
    if (!this.isAdminRoute) {
      window.addEventListener("scroll", stickyNav);
      window.addEventListener("scroll", scroll_);
      setTimeout(() => {
        dataImage();
        portfolioHover();
        new WOW().init();
      }, 100);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/css/accessibility.css';
      document.head.appendChild(link);
    }
  },
  components: { PreLoader, SiteNav, SiteFooter, Toast, CookieConsent },
};
</script>
