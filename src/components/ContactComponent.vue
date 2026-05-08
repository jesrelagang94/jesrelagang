<template>
  <section class="ja_section" id="contact">
    <div class="ja_contact">
      <div class="container">
        <div class="ja_main_title" data-align="center">
          <span>Get In Touch</span>
          <h2>Let's Work Together</h2>
          <p>
            Ready to automate your business, build your next app, or need reliable VA support?
            Fill out the form below and I'll get back to you within 24 hours.
          </p>
          <div class="contact_trust_badges">
            <span class="trust_item">
              <i class="icon-check"></i> Free Consultation
            </span>
            <span class="trust_item">
              <i class="icon-check"></i> 24hr Response
            </span>
            <span class="trust_item">
              <i class="icon-check"></i> No Obligation
            </span>
          </div>
        </div>
        <div class="contact_inner">
          <div class="left wow fadeInLeft" data-wow-duration="1s">
            <ul>
              <li>
                <div class="list_inner">
                  <div class="icon orangeBackground" aria-hidden="true">
                    <i class="icon-location orangeText"></i>
                  </div>
                  <div class="short">
                    <h3>Serving</h3>
                    <span>USA, UK, Australia & Worldwide</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="list_inner">
                  <div class="icon greenBackground" aria-hidden="true">
                    <i class="icon-mail-1 greenText"></i>
                  </div>
                  <div class="short">
                    <h3>Email</h3>
                    <span>
                      <a
                        href="mailto:jessautogarage@gmail.com"
                        aria-label="Send email to jessautogarage@gmail.com"
                      >
                        jessautogarage@gmail.com
                      </a>
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div class="list_inner">
                  <div class="icon purpleBackground" aria-hidden="true">
                    <i class="icon-clock purpleText"></i>
                  </div>
                  <div class="short">
                    <h3>Availability</h3>
                    <span>8PM-4AM PST (US Timezone Overlap)</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="list_inner">
                  <div class="icon" style="background: rgba(37, 99, 235, 0.1);" aria-hidden="true">
                    <i class="icon-linkedin" style="color: #2563eb;"></i>
                  </div>
                  <div class="short">
                    <h3>Let's Connect</h3>
                    <span>
                      <a href="https://linkedin.com/in/jesrelagang" target="_blank" rel="noopener" aria-label="Connect on LinkedIn">
                        LinkedIn Profile
                      </a>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="right wow fadeInRight" data-wow-duration="1s">
            <div class="fields">
              <form
                @submit.prevent="handleSubmit"
                class="contact_form"
                id="contact_form"
                autocomplete="on"
                aria-label="Contact form"
                novalidate
              >
                <!-- Success Message -->
                <div
                  v-if="formState.success"
                  class="returnmessage success"
                  role="alert"
                  aria-live="polite"
                >
                  <i class="icon-check" aria-hidden="true"></i>
                  <span>{{ formState.successMessage }}</span>
                </div>

                <!-- Error Messages -->
                <div
                  v-if="formState.error"
                  class="returnmessage error"
                  role="alert"
                  aria-live="polite"
                >
                  <i class="icon-cancel" aria-hidden="true"></i>
                  <span>{{ formState.errorMessage }}</span>
                  <ul v-if="formState.errors.length > 0" class="error-list">
                    <li v-for="(error, index) in formState.errors" :key="index">
                      {{ error }}
                    </li>
                  </ul>
                </div>

                <div class="input_list">
                  <ul>
                    <li>
                      <label for="name" class="sr-only">Your Name (required)</label>
                      <input
                        id="name"
                        v-model="formData.name"
                        name="name"
                        type="text"
                        placeholder="Your Name *"
                        autocomplete="name"
                        required
                        :aria-required="true"
                        :aria-invalid="fieldErrors.name ? 'true' : 'false'"
                        :class="{ 'input-error': fieldErrors.name }"
                        @blur="validateField('name')"
                        @input="clearFieldError('name')"
                      />
                      <span v-if="fieldErrors.name" class="field-error" role="alert">
                        {{ fieldErrors.name }}
                      </span>
                    </li>
                    <li>
                      <label for="email" class="sr-only">Your Email (required)</label>
                      <input
                        id="email"
                        v-model="formData.email"
                        name="email"
                        type="email"
                        placeholder="Your Email *"
                        autocomplete="email"
                        required
                        :aria-required="true"
                        :aria-invalid="fieldErrors.email ? 'true' : 'false'"
                        :class="{ 'input-error': fieldErrors.email }"
                        @blur="validateField('email')"
                        @input="clearFieldError('email')"
                      />
                      <span v-if="fieldErrors.email" class="field-error" role="alert">
                        {{ fieldErrors.email }}
                      </span>
                    </li>
                    <li>
                      <label for="phone" class="sr-only">Your Phone</label>
                      <input
                        id="phone"
                        v-model="formData.phone"
                        name="phone"
                        type="tel"
                        placeholder="Your Phone (Optional)"
                        autocomplete="tel"
                        :aria-required="false"
                      />
                    </li>
                    <li>
                      <label for="service" class="sr-only">Service Interested In</label>
                      <select
                        id="service"
                        v-model="formData.service"
                        name="service"
                        class="service-select"
                        required
                        :aria-required="true"
                        :aria-invalid="fieldErrors.service ? 'true' : 'false'"
                        :class="{ 'input-error': fieldErrors.service }"
                        @blur="validateField('service')"
                        @change="clearFieldError('service')"
                      >
                        <option value="">Select Service *</option>
                        <option value="N8N Automation">N8N Workflow Automation</option>
                        <option value="Full-Stack Development">Full-Stack Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="SEO Services">SEO Services</option>
                        <option value="Virtual Assistant">Virtual Assistant Services</option>
                        <option value="Multiple Services">Multiple Services</option>
                        <option value="Other">Other / Not Sure</option>
                      </select>
                      <span v-if="fieldErrors.service" class="field-error" role="alert">
                        {{ fieldErrors.service }}
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="message_area">
                  <label for="message" class="sr-only">Your Message (required)</label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    name="message"
                    placeholder="Tell me about your project or requirements *"
                    required
                    :aria-required="true"
                    :aria-invalid="fieldErrors.message ? 'true' : 'false'"
                    :class="{ 'input-error': fieldErrors.message }"
                    @blur="validateField('message')"
                    @input="clearFieldError('message')"
                  ></textarea>
                  <span v-if="fieldErrors.message" class="field-error" role="alert">
                    {{ fieldErrors.message }}
                  </span>
                </div>
                <div class="ja_button">
                  <button
                    id="send_message"
                    type="submit"
                    :disabled="formState.submitting"
                    :aria-label="formState.submitting ? 'Sending message...' : 'Submit contact form'"
                    :class="{ 'btn-loading': formState.submitting }"
                  >
                    <span v-if="!formState.submitting">Send Message</span>
                    <span v-else>
                      <i class="icon-spinner animate-spin" aria-hidden="true"></i>
                      Sending...
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="brush_2 wow fadeInRight" data-wow-duration="1s" aria-hidden="true">
            <img src="/img/brushes/contact/2.png" alt="" />
          </div>
        </div>
        <div class="ja_map wow fadeInUp" data-wow-duration="1s">
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                width="100%"
                height="375"
                id="gmap_canvas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31736.1038970038!2d125.13241531043222!3d6.128954017867045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79ff2b9a2e4dd%3A0x2d84417660079285!2sJesrel%20Agang%20%7C%20Web%20Developer%20%7C%20SEO%20%26%20CRM%20Automation%20%7C%20Virtual%20Assistant%20%7C%20Funnel%20Designer!5e0!3m2!1sen!2sph!4v1760838985618!5m2!1sen!2sph"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Map showing Jesrel Agang's business location"
                aria-label="Google map showing Jesrel Agang Web Developer office location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div class="brush_1 wow fadeInLeft" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/contact/1.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import { useToast } from '@/components/ui/Toast.vue';
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  isValidEmail,
  hasSpamIndicators,
  isRateLimited,
  isSuspiciousBrowser
} from '@/utils/security';

