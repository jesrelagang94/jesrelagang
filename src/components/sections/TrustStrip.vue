<script setup>
// Per spec §4.3. Initials placeholder until clients consent to logos.
const initials = ['SM', 'MR', 'JK', 'DL', 'ES'];
const moreCount = 15;
</script>

<template>
  <section class="trust" aria-label="Client trust signals">
    <div class="trust__inner">
      <div class="trust__rating">
        <span class="trust__stars" aria-hidden="true">★★★★★</span>
        <div>
          <div class="trust__num">5.0</div>
          <small>{{ initials.length + moreCount }}+ verified clients</small>
        </div>
      </div>

      <div class="trust__clients">
        <div class="trust__avatars">
          <span v-for="i in initials" :key="i" class="trust__avatar">{{ i }}</span>
        </div>
        <small>+{{ moreCount }} more</small>
      </div>

      <div class="trust__flags">
        <span aria-hidden="true">🇺🇸 🇬🇧 🇦🇺</span>
        <span>Trusted across USA, UK, Australia</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--sp-8) 0;
}
.trust__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-6);
  flex-wrap: wrap;
}

.trust__rating {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
}
.trust__stars {
  color: #ffc107;
  font-size: 22px;
  letter-spacing: 2px;
}
.trust__num {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-ink);
  line-height: 1;
  font-family: var(--font-display);
}
.trust__rating small {
  display: block;
  font-size: 11px;
  color: var(--color-muted);
}

.trust__clients {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}
.trust__avatars { display: flex; }
.trust__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-brand), #7a1226);
  color: var(--color-white);
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-white);
  margin-left: -8px;
}
.trust__avatar:first-child { margin-left: 0; }
.trust__clients small { font-size: 12px; color: #444; }

.trust__flags {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  font-size: 13px;
  color: #444;
  font-weight: 600;
}
.trust__flags > span:first-child { font-size: 18px; }

@media (max-width: 768px) {
  .trust__inner { justify-content: center; flex-direction: column; gap: var(--sp-5); text-align: center; }
}
</style>
