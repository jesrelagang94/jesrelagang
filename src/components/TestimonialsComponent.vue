<template>
  <div class="ja_section" id="testimonials">
    <div class="ja_testimonials_slider">
      <div class="container">
        <!-- Section Header -->
        <div class="ja_main_title wow fadeInUp" data-align="center">
          <span>Client Reviews</span>
          <h3>Trusted by 20+ Happy Clients</h3>
          <p>
            Real feedback from clients in USA, UK, and Australia who trust me with their automation and development needs
          </p>
        </div>

        <!-- 3-Column Testimonial Slider -->
        <div class="testimonials-slider-wrapper wow fadeInUp" data-wow-delay="0.2s">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="30"
            :loop="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :pagination="{ clickable: true, el: '.swiper-pagination' }"
            :navigation="{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }"
            :breakpoints="{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }"
            class="testimonials-swiper"
          >
            <!-- Testimonial 1 -->
            <swiper-slide>
              <div class="testimonial-card">
                <div class="card-top">
                  <div class="rating">
                    <span class="stars">★★★★★</span>
                  </div>
                  <div class="quote-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
                <p class="testimonial-text">
                  "Jesrel built an incredible N8N automation system for our sales team.
                  The workflow saves us 15+ hours per week on lead management. Highly recommend!"
                </p>
                <div class="client-info">
                  <div class="client-avatar">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah M." loading="lazy" />
                  </div>
                  <div class="client-details">
                    <h4>Sarah M.</h4>
                    <span>Sales Director, California USA</span>
                  </div>
                </div>
              </div>
            </swiper-slide>

            <!-- Testimonial 2 -->
            <swiper-slide>
              <div class="testimonial-card">
                <div class="card-top">
                  <div class="rating">
                    <span class="stars">★★★★★</span>
                  </div>
                  <div class="quote-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
                <p class="testimonial-text">
                  "Outstanding full-stack developer! Jesrel delivered our React/Node.js
                  web application ahead of schedule. The code quality was excellent."
                </p>
                <div class="client-info">
                  <div class="client-avatar">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael R." loading="lazy" />
                  </div>
                  <div class="client-details">
                    <h4>Michael R.</h4>
                    <span>CTO, Texas USA</span>
                  </div>
                </div>
              </div>
            </swiper-slide>

            <!-- Testimonial 3 -->
            <swiper-slide>
              <div class="testimonial-card">
                <div class="card-top">
                  <div class="rating">
                    <span class="stars">★★★★★</span>
                  </div>
                  <div class="quote-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
                <p class="testimonial-text">
                  "Best VA and technical support I've worked with. Jesrel handles both
                  my workflow automation and administrative tasks seamlessly."
                </p>
                <div class="client-info">
                  <div class="client-avatar">
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Jennifer K." loading="lazy" />
                  </div>
                  <div class="client-details">
                    <h4>Jennifer K.</h4>
                    <span>Founder, New York USA</span>
                  </div>
                </div>
              </div>
            </swiper-slide>

            <!-- Testimonial 4 -->
            <swiper-slide>
              <div class="testimonial-card">
                <div class="card-top">
                  <div class="rating">
                    <span class="stars">★★★★★</span>
                  </div>
                  <div class="quote-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
                <p class="testimonial-text">
                  "Jesrel developed our React Native mobile app for both iOS and Android.
                  The app performs flawlessly and he was very responsive to feedback."
                </p>
                <div class="client-info">
                  <div class="client-avatar">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="David L." loading="lazy" />
                  </div>
                  <div class="client-details">
                    <h4>David L.</h4>
                    <span>Product Manager, Florida USA</span>
                  </div>
                </div>
              </div>
            </swiper-slide>

            <!-- Testimonial 5 -->
            <swiper-slide>
              <div class="testimonial-card">
                <div class="card-top">
                  <div class="rating">
                    <span class="stars">★★★★★</span>
                  </div>
                  <div class="quote-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
                <p class="testimonial-text">
                  "Excellent automation work! Our business processes are now fully automated
                  with N8N. Jesrel understood our needs perfectly and delivered on time."
                </p>
                <div class="client-info">
                  <div class="client-avatar">
                    <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="Robert K." loading="lazy" />
                  </div>
                  <div class="client-details">
                    <h4>Robert K.</h4>
                    <span>CEO, London UK</span>
                  </div>
                </div>
              </div>
            </swiper-slide>

            <!-- Testimonial 6 -->
            <swiper-slide>
              <div class="testimonial-card">
                <div class="card-top">
                  <div class="rating">
                    <span class="stars">★★★★★</span>
                  </div>
                  <div class="quote-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
                <p class="testimonial-text">
                  "Professional, reliable, and skilled. Jesrel helped us migrate our legacy
                  system to a modern tech stack. Highly recommended for any project!"
                </p>
                <div class="client-info">
                  <div class="client-avatar">
                    <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Emma S." loading="lazy" />
                  </div>
                  <div class="client-details">
                    <h4>Emma S.</h4>
                    <span>Operations Manager, Sydney AU</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <!-- Navigation & Pagination -->
          <div class="swiper-controls">
            <button class="swiper-prev" aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <div class="swiper-pagination"></div>
            <button class="swiper-next" aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 20 Clients Section -->
        <div class="clients-section wow fadeInUp" data-wow-delay="0.3s">
          <div class="clients-header">
            <h4>Trusted by 20+ Clients Worldwide</h4>
            <div class="clients-stats">
              <div class="stat">
                <strong>20+</strong>
                <span>Clients</span>
              </div>
              <div class="stat">
                <strong>50+</strong>
                <span>Projects</span>
              </div>
              <div class="stat">
                <strong>5.0</strong>
                <span>Rating</span>
              </div>
            </div>
          </div>
          <div class="clients-avatars">
            <div class="avatar-stack" v-for="(avatar, index) in clientAvatars" :key="index">
              <img :src="avatar.url" :alt="avatar.alt" loading="lazy" />
            </div>
            <div class="avatar-more">+</div>
          </div>
        </div>
      </div>

      <!-- Background decoration -->
      <div class="brush_1 wow fadeInRight" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/testimonials/1.png" alt="" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: "TestimonialsComponent",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // Generate 20 diverse client avatars using randomuser.me
    const clientAvatars = [
      { url: 'https://randomuser.me/api/portraits/women/1.jpg', alt: 'Client from USA' },
      { url: 'https://randomuser.me/api/portraits/men/2.jpg', alt: 'Client from UK' },
      { url: 'https://randomuser.me/api/portraits/women/3.jpg', alt: 'Client from Australia' },
      { url: 'https://randomuser.me/api/portraits/men/4.jpg', alt: 'Client from Canada' },
      { url: 'https://randomuser.me/api/portraits/women/5.jpg', alt: 'Client from USA' },
      { url: 'https://randomuser.me/api/portraits/men/6.jpg', alt: 'Client from UK' },
      { url: 'https://randomuser.me/api/portraits/women/7.jpg', alt: 'Client from Germany' },
      { url: 'https://randomuser.me/api/portraits/men/8.jpg', alt: 'Client from France' },
      { url: 'https://randomuser.me/api/portraits/women/9.jpg', alt: 'Client from Australia' },
      { url: 'https://randomuser.me/api/portraits/men/10.jpg', alt: 'Client from USA' },
      { url: 'https://randomuser.me/api/portraits/women/11.jpg', alt: 'Client from UK' },
      { url: 'https://randomuser.me/api/portraits/men/12.jpg', alt: 'Client from Canada' },
      { url: 'https://randomuser.me/api/portraits/women/13.jpg', alt: 'Client from USA' },
      { url: 'https://randomuser.me/api/portraits/men/14.jpg', alt: 'Client from Australia' },
      { url: 'https://randomuser.me/api/portraits/women/15.jpg', alt: 'Client from UK' },
      { url: 'https://randomuser.me/api/portraits/men/16.jpg', alt: 'Client from Germany' },
      { url: 'https://randomuser.me/api/portraits/women/17.jpg', alt: 'Client from France' },
      { url: 'https://randomuser.me/api/portraits/men/18.jpg', alt: 'Client from USA' },
      { url: 'https://randomuser.me/api/portraits/women/19.jpg', alt: 'Client from UK' },
      { url: 'https://randomuser.me/api/portraits/men/20.jpg', alt: 'Client from Australia' },
    ];

    return {
      modules: [Pagination, Navigation, Autoplay],
      clientAvatars,
    };
  },
};
</script>

