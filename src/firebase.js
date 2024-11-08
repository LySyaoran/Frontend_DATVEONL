import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier , signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBONtQosDUT30uK5Csne-TJCAExDpJge1U",
  authDomain: "smsverify-8bbff.firebaseapp.com",
  projectId: "smsverify-8bbff",
  storageBucket: "smsverify-8bbff.firebasestorage.app",
  messagingSenderId: "410134379702",
  appId: "1:410134379702:web:cbc3e2ed1e9f53d213ba17",
  measurementId: "G-FCV95ZNCPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'it';

export { auth, RecaptchaVerifier, signInWithPhoneNumber };