<template>
  <div class="dashboard">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon leads">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ leadsStats.total }}</span>
          <span class="stat-label">Total Leads</span>
        </div>
        <div class="stat-change positive">
          <span>+{{ leadsStats.newLeads }} new</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon customers">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ customersCount }}</span>
          <span class="stat-label">Customers</span>
        </div>
        <div class="stat-change positive">
          <span>Active clients</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon projects">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ projectsCount }}</span>
          <span class="stat-label">Active Projects</span>
        </div>
        <div class="stat-change neutral">
          <span>In progress</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon revenue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">${{ formatCurrency(totalRevenue) }}</span>
          <span class="stat-label">Total Revenue</span>
        </div>
        <div class="stat-change positive">
          <span>This month</span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <h3>Lead Sources</h3>
        </div>
        <div class="chart-body">
          <canvas ref="sourceChart"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>Lead Status</h3>
        </div>
        <div class="chart-body">
          <canvas ref="statusChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="activity-section">
      <div class="activity-card">
        <div class="card-header">
          <h3>Recent Leads</h3>
          <router-link to="/admin/leads" class="view-all">View All</router-link>
        </div>
        <div class="activity-list">
          <div v-if="loading" class="loading">Loading...</div>
          <div v-else-if="recentLeads.length === 0" class="empty">No leads yet</div>
          <div v-else v-for="lead in recentLeads" :key="lead.id" class="activity-item">
            <div class="activity-avatar">
              {{ getInitials(lead.name) }}
            </div>
            <div class="activity-info">
              <span class="activity-name">{{ lead.name }}</span>
              <span class="activity-email">{{ lead.email }}</span>
            </div>
            <div class="activity-meta">
              <span :class="['status-badge', lead.status]">{{ lead.status }}</span>
              <span class="activity-time">{{ formatDate(lead.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="activity-card">
        <div class="card-header">
          <h3>Quick Actions</h3>
        </div>
        <div class="quick-actions">
          <router-link to="/admin/leads" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>Add New Lead</span>
          </router-link>
          <router-link to="/admin/invoices" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>Create Invoice</span>
          </router-link>
          <router-link to="/admin/email" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>Send Campaign</span>
          </router-link>
          <router-link to="/admin/tasks" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <span>Add Task</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useLeadsStore } from '@/stores/leads';
import Chart from 'chart.js/auto';

export default {
  name: 'DashboardView',
  setup() {
    const leadsStore = useLeadsStore();
    const sourceChart = ref(null);
    const statusChart = ref(null);
    const loading = ref(true);

    // Mock data for demo (will be replaced with real data)
    const customersCount = ref(24);
    const projectsCount = ref(8);
    const totalRevenue = ref(45000);

    const leadsStats = computed(() => leadsStore.stats);
    const recentLeads = computed(() => leadsStore.leads.slice(0, 5));

    const getInitials = (name) => {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatDate = (date) => {
      if (!date) return '';
      const d = date?.toDate ? date.toDate() : new Date(date);
      const now = new Date();
      const diff = now - d;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days === 0) return 'Today';
      if (days === 1) return 'Yesterday';
      if (days < 7) return `${days} days ago`;
      return d.toLocaleDateString();
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-US').format(value);
    };

    const initCharts = () => {
      // Source chart
      if (sourceChart.value) {
        new Chart(sourceChart.value, {
          type: 'doughnut',
          data: {
            labels: ['Website', 'Referral', 'Social Media', 'Direct'],
            datasets: [{
              data: [45, 25, 20, 10],
              backgroundColor: ['#C41E3A', '#3b82f6', '#10b981', '#f59e0b'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 16,
                  usePointStyle: true
                }
              }
            }
          }
        });
      }

      // Status chart
      if (statusChart.value) {
        new Chart(statusChart.value, {
          type: 'bar',
          data: {
            labels: ['New', 'Qualified', 'Won', 'Lost'],
            datasets: [{
              data: [
                leadsStats.value.newLeads || 0,
                leadsStats.value.qualified || 0,
                leadsStats.value.won || 0,
                leadsStats.value.lost || 0
              ],
              backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      }
    };

    onMounted(async () => {
      await leadsStore.fetchLeads();
      loading.value = false;
      initCharts();
    });

    return {
      leadsStats,
      recentLeads,
      customersCount,
      projectsCount,
      totalRevenue,
      loading,
      sourceChart,
      statusChart,
      getInitials,
      formatDate,
      formatCurrency
    };
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.stat-icon.leads { background: linear-gradient(135deg, #C41E3A, #e94560); }
.stat-icon.customers { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
.stat-icon.projects { background: linear-gradient(135deg, #10b981, #34d399); }
.stat-icon.revenue { background: linear-gradient(135deg, #f59e0b, #fbbf24); }

.stat-content {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.stat-change {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 20px;
}

.stat-change.positive {
  background: #dcfce7;
  color: #16a34a;
}

.stat-change.neutral {
  background: #f3f4f6;
  color: #6b7280;
}

/* Charts */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.chart-header {
  margin-bottom: 16px;
}

.chart-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.chart-body {
  height: 250px;
}

/* Activity */
.activity-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.activity-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.view-all {
  font-size: 14px;
  color: #C41E3A;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.loading, .empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.activity-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #C41E3A;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.activity-info {
  flex: 1;
}

.activity-name {
  display: block;
  font-weight: 500;
  color: #1a1a2e;
}

.activity-email {
  display: block;
  font-size: 13px;
  color: #666;
}

.activity-meta {
  text-align: right;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.new { background: #dbeafe; color: #1d4ed8; }
.status-badge.qualified { background: #fef3c7; color: #d97706; }
.status-badge.won { background: #dcfce7; color: #16a34a; }
.status-badge.lost { background: #fee2e2; color: #dc2626; }

.activity-time {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #f9fafb;
  border-radius: 8px;
  text-decoration: none;
  color: #1a1a2e;
  font-weight: 500;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #C41E3A;
  color: #fff;
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .activity-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
