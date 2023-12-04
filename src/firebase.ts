import firebase from "firebase/app";
import "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvJaRVnchpCJPOf1GPFbf_va-4-xNsvA0",
    authDomain: "quiz-app-pwa-acc79.firebaseapp.com",
    projectId: "quiz-app-pwa-acc79",
    storageBucket: "quiz-app-pwa-acc79.appspot.com",
    messagingSenderId: "611596615498",
    appId: "1:611596615498:web:59901d707976ce2e7dcbb3"
};

firebase.initializeApp(firebaseConfig);

export const requestFcmPermission = () => {
    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then( () => messaging.getToken() )
        .then( (token:string) => console.log(`Token: ${token}`) )
        .catch( (error:Error) => console.log(`Error: ${error}`) )
}
