import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Admin Views
import AdminLayout from '@/admin/layouts/AdminLayout.vue';
import LoginView from '@/admin/views/LoginView.vue';
import SetupView from '@/admin/views/SetupView.vue';
import DashboardView from '@/admin/views/DashboardView.vue';
import LeadsView from '@/admin/views/LeadsView.vue';
import CustomersView from '@/admin/views/CustomersView.vue';
import ProjectsView from '@/admin/views/ProjectsView.vue';
import TasksView from '@/admin/views/TasksView.vue';
import InvoicesView from '@/admin/views/InvoicesView.vue';
import EmailMarketingView from '@/admin/views/EmailMarketingView.vue';
import SettingsView from '@/admin/views/SettingsView.vue';
import VisitorsView from '@/admin/views/VisitorsView.vue';

const adminRoutes = [
  {
    path: '/admin/login',
    name: 'admin-login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/admin/setup',
    name: 'admin-setup',
    component: SetupView,
    meta: { requiresGuest: true }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: DashboardView
      },
      {
        path: 'leads',
        name: 'admin-leads',
        component: LeadsView
      },
      {
        path: 'customers',
        name: 'admin-customers',
        component: CustomersView
      },
      {
        path: 'projects',
        name: 'admin-projects',
        component: ProjectsView
      },
      {
        path: 'tasks',
        name: 'admin-tasks',
        component: TasksView
      },
      {
        path: 'invoices',
        name: 'admin-invoices',
        component: InvoicesView
      },
      {
        path: 'email',
        name: 'admin-email',
        component: EmailMarketingView
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: SettingsView
      },
      {
        path: 'visitors',
        name: 'admin-visitors',
        component: VisitorsView
      }
    ]
  }
];

export default adminRoutes;

// Navigation guard for admin routes
export const setupAdminGuards = (router) => {
  router.beforeEach(async (to, from, next) => {
    // Only apply guards to admin routes
    if (!to.path.startsWith('/admin')) {
      return next();
    }

    const authStore = useAuthStore();

    // Wait for auth to initialize (with timeout)
    if (authStore.loading) {
      await new Promise(resolve => {
        const checkAuth = setInterval(() => {
          if (!authStore.loading) {
            clearInterval(checkAuth);
            resolve();
          }
        }, 100);
        // Timeout after 3 seconds
        setTimeout(() => {
          clearInterval(checkAuth);
          resolve();
        }, 3000);
      });
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

    if (requiresAuth) {
      if (!authStore.isAuthenticated) {
        next({ name: 'admin-login' });
      } else if (!authStore.isAdmin) {
        alert('Access denied. You do not have admin privileges.');
        await authStore.logout();
        next({ name: 'admin-login' });
      } else {
        next();
      }
    } else if (requiresGuest && authStore.isAuthenticated && authStore.isAdmin) {
      next({ name: 'admin-dashboard' });
    } else {
      next();
    }
  });
};
