<script setup>
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import VueJsCounter from 'vue-js-counter';

const portraitSrc = '/img/banner/avatar.png';
</script>

<template>
  <BaseSection id="about">
    <BaseContainer>
      <div class="about-grid">
        <div class="about-photo">
          <img :src="portraitSrc" alt="Jesrel Agang" loading="lazy" />
          <div class="about-stat about-stat--years">
            <strong><VueJsCounter end="8" />+</strong>
            <small>Years of<br />Experience</small>
          </div>
          <div class="about-stat about-stat--projects">
            <strong><VueJsCounter end="35" />+</strong>
            <small>Projects<br />Completed</small>
          </div>
        </div>

        <div class="about-text">
          <BaseTag>About Jesrel</BaseTag>
          <h2 class="about-h2">N8N Automation + Web/Mobile Development + Tech Support</h2>
          <p>
            Hello! I'm Jesrel Agang, serving clients in the USA, UK, Australia, and worldwide. I
            specialize in N8N workflow automation that saves businesses 15+ hours weekly,
            full-stack web and mobile development with Vue.js, React, and React Native, plus
            reliable technical support.
          </p>
          <p>
            <strong>Why clients choose me:</strong> competitive rates, significant timezone
            overlap for real-time collaboration, excellent English communication, and a proven
            track record. I sign NDAs, accept USD payments, and deliver enterprise-quality work.
          </p>
          <BaseButton variant="primary" href="#contact">Hire me →</BaseButton>
        </div>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--sp-12);
  align-items: center;
}

.about-photo {
  position: relative;
  aspect-ratio: 1 / 1.1;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-ink), #3d0d1a);
}
.about-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-stat {
  position: absolute;
  background: var(--color-white);
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--r-md);
  box-shadow: var(--sh-md);
}
.about-stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  line-height: 1;
}
.about-stat small {
  display: block;
  font-size: 10px;
  color: var(--color-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 4px;
  line-height: 1.2;
}
.about-stat--years { top: 18px; left: -18px; }
.about-stat--projects { bottom: 24px; right: -18px; }

.about-text :deep(p) {
  font-size: var(--fs-body);
  color: #444;
  line-height: 1.65;
  margin: 0 0 var(--sp-5);
}
.about-h2 {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: var(--sp-3) 0 var(--sp-5);
  line-height: 1.2;
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: var(--sp-10); }
  .about-photo { max-width: 360px; margin: 0 auto; }
  .about-stat--years { top: 12px; left: 12px; }
  .about-stat--projects { bottom: 12px; right: 12px; }
}
</style>
