import "./assets/tokens.css";
import "./assets/main.css";
import "swiper/css";

import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(pinia);
app.use(router);

// Mount app immediately
app.mount("#app");

// Initialize auth in background
import { useAuthStore } from "./stores/auth";
const authStore = useAuthStore();
authStore.initAuth();

// Register Service Worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available, notify user
              console.log('New content available, please refresh.');
            }
          });
        });
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}
