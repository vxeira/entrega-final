const CACHE = "translator-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // 👉 NÃO interceptar chamadas da API
  if (url.pathname.startsWith("/api")) {
    return; // deixa ir direto para o servidor
  }

  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
