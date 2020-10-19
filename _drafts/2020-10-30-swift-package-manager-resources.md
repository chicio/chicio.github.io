---
layout: post
title: "Swift Package Manager: Bundling Resources with a Swift Package"
description: "Recently I upgraded my ID3TagEditor swift package to the latest Swift tools version (5.3). During the upgraded I discovered that now you can bundle reources with your Swift package. Let's see how you can do this."
date: 2020-10-30
image: /assets/images/posts/xxxx
tags: [swift, ios, apple, mobile application development, macos, tvos, watchos]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*Recently I upgraded my ID3TagEditor swift package to the latest Swift tools version (5.3). During the upgraded I discovered that now you can bundle reources with your Swift package. Let's see how you can do this.*

---

In the last weeks I started to work again on my [ID3TagEditor]() swift package. Before starting to add new interesting feature (do you wanna see the roadmap? check the [kanban board](XXX) of the [milestones](xxxxx)) I did the usual upgraded of build tools released in the new Xcode 12. One of the interesting new feature released in the latest version of the Swift tools (version 5.3) is the ability to bundle resources with a SwiftPM package. Before this release the only ways to bundle resources in our Swift package were all weird tricks and hackings. So let's start how you can add the suppport for bundling resource by taking the ID3TagEditor as example.  

#### Implementation


#### Conclusion
