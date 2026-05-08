<template>
  <!-- Cookie Consent Banner -->
  <div
    v-if="showBanner"
    class="cookie-consent"
    role="dialog"
    aria-labelledby="cookie-title"
    aria-describedby="cookie-description"
    :style="bannerStyles"
  >
      <div class="cookie-content">
        <div class="cookie-text">
          <h3 id="cookie-title">Privacy & Cookies</h3>
          <p id="cookie-description">
            This website uses cookies and similar technologies to enhance your experience,
            analyze traffic, and for security purposes.
            <a href="#" @click.prevent="showDetails = true" class="cookie-link">Learn more</a>
          </p>
        </div>
        <div class="cookie-actions">
          <button @click="rejectAll" class="btn-reject" type="button">
            Reject All
          </button>
          <button @click="acceptNecessary" class="btn-necessary" type="button">
            Necessary Only
          </button>
          <button @click="acceptAll" class="btn-accept" type="button">
            Accept All
          </button>
        </div>
      </div>

      <!-- Details Modal -->
      <Transition name="fade">
        <div v-if="showDetails" class="cookie-modal-overlay" @click.self="showDetails = false">
          <div class="cookie-modal" role="dialog" aria-modal="true">
            <button @click="showDetails = false" class="modal-close" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <h2>Cookie Preferences</h2>
            <p class="modal-subtitle">Manage how we use cookies and your data</p>

            <div class="cookie-categories">
              <div class="cookie-category">
                <div class="category-header">
                  <div class="category-info">
                    <h4>Necessary Cookies</h4>
                    <p>Essential for the website to function. Cannot be disabled.</p>
                  </div>
                  <span class="always-on">Always On</span>
                </div>
              </div>

              <div class="cookie-category">
                <div class="category-header">
                  <div class="category-info">
                    <h4>Analytics Cookies</h4>
                    <p>Help us understand how visitors interact with our website.</p>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" v-model="preferences.analytics" />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>

              <div class="cookie-category">
                <div class="category-header">
                  <div class="category-info">
                    <h4>Visitor Tracking</h4>
                    <p>Collects anonymous visitor data including approximate location.</p>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" v-model="preferences.tracking" />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div class="modal-actions">
              <button @click="savePreferences" class="btn-save" type="button">
                Save Preferences
              </button>
            </div>

            <p class="privacy-link">
              Read our full <a href="/privacy-policy" target="_blank">Privacy Policy</a>
            </p>
          </div>
        </div>
      </Transition>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';

const CONSENT_KEY = 'cookie_consent';
const CONSENT_VERSION = '1.0';

// Inline styles to guarantee visibility (backup for CSS)
const BANNER_INLINE_STYLES = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  background: '#1e1e32',
  color: '#fff',
  padding: '20px',
  zIndex: '999999',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.4)',
  borderTop: '3px solid #C41E3A',
  display: 'block'
};

export default {
  name: 'CookieConsent',
  emits: ['consent-given'],
  setup(props, { emit }) {
    const showBanner = ref(false);
    const showDetails = ref(false);
    const preferences = reactive({
      necessary: true, // Always true
      analytics: false,
      tracking: false
    });

    // Check if consent was already given
    const checkExistingConsent = () => {
      try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          // Check if consent version matches
          if (data.version === CONSENT_VERSION) {
            preferences.analytics = data.analytics || false;
            preferences.tracking = data.tracking || false;
            emit('consent-given', data);
            return true;
          }
        }
      } catch (e) {
        console.debug('Could not read consent:', e);
      }
      return false;
    };

    // Save consent to localStorage
    const saveConsent = (consentData) => {
      const data = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        necessary: true,
        ...consentData
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
      showBanner.value = false;
      showDetails.value = false;
      emit('consent-given', data);
    };

    // Accept all cookies
    const acceptAll = () => {
      saveConsent({
        analytics: true,
        tracking: true
      });
    };

    // Accept only necessary cookies
    const acceptNecessary = () => {
      saveConsent({
        analytics: false,
        tracking: false
      });
    };

    // Reject all optional cookies
    const rejectAll = () => {
      saveConsent({
        analytics: false,
        tracking: false
      });
    };

    // Save custom preferences
    const savePreferences = () => {
      saveConsent({
        analytics: preferences.analytics,
        tracking: preferences.tracking
      });
    };

    onMounted(() => {
      // Debug: Check what's in localStorage
      const existingConsent = localStorage.getItem(CONSENT_KEY);
      console.log('[CookieConsent] Existing consent:', existingConsent);

      // Show banner if no valid consent exists
      if (!checkExistingConsent()) {
        console.log('[CookieConsent] No valid consent found, showing banner in 1.5s');
        // Small delay for better UX
        setTimeout(() => {
          showBanner.value = true;
          console.log('[CookieConsent] Banner shown');
        }, 1500);
      } else {
        console.log('[CookieConsent] Valid consent exists, banner hidden');
      }
    });

    // Computed inline styles
    const bannerStyles = computed(() => BANNER_INLINE_STYLES);

    return {
      showBanner,
      showDetails,
      preferences,
      acceptAll,
      acceptNecessary,
      rejectAll,
      savePreferences,
      bannerStyles
    };
  }
};
</script>

<style>
/* Not scoped - ensures z-index works globally */
.cookie-consent {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: #1e1e32 !important;
  color: #fff !important;
  padding: 20px !important;
  z-index: 999999 !important;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4) !important;
  border-top: 3px solid #C41E3A !important;
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cookie-text {
  flex: 1;
  min-width: 280px;
}

.cookie-text h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.cookie-text p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #e0e0e0;
}

.cookie-link {
  color: #ff4d6a;
  text-decoration: underline;
  font-weight: 500;
}

.cookie-link:hover {
  color: #ff7089;
}

.cookie-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.cookie-actions button {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-reject {
  background: transparent;
  color: #b0b0c0;
  border: 1px solid #444 !important;
}

.btn-reject:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.btn-necessary {
  background: #333;
  color: #fff;
}

.btn-necessary:hover {
  background: #444;
}

.btn-accept {
  background: #C41E3A;
  color: #fff;
}

.btn-accept:hover {
  background: #a01830;
}

/* Modal */
.cookie-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.cookie-modal {
  background: #fff;
  color: #333;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
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
}

.modal-close:hover {
  background: #e5e5e5;
}

.cookie-modal h2 {
  margin: 0 0 8px;
  font-size: 22px;
}

.modal-subtitle {
  margin: 0 0 24px;
  color: #666;
  font-size: 14px;
}

.cookie-categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.cookie-category {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.category-info h4 {
  margin: 0 0 4px;
  font-size: 15px;
}

.category-info p {
  margin: 0;
  font-size: 13px;
  color: #666;
}

.always-on {
  background: #e5e5e5;
  color: #666;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  flex-shrink: 0;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 26px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #C41E3A;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.btn-save {
  background: #C41E3A;
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.btn-save:hover {
  background: #a01830;
}

.privacy-link {
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #666;
}

.privacy-link a {
  color: #C41E3A;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .cookie-content {
    flex-direction: column;
    text-align: center;
  }

  .cookie-actions {
    width: 100%;
    justify-content: center;
  }

  .cookie-actions button {
    flex: 1;
    min-width: 80px;
  }

  .cookie-modal {
    padding: 24px;
  }

  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
