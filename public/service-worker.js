
    // Based off of https://github.com/pwa-builder/PWABuilder/blob/main/docs/sw.js

    /*
      Welcome to our basic Service Worker! This Service Worker offers a basic offline experience
      while also being easily customizeable. You can add in your own code to implement the capabilities
      listed below, or change anything else you would like.


      Need an introduction to Service Workers? Check our docs here: https://docs.pwabuilder.com/#/home/sw-intro
      Want to learn more about how our Service Worker generation works? Check our docs here: https://docs.pwabuilder.com/#/studio/existing-app?id=add-a-service-worker

      Did you know that Service Workers offer many more capabilities than just offline? 
        - Background Sync: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/06
        - Periodic Background Sync: https://web.dev/periodic-background-sync/
        - Push Notifications: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=push-notifications-on-the-web
        - Badges: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=application-badges
    */

    const HOSTNAME_WHITELIST = [
        self.location.hostname,
        'fonts.gstatic.com',
        'fonts.googleapis.com',
        'cdn.jsdelivr.net'
    ]

    // Bump this to invalidate old caches after deploys
    const CACHE_NAME = 'pwa-cache-v2'

    // The Util Function to hack URLs of intercepted requests
    const getFixedUrl = (req) => {
        var now = Date.now()
        var url = new URL(req.url)

        // 1. fixed http URL
        // Just keep syncing with location.protocol
        // fetch(httpURL) belongs to active mixed content.
        // And fetch(httpRequest) is not supported yet.
        url.protocol = self.location.protocol

        // 2. add query for caching-busting.
        // Github Pages served with Cache-Control: max-age=600
        // max-age on mutable content is error-prone, with SW life of bugs can even extend.
        // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
        // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
        if (url.hostname === self.location.hostname) {
            url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
        }
        return url.href
    }

    // Ensure the new Service Worker activates immediately after install
    self.addEventListener('install', (event) => {
      self.skipWaiting()
    })

    /**
     *  @Lifecycle Activate
     *  Clean old caches and take control of clients.
     */
    self.addEventListener('activate', event => {
      event.waitUntil(
        (async () => {
          const cacheNames = await caches.keys()
          await Promise.all(
            cacheNames
              .filter((name) => name !== CACHE_NAME)
              .map((name) => caches.delete(name))
          )
          await self.clients.claim()
        })()
      )
    })

    /**
     *  @Functional Fetch
     *  All network requests are being intercepted here.
     *
     *  void respondWith(Promise<Response> r)
     */
    self.addEventListener('fetch', event => {
    // Skip some of cross-origin requests, like those for Google Analytics.
    if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
        // Cache-first strategy: check cache first, then network
        event.respondWith(
          caches.match(event.request)
            .then((cachedResponse) => {
              // If found in cache, return it
              if (cachedResponse) {
                return cachedResponse
              }

              // Otherwise, fetch from network
              return fetch(getFixedUrl(event.request), { cache: 'no-store' })
                .then((networkResponse) => {
                  // Only cache successful responses
                  if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone()
                    event.waitUntil(
                      caches.open(CACHE_NAME)
                        .then((cache) => cache.put(event.request, responseToCache))
                        .catch(() => { /* eat any errors */ })
                    )
                  }
                  return networkResponse
                })
                .catch(() => {
                  // If network fails and no cache, return a basic error response
                  return new Response('Offline', {
                    status: 408,
                    statusText: 'Request Timeout'
                  })
                })
            })
        )
    }
    })
