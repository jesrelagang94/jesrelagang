import { createRouter, createWebHistory } from "vue-router";
import adminRoutes, { setupAdminGuards } from '@/admin/router';

// Lazy load route components for better initial load performance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/services",
      name: "Services",
      component: () => import("../views/ServicesView.vue"),
    },
    {
      path: "/work",
      name: "Work",
      component: () => import("../views/WorkViewTemp.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/AboutViewTemp.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("../views/ContactViewTemp.vue"),
    },
    // Phase 3a keeps /dark untouched — retired in Phase 3b
    {
      path: "/dark",
      name: "IndexDarkView",
      component: () => import("../views/IndexDarkView.vue"),
    },
    // Admin routes
    ...adminRoutes,
    // 404 Not Found - must be last
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
  // Scroll behavior: honor hash anchors (e.g., /services#mobile-apps), savedPosition for back/forward
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        top: 80, // offset for sticky nav
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

// Setup admin route guards
setupAdminGuards(router);

export default router;
