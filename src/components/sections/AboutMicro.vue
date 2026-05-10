<script setup>
const portraitSrc = '/img/banner/avatar.png';
</script>

<template>
  <section class="ja_section about-micro" id="about-micro">
    <div class="container">
      <div class="about-micro__grid">
        <div class="about-micro__photo">
          <img :src="portraitSrc" alt="Jesrel Agang" loading="lazy" />
        </div>
        <div class="about-micro__text">
          <span class="about-micro__eyebrow">About</span>
          <h2 class="about-micro__headline">A one-person boutique agency, not a marketplace freelancer.</h2>
          <p>
            I'm Jesrel — eight years building software for SMBs in the USA, UK, and Australia. I take
            ownership of the work end-to-end: scope, build, ship, support.
          </p>
          <p>
            Most clients start with one service (web or N8N) and grow from there as they see what's possible.
            I'm small on purpose so the person you talk to is the person doing the work.
          </p>
          <p>
            <strong>Replies within 24 hours · USD payments · NDA-friendly.</strong>
          </p>
          <router-link to="/about" class="about-micro__link">More about me →</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-micro { padding: 80px 0; }
.about-micro__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 48px;
  align-items: center;
}
.about-micro__photo {
  aspect-ratio: 1 / 1.1;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e, #3d0d1a);
}
.about-micro__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.about-micro__eyebrow {
  display: inline-block;
  background: #fff;
  border: 1px solid #f3d0d6;
  color: #C41E3A;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 11px;
  border-radius: 999px;
  margin-bottom: 16px;
}
.about-micro__headline {
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 18px;
}
.about-micro__text p {
  font-size: 15px;
  color: #444;
  line-height: 1.65;
  margin: 0 0 14px;
}
.about-micro__link {
  display: inline-block;
  margin-top: 12px;
  color: #C41E3A;
  font-weight: 700;
  text-decoration: none;
}
.about-micro__link:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .about-micro__grid { grid-template-columns: 1fr; gap: 32px; }
  .about-micro__photo { max-width: 320px; margin: 0 auto; }
}
</style>
