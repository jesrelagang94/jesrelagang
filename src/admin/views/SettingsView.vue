<template>
  <div class="settings-page">
    <div class="settings-grid">
      <div class="settings-nav">
        <button v-for="tab in tabs" :key="tab.id" :class="['nav-btn', { active: activeTab === tab.id }]" @click="activeTab = tab.id">
          <component :is="tab.icon" />
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <div class="settings-content">
        <!-- Profile Settings -->
        <div v-if="activeTab === 'profile'" class="settings-section">
          <h2>Profile Settings</h2>
          <form @submit.prevent="saveProfile">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" v-model="profile.name" placeholder="Your name" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="profile.email" disabled />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" v-model="profile.phone" placeholder="+1 234 567 8900" />
            </div>
            <div class="form-group">
              <label>Company</label>
              <input type="text" v-model="profile.company" placeholder="Your company" />
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Business Settings -->
        <div v-if="activeTab === 'business'" class="settings-section">
          <h2>Business Settings</h2>
          <form @submit.prevent="saveBusiness">
            <div class="form-group">
              <label>Business Name</label>
              <input type="text" v-model="business.name" placeholder="Your business name" />
            </div>
            <div class="form-group">
              <label>Website</label>
              <input type="url" v-model="business.website" placeholder="https://yourwebsite.com" />
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea v-model="business.address" rows="2" placeholder="Business address"></textarea>
            </div>
            <div class="form-group">
              <label>Default Currency</label>
              <select v-model="business.currency">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PHP">PHP (₱)</option>
              </select>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeTab === 'notifications'" class="settings-section">
          <h2>Notification Settings</h2>
          <div class="toggle-list">
            <div class="toggle-item">
              <div class="toggle-info">
                <span class="toggle-label">Email Notifications</span>
                <span class="toggle-desc">Receive email alerts for new leads</span>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="notifications.email" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div class="toggle-info">
                <span class="toggle-label">New Lead Alerts</span>
                <span class="toggle-desc">Get notified when new leads come in</span>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="notifications.newLeads" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div class="toggle-info">
                <span class="toggle-label">Invoice Reminders</span>
                <span class="toggle-desc">Reminders for overdue invoices</span>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="notifications.invoices" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div class="toggle-info">
                <span class="toggle-label">Weekly Reports</span>
                <span class="toggle-desc">Receive weekly summary reports</span>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="notifications.reports" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
          <button @click="saveNotifications" class="btn-primary">Save Changes</button>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="settings-section">
          <h2>Security Settings</h2>
          <form @submit.prevent="changePassword">
            <div class="form-group">
              <label>Current Password</label>
              <input type="password" v-model="security.currentPassword" />
            </div>
            <div class="form-group">
              <label>New Password</label>
              <input type="password" v-model="security.newPassword" minlength="6" />
            </div>
            <div class="form-group">
              <label>Confirm New Password</label>
              <input type="password" v-model="security.confirmPassword" />
            </div>
            <button type="submit" class="btn-primary">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'SettingsView',
  setup() {
    const authStore = useAuthStore();
    const activeTab = ref('profile');

    const tabs = [
      { id: 'profile', label: 'Profile', icon: 'UserIcon' },
      { id: 'business', label: 'Business', icon: 'BriefcaseIcon' },
      { id: 'notifications', label: 'Notifications', icon: 'BellIcon' },
      { id: 'security', label: 'Security', icon: 'ShieldIcon' }
    ];

    const profile = reactive({
      name: '',
      email: '',
      phone: '',
      company: ''
    });

    const business = reactive({
      name: '',
      website: '',
      address: '',
      currency: 'USD'
    });

    const notifications = reactive({
      email: true,
      newLeads: true,
      invoices: true,
      reports: false
    });

    const security = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    onMounted(() => {
      if (authStore.userProfile) {
        profile.name = authStore.userProfile.name || '';
        profile.email = authStore.user?.email || '';
        profile.phone = authStore.userProfile.phone || '';
        profile.company = authStore.userProfile.company || '';
      }
    });

    const saveProfile = () => {
      console.log('Saving profile:', profile);
      alert('Profile saved successfully!');
    };

    const saveBusiness = () => {
      console.log('Saving business:', business);
      alert('Business settings saved!');
    };

    const saveNotifications = () => {
      console.log('Saving notifications:', notifications);
      alert('Notification settings saved!');
    };

    const changePassword = () => {
      if (security.newPassword !== security.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Changing password');
      alert('Password updated successfully!');
      security.currentPassword = '';
      security.newPassword = '';
      security.confirmPassword = '';
    };

    return { activeTab, tabs, profile, business, notifications, security, saveProfile, saveBusiness, saveNotifications, changePassword };
  }
};
</script>

<style scoped>
.settings-page { max-width: 1000px; }
.settings-grid { display: grid; grid-template-columns: 240px 1fr; gap: 24px; }
.settings-nav { background: #fff; border-radius: 12px; padding: 16px; height: fit-content; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
.nav-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 16px; background: none; border: none; border-radius: 8px; font-size: 14px; color: #666; cursor: pointer; transition: all 0.2s; text-align: left; }
.nav-btn:hover { background: #f5f5f5; color: #1a1a2e; }
.nav-btn.active { background: #C41E3A; color: #fff; }
.settings-content { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
.settings-section h2 { margin: 0 0 24px; font-size: 20px; color: #1a1a2e; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #C41E3A; }
.form-group input:disabled { background: #f5f5f5; cursor: not-allowed; }
.btn-primary { padding: 12px 24px; background: #C41E3A; color: #fff; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; }
.btn-primary:hover { background: #a01830; }
.toggle-list { margin-bottom: 24px; }
.toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f0f0f0; }
.toggle-item:last-child { border-bottom: none; }
.toggle-label { display: block; font-weight: 500; color: #1a1a2e; }
.toggle-desc { display: block; font-size: 13px; color: #666; margin-top: 2px; }
.toggle { position: relative; display: inline-block; width: 48px; height: 26px; }
.toggle input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; inset: 0; background: #e5e7eb; border-radius: 26px; transition: 0.3s; }
.slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: 0.3s; }
.toggle input:checked + .slider { background: #C41E3A; }
.toggle input:checked + .slider:before { transform: translateX(22px); }
@media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } .settings-nav { display: flex; overflow-x: auto; gap: 8px; } .nav-btn { white-space: nowrap; } }
</style>
