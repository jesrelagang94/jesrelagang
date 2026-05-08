/**
 * Visitor Tracker Composable
 * Tracks visitors using Firebase Firestore and IP geolocation
 * Sends email notifications via EmailJS (no backend needed)
 *
 * PRIVACY: Respects user cookie consent preferences
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

const SESSION_STORAGE_KEY = 'visitor_tracked';
const CONSENT_KEY = 'cookie_consent';
const IP_API_URL = 'https://ipapi.co/json/'; // Free, CORS-enabled

/**
 * Check if user has consented to tracking
 */
function hasTrackingConsent() {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.tracking === true;
    }
  } catch (e) {
    console.debug('Could not read consent:', e);
  }
  return false;
}

// EmailJS Configuration - Uses environment variables for security
// Set these in your .env file:
// VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
};

// Admin notification emails - from environment variables
const ADMIN_EMAILS = import.meta.env.VITE_ADMIN_EMAILS || '';

/**
 * Get visitor's geolocation from IP
 */
async function getGeoLocation() {
  try {
    const response = await fetch(IP_API_URL);
    if (!response.ok) throw new Error('Geo API failed');
    const data = await response.json();

    return {
      ip: data.ip || 'Unknown',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'XX',
      timezone: data.timezone || 'Unknown',
      isp: data.org || 'Unknown',
      lat: data.latitude || 0,
      lon: data.longitude || 0,
      postalCode: data.postal || ''
    };
  } catch (error) {
    console.debug('Geolocation failed:', error);
    return {
      ip: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      countryCode: 'XX',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
      isp: 'Unknown',
      lat: 0,
      lon: 0
    };
  }
}

/**
 * Get country flag emoji from country code
 */
function getCountryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2 || countryCode === 'XX') return '';
  try {
    const code = countryCode.toUpperCase();
    return String.fromCodePoint(...code.split('').map(c => 127397 + c.charCodeAt(0)));
  } catch {
    return '';
  }
}

/**
 * Send email notification via EmailJS
 */
async function sendEmailNotification(visitorData) {
  // Skip if EmailJS not configured (check for empty or missing env vars)
  if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
    console.debug('EmailJS not configured - skipping notification');
    return false;
  }

  // Skip if no admin emails configured
  if (!ADMIN_EMAILS) {
    console.debug('No admin emails configured - skipping notification');
    return false;
  }

  try {
    const flag = getCountryFlag(visitorData.countryCode);
    const mapUrl = `https://www.google.com/maps?q=${visitorData.lat},${visitorData.lon}`;
    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // EmailJS template parameters
    const templateParams = {
      to_email: ADMIN_EMAILS,
      from_name: 'Portfolio Visitor Alert',
      subject: `New Visitor from ${visitorData.city}, ${visitorData.country}`,
      flag: flag,
      city: visitorData.city || 'Unknown',
      region: visitorData.region || 'Unknown',
      country: visitorData.country || 'Unknown',
      ip: visitorData.ip || 'Unknown',
      isp: visitorData.isp || 'Unknown',
      timezone: visitorData.timezone || 'Unknown',
      page: visitorData.page || '/',
      referrer: visitorData.referrer || 'Direct',
      device: visitorData.device || 'Unknown',
      browser: visitorData.browser || 'Unknown',
      timestamp: timestamp,
      map_url: mapUrl
    };

    // Dynamic import EmailJS (loaded only when needed)
    const emailjs = await import('@emailjs/browser');

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.debug('Visitor notification sent via EmailJS');
    return true;
  } catch (error) {
    console.debug('EmailJS notification failed:', error);
    return false;
  }
}

/**
 * Parse user agent to get device and browser info
 */
function parseUserAgent() {
  const ua = navigator.userAgent;
  let device = 'Desktop';
  let browser = 'Unknown';

  // Detect device
  if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) {
    device = /iphone/i.test(ua) ? 'iPhone' : /android/i.test(ua) ? 'Android' : 'Mobile';
  } else if (/ipad|tablet/i.test(ua)) {
    device = 'Tablet';
  } else if (/windows/i.test(ua)) {
    device = 'Windows PC';
  } else if (/macintosh|mac os/i.test(ua)) {
    device = 'Mac';
  } else if (/linux/i.test(ua)) {
    device = 'Linux';
  }

  // Detect browser
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';
  else if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';

  return { device, browser, userAgent: ua };
}

/**
 * Track visitor on page load
 * Respects GDPR consent - only tracks if user has opted in
 */
export async function trackVisitor() {
  // PRIVACY: Check for user consent before tracking
  if (!hasTrackingConsent()) {
    return { success: false, reason: 'no_consent' };
  }

  // Check if already tracked this session to avoid duplicate tracking
  if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
    return { success: true, alreadyTracked: true };
  }

  try {
    // Get geolocation data
    const geo = await getGeoLocation();

    // Parse user agent
    const { device, browser, userAgent } = parseUserAgent();

    // Prepare visitor data
    const visitorData = {
      // Location info
      ip: geo.ip,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      countryCode: geo.countryCode,
      timezone: geo.timezone,
      isp: geo.isp,
      lat: geo.lat,
      lon: geo.lon,

      // Visit info
      page: window.location.pathname + window.location.search,
      fullUrl: window.location.href,
      referrer: document.referrer || 'Direct',

      // Device info
      device: device,
      browser: browser,
      userAgent: userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language || 'en',

      // Metadata
      notificationSent: false,
      createdAt: serverTimestamp()
    };

    // Save to Firestore
    await addDoc(collection(db, 'visitors'), visitorData);

    // Send email notification (non-blocking)
    sendEmailNotification(visitorData).catch(() => {});

    // Mark as tracked for this session
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');

    return { success: true, tracked: true };
  } catch (error) {
    // Silently fail - don't affect user experience
    console.debug('Visitor tracking failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Vue composable hook
 */
export function useVisitorTracker() {
  const track = () => trackVisitor();

  return {
    track
  };
}

export default useVisitorTracker;
