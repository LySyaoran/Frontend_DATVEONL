import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier , signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnZgMQbSKnZDpF3edU9nJmn6tekI0OaXo",
  authDomain: "smsverify-d618b.firebaseapp.com",
  projectId: "smsverify-d618b",
  storageBucket: "smsverify-d618b.firebasestorage.app",
  messagingSenderId: "814482131899",
  appId: "1:814482131899:web:95f2d0975560932fc8929e",
  measurementId: "G-Q2R8K4QW1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'it';

export { auth, RecaptchaVerifier, signInWithPhoneNumber };