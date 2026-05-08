<template>
  <div class="customers-page">
    <div class="page-header">
      <h2>Customer Management</h2>
      <button class="btn-primary" @click="showModal = true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add Customer
      </button>
    </div>

    <div class="table-card">
      <div v-if="loading" class="loading">Loading customers...</div>
      <div v-else-if="customers.length === 0" class="empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <p>No customers yet</p>
        <button @click="showModal = true" class="btn-primary">Add Your First Customer</button>
      </div>
      <table v-else>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Projects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>
              <div class="customer-name">
                <div class="avatar">{{ getInitials(customer.name) }}</div>
                <span>{{ customer.name }}</span>
              </div>
            </td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone || '-' }}</td>
            <td>{{ customer.company || '-' }}</td>
            <td>
              <span :class="['status-badge', customer.status]">{{ customer.status }}</span>
            </td>
            <td>{{ customer.projectsCount || 0 }}</td>
            <td>
              <div class="actions">
                <button class="action-btn edit" title="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button class="action-btn delete" title="Delete">
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

    <!-- Add Modal placeholder -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>Add Customer</h2>
          <button @click="showModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveCustomer">
          <div class="form-grid">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" v-model="formData.name" required />
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input type="email" v-model="formData.email" required />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" v-model="formData.phone" />
            </div>
            <div class="form-group">
              <label>Company</label>
              <input type="text" v-model="formData.company" />
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">Save Customer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'CustomersView',
  setup() {
    const customers = ref([]);
    const loading = ref(true);
    const showModal = ref(false);
    const formData = reactive({ name: '', email: '', phone: '', company: '' });

    const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

    const fetchCustomers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'customers'));
        customers.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error('Error fetching customers:', err);
      } finally {
        loading.value = false;
      }
    };

    const saveCustomer = async () => {
      try {
        await addDoc(collection(db, 'customers'), {
          ...formData,
          status: 'active',
          createdAt: serverTimestamp()
        });
        showModal.value = false;
        formData.name = '';
        formData.email = '';
        formData.phone = '';
        formData.company = '';
        fetchCustomers();
      } catch (err) {
        console.error('Error saving customer:', err);
      }
    };

    onMounted(fetchCustomers);

    return { customers, loading, showModal, formData, getInitials, saveCustomer };
  }
};
</script>

<style scoped>
.customers-page { display: flex; flex-direction: column; gap: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a1a2e; }
.btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #C41E3A; color: #fff; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; }
.btn-primary:hover { background: #a01830; }
.table-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); overflow: hidden; }
.loading, .empty { text-align: center; padding: 60px 20px; color: #666; }
.empty svg { margin-bottom: 16px; color: #ccc; }
.empty p { margin-bottom: 16px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #f0f0f0; }
th { background: #f9fafb; font-size: 13px; font-weight: 600; color: #666; text-transform: uppercase; }
.customer-name { display: flex; align-items: center; gap: 12px; }
.avatar { width: 36px; height: 36px; border-radius: 50%; background: #3b82f6; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
.status-badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 13px; text-transform: capitalize; }
.status-badge.active { background: #dcfce7; color: #16a34a; }
.status-badge.inactive { background: #fee2e2; color: #dc2626; }
.actions { display: flex; gap: 8px; }
.action-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 6px; cursor: pointer; background: #f3f4f6; color: #666; }
.action-btn:hover { color: #fff; }
.action-btn.edit:hover { background: #3b82f6; }
.action-btn.delete:hover { background: #ef4444; }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 500px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
.modal-header h2 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #999; }
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 24px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 14px; font-weight: 500; }
.form-group input { padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; }
.form-group input:focus { outline: none; border-color: #C41E3A; }
.modal-actions { display: flex; gap: 12px; padding: 20px 24px; border-top: 1px solid #f0f0f0; justify-content: flex-end; }
.btn-secondary { padding: 10px 20px; background: #f3f4f6; color: #666; border: none; border-radius: 8px; cursor: pointer; }
</style>