// PHP Mail API endpoint
const MAIL_API_URL = '/api/send-mail.php';

export default {
  name: "ContactComponent",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      },
      fieldErrors: {
        name: '',
        email: '',
        service: '',
        message: ''
      },
      formState: {
        submitting: false,
        success: false,
        error: false,
        successMessage: '',
        errorMessage: '',
        errors: []
      }
    };
  },
  methods: {
    validateField(fieldName) {
      this.fieldErrors[fieldName] = '';

      switch (fieldName) {
        case 'name':
          if (!this.formData.name.trim()) {
            this.fieldErrors.name = 'Name is required';
          } else if (this.formData.name.trim().length < 2) {
            this.fieldErrors.name = 'Name must be at least 2 characters';
          } else if (this.formData.name.trim().length > 100) {
            this.fieldErrors.name = 'Name is too long (max 100 characters)';
          }
          break;

        case 'email':
          if (!this.formData.email.trim()) {
            this.fieldErrors.email = 'Email is required';
          } else if (!this.isValidEmail(this.formData.email)) {
            this.fieldErrors.email = 'Please enter a valid email address';
          }
          break;

        case 'service':
          if (!this.formData.service) {
            this.fieldErrors.service = 'Please select a service';
          }
          break;

        case 'message':
          if (!this.formData.message.trim()) {
            this.fieldErrors.message = 'Message is required';
          } else if (this.formData.message.trim().length < 10) {
            this.fieldErrors.message = 'Message must be at least 10 characters';
          } else if (this.formData.message.trim().length > 5000) {
            this.fieldErrors.message = 'Message is too long (max 5000 characters)';
          }
          break;
      }

      return !this.fieldErrors[fieldName];
    },

    clearFieldError(fieldName) {
      this.fieldErrors[fieldName] = '';
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    validateForm() {
      let isValid = true;

      // Validate all required fields
      ['name', 'email', 'service', 'message'].forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });

      return isValid;
    },

    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      };
      this.fieldErrors = {
        name: '',
        email: '',
        service: '',
        message: ''
      };
    },

    async handleSubmit() {
      // Reset states
      this.formState.success = false;
      this.formState.error = false;
      this.formState.errors = [];

      // Security: Check for suspicious browser/bot
      if (isSuspiciousBrowser()) {
        this.formState.error = true;
        this.formState.errorMessage = 'Unable to submit form. Please try a different browser.';
        return;
      }

      // Security: Rate limiting (max 3 submissions per 5 minutes)
      if (isRateLimited('contact_form', 3, 300000)) {
        this.formState.error = true;
        this.formState.errorMessage = 'Too many submissions. Please wait a few minutes before trying again.';
        return;
      }

      // Validate form
      if (!this.validateForm()) {
        this.formState.error = true;
        this.formState.errorMessage = 'Please fix the errors above';
        this.scrollToError();
        return;
      }

      // Sanitize inputs
      const sanitizedName = sanitizeText(this.formData.name);
      const sanitizedEmail = sanitizeEmail(this.formData.email);
      const sanitizedPhone = sanitizePhone(this.formData.phone);
      const sanitizedMessage = sanitizeText(this.formData.message);
      const sanitizedService = sanitizeText(this.formData.service);

      // Security: Check for spam indicators
      if (hasSpamIndicators(sanitizedMessage) || hasSpamIndicators(sanitizedName)) {
        this.formState.error = true;
        this.formState.errorMessage = 'Your message appears to contain spam. Please revise and try again.';
        return;
      }

      // Security: Validate email format again after sanitization
      if (!isValidEmail(sanitizedEmail)) {
        this.formState.error = true;
        this.formState.errorMessage = 'Please enter a valid email address.';
        return;
      }

      // Set submitting state
      this.formState.submitting = true;

      try {
        // Send to PHP mail API
        const response = await fetch(MAIL_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: sanitizedName,
            email: sanitizedEmail,
            phone: sanitizedPhone || '',
            service: sanitizedService,
            message: sanitizedMessage
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Success
          this.formState.success = true;
          this.formState.successMessage = result.message || 'Thank you! Your message has been sent. I\'ll get back to you within 24 hours.';
          this.resetForm();
          this.scrollToMessage();

          // Show toast notification
          const toast = useToast();
          toast.success('Message sent successfully! I\'ll get back to you within 24 hours.');

          // Track event in GA4
          if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_lead', {
              event_category: 'contact',
              event_label: sanitizedService,
              value: 1
            });
          }

          // Hide success message after 10 seconds
          setTimeout(() => {
            this.formState.success = false;
          }, 10000);
        } else {
          // API returned an error
          throw new Error(result.message || 'Failed to send message');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        this.formState.error = true;
        this.formState.errorMessage = error.message || 'Something went wrong. Please try again or email me directly.';
        this.scrollToMessage();

        // Show error toast
        const toast = useToast();
        toast.error('Failed to send message. Please try again or email directly.');
      } finally {
        this.formState.submitting = false;
      }
    },

    scrollToMessage() {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    scrollToError() {
      const firstError = document.querySelector('.input-error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
};
</script>

<style scoped>
/* Contact Trust Badges */
.contact_trust_badges {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.contact_trust_badges .trust_item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #1cbe59;
  font-weight: 500;
}

.contact_trust_badges .trust_item i {
  font-size: 16px;
}

/* Success and Error Messages */
.returnmessage {
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  animation: slideDown 0.3s ease-out;
}

.returnmessage.success {
  background: #d4edda;
  border: 1px solid #1cbe59;
  color: #155724;
}

.returnmessage.error {
  background: #f8d7da;
  border: 1px solid #C41E3A;
  color: #721c24;
}

.returnmessage i {
  font-size: 20px;
  flex-shrink: 0;
}

.error-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 32px;
}

.error-list li {
  padding: 5px 0;
  font-size: 14px;
}

/* Field Errors */
.field-error {
  display: block;
  color: #C41E3A;
  font-size: 13px;
  margin-top: 5px;
  animation: fadeIn 0.2s ease-out;
}

.input-error {
  border-color: #C41E3A !important;
  background-color: #fff5f5 !important;
}

/* Button Loading State */
.btn-loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
