/// <reference lib="webworker" />
/* eslint-env serviceworker */
/* global importScripts, firebase, self */

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
apiKey: "AIzaSyBfHQuiVDI87vl0T1Wbagkx0AKqfqWsVS4",
  authDomain: "andy-super-app.firebaseapp.com",
  projectId: "andy-super-app",
  storageBucket: "andy-super-app.firebasestorage.app",
  messagingSenderId: "1098347719441",
  appId: "1:1098347719441:web:b6263f91f3094f143bfab0",
  measurementId: "G-V1SPBRW1K5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
