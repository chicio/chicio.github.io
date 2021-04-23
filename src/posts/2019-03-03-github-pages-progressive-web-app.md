---
title: "Progressive Web App: an app-like experience for your website users"
description: "In this post I will talk about how I transformed my blog on Github Pages and Jekyll into a PWA."
date: 2019-03-03
image: ../images/posts/pwa-logo.jpg
tags: [pwa, web development, javascript]
comments: true
math: false
authors: [fabrizio_duroni]
---

*In this post I will talk about how I transformed my blog on Github Pages and Jekyll into a PWA.*

---

In the last few years the gap in terms of features available between web apps and mobile native apps has decreased more
and more. Indeed a new standard is emerging that tries to basically close this gap: Progressive Web App, PWA. What is a
Progressive Web App :heart_eyes:? Let's see how Google defines it on
its [developer site](https://developers.google.com/ "google developer pwa"):

> Progressive Web Apps are user experiences that have the reach of the web, and are:
>
>* Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
>* Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
>* Engaging - Feel like a natural app on the device, with an immersive user experience.
>* This new level of quality allows Progressive Web Apps to earn a place on the user's home screen.

What does it basically means? PWAs are web applications that combine the best of the web and the best of native mobile
apps. They can reach a vast user base (as all web apps) but they also have native alike features like:

* they can work offline
* they can use hardware capabilities and are they able to receive push notifications

So I started to think: "Whoah, I can modify my blog/website to become a PWA, so that I can explore this new technology
and I can also have something that 'feels like an app' for my blog!!!".  
So how is it possible to transform a site built with Jekyll and published on Github Pages in a basic PWA? In this post I
will show you how I did it (and this article is part of the PWA described here).  
To create a basic PWA I need 3 things:

* publish the site on HTTPS
* a [web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/ "web app manifest")
* a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/ "service worker")

Let's see in details what I did to get this basic PWA checklist completed :bowtie:.

#### HTTPS

