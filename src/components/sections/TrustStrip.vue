<script setup>
const initials = ['SM', 'MR', 'JK', 'DL', 'ES'];
const moreCount = 15;
</script>

<template>
  <section class="trust-strip" aria-label="Client trust signals">
    <div class="trust-strip__inner">
      <div class="trust-strip__rating">
        <span class="trust-strip__stars" aria-hidden="true">★★★★★</span>
        <div>
          <div class="trust-strip__num">5.0</div>
          <small>{{ initials.length + moreCount }}+ verified clients</small>
        </div>
      </div>

      <div class="trust-strip__clients">
        <div class="trust-strip__avatars">
          <span v-for="i in initials" :key="i" class="trust-strip__avatar">{{ i }}</span>
        </div>
        <small>+{{ moreCount }} more</small>
      </div>

      <div class="trust-strip__flags">
        <span aria-hidden="true">🇺🇸 🇬🇧 🇦🇺</span>
        <span>Trusted across USA, UK, Australia</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-strip {
  background: #fafaf8;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  padding: 28px 0;
}
.trust-strip__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.trust-strip__rating { display: flex; align-items: center; gap: 16px; }
.trust-strip__stars { color: #ffc107; font-size: 22px; letter-spacing: 2px; }
.trust-strip__num {
  font-size: 24px;
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1;
}
.trust-strip__rating small {
  display: block;
  font-size: 11px;
  color: #666;
}

.trust-strip__clients { display: flex; align-items: center; gap: 12px; }
.trust-strip__avatars { display: flex; }
.trust-strip__avatar {
  width: 36px;
  height: 36px;
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
}
.trust-strip__avatar:first-child { margin-left: 0; }
.trust-strip__clients small { font-size: 12px; color: #444; }

.trust-strip__flags {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #444;
  font-weight: 600;
}
.trust-strip__flags > span:first-child { font-size: 18px; }

@media (max-width: 768px) {
  .trust-strip__inner {
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>
