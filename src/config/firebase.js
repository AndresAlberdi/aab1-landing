import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase en Spark Free Tier (Always Free Limits: 10GB Hosting, 50k reads / 20k writes per day)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_AAB1_Landing_Free_Tier_Key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aab1-landing.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aab1-landing",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aab1-landing.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "100000000001",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:100000000001:web:aab1landing001"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
