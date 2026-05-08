import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

// Admin emails list
const ADMIN_EMAILS = [
  'jesrelagang94@gmail.com',
  'jessautogarage@gmail.com'
];

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const userProfile = ref(null);
  const loading = ref(false);
  const initialized = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => {
    const email = user.value?.email?.toLowerCase();
    return email && ADMIN_EMAILS.includes(email);
  });

  // Initialize auth state listener
  const initAuth = () => {
    if (initialized.value) return Promise.resolve(user.value);

    loading.value = true;

    return new Promise((resolve) => {
      // Set a timeout to prevent hanging
      const timeout = setTimeout(() => {
        loading.value = false;
        initialized.value = true;
        resolve(null);
      }, 5000);

      try {
        onAuthStateChanged(auth, async (firebaseUser) => {
          clearTimeout(timeout);
          if (firebaseUser) {
            user.value = firebaseUser;
            await fetchUserProfile(firebaseUser.uid);
          } else {
            user.value = null;
            userProfile.value = null;
          }
          loading.value = false;
          initialized.value = true;
          resolve(firebaseUser);
        });
      } catch (err) {
        clearTimeout(timeout);
        console.error('Auth init error:', err);
        loading.value = false;
        initialized.value = true;
        resolve(null);
      }
    });
  };

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        userProfile.value = userDoc.data();
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      error.value = null;
      loading.value = true;
      const result = await signInWithEmailAndPassword(auth, email, password);
      user.value = result.user;

      // Fetch user profile (non-blocking)
      fetchUserProfile(result.user.uid).catch(err => {
        console.warn('Could not fetch user profile:', err);
      });

      // Update last login (non-blocking, don't fail login if this fails)
      setDoc(doc(db, 'users', result.user.uid), {
        lastLoginAt: new Date().toISOString()
      }, { merge: true }).catch(err => {
        console.warn('Could not update last login:', err);
      });

      return { success: true };
    } catch (err) {
      error.value = getErrorMessage(err.code);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  // Register (for initial admin setup)
  const register = async (email, password, profile) => {
    try {
      error.value = null;
      loading.value = true;
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        ...profile,
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      });

      user.value = result.user;
      await fetchUserProfile(result.user.uid);

      return { success: true };
    } catch (err) {
      error.value = getErrorMessage(err.code);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      userProfile.value = null;
      return { success: true };
    } catch (err) {
      error.value = getErrorMessage(err.code);
      return { success: false, error: error.value };
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      error.value = null;
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      error.value = getErrorMessage(err.code);
      return { success: false, error: error.value };
    }
  };

  // Error message helper - uses generic messages to prevent user enumeration
  const getErrorMessage = (code) => {
    const messages = {
      // Login errors - use generic message to prevent user enumeration
      'auth/user-not-found': 'Invalid email or password',
      'auth/wrong-password': 'Invalid email or password',
      'auth/invalid-credential': 'Invalid email or password',
      'auth/invalid-login-credentials': 'Invalid email or password',
      // Registration errors
      'auth/email-already-in-use': 'Unable to create account. Please try a different email.',
      'auth/weak-password': 'Password should be at least 8 characters with uppercase, lowercase, numbers, and special characters',
      'auth/invalid-email': 'Please enter a valid email address',
      // Rate limiting
      'auth/too-many-requests': 'Too many attempts. Please wait a few minutes before trying again.',
      // Network errors
      'auth/network-request-failed': 'Network error. Please check your connection.',
      // Other
      'auth/operation-not-allowed': 'This operation is not allowed.',
    };
    return messages[code] || 'An error occurred. Please try again.';
  };

  return {
    user,
    userProfile,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    initAuth,
    login,
    register,
    logout,
    resetPassword
  };
});
