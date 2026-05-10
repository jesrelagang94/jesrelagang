<script setup>
import { useHead } from '@vueuse/head';

import ServiceDetailBlock from '@/components/sections/ServiceDetailBlock.vue';
import ProcessFlow from '@/components/sections/ProcessFlow.vue';
import CTASection from '@/components/sections/CTASection.vue';

useHead({
  title: 'Services · Jesrel Agang',
  meta: [
    {
      name: 'description',
      content:
        'Web development, mobile apps, N8N automation, and technical support — pick one or bundle.',
    },
    { property: 'og:title', content: 'Services · Jesrel Agang' },
    {
      property: 'og:description',
      content: 'Four services. One developer. Pick what you need today; bundle as you grow.',
    },
    { property: 'og:url', content: 'https://jesrelagang.pro/services' },
  ],
  link: [{ rel: 'canonical', href: 'https://jesrelagang.pro/services' }],
});
</script>

<template>
  <main class="services-view">
    <!-- Page hero (light, no 3D) -->
    <section class="ja_section services-hero">
      <div class="container">
        <div class="ja_main_title" data-align="center">
          <span>What I build</span>
          <h3>Four services, picked or bundled.</h3>
          <p>
            Most clients start with one service and expand. Pick what you need today; bundle as
            you grow. Each service comes with the same engagement process and the same response
            promise.
          </p>
        </div>
      </div>
    </section>

    <!-- 4 service detail blocks (anchored) -->
    <ServiceDetailBlock
      anchor-id="web-development"
      icon="⚡"
      title="Web Development"
      :paragraphs="[
        'Marketing sites, dashboards, internal tools, SaaS products. Fast, accessible, SEO-ready, and built to scale with your business.',
        'I work with Vue 3 and React for frontends, Node.js for backends, and Firebase or PostgreSQL for storage. Deployed to Vercel, Netlify, or your existing infrastructure.',
        'The output is code you (or another developer) can maintain — clean, documented, and handover-ready.',
      ]"
      audience="Founders, marketing leads, and ops teams who need a marketing site, internal tool, dashboard, or SaaS product built or rebuilt by someone who treats it as their own."
      :deliverables="[
        'Custom design or theme implementation',
        'Responsive on mobile and desktop',
        'SEO meta + structured data',
        'Performance budget (90+ Lighthouse)',
        'Hosting setup and CI/CD',
        'Documented codebase + handover',
      ]"
      :techs="['Vue 3', 'React', 'Node', 'TypeScript', 'Firebase', 'PostgreSQL', 'Vercel']"
      example-label="Sales pipeline SaaS"
      example-href="/work"
      cta-label="Start a Web project →"
      cta-href="/contact"
      layout="default"
    />

    <ServiceDetailBlock
      anchor-id="mobile-apps"
      icon="📱"
      title="Mobile Apps"
      :paragraphs="[
        'Cross-platform iOS and Android apps with React Native. Native-feel performance from one codebase, deployed to both App Store and Play Store.',
        'Push notifications, offline support, in-app payments via Stripe, deep linking, and analytics — the standard pieces you need for an app to feel finished.',
        'Best for SMBs who want one app for both stores without paying for two separate native builds.',
      ]"
      audience="SMB owners who need an iOS + Android app for their service business, internal team, or a customer-facing product extension."
      :deliverables="[
        'iOS + Android builds from one codebase',
        'Push notifications setup',
        'Offline mode where it matters',
        'Payments integration (Stripe)',
        'App Store + Play Store submission',
        'Analytics dashboard',
      ]"
      :techs="['React Native', 'Expo', 'Stripe', 'Firebase', 'TypeScript']"
      example-label="Salon booking app"
      example-href="/work"
      cta-label="Start a Mobile project →"
      cta-href="/contact"
      layout="reverse"
    />

    <ServiceDetailBlock
      anchor-id="n8n-automation"
      icon="🔗"
      title="N8N Automation"
      :paragraphs="[
        'Workflow automation that saves teams 15+ hours per week. CRM sync, lead routing, billing flows, custom integrations, and anything else that connects the tools you already pay for.',
        'I build with N8N (open-source, self-hosted or n8n.cloud) so you own your automation infrastructure — no vendor lock-in, no per-zap fees.',
        'Most projects start with one painful workflow and grow from there as the team sees what else can be automated.',
      ]"
      audience="Operations leads, sales managers, and SMB owners drowning in repetitive work that could be automated if someone built the right workflow."
      :deliverables="[
        'Self-hosted N8N or n8n.cloud setup',
        'Custom workflows with error handling',
        'CRM, billing, email integrations',
        'Webhook endpoints + Slack alerts',
        'Documentation for your team',
        '30 days of post-launch support',
      ]"
      :techs="['N8N', 'Webhooks', 'HubSpot', 'Slack', 'Stripe', 'Postgres']"
      example-label="Lead-to-CRM automation"
      example-href="/work"
      cta-label="Start an Automation project →"
      cta-href="/contact"
      layout="default"
    />

    <ServiceDetailBlock
      anchor-id="tech-support"
      icon="🛟"
      title="Technical Support"
      :paragraphs="[
        'Ongoing maintenance, bug fixes, monitoring, and on-call dev help. Monthly retainers for teams that need a reliable second set of hands without a full-time hire.',
        'Common requests: fix a bug from your last contractor, monitor uptime, ship small features, troubleshoot integrations, and respond to alerts within business hours.',
        'Retainers come in 10/20/40-hour tiers. Unused hours roll over one month.',
      ]"
      audience="SMBs whose original developer disappeared, teams without an in-house engineer, and product owners who want bug-fixes faster than a freelancer marketplace can deliver."
      :deliverables="[
        'Monthly retainer (10 / 20 / 40 hrs)',
        'Slack channel for direct contact',
        'Uptime + error monitoring',
        'Bug fixes within agreed SLA',
        'Small feature work as time allows',
        'Monthly summary report',
      ]"
      :techs="['Sentry', 'UptimeRobot', 'GitHub Actions', 'Slack']"
      example-label="Internal tool ops support"
      example-href="/work"
      cta-label="Start a Support retainer →"
      cta-href="/contact"
      layout="reverse"
    />

    <!-- Process section -->
    <ProcessFlow />

    <!-- Closing CTA -->
    <CTASection
      headline="Not sure which fits? Let's talk."
      primary-label="Book a call"
      primary-href="/contact"
      variant="default"
    />
  </main>
</template>

<style scoped>
.services-hero { padding: 100px 0 40px; }
@media (max-width: 768px) {
  .services-hero { padding: 60px 0 20px; }
}
</style>
