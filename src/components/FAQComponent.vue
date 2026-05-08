<template>
  <section class="ja_section" id="faq">
    <div class="ja_faq">
      <div class="container">
        <div class="ja_main_title" data-align="center">
          <span>FAQ</span>
          <h3>Frequently Asked Questions</h3>
          <p>
            Quick answers for US businesses and international clients
          </p>
        </div>
        <div class="faq_wrapper">
          <div class="faq_list">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="faq_item"
              :class="{ active: activeIndex === index }"
            >
              <div
                class="faq_question"
                @click="toggleFaq(index)"
                role="button"
                :aria-expanded="activeIndex === index"
                :aria-controls="'faq-answer-' + index"
              >
                <h4>{{ faq.question }}</h4>
                <span class="faq_icon">
                  <svg v-if="activeIndex !== index" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14"/>
                  </svg>
                </span>
              </div>
              <div
                :id="'faq-answer-' + index"
                class="faq_answer"
                :style="{ maxHeight: activeIndex === index ? '500px' : '0' }"
              >
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>

          <div class="faq_cta">
            <h4>Still have questions?</h4>
            <p>Book a free 15-minute discovery call or send me a message</p>
            <div class="faq_buttons">
              <a href="#contact" class="btn-primary anchor" @click="trackCTA('faq_contact')">
                Send Message
              </a>
              <a href="#contact" class="btn-secondary anchor" @click="trackCTA('faq_call')">
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FAQComponent",
  data() {
    return {
      activeIndex: null,
      faqs: [
        {
          question: "What are your working hours for US clients?",
          answer: "I maintain flexible hours with significant overlap with US timezones. I'm typically available 8 PM - 4 AM PST (which is 9 AM - 5 PM in my timezone), covering US morning and afternoon hours. For urgent matters, I respond within 2-4 hours during US business days via Slack or email."
        },
        {
          question: "How much do your services cost?",
          answer: "N8N Automation workflows start at $300 up to $3,000+ depending on complexity. Web development projects start at $1,000 for simple sites up to $15,000+ for complex applications. Mobile apps range from $1,500-$10,000+. SEO services start at $750/month. VA services are $10-20/hour or $400-1,200/month on retainer. I provide detailed quotes after understanding your specific needs."
        },
        {
          question: "How long does a typical project take?",
          answer: "N8N automation workflows are typically delivered in 3-5 business days. Web development projects take 2-4 weeks depending on features. Mobile apps range from 4-8 weeks. I provide detailed timelines during our initial consultation and maintain consistent communication throughout."
        },
        {
          question: "Do you sign NDAs and contracts?",
          answer: "Absolutely! I'm happy to sign NDAs, work-for-hire agreements, and service contracts. I understand US business requirements for IP protection and confidentiality. I can work with your legal templates or provide my standard agreements for review."
        },
        {
          question: "What payment methods do you accept?",
          answer: "I accept PayPal, Wise (TransferWise), direct bank transfer, and can work through platforms like Upwork if you prefer escrow protection. All invoices are provided in USD for easy accounting. Typical terms are 50% upfront and 50% on completion for projects."
        },
        {
          question: "What if I'm not technical - can you still help?",
          answer: "Absolutely! Most of my clients aren't technical. I explain everything in plain English, provide documentation, and offer training on how to use what I build. My goal is to make technology work for you without you needing to understand the technical details."
        },
        {
          question: "Do you offer ongoing support after project completion?",
          answer: "Yes! I offer maintenance packages and ongoing support. This includes bug fixes, updates, feature additions, and general technical support. Many clients keep me on retainer for continuous improvements and VA support."
        },
        {
          question: "Can you work with my existing systems and tools?",
          answer: "Yes, I specialize in integrations. Whether you use Salesforce, HubSpot, Shopify, WordPress, or custom systems - I can connect them with N8N automation or build solutions that work with your current tech stack. I always start by understanding what you already have."
        }
      ]
    };
  },
  methods: {
    toggleFaq(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    trackCTA(ctaName) {
      if (window.trackCTAClick) {
        window.trackCTAClick(ctaName);
      }
    }
  }
};
</script>

<style scoped>
.ja_faq {
  padding: 100px 0;
  background: #f8f9fa;
}

.faq_wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.faq_list {
  margin-bottom: 50px;
}

.faq_item {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.faq_item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.faq_item.active {
  box-shadow: 0 4px 20px rgba(196, 30, 58, 0.15);
}

.faq_question {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.faq_question:hover {
  background: #fafafa;
}

.faq_question h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  padding-right: 20px;
}

.faq_icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.faq_item.active .faq_icon {
  background: #C41E3A;
  color: #fff;
}

.faq_answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq_answer p {
  padding: 0 24px 20px;
  margin: 0;
  color: #666;
  line-height: 1.7;
  font-size: 15px;
}

.faq_cta {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.faq_cta h4 {
  margin: 0 0 8px;
  font-size: 24px;
  color: #1a1a2e;
}

.faq_cta p {
  margin: 0 0 24px;
  color: #666;
}

.faq_buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #C41E3A;
  color: white;
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #8B0000;
  transform: translateY(-2px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid #1a1a2e;
  color: #1a1a2e;
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #1a1a2e;
  color: white;
}

/* Dark theme */
:global(body.dark) .ja_faq {
  background: #1a1a2e;
}

:global(body.dark) .faq_item {
  background: #252540;
}

:global(body.dark) .faq_question h4 {
  color: #fff;
}

:global(body.dark) .faq_question:hover {
  background: #2a2a45;
}

:global(body.dark) .faq_icon {
  background: #3a3a55;
}

:global(body.dark) .faq_answer p {
  color: #b0b0b0;
}

:global(body.dark) .faq_cta {
  background: #252540;
}

:global(body.dark) .faq_cta h4 {
  color: #fff;
}

:global(body.dark) .faq_cta p {
  color: #b0b0b0;
}

:global(body.dark) .btn-secondary {
  border-color: #fff;
  color: #fff;
}

:global(body.dark) .btn-secondary:hover {
  background: #fff;
  color: #1a1a2e;
}

/* Mobile */
@media (max-width: 768px) {
  .ja_faq {
    padding: 60px 0;
  }

  .faq_question h4 {
    font-size: 14px;
  }

  .faq_cta {
    padding: 30px 20px;
  }

  .faq_buttons {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
