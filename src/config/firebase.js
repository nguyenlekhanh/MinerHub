// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMVhCdbUD03jGE5D89R3gNCEDNwDNEXLk",
  authDomain: "information-81751.firebaseapp.com",
  projectId: "information-81751",
  storageBucket: "information-81751.appspot.com",
  messagingSenderId: "1098584892895",
  appId: "1:1098584892895:web:b8a51ff41adc8b7e90d06a",
  measurementId: "G-H3278WPQ9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//export const auth = getAuth(app);

export const db = getFirestore(app);