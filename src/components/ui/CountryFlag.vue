<script setup>
defineProps({
  // 'us' | 'uk' | 'au'
  code: { type: String, required: true },
});

const labels = {
  us: 'United States',
  uk: 'United Kingdom',
  au: 'Australia',
};
</script>

<template>
  <svg
    :class="['country-flag', `country-flag--${code}`]"
    width="24"
    height="18"
    viewBox="0 0 24 18"
    role="img"
    :aria-label="labels[code]"
  >
    <!-- USA: 13 stripes + blue canton -->
    <g v-if="code === 'us'">
      <rect width="24" height="18" fill="#fff" />
      <rect y="0" width="24" height="1.38" fill="#B22234" />
      <rect y="2.77" width="24" height="1.38" fill="#B22234" />
      <rect y="5.54" width="24" height="1.38" fill="#B22234" />
      <rect y="8.31" width="24" height="1.38" fill="#B22234" />
      <rect y="11.08" width="24" height="1.38" fill="#B22234" />
      <rect y="13.85" width="24" height="1.38" fill="#B22234" />
      <rect y="16.62" width="24" height="1.38" fill="#B22234" />
      <rect width="10" height="9.69" fill="#3C3B6E" />
    </g>

    <!-- UK: simplified Union Jack -->
    <g v-else-if="code === 'uk'">
      <rect width="24" height="18" fill="#012169" />
      <path d="M0 0 L24 18 M24 0 L0 18" stroke="#fff" stroke-width="3" />
      <path d="M0 0 L24 18 M24 0 L0 18" stroke="#C8102E" stroke-width="1.5" />
      <rect x="10" width="4" height="18" fill="#fff" />
      <rect y="7" width="24" height="4" fill="#fff" />
      <rect x="11" width="2" height="18" fill="#C8102E" />
      <rect y="8" width="24" height="2" fill="#C8102E" />
    </g>

    <!-- AU: blue + simplified Union Jack canton + Commonwealth Star + Southern Cross -->
    <g v-else-if="code === 'au'">
      <rect width="24" height="18" fill="#012169" />
      <!-- Mini Union Jack canton (top-left, 12x9) -->
      <g>
        <path d="M0 0 L12 9 M12 0 L0 9" stroke="#fff" stroke-width="1.5" />
        <rect x="5" width="2" height="9" fill="#fff" />
        <rect y="3.5" width="12" height="2" fill="#fff" />
        <rect x="5.5" width="1" height="9" fill="#C8102E" />
        <rect y="4" width="12" height="1" fill="#C8102E" />
      </g>
      <!-- Commonwealth Star (below canton) -->
      <circle cx="3" cy="14.5" r="1.4" fill="#fff" />
      <!-- Southern Cross (right side, 5 stars) -->
      <circle cx="18" cy="3.5" r="0.8" fill="#fff" />
      <circle cx="21" cy="8" r="1" fill="#fff" />
      <circle cx="18" cy="14" r="0.8" fill="#fff" />
      <circle cx="14.5" cy="11" r="0.6" fill="#fff" />
      <circle cx="22" cy="13" r="0.5" fill="#fff" />
    </g>
  </svg>
</template>

<style scoped>
.country-flag {
  display: inline-block;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .12);
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
