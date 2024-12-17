
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKECpkjV8bp_Ds0Vc_Ee7USWbLPDQRWco",
  authDomain: "netflixgpt-f6c9d.firebaseapp.com",
  projectId: "netflixgpt-f6c9d",
  storageBucket: "netflixgpt-f6c9d.firebasestorage.app",
  messagingSenderId: "552470197504",
  appId: "1:552470197504:web:a88f33210668f55a09efe5",
  measurementId: "G-2Y7SRFGH67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
