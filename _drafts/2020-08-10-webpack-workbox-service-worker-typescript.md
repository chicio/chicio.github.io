---
layout: post
title: "Create a service worker with Workbox, Webpack and TypeScript"
description: "Recently I migrated my website to Webpack and TypeScript. I decided also to give a try to Workbox, a set of Google libraries to improve the creation of a Progressive Web App. Let's see how easy it is to create a PWA with this tools."
date: 2020-07-10
image: /assets/images/posts/xxx
tags: [web development, javascript, pwa]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*Recently I migrated my website to Webpack and TypeScript. I decided also to give a try to Workbox, a set of Google libraries to improve the creation of a Progressive Web App. Let's see how easy it is to create a PWA with this tools.*

---

I already talked extensively in some previous post about [what a progressive web app is](https://www.fabrizioduroni.it/2019/03/03/github-pages-progressive-web-app.html "pwa") and how it can improve the user experience of your website. In the first development iteration I create the service worker that runs on this website without any kind of library or framework to support. This enabled me to learn the fundamental of PWAs: how they work, their lifecycle and limits. Now that I gained enough experience it's time to move on. Recently I [migrated this website to Webpack and TypeScript](/2020/06/02/dynamic-imports-webpack-chunks.html "chunks webpack"). So I thought: "it's time also to improve my PWA codebase by leveraging some professional tool". This is the reason why I chose to rewrite my service worker in Workbox. What is workbox?

>JavaScript Libraries for adding offline support to web apps...Welcome, Workbox is a set of libraries and Node modules that make it easy to cache assets and take full advantage of features used to build Progressive Web Apps.

As the official description says, Workbox a TypeScript library that enable developers to build PWAs in a fast way by giving to them the ability to have some already prepared component to manage all the aspects of a PWA: routing, caching, tracking etc.  As reported on the official website Workbox is subdivided into modules, where each one of them covers a different PWA feature.

>* workbox-background-sync, use background sync to reliably make a network request even if the user is offline.
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

So let's see how I used it and how I took advantage of some of its major features, including the full integration with Webpack.

#### Implementation

As I already said, Workbox is written in TypeScript. So let's start by creating a new file called `sw.ts`. The first thing we need to do is call some service worker lifecycle method, `skipWaiting` and `clientsClaim`. When you install an update of a service worker, the new one will not be used until you close all the tabs already controlled by the service worker and relaunch the web app. If you don't need that feature, you can make your new service worker activate sooner by calling the `skipWaiting` function. In case you want to force all the tabs open to be immediately controller by a new updated version of your service worker you can call `clientsClaim`. Both this lifecycle functions are contained in the `workbox-core` module, so we can just import and call them.

```typescript
import { skipWaiting, clientsClaim } from "workbox-core"

//...

skipWaiting()
clientsClaim()

```
