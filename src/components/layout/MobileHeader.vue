<template>
  <div class="ja_mobile_menu">
    <div class="mobile_menu_inner">
      <div class="mobile_in">
        <div class="logo">
          <a href="#" aria-label="CodersLab - Full-Stack Developer Homepage">
            <img
              :src="`img/logo/${dark ? 'dark' : 'logo'}.png`"
              :alt="dark ? 'CodersLab Logo - Dark Version' : 'CodersLab Logo'"
            />
          </a>
        </div>
        <button
          class="trigger"
          @click="activeToggle()"
          :aria-expanded="active.toString()"
          aria-controls="mobile-menu-dropdown"
          aria-label="Toggle mobile navigation menu"
        >
          <div
            class="hamburger hamburger--slider"
            :class="active ? 'is-active' : ''"
          >
            <div class="hamburger-box">
              <div class="hamburger-inner"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
    <div
      id="mobile-menu-dropdown"
      class="dropdown"
      :style="{ display: active ? 'block' : 'none' }"
      :aria-hidden="(!active).toString()"
      role="navigation"
      aria-label="Mobile navigation menu"
    >
      <div class="dropdown_inner">
        <nav>
          <ul class="anchor_nav">
            <li class="current">
              <a href="#home" aria-current="page" aria-label="Navigate to Home section">Home</a>
            </li>
            <li>
              <a href="#about" aria-label="Navigate to About section">About</a>
            </li>
            <li>
              <a href="#portfolio" aria-label="Navigate to Portfolio section">Portfolio</a>
            </li>
            <li>
              <a href="#service" aria-label="Navigate to Services section">Services</a>
            </li>
            <li>
              <a href="#contact" aria-label="Navigate to Contact section">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileHeader",
  data() {
    return {
      active: false,
    };
  },
  methods: {
    activeToggle() {
      this.active = !this.active;
    },
  },
  props: {
    dark: { type: Boolean },
  },
};
</script>
