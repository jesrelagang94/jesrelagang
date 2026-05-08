# Contact Form Implementation Guide

## Overview
Professional PHP mailer system with Vue.js frontend integration, featuring advanced validation, security, and user experience enhancements.

---

## 📁 File Structure

```
jesrelagang/
├── public/
│   └── api/
│       ├── contact.php          # PHP mailer backend
│       ├── .htaccess            # Security configuration
│       └── rate_limit.json      # Auto-generated rate limiting data
└── src/
    └── components/
        └── ContactComponent.vue  # Vue contact form with validation
```

---

## 🚀 Features

### Backend (contact.php)
✅ **Security**
- CORS protection with whitelist
- Rate limiting (5 requests/hour per IP)
- Input validation & sanitization
- XSS protection
- CSRF protection via headers
- No auto-commit of secrets

✅ **Email Features**
- HTML email templates with professional styling
- Plain text fallback
- Custom headers (Reply-To, Priority)
- Timestamp tracking
- Service categorization

✅ **Validation**
- Name: 2-100 characters
- Email: RFC-compliant validation
- Phone: Optional field
- Service: Whitelist validation
- Message: 10-5000 characters

### Frontend (ContactComponent.vue)
✅ **User Experience**
- Real-time validation
- Inline error messages
- Loading states with spinner
- Success/error notifications
- Auto-scroll to messages
- Form reset on success
- Accessible (ARIA labels, roles)

✅ **Validation Logic**
- Client-side validation before submission
- Email format validation
- Field-level validation on blur
- Error clearing on input
- Form-level validation summary

---

## 🔧 Configuration

### 1. Update Email Recipient
Edit `public/api/contact.php` line 49:
```php
define('RECIPIENT_EMAIL', 'jesrelagang@gmail.com'); // Your email
```

### 2. Configure CORS Origins
Edit `public/api/contact.php` lines 16-21:
```php
$allowed_origins = [
    'http://localhost:5173',        // Vite dev server
    'http://localhost:3000',        // Alternative dev
    'https://jesrelagang.com',      // Production
    'https://www.jesrelagang.com'   // Production www
];
```

### 3. API Endpoint (Frontend)
The Vue component automatically detects environment:
- **Development**: `http://localhost/jesrelagang/public/api/contact.php`
- **Production**: `/api/contact.php`

To customize, edit `ContactComponent.vue` line 370-372.

---

## 📧 Email Template

### HTML Email Features
- Responsive design (max-width: 600px)
- Professional gradient header
- Color-coded sections
- Badge for new leads
- Message box with styling
- Footer with metadata

### Preview
```
┌─────────────────────────────────────┐
│  📬 New Contact Form Submission     │  ← Orange gradient header
│  Someone just reached out...        │
├─────────────────────────────────────┤
│  👤 Name: John Doe                  │
│  📧 Email: john@example.com         │
│  📞 Phone: +1234567890              │
│  🎯 Service: N8N Automation [NEW]   │
│  💬 Message: [Styled box]           │
├─────────────────────────────────────┤
│  From: jesrelagang.com              │  ← Footer
│  Received: Jan 15, 2025 at 3:30 PM │
└─────────────────────────────────────┘
```

---

## 🛡️ Security Features

### Rate Limiting
- **Limit**: 5 requests per hour per IP
- **Storage**: `rate_limit.json` (auto-created, git-ignored)
- **Cleanup**: Old entries auto-removed
- **Response**: HTTP 429 when exceeded

### Input Sanitization
```php
htmlspecialchars($input, ENT_QUOTES, 'UTF-8')  // XSS protection
filter_var($email, FILTER_SANITIZE_EMAIL)      // Email cleanup
filter_var($email, FILTER_VALIDATE_EMAIL)      // Email validation
```

### HTTP Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### .htaccess Protection
- Denies access to `rate_limit.json`
- Prevents directory listing
- Limits contact.php to POST/OPTIONS only
- Disables error display (logs only)

---

## 🎨 Frontend Styling

### Success Message
```css
Background: #d4edda (light green)
Border: #1cbe59 (green)
Color: #155724 (dark green)
Icon: ✓ checkmark
Animation: slideDown
```

### Error Message
```css
Background: #f8d7da (light red)
Border: #f75023 (orange-red)
Color: #721c24 (dark red)
Icon: ✗ cancel
Animation: slideDown
```

### Field Errors
```css
Border: #f75023 (orange)
Background: #fff5f5 (light pink)
Text: #f75023
Animation: fadeIn
```

### Loading State
```css
Button opacity: 0.7
Cursor: not-allowed
Spinner: rotating icon
```

---

## 📝 Validation Rules

