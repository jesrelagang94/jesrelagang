<script setup>
defineProps({
  // 'default' | 'alt' — alt uses --color-surface bg (for striped sections)
  variant: { type: String, default: 'default' },
  // optional id for anchor scrolling
  id: { type: String, default: null },
});
</script>

<template>
  <section
    :id="id"
    :class="['base-section', `base-section--${variant}`]"
  >
    <slot />
  </section>
</template>

<style scoped>
.base-section {
  padding: var(--sp-20) 0;
  position: relative;
}
.base-section--alt {
  background: var(--color-surface);
}
@media (max-width: 768px) {
  .base-section {
    padding: var(--sp-16) 0;
  }
}
</style>
