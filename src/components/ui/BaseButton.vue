<script setup>
defineProps({
  // 'primary' (Ink solid) | 'secondary' (outlined Ink) | 'ghost' (Brand text)
  variant: { type: String, default: 'primary' },
  // if provided, renders as <a href>; otherwise <button>
  href: { type: String, default: null },
  // forwarded to native button
  type: { type: String, default: 'button' },
  disabled: Boolean,
});
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? null : type"
    :disabled="!href && disabled"
    :class="['base-btn', `base-btn--${variant}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  border-radius: var(--r-md);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform var(--tr-fast), box-shadow var(--tr-fast), background var(--tr-fast);
  line-height: 1;
}
.base-btn--primary {
  background: var(--color-ink);
  color: var(--color-white);
  box-shadow: 0 6px 18px rgba(26, 26, 46, .18);
}
.base-btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(26, 26, 46, .22);
}
.base-btn--secondary {
  background: var(--color-white);
  border: 1.5px solid var(--color-ink);
  color: var(--color-ink);
  padding: 12.5px 20px;
}
.base-btn--secondary:hover {
  background: var(--color-ink);
  color: var(--color-white);
}
.base-btn--ghost {
  background: transparent;
  color: var(--color-brand);
  padding: 10px 14px;
}
.base-btn--ghost:hover {
  text-decoration: underline;
}
.base-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
