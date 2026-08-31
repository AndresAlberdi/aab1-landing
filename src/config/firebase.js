import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aab1-landing",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:461726984412:web:0d671d1f8932943bd2ac19",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aab1-landing.firebasestorage.app",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB8UqWYGru_VLpZdKPRgR8DHe_VTYPzJUo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aab1-landing.firebaseapp.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "461726984412"
};

export const app = initializeApp(firebaseConfig);

// Initialize App Check only in browser environment
export let appCheck = null;
if (typeof document !== 'undefined') {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider('6LdiKKEtAAAAAATwxfCQIO5vs-Zhwc5kyLcVQJvh'),
    isTokenAutoRefreshEnabled: true
  });
}

export const db = getFirestore(app);
