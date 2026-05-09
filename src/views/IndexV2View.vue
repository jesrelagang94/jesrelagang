<script setup>
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTag from '@/components/ui/BaseTag.vue';
import BaseStat from '@/components/ui/BaseStat.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
</script>

<template>
  <main class="v2-shell">
    <BaseSection>
      <BaseContainer>
        <BaseTag>v2 scaffold</BaseTag>
        <h1 class="v2-h1">Phase 2 site rebuild</h1>
        <p class="v2-lede">
          Each section will be added one task at a time. This stub also smoke-tests every
          UI primitive so we know the foundation is wired up correctly.
        </p>

        <div class="v2-row">
          <BaseButton variant="primary" href="#">Primary button</BaseButton>
          <BaseButton variant="secondary" href="#">Secondary</BaseButton>
          <BaseButton variant="ghost" href="#">Ghost</BaseButton>
        </div>

        <div class="v2-grid">
          <BaseStat value="35+" label="Projects" />
          <BaseStat value="20+" label="Clients" />
          <BaseStat value="8+" label="Years" />
        </div>

        <div class="v2-grid v2-grid--cards">
          <BaseCard variant="interactive" href="#">
            <h3>Interactive card</h3>
            <p>Hover me — should lift + show brand border.</p>
          </BaseCard>
          <BaseCard>
            <h3>Plain card</h3>
            <p>No hover effect.</p>
          </BaseCard>
        </div>
      </BaseContainer>
    </BaseSection>
  </main>
</template>

<style scoped>
.v2-shell {
  min-height: 100vh;
  background: var(--color-white);
  font-family: var(--font-body);
  color: var(--color-ink);
}
.v2-h1 {
  font-family: var(--font-display);
  font-size: var(--fs-display);
  margin: var(--sp-4) 0 var(--sp-3);
  letter-spacing: -0.02em;
}
.v2-lede {
  color: var(--color-muted);
  margin: 0 0 var(--sp-8);
  max-width: 560px;
}
.v2-row {
  display: flex;
  gap: var(--sp-3);
  margin-bottom: var(--sp-10);
  flex-wrap: wrap;
}
.v2-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-4);
  margin-bottom: var(--sp-10);
}
.v2-grid--cards {
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 768px) {
  .v2-grid, .v2-grid--cards { grid-template-columns: 1fr; }
}
</style>
