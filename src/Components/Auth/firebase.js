// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyBR7_VSbcp6S2sTNTdDj2546y6EhG1CCg4",
  authDomain: "shadab-6b4f7.firebaseapp.com",
  projectId: "shadab-6b4f7",
  storageBucket: "shadab-6b4f7.appspot.com",
  messagingSenderId: "270096030241",
  appId: "1:270096030241:web:ffe2f74234ac6b8f326160",
  measurementId: "G-137W78T5GM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
