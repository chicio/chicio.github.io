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
    "url": "webpack-runtime-31222cd148d29072b4e5.js"
  },
  {
    "url": "framework-21031c32233e04cc5ab1.js"
  },
  {
    "url": "app-e68e0dae83f1a7677bf7.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "b958c8f85f8a20d3f551d2d43976577b"
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
    "url": "ee48cde3db4c2d3faf4aa08aad159cfd6f88b4e6-87b0f3553c9530755b6c.js"
  },
  {
    "url": "7d922248f3170ff62b5a6da11be4c0a74b264aae-75caa5b368ec9836dc70.js"
  },
  {
    "url": "component---src-pages-index-tsx-27779a71d8c4f220d298.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "16cf4305a4409cfe7bae2a2eafa28a64"
  },
  {
    "url": "page-data/sq/d/3076394108.json",
    "revision": "2e6032f945ee777fb1b8f3127223a0d7"
  },
  {
    "url": "page-data/sq/d/4028829600.json",
    "revision": "454c7a9cc426869184968e2ad5b47d39"
  },
  {
    "url": "page-data/sq/d/525278608.json",
    "revision": "03c376e9b2fe48c360443dafc45791dd"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "5989c98d00f8db21b30e6f6fd7a485d4"
  },
  {
    "url": "component---src-templates-blog-tsx-bc7fcccaf558b8d9cbc3.js"
  },
  {
    "url": "page-data/blog/page-data.json",
    "revision": "cba16e48bfde7e49727e37d27ae57ff6"
  },
  {
    "url": "page-data/sq/d/3736063423.json",
    "revision": "f3ede352b8bf1f391d4c2ddc5a36f610"
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
  if (!resources || !(await caches.match(`/app-e68e0dae83f1a7677bf7.js`))) {
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
