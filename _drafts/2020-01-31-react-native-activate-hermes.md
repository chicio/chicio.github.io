---
layout: post
title: "How to: enable Hermes JavaScript engine in your React Native app"
description: "React native 0.60.4 has a new cool feature for Android: a new JavaScript engine called Hermes. Let's see how you can turn it on in your React Native application to get all its benefits."
date: 2020-01-31
image: /assets/images/posts/XXXX
tags: [pwa, web development, javascript]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*React native 0.60.4 has a new cool feature for Android: a new JavaScript engine called Hermes. Let's see how you can turn it on in your React Native application to get all its benefits.*

---

As you already my know, there has been some complains in the past related to the performance of React Native on the Android platform. One of the main reason was due to a big different in the React Native architecture implementation between Android and iOS: the JavaScript engine used to execute your code. On iOS React Native uses the [JavaScript Core engine exposed in the iOS SDK](https://developer.apple.com/documentation/javascriptcore). On Android the SDK doesn't offer the same feature, so the React Native Android implementation embed a compiled version of the JavaScript Core engine. AS a consequence of this fact the engine used on Android didn't receive the regular updates that the iOS counterpart receive on each system major update, and was also not optimized for React Native and generally speaking for executing JavaScript code for mobiles apps. This is the reason way the Facebook React Native team decided to create [Hermes, an open source JavaScript engine optimized for mobile apps](https://engineering.fb.com/android/hermes/).  
Which benefits brings to the table this new Engine? As reported in the blog presentation post, there were a few key metrics kept in consideration by the Facebook React Native team:

>For JavaScript-based mobile applications, user experience benefits from attention to a few primary metrics:
>
>The time it takes for the app to become usable, called time to interact (TTI)
>The download size (on Android, APK size)
>Memory utilization

That seems really cool!! Hermes is available starting from React Native 0.60.4. Now the question is: how can you start to use it? Let's see how we enabled this new cool new engine in the [lm group](https://careers.lastminute.com/) mobile apps (did you remember [how much we love React Native](/2018/07/04/react-native-typescript-existing-app.html)?) while we were doing the upgrade to the latest version of React Native in order to enable AndroidX in our apps.

#### Implementation


https://facebook.github.io/react-native/docs/hermes