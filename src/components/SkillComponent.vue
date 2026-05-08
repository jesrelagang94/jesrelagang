<template>
  <div class="ja_section">
    <div class="ja_skills">
      <div class="container">
        <div class="wrapper">
          <div class="left">
            <div
              class="ja_main_title wow fadeInUp"
              data-wow-duration="1s"
              data-align="left"
            >
              <span>Why Choose Me</span>
              <h3>What Makes Me Different</h3>
              <p>
                A unique combination of technical expertise and reliable support that delivers complete solutions for your business
              </p>
            </div>
            <div class="why_choose_list wow fadeInUp" data-wow-duration="1s">
              <div class="why_choose_item">
                <div class="icon_wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#C41E3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#C41E3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#C41E3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="content">
                  <h4>Triple Threat Expertise</h4>
                  <p>N8N automation specialist + Full-stack developer + Technical VA. Three services, one reliable professional—no need to coordinate multiple freelancers.</p>
                </div>
              </div>

              <div class="why_choose_item">
                <div class="icon_wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#1cbe59" stroke-width="2"/>
                    <path d="M12 6V12L16 14" stroke="#1cbe59" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="content">
                  <h4>Fast Turnaround Time</h4>
                  <p>Dedicated focus on your projects with quick response times. Most automation workflows delivered within 3-5 days, web projects within 2-3 weeks depending on complexity.</p>
                </div>
              </div>

              <div class="why_choose_item">
                <div class="icon_wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#8067f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="#8067f0" stroke-width="2"/>
                  </svg>
                </div>
                <div class="content">
                  <h4>Proven Track Record</h4>
                  <p>5+ years of experience with 100+ completed projects. Real solutions that work, not just templates—every project is customized to your specific business needs.</p>
                </div>
              </div>

              <div class="why_choose_item">
                <div class="icon_wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#C41E3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="#C41E3A" stroke-width="2"/>
                    <path d="M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15H18" stroke="#C41E3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="content">
                  <h4>Long-Term Partnership</h4>
                  <p>Not just a one-time developer—I provide ongoing support, maintenance, and VA services. Your success is my success, so I'm invested in your long-term growth.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <img :src="`/img/skills/${dark ? 2 : 1}.jpg`" alt="Jesrel Agang working on automation and web development projects" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillComponent",
  components: {},
  props: {
    dark: { type: Boolean },
  },
};
</script>
