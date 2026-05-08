<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <img src="/img/logo/logo.png" alt="CodersLab" class="login-logo" />
        <h1>CRM Dashboard</h1>
        <p>Sign in to manage your business</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="error" class="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          {{ error }}
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="admin@example.com"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span>Remember me</span>
          </label>
          <a href="#" @click.prevent="showForgotPassword = true" class="forgot-link">
            Forgot password?
          </a>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading" class="btn-loading">
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4m0 12v4m-8-10H2m20 0h-4m-2.93-5.66l-2.83 2.83m8.49 8.49l-2.83-2.83M6.34 6.34L3.51 3.51m8.49 14.15l-2.83 2.83"/>
            </svg>
            Signing in...
          </span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <!-- Registration disabled for security - admins are pre-configured -->
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="modal-overlay" @click.self="closeForgotPassword">
      <div class="modal">
        <button class="modal-close" @click="closeForgotPassword">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="modal-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h2>Reset Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        <form @submit.prevent="handleResetPassword">
          <div class="form-group">
            <label>Email Address</label>
            <input
              type="email"
              v-model="resetEmail"
              placeholder="Enter your email"
              required
            />
          </div>
          <div v-if="resetMessage" :class="['message', resetSuccess ? 'success' : 'error']">
            <svg v-if="resetSuccess" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {{ resetMessage }}
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeForgotPassword" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="resetLoading">
              <span v-if="resetLoading" class="btn-loading">
                <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4m0 12v4m-8-10H2m20 0h-4"/>
                </svg>
                Sending...
              </span>
              <span v-else>Send Reset Link</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const loading = ref(false);
    const error = ref('');

    // Forgot password
    const showForgotPassword = ref(false);
    const resetEmail = ref('');
    const resetLoading = ref(false);
    const resetMessage = ref('');
    const resetSuccess = ref(false);


    const handleLogin = async () => {
      loading.value = true;
      error.value = '';

      const result = await authStore.login(email.value, password.value);

      if (result.success) {
        router.push('/admin');
      } else {
        error.value = result.error;
      }

      loading.value = false;
    };

    const closeForgotPassword = () => {
      showForgotPassword.value = false;
      resetEmail.value = '';
      resetMessage.value = '';
      resetSuccess.value = false;
    };

    const handleResetPassword = async () => {
      resetLoading.value = true;
      resetMessage.value = '';

      const result = await authStore.resetPassword(resetEmail.value);

      if (result.success) {
        resetSuccess.value = true;
        resetMessage.value = 'Password reset email sent! Check your inbox.';
        setTimeout(() => {
          closeForgotPassword();
        }, 3000);
      } else {
        resetSuccess.value = false;
        resetMessage.value = result.error;
      }

      resetLoading.value = false;
    };

    return {
      email,
      password,
      rememberMe,
      loading,
      error,
      handleLogin,
      showForgotPassword,
      resetEmail,
      resetLoading,
      resetMessage,
      resetSuccess,
      handleResetPassword,
      closeForgotPassword
    };
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;
}

.login-container {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  width: auto;
  height: 50px;
  margin-bottom: 20px;
  object-fit: contain;
}

.login-header h1 {
  margin: 0 0 8px;
  font-size: 24px;
  color: #1a1a2e;
}

.login-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  background: #fff;
}

.form-group input:focus {
  outline: none;
  border-color: #C41E3A;
  box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.form-group input::placeholder {
  color: #aaa;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.remember-me input {
  accent-color: #C41E3A;
  width: 16px;
  height: 16px;
}

.forgot-link {
  font-size: 14px;
  color: #C41E3A;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-btn {
  padding: 14px;
  background: #C41E3A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover:not(:disabled) {
  background: #a01830;
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.login-footer p {
  margin: 0;
}

.login-footer a {
  color: #C41E3A;
  text-decoration: none;
  font-weight: 500;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  position: relative;
  animation: modalIn 0.2s ease-out;
}

.modal-register {
  max-width: 480px;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f5f5f5;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e0e0e0;
  color: #333;
}

.modal-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #C41E3A 0%, #e94560 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #fff;
}

.modal h2 {
  margin: 0 0 8px;
  font-size: 22px;
  color: #1a1a2e;
  text-align: center;
}

.modal > p {
  margin: 0 0 24px;
  color: #666;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn-secondary {
  flex: 1;
  padding: 12px 16px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #e5e5e5;
  color: #333;
}

.btn-primary {
  flex: 1;
  padding: 12px 16px;
  background: #C41E3A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary:hover:not(:disabled) {
  background: #a01830;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.message.success {
  background: #dcfce7;
  color: #16a34a;
}

.message.error {
  background: #fee2e2;
  color: #dc2626;
}

@media (max-width: 480px) {
  .login-container {
    padding: 24px;
  }

  .modal {
    padding: 24px;
    margin: 16px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
}
</style>
