<script setup>
import ServiceIcon from '@/components/ui/ServiceIcon.vue';

const services = [
  {
    iconName: 'web',
    title: 'Web Development',
    blurb: 'Marketing sites, dashboards, SaaS — fast, accessible, SEO-ready.',
    href: '/services#web-development',
  },
  {
    iconName: 'mobile',
    title: 'Mobile Apps',
    blurb: 'iOS + Android apps with React Native — push, payments, offline.',
    href: '/services#mobile-apps',
  },
  {
    iconName: 'n8n',
    title: 'N8N Automation',
    blurb: 'Workflows that save teams 15+ hours per week.',
    href: '/services#n8n-automation',
  },
  {
    iconName: 'support',
    title: 'Technical Support',
    blurb: 'Monthly retainers for monitoring, fixes, on-call dev help.',
    href: '/services#tech-support',
  },
];
</script>

<template>
  <section class="ja_section services-preview" id="services-preview">
    <div class="container">
      <div class="ja_main_title" data-align="center">
        <span>What I build</span>
        <h3>Four services. One developer.</h3>
        <p>
          Pick one or bundle several — most clients start with web or N8N and grow from there.
        </p>
      </div>

      <div class="services-preview__grid">
        <router-link
          v-for="s in services"
          :key="s.title"
          :to="s.href"
          class="services-preview__card"
        >
          <div class="services-preview__icon" aria-hidden="true">
            <ServiceIcon :name="s.iconName" />
          </div>
          <h3 class="services-preview__title">{{ s.title }}</h3>
          <p class="services-preview__blurb">{{ s.blurb }}</p>
          <span class="services-preview__link">Learn more →</span>
        </router-link>
      </div>

      <div class="services-preview__footer">
        <router-link to="/services" class="services-preview__all">
          See all services →
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-preview { padding: 80px 0; scroll-margin-top: 80px; }
.services-preview__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 40px;
}
.services-preview__card {
  display: block;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 28px;
  text-decoration: none;
  color: inherit;
  transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease;
}
.services-preview__card:hover {
  border-color: #C41E3A;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
}
.services-preview__icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #fef0f2, #fce4e8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 16px;
}
.services-preview__title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
}
.services-preview__blurb {
  font-size: 14px;
  color: #555;
  line-height: 1.55;
  margin: 0 0 16px;
}
.services-preview__link {
  font-size: 13px;
  color: #C41E3A;
  font-weight: 600;
}
.services-preview__footer {
  margin-top: 32px;
  text-align: center;
}
.services-preview__all {
  font-size: 14px;
  color: #C41E3A;
  font-weight: 700;
  text-decoration: none;
}
.services-preview__all:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .services-preview { padding: 48px 0; }
  .services-preview__grid { grid-template-columns: 1fr; }
}
</style>
