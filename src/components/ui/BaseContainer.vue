<script setup>
// Centered content wrapper. Use as the inner shell of every section.
</script>

<template>
  <div class="base-container">
    <slot />
  </div>
</template>

<style scoped>
.base-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-6);
  width: 100%;
}
</style>
