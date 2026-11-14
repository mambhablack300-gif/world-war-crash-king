const CACHE = "pwabuilder-page-cache-v1";

const AUTOCACHE = [
  "/world-war-crash-king/",
  "/world-war-crash-king/index.html"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(AUTOCACHE);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method === "GET") {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(event.request);
      })
    );
  }
});
