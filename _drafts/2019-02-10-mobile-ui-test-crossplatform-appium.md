---
layout: post
title: "End to end (e2e) testing cross platform for you mobile apps with Appium"
description: "In this post I will talk about how to use Appium to write cross platform end to end tests."
date: 2019-02-10
image: /assets/images/posts/XXXXX
tags: [react native, javascript, swift, objective-c, ios, apple, android, java, mobile application development]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this post I will talk about how to use Appium to write cross platform end to end tests.*

---

During my daily job I'm used to write unit test for my code. In fact, I usually develop using [Test Driven Development]() technique. Anyway at the end of the development of a new feature you want to be sure that everything you developer works as expected. In particular, you want to test the entire new feature flow inside the app. This is usually what is called [end to end test]().
In the last few months the mobile team "team cook" at [lastminute.com group](), of which I'm a member, decided to put in place an end to end testing infrastructure for the mobile apps of our main brand [lastminute.com](), [volagratis]() and [rumbo](). In this post I will described this testing infrastructure and how it works.  
#### **Software**
To put in place the e2e infrastructure we choose

- Jenkins as our CI platform. Jenkins was already in place for our build jobs and for the submssions on the stores or to [our internal beta programs](https://www.fabrizioduroni.it/2018/07/05/distribution-enterprise-app-ios-beta.html).
- Appium as end to end testing platform. We chose it because it let us test our apps for both iOS and Android with a single tests codebase. In particular we chose javascript and webdriverio.....