| Field | Required | Min Length | Max Length | Format |
|-------|----------|------------|------------|--------|
| Name | Yes | 2 | 100 | Text |
| Email | Yes | - | - | RFC Email |
| Phone | No | - | - | Tel |
| Service | Yes | - | - | Dropdown |
| Message | Yes | 10 | 5000 | Text |

---

## 🧪 Testing

### Local Testing Setup

1. **Start Laragon/XAMPP**
   - Ensure Apache is running
   - PHP 7.4+ recommended

2. **Test Development Mode**
   ```bash
   npm run dev
   # Visit http://localhost:5173
   # Fill form and submit
   ```

3. **Check PHP Endpoint Directly**
   ```bash
   # Test with curl
   curl -X POST http://localhost/jesrelagang/public/api/contact.php \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "service": "N8N Automation",
       "message": "This is a test message from the API"
     }'
   ```

### Test Cases

✅ **Valid Submission**
- Fill all required fields
- Select a service
- Message 10+ characters
- Expected: Success message, email sent

✅ **Invalid Email**
- Enter `notanemail`
- Expected: "Please enter a valid email address"

✅ **Short Message**
- Enter 5 characters
- Expected: "Message must be at least 10 characters"

✅ **Empty Fields**
- Submit without filling
- Expected: Multiple inline errors

✅ **Rate Limiting**
- Submit 6 times in 1 hour
- Expected: "Too many requests" after 5th

✅ **Network Error**
- Stop Apache
- Submit form
- Expected: "Network error" message

---

## 🚨 Troubleshooting

### Email Not Sending

**Issue**: Form submits but no email received

**Solutions**:
1. Check PHP `mail()` function is enabled
   ```php
   <?php
   if (function_exists('mail')) {
       echo "mail() is enabled";
   } else {
       echo "mail() is disabled";
   }
   ?>
   ```

2. Configure SMTP (recommended for production):
   - Use PHPMailer library
   - Or configure sendmail in `php.ini`

3. Check spam folder

4. Verify `RECIPIENT_EMAIL` is correct

### CORS Errors

**Issue**: "CORS policy blocked" in browser console

**Solutions**:
1. Add your domain to `$allowed_origins` in `contact.php`
2. Ensure `Access-Control-Allow-Origin` header is sent
3. Check browser is sending `Origin` header

### Rate Limit Not Working

**Issue**: Can submit unlimited times

**Solutions**:
1. Check `rate_limit.json` is writable
2. Verify file path in `RATE_LIMIT_FILE` constant
3. Ensure no caching on PHP script

### Form Not Submitting

**Issue**: Form does nothing on submit

**Solutions**:
1. Check browser console for errors
2. Verify API endpoint URL is correct
3. Test with browser network tab open
4. Ensure fetch API is supported (IE11 not supported)

---

## 📦 Deployment Checklist

### Before Going Live

- [ ] Update `RECIPIENT_EMAIL` to production email
- [ ] Add production domain to CORS `$allowed_origins`
- [ ] Test email delivery from production server
- [ ] Configure SMTP if `mail()` doesn't work
- [ ] Set up error logging path in `.htaccess`
- [ ] Add `rate_limit.json` to `.gitignore`
- [ ] Test all validation scenarios
- [ ] Verify security headers are active
- [ ] Check rate limiting works
- [ ] Test on mobile devices
- [ ] Verify accessibility with screen reader

### Production Environment Variables

```javascript
// In ContactComponent.vue, already configured:
const apiUrl = import.meta.env.PROD
  ? '/api/contact.php'                              // Production
  : 'http://localhost/jesrelagang/public/api/contact.php';  // Dev
```

### Server Requirements

- PHP 7.4+
- Apache with mod_headers
- Writable permissions for `public/api/` directory
- `mail()` function or SMTP configured

---

## 🎯 Success Metrics

### Performance
- Form validation: <100ms
- API response: <2s average
- Email delivery: <30s

### Usability
- All fields accessible via keyboard
- Screen reader compatible
- Mobile responsive
- Clear error messages
- Success confirmation

### Security
- 0 XSS vulnerabilities
- 0 CSRF vulnerabilities
- Rate limiting active
- Input sanitization working
- No sensitive data exposed

---

## 🔄 Future Enhancements

### Planned Improvements
1. **Honeypot Field** - Additional spam protection
2. **Google reCAPTCHA** - Bot prevention
3. **Email Queue** - Async processing
4. **Database Logging** - Store submissions
5. **Admin Dashboard** - View all messages
6. **Auto-responder** - Confirmation email to sender
7. **File Attachments** - Allow resume/portfolio uploads
8. **Multi-language** - i18n support

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Review PHP error logs
3. Test API endpoint directly with curl
4. Verify server configuration

For questions about this implementation, contact:
**Jesrel Agang** - jesrelagang@gmail.com

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
