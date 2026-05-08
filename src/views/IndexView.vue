<template>
  <div class="ja_all_wrap" data-magic-cursor="show">
    <MobileHeaderVue />
    <HeaderVue />
    <main id="main-content">
    <HomeComponent />
    <!-- HERO -->

    <!-- PROCESS -->
    <ProcessComponent />
    <!-- /PROCESS -->

    <!-- ABOUT -->
    <AboutComponent />
    <!-- /ABOUT -->

    <!-- PORTFOLIO -->
    <PortfolioComponent />
    <!-- /PORTFOLIO -->

    <!-- SKILLS -->
    <SkillComponent />
    <!-- /SKILLS -->

    <!-- SERVICES -->
    <ServiceComponent />
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
    <FloatingCTA />
  </div>
</template>

<script>
import { useHead } from "@vueuse/head";
import HeaderVue from "@/components/layout/Header.vue";
import MobileHeaderVue from "@/components/layout/MobileHeader.vue";
import ScrollTopVue from "@/components/layout/ScrollTop.vue";
import { activeSkillProgress } from "@/utilits";
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
import FloatingCTA from "../components/FloatingCTA.vue";

export default {
  name: "IndexView",
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
    HeaderVue,
    MobileHeaderVue,
    ScrollTopVue,
    FloatingCTA,
  },
  setup() {
    useHead({
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
  },
};
</script>
