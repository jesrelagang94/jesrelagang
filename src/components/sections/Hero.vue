<script setup>
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import BaseStat from '@/components/ui/BaseStat.vue';

// Placeholder portrait. Jesrel can swap /img/banner/avatar.png with a higher-res photo later.
const portraitSrc = '/img/banner/avatar.png';
</script>

<template>
  <section id="top" class="hero">
    <BaseContainer>
      <div class="hero__grid">
        <div class="hero__text">
          <BaseTag>Web · Mobile · N8N · Tech Support</BaseTag>
          <h1 class="hero__title">
            Your <em>full-stack partner</em><br />
            for shipping, scaling,<br />
            and supporting software.
          </h1>
          <p class="hero__lede">
            Eight years building web apps, mobile apps, N8N automations, and ongoing technical
            support for SMBs in the USA, UK, and Australia.
          </p>
          <div class="hero__ctas">
            <BaseButton variant="primary" href="#contact">Book free consultation →</BaseButton>
            <BaseButton variant="secondary" href="#portfolio">View work</BaseButton>
          </div>
          <p class="hero__reply">
            <span class="hero__dot" aria-hidden="true" />
            <strong>Replies within 24 hours</strong> · USD payments · NDA-friendly
          </p>
        </div>

        <div class="hero__photo">
          <div class="hero__photo-frame">
            <img :src="portraitSrc" alt="Jesrel Agang" loading="eager" />
          </div>
          <div class="hero__badge hero__badge--tl">
            <span class="hero__stars" aria-label="Five star rating">★★★★★</span>
            <div>
              5.0 rating
              <small>20+ clients</small>
            </div>
          </div>
          <div class="hero__badge hero__badge--br">
            <span class="hero__flags" aria-hidden="true">🇺🇸 🇬🇧 🇦🇺</span>
            <div>
              Trusted globally
              <small>USA · UK · AU</small>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>

    <div class="hero__stats-band">
      <BaseContainer>
        <div class="hero__stats">
          <BaseStat value="35+" label="Projects" />
          <BaseStat value="20+" label="Clients" />
          <BaseStat value="8+" label="Years" />
          <BaseStat value="15h/wk" label="Saved via N8N" />
        </div>
      </BaseContainer>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--color-white) 0%, var(--color-brand-soft) 100%);
  padding-top: var(--sp-16);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--sp-12);
  align-items: center;
  padding-bottom: var(--sp-16);
}
.hero__title {
  font-family: var(--font-body);
  font-size: var(--fs-display);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin: var(--sp-5) 0 var(--sp-5);
}
.hero__title em { color: var(--color-brand); font-style: normal; }
.hero__lede {
  font-size: var(--fs-body);
  color: #555;
  line-height: 1.55;
  margin: 0 0 var(--sp-8);
  max-width: 480px;
}
.hero__ctas {
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
  margin-bottom: var(--sp-8);
}
.hero__reply {
  font-size: var(--fs-small);
  color: var(--color-muted);
  margin: 0;
}
.hero__reply strong { color: var(--color-ink); }
.hero__dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--color-success);
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}

.hero__photo {
  position: relative;
  aspect-ratio: 1 / 1.05;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--color-ink), #3d0d1a);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.hero__photo-frame {
  width: 88%;
  height: 96%;
  margin-bottom: 6px;
  border-radius: 14px 14px 0 0;
  overflow: hidden;
  background: radial-gradient(circle at 50% 35%, #9a3a4d 0%, var(--color-ink) 70%);
}
.hero__photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero__badge {
  position: absolute;
  background: var(--color-white);
  border-radius: 10px;
  padding: 10px 14px;
  box-shadow: var(--sh-md);
  font-size: 11px;
  color: var(--color-ink);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.2;
}
.hero__badge small {
  display: block;
  color: var(--color-muted);
  font-weight: 400;
  font-size: 9px;
}
.hero__badge--tl { top: var(--sp-5); left: var(--sp-5); }
.hero__badge--br { bottom: var(--sp-6); right: var(--sp-5); }
.hero__stars { color: #ffc107; font-size: 10px; }
.hero__flags { font-size: 18px; }

.hero__stats-band {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--sp-6) 0;
}
.hero__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-4);
}

@media (max-width: 900px) {
  .hero__grid { grid-template-columns: 1fr; gap: var(--sp-8); }
  .hero__photo { max-width: 360px; margin: 0 auto; }
  .hero__stats { grid-template-columns: repeat(2, 1fr); gap: var(--sp-6); }
}
</style>
