/* H.E.A.T. Camera Manager — Service Worker (Push) */
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("push", event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch(e) { d = { body: event.data ? event.data.text() : "" }; }
  const title = d.title || "H.E.A.T. — Kamera-Management";
  event.waitUntil(self.registration.showNotification(title, {
    body: d.body || "",
    tag: d.tag || "heat",
    requireInteraction: true,
    icon: "icon-192.png",
    badge: "icon-192.png",
    vibrate: [200, 100, 200]
  }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type:"window", includeUncontrolled:true }).then(list => {
    for (const c of list) { if ("focus" in c) return c.focus(); }
    if (self.clients.openWindow) return self.clients.openWindow("./");
  }));
});
