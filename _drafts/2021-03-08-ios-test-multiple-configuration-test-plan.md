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

If you look at my [Github profile](), you can see that one of my most starred open source project is [RangeUISlider]: iOS range selection slider compatible with UIKit and SwiftUI. I developed it using autolayout and it is highly customizable (thanks to IBDesignabled and IBInspectable or programmatic property access.  
In the last month I did a big refactoring on its code base so that I can add features quickly and improved the code quality. I also received some new feature request on github. In particular one user [was asking for Right To Left Languages (RTL) support](XXX). There was one problem with these activities: there were basically no Unit or UI tests. This means that each one of these activities was scaring and I had to manually test all the RAngeUISlider features. So I decided to add the test needed but two problems arise:

- test lenti, come spezzarli in categoria?
- configurazioni multipl?

test plans sono la soluzione.

#### Implementation

XXX

#### Conclusion

XXX