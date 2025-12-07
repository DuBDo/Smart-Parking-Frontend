// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX1rDvZpcD2q39JqA1PSnYgawOmAnECO4",
  authDomain: "smartpark-ceec2.firebaseapp.com",
  projectId: "smartpark-ceec2",
  storageBucket: "smartpark-ceec2.firebasestorage.app",
  messagingSenderId: "726823692788",
  appId: "1:726823692788:web:cbae50b182326f8147b1a1",
  measurementId: "G-8RCVK0GEEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);