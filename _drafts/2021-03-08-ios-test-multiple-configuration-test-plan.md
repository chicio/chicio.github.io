---
layout: post
title: "Better organize tests and run them against multiple configuration with Xcode Test Plan"
description: "Recently I added a lot of Unit and UI tests to RangeUISlider, one of my open source project. Let's see how I grouped them and run them against multiple configurations with Xcode Test Plan."
date: 2021-03-08
image: /assets/images/posts/XXXX.jpg
tags: [java, kotlin, test driven development]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*Recently I added a lot of Unit and UI tests to RangeUISlider, one of my open source project. Let's see how I grouped them and run them against multiple configurations with Xcode Test Plan.*

---

If you look at my [Github profile](), you can see that one of my most starred open source project is [RangeUISlider](https://github.com/chicio/RangeUISlider "rangeslider ios"): iOS range selection slider compatible with UIKit and SwiftUI. I developed it using autolayout and it is highly customizable (thanks to IBDesignabled and IBInspectable or programmatic property access.  
In the last month I did a big refactoring on its code base so that I can add features quickly and improved the code quality. I also received some new feature request on github. In particular one user [was asking for Right To Left Languages (RTL) support](XXX). There was one problem with these activities: there were basically no Unit or UI tests. This means that each one of these activities was scaring and I had to manually test all the RAngeUISlider features. So I decided to add the tests needed but two problems arise:

- the tests suite was slow. Just with the first few UI tests the execution of the entire tests suite was a pain in the ass :weary:. Given the fact that I wanted a quick feedback after each small steps of refactoring, this was not an ideal setup.
- one as I told you, one of the latest feature I added was the support for RTL languages. To test this feature I just wanted to run the UI test I already wrote but with a different device configuration: I wanted to run them on devices configured with a RTL languages.
 
So I started to wonder if there was a solution to these problems, and then I remembered a video I saw on my Apple TV in the Apple Developer app the last year: Test Plans.
What are they? Test plans are a new feature of Xcode that let you run a subset of you tests (Unit or UI tests) against multiple configuration. They are defined using the `.xctestplan` file format and they are already supported by `xcodebuild` command line execution and Xcode server/CI.  
As you can see from the definition this is exaclty what I needed for RangeUISlider. So in this post I will show you how I setup the test plans for RangeUISlider and I had been able to refactor its entire code base in a safe way by running the subset of tests needed to check my changes for the specific part of code I was working on and test it against multiple configurations. Let's start!! :rocket:

#### Implementation

XXX

#### Conclusion

XXX