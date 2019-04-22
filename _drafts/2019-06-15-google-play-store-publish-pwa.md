---
layout: post
title: "Publish your Progressive Web App to the Google Play Store"
description: "You can now publish your PWA to the Google Play Store using Trusted Web Activities"
date: 2019-06-15
image: XXXX
tags: [android, pwa, java, mobile application development, web development, javascript]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*You can now publish your PWA to the Google Play Store using Trusted Web Activities.*

---

A few months ago I [transformed my blog into a Progressive Web App](/2019/03/03/github-pages-progressive-web-app.html). As you may already know PWA let your websites behaves like a native mobile app but there's one thing that was still missing: the possibility to publish on the App Stores. Because even if a PWA as the advantage to be searchable as astandard website, this days user are used to search ofr apps on the App Stores for each platform. Well, starting from february 2019 this problem has been solved on the Android platform with the release of [Trusted Web Activities](https://developers.google.com/web/updates/2019/02/using-twa "trusted web activities").  
In this post I will show you how I released the PWA of my blog to the Google Play Store using Trusted Web Activities (and also without writing a single line of Java code :smirk:).
Let's start from the definition of what a Trusted Web Activities is, by quoting [the official Google developer website](https://developers.google.com/web/updates/2019/02/using-twa "trusted web activities").

>There are a few things that make Trusted Web Activities different from other ways to integrate web content with your app:
>
> * Content in a Trusted Web activity is trusted -- the app and the site it opens are expected to come from the same developer. (This is verified using Digital Asset Links.)
> * Trusted Web activities come from the web: they're rendered by the user's browser, in exactly the same way as a user would see it in their browser except they are run fullscreen. Web content should be accessible and useful in the browser first.
> * Browsers are also updated independent of Android and your app -- Chrome, for example, is available back to Android Jelly Bean. That saves on APK size and ensures you can use a modern web runtime. (Note that since Lollipop, WebView has also been updated independent of Android, but there are a significant number of pre-Lollipop Android users.)
> * The host app doesn't have direct access to web content in a Trusted Web activity or any other kind of web state, like cookies and localStorage. Nevertheless, you can coordinate with the web content by passing data to and from the page in URLs (e.g. through query parameters, custom HTTP headers, and intent URIs.)
> * Transitions between web and native content are between activities. Each activity (i.e. screen) of your app is either completely provided by the web, or by an Android activity

....