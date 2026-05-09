<template>
  <div class="ja_all_wrap" data-magic-cursor="show">
    <MobileHeaderVue dark />
    <HeaderVue dark />
    <main id="main-content">
    <HomeComponent dark />
    <!-- HERO -->

    <!-- PROCESS -->
    <ProcessComponent dark />
    <!-- /PROCESS -->

    <!-- ABOUT -->
    <AboutComponent dark />
    <!-- /ABOUT -->

    <!-- PORTFOLIO -->
    <PortfolioComponent />
    <!-- /PORTFOLIO -->

    <!-- SKILLS -->
    <SkillComponent dark />
    <!-- /SKILLS -->

    <!-- SERVICES -->
    <ServiceComponent dark />
    <!-- /SERVICES -->

    <!-- TESTIMONIALS -->
    <TestimonialsComponent />
    <!-- /TESTIMONIALS -->

    <!-- FAQ -->
    <FAQComponent />
    <!-- /FAQ -->

    <!-- CONTACT -->
    <ContactComponent />
    <!-- /CONTACT -->

    <!-- COPYRIGHT -->
    <CopyrightComponent />
    <!-- /COPYRIGHT -->
    </main>
    <ScrollTopVue />
  </div>
</template>

<script>
import { useHead } from "@vueuse/head";
import HeaderVue from "@/components/layout/Header.vue";
import MobileHeaderVue from "@/components/layout/MobileHeader.vue";
import ScrollTopVue from "@/components/layout/ScrollTop.vue";
import { activeSkillProgress } from "@/utils/dom-effects";
import AboutComponent from "../components/AboutComponent.vue";
import ContactComponent from "../components/ContactComponent.vue";
import CopyrightComponent from "../components/CopyrightComponent.vue";
import HomeComponent from "../components/HomeComponent.vue";
import PortfolioComponent from "../components/PortfolioComponent.vue";
import ProcessComponent from "../components/ProcessComponent.vue";
import ServiceComponent from "../components/ServiceComponent.vue";
import SkillComponent from "../components/SkillComponent.vue";
import TestimonialsComponent from "../components/TestimonialsComponent.vue";
import FAQComponent from "../components/FAQComponent.vue";
export default {
  name: "IndexViewDark",
  components: {
    HomeComponent,
    ProcessComponent,
    AboutComponent,
    PortfolioComponent,
    SkillComponent,
    ServiceComponent,
    TestimonialsComponent,
    FAQComponent,
    CopyrightComponent,
    ContactComponent,
    ScrollTopVue,
    MobileHeaderVue,
    HeaderVue,
  },
  setup() {
    useHead({
      title: 'Jesrel Agang - Full-Stack Developer Portfolio | Dark Mode',
      meta: [
        {
          name: 'description',
          content: 'Full-stack developer from Philippines specializing in Vue.js, React, Node.js, and modern web technologies. View my portfolio of web applications and projects (Dark Mode).'
        },
        {
          name: 'robots',
          content: 'noindex, follow'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://jesrelagang.pro/'
        }
      ]
    });
  },
  mounted() {
    window.addEventListener("scroll", activeSkillProgress);
    document.querySelector("body").classList.add("dark");
  },
};
</script>
