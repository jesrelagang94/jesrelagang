<script setup>
const steps = [
  {
    n: 1,
    title: 'Discovery call',
    desc: '30 min, free, no obligation. We talk through the problem and figure out fit.',
  },
  {
    n: 2,
    title: 'Proposal + estimate',
    desc: 'Fixed-fee or hourly, written scope, clear deliverables, agreed timeline.',
  },
  {
    n: 3,
    title: 'Build with weekly demos',
    desc: 'Async-first build with Slack and Loom updates. You see real progress every week.',
  },
  {
    n: 4,
    title: 'Launch + ongoing support',
    desc: 'Smooth handover at launch, plus optional retainer for monitoring and on-call dev help.',
  },
];
</script>

<template>
  <section class="ja_section process-flow" id="process">
    <div class="container">
      <div class="ja_main_title" data-align="center">
        <span>How we work</span>
        <h3>Four steps from hello to live</h3>
      </div>

      <ol class="process-flow__steps">
        <li v-for="s in steps" :key="s.n" class="process-flow__step">
          <div class="process-flow__num">{{ s.n }}</div>
          <h3 class="process-flow__title">{{ s.title }}</h3>
          <p class="process-flow__desc">{{ s.desc }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process-flow { padding: 80px 0; background: #fafaf8; scroll-margin-top: 80px; }

.process-flow__steps {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  position: relative;
}
.process-flow__steps::before {
  content: '';
  position: absolute;
  top: 22px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    #eaeaea 8%,
    #eaeaea 92%,
    transparent
  );
  z-index: 0;
}
.process-flow__step {
  position: relative;
  z-index: 1;
  text-align: center;
  background: #fafaf8;
  padding: 0 12px;
}
.process-flow__num {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #C41E3A;
  color: #C41E3A;
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.process-flow__title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 6px;
}
.process-flow__desc {
  font-size: 13px;
  color: #666;
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 900px) {
  .process-flow__steps { grid-template-columns: 1fr; gap: 24px; }
  .process-flow__steps::before { display: none; }
}
@media (max-width: 768px) {
  .process-flow { padding: 48px 0; }
}
</style>
