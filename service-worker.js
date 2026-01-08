// ------------------------------------------------------
// Version deiner App (nur hier ändern!)
// ------------------------------------------------------
const APP_VERSION = "1.0.8";

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache-Name mit Version
const CACHE_NAME = "watt-cache-" + APP_VERSION;

// Dateien, die offline verfügbar sein sollen
const OFFLINE_FILES = [
  "/watt-turnier-app/",
  "/watt-turnier-app/index.html",
  "/watt-turnier-app/vorrunde.html",
  "/watt-turnier-app/auslosung1.html",
  "/watt-turnier-app/auslosung2.html",
  "/watt-turnier-app/auslosung3.html",
  "/watt-turnier-app/auslosung4.html",
  "/watt-turnier-app/auslosung5.html",
  "/watt-turnier-app/viertelfinale.html",
  "/watt-turnier-app/halbfinale.html",
  "/watt-turnier-app/finale.html"
 
];

// ------------------------------------------------------
// INSTALL: Cache vorbereiten
// ------------------------------------------------------
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES))
  );
  self.skipWaiting();
});

// ------------------------------------------------------
// ACTIVATE: Alte Caches löschen
// ------------------------------------------------------
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  clients.claim();
});

// ------------------------------------------------------
// FETCH: Online-first, Offline-Fallback
// ------------------------------------------------------
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request))
  );
});

// ------------------------------------------------------
// Version an Webseite senden
// ------------------------------------------------------
self.addEventListener("message", event => {
  if (event.data && event.data.type === "GET_VERSION") {
    event.source.postMessage({
      type: "VERSION",
      version: APP_VERSION
    });
  }
});

// Debug-Ausgabe
console.log("Service Worker Version:", APP_VERSION);









