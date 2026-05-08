# Privacy & GDPR Compliance Guide
**Project:** Jesrel Agang Portfolio
**Last Updated:** 2025-10-09
**Compliance:** GDPR, CCPA, Privacy Shield

---

## Privacy Policy Template

Below is a template privacy policy that should be implemented as a dedicated page on the portfolio website.

### Recommended Implementation

Create file: `src/views/PrivacyView.vue`

```vue
<template>
  <div class="privacy-policy">
    <div class="container">
      <h1>Privacy Policy</h1>
      <p class="last-updated">Last Updated: October 9, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Jesrel Agang ("we," "our," or "us") respects your privacy and is committed to protecting
          your personal data. This privacy policy explains how we collect, use, and protect your
          information when you visit our portfolio website.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <ul>
          <li><strong>Contact Form Data:</strong> Name, email address, phone number (optional), subject, and message</li>
          <li><strong>Purpose:</strong> To respond to your inquiries and communicate with you</li>
          <li><strong>Legal Basis:</strong> Legitimate interest (responding to contact requests)</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <ul>
          <li><strong>Technical Data:</strong> IP address, browser type, device information, referring page</li>
          <li><strong>Purpose:</strong> Website functionality and security</li>
          <li><strong>Legal Basis:</strong> Legitimate interest (website operation and security)</li>
        </ul>

        <h3>2.3 Third-Party Services</h3>
        <ul>
          <li><strong>Google Maps:</strong> May collect location data and usage information</li>
          <li><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy">Google Privacy Policy</a></li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>Respond to your contact form submissions</li>
          <li>Communicate regarding business inquiries</li>
          <li>Improve website functionality and user experience</li>
          <li>Detect and prevent security incidents</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Retention</h2>
        <p>
          <strong>Contact Form Data:</strong> We retain your contact information for 2 years from the date
          of submission, or until you request deletion, whichever comes first.
        </p>
        <p>
          <strong>Technical Logs:</strong> Server logs are retained for 90 days for security purposes.
        </p>
      </section>

      <section>
        <h2>5. Data Sharing and Disclosure</h2>
        <p>We do not sell, rent, or trade your personal information. We may share data only in these circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> Email hosting, website hosting (with data processing agreements)</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
        </ul>
      </section>

      <section>
        <h2>6. Your Rights (GDPR)</h2>
        <p>Under GDPR, you have the following rights:</p>
        <ul>
          <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
          <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
          <li><strong>Right to Restriction:</strong> Request limitation of processing</li>
          <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
          <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise these rights, contact us at: <a href="mailto:privacy@jesrelagang.com">privacy@jesrelagang.com</a>
        </p>
      </section>

      <section>
        <h2>7. Data Security</h2>
        <p>We implement appropriate security measures to protect your data:</p>
        <ul>
          <li>HTTPS encryption for data transmission</li>
          <li>Secure hosting infrastructure</li>
          <li>Input validation and sanitization</li>
          <li>Regular security audits and updates</li>
          <li>Access controls and authentication</li>
        </ul>
        <p>
          However, no method of transmission over the internet is 100% secure. We cannot guarantee
          absolute security but strive to use commercially acceptable means to protect your data.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          This website uses only essential cookies necessary for basic functionality. We do not use
          tracking cookies or analytics cookies without your consent.
        </p>
        <p><strong>Essential Cookies:</strong> Session cookies for form submission and security</p>
        <p>
          You can control cookies through your browser settings. Disabling cookies may affect
          website functionality.
        </p>
      </section>

      <section>
        <h2>9. International Data Transfers</h2>
        <p>
          Your data may be transferred to and processed in countries outside your jurisdiction.
          We ensure appropriate safeguards are in place, including:
        </p>
        <ul>
          <li>Standard Contractual Clauses (SCCs) with service providers</li>
          <li>Hosting providers with GDPR compliance certifications</li>
          <li>Privacy Shield certification (where applicable)</li>
        </ul>
      </section>

      <section>
        <h2>10. Children's Privacy</h2>
        <p>
          This website is not intended for children under 16 years of age. We do not knowingly
          collect personal information from children. If you believe we have collected data from
          a child, please contact us immediately.
        </p>
      </section>

      <section>
        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this privacy policy periodically. Changes will be posted on this page with
          an updated "Last Updated" date. Significant changes will be communicated via email or
          prominent website notice.
        </p>
      </section>

      <section>
        <h2>12. Contact Information</h2>
        <p>For privacy-related questions or to exercise your rights, contact:</p>
        <address>
          <strong>Jesrel Agang</strong><br>
          Email: <a href="mailto:privacy@jesrelagang.com">privacy@jesrelagang.com</a><br>
          Response Time: Within 30 days (as required by GDPR)
        </address>
      </section>

      <section>
        <h2>13. Supervisory Authority</h2>
        <p>
          If you are located in the European Economic Area (EEA), you have the right to lodge a
          complaint with your local data protection authority.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyView',
  metaInfo: {
    title: 'Privacy Policy - Jesrel Agang Portfolio',
    meta: [
      {
        name: 'description',
        content: 'Privacy policy for Jesrel Agang portfolio website, including GDPR compliance information'
      },
      { name: 'robots', content: 'index, follow' }
    ]
  }
}
</script>

<style scoped>
.privacy-policy {
  padding: 80px 0;
  max-width: 900px;
  margin: 0 auto;
}

.privacy-policy h1 {
  margin-bottom: 10px;
}

.last-updated {
  color: #666;
  font-style: italic;
  margin-bottom: 40px;
}

.privacy-policy section {
  margin-bottom: 40px;
}

.privacy-policy h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.privacy-policy h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.privacy-policy ul {
  margin-left: 20px;
  line-height: 1.8;
}

.privacy-policy a {
  color: #007bff;
  text-decoration: none;
}

.privacy-policy a:hover {
  text-decoration: underline;
}

address {
  font-style: normal;
  line-height: 1.8;
}
</style>
```

