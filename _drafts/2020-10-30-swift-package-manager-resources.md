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
Specifically, I will show you how I can execute all my test suite, including some acceptance tests that uses mp3 resources to check the correctness of the ID3 tag added by ID3TagEditor.

#### Implementation

To support the bundling of resources, the first thing to do is to upgraded the swift tools used to build your package. To do this, you just need to change the comment at the top of the `Package.swift`.

```swift
// swift-tools-version:5.3

//...other code
```

In my ID3TagEditor I have some acceptance tests that uses some mp3 files and some images that I use to tests that ID3TagEditor works as expected. Before the Swift tools 5.3 I was disabling these tests on the Linux platform (that supports only the SwiftPM way to bundle libraries). But now there's a new Swift package directive called `resources` that you can add to your `target` or `testTarget` to load resources.  
The `resources` directive takes as value a list of resource process rule as input. You can choose between two type of rules:

* process rule. You can create this rule by using the `process(_ path: String, localization: Resource.Localization? = nil) -> Resource` (you can find the offical documentation [here](https://developer.apple.com/documentation/swift_packages/resource/3554515-process)). This rule let you process the resource according to the platform you’re building the package for. This basically means that the build tools will optimize some files based on the type and the platform (e.g. images will be optimized if the target platform is iOS). You can also support different rule based on different locale/languages.

* copy rules


``` swift
// swift-tools-version:5.3

import PackageDescription

let package = Package(
    name: "ID3TagEditor",
    products: [
        .library(
            name: "ID3TagEditor",
            targets: ["ID3TagEditor"]
        )
    ],
    dependencies: [],
    targets: [
        .target(
            name: "ID3TagEditor",
            dependencies: [],
            path: "./Source",
            exclude: ["Info.plist"]
        ),
        .testTarget(
            name: "ID3TagEditorTests",
            dependencies: ["ID3TagEditor"],
            path: "./Tests",
            exclude: ["Utils/PathLoaderXcodeProj.swift", "Info.plist"],
            resources: [.process("Examples")]
        )
    ],
    swiftLanguageVersions: [.v5]
)
```

#### Conclusion
