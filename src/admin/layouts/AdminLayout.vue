<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <router-link to="/admin" class="logo">
          <img src="/img/logo/logo.png" alt="CodersLab" />
          <span v-if="!sidebarCollapsed">CRM</span>
        </router-link>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item" exact-active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/admin/leads" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Leads</span>
          <span v-if="leadsCount" class="badge">{{ leadsCount }}</span>
        </router-link>

        <router-link to="/admin/customers" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Customers</span>
        </router-link>

        <router-link to="/admin/projects" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Projects</span>
        </router-link>

        <router-link to="/admin/tasks" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          <span>Tasks</span>
        </router-link>

        <router-link to="/admin/invoices" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
          <span>Invoices</span>
        </router-link>

        <router-link to="/admin/email" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>Email Marketing</span>
        </router-link>

        <router-link to="/admin/visitors" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span>Visitors</span>
        </router-link>

        <div class="nav-divider"></div>

        <router-link to="/admin/settings" class="nav-item" active-class="active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Settings</span>
        </router-link>

        <a href="/" class="nav-item" target="_blank">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span>View Site</span>
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="admin-main">
      <!-- Header -->
      <header class="admin-header">
        <div class="header-left">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="user-menu">
            <img :src="userAvatar" alt="User" class="user-avatar" />
            <span class="user-name">{{ userName }}</span>
            <button @click="handleLogout" class="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useLeadsStore } from '@/stores/leads';

export default {
  name: 'AdminLayout',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const leadsStore = useLeadsStore();

    const sidebarCollapsed = ref(false);

    const pageTitle = computed(() => {
      const titles = {
        '/admin': 'Dashboard',
        '/admin/leads': 'Lead Management',
        '/admin/customers': 'Customers',
        '/admin/projects': 'Projects',
        '/admin/tasks': 'Tasks',
        '/admin/invoices': 'Invoices',
        '/admin/email': 'Email Marketing',
        '/admin/visitors': 'Visitor Analytics',
        '/admin/settings': 'Settings'
      };
      return titles[route.path] || 'Dashboard';
    });

    const userName = computed(() =>
      authStore.userProfile?.name || authStore.user?.email || 'Admin'
    );

    const userAvatar = computed(() =>
      authStore.userProfile?.avatar || '/img/slider/avatar.png'
    );

    const leadsCount = computed(() => leadsStore.stats.newLeads);

    const handleLogout = async () => {
      await authStore.logout();
      router.push('/admin/login');
    };

    return {
      sidebarCollapsed,
      pageTitle,
      userName,
      userAvatar,
      leadsCount,
      handleLogout
    };
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background: #1a1a2e;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.admin-sidebar.collapsed {
  width: 70px;
}

.admin-sidebar.collapsed .sidebar-header span,
.admin-sidebar.collapsed .nav-item span,
.admin-sidebar.collapsed .badge {
  display: none;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
}

.logo img {
  width: auto;
  height: 32px;
  object-fit: contain;
}

.collapse-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.collapse-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.admin-sidebar.collapsed .collapse-btn svg {
  transform: rotate(180deg);
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #b0b0b0;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}

.nav-item.active {
  background: #C41E3A;
  color: #fff;
}

.nav-item svg {
  flex-shrink: 0;
}

.badge {
  margin-left: auto;
  background: #C41E3A;
  color: #fff;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.nav-divider {
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin: 16px 0;
}

/* Main Content */
.admin-main {
  flex: 1;
  margin-left: 260px;
  transition: margin-left 0.3s ease;
}

.admin-sidebar.collapsed ~ .admin-main {
  margin-left: 70px;
}

/* Header */
.admin-header {
  background: #fff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  position: sticky;
  top: 0;
  z-index: 50;
}

.admin-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
  color: #1a1a2e;
}

.logout-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

/* Content */
.admin-content {
  padding: 24px;
  min-height: calc(100vh - 70px);
}

/* Mobile */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 70px;
  }

  .admin-sidebar .sidebar-header span,
  .admin-sidebar .nav-item span,
  .admin-sidebar .badge {
    display: none;
  }

  .admin-main {
    margin-left: 70px;
  }

  .admin-header h1 {
    font-size: 18px;
  }

  .user-name {
    display: none;
  }
}
</style>
