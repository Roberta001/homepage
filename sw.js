// 版本自毁标识
const SUICIDE_VERSION = 'KILL_SW_' + Date.now();

// 立即触发更新流程
self.addEventListener('install', event => {
  self.skipWaiting();  // 强制接管控制权
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    })
  );
});

// 核弹级清理
self.addEventListener('activate', event => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => client.navigate(client.url))
      });
    })
  );
});

// 阻止任何缓存行为
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response(null, {status: 408, statusText: 'Request Timeout'})
    })
  );
});