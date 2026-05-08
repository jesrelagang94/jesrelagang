<template>
  <div class="email-page">
    <div class="page-header">
      <h2>Email Marketing</h2>
      <button class="btn-primary" @click="showModal = true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        New Campaign
      </button>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-label">Total Subscribers</span>
        <span class="stat-value">{{ subscribers.length }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Campaigns Sent</span>
        <span class="stat-value">{{ campaigns.filter(c => c.status === 'sent').length }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Avg Open Rate</span>
        <span class="stat-value">{{ avgOpenRate }}%</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Avg Click Rate</span>
        <span class="stat-value">{{ avgClickRate }}%</span>
      </div>
    </div>

    <div class="content-grid">
      <div class="campaigns-section">
        <h3>Recent Campaigns</h3>
        <div v-if="campaigns.length === 0" class="empty-state">
          <p>No campaigns yet</p>
        </div>
        <div v-else class="campaigns-list">
          <div v-for="campaign in campaigns" :key="campaign.id" class="campaign-card">
            <div class="campaign-info">
              <h4>{{ campaign.subject }}</h4>
              <p>{{ campaign.recipients || 0 }} recipients</p>
            </div>
            <div class="campaign-stats">
              <span :class="['status-badge', campaign.status]">{{ campaign.status }}</span>
              <div v-if="campaign.status === 'sent'" class="rates">
                <span>{{ campaign.openRate || 0 }}% opens</span>
                <span>{{ campaign.clickRate || 0 }}% clicks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="subscribers-section">
        <h3>Subscribers ({{ subscribers.length }})</h3>
        <div class="subscriber-list">
          <div v-for="sub in subscribers.slice(0, 10)" :key="sub.id" class="subscriber-item">
            <div class="sub-avatar">{{ sub.email?.[0]?.toUpperCase() }}</div>
            <div class="sub-info">
              <span class="sub-email">{{ sub.email }}</span>
              <span class="sub-date">Joined {{ formatDate(sub.createdAt) }}</span>
            </div>
          </div>
          <div v-if="subscribers.length === 0" class="empty-state">
            <p>No subscribers yet</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal modal-large">
        <div class="modal-header">
          <h2>Create Email Campaign</h2>
          <button @click="showModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveCampaign">
          <div class="form-body">
            <div class="form-group">
              <label>Subject Line *</label>
              <input type="text" v-model="formData.subject" required placeholder="Your email subject" />
            </div>
            <div class="form-group">
              <label>Email Content *</label>
              <textarea v-model="formData.content" rows="10" required placeholder="Write your email content here..."></textarea>
            </div>
            <div class="form-group">
              <label>Recipients</label>
              <select v-model="formData.audience">
                <option value="all">All Subscribers</option>
                <option value="leads">Leads Only</option>
                <option value="customers">Customers Only</option>
              </select>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="btn-secondary">Cancel</button>
            <button type="button" @click="saveCampaign('draft')" class="btn-secondary">Save Draft</button>
            <button type="submit" class="btn-primary">Send Campaign</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'EmailMarketingView',
  setup() {
    const campaigns = ref([]);
    const subscribers = ref([]);
    const showModal = ref(false);
    const formData = reactive({ subject: '', content: '', audience: 'all' });

    const avgOpenRate = computed(() => {
      const sent = campaigns.value.filter(c => c.status === 'sent');
      if (sent.length === 0) return 0;
      return Math.round(sent.reduce((sum, c) => sum + (c.openRate || 0), 0) / sent.length);
    });

    const avgClickRate = computed(() => {
      const sent = campaigns.value.filter(c => c.status === 'sent');
      if (sent.length === 0) return 0;
      return Math.round(sent.reduce((sum, c) => sum + (c.clickRate || 0), 0) / sent.length);
    });

    const formatDate = (date) => {
      if (!date) return '';
      const d = date?.toDate ? date.toDate() : new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const fetchData = async () => {
      try {
        const [campaignsSnap, leadsSnap] = await Promise.all([
          getDocs(collection(db, 'campaigns')),
          getDocs(collection(db, 'leads'))
        ]);
        campaigns.value = campaignsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        subscribers.value = leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error('Error:', err);
      }
    };

    const saveCampaign = async (status = 'sent') => {
      try {
        await addDoc(collection(db, 'campaigns'), {
          ...formData,
          status,
          recipients: subscribers.value.length,
          openRate: 0,
          clickRate: 0,
          createdAt: serverTimestamp()
        });
        showModal.value = false;
        Object.assign(formData, { subject: '', content: '', audience: 'all' });
        fetchData();
      } catch (err) {
        console.error('Error:', err);
      }
    };

    onMounted(fetchData);
    return { campaigns, subscribers, showModal, formData, avgOpenRate, avgClickRate, formatDate, saveCampaign };
  }
};
</script>

<style scoped>
.email-page { display: flex; flex-direction: column; gap: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a1a2e; }
.btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #C41E3A; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
.btn-primary:hover { background: #a01830; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
.stat-label { display: block; font-size: 13px; color: #666; margin-bottom: 8px; }
.stat-value { font-size: 24px; font-weight: 700; color: #1a1a2e; }
.content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.campaigns-section, .subscribers-section { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
.campaigns-section h3, .subscribers-section h3 { margin: 0 0 16px; font-size: 16px; color: #1a1a2e; }
.empty-state { text-align: center; padding: 40px; color: #666; }
.campaigns-list { display: flex; flex-direction: column; gap: 12px; }
.campaign-card { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px; }
.campaign-info h4 { margin: 0 0 4px; font-size: 14px; color: #1a1a2e; }
.campaign-info p { margin: 0; font-size: 13px; color: #666; }
.campaign-stats { text-align: right; }
.status-badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; text-transform: capitalize; margin-bottom: 4px; }
.status-badge.sent { background: #dcfce7; color: #16a34a; }
.status-badge.draft { background: #f3f4f6; color: #666; }
.rates { font-size: 12px; color: #666; }
.rates span { margin-left: 8px; }
.subscriber-list { display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; }
.subscriber-item { display: flex; align-items: center; gap: 12px; }
.sub-avatar { width: 36px; height: 36px; border-radius: 50%; background: #C41E3A; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; }
.sub-info { flex: 1; }
.sub-email { display: block; font-size: 14px; color: #1a1a2e; }
.sub-date { font-size: 12px; color: #999; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 500px; }
.modal.modal-large { max-width: 700px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
.modal-header h2 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #999; }
.form-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 14px; font-weight: 500; }
.form-group input, .form-group select, .form-group textarea { padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; font-family: inherit; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #C41E3A; }
.modal-actions { display: flex; gap: 12px; padding: 20px 24px; border-top: 1px solid #f0f0f0; justify-content: flex-end; }
.btn-secondary { padding: 10px 20px; background: #f3f4f6; color: #666; border: none; border-radius: 8px; cursor: pointer; }
@media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .content-grid { grid-template-columns: 1fr; } }
</style>
