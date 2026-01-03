// ------------------------------------------------------
// Version deiner App (nur hier ändern!)
// ------------------------------------------------------
const APP_VERSION = "1.0.0";

// Sofort aktiv werden
self.addEventListener("install", event => {
  self.skipWaiting();
});

// Neue Version sofort übernehmen
self.addEventListener("activate", event => {
  clients.claim();
});

// Immer die neueste Datei laden
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});

// Webseite fragt nach der Version → Service Worker antwortet
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