---

## Terms of Service Template

Create file: `src/views/TermsView.vue`

```vue
<template>
  <div class="terms-of-service">
    <div class="container">
      <h1>Terms of Service</h1>
      <p class="last-updated">Last Updated: October 9, 2025</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this portfolio website ("Site"), you accept and agree to be bound
          by these Terms of Service. If you do not agree, please do not use this Site.
        </p>
      </section>

      <section>
        <h2>2. Use of Website</h2>
        <h3>2.1 Permitted Use</h3>
        <p>You may use this Site for:</p>
        <ul>
          <li>Viewing portfolio work and information</li>
          <li>Contacting me for business inquiries</li>
          <li>Personal reference and inspiration</li>
        </ul>

        <h3>2.2 Prohibited Use</h3>
        <p>You may not:</p>
        <ul>
          <li>Copy, reproduce, or distribute content without permission</li>
          <li>Use automated systems (bots, scrapers) to access the Site</li>
          <li>Attempt to gain unauthorized access to any portion of the Site</li>
          <li>Submit spam, malicious code, or harmful content</li>
          <li>Impersonate me or misrepresent your affiliation</li>
          <li>Use the Site for illegal purposes</li>
        </ul>
      </section>

      <section>
        <h2>3. Intellectual Property</h2>
        <h3>3.1 Ownership</h3>
        <p>
          All content on this Site, including but not limited to text, graphics, logos, images,
          code, and design, is the property of Jesrel Agang or licensed content providers and is
          protected by copyright, trademark, and other intellectual property laws.
        </p>

        <h3>3.2 Portfolio Work</h3>
        <p>
          Work displayed in the portfolio may belong to third parties (clients). These works are
          shown with permission for demonstration purposes only and may not be reproduced without
          explicit authorization.
        </p>

        <h3>3.3 Limited License</h3>
        <p>
          You are granted a limited, non-exclusive, non-transferable license to view and use the
          Site for personal purposes. This license does not include the right to download, copy,
          or modify any content.
        </p>
      </section>

      <section>
        <h2>4. Contact Form & Communications</h2>
        <h3>4.1 Submission</h3>
        <p>
          By submitting information through the contact form, you grant me permission to use that
          information to respond to your inquiry and maintain records of our communication.
        </p>

        <h3>4.2 Accuracy</h3>
        <p>
          You represent that all information submitted is accurate and that you have the authority
          to submit such information.
        </p>

        <h3>4.3 Response Time</h3>
        <p>
          While I strive to respond promptly, I do not guarantee response times or that all
          inquiries will receive a response.
        </p>
      </section>

      <section>
        <h2>5. Third-Party Services</h2>
        <p>
          This Site may contain links to or embed content from third-party websites and services
          (e.g., Google Maps). I am not responsible for the content, privacy practices, or terms
          of service of these third parties.
        </p>
      </section>

      <section>
        <h2>6. Disclaimer of Warranties</h2>
        <p>
          This Site is provided "as is" and "as available" without warranties of any kind, either
          express or implied, including but not limited to:
        </p>
        <ul>
          <li>Implied warranties of merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Non-infringement</li>
          <li>Accuracy or reliability of information</li>
          <li>Uninterrupted or error-free operation</li>
        </ul>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Jesrel Agang shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, including but not
          limited to loss of profits, data, or business opportunities arising from:
        </p>
        <ul>
          <li>Use or inability to use the Site</li>
          <li>Unauthorized access to or alteration of your transmissions or data</li>
          <li>Third-party conduct or content</li>
          <li>Any other matter relating to the Site</li>
        </ul>
      </section>

      <section>
        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Jesrel Agang from any claims, damages, losses,
          liabilities, and expenses (including legal fees) arising from:
        </p>
        <ul>
          <li>Your use of the Site</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another party</li>
        </ul>
      </section>

      <section>
        <h2>9. Modifications</h2>
        <p>
          I reserve the right to modify or discontinue the Site at any time without notice. I may
          also update these Terms periodically. Continued use of the Site after changes constitutes
          acceptance of the modified Terms.
        </p>
      </section>

      <section>
        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the
          Philippines, without regard to conflict of law principles.
        </p>
      </section>

      <section>
        <h2>11. Dispute Resolution</h2>
        <p>
          Any disputes arising from these Terms or use of the Site shall be resolved through:
        </p>
        <ol>
          <li>Good faith negotiation</li>
          <li>Mediation (if negotiation fails)</li>
          <li>Binding arbitration or courts of competent jurisdiction in the Philippines</li>
        </ol>
      </section>

      <section>
        <h2>12. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable or invalid, that provision
          shall be limited or eliminated to the minimum extent necessary, and the remaining
          provisions shall remain in full force.
        </p>
      </section>

      <section>
        <h2>13. Contact</h2>
        <p>For questions about these Terms, contact:</p>
        <address>
          <strong>Jesrel Agang</strong><br>
          Email: <a href="mailto:legal@jesrelagang.com">legal@jesrelagang.com</a>
        </address>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsView',
  metaInfo: {
    title: 'Terms of Service - Jesrel Agang Portfolio',
    meta: [
      {
        name: 'description',
        content: 'Terms of service for Jesrel Agang portfolio website'
      },
      { name: 'robots', content: 'index, follow' }
    ]
  }
}
</script>

<style scoped>
/* Same styles as PrivacyView */
.terms-of-service {
  padding: 80px 0;
  max-width: 900px;
  margin: 0 auto;
}

.terms-of-service h1 {
  margin-bottom: 10px;
}

.last-updated {
  color: #666;
  font-style: italic;
  margin-bottom: 40px;
}

.terms-of-service section {
  margin-bottom: 40px;
}

.terms-of-service h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.terms-of-service h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.terms-of-service ul,
.terms-of-service ol {
  margin-left: 20px;
  line-height: 1.8;
}

.terms-of-service a {
  color: #007bff;
  text-decoration: none;
}

.terms-of-service a:hover {
  text-decoration: underline;
}

address {
  font-style: normal;
  line-height: 1.8;
}
</style>
```