To have https on my github pages site I had to do...nothing!!!:tada::tada::tada: I already configured the site to be
HTTPS only using [cloudflare](https://www.cloudflare.com). This is the service I chose during the development of the
first version of my site to be used for HTTPS and also as [CDN](https://en.wikipedia.org/wiki/Content_delivery_network).
This was too much easy :grin:, let's move on quickly to the next step: the web app manifest.

#### Web App Manifest

The [web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/ "web app manifest") is a JSON
file that must be deployed in the root of you web application. This JSON is used by user browser about to get some
information about your web application and how it should behave when 'installed' on the user's mobile device or desktop.
This manifest is required by Chrome to show the Add to Home Screen prompt.

A typical manifest file includes the following informations:

* `name` and `short_name`, used respectively on the install screen and on the home screen of the user
* `icons`, that is an array that contains the app icons
* the `start_url` it should start at when launched
* `background_color`, used for the splash screen when the app is launched
* `display`, to tell which browser UI show when the app is launched
* `theme_color`, that sets the color of the tool bar, and may be reflected in the app's preview in task switchers.

There are also other options that could be set, like for example the `orientation`, if you want to enforce a specific
orientation of your app. You can find a complete description of the fields above in
the [Google Web Fundamentals - Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/ "Web app manifest")
article. So I created all the assets needed for my web app manifest (a new set of icons of different dimensions) and I
put them in the root of my website. Below you can find the entire JSON.

```json
{
  "name": "Chicio Coding",
  "short_name": "Chicio",
  "icons": [
    {
      "src": "assets/images/android-icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "assets/images/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/images/android-icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "assets/images/android-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "./?utm_source=pwa",
  "display": "standalone",
  "background_color": "#303F9F",
  "theme_color": "#3F51B5",
  "orientation": "portrait"
}
```

One important thing to note is that not all the platforms adhere to the web app manifest standard. In fact Apple and
Microsoft still use some custom meta tags to define the icon of the Progressive Web App. So besides the web app
manifest, to make my PWA work the same way on all the platforms I had to add the following meta tag in the head of my
pages.

```html
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="57x57" href="/assets/images/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/assets/images/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/assets/images/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/assets/images/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/assets/images/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/assets/images/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/assets/images/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/assets/images/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="167x167" href="/assets/images/apple-touch-icon-167x167.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon-180x180.png">
<meta name="msapplication-config" content="browserconfig.xml" />
<meta name="msapplication-TileColor" content="#303f9f">
<meta name="msapplication-TileImage" content="/assets/images/mstile-144x144.png">
<meta name="theme-color" content="#303F9F">
```

As you can see there's a list of meta tags named `apple-touch-icon` specific for Apple Devices, and there are also 3
tags `msapplication-*` specific for Microsoft platforms. For the Microsoft tags, one of them requires
a `browserconfig.xml` that contains, guess what... a list of icons :laughing:

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/assets/images/mstile-150x150.png"/>
            <TileColor>#303f9f</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

#### Service Worker

A service worker is the heart of a Progressive Web App. Let's see the definition of what is a service worker taken from
the [Google Web Fundamentals - Service worker](https://developers.google.com/web/fundamentals/primers/service-workers/ "Service Worker")
.

> A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like push notifications and background sync. In the future, service workers might support other things like periodic sync or geofencing. ... is the ability to intercept and handle all the network requests, including programmatically managing a cache of responses.

Whoa!!! :open_mouth: Basically service workers let your web app inherit some features that are typically found only in a
native mobile app:

* push notification
* offline support
* background sync

Anyway, there are some particular features of a service worker you must be aware of in order to fully understand how
they works:

* you can't access the DOM directly. In order to be able to manipulate the page content, you need to use the
  worker [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage "worker post message")
  api and then manipulate the page change the content if needed (using javascript).
* service workers are a programmable network proxy, allowing you to control how network requests from your page are
  handled.
* service worker don't have a global state, so on each invocation a service worker will not be aware of anything of the
  previous one (to share data between sessions, you need to use
  the [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API))

So how do I created the service worker for my blog? I started by adding a `sw.js` file to the root of project. This is
the standard position for a service worker source code. Then I added the registration script before the end of the body
of my pages. Below you can find the registration script.

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function() {
        console.log("Service Worker Registered");
      });
  } else {
    console.log('error register service worker')
  }
</script>
```

Then I started to write my service worker. To do that, first I studied the lifecycle of a service worker, composed by
the following main events:

* `install`, launched when the service worker will be installed
* `activate`, launched just after the installation process has been completed correctly.
* `fetch`, launched on each fetch request executed inside the page

So in the install event I followed the standard approach:

* I opened the cache for my blog pwa with name {% raw %}`chicioCodingCache{% include version.txt %}`{% endraw %}, where
  version.txt is a file that is automatically filled with the latest tag number on each `npm version` execution.
* I added to the cache the files needed to make my pwa works (css and js of the site, and in the future also a HTML
  scaffolding structure :stuck_out_tongue_winking_eye:).

In the activate event I added a strategy to manage the old caches: I just delete them and I kept only the new one
created during the install phase. Then in the fetch event I decided the cache strategy for all the network request made
inside my pages. What I chose is basically to return immediately the element if it is present in the cache while at the
same time try to update it in the cache. So the next time the user will see the content updated.  
To manage the fact that not all the browsers implement the
entire [Service Worker Cache API](https://w3c.github.io/ServiceWorker/#cache-objects "service worker cache api"), I
added a polyfill to manage this inconsistency and imported it with
the [WebWorker importScripts() api](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts "webworker import scripts api")
.  
One last note: I had to put the frontmatter header inside the service worker source code file to let jekyll understand
that the file that contains the service worker must be processed. Jekyll in this way will add:

* the cache version number as explained above (`version.txt` include file)
* the list of js and css urls to be cached in the install events (I generate this urls lists with a script that extracts
  them from other Jekyll template files and put them inside `service-worker-home-urls.js`, `service-worker-blog-urls.js`
  and `service-worker-css-urls.js`)

Below you can find the complete implementation of the service worker.

```javascript
---
---
importScripts('/cache-polyfill.js');

const siteCacheName = {% raw %}'chicioCodingCache{% include version.txt %}';{% endraw %}
const dependenciesUrls = [
  "/favicon.ico",
  {% raw %}{% include service-worker-home-urls.js %}{% endraw %}
  {% raw %}{% include service-worker-blog-urls.js %}{% endraw %}
  {% raw %}{% include service-worker-css-urls.js %}{% endraw %}
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(siteCacheName).then((cache) => {
      return cache.addAll(dependenciesUrls);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== siteCacheName
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(siteCacheName).then(async (cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
```

#### Conclusion

By adding all the above implementation my blog is now a Progressive Web App (that's right, the article you're reading
part of a PWA :smirk:). If you want to see the entire source code of my website/blog discussed here you can have a look
at [this repository](https://github.com/chicio/old.chicio.github.io "chicio coding repository").  
So now it's time to start to develop you first PWA or transform you website/ web application in PWA. If you want, you
could share your experience with me in the comments below :two_hearts:.
