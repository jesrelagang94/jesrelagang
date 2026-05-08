<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div class="not-found-actions">
        <router-link to="/" class="ja_button">
          <a>Back to Home</a>
        </router-link>
        <router-link to="/#contact" class="contact-link">
          Contact Me
        </router-link>
      </div>
    </div>
    <div class="background-decoration" aria-hidden="true">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
  mounted() {
    document.title = "Page Not Found - Jesrel Agang";
  }
};
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fdf8f3 0%, #fff5ee 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.not-found-content {
  text-align: center;
  z-index: 10;
  max-width: 600px;
}

.error-code {
  font-size: clamp(100px, 20vw, 200px);
  font-weight: 900;
  color: #C41E3A;
  line-height: 1;
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif;
  text-shadow: 4px 4px 0 rgba(196, 30, 58, 0.1);
}

h1 {
  font-size: clamp(24px, 5vw, 42px);
  color: #1a1a2e;
  margin-bottom: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

p {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.not-found-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.ja_button a {
  background: #C41E3A;
  color: #fff;
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.ja_button a:hover {
  background: #a01830;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(196, 30, 58, 0.3);
}

.contact-link {
  color: #C41E3A;
  text-decoration: none;
  font-weight: 600;
  padding: 14px 32px;
  border: 2px solid #C41E3A;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: rgba(196, 30, 58, 0.1);
}

/* Background decoration */
.background-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(196, 30, 58, 0.05) 100%);
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
}

.circle-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}

/* Dark mode support */
.dark .not-found-page {
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
}

.dark h1 {
  color: #fff;
}

.dark p {
  color: #a0a0a0;
}

.dark .circle {
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.2) 0%, rgba(196, 30, 58, 0.1) 100%);
}

/* Responsive */
@media (max-width: 768px) {
  .not-found-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
