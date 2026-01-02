
const CACHE_NAME = "watt-turnier-cache-v1";
const urlsToCache = [
  "index.html",
  "vorrunde.html",
  "auslosung1.html",
  "auslosung2.html",
  "auslosung3.html",
  "auslosung4.html",
  "auslosung5.html",
  "viertelfinale.html",
  "halbfinale.html",
  "finale.html",
  "manifest.json"
];

// Installieren und Dateien cachen
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Abrufen aus Cache oder Netzwerk
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
