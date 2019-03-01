---
layout: post
title: "Flow, the static type checker for Javascript: How to use it and a brief comparison with TypeScript"
description: "In this post I will talk about how I used Flow to do static type checking on the JS ofa project andI will also do a brief comparison with its main rival TypeScript"
date: 2019-04-26
image: /assets/images/posts/appium.jpg
tags: [web development, javascript, typescript]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this post I will do a brief comparison between Flow and TypeScript.*

---

In my daily job at [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group") I usually work with TypeScript. Instead, my personal website (the one where you are reading this article), has been developed using JavaScript for the client side part.  
As you may already know Javascript is untyped, so it doesn't have static typing. This could lead to bug and it becames more error prone proportionally to the increase of the source code base.