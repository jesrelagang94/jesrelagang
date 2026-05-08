<template>
  <div class="floating-cta" :class="{ 'visible': isVisible }">
    <a
      href="https://wa.me/639150749403?text=Hi%20Jesrel!%20I'm%20interested%20in%20your%20services."
      target="_blank"
      rel="noopener"
      class="whatsapp-btn"
      aria-label="Chat on WhatsApp"
    >
      <div class="whatsapp-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>
      <div class="whatsapp-text">
        <span class="whatsapp-label">Chat with me</span>
        <span class="whatsapp-cta">WhatsApp Now</span>
      </div>
      <div class="whatsapp-pulse"></div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'FloatingCTA',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // Show after slight delay
    setTimeout(() => {
      this.handleScroll();
    }, 500);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Show after scrolling 200px
      this.isVisible = window.scrollY > 200;
    }
  }
}
</script>

<style scoped>
.floating-cta {
  position: fixed;
  bottom: -120px;
  left: 24px;
  z-index: 999;
  transition: bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.floating-cta.visible {
  bottom: 24px;
}

.whatsapp-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #C41E3A 0%, #8a1528 100%);
  color: #fff;
  text-decoration: none;
  padding: 14px 24px 14px 18px;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(196, 30, 58, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.whatsapp-btn:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 12px 40px rgba(196, 30, 58, 0.5), 0 6px 16px rgba(0, 0, 0, 0.2);
}

.whatsapp-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 2s infinite;
}

.whatsapp-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.whatsapp-icon svg {
  width: 28px;
  height: 28px;
  fill: #fff;
}

.whatsapp-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.whatsapp-label {
  font-size: 11px;
  opacity: 0.9;
  font-weight: 500;
}

.whatsapp-cta {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* Pulse animation ring */
.whatsapp-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50px;
  border: 3px solid #C41E3A;
  animation: pulse 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .floating-cta {
    left: 16px;
  }

  .floating-cta.visible {
    bottom: 16px;
  }

  .whatsapp-btn {
    padding: 12px 18px 12px 14px;
    gap: 10px;
  }

  .whatsapp-icon {
    width: 28px;
    height: 28px;
  }

  .whatsapp-icon svg {
    width: 24px;
    height: 24px;
  }

  .whatsapp-label {
    font-size: 10px;
  }

  .whatsapp-cta {
    font-size: 13px;
  }
}

/* Very small screens - icon only */
@media (max-width: 380px) {
  .whatsapp-text {
    display: none;
  }

  .whatsapp-btn {
    padding: 14px;
    border-radius: 50%;
  }

  .whatsapp-pulse {
    border-radius: 50%;
  }
}
</style>
