<script setup>
defineProps({
  // 'web' | 'mobile' | 'n8n' | 'support'
  name: { type: String, required: true },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="service-icon"
  >
    <!-- Web Development: monitor with code brackets -->
    <g v-if="name === 'web'">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <polyline points="9 8 6 11 9 14" />
      <polyline points="15 8 18 11 15 14" />
    </g>

    <!-- Mobile Apps: smartphone -->
    <g v-else-if="name === 'mobile'">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </g>

    <!-- N8N Automation: connected workflow nodes -->
    <g v-else-if="name === 'n8n'">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
      <line x1="12" y1="13" x2="12" y2="15" />
    </g>

    <!-- Tech Support: life ring -->
    <g v-else-if="name === 'support'">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </g>
  </svg>
</template>

<style scoped>
.service-icon {
  width: 22px;
  height: 22px;
  color: #C41E3A;
}
</style>
