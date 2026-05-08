<template>
  <div class="visitors-view">
    <div class="page-header">
      <h1>Visitor Analytics</h1>
      <p class="subtitle">Track who visits your portfolio and their locations</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="icon-users"></i>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.total }}</span>
          <span class="stat-label">Total Visitors</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <i class="icon-globe"></i>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.countries }}</span>
          <span class="stat-label">Countries</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="icon-clock"></i>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.today }}</span>
          <span class="stat-label">Today</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">
          <i class="icon-monitor"></i>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.uniqueDevices }}</span>
          <span class="stat-label">Device Types</span>
        </div>
      </div>
    </div>

    <!-- Visitors Table -->
    <div class="table-container">
      <div class="table-header">
        <h2>Recent Visitors</h2>
        <button @click="refreshVisitors" class="refresh-btn" :disabled="loading">
          <i :class="loading ? 'icon-spinner animate-spin' : 'icon-refresh'"></i>
          Refresh
        </button>
      </div>

      <div v-if="loading" class="loading-state">
        <i class="icon-spinner animate-spin"></i>
        <span>Loading visitors...</span>
      </div>

      <table v-else class="visitors-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>IP Address</th>
            <th>Device / Browser</th>
            <th>Page</th>
            <th>Referrer</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visitor in visitors" :key="visitor.id">
            <td class="location-cell">
              <span class="country-flag">{{ getCountryFlag(visitor.countryCode) }}</span>
              <div class="location-info">
                <span class="city">{{ visitor.city || 'Unknown' }}</span>
                <span class="country">{{ visitor.country || 'Unknown' }}</span>
              </div>
            </td>
            <td>
              <span class="ip-address">{{ visitor.ip || 'Unknown' }}</span>
              <span class="isp">{{ visitor.isp || '' }}</span>
            </td>
            <td>
              <span class="device">{{ visitor.device || 'Unknown' }}</span>
              <span class="browser">{{ visitor.browser || 'Unknown' }}</span>
            </td>
            <td class="page-cell">{{ visitor.page || '/' }}</td>
            <td class="referrer-cell">{{ formatReferrer(visitor.referrer) }}</td>
            <td class="time-cell">{{ formatDate(visitor.createdAt) }}</td>
            <td class="actions-cell">
              <a
                :href="getMapUrl(visitor)"
                target="_blank"
                class="action-btn map-btn"
                title="View on Map"
              >
                <i class="icon-location"></i>
              </a>
            </td>
          </tr>
          <tr v-if="visitors.length === 0">
            <td colspan="7" class="empty-state">
              No visitors tracked yet. Start sharing your portfolio!
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Load More -->
      <div v-if="hasMore && visitors.length > 0" class="load-more">
        <button @click="loadMore" :disabled="loadingMore">
          {{ loadingMore ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'VisitorsView',
  data() {
    return {
      visitors: [],
      loading: true,
      loadingMore: false,
      lastDoc: null,
      hasMore: true,
      pageSize: 25,
      stats: {
        total: 0,
        countries: 0,
        today: 0,
        uniqueDevices: 0
      }
    };
  },
  mounted() {
    this.loadVisitors();
  },
  methods: {
    async loadVisitors() {
      this.loading = true;
      try {
        const visitorsRef = collection(db, 'visitors');
        const q = query(visitorsRef, orderBy('createdAt', 'desc'), limit(this.pageSize));
        const snapshot = await getDocs(q);

        this.visitors = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        this.lastDoc = snapshot.docs[snapshot.docs.length - 1];
        this.hasMore = snapshot.docs.length === this.pageSize;

        this.calculateStats();
      } catch (error) {
        console.error('Error loading visitors:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadMore() {
      if (!this.lastDoc || this.loadingMore) return;

      this.loadingMore = true;
      try {
        const visitorsRef = collection(db, 'visitors');
        const q = query(
          visitorsRef,
          orderBy('createdAt', 'desc'),
          startAfter(this.lastDoc),
          limit(this.pageSize)
        );
        const snapshot = await getDocs(q);

        const newVisitors = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        this.visitors = [...this.visitors, ...newVisitors];
        this.lastDoc = snapshot.docs[snapshot.docs.length - 1];
        this.hasMore = snapshot.docs.length === this.pageSize;
      } catch (error) {
        console.error('Error loading more visitors:', error);
      } finally {
        this.loadingMore = false;
      }
    },

    async refreshVisitors() {
      this.lastDoc = null;
      this.hasMore = true;
      await this.loadVisitors();
    },

    calculateStats() {
      const countries = new Set();
      const devices = new Set();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let todayCount = 0;

      this.visitors.forEach(v => {
        if (v.country) countries.add(v.country);
        if (v.device) devices.add(v.device);
        if (v.createdAt?.toDate?.() >= today) todayCount++;
      });

      this.stats = {
        total: this.visitors.length,
        countries: countries.size,
        today: todayCount,
        uniqueDevices: devices.size
      };
    },

    getCountryFlag(countryCode) {
      if (!countryCode || countryCode.length !== 2 || countryCode === 'XX') return '';
      try {
        const code = countryCode.toUpperCase();
        return String.fromCodePoint(...code.split('').map(c => 127397 + c.charCodeAt(0)));
      } catch {
        return '';
      }
    },

    getMapUrl(visitor) {
      if (visitor.lat && visitor.lon) {
        return `https://www.google.com/maps?q=${visitor.lat},${visitor.lon}`;
      }
      return '#';
    },

    formatReferrer(referrer) {
      if (!referrer || referrer === 'Direct') return 'Direct';
      try {
        const url = new URL(referrer);
        return url.hostname;
      } catch {
        return referrer.substring(0, 30);
      }
    },

    formatDate(timestamp) {
      if (!timestamp) return 'Unknown';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diff = now - date;

      // Less than 1 minute
      if (diff < 60000) return 'Just now';
      // Less than 1 hour
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
      // Less than 24 hours
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
      // Less than 7 days
      if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.visitors-view {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.subtitle {
  color: #6b7280;
  margin: 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-icon.blue { background: #dbeafe; color: #2563eb; }
.stat-icon.green { background: #d1fae5; color: #059669; }
.stat-icon.orange { background: #fed7aa; color: #ea580c; }
.stat-icon.purple { background: #e9d5ff; color: #9333ea; }

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
}

/* Table Container */
.table-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.table-header h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: #e5e7eb;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  color: #6b7280;
}

/* Table */
.visitors-table {
  width: 100%;
  border-collapse: collapse;
}

.visitors-table th,
.visitors-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.visitors-table th {
  background: #f9fafb;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.visitors-table tbody tr:hover {
  background: #f9fafb;
}

/* Location Cell */
.location-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.country-flag {
  font-size: 24px;
}

.location-info {
  display: flex;
  flex-direction: column;
}

.city {
  font-weight: 500;
  color: #111827;
}

.country {
  font-size: 12px;
  color: #6b7280;
}

/* IP Cell */
.ip-address {
  display: block;
  font-family: monospace;
  font-size: 13px;
}

.isp {
  display: block;
  font-size: 11px;
  color: #9ca3af;
}

/* Device Cell */
.device {
  display: block;
  font-weight: 500;
}

.browser {
  display: block;
  font-size: 12px;
  color: #6b7280;
}

/* Other Cells */
.page-cell {
  font-family: monospace;
  font-size: 13px;
  color: #4b5563;
}

.referrer-cell {
  color: #6b7280;
  font-size: 13px;
}

.time-cell {
  color: #6b7280;
  font-size: 13px;
  white-space: nowrap;
}

/* Actions */
.actions-cell {
  text-align: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  transition: background 0.2s;
}

.map-btn {
  color: #2563eb;
  background: #dbeafe;
}

.map-btn:hover {
  background: #bfdbfe;
}

/* Empty State */
.empty-state {
  text-align: center;
  color: #9ca3af;
  padding: 40px !important;
}

/* Load More */
.load-more {
  padding: 16px;
  text-align: center;
  border-top: 1px solid #e5e7eb;
}

.load-more button {
  padding: 8px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.load-more button:hover:not(:disabled) {
  background: #1d4ed8;
}

.load-more button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .visitors-view {
    padding: 16px;
  }

  .visitors-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