---

## Implementation Steps

### 1. Add Routes

Update `src/router/index.js`:

```javascript
import PrivacyView from '../views/PrivacyView.vue'
import TermsView from '../views/TermsView.vue'

const routes = [
  // ... existing routes
  {
    path: '/privacy',
    name: 'Privacy',
    component: PrivacyView,
    meta: {
      title: 'Privacy Policy'
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsView,
    meta: {
      title: 'Terms of Service'
    }
  }
]
```

### 2. Update Copyright Component

Update `src/components/CopyrightComponent.vue` to link to actual pages:

```vue
<ul>
  <li>
    <router-link to="/terms">Terms & Condition</router-link>
  </li>
  <li>
    <router-link to="/privacy">Privacy Policy</router-link>
  </li>
</ul>
```

### 3. Add Privacy Checkbox to Contact Form

Update `src/components/ContactComponent.vue`:

```vue
<!-- Add before submit button -->
<div class="privacy-consent">
  <label>
    <input type="checkbox" v-model="agreedToPrivacy" required />
    I agree to the <router-link to="/privacy" target="_blank">Privacy Policy</router-link>
  </label>
</div>
```

---

## GDPR Compliance Checklist

### ✅ Completed
- [x] Privacy policy page created
- [x] Terms of service page created
- [x] Contact form identifies data collected
- [x] Legal basis for processing documented
- [x] Data retention policy specified
- [x] User rights information provided

### ⚠️ To Implement
- [ ] Cookie consent banner (if analytics added)
- [ ] Data deletion request mechanism
- [ ] Data export functionality (data portability)
- [ ] Consent checkboxes on contact form
- [ ] Newsletter unsubscribe mechanism (if applicable)

