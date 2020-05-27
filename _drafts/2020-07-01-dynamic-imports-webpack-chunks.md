---
layout: post
title: "Lazy loading of JavaScript modules by using dynamic imports and code splitting with Webpack"
description: "Most of the time you have a big JavaScript codebase for your website but you need only a small fraction of it when a page is requested. Is it possible to load chunks of JavaScript code only when they are really needed? Yes you can with Webpack and its code splitting feature based on a syntax equal to the one of ES2020 dynamic imports."
date: 2020-07-01
image: /assets/images/posts/XXX
tags: [web development, javascript]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*Most of the time you have a big JavaScript codebase for your website but you need only a small fraction of it when a page is requested. Is it possible to load chunks of JavaScript code only when they are really needed? Yes you can with Webpack and its code splitting feature based on a syntax equal to the one of ES2020 dynamic imports.*

---

Recently I migrated my website (this one you're seeing right now) to TypeScript + WebPack as bundling system. One of the main problem of my website was the dimension of the final JavaScript generated after the bundling for the [home page](/ "fabrizio duroni home"). As a consequence of the fact that this page contains a threejs physically based scene, the size of the `index.home.js` script was over 600 KB :scream:. This was too much, considering also that all this JavaScript was loaded without been used on the mobile version of the website, where this feature was turned off.  
During the last few months of my daily job at lastminute.com I worked on a project that is using Webpack for bundling the JS code. In particular, during the development of a new part of the user personal area I encountered the code splitting with lazy loading feature of Webpack and immediately I thought: "THIS IS WHAT I NEED FOR THE HOMEPAGE OF fabrizioduroni.it". : heart_eyes:  
So let's start and see how I used it on my website so that you can start to optimize your site too!!

#### Implementation



#### Conclusion