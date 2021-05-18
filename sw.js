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
    "url": "webpack-runtime-9e4b87eca5287813d612.js"
  },
  {
    "url": "framework-0068a62ee68a6c63e163.js"
  },
  {
    "url": "app-34e3fb20d661ab66abb8.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "b861aae83ea2395afbb38829db8f6a83"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-eb52572bd61f7bd65bf0.js"
  },
  {
    "url": "polyfill-525686c79aa0ae99dc55.js"
  },
  {
    "url": "fonts/opensans/OpenSans-Regular.woff2",
    "revision": "237aa94493d93bcf630b9a062f455d0a"
  },
  {
    "url": "components-bottom-index-39c0a811252d53955f4c.js"
  },
  {
    "url": "components-design-system-organism-footer-382337ad8d49c66c5c0c.js"
  },
  {
    "url": "ee48cde3db4c2d3faf4aa08aad159cfd6f88b4e6-7c34d1a33354fa824cc5.js"
  },
  {
    "url": "7d922248f3170ff62b5a6da11be4c0a74b264aae-b2ea3ba6502ca270d223.js"
  },
  {
    "url": "2a69574c883e993fddd016d4916ae12587d04023-06395b45e6609996c106.js"
  },
  {
    "url": "component---src-pages-index-tsx-6439b2b122123845fe89.js"
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
    "revision": "d42fe5cdafcc343badf11f961da9d8f5"
  },
  {
    "url": "organism-footer-d00079effdbbe29c5a7c.js"
  },
  {
    "url": "0b563502664135157fbdc42025149bd3e131215e-2df713d4fb78fe1e9943.js"
  },
  {
    "url": "component---src-templates-blog-tsx-335d1927a4b75805e0b2.js"
  },
  {
    "url": "page-data/blog/page-data.json",
    "revision": "c8ebe7d4edd44f0d6932af0670eff233"
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
  if (!resources || !(await caches.match(`/app-34e3fb20d661ab66abb8.js`))) {
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
