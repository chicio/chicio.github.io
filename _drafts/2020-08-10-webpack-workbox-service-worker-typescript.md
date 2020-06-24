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

I already talked extensively in some previous post about [what a progressive web app is](https://www.fabrizioduroni.it/2019/03/03/github-pages-progressive-web-app.html "pwa") and how it can improve the user experience of your website. In the first development iteration I create the service worker that runs on this website without any kind of library or framework to support. This enabled me to learn the fundamental of PWAs: how they work, their lifecycle and limits. Now that I gained enough experience it's time to move on. Recently I migrated this website to Webpack and TypeScript. So I thought: "it's time also to improve my PWA codebase by leveraging some professional tool". This is the reason why I chose to rewrite my service worker in Workbox. What is workbox?

>JavaScript Libraries for adding offline support to web apps...Welcome, Workbox is a set of libraries and Node modules that make it easy to cache assets and take full advantage of features used to build Progressive Web Apps.

As the official description says, Workbox is a set of libraries that enable the developer to build PWAs in fast way by giving to them the ability to have some already prepared component to manage all the aspects of a PWA: routing, caching, tracking etc.