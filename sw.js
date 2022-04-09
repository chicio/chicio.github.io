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
    "url": "webpack-runtime-b66b781d5b4bbb7eabdd.js"
  },
  {
    "url": "framework-32184bd0f1f807e0608e.js"
  },
  {
    "url": "app-ce8a556031a03666dff8.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "910acf72dde19ff4b2ef6e87bc40841a"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-1f7102e6b10dd0fe9aba.js"
  },
  {
    "url": "polyfill-38c833173d687e91d2b9.js"
  },
  {
    "url": "fonts/opensans/OpenSans-Regular.woff2",
    "revision": "237aa94493d93bcf630b9a062f455d0a"
  },
  {
    "url": "components-bottom-index-073791f8557399015237.js"
  },
  {
    "url": "organism-footer-fdd3055d54efe53570ac.js"
  },
  {
    "url": "7d922248f3170ff62b5a6da11be4c0a74b264aae-986d1d3d4e34309caad3.js"
  },
  {
    "url": "914958666ef227473ebbe31d2950aff9e5b3296f-f177e9792845097cb667.js"
  },
  {
    "url": "5e6831fc1f485ba31a1357a8b6f36ac28377926f-2bb82ddbc36d5ee890d4.js"
  },
  {
    "url": "component---src-pages-index-tsx-3efab4473810713177ed.js"
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
    "revision": "e7d103ff977fbea9c9c2015ae40ecf01"
  },
  {
    "url": "745697599779acbf64bd6cb57221c6f0812223f3-fd906610d9b51bc7e90d.js"
  },
  {
    "url": "component---src-templates-blog-tsx-3d8621944c30a89daf00.js"
  },
  {
    "url": "page-data/blog/page-data.json",
    "revision": "78e5b3760e64be63361555330b334719"
  },
  {
    "url": "page-data/sq/d/379746230.json",
    "revision": "a0d4c5e6567af148c7e7a83cd03d77ed"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "661ed000eaa45746c831b5b9cb43409e"
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

    // We detected compilation hash mismatch
    // we should clear runtime cache as data
    // files might be out of sync and we should
    // do fresh fetches for them
    event.waitUntil(
      caches.keys().then(function (keyList) {
        return Promise.all(
          keyList.map(function (key) {
            if (key && key.includes(`runtime`)) {
              return caches.delete(key)
            }

            return Promise.resolve()
          })
        )
      })
    )
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
  if (!resources || !(await caches.match(`/app-ce8a556031a03666dff8.js`))) {
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
