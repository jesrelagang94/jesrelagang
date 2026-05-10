<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const year = new Date().getFullYear();

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const isActive = computed(() => (to) => route.path === to);
</script>

<template>
  <footer class="ja_section site-footer" role="contentinfo">
    <div class="container">
      <div class="site-footer__inner">
        <div class="site-footer__col">
          <h4>Quick links</h4>
          <ul>
            <li v-for="link in links" :key="link.to">
              <router-link :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="site-footer__col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:hello@jesrelagang.pro">hello@jesrelagang.pro</a>
            </li>
            <li>
              <a href="https://linkedin.com/in/jesrelagang" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/jesrelagang" target="_blank" rel="noopener">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div class="site-footer__col">
          <h4>Location</h4>
          <p>
            Based in Philippines<br />
            Serving USA, UK, Australia<br />
            <strong>Replies within 24 hours</strong>
          </p>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>&copy; {{ year }} Jesrel Agang. All rights reserved.</p>
        <ul>
          <li><router-link to="/contact">Terms &amp; Conditions</router-link></li>
          <li><router-link to="/contact">Privacy Policy</router-link></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 60px 0 30px !important;
  background: #fafaf8;
  border-top: 1px solid #eaeaea;
}
.site-footer__inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eaeaea;
}
.site-footer__col h4 {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.site-footer__col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.site-footer__col li {
  margin-bottom: 8px;
}
.site-footer__col a {
  color: #555;
  text-decoration: none;
  font-size: 14px;
  transition: color .15s ease;
}
.site-footer__col a:hover {
  color: #C41E3A;
}
.site-footer__col p {
  color: #555;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}
.site-footer__col p strong {
  color: #1a1a2e;
}
.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
}
.site-footer__bottom p {
  margin: 0;
  font-size: 13px;
  color: #666;
}
.site-footer__bottom ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}
.site-footer__bottom a {
  color: #666;
  text-decoration: none;
  font-size: 13px;
}
.site-footer__bottom a:hover {
  color: #C41E3A;
}

@media (max-width: 768px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .site-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
