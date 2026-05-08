import { createRouter, createWebHistory } from "vue-router";
import adminRoutes, { setupAdminGuards } from '@/admin/router';

// Lazy load route components for better initial load performance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("../views/IndexView.vue"),
    },
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
  // Scroll behavior for better UX
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Setup admin route guards
setupAdminGuards(router);

export default router;
