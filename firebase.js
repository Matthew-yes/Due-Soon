// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa7ToJfMpyTJVA_94SQMKlACtr4_I8Ku4",
  authDomain: "duesoon-f195b.firebaseapp.com",
  projectId: "duesoon-f195b",
  storageBucket: "duesoon-f195b.firebasestorage.app",
  messagingSenderId: "104578149379",
  appId: "1:104578149379:web:61aeae839f70192af33236",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
