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

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Online Games";
  const options = {
    body: payload.notification?.body || "لديك رسالة جديدة",
    icon: "./icon.svg",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("./")
  );
});
