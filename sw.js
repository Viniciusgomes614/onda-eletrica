// Esse arquivo é o "Service Worker". 
// Ele diz ao celular do usuário que o seu site é, de fato, um aplicativo.

const CACHE_NAME = 'onda-eletrica-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Apenas repassa as requisições (não salva cache agressivo para evitar bugs nas suas atualizações)
  event.respondWith(fetch(event.request));
});
