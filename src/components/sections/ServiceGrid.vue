<script setup>
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTag from '@/components/ui/BaseTag.vue';

// 4 services per spec §4.2. Adjust copy with Jesrel later if needed.
const services = [
  {
    icon: '⚡',
    title: 'Web Development',
    desc: 'Marketing sites, dashboards, internal tools, SaaS products. Fast, accessible, SEO-ready.',
    tags: ['Vue 3', 'React', 'Node', 'Firebase'],
    href: '#portfolio',
    cta: 'See web work →',
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS + Android apps with React Native. Push, payments, offline.',
    tags: ['React Native', 'Expo', 'Stripe'],
    href: '#portfolio',
    cta: 'See mobile work →',
  },
  {
    icon: '🔗',
    title: 'N8N Automation',
    desc: 'Workflow automation that saves teams 15+ hours/week. CRM sync, lead routing, billing.',
    tags: ['N8N', 'Webhooks', 'CRM APIs'],
    href: '#portfolio',
    cta: 'See automation work →',
  },
  {
    icon: '🛟',
    title: 'Technical Support',
    desc: 'Ongoing maintenance, bug fixes, monitoring, on-call dev help. Monthly retainers available.',
    tags: ['Retainer', 'SLA', 'DevOps'],
    href: '#contact',
    cta: 'See support plans →',
  },
];
</script>

<template>
  <BaseSection id="services">
    <BaseContainer>
      <header class="svc-header">
        <BaseTag>What I build</BaseTag>
        <h2 class="svc-h2">Four services. One developer.</h2>
        <p class="svc-sub">
          Pick one or bundle several — most clients start with web or N8N and grow from there.
        </p>
      </header>

      <div class="svc-grid">
        <BaseCard v-for="s in services" :key="s.title" variant="interactive" :href="s.href">
          <div class="svc-icon" aria-hidden="true">{{ s.icon }}</div>
          <h3 class="svc-title">{{ s.title }}</h3>
          <p class="svc-desc">{{ s.desc }}</p>
          <div class="svc-tags">
            <span v-for="t in s.tags" :key="t" class="svc-tag">{{ t }}</span>
          </div>
          <span class="svc-cta">{{ s.cta }}</span>
        </BaseCard>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<style scoped>
.svc-header { text-align: center; margin-bottom: var(--sp-10); }
.svc-h2 {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin: var(--sp-3) 0 var(--sp-3);
  line-height: 1.15;
}
.svc-sub {
  color: var(--color-muted);
  margin: 0 auto;
  max-width: 520px;
  font-size: 14px;
}

.svc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-5);
}
.svc-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--color-brand-soft), #fce4e8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: var(--sp-4);
}
.svc-title {
  font-size: var(--fs-h3);
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 var(--sp-2);
}
.svc-desc {
  font-size: var(--fs-small);
  color: #555;
  line-height: 1.55;
  margin: 0 0 var(--sp-4);
}
.svc-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: var(--sp-4);
}
.svc-tag {
  background: #f5f5f3;
  color: #444;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: var(--r-pill);
}
.svc-cta {
  font-size: 12px;
  color: var(--color-brand);
  font-weight: 600;
}

@media (max-width: 768px) {
  .svc-grid { grid-template-columns: 1fr; }
}
</style>