### 📋 Documentation Required
- [ ] Data Processing Agreement (DPA) with hosting provider
- [ ] Record of Processing Activities (ROPA)
- [ ] Data breach notification procedures
- [ ] Privacy impact assessment (if high-risk processing)

---

## CCPA Compliance (California)

If you have California users, additional requirements:

### Required Disclosures
- Categories of personal information collected
- Purpose for collecting each category
- Whether information is sold or shared (this site: NO)
- Right to opt-out of data sales (N/A for this site)

### User Rights (CCPA)
- Right to know what data is collected
- Right to delete personal information
- Right to opt-out of data sales
- Right to non-discrimination for exercising rights

### Implementation
Add to Privacy Policy:

```markdown
## California Residents (CCPA)

If you are a California resident, you have additional rights:

- **Right to Know:** Request categories and specific pieces of data collected
- **Right to Delete:** Request deletion of your personal information
- **Right to Opt-Out:** We do not sell personal information
- **Right to Non-Discrimination:** We will not discriminate for exercising your rights

To exercise these rights, email: privacy@jesrelagang.com
```

---

## Data Subject Request Handling

### Request Types
1. **Access Request** - User wants copy of their data
2. **Deletion Request** - User wants data erased
3. **Rectification Request** - User wants data corrected
4. **Portability Request** - User wants data in structured format
5. **Objection** - User objects to processing

### Response Procedure

**Timeline:** 30 days (GDPR) / 45 days (CCPA)

**Process:**
1. Verify identity of requester
2. Locate all relevant data
3. Prepare response document
4. Execute request (delete, export, etc.)
5. Confirm completion to requester
6. Document request and response

**Template Email Response:**

```
Subject: Data Subject Request - [Request Type]

Dear [Name],

Thank you for your data [access/deletion/rectification] request submitted on [Date].

We have processed your request as follows:

[For Access Request]
Attached is a copy of all personal data we hold about you:
- Contact form submission dated [Date]
- [Other data if applicable]

[For Deletion Request]
We have deleted the following data:
- Contact form submission dated [Date]
- [Other data if applicable]

This deletion is permanent and cannot be undone.

[For Rectification Request]
We have corrected the following data:
- [Field]: [Old Value] → [New Value]

If you have any questions, please reply to this email.

Best regards,
Jesrel Agang
privacy@jesrelagang.com
```

---

## Cookie Consent Implementation

If you add analytics (Google Analytics, etc.), implement cookie consent:

### Install vue-cookie-accept-decline

```bash
npm install vue-cookie-accept-decline
```

### Implement Component

```vue
<template>
  <vue-cookie-accept-decline
    :debug="false"
    :position="'bottom'"
    :type="'floating'"
    :disableDecline="false"
    :transitionName="'slideFromBottom'"
    @status="cookieStatus"
  >
    <template #message>
      We use cookies to enhance your experience.
      <router-link to="/privacy">Privacy Policy</router-link>
    </template>
    <template #acceptContent>Accept</template>
    <template #declineContent>Decline</template>
  </vue-cookie-accept-decline>
</template>

<script>
export default {
  methods: {
    cookieStatus(status) {
      if (status === 'accept') {
        // Initialize analytics
        this.initAnalytics()
      }
    },
    initAnalytics() {
      // Load Google Analytics only after consent
    }
  }
}
</script>
```

---

## Maintenance & Review

### Monthly
- Review contact form submissions for privacy compliance
- Check for new GDPR/CCPA guidance
- Update privacy policy if data practices change

### Quarterly
- Audit data retention compliance
- Review third-party processors (hosting, email)
- Test data subject request procedures

### Annually
- Full privacy impact assessment
- Update privacy policy and terms
- Review and renew DPAs with vendors
- Staff privacy training (if team expands)

---

## Contact Information

**Data Protection Officer (DPO):** Jesrel Agang
**Email:** privacy@jesrelagang.com
**Response Time:** Within 30 days (GDPR requirement)

---

## Resources

**GDPR Information:**
- https://gdpr.eu
- https://ico.org.uk/for-organisations/guide-to-data-protection/

**CCPA Information:**
- https://oag.ca.gov/privacy/ccpa

**Privacy Policy Generators:**
- https://www.termsfeed.com/privacy-policy-generator/
- https://www.privacypolicies.com

**Legal Compliance:**
- Consult with privacy attorney for specific legal advice
- Consider GDPR compliance certification (e.g., ISO 27701)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-09
**Next Review:** 2026-01-09
