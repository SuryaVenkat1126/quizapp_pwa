importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvJaRVnchpCJPOf1GPFbf_va-4-xNsvA0",
  authDomain: "quiz-app-pwa-acc79.firebaseapp.com",
  projectId: "quiz-app-pwa-acc79",
  storageBucket: "quiz-app-pwa-acc79.appspot.com",
  messagingSenderId: "611596615498",
  appId: "1:611596615498:web:59901d707976ce2e7dcbb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

app.messaging();

