/// <reference lib="webworker" />
/* eslint-env serviceworker */
/* global importScripts, firebase, self */
/* eslint-env serviceworker */
/* global clients */

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

  const notificationTitle = payload.notification.title || '🔥 New Alert';
  const notificationOptions = {
    body: payload.notification.body || 'You’ve got a new message!',
    icon: 'pwa-192x192.png',
    image: payload.notification.image || 'https://img.freepik.com/free-vector/loudspeaker-me…1146e212f342b858aa4b8290bc7b4773e1adec4cd6&w=1380',
    badge: 'andy.png',
    vibrate: [100, 50, 100],
    actions: [
      { action: 'open', title: '👀 View Now' },
      { action: 'dismiss', title: '❌ Ignore' }
    ],
    requireInteraction: true,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Add this to handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      // If already open, focus it
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) return client.focus();
      }
      // If not open, open a new tab
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
