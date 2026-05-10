<script setup>
defineProps({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: '' },
  location: { type: String, default: '' },
  avatarSrc: { type: String, default: '' },
  // 'default' (white bg) or 'alt' (surface bg)
  variant: { type: String, default: 'default' },
});
</script>

<template>
  <section :class="['ja_section', 'featured-testimonial', `featured-testimonial--${variant}`]">
    <div class="container">
      <div class="featured-testimonial__inner">
        <div class="featured-testimonial__stars" aria-hidden="true">★★★★★</div>
        <blockquote class="featured-testimonial__quote">
          <p>&ldquo;{{ quote }}&rdquo;</p>
        </blockquote>
        <div class="featured-testimonial__attribution">
          <img
            v-if="avatarSrc"
            :src="avatarSrc"
            :alt="`${name} avatar`"
            class="featured-testimonial__avatar"
            loading="lazy"
          />
          <div>
            <strong>{{ name }}</strong>
            <span v-if="role || location">
              {{ role }}<span v-if="role && location">, </span>{{ location }}
            </span>
          </div>
        </div>
        <div class="featured-testimonial__more">
          <router-link to="/work">Read more reviews →</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-testimonial { padding: 80px 0; }
.featured-testimonial--default { background: #fff; }
.featured-testimonial--alt { background: #fafaf8; }

.featured-testimonial__inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.featured-testimonial__stars {
  color: #ffc107;
  font-size: 24px;
  letter-spacing: 4px;
  margin-bottom: 20px;
}
.featured-testimonial__quote {
  margin: 0 0 28px;
  border: none;
  padding: 0;
}
.featured-testimonial__quote p {
  font-size: clamp(20px, 2.6vw, 26px);
  line-height: 1.45;
  color: #1a1a2e;
  font-weight: 500;
  margin: 0;
}
.featured-testimonial__attribution {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 24px;
}
.featured-testimonial__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, .1);
}
.featured-testimonial__attribution strong {
  display: block;
  font-size: 15px;
  color: #1a1a2e;
  font-weight: 700;
}
.featured-testimonial__attribution span {
  display: block;
  font-size: 13px;
  color: #666;
  margin-top: 2px;
}
.featured-testimonial__more a {
  font-size: 13px;
  color: #C41E3A;
  font-weight: 600;
  text-decoration: none;
}
.featured-testimonial__more a:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .featured-testimonial { padding: 48px 0; }
}
</style>
