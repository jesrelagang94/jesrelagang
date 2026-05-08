<template>
  <div class="setup-page">
    <div class="setup-container">
      <div class="setup-header">
        <div class="setup-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h1>Admin Setup</h1>
        <p>Create admin accounts for the CRM Dashboard</p>
      </div>

      <div v-if="setupComplete" class="success-message">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h2>Setup Complete!</h2>
        <p>Both admin accounts have been created successfully.</p>
        <router-link to="/admin/login" class="btn-primary">Go to Login</router-link>
      </div>

      <div v-else class="setup-content">
        <div class="accounts-list">
          <div v-for="(account, index) in accounts" :key="index" class="account-item">
            <div class="account-info">
              <span class="account-email">{{ account.email }}</span>
              <span :class="['account-status', account.status]">
                {{ account.statusText }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="error" class="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          {{ error }}
        </div>

        <button @click="createAccounts" :disabled="loading" class="btn-primary btn-full">
          <span v-if="loading" class="btn-loading">
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4m0 12v4m-8-10H2m20 0h-4"/>
            </svg>
            Creating accounts...
          </span>
          <span v-else>Create Admin Accounts</span>
        </button>

        <p class="setup-note">
          <strong>Note:</strong> This will create both admin accounts with the configured password.
          Run this only once.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

export default {
  name: 'SetupView',
  setup() {
    const loading = ref(false);
    const error = ref('');
    const setupComplete = ref(false);

    const accounts = reactive([
      {
        email: 'jesrelagang94@gmail.com',
        firstName: 'Jesrel',
        lastName: 'Agang',
        status: 'pending',
        statusText: 'Pending'
      },
      {
        email: 'jessautogarage@gmail.com',
        firstName: 'Jess',
        lastName: 'Auto Garage',
        status: 'pending',
        statusText: 'Pending'
      }
    ]);

    const password = 'K99HvVCt#5';

    const createAccounts = async () => {
      loading.value = true;
      error.value = '';

      let successCount = 0;

      for (const account of accounts) {
        try {
          account.status = 'creating';
          account.statusText = 'Creating...';

          // Create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            account.email,
            password
          );

          // Create user profile in Firestore
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: account.email,
            firstName: account.firstName,
            lastName: account.lastName,
            name: `${account.firstName} ${account.lastName}`,
            role: 'admin',
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
          });

          account.status = 'success';
          account.statusText = 'Created';
          successCount++;

        } catch (err) {
          console.error(`Error creating ${account.email}:`, err);

          if (err.code === 'auth/email-already-in-use') {
            account.status = 'exists';
            account.statusText = 'Already exists';
            successCount++; // Count as success since account exists
          } else {
            account.status = 'error';
            account.statusText = err.message;
          }
        }
      }

      loading.value = false;

      if (successCount === accounts.length) {
        setupComplete.value = true;
      } else {
        error.value = 'Some accounts could not be created. Check the status above.';
      }
    };

    return {
      loading,
      error,
      setupComplete,
      accounts,
      createAccounts
    };
  }
};
</script>

<style scoped>
.setup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;
}

.setup-container {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.setup-header {
  text-align: center;
  margin-bottom: 32px;
}

.setup-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #C41E3A 0%, #e94560 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #fff;
}

.setup-header h1 {
  margin: 0 0 8px;
  font-size: 24px;
  color: #1a1a2e;
}

.setup-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.accounts-list {
  margin-bottom: 24px;
}

.account-item {
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 12px;
}

.account-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-email {
  font-weight: 500;
  color: #1a1a2e;
}

.account-status {
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 20px;
}

.account-status.pending {
  background: #f3f4f6;
  color: #666;
}

.account-status.creating {
  background: #dbeafe;
  color: #1d4ed8;
}

.account-status.success,
.account-status.exists {
  background: #dcfce7;
  color: #16a34a;
}

.account-status.error {
  background: #fee2e2;
  color: #dc2626;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: #C41E3A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary:hover:not(:disabled) {
  background: #a01830;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-full {
  width: 100%;
}

.btn-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.setup-note {
  margin-top: 20px;
  font-size: 13px;
  color: #666;
  text-align: center;
  line-height: 1.5;
}

.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-message svg {
  color: #16a34a;
  margin-bottom: 16px;
}

.success-message h2 {
  margin: 0 0 8px;
  font-size: 22px;
  color: #1a1a2e;
}

.success-message p {
  margin: 0 0 24px;
  color: #666;
}
</style>
