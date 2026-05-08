/**
 * Security Utilities
 * Input sanitization, validation, and security helpers
 *
 * Uses DOMPurify for XSS protection - industry-standard library
 */

import DOMPurify from 'dompurify';

/**
 * Configure DOMPurify with strict settings
 */
const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [], // No HTML tags allowed by default
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  SANITIZE_DOM: true,
  WHOLE_DOCUMENT: false,
  FORCE_BODY: false,
  USE_PROFILES: { html: false }
};

/**
 * Sanitize HTML - removes all potentially dangerous content
 * Uses DOMPurify which is the industry standard for XSS prevention
 */
export function sanitizeHtml(input) {
  if (!input || typeof input !== 'string') return '';

  // Use DOMPurify with strict configuration - no HTML allowed
  return DOMPurify.sanitize(input, DOMPURIFY_CONFIG).trim();
}

/**
 * Sanitize for rich text (allows basic formatting)
 * Only use this when you explicitly need to allow some HTML
 */
export function sanitizeRichText(input) {
  if (!input || typeof input !== 'string') return '';

  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  }).trim();
}

/**
 * Sanitize input for plain text (removes all HTML)
 * Uses DOMPurify for reliable sanitization
 */
export function sanitizeText(input) {
  if (!input || typeof input !== 'string') return '';

  // DOMPurify strips all HTML, then we do additional cleanup
  const sanitized = DOMPurify.sanitize(input, DOMPURIFY_CONFIG);

  // Additional safety: encode any remaining special characters
  return sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email) {
  if (!email || typeof email !== 'string') return '';

  return email
    .toLowerCase()
    .trim()
    // Remove any characters that shouldn't be in email
    .replace(/[<>'"&]/g, '')
    // Limit length per RFC 5321
    .substring(0, 254);
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '';

  return phone
    // Keep only digits, spaces, dashes, parentheses, and plus sign
    .replace(/[^\d\s\-()+ ]/g, '')
    .trim()
    .substring(0, 20);
}

/**
 * Validate email format (strict validation)
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length >= 5 && email.length <= 254;
}

/**
 * Validate URL format
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;

  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Check for potential spam indicators
 */
export function hasSpamIndicators(text) {
  if (!text || typeof text !== 'string') return false;

  const lowerText = text.toLowerCase();

  const spamPatterns = [
    // Pharmaceutical spam
    /\b(viagra|cialis|pharmacy|prescription)\b/,
    // Casino/gambling spam
    /\b(casino|lottery|winner|jackpot|prize)\b/,
    // Urgency spam
    /\b(act now|limited time|free money|click here|urgent)\b/,
    // Crypto scams
    /\b(bitcoin|crypto|investment opportunity)\b/,
    // Excessive repeated characters
    /(.)\1{5,}/,
    // Multiple URLs (spam indicator)
    /(https?:\/\/[^\s]+.*){3,}/,
    // BBCode URLs
    /\[url=/i,
    // All caps excessive use
    /[A-Z]{20,}/
  ];

  const matches = spamPatterns.filter(pattern => pattern.test(lowerText));
  return matches.length >= 2; // Consider spam if 2+ patterns match
}

/**
 * Check for XSS/injection attempts in text
 */
export function hasInjectionAttempt(text) {
  if (!text || typeof text !== 'string') return false;

  const injectionPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
    /vbscript:/i,
    /data:/i
  ];

  return injectionPatterns.some(pattern => pattern.test(text));
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a CSRF token (store in sessionStorage)
 */
export function generateCsrfToken() {
  const token = generateSecureToken(32);
  sessionStorage.setItem('csrf_token', token);
  return token;
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token) {
  const storedToken = sessionStorage.getItem('csrf_token');
  return storedToken && token === storedToken;
}

/**
 * Rate limiter using localStorage
 * Returns true if rate limit exceeded
 */
export function isRateLimited(key, maxRequests = 5, windowMs = 60000) {
  const storageKey = `rateLimit_${key}`;
  const now = Date.now();

  try {
    const data = JSON.parse(localStorage.getItem(storageKey) || '{"requests": [], "blocked": 0}');

    // Check if currently blocked
    if (data.blocked > now) {
      return true;
    }

    // Filter requests within the time window
    data.requests = data.requests.filter(time => now - time < windowMs);

    // Check if rate limit exceeded
    if (data.requests.length >= maxRequests) {
      // Block for the window duration
      data.blocked = now + windowMs;
      localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    }

    // Add current request
    data.requests.push(now);
    localStorage.setItem(storageKey, JSON.stringify(data));

    return false;
  } catch {
    return false; // Fail open if localStorage unavailable
  }
}

/**
 * Clear rate limit for a key
 */
export function clearRateLimit(key) {
  localStorage.removeItem(`rateLimit_${key}`);
}

/**
 * Detect if running in a suspicious environment (basic bot detection)
 */
export function isSuspiciousBrowser() {
  // Check for headless browser indicators
  if (navigator.webdriver) return true;

  // Check for PhantomJS
  if (window.callPhantom || window._phantom) return true;

  // Check for missing properties that real browsers have
  if (!window.chrome && navigator.userAgent.includes('Chrome')) return true;

  // Check for automation
  if (navigator.userAgent.includes('HeadlessChrome')) return true;
  if (navigator.userAgent.includes('PhantomJS')) return true;
  if (navigator.userAgent.includes('Selenium')) return true;

  // Check for unrealistic screen dimensions
  if (window.outerWidth === 0 || window.outerHeight === 0) return true;

  // Check for missing plugins in non-mobile browsers
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
  if (!isMobile && navigator.plugins && navigator.plugins.length === 0) {
    // Most desktop browsers have plugins
    return true;
  }

  return false;
}

/**
 * Sanitize object (recursively sanitize all string properties)
 */
export function sanitizeObject(obj, maxDepth = 5) {
  if (maxDepth <= 0) return obj;

  if (typeof obj === 'string') {
    return sanitizeText(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, maxDepth - 1));
  }

  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      // Sanitize the key too
      const safeKey = sanitizeText(key);
      sanitized[safeKey] = sanitizeObject(value, maxDepth - 1);
    }
    return sanitized;
  }

  return obj;
}

/**
 * Validate password strength
 * Returns { valid: boolean, errors: string[] }
 */
export function validatePasswordStrength(password) {
  const errors = [];

  if (!password || typeof password !== 'string') {
    return { valid: false, errors: ['Password is required'] };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Check for common weak passwords
  const weakPasswords = ['password', '12345678', 'qwerty', 'letmein', 'welcome'];
  if (weakPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export default {
  sanitizeHtml,
  sanitizeRichText,
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  isValidEmail,
  isValidUrl,
  hasSpamIndicators,
  hasInjectionAttempt,
  generateSecureToken,
  generateCsrfToken,
  verifyCsrfToken,
  isRateLimited,
  clearRateLimit,
  isSuspiciousBrowser,
  sanitizeObject,
  validatePasswordStrength
};
