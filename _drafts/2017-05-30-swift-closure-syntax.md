---
layout: post
title: "Swift Closure: what they are and declaration syntax"
description: "In this post I will show you how to create a scene using ThreeJS with support for Physically Based Rendering"
date: 2017-05-30
tags: [swift, ios, apple, mobile-application-development]
comments: true
seo:
 - type: "BlogPosting"
---

*In this post I will talk about Swift closure: what they are and their syntax*

---

As reported on [official Apple swift documentation](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID158 "official Apple swift documentation") closures are: 

> Closures are self-contained blocks of functionality that can be passed around and used in your code. They can capture and store references to any constants and variables from the context in which they are defined.

Closures are in many ways what blocks are in Objective-C (or lamba function in other languages).
As it was for blocks, it is not easy to remeber their syntax. This post is intended to be a reference for me (and you, readers :wink:) about closure syntax. You could also take a look at [F*****g closure syntax](http://fuckingclosuresyntax.com "F*****g closure syntax").

Declare as a variable:

```swift
var closure: (parameters) -> returnType
```

```swift
typealias ClosureType = (parameters) -> returnType
```



