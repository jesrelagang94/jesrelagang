import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

/**
 * Firebase configuration
 * Uses environment variables for security
 * Falls back to hardcoded values for development only
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC30B-dq1IeDLLXORRHCSuk9Xs8aqZ9RNA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "coderslab-253c4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "coderslab-253c4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "coderslab-253c4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "988839398830",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:988839398830:web:56ef9c8bcbee1623b68c3f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HQ3DB5CNW1"
};

// Warn if using fallback values in production
if (import.meta.env.PROD && !import.meta.env.VITE_FIREBASE_API_KEY) {
  console.warn('[Security] Firebase config using fallback values. Set environment variables for production.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize App Check (bot/abuse protection)
let appCheck = null;
if (typeof window !== 'undefined') {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (recaptchaSiteKey) {
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      });
      console.debug('Firebase App Check initialized');
    } catch (error) {
      console.debug('App Check initialization skipped:', error.message);
    }
  } else if (import.meta.env.DEV) {
    // In development, enable debug mode for App Check
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    console.debug('App Check debug mode enabled for development');
  }
}
export { appCheck };

// Initialize Analytics (only in browser and production)
let analytics = null;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.debug('Analytics initialization skipped:', error.message);
  }
}
export { analytics };

export default app;
