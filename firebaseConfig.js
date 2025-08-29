// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0wxHI8g-wSuZ9_AiwyxbLsEejQrqFg1g",
  authDomain: "drone-e3ad5.firebaseapp.com",
  projectId: "drone-e3ad5",
  storageBucket: "drone-e3ad5.firebasestorage.app",
  messagingSenderId: "609190123834",
  appId: "1:609190123834:web:b017159d92a45cfe155803",
  measurementId: "G-H4KZ4NZ4B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);          // ✅ Correct: this is Firebase Authentication
const analytics = getAnalytics(app);

// ✅ Export individually so you can import with { auth }
export { app, auth, analytics };
