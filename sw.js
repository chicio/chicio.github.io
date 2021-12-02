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
    "url": "webpack-runtime-83635ce9589423169c06.js"
  },
  {
    "url": "framework-9cd0c2aa5690887dcdcb.js"
  },
  {
    "url": "app-da8b3e611e7e1fa9c919.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "fce896a3a5c707da545bd21f244dabbe"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-d79825d632e08eb800de.js"
  },
  {
    "url": "polyfill-d96093af65fad258873e.js"
  },
  {
    "url": "fonts/opensans/OpenSans-Regular.woff2",
    "revision": "237aa94493d93bcf630b9a062f455d0a"
  },
  {
    "url": "components-bottom-index-2becda662bb977ba949b.js"
  },
  {
    "url": "organism-footer-e88badfb45ae7fc13118.js"
  },
  {
    "url": "7d922248f3170ff62b5a6da11be4c0a74b264aae-e035c9f760b3e2e62426.js"
  },
  {
    "url": "5e6831fc1f485ba31a1357a8b6f36ac28377926f-77eb8c19221c2556714c.js"
  },
  {
    "url": "component---src-pages-index-tsx-7632f7fc0b9a216fbf45.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "808b93b423f4d7e6af7b46923abce266"
  },
  {
    "url": "page-data/sq/d/2163799697.json",
    "revision": "f4e890ad56395550153d2527049dbd7f"
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
    "revision": "25ae24b58d6895279497956d43a6b163"
  },
  {
    "url": "745697599779acbf64bd6cb57221c6f0812223f3-d3c8c062bf482f007e3b.js"
  },
  {
    "url": "component---src-templates-blog-tsx-455e43eaa9c0b6ce5851.js"
  },
  {
    "url": "page-data/blog/page-data.json",
    "revision": "b586084e8096657384b22d83ddd9ea91"
  },
  {
    "url": "page-data/sq/d/379746230.json",
    "revision": "4704efea560c3f998dba3cef6428e91c"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "8719834ad4588597f0eb475552a13a93"
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
  if (!resources || !(await caches.match(`/app-da8b3e611e7e1fa9c919.js`))) {
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
