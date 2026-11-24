importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBX5eOYj9WzstY6j23A7ffBezwSoZ-9a5k",
  authDomain: "online-games-27461.firebaseapp.com",
  projectId: "online-games-27461",
  storageBucket: "online-games-27461.firebasestorage.app",
  messagingSenderId: "878102769318",
  appId: "1:878102769318:web:beea53b8aeb0caa212ce67"
});

const messaging = firebase.messaging();

// Activate the newest worker promptly when a new version is deployed.
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    await self.clients.claim();
  })());
});

// Deliberately do not cache HTML, JavaScript, Firebase data, or images here.
// This worker handles push notifications only; avoiding a custom cache prevents
// stale app screens and stale profile photos from being served by this worker.
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Online Games";
  const options = {
    body: payload.notification?.body || "لديك رسالة جديدة",
    icon: "./icon.svg",
    data: payload.data || {}
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const targetUrl = new URL("./", self.location.href).href;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of windows) {
      if (client.url.startsWith(self.location.origin) && "focus" in client) {
        await client.focus();
        if ("navigate" in client) await client.navigate(targetUrl);
        return;
      }
    }
    await self.clients.openWindow(targetUrl);
  })());
});
