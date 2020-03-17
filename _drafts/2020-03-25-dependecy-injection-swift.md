---
layout: post
title: "How to: create your SUPER simple dependency injector framework in Swift"
description: "There are a lot of dependency injection framework in the open source swift world with really cool features like object graph, persistence etc. But what if all you need is a lightweight dependencies container? In this post I will show you how to create it by leveraging the Metatype Type and the Hashable protocol"
date: 2020-03-25
image: /assets/images/posts/XXXXXX
tags: [swift, ios, apple, mobile application development]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*There are a lot of dependency injection framework in the open source swift world with really cool features like object graph, persistence etc. But what if all you need is a lightweight dependencies container? In this post I will show you how to create it by leveraging the Metatype Type and the Hashable protocol.*

---

The open source Swift world is full of useful framework. You can find almost everything you need (there are [rare cases where you need to write something that still doesn't exist](XXX id3 tag editor) out there). Anyway, a lot of the frameworks and libraries you will find out do more than you need. See for example the world of the dependecies injection framework. We have a lot of alternatives from which we can choose: [Swinject](https://github.com/Swinject/Swinject "dependecies injection swift Swinject"), [Weaver](https://github.com/scribd/Weaver "dependecies injection swift Weaver") etc. This frameworks come with a lot of features like: object graph construction, injection with property wrappers, instance persistence etc. This are all useful feature, but if your needs are very limited (just a dependecies container register/resolver using protocol and classes) the previous frameworks gives you just a big overhead and complexity on you code. This is why for my recent project I tried to write my own very simple dependencies injector container by leveraging the power of Swift Metatype and the Hashable protocol. Let's go and see the how I created it :smirk:.

#### Implementation

XXXX


https://docs.swift.org/swift-book/ReferenceManual/Types.html#grammar_metatype-type
https://swiftrocks.com/whats-type-and-self-swift-metatypes.html

#### Conclusion

You can find all the code shown in this post [in this Github repo](https://github.com/chicio/SwiftUI-CustomTabBar "custom tab bar swiftui"). Apple has done a great job with SwiftUI and I hope that the framework will receive in the future updates all the missing UIKit pieces (while still missing a [lot of stuff on the web/Safari side](/2019/03/03/github-pages-progressive-web-app.html)). If you already used powerful declarative framework like React or React Native you will feel at home (seems like a copy of each other :blush:). Stay tuned for other post about SwiftUI and Combine soon. :heart:.