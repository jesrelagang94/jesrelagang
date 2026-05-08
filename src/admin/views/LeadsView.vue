<template>
  <div class="leads-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <div class="stats-pills">
          <span class="pill" :class="{ active: filter === '' }" @click="filter = ''">
            All ({{ stats.total }})
          </span>
          <span class="pill" :class="{ active: filter === 'new' }" @click="filter = 'new'">
            New ({{ stats.newLeads }})
          </span>
          <span class="pill" :class="{ active: filter === 'qualified' }" @click="filter = 'qualified'">
            Qualified ({{ stats.qualified }})
          </span>
          <span class="pill" :class="{ active: filter === 'won' }" @click="filter = 'won'">
            Won ({{ stats.won }})
          </span>
          <span class="pill" :class="{ active: filter === 'lost' }" @click="filter = 'lost'">
            Lost ({{ stats.lost }})
          </span>
        </div>
      </div>
      <div class="header-right">
        <div class="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" v-model="searchQuery" placeholder="Search leads..." />
        </div>
        <button class="btn-primary" @click="showModal = true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Lead
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-card">
      <div v-if="loading" class="loading">Loading leads...</div>
      <div v-else-if="filteredLeads.length === 0" class="empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
        <p>No leads found</p>
        <button @click="showModal = true" class="btn-primary">Add Your First Lead</button>
      </div>
      <table v-else>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th>Value</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in filteredLeads" :key="lead.id">
            <td>
              <div class="lead-name">
                <div class="avatar">{{ getInitials(lead.name) }}</div>
                <div>
                  <span class="name">{{ lead.name }}</span>
                  <span class="company">{{ lead.company || '-' }}</span>
                </div>
              </div>
            </td>
            <td>{{ lead.email }}</td>
            <td>{{ lead.phone || '-' }}</td>
            <td>
              <span class="source-badge">{{ lead.source }}</span>
            </td>
            <td>
              <select :value="lead.status" @change="updateStatus(lead.id, $event.target.value)" class="status-select">
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </td>
            <td>${{ formatCurrency(lead.value || 0) }}</td>
            <td>{{ formatDate(lead.createdAt) }}</td>
            <td>
              <div class="actions">
                <button @click="editLead(lead)" class="action-btn edit" title="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button v-if="lead.status !== 'won'" @click="convertLead(lead.id)" class="action-btn convert" title="Convert to Customer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <polyline points="17 11 19 13 23 9"/>
                  </svg>
                </button>
                <button @click="confirmDelete(lead)" class="action-btn delete" title="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editingLead ? 'Edit Lead' : 'Add New Lead' }}</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveLead">
          <div class="form-grid">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" v-model="formData.name" placeholder="John Doe" required />
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input type="email" v-model="formData.email" placeholder="john@example.com" required />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" v-model="formData.phone" placeholder="+1 234 567 8900" />
            </div>
            <div class="form-group">
              <label>Company</label>
              <input type="text" v-model="formData.company" placeholder="Company Name" />
            </div>
            <div class="form-group">
              <label>Source</label>
              <select v-model="formData.source">
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="direct">Direct</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="formData.status">
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div class="form-group">
              <label>Estimated Value ($)</label>
              <input type="number" v-model.number="formData.value" placeholder="5000" min="0" />
            </div>
            <div class="form-group full-width">
              <label>Notes</label>
              <textarea v-model="formData.notes" placeholder="Additional notes..." rows="3"></textarea>
            </div>
          </div>
          <div v-if="formError" class="form-error">{{ formError }}</div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : (editingLead ? 'Update Lead' : 'Create Lead') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="showDeleteConfirm = false">
      <div class="modal modal-small">
        <h2>Delete Lead</h2>
        <p>Are you sure you want to delete "{{ leadToDelete?.name }}"? This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="showDeleteConfirm = false" class="btn-secondary">Cancel</button>
          <button @click="deleteLead" class="btn-danger" :disabled="deleting">
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from 'vue';
import { useLeadsStore } from '@/stores/leads';