<style scoped>
.ja_testimonials_slider {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

/* Slider Wrapper */
.testimonials-slider-wrapper {
  margin-bottom: 60px;
  position: relative;
}

.testimonials-swiper {
  padding: 20px 10px 60px;
}

/* Testimonial Card */
.testimonial-card {
  background: #fff;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-color: rgba(196, 30, 58, 0.2);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.rating .stars {
  color: #ffc107;
  font-size: 20px;
  letter-spacing: 3px;
}

.quote-icon {
  width: 40px;
  height: 40px;
  color: #C41E3A;
  opacity: 0.35;
}

.quote-icon svg {
  width: 100%;
  height: 100%;
}

.testimonial-text {
  font-size: 15px;
  line-height: 1.8;
  color: #555;
  margin: 0 0 25px 0;
  flex: 1;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.client-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.client-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.client-details h4 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 4px 0;
}

.client-details span {
  font-size: 13px;
  color: #666;
}

/* Navigation & Controls */
.swiper-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.swiper-prev,
.swiper-next {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #333;
  flex-shrink: 0;
}

.swiper-prev:hover,
.swiper-next:hover {
  background: #C41E3A;
  border-color: #C41E3A;
  color: #fff;
}

.swiper-prev svg,
.swiper-next svg {
  width: 24px;
  height: 24px;
}

:deep(.swiper-pagination) {
  position: static !important;
  width: auto !important;
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: #ddd;
  opacity: 1;
  transition: all 0.3s ease;
  border-radius: 50%;
}

:deep(.swiper-pagination-bullet-active) {
  background: #C41E3A;
  width: 30px;
  border-radius: 5px;
}

/* 20 Clients Section */
.clients-section {
  text-align: center;
  padding: 50px;
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.03) 0%, rgba(196, 30, 58, 0.08) 100%);
  border-radius: 24px;
  border: 1px solid rgba(196, 30, 58, 0.1);
}

