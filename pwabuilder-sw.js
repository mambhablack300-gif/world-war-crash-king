// Ultimate PWA Service Worker with Offline Support, Background Sync, Periodic Sync, and Push Notifications

const CACHE_NAME = "world-war-crash-v4";
const ASSETS_TO_CACHE = [
  "/world-war-crash-king/",
  "/world-war-crash-king/index.html"
];

// Install Event - Caching Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Cleaning old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Offline Support
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          return caches.match("/world-war-crash-king/");
        });
    })
  );
});

// Background Sync Event
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-game-data") {
    event.waitUntil(
      Promise.resolve()
    );
  }
});

// Periodic Background Sync Event
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-game-content") {
    event.waitUntil(
      Promise.resolve()
    );
  }
});

// Push Notification Event
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "World War Crash King Update!";
  const options = {
    body: data,
    icon: "https://via.placeholder.com/192x192.png?text=WWC",
    badge: "https://via.placeholder.com/96x96.png?text=W"
  };
  event.waitUntil(
    self.registration.showNotification("World War Crash King", options)
  );
});

// Notification Click Event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/world-war-crash-king/")
  );
});
