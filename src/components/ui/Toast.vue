<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container" aria-live="polite">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
        role="alert"
      >
        <div class="toast-icon" aria-hidden="true">
          <i :class="getIcon(toast.type)"></i>
        </div>
        <div class="toast-content">
          <p class="toast-message">{{ toast.message }}</p>
        </div>
        <button
          class="toast-close"
          @click="removeToast(toast.id)"
          aria-label="Close notification"
        >
          <i class="icon-cancel"></i>
        </button>
        <div
          class="toast-progress"
          :style="{ animationDuration: `${toast.duration}ms` }"
        ></div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

// Toast state - shared across components
const toasts = ref([]);
let toastId = 0;

// Toast API
export const useToast = () => {
  const show = (message, type = 'info', duration = 5000) => {
    const id = ++toastId;
    toasts.value.push({ id, message, type, duration });

    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  };

  const success = (message, duration) => show(message, 'success', duration);
  const error = (message, duration) => show(message, 'error', duration);
  const warning = (message, duration) => show(message, 'warning', duration);
  const info = (message, duration) => show(message, 'info', duration);

  return { show, success, error, warning, info };
};

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

export default {
  name: 'Toast',
  setup() {
    const getIcon = (type) => {
      const icons = {
        success: 'icon-check',
        error: 'icon-cancel',
        warning: 'icon-attention',
        info: 'icon-info-circled'
      };
      return icons[type] || icons.info;
    };

    return {
      toasts,
      removeToast,
      getIcon
    };
  }
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  width: calc(100% - 40px);
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.toast-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-icon i {
  font-size: 14px;
  color: #fff;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-message {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  word-wrap: break-word;
}

.toast-close {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
  flex-shrink: 0;
}

.toast-close:hover {
  color: #333;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  animation: progress linear forwards;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

/* Toast Types */
.toast-success .toast-icon {
  background: #10b981;
}
.toast-success .toast-progress {
  background: #10b981;
}

.toast-error .toast-icon {
  background: #C41E3A;
}
.toast-error .toast-progress {
  background: #C41E3A;
}

.toast-warning .toast-icon {
  background: #f59e0b;
}
.toast-warning .toast-progress {
  background: #f59e0b;
}

.toast-info .toast-icon {
  background: #3b82f6;
}
.toast-info .toast-progress {
  background: #3b82f6;
}

/* Animations */
.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* Dark mode */
.dark .toast {
  background: #1a1a2e;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.dark .toast-message {
  color: #e0e0e0;
}

.dark .toast-close {
  color: #666;
}

.dark .toast-close:hover {
  color: #e0e0e0;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .toast-container {
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
    width: auto;
    max-width: none;
  }
}
</style>
