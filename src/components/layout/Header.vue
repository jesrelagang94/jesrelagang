<template>
  <header class="ja_header" role="banner">
    <div class="container">
      <div class="inner">
        <div class="logo">
          <a href="#" aria-label="CodersLab - Full-Stack Developer Homepage">
            <img
              :src="`img/logo/${dark ? 'dark' : 'logo'}.png`"
              :alt="dark ? 'CodersLab Logo - Dark Version' : 'CodersLab Logo'"
            />
          </a>
        </div>
        <nav class="menu" role="navigation" aria-label="Main navigation">
          <ul class="anchor_nav">
            <li class="current">
              <a href="#home" aria-label="Navigate to Home section" aria-current="page">Home</a>
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
  </header>
</template>

<script>
export default {
  name: "HeaderVue",
  props: {
    dark: { type: Boolean },
  },
};
</script>
