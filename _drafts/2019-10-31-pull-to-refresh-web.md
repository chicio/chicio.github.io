---
layout: post
title: "Tutorial: implement a pull to refresh for you web application"
description: "Implementing a pull to refresh component in vanilla js for your progressive web app (PWA) it's really easy. Let's do it now!"
date: 2019-11-20
image: /assets/images/posts/XXXXXX
tags: [pwa, web development, javascript]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*Implementing a pull to refresh component in vanilla js for your progressive web app (PWA) it's really easy. Let's do it now!*

---

Some months ago I [transformed my website into a Progressive Web App]() (yes, the one you're reading now). By leveraging the power of service workers (and other some cool tricks that I will discuss in other posts :stuck_out_tongue_winking_eye:) my website page load time is below 50 milliseconds :open_mouth:. But with "the great power of service workers comes also great responsibility" (you remember [uncle Ben quote](https://www.google.com/search?q=from+great+power+comes+great+responsibility), right?), and one of this responsability is let the user be able to refresh all the content whenever it wants (to check new/update stuff). Which is a mechanism/UX pattern that every user in the world already know for this kind of functionality? The [pull to refresh](https://en.wikipedia.org/wiki/Pull-to-refresh). The choise of this pattern is also a natural consequence of the fact that, as [I already told you previously in another post](), Progressive Web App are the technology that fill the gap between web and mobile native app. Unfortunately in the web development world there's not yet a standard component for pull to refresh. This is way in this post I will show you how to implement it from scratch without any JavaScript library/framework. I will only use vanilla JavaScript, HTML, CSS and the service worker *message* capability with `postMessage` and `MessageChannel` class.
Let's start from the implementation of the UI (HTML and CSS)

#### UI: HTML and CSS


#### JavaScript


#### Service Worker


#### Conclusion