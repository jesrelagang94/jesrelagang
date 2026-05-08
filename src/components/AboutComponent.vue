<template>
  <section class="ja_section" id="about">
    <div class="ja_about">
      <div class="container">
        <div class="wrapper">
          <div class="left">
            <div class="image">
              <img
                src="/img/banner/avatar.png"
                alt="Professional photo of Jesrel Agang"
              />
              <div class="numbers year" aria-label="Years of professional experience">
                <div class="wrapper">
                  <h3>
                    <VueJsCounter end="8" aria-label="8"></VueJsCounter>+
                  </h3>
                  <span class="name">Years of<br />Experience</span>
                </div>
              </div>
              <div class="numbers project" aria-label="Total projects completed">
                <div class="wrapper">
                  <h3 style="display: flex">
                    <VueJsCounter as="span" end="35" aria-label="35"></VueJsCounter>+
                  </h3>
                  <span class="name">Projects<br />Completed</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="title wow fadeInUp" data-wow-duration="1s">
              <span>Trusted by US & International Businesses</span>
              <h2>N8N Automation + Web/Mobile Development + VA Services</h2>
            </div>
            <div class="text wow fadeInUp" data-wow-duration="1s">
              <p>
                Hello! I'm Jesrel Agang, serving clients in the USA, UK, Australia, and worldwide. I specialize in N8N workflow automation that saves businesses 15+ hours weekly, full-stack web and mobile development with Vue.js, React, and React Native, plus reliable technical VA support.
              </p>
              <p>
                <strong>Why US businesses choose me:</strong> Competitive rates (50-70% lower than US developers), significant timezone overlap for real-time collaboration, excellent English communication, and a proven track record with 35+ successful projects. I sign NDAs, accept USD payments, and deliver enterprise-quality work.
              </p>
            </div>
            <div class="ja_button wow fadeInUp" data-wow-duration="1s">
              <a class="anchor" href="#contact" aria-label="Contact me to hire for your project">
                <span>Hire Me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="brush_1 wow fadeInLeft" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/about/1.png" alt="" />
      </div>
      <div class="brush_2 wow fadeInRight" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/about/2.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import VueJsCounter from "vue-js-counter";
export default {
  name: "AboutComponent",
  components: { VueJsCounter },
  props: {
    dark: { type: Boolean },
  },
};
</script>
