<script setup>
defineProps({
  // 'plain' | 'interactive' (interactive: hover lift + brand border)
  variant: { type: String, default: 'plain' },
  // optional anchor href — if provided, renders the whole card as <a>
  href: { type: String, default: null },
});
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="['base-card', `base-card--${variant}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-card {
  display: block;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  padding: var(--sp-6);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--tr-fast), transform var(--tr-fast), box-shadow var(--tr-fast);
}
.base-card--interactive:hover {
  border-color: var(--color-brand);
  transform: translateY(-2px);
  box-shadow: var(--sh-md);
}
</style>
