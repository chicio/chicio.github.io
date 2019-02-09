---
layout: post
title: "Transform your Github Pages blog into a Progressive Web App"
description: "In this post I will talk about how I transformed my blog on Github Pages and Jekyll into a PWA."
date: 2019-03-15
image: /assets/images/posts/XXXXXXXX
tags: [pwa, web development, javascript],
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this post I will talk about how I transformed my blog on Github Pages and Jekyll into a PWA.*

---

In the last few years the gap in terms of features available between web apps and mobile native apps has decreased more and more. Indeed a new standard is emergin that try to basically close this gap: Progressive Web App, PWA.
What is a Progressive Web App :heart_eyes:? Let's see how Google defines it on its [developer site](developers.google.com "google developer pwa"):

>Progressive Web Apps are user experiences that have the reach of the web, and are:
>
>* Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
>* Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
>* Engaging - Feel like a natural app on the device, with an immersive user experience.
>* This new level of quality allows Progressive Web Apps to earn a place on the user's home screen.

What does basically means? PWAs are web application that combine the best of the web and the best of native mobile apps. They can reach a vast user base (as all web apps) but they also have native alike features like:

* they can work offline
* they can use hardware capabilities and are they able to receive push notifications

Soooo I started to think: "Whoah, I can modify my blog/website to become a PWA, so that I can explore this new technology and I can also have something that 'feels like an app' for my blog!!!".  
So how is it possible to transform a site build with Jekyll and published on Github Pages in a basic PWA? In this post I will show you how I did it (and this article is part of the PWA described here).  
To create a basic PWA we need 3 things:

* publish the site on HTTPS
* a [web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/ "web app manifest")
* a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/ "service worker")

Let's see in details what I did to get this basic PWA checklist completed :bowtie:.

#### HTTPS
To have https on my github pages site I had to do...nothing!!!:tada::tada::tada: I already configured the site to be HTTPS only using [cloudflare](https://www.cloudflare.com). This is the service I chose during the development of the first version of  my site to be used for HTTPS and also as [CDN](https://en.wikipedia.org/wiki/Content_delivery_network). This was too much easy :grin:, let's move on quickly to the next step: the web app manifest.


#### Web App Manifest
The [web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/ "web app manifest") is a JSON file that must be deployed in the root of you we application. This JSON is used by user browser about to get some information about your web application and how it should behave when 'installed' on the user's mobile device or desktop. This manifest is required by Chrome to show the Add to Home Screen prompt.

A typical manifest file includes the following informations:
* the app name
* the app icons
* the start_url it should start at when launched

....


