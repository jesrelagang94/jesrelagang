<script setup>
import CountryFlag from '@/components/ui/CountryFlag.vue';

const initials = ['SM', 'MR', 'JK', 'DL', 'ES'];
const moreCount = 15;
</script>

<template>
  <section class="trust-strip" aria-label="Client trust signals">
    <div class="trust-strip__inner">
      <div class="trust-strip__rating">
        <span class="trust-strip__stars" aria-hidden="true">★★★★★</span>
        <div>
          <div class="trust-strip__num">5.0<span class="trust-strip__num-suffix">/5</span></div>
          <small>{{ initials.length + moreCount }}+ verified clients</small>
        </div>
      </div>

      <span class="trust-strip__divider" aria-hidden="true"></span>

      <div class="trust-strip__clients">
        <div class="trust-strip__avatars">
          <span v-for="i in initials" :key="i" class="trust-strip__avatar">{{ i }}</span>
        </div>
        <small>+{{ moreCount }} more</small>
      </div>

      <span class="trust-strip__divider" aria-hidden="true"></span>

      <div class="trust-strip__flags">
        <div class="trust-strip__flag-row" aria-hidden="true">
          <CountryFlag code="us" />
          <CountryFlag code="uk" />
          <CountryFlag code="au" />
        </div>
        <span class="trust-strip__flag-label">Trusted across USA, UK, Australia</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-strip {
  background: #fafaf8;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  padding: 24px 0;
}
.trust-strip__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  flex-wrap: wrap;
}
.trust-strip__divider {
  width: 1px;
  height: 36px;
  background: #d8d8d4;
  flex-shrink: 0;
}

.trust-strip__rating { display: flex; align-items: center; gap: 14px; }
.trust-strip__stars { color: #ffc107; font-size: 22px; letter-spacing: 2px; }
.trust-strip__num {
  font-size: 24px;
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1;
}
.trust-strip__num-suffix {
  font-size: 13px;
  font-weight: 500;
  color: #888;
  margin-left: 2px;
}
.trust-strip__rating small {
  display: block;
  font-size: 11px;
  color: #666;
  margin-top: 4px;
}

.trust-strip__clients { display: flex; align-items: center; gap: 12px; }
.trust-strip__avatars { display: flex; }
.trust-strip__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C41E3A, #7a1226);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  margin-left: -8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .08);
}
.trust-strip__avatar:first-child { margin-left: 0; }
.trust-strip__clients small { font-size: 12px; color: #444; font-weight: 500; }

.trust-strip__flags {
  display: flex;
  align-items: center;
  gap: 12px;
}
.trust-strip__flag-row {
  display: flex;
  gap: 6px;
}
.trust-strip__flag-label {
  font-size: 13px;
  color: #444;
  font-weight: 600;
}

@media (max-width: 900px) {
  .trust-strip__inner {
    gap: 20px;
  }
  .trust-strip__divider { display: none; }
}
@media (max-width: 768px) {
  .trust-strip__inner {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>
