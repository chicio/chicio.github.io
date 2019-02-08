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
What is a Progressive Web App? Let's see how Google defines it on its [developer site](developers.google.com "google developer pwa"):

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
So how is it possible to transform a site build with Jekyll and published on Github Pages in a basic PWAs. In this post I will show you how I did it (and this article is part of the PWA described here).  
first 