---
title: "Create a service worker with Workbox, Webpack and TypeScript"
description: "Recently I migrated my website to Webpack and TypeScript. I decided also to give a try to Workbox, a set
of Google libraries to improve the creation of a Progressive Web App. Let's see how easy it is to create a PWA with this
tools."
date: 2020-08-07 
image: ../images/posts/workbox.jpg 
tags: [web development, javascript, pwa, typescript]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Recently I migrated my website to Webpack and TypeScript. I decided also to give a try to Workbox, a set of Google
libraries to improve the creation of a Progressive Web App. Let's see how easy it is to create a PWA with this tools.*

---

I already talked extensively in some previous post
about [what a progressive web app is](https://www.fabrizioduroni.it/2019/03/03/github-pages-progressive-web-app/ "pwa")
and how it can improve the user experience of your website. In the first development iteration I create the service
worker that runs on this website without any kind of library or framework to support. This enabled me to learn the
fundamental of PWAs: how they work, their lifecycle and limits. Now that I gained enough experience it's time to move
on. Recently
I [migrated this website to Webpack and TypeScript](/2020/06/02/dynamic-imports-webpack-chunks/ "chunks webpack").
So I thought: "it's time also to improve my PWA codebase by leveraging some professional tool". This is the reason why I
chose to rewrite my service worker in Workbox. What is workbox?

> JavaScript Libraries for adding offline support to web apps...Welcome, Workbox is a set of libraries and Node modules that make it easy to cache assets and take full advantage of features used to build Progressive Web Apps.

As the official description says, Workbox a TypeScript library that enable developers to build PWAs in a fast way by
giving to them the ability to have some already prepared component to manage all the aspects of a PWA: routing, caching,
tracking etc. As reported on the official website Workbox is subdivided into modules, where each one of them covers a
different PWA feature.

> * workbox-background-sync, use background sync to reliably make a network request even if the user is offline.
>* workbox-broadcast-update, to send messages to pages (via Broadcast Channels) when a cache is updated with a new response.
>* workbox-cacheable-response, to restrict which requests are cached based on a response's status code or headers.
>* workbox-core, to alter log levels and change cache names via workbox-core. Contains shared code used by all Workbox libraries.
>* workbox-expiration, removed cached requests based on the number of items in a cache or the age of the cached request.
>* workbox-google-analytics, see how users are interacting with your site when they are offline.
>* workbox-navigation-preload, enable navigation preload, to get a network response for navigation requests faster.
>* workbox-precaching, easily precache a set of files and efficiently manage updates to files.
>* workbox-range-request, this modules provides support for responding to a Range: request using a slice of previously cached data.
>* workbox-routing, routes requests in your service worker to specific caching strategies or callback functions.
>* workbox-strategies, a set of runtime caching strategies that will handle responding to a request, normally used with workbox-routing.
>* workbox-streams, this modules provides support for composing a response from a series of streaming sources.

So let's see how I used it and how I took advantage of some of its major features, including the full integration with
Webpack.

#### Implementation

As I already said, Workbox is written in TypeScript. So let's start by creating a new file called `sw.ts`. The first
thing we need to do is call some service worker lifecycle method, `skipWaiting` and `clientsClaim`. When you install an
update of a service worker, the new one will not be used until you close all the tabs already controlled by the service
worker and relaunch the web app. If you don't need that feature, you can make your new service worker activate sooner by
calling the `skipWaiting` function. In case you want to force all the tabs open to be immediately controller by a new
updated version of your service worker you can call `clientsClaim`. Both this lifecycle functions are contained in
the `workbox-core` module, so we can just import and call them.

```typescript
import { skipWaiting, clientsClaim } from "workbox-core"

//...other code...

skipWaiting()
clientsClaim()

//...other code...
```

Now we are ready to setup it's time to understand and setup caches with Workbox. All the caches inside the framework are
based on the concept of **routes** and **strategies**. Service worker can intercept network requests for a page and can
respond to the browser with cached content, content from the network or content generated in the service worker. To
define which request must be intercepted and served by the service worker, you must define its **routes**. The way the
service worker handle the **routes** (for example cache only, network first etc.) are the **strategies**. Usually when
you write your own service worker you define some files to precache during the service worker installation process and
then for the routes you want to serve from it their related strategies.  
Let's start with the precache of some files. This is usually done manually by the developer in the `install` event, and
usually the resource that are cached are the ones needed in order to have the PWA work offline. In my cases, and
generally speaking for a blog/news website, this basically means save in the cache JavaScript and CSS files. Workbox
give us the `precacheAndRoute` function to do this. It is possible to pass to this function a list of files to be cached
and it will take care of creating an ad-hoc cache and same the files during the installation process. To build this
website I'm using Webpack as JavaScript bundler. Workbox has a great support for it. In particular for the precache
phase, there is the npm package `workbox-webpack-plugin` that contains a plugin called `InjectManifest`. This plugin is
able to inject in the Service Worker code a variable named `__WB_MANIFEST` that contains a list of the entry
points/generated files of the Webpack bundling process. So in my service worker I can precache the files I need by just
writing `precacheAndRoute(self.__WB_MANIFEST)`. Anyway there's a problem: I want to cache some additional files during
the installation process to be used to manage errors related to content not available in the caches and that it is not
possible to load due to network errors. It is possible to add these additional files with the standard way in
the `install` event. In my case I decided to create an ad-hoc cache to save these files. Last but not least in the
install event I decided also to clear all the caches. In this way on every install of a new service worker version I
will initialize all the caches. All the caches that I'm using are identified by the constants `CACHE_<purpose>` (and we
will see in a few moments how I'm using them :smirk:). Below you can find the code for the precache and install event.

```typescript
import { precacheAndRoute } from 'workbox-precaching';

//...other code...

const CACHE_PREFIX = 'workbox-chicio-coding'
const CACHE_OFFLINE_NAME = `${CACHE_PREFIX}-offline`
const CACHE_SCRIPT_NAME = `${CACHE_PREFIX}-scripts`
const CACHE_STYLES_NAME = `${CACHE_PREFIX}-styles`
const CACHE_DOCUMENTS_NAME = `${CACHE_PREFIX}-documents`
const CACHE_FONTS_NAME = `${CACHE_PREFIX}-fonts`
const CACHE_IMAGES_NAME = `${CACHE_PREFIX}-images`

const OFFLINE_PAGE_URL = '/offline.html'
const OFFLINE_PAGE_NO_NETWORK_IMAGE_URL = '/assets/images/no-wifi.png'

//...other code...

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST)
googleAnalytics.initialize()

self.addEventListener('install', (event: ExtendableEvent) => {
  const offlineUrls = [
    OFFLINE_PAGE_URL,
    OFFLINE_PAGE_NO_NETWORK_IMAGE_URL
  ];
  event.waitUntil(
    Promise.all([
      caches.delete(CACHE_DOCUMENTS_NAME),
      caches.delete(CACHE_SCRIPT_NAME),
      caches.delete(CACHE_STYLES_NAME),
      caches.delete(CACHE_FONTS_NAME),
      caches.delete(CACHE_IMAGES_NAME),
      caches.open(CACHE_OFFLINE_NAME).then((cache) => cache.addAll(offlineUrls))
    ])
  );
})

//...other code...
```

After the precache we define the routes and strategies for the network call after the install events. In my
implementation I decided to setup a cache for each one of the following assets:

* styles (CSS files)
* scripts (JavaScript files)
* documents (HTML files)
* fonts
* images

Each route is registered in the service worker with the `registerRoute` function. It expects 3 parameters: a regex that
defines the URLs intercepted by the route, a strategy handler and eventually the HTTP method expected on the route (the
last two parameters are optional and could be substituted by a `Route` object that contains this 3 params). In our case,
as a consequence of the fact that I decided that all the routes must be served with a `CacheFirst` strategy, we can
define a `registerRoute` function that defines a route with a cache first strategy given the regex of the route, the
cache name and the `ExpirationPlugin`. What is an `ExpirationPlugin`? It is a class that define the retention policy of
the cache to which it is assigned. In our case I defined different `ExpirationPlugin` instances based on the policy I
chosen for each media type supported by the routes we defined above:

* 15 days for the styles
* 180 days for the fonts
* 60 days for the images
* 60 days for the documents

Above you can see the implementation for the routes and strategies.

```typescript
import { registerRoute, Route } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst } from 'workbox-strategies';

//...other code...

const stylesScriptsExpirationPlugin = new ExpirationPlugin({
  maxEntries: 10,
  maxAgeSeconds: 15 * 24 * 60 * 60,
  purgeOnQuotaError: true
})
const fontsExpirationPlugin = new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 180 * 24 * 60 * 60 })
const imagesExpirationPlugin = new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 })
const documentExpirationPlugin = new ExpirationPlugin({
  maxEntries: 50,
  maxAgeSeconds: 60 * 24 * 60 * 60,
  purgeOnQuotaError: true
})

//...other code...

const registerCacheFirstRouteUsing = (
  destination: RequestDestination,
  cacheName: string,
  expirationPlugin: ExpirationPlugin
): Route => registerRoute(
  ({ request }) => request.destination === destination,
  new CacheFirst({
    cacheName: cacheName,
    plugins: [expirationPlugin],
  })
)

registerCacheFirstRouteUsing('style', CACHE_STYLES_NAME, stylesScriptsExpirationPlugin)
registerCacheFirstRouteUsing('script', CACHE_SCRIPT_NAME, stylesScriptsExpirationPlugin)
registerCacheFirstRouteUsing('document', CACHE_DOCUMENTS_NAME, documentExpirationPlugin)
registerCacheFirstRouteUsing('font', CACHE_FONTS_NAME, fontsExpirationPlugin)
registerCacheFirstRouteUsing('image', CACHE_IMAGES_NAME, imagesExpirationPlugin)

//...other code...
```

Now there's a question we didn't answer: how do we manage the requests that will fail? There are multiple possibilities
to manage these cases. In our case I decided to go for a global catch handler. By calling `setCatchHandler` it is
possible to catch all the network/cache error for all the routes defined. We can give a callback to this function where
we can define an error recovery strategy for each type of error. In our case we respond with the offline page (see the
offline cache defined in the precache/install event) if the error happens on a resource of type `document` (so an html
page that can be loaded completely), and we return a generic error for all the other fail (images loading fail, scripts
fail etc.). Below you can find the implementation of the cache handler.

```typescript
import { setCatchHandler } from 'workbox-routing';

//...other code...

setCatchHandler((options: RouteHandlerCallbackOptions): Promise<Response> => {
  const isADocumentRequest = (options: RouteHandlerCallbackOptions): boolean =>
    !(typeof options.request === 'string') && options.request.destination == 'document';
  const isAOfflinePageImageRequest = (options: RouteHandlerCallbackOptions): boolean =>
    !(typeof options.request === 'string') &&
    options.request.destination == 'image' &&
    options.url?.pathname == OFFLINE_PAGE_NO_NETWORK_IMAGE_URL

  if (isADocumentRequest(options)) {
    return caches.match(OFFLINE_PAGE_URL) as Promise<Response>;
  }

  if (isAOfflinePageImageRequest(options)) {
    return caches.match(OFFLINE_PAGE_NO_NETWORK_IMAGE_URL) as Promise<Response>;
  }

  return Promise.resolve(Response.error());
})

//...other code...
```

As a consequence of the fact that I'm migrating my previous version of the service worker for my website, I needed also
to migrate the part that is responsible for getting messages from the page related to the pull to refresh. In this case
the previous version of the code was responsible for the clear of some caches. We can write this feature using
the `deleteCacheAndMetadata` method of the `ExpirationPlugin` class. Below you can find the related code.

```typescript
//...other code...

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const isARefresh = (event: ExtendableMessageEvent): boolean => event.data.message === 'refresh'
  const sendRefreshCompletedMessageToClient = (event: ExtendableMessageEvent): void => event.ports[0].postMessage({ refreshCompleted: true })

  if (isARefresh(event)) {
    Promise.all([
      imagesExpirationPlugin.deleteCacheAndMetadata(),
      documentExpirationPlugin.deleteCacheAndMetadata()
    ])
      .then(() => sendRefreshCompletedMessageToClient(event))
      .catch(() => sendRefreshCompletedMessageToClient(event))
  }
})

//...other code...
```

In a [previous post](/2019/12/15/pwa-offiline-tracking-google-analytics/) I already talked about the fact that
workbox could help us to manage the Google Analytics tracking when the PWA is offline. So for this part, we just need (
as in the previous version of my service worker) to call the `googleAnalytics.initialize()` function and workbox will
take care of:

* store the analytics tracking occured while the app is offline
* sync this tracking events to the server when a network connection is available again

```typescript
import * as googleAnalytics from 'workbox-google-analytics';

//...other code...

googleAnalytics.initialize()

//...other code...
```

One important thing to be noted here is that in my project I'm using TypeScript with the strict types activated and
ESLint. As a consequence of this fact I have to add two things to the code we saw above:

* add a declaration in order to let TypeScript know that `self` is a `ServiceWorkerGlobalScope`
* a `@ts-ignore` annotation to let TypeScript know that the `__WB_MANIFEST` will be available at compile time (Webpack
  bundling), and an additional `eslint-disable-next-line @typescript-eslint/ban-ts-comment` comment to avoid ESLint
  complaining about the `@tsignore` comment. :laughing:

```typescript
//...other code...

// Fix self: https://stackoverflow.com/questions/56356655/structuring-a-typescript-project-with-workers
declare const self: ServiceWorkerGlobalScope;
export {};

//...other code...

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST)

//...other code...
```

Now that the service worker code has been migrated to Workbox you may ask if we can do something also for the service
worker registration, and generaly speaking for all the service worker code inside the window context. The answer to this
question is an additional workbox module called `workbox-window`. This module let the developers register their service
worker and eventually use all its feature. In my case in the window context I'm doing 2 operation:

* the service worker registration
* I send a message to the service worker to clear some of the caches whenever a user starts a pull to refresh

We can wrote these feature by using an instance of `Workbox` and its two methods `register` and `messageSW`. Below you
can find the two function `registerToServicerWorker` and `sendMessageToServiceWorker` that I rewrote
with `workbox-window`.

```typescript
import { Workbox } from "workbox-window";

interface ServiceWorkerMessage {
  message: string;
}

const wb = new Workbox('/sw.js')

const isServiceWorkerSupported: () => boolean = () => ('serviceWorker' in navigator)

const registerToServicerWorker = (): void => {
  if (isServiceWorkerSupported()) {
    wb.register()
      .then(() => {
        console.log('Service Worker registration completed')
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err)
      })
  }
}

const sendMessageToServiceWorker = (message: ServiceWorkerMessage): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    wb.messageSW(message).then((event: MessageEvent): void => {
      if (event.data) {
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }
    })
  })
}

export { sendMessageToServiceWorker, registerToServicerWorker, isServiceWorkerSupported }
```

#### Conclusion

As you can see, writing a service worker with Typescript and Workbox is really easy. During the last time during my
daily job I'm basically doing more and more web development instead of mobile apps. I feel like I'm almost reaching the
mythological status of the "fullstack developer". :laughing: Let's see what the future holds for me.
