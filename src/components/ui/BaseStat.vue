<script setup>
defineProps({
  value: { type: String, required: true },  // e.g. "35+", "5.0", "15h/wk"
  label: { type: String, required: true },  // e.g. "Projects"
  // optional accent — wraps part of value in brand color via slot 'accent'
});
</script>

<template>
  <div class="base-stat">
    <strong class="base-stat__value"><slot name="value">{{ value }}</slot></strong>
    <span class="base-stat__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.base-stat {
  text-align: center;
}
.base-stat__value {
  display: block;
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  line-height: 1;
}
.base-stat__label {
  display: block;
  margin-top: 6px;
  font-size: var(--fs-eyebrow);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}
</style>
