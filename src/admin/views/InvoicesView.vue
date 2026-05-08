<template>
  <div class="invoices-page">
    <div class="page-header">
      <h2>Invoices</h2>
      <button class="btn-primary" @click="showModal = true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Create Invoice
      </button>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-label">Total Invoiced</span>
        <span class="stat-value">${{ totalAmount.toLocaleString() }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Paid</span>
        <span class="stat-value success">${{ paidAmount.toLocaleString() }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Pending</span>
        <span class="stat-value warning">${{ pendingAmount.toLocaleString() }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Overdue</span>
        <span class="stat-value danger">${{ overdueAmount.toLocaleString() }}</span>
      </div>
    </div>

    <div class="table-card">
      <div v-if="loading" class="loading">Loading invoices...</div>
      <div v-else-if="invoices.length === 0" class="empty">
        <p>No invoices yet</p>
        <button @click="showModal = true" class="btn-primary">Create Your First Invoice</button>
      </div>
      <table v-else>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td><strong>{{ invoice.number }}</strong></td>
            <td>{{ invoice.client }}</td>
            <td>${{ invoice.amount?.toLocaleString() }}</td>
            <td><span :class="['status-badge', invoice.status]">{{ invoice.status }}</span></td>
            <td>{{ formatDate(invoice.dueDate) }}</td>
            <td>
              <div class="actions">
                <button class="action-btn view" title="View"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                <button @click="markAsPaid(invoice)" v-if="invoice.status !== 'paid'" class="action-btn paid" title="Mark Paid"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></button>
                <button class="action-btn delete" title="Delete"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>Create Invoice</h2>
          <button @click="showModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveInvoice">
          <div class="form-body">
            <div class="form-row">
              <div class="form-group">
                <label>Invoice Number *</label>
                <input type="text" v-model="formData.number" required placeholder="INV-001" />
              </div>
              <div class="form-group">
                <label>Client *</label>
                <input type="text" v-model="formData.client" required placeholder="Client Name" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Amount ($) *</label>
                <input type="number" v-model.number="formData.amount" required min="0" />
              </div>
              <div class="form-group">
                <label>Due Date *</label>
                <input type="date" v-model="formData.dueDate" required />
              </div>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="formData.description" rows="3" placeholder="Invoice details..."></textarea>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'InvoicesView',
  setup() {
    const invoices = ref([]);
    const loading = ref(true);
    const showModal = ref(false);
    const formData = reactive({ number: '', client: '', amount: 0, dueDate: '', description: '' });

    const totalAmount = computed(() => invoices.value.reduce((sum, i) => sum + (i.amount || 0), 0));
    const paidAmount = computed(() => invoices.value.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.amount || 0), 0));
    const pendingAmount = computed(() => invoices.value.filter(i => i.status === 'pending').reduce((sum, i) => sum + (i.amount || 0), 0));
    const overdueAmount = computed(() => invoices.value.filter(i => i.status === 'overdue').reduce((sum, i) => sum + (i.amount || 0), 0));

    const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-';

    const fetchInvoices = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'invoices'));
        invoices.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error('Error:', err);
      } finally {
        loading.value = false;
      }
    };

    const saveInvoice = async () => {
      try {
        await addDoc(collection(db, 'invoices'), { ...formData, status: 'pending', createdAt: serverTimestamp() });
        showModal.value = false;
        Object.assign(formData, { number: '', client: '', amount: 0, dueDate: '', description: '' });
        fetchInvoices();
      } catch (err) {
        console.error('Error:', err);
      }
    };

    const markAsPaid = async (invoice) => {
      try {
        await updateDoc(doc(db, 'invoices', invoice.id), { status: 'paid', paidAt: serverTimestamp() });
        fetchInvoices();
      } catch (err) {
        console.error('Error:', err);
      }
    };

    onMounted(fetchInvoices);
    return { invoices, loading, showModal, formData, totalAmount, paidAmount, pendingAmount, overdueAmount, formatDate, saveInvoice, markAsPaid };
  }
};
</script>

<style scoped>
.invoices-page { display: flex; flex-direction: column; gap: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a1a2e; }
.btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #C41E3A; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
.btn-primary:hover { background: #a01830; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
.stat-label { display: block; font-size: 13px; color: #666; margin-bottom: 8px; }
.stat-value { font-size: 24px; font-weight: 700; color: #1a1a2e; }
.stat-value.success { color: #10b981; }
.stat-value.warning { color: #f59e0b; }
.stat-value.danger { color: #ef4444; }
.table-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); overflow: hidden; }
.loading, .empty { text-align: center; padding: 60px 20px; color: #666; }
.empty p { margin-bottom: 16px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #f0f0f0; }
th { background: #f9fafb; font-size: 13px; font-weight: 600; color: #666; text-transform: uppercase; }
.status-badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 13px; text-transform: capitalize; }
.status-badge.pending { background: #fef3c7; color: #d97706; }
.status-badge.paid { background: #dcfce7; color: #16a34a; }
.status-badge.overdue { background: #fee2e2; color: #dc2626; }
.actions { display: flex; gap: 8px; }
.action-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 6px; cursor: pointer; background: #f3f4f6; color: #666; }
.action-btn:hover { color: #fff; }
.action-btn.view:hover { background: #3b82f6; }
.action-btn.paid:hover { background: #10b981; }
.action-btn.delete:hover { background: #ef4444; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 500px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
.modal-header h2 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #999; }
.form-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 14px; font-weight: 500; }
.form-group input, .form-group textarea { padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: #C41E3A; }
.modal-actions { display: flex; gap: 12px; padding: 20px 24px; border-top: 1px solid #f0f0f0; justify-content: flex-end; }
.btn-secondary { padding: 10px 20px; background: #f3f4f6; color: #666; border: none; border-radius: 8px; cursor: pointer; }
@media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .form-row { grid-template-columns: 1fr; } }
</style>
