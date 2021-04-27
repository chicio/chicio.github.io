/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-cfe4b263ebb14476a062.js"
  },
  {
    "url": "framework-21031c32233e04cc5ab1.js"
  },
  {
    "url": "app-f91aa5c507fba67c1394.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "e43bcaa8f78f8676bb30af30e157e66c"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-05ce09b8838f6c52478b.js"
  },
  {
    "url": "polyfill-b04e4eb4466a1b053d68.js"
  },
  {
    "url": "fonts/opensans/OpenSans-Regular.woff2",
    "revision": "237aa94493d93bcf630b9a062f455d0a"
  },
  {
    "url": "227fa363aede6f8cf8fa8798f64bed716da73c4e-233bd8171a9c8d13e5ac.js"
  },
  {
    "url": "914958666ef227473ebbe31d2950aff9e5b3296f-bb8eda49689fb9b30153.js"
  },
  {
    "url": "component---src-pages-index-tsx-61eb9aecd75881fa24a7.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "4412c3d1750b7b88cfdf40ec7f6a2363"
  },
  {
    "url": "page-data/sq/d/3076394108.json",
    "revision": "2e6032f945ee777fb1b8f3127223a0d7"
  },
  {
    "url": "page-data/sq/d/3309278767.json",
    "revision": "1b0c0f23e4dbb61e52b2b92734624079"
  },
  {
    "url": "page-data/sq/d/525278608.json",
    "revision": "836bcdb92c50d54ea27f85963cb9e4a5"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "61a5a9678da98fc6d1be1629fe97963c"
  },
  {
    "url": "component---src-templates-blog-tsx-fe3691afedc229b66ad9.js"
  },
  {
    "url": "page-data/blog/page-data.json",
    "revision": "76b762da8aa9b07de40dd8037b56754e"
  },
  {
    "url": "page-data/sq/d/3736063423.json",
    "revision": "58b9801c2c7d16ba8b02b2df5270e020"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "2ed366b186e0dcbef9c92e502ce83726"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-f91aa5c507fba67c1394.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
