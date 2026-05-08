<template>
  <div class="ja_section" id="process">
    <div class="ja_process">
      <div class="container">
        <div class="list">
          <ul>
            <li class="wow fadeInUp" data-wow-duration="1s">
              <div class="list_inner">
                <div class="icon">
                  <span v-html="dark ? pixelPerfectDark : pixelPerfectLight">
                  </span>
                </div>
                <div class="title">
                  <h3>Automation First</h3>
                </div>
                <div class="text">
                  <p>
                    N8N workflow expertise that eliminates repetitive tasks and connects your tools seamlessly. Save hours every week with intelligent automation solutions tailored to your business processes.
                  </p>
                </div>
              </div>
            </li>
            <li
              class="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <div class="list_inner">
                <div class="icon">
                  <span v-html="dark ? highQualityDark : highQualityLight">
                  </span>
                </div>
                <div class="title">
                  <h3>Full-Stack Solutions</h3>
                </div>
                <div class="text">
                  <p>
                    Complete web and mobile applications built with modern technologies like Vue.js, React, and Node.js. Scalable, secure, and maintainable solutions designed to grow with your business.
                  </p>
                </div>
              </div>
            </li>
            <li
              class="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
            >
              <div class="list_inner">
                <div class="icon">
                  <span v-html="dark ? awesomeIdeaDark : awesomeIdeaLight">
                  </span>
                </div>
                <div class="title">
                  <h3>Dedicated Support</h3>
                </div>
                <div class="text">
                  <p>
                    Technical virtual assistant services combining development expertise with reliable administrative support. Keep your operations running smoothly with proactive problem-solving and consistent professional service.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  awesomeIdeaDark,
  awesomeIdeaLight,
  highQualityDark,
  highQualityLight,
  pixelPerfectDark,
  pixelPerfectLight,
} from "@/svg";
export default {
  name: "ProcessComponent",
  data() {
    return {
      pixelPerfectLight,
      highQualityDark,
      awesomeIdeaDark,
      pixelPerfectDark,
      awesomeIdeaLight,
      highQualityLight,
    };
  },
  components: {},
  props: {
    dark: { type: Boolean },
  },
};
</script>
