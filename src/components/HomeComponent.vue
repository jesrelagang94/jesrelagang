<template>
  <section class="ja_section" id="home">
    <div class="ja_hero ja_hero--3d">
      <!-- 3D Canvas Container (full screen, like ajala) -->
      <HeroCanvas :dark="dark" />

      <!-- Hero Content Overlay (like ajala) -->
      <div class="hero-overlay">
        <div class="hero-content">
          <div class="hero-text">
            <p class="hero-subtitle">N8N Automation Expert | Web & Mobile Developer | VA Services</p>
            <h1 class="hero-title">
              Hello, I'm<br>
              <span class="orangeText">Jesrel Agang</span>
            </h1>
            <p class="hero-description">
              Serving US businesses with N8N workflow automation, full-stack web development, mobile apps, and dedicated VA support. Competitive rates, US timezone overlap, 8+ years experience.
            </p>
            <div class="hero-buttons">
              <a class="anchor btn-primary" href="#contact" @click="trackCTA('hero_free_consultation')">
                Get Free Consultation
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a class="anchor btn-secondary" href="#portfolio" @click="trackCTA('hero_view_portfolio')">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                View Portfolio
              </a>
            </div>
            <p class="hero-trust">
              <span class="trust-badge">&#9733; 5.0 Rating</span>
              <span class="trust-text">Trusted by US businesses | Reply within 24 hours</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <a class="anchor" href="#process" aria-label="Scroll down to see my work process">
          <svg class="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </a>
      </div>

    </div>
  </section>
</template>

<script>
import HeroCanvas from "./HeroCanvas.vue";

export default {
  name: "HomeComponent",
  components: {
    HeroCanvas
  },
  props: {
    dark: { type: Boolean },
  },
  methods: {
    trackCTA(ctaName) {
      if (window.trackCTAClick) {
        window.trackCTAClick(ctaName);
      }
    }
  }
};
</script>

<style scoped>
.ja_hero--3d {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Hero Overlay - text on left side */
.hero-overlay {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.hero-text {
  max-width: 600px;
  pointer-events: auto;
}

.hero-subtitle {
  color: #C41E3A;
  font-weight: 500;
  margin-bottom: 16px;
  font-size: 16px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero-title .orangeText {
  color: #C41E3A;
}

.hero-description {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #C41E3A;
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #8B0000;
  transform: scale(1.05);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid #1a1a2e;
  color: #1a1a2e;
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #1a1a2e;
  color: white;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Trust Badge */
.hero-trust {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.trust-badge {
  background: #fff3cd;
  color: #856404;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.trust-text {
  color: #666;
  font-size: 14px;
}

:global(body.dark) .trust-badge {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

:global(body.dark) .trust-text {
  color: #b0b0b0;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  animation: bounce 2s infinite;
  pointer-events: auto;
}

.scroll-icon {
  width: 32px;
  height: 32px;
  color: #C41E3A;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Drag Hint */
.drag-hint {
  position: absolute;
  bottom: 32px;
  right: 32px;
  z-index: 10;
  display: none;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.drag-icon {
  width: 20px;
  height: 20px;
}

@media (min-width: 768px) {
  .drag-hint {
    display: flex;
  }

  .hero-title {
    font-size: 64px;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 72px;
  }
}

/* Dark theme */
:global(body.dark) .hero-title {
  color: #fff;
}

:global(body.dark) .hero-description {
  color: #b0b0b0;
}

:global(body.dark) .btn-secondary {
  border-color: #fff;
  color: #fff;
}

:global(body.dark) .btn-secondary:hover {
  background: #fff;
  color: #1a1a2e;
}

:global(body.dark) .drag-hint {
  background: rgba(20, 20, 30, 0.8);
  color: #b0b0b0;
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .hero-text {
    text-align: center;
    max-width: 100%;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .btn-primary,
  .btn-secondary {
    padding: 14px 24px;
    font-size: 14px;
  }
}
</style>
