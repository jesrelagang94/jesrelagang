<template>
  <div class="ja_section" id="service">
    <div class="ja_services">
      <div class="container">
        <div class="ja_main_title" data-align="center">
          <span>Services</span>
          <h3>What I Do for Clients</h3>
          <p>
            Comprehensive technical services from N8N automation to full-stack development and dedicated virtual assistant support
          </p>
        </div>
        <div class="service_list">
          <ul>
            <li
              class="wow fadeInLeft"
              data-wow-duration="1s"
              @click.prevent="active = 1"
            >
              <div class="list_inner tilt-effect">
                <span class="icon">
                  <img
                    class="svg"
                    src="/img/svg/service/anchor.svg"
                    alt="N8N Workflow Automation Icon"
                  />
                  <img
                    class="back"
                    :src="`/img/brushes/service${
                      dark ? '/dark' : ''
                    }/1.png`"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <div class="title">
                  <h3>N8N Workflow Automation</h3>
                  <span class="price">Contact for <span>Quote</span></span>
                </div>
                <div class="text">
                  <p>
                    Automate your business processes with powerful N8N workflows. From simple task automation to complex integrations, I build custom automation solutions that save time and eliminate repetitive work.
                  </p>
                </div>
                <a class="ja_full_link" href="#"></a>
                <img
                  class="popup_service_image"
                  src="/img/service/1.jpg"
                  alt="N8N workflow automation service"
                />
              </div>
            </li>
            <li
              class="wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              @click.prevent="active = 2"
            >
              <div class="list_inner tilt-effect">
                <span class="icon">
                  <img
                    class="svg"
                    src="/img/svg/service/physics.svg"
                    alt="Full-Stack Web Development Icon"
                  />
                  <img
                    class="back"
                    :src="`/img/brushes/service${
                      dark ? '/dark' : ''
                    }/2.png`"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <div class="title">
                  <h3>Full-Stack Web Development</h3>
                  <span class="price">Contact for <span>Quote</span></span>
                </div>
                <div class="text">
                  <p>
                    Complete web applications built with modern technologies. From responsive frontends to robust backends, I create scalable solutions tailored to your business needs using Vue.js, React, Node.js, and more.
                  </p>
                </div>
                <a class="ja_full_link" href="#"></a>
                <img
                  class="popup_service_image"
                  src="/img/service/2.jpg"
                  alt="Full-stack web development service"
                />
                <div class="service_hidden_details">
                  <div class="service_popup_informations">
                    <div class="descriptions">
                      <p>
                        Dizme is a leading web design agency with an
                        award-winning design team that creates innovative,
                        effective websites that capture your brand, improve your
                        conversion rates, and maximize your revenue to help grow
                        your business and achieve your goals.
                      </p>
                      <p>
                        In today’s digital world, your website is the first
                        interaction consumers have with your business. That's
                        why almost 95 percent of a user’s first impression
                        relates to web design. It’s also why web design services
                        can have an immense impact on your company’s bottom
                        line.
                      </p>
                      <p>
                        That’s why more companies are not only reevaluating
                        their website’s design but also partnering with Kura,
                        the web design agency that’s driven more than $2.4
                        billion in revenue for its clients. With over 50 web
                        design awards under our belt, we're confident we can
                        design a custom website that drives sales for your
                        unique business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              class="wow fadeInLeft"
              data-wow-duration="1s"
              @click.prevent="active = 3"
            >
              <div class="list_inner tilt-effect">
                <span class="icon">
                  <img
                    class="svg"
                    src="/img/svg/service/contact.svg"
                    alt="Mobile App Development Icon"
                  />
                  <img
                    class="back"
                    :src="`/img/brushes/service${
                      dark ? '/dark' : ''
                    }/3.png`"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <div class="title">
                  <h3>Mobile App Development</h3>
                  <span class="price">Contact for <span>Quote</span></span>
                </div>
                <div class="text">
                  <p>
                    Cross-platform mobile applications for iOS and Android. Build once, deploy everywhere with React Native or Flutter. Native-like performance with cost-effective development.
                  </p>
                </div>
                <a class="ja_full_link" href="#"></a>
                <img
                  class="popup_service_image"
                  src="/img/service/3.jpg"
                  alt="Cross-platform mobile app development for iOS and Android"
                />
                <div class="service_hidden_details">
                  <div class="service_popup_informations">
                    <div class="descriptions">
                      <p>
                        Dizme is a leading web design agency with an
                        award-winning design team that creates innovative,
                        effective websites that capture your brand, improve your
                        conversion rates, and maximize your revenue to help grow
                        your business and achieve your goals.
                      </p>
                      <p>
                        In today’s digital world, your website is the first
                        interaction consumers have with your business. That's
                        why almost 95 percent of a user’s first impression
                        relates to web design. It’s also why web design services
                        can have an immense impact on your company’s bottom
                        line.
                      </p>
                      <p>
                        That’s why more companies are not only reevaluating
                        their website’s design but also partnering with Kura,
                        the web design agency that’s driven more than $2.4
                        billion in revenue for its clients. With over 50 web
                        design awards under our belt, we're confident we can
                        design a custom website that drives sales for your
                        unique business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              class="wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              @click.prevent="active = 4"
            >
              <div class="list_inner tilt-effect">
                <span class="icon">
                  <img
                    class="svg"
                    src="/img/svg/service/web.svg"
                    alt="Virtual Assistant Services Icon"
                  />
                  <img
                    class="back"
                    :src="`/img/brushes/service${
                      dark ? '/dark' : ''
                    }/4.png`"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <div class="title">
                  <h3>Virtual Assistant Services</h3>
                  <span class="price">Contact for <span>Quote</span></span>
                </div>
                <div class="text">
                  <p>
                    Reliable technical and administrative support for your business. From managing workflows to handling technical tasks, I provide dedicated assistance to keep your operations running smoothly.
                  </p>
                </div>
                <a class="ja_full_link" href="#"></a>
                <img
                  class="popup_service_image"
                  src="/img/service/4.jpg"
                  alt="Technical virtual assistant services"
                />
                <div class="service_hidden_details">
                  <div class="service_popup_informations">
                    <div class="descriptions">
                      <p>
                        Dizme is a leading web design agency with an
                        award-winning design team that creates innovative,
                        effective websites that capture your brand, improve your
                        conversion rates, and maximize your revenue to help grow
                        your business and achieve your goals.
                      </p>
                      <p>
                        In today’s digital world, your website is the first
                        interaction consumers have with your business. That's
                        why almost 95 percent of a user’s first impression
                        relates to web design. It’s also why web design services
                        can have an immense impact on your company’s bottom
                        line.
                      </p>
                      <p>
                        That’s why more companies are not only reevaluating
                        their website’s design but also partnering with Kura,
                        the web design agency that’s driven more than $2.4
                        billion in revenue for its clients. With over 50 web
                        design awards under our belt, we're confident we can
                        design a custom website that drives sales for your
                        unique business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="brush_1 wow fadeInLeft" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/service/5.png" alt="" aria-hidden="true" />
      </div>
      <div class="brush_2 wow zoomIn" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/service/6.png" alt="" aria-hidden="true" />
      </div>
    </div>
  </div>
  <div :class="active == 1 ? '' : 'service_hidden_details'">
    <ModalBox :close="close">
      <div class="service_popup_informations">
        <div class="image">
          <img src="/img/thumbs/4-2.jpg" alt="N8N Workflow Automation Service" />
          <div
            class="main"
            data-img-url="img/service/1.jpg"
            style="background-image: url('img/service/1.jpg')"
            role="img"
            aria-label="N8N workflow automation dashboard"
          ></div>
        </div>
        <div class="main_title">
          <h3>N8N Workflow Automation</h3>
          <span class="price">Contact for <span>Quote</span></span>
        </div>
        <div class="descriptions">
          <p>
            Transform your business operations with intelligent N8N workflow automation. I specialize in building custom automation solutions that connect your tools, streamline processes, and eliminate time-consuming manual tasks.
          </p>
          <p>
            From simple automations like email notifications and data syncing to complex multi-step workflows involving APIs, databases, and third-party services—I create solutions tailored to your specific business needs.
          </p>
          <p>
            Whether you need CRM automation, lead management systems, data processing pipelines, or custom integrations between your favorite tools, I'll design and implement workflows that save hours of work every week and reduce human error to near zero.
          </p>
        </div>
      </div>
    </ModalBox>
  </div>
  <div :class="active == 2 ? '' : 'service_hidden_details'">
    <ModalBox :close="close">
      <div class="service_popup_informations">
        <div class="image">
          <img src="/img/thumbs/4-2.jpg" alt="Full-Stack Web Development Service" />
          <div
            class="main"
            data-img-url="img/service/2.jpg"
            style="background-image: url('img/service/2.jpg')"
            role="img"
            aria-label="Modern web development with Vue.js and React"
          ></div>
        </div>
        <div class="main_title">
          <h3>Full-Stack Web Development</h3>
          <span class="price">Contact for <span>Quote</span></span>
        </div>
        <div class="descriptions">
          <p>
            Building complete web applications from the ground up using modern technologies and best practices. I create responsive, scalable solutions that combine beautiful user interfaces with robust backend systems.
          </p>
          <p>
            My expertise spans the entire development stack: Vue.js, React, and Angular for dynamic frontends; Node.js, Express, and database design for powerful backends; and modern deployment practices for reliable hosting and maintenance.
          </p>
          <p>
            Whether you need a business website, e-commerce platform, SaaS application, or custom web tool, I deliver solutions that are fast, secure, maintainable, and built to scale with your business growth.
          </p>
        </div>
      </div>
    </ModalBox>
  </div>
  <div :class="active == 3 ? '' : 'service_hidden_details'">
    <ModalBox :close="close">
      <div class="service_popup_informations">
        <div class="image">
          <img src="/img/thumbs/4-2.jpg" alt="Mobile App Development Service" />
          <div
            class="main"
            data-img-url="img/service/3.jpg"
            style="background-image: url('img/service/3.jpg')"
            role="img"
            aria-label="Cross-platform mobile app development for iOS and Android"
          ></div>
        </div>
        <div class="main_title">
          <h3>Mobile App Development</h3>
          <span class="price">Contact for <span>Quote</span></span>
        </div>
        <div class="descriptions">
          <p>
            Create powerful mobile applications that work seamlessly on both iOS and Android devices using cross-platform technologies like React Native and Flutter. Build once, deploy everywhere—saving development time and costs.
          </p>
          <p>
            Your mobile app will deliver native-like performance and user experience while maintaining a single codebase. This approach reduces development time by up to 50% compared to building separate native apps, without sacrificing quality or functionality.
          </p>
          <p>
            From consumer apps and business tools to e-commerce solutions and internal utilities, I develop mobile applications with smooth animations, offline capabilities, push notifications, and seamless integration with your existing systems.
          </p>
        </div>
      </div>
    </ModalBox>
  </div>
  <div :class="active == 4 ? '' : 'service_hidden_details'">
    <ModalBox :close="close">
      <div class="service_popup_informations">
        <div class="image">
          <img src="/img/thumbs/4-2.jpg" alt="Virtual Assistant Services" />
          <div
            class="main"
            data-img-url="img/service/4.jpg"
            style="background-image: url('img/service/4.jpg')"
            role="img"
            aria-label="Professional technical virtual assistant services"
          ></div>
        </div>
        <div class="main_title">
          <h3>Virtual Assistant Services</h3>
          <span class="price">Contact for <span>Quote</span></span>
        </div>
        <div class="descriptions">
          <p>
            Dedicated virtual assistant support combining technical expertise with reliable administrative services. I help businesses streamline operations, manage workflows, and handle technical tasks so you can focus on growing your business.
          </p>
          <p>
            Services include workflow management, technical troubleshooting, system administration, data organization, research, email management, scheduling, and coordination. My technical background enables me to handle both administrative and tech-related tasks seamlessly.
          </p>
          <p>
            Whether you need ongoing daily support or project-based assistance, I provide consistent, professional service with quick turnaround times and proactive problem-solving to keep your operations running smoothly and efficiently.
          </p>
        </div>
      </div>
    </ModalBox>
  </div>
</template>

<script>
import ModalBox from "./popup/ModalBox.vue";
import VanillaTilt from "vanilla-tilt";
export default {
  name: "ServiceComponent",
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
      maxTilt: 6,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      speed: 500,
      transition: true,
    });
  },
  methods: {
    close() {
      this.active = 0;
    },
  },
  components: { ModalBox },
  props: {
    dark: { type: Boolean },
  },
};
</script>
