---
title: "Implement offline tracking with Google Analytics in your Progressive Web App"
description: "PWA offer great native alike offline capabilities. But what about tracking? In this tutorial I will show
you how simple it is to implement offline tracking with Google Analytics in your PWA."
date: 2019-12-15 
image: ../images/posts/ga-offline.jpg 
tags: [pwa, web development, javascript]
comments: true 
math: false 
authors: [fabrizio_duroni]
---

*PWA offer great native alike offline capabilities. But what about tracking? In this tutorial I will show you how simple
it is to implement offline tracking with Google Analytics in your PWA.*

---

As you may already understood from my previous post, I felt
in [love with PWA](/2019/03/03/github-pages-progressive-web-app/ "progressive web app"). For the ones "late to the
party" of PWA, let's see the definition of what they are:

> Progressive Web Apps are user experiences that have the reach of the web, and are:
>
>* Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
>* Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
>* Engaging - Feel like a natural app on the device, with an immersive user experience.
>* This new level of quality allows Progressive Web Apps to earn a place on the user's home screen.

Basically PWA brings native mobile alike experience to the web. One of the features that PWAs take from mobile apps is
offline capabilities. In fact it is possible to develop a web application that works completely offline with the help
of [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API "service worker"). But what
about tracking stuff when the web app is offline? The
standard [Google Analytics Web SDK](https://developers.google.com/analytics/devguides/collection/gtagjs "google analytics")
doesn't support offline tracking out of the box. So is it possible to avoid to loose important tracking events when your
user is using the PWA offline? Yes it is. Let's find out how we can do it :relaxed:.

#### Implementation

Make Google Analytics works offline is as simple as importing a script and call a function! This is possible thanks
to [Workbox](https://developers.google.com/web/tools/workbox). What is it? Let's the definition reported on its official
website:

> Welcome, Workbox is a set of libraries and Node modules that make it easy to cache assets and take full advantage of features used to build Progressive Web Apps.

Basically it is a JavaScript library that help developer to build full PWA. It has been developed by the some of the
Google Chrome Core Member team. One if its main feature is the support
for [Google Analytics offline tracking](https://developers.google.com/web/tools/workbox/guides/enable-offline-analytics "google analytics offline")
. This is exactly what we need! :heart_eyes:. Let's see the implementation.  
In my service worker file I imported the workbox javascript script with
the `importScript` [directive](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts "import script service worker")
. Then I setup workbox by initializing it (and I also turn the debug features). Then I just need to initialize the
workbox Google Analytics plugin and that's it. This is the final implementation.

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//...other service worker code....

workbox.setConfig({ debug: false })
workbox.googleAnalytics.initialize();

//...other service worker code....

```

#### How it works

How does workbox make your GA tracking working when your PWA is offline? The `workbox.googleAnalytics` plugin setup a
new fetch handler that intercepts all the requests made with Google Analytics. These requests are basically network
calls done with
the [Google Analytics Measurement protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1 "google analytics measurement protocol")
. When your PWA goes offline this handler stores the failed call into an
ad-hoc [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API "indexeddb api") schema
called `workbox-background-sync`. When the network came back the the requests saved are flushed and pushed to the Google
Analytics servers as measurement protocol requests. Below you can find a video that shows you the entire flow described
above.

`youtube: https://www.youtube.com/watch?v=Xshb2rM4L3w`

One important thing: for all my request you can see two entries in `workbox-background-sync` schema: one for the page
the user is visiting and one for `/blog`, the homepage of my blog. This is a consequence of the fact that for each page
on my website I use the `prefetch` tag to cache the homepage of the blog on every page on my website (because by
watching my tracking in google analytics, I saw that the majority of the visitors of my website goes to the homepage of
the blog as second page in the step of their navigation).

#### Conclusion

Google Analytics offline tracking is another feature that makes PWAs more similar to native mobile apps. As I already
said in [other posts](/2019/03/03/github-pages-progressive-web-app/ "progressive web app"), the gap between web and
native development is closing more and more each day. You can already start to think about giving almost the same user
experience to your user on all platforms (web and native). I will say a prayer for this end of the year: please Apple
don't stay behind your competitor and remember what you said in 2008 (when web technologies where not as advanced as of
today) :heart:.
