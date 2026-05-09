<script setup>
defineProps({
  // 'eyebrow' (UPPERCASE pill, brand color) | 'tech' (small neutral chip)
  variant: { type: String, default: 'eyebrow' },
});
</script>

<template>
  <span :class="['base-tag', `base-tag--${variant}`]">
    <slot />
  </span>
</template>

<style scoped>
.base-tag {
  display: inline-block;
  border-radius: var(--r-pill);
  font-weight: 700;
  line-height: 1;
}
.base-tag--eyebrow {
  background: var(--color-white);
  border: 1px solid #f3d0d6;
  color: var(--color-brand);
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 11px;
}
.base-tag--tech {
  background: #f5f5f3;
  color: #444;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  letter-spacing: 0;
  text-transform: none;
}
</style>