export default {
  name: 'LeadsView',
  setup() {
    const leadsStore = useLeadsStore();

    const loading = ref(true);
    const searchQuery = ref('');
    const filter = ref('');
    const showModal = ref(false);
    const showDeleteConfirm = ref(false);
    const editingLead = ref(null);
    const leadToDelete = ref(null);
    const saving = ref(false);
    const deleting = ref(false);
    const formError = ref('');

    const formData = reactive({
      name: '',
      email: '',
      phone: '',
      company: '',
      source: 'website',
      status: 'new',
      value: 0,
      notes: ''
    });

    const stats = computed(() => leadsStore.stats);

    const filteredLeads = computed(() => {
      let result = leadsStore.leads;

      if (filter.value) {
        result = result.filter(l => l.status === filter.value);
      }

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(l =>
          l.name?.toLowerCase().includes(query) ||
          l.email?.toLowerCase().includes(query) ||
          l.company?.toLowerCase().includes(query)
        );
      }

      return result;
    });

    const getInitials = (name) => {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatDate = (date) => {
      if (!date) return '-';
      const d = date?.toDate ? date.toDate() : new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-US').format(value);
    };

    const resetForm = () => {
      formData.name = '';
      formData.email = '';
      formData.phone = '';
      formData.company = '';
      formData.source = 'website';
      formData.status = 'new';
      formData.value = 0;
      formData.notes = '';
      editingLead.value = null;
      formError.value = '';
    };

    const closeModal = () => {
      showModal.value = false;
      resetForm();
    };

    const editLead = (lead) => {
      editingLead.value = lead;
      formData.name = lead.name;
      formData.email = lead.email;
      formData.phone = lead.phone || '';
      formData.company = lead.company || '';
      formData.source = lead.source || 'website';
      formData.status = lead.status || 'new';
      formData.value = lead.value || 0;
      formData.notes = lead.notes || '';
      showModal.value = true;
    };

    const saveLead = async () => {
      saving.value = true;
      formError.value = '';

      try {
        const data = { ...formData };

        if (editingLead.value) {
          await leadsStore.updateLead(editingLead.value.id, data);
        } else {
          await leadsStore.createLead(data);
        }

        closeModal();
      } catch (err) {
        formError.value = err.message;
      } finally {
        saving.value = false;
      }
    };

    const updateStatus = async (id, status) => {
      await leadsStore.updateLead(id, { status });
    };

    const confirmDelete = (lead) => {
      leadToDelete.value = lead;
      showDeleteConfirm.value = true;
    };

    const deleteLead = async () => {
      if (!leadToDelete.value) return;

      deleting.value = true;
      await leadsStore.deleteLead(leadToDelete.value.id);
      showDeleteConfirm.value = false;
      leadToDelete.value = null;
      deleting.value = false;
    };

    const convertLead = async (id) => {
      if (confirm('Convert this lead to a customer?')) {
        await leadsStore.convertToCustomer(id);
      }
    };

    onMounted(async () => {
      await leadsStore.fetchLeads();
      loading.value = false;
    });

    return {
      loading,
      searchQuery,
      filter,
      stats,
      filteredLeads,
      showModal,
      showDeleteConfirm,
      editingLead,
      leadToDelete,
      saving,
      deleting,
      formError,
      formData,
      getInitials,
      formatDate,
      formatCurrency,
      closeModal,
      editLead,
      saveLead,
      updateStatus,
      confirmDelete,
      deleteLead,
      convertLead
    };
  }
};
</script>

<style scoped>
.leads-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.stats-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill {
  padding: 8px 16px;
  background: #fff;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
}

.pill:hover {
  border-color: #C41E3A;
  color: #C41E3A;
}

.pill.active {
  background: #C41E3A;
  color: #fff;
  border-color: #C41E3A;
}

.header-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.search-box input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 200px;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #C41E3A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #a01830;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Table */
.table-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.loading, .empty {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty svg {
  margin-bottom: 16px;
  color: #ccc;
}

.empty p {
  margin-bottom: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

th {
  background: #f9fafb;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.lead-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #C41E3A;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}

.lead-name .name {
  display: block;
  font-weight: 500;
  color: #1a1a2e;
}

.lead-name .company {
  display: block;
  font-size: 13px;
  color: #999;
}

.source-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 13px;
  text-transform: capitalize;
}

.status-select {
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  background: #fff;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: #f3f4f6;
  color: #666;
}

.action-btn:hover {
  color: #fff;
}

.action-btn.edit:hover { background: #3b82f6; }
.action-btn.convert:hover { background: #10b981; }
.action-btn.delete:hover { background: #ef4444; }

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal.modal-small {
  max-width: 400px;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #C41E3A;
}

.form-error {
  margin: 0 24px;
  padding: 12px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
  justify-content: flex-end;
}

.btn-secondary {
  padding: 10px 20px;
  background: #f3f4f6;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-danger {
  padding: 10px 20px;
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn-danger:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-right {
    flex-direction: column;
  }

  .search-box input {
    width: 100%;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: span 1;
  }

  .table-card {
    overflow-x: auto;
  }

  table {
    min-width: 800px;
  }
}
</style>
