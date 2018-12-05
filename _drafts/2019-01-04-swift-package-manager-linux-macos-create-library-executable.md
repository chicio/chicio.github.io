---
layout: post
title: "Create a swift library compatible with the Swift Package Manager for macOS and Linux"
description: "In this post I will talk about how to create a Swift library compatible with the Swift Package Manager for
 macOS and Linux"
date: 2019-01-04
image: XXX
tags: [swift, objective-c, ios, apple, swift package manager]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*"In this post I will talk about how to create a Swift library compatible with macOS and Linux"*

---

Some times ago I published [ID3TagEditor](https://github.com/chicio/ID3TagEditor), a Swift library to read and modify
 the ID3 tag of mp3 files (I described it ). This library was compatible with iOS, Apple TV, watchOS and macOS. Then 
 one day a user of my library **opened a new issue on the github repo** with title "Build Error" and a description of a 
 **build error on Linux**.
 
![id3tageditor linux build issue](/assets/images/posts/spm-id3tageditor-linux-error.jpg "id3tageditor linux build issue")

The library had a simple `Package.swift`, but honestly I never tested the library with the Swift Package Manager (SPM)
 on Linux nor on macOS :sweat_smile: (this was the only feature of the that I didn't test).
Soooo I though: "It's time to add full support for the Swift Package Manager to my ID3TagEditor library and port it 
also on Linux!!!!" :sparkling_heart:
In this post I will describe how you can create a Swift library package for the Swift Package Manager compatible with
 macOS and Linux for an existing project. Obviously, I will show you the entire process using my [ID3TagEditor](https://github.com/chicio/ID3TagEditor) as example.
 First of all, if you are starting with a new library project, you will use the following SPM `init` command:

`swift package init --type library` 
 
 This command will create all the files and folders you need to develop your library. But in my case, I was working 
 on an existing project. This is why I will create all the needed files manually and I will describe them in details 
 so we can understand better the meaning of each one of them.
 The first file we need is the `Package.swift`. This file must be created in the root folder of your project. This 
 file contains some swift code that defines the properties of the project using the `PackageDescription` module API. At 
 the moment of this writing there are 3 API version of the PackageDescription API:
 
 * [Version 3](https://github.com/apple/swift-package-manager/blob/master/Documentation/PackageDescriptionV3.md)
 * [Version 4](https://github.com/apple/swift-package-manager/blob/master/Documentation/PackageDescriptionV4.md)
 * [Version 4.2](https://github.com/apple/swift-package-manager/blob/master/Documentation/PackageDescriptionV4_2.md)
 
 For my [ID3TagEditor](https://github.com/chicio/ID3TagEditor) I will use the [Version 4.2](https://github.com/apple/swift-package-manager/blob/master/Documentation/PackageDescriptionV4_2.md).   
 
 ```swift
 // swift-tools-version:4.2
 
 import PackageDescription
 
 let package = Package(
     name: "ID3TagEditor",
     products: [
         .library(
             name: "ID3TagEditor",
             targets: ["ID3TagEditor"]
         ),
     ],
     dependencies: [],
     targets: [
         .target(
             name: "ID3TagEditor",
             dependencies: [],
             path: "./Source"
         ),
         .testTarget(
             name: "ID3TagEditorTests",
             dependencies: ["ID3TagEditor"],
             path: "./Tests",
             exclude: [
                 "Parsing/Frame/Content/Size/ID3FrameContentSizeParserTest.swift",
                 "Parsing/Frame/Content/Operation/ID3FrameStringContentParsingOperationTest.swift",
                 "Parsing/Frame/Size/ID3FrameSizeParserTest.swift",
                 "Parsing/Tag/Size/ID3TagSizeParserTest.swift",
                 "Parsing/Tag/Version/ID3TagVersionParserTest.swift",
                 "Acceptance/ID3TagEditorTestAcceptanceTest.swift",
                 "Mp3/Mp3FileReaderTest.swift"
             ]
         ),
     ],
     swiftLanguageVersions: [.v4_2]
 )
 ```

Let's see in details the meaning of each option:

* `name`, the name of the package
* `products`, the list of all products in the package. You can have `executable` or `library` products. In our case 
we have `library` and for that we have to specify:
  * `name`, the name of the product
  * `targets`, the targets which are supposed to be used by other packages, i.e. the public API of a library package 
* `dependencies`, a list of `package` dependencies for our package. At the moment ID3TagEditor doesn't have any 
dependencies so we can just pass an empty array.
* `targets`, the list of targets in the package. In our case we have ....
