<script setup>
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseTag from '@/components/ui/BaseTag.vue';

const steps = [
  { n: 1, title: 'Discovery call', desc: '30 min, free, no obligation. We talk through the problem.' },
  { n: 2, title: 'Proposal + estimate', desc: 'Fixed-fee or hourly, written scope, clear deliverables.' },
  { n: 3, title: 'Build', desc: 'Weekly demo, async-first, Slack/Loom updates throughout.' },
  { n: 4, title: 'Launch + support', desc: 'Handover + optional retainer for ongoing tech support.' },
];
</script>

<template>
  <BaseSection id="process" variant="alt">
    <BaseContainer>
      <header class="proc-header">
        <BaseTag>How we work</BaseTag>
        <h2 class="proc-h2">Four steps from hello to live</h2>
      </header>

      <ol class="proc-steps">
        <li v-for="s in steps" :key="s.n" class="proc-step">
          <div class="proc-num">{{ s.n }}</div>
          <h3 class="proc-title">{{ s.title }}</h3>
          <p class="proc-desc">{{ s.desc }}</p>
        </li>
      </ol>
    </BaseContainer>
  </BaseSection>
</template>

<style scoped>
.proc-header { text-align: center; margin-bottom: var(--sp-10); }
.proc-h2 {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: var(--sp-3) 0 0;
  line-height: 1.15;
}

.proc-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-6);
  position: relative;
}
.proc-steps::before {
  content: '';
  position: absolute;
  top: 22px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--color-border) 8%, var(--color-border) 92%, transparent);
  z-index: 0;
}
.proc-step {
  position: relative;
  z-index: 1;
  text-align: center;
  background: var(--color-surface);
  padding: 0 var(--sp-3);
}
.proc-num {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-white);
  border: 2px solid var(--color-brand);
  color: var(--color-brand);
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--sp-4);
}
.proc-title {
  font-size: var(--fs-h3);
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 6px;
}
.proc-desc {
  font-size: var(--fs-small);
  color: var(--color-muted);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 768px) {
  .proc-steps { grid-template-columns: 1fr; }
  .proc-steps::before { display: none; }
}
</style>
