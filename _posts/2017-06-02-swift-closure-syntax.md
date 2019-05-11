---
layout: post
title: "Swift Closure: what they are and syntax"
description: "In this post I will talk about Swift closure: what they are and their syntax"
date: 2017-06-02
image: /assets/images/posts/swift-closure.jpg
tags: [swift, ios, apple, mobile application development]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this post I will talk about Swift closure: what they are and their syntax.*

---

As reported on the [official Apple swift documentation](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID158 "official Apple swift documentation") closures are:

> Closures are self-contained blocks of functionality that can be passed around and used in your code. They can 
capture and store references to any constants and variables from the context in which they are defined.

Closures are in many ways what blocks are in Objective-C (or lamba function in other languages).
As it was for blocks, it is not easy to remeber their syntax. This post is intended to be a reference for me (and 
you, readers :wink:) about closure syntax. You could also take a look at [F$%&£&g closure syntax](http://fuckingclosuresyntax.com "F$%&£&g closure syntax").

Declared as a variable (valid also for `let` constants):

```swift
var closure: (parameters) -> returnType
```

Declared as an optional variable:

```swift
var closure: ((parameters) -> returnType)?
```

Declared as a typealias:

```swift
typealias ClosureType = (parameters) -> returnType
```

Declared as a function parameter and then call that function: 

```swift
func myFunction(closure: (parameters) -> returnType)  {
    ...
}

...

/** You can explictly write the type of parameters. **/

//Call with round brackets.
myFunction(closure: { (parameters) -> returnType in
    ...
})

//Call without round brackets (only if closure is the last parameter).
myFunction { (parameters) -> returnType in
    ...
}
```

There is also the possibility to use a shorthand for the parameter: you can call them using `$` followed by the index
 of the argument in the call. Last but not least, you can capture self avoing retain cycle using `[unowned self]` before the parameters.
Go and show to the world the power of closure in Swift!! :sunglasses:
