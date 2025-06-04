// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBfHQuiVDI87vl0T1Wbagkx0AKqfqWsVS4",
  authDomain: "andy-super-app.firebaseapp.com",
  projectId: "andy-super-app",
  storageBucket: "andy-super-app.firebasestorage.app",
  messagingSenderId: "1098347719441",
  appId: "1:1098347719441:web:b6263f91f3094f143bfab0",
  measurementId: "G-V1SPBRW1K5"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