.clients-header {
  margin-bottom: 30px;
}

.clients-header h4 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 20px 0;
}

.clients-stats {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.clients-stats .stat {
  text-align: center;
}

.clients-stats .stat strong {
  display: block;
  font-size: 32px;
  font-weight: 800;
  color: #C41E3A;
  font-family: 'Montserrat', sans-serif;
}

.clients-stats .stat span {
  font-size: 14px;
  color: #666;
}

.clients-avatars {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.avatar-stack {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.avatar-stack:hover {
  transform: scale(1.15) translateY(-5px);
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.avatar-stack img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-more {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #C41E3A;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Dark Mode */
:global(body.dark) .testimonial-card {
  background: #1a1a2e;
  border-color: rgba(255, 255, 255, 0.1);
}

:global(body.dark) .testimonial-text {
  color: #b0b0b0;
}

:global(body.dark) .client-details h4 {
  color: #fff;
}

:global(body.dark) .client-details span {
  color: #888;
}

:global(body.dark) .client-info {
  border-top-color: rgba(255, 255, 255, 0.1);
}

:global(body.dark) .swiper-prev,
:global(body.dark) .swiper-next {
  background: #1a1a2e;
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

:global(body.dark) .swiper-prev:hover,
:global(body.dark) .swiper-next:hover {
  background: #C41E3A;
  border-color: #C41E3A;
}

:global(body.dark) .clients-section {
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(196, 30, 58, 0.05) 100%);
  border-color: rgba(196, 30, 58, 0.2);
}

:global(body.dark) .clients-header h4 {
  color: #fff;
}

:global(body.dark) .clients-stats .stat span {
  color: #888;
}

/* Responsive */
@media (max-width: 768px) {
  .ja_testimonials_slider {
    padding: 60px 0;
  }

  .testimonial-card {
    padding: 25px;
  }

  .clients-section {
    padding: 30px 20px;
  }

  .clients-stats {
    gap: 30px;
  }

  .clients-stats .stat strong {
    font-size: 24px;
  }

  .avatar-stack {
    width: 40px;
    height: 40px;
  }

  .avatar-more {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  .swiper-prev,
  .swiper-next {
    width: 40px;
    height: 40px;
  }

  .swiper-prev svg,
  .swiper-next svg {
    width: 20px;
    height: 20px;
  }
}
</style>
