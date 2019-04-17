---
layout: post
title: "Intersection Observer API: speed up your web applications with lazy loading"
description: "Intersection Observer can improve your web application performance by helping you to implement lazy loading of images."
date: 2019-05-10
image: /assets/images/posts/XXXXXX
tags: [web development, javascript, typescript]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*Intersection Observer can improve your web applications performance and by helping you to implement lazy loading of images.*

---

In the last few months I worked hard to improved the page speed of my website (yeah, the one you're visiting right now). I improved all my client side code in order to be able to reach a performance score above 90 points on [Lighthouse](https://developers.google.com/web/tools/lighthouse/), the offical Google Chrome tool to measure performance, accessibility, progressive web apps compliance and more on your web application.
One of the last thing that was contained in the report was a warning about offscreen images, like the one contained in the following screenshot:

{% include blog-lazy-image.html description="intersection observer offscreen audit" src="/assets/images/posts/intersection-observer-offscreen-audit.jpg" %}

So I followed the link contained in the report that points to a page where are contained the [official Google Guidelines about loading offscreen images](https://developers.google.com/web/tools/lighthouse/audits/offscreen-images). The main topic of the page is the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and how it can help you to load specific content only when it becomes visible in the viewport. I found also anothe article on the official Google developer website that explains in details how to leverage the power of Intersection Observer to lazy load the images in your web applications. So as you may imagine I "accepted the challenge" (like only [Barney Stinson](https://en.wikipedia.org/wiki/Barney_Stinson) in how I met your mother is used to do :stuck_out_tongue_winking_eye:) and I started to implement the lazy load of images for my website.

#### Implementation

First of all let's start by creating a function called `lazyLoadImages`. This function takes two parameter:

* selector, that is a string that I will use to select all the document [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element "document element") objects that I want to observe
* loadCompleted, a function that will be executed after the image has been downloaded

This function will create a new instance of the `IntersectionObserver` object from the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This object constructor takes two parementer:

* a callback, that is the function called when an object become visible given the current configuration
* a configuration options, that let the developer customize how the Intersection Observer calculate the intersection with the viewport

After the cretion of the `IntersectionObserver` object I attached it to the DOM elements I want to observe by calling its `observer(element)` method on the document [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element "document element") objects selected using [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll "document querySelectorAll") method with the `selector` received as parameter.

```javascript

const lazyLoadImages = (selector, loadCompleted) => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    (entries, observer) => onIntersection(entries, observer, loadCompleted),
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}
```

As you can see above from the snippet above, in the inserction callback I'm calling the `onIntersection` function. What does it do? ...

This is the final script.

```javascript
import 'intersection-observer'
import { removeCssClass } from './css-class'

const lazyLoadImages = (selector, loadCompleted) => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    (entries, observer) => onIntersection(entries, observer, loadCompleted),
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}

const onIntersection = (entries, observer, loadCompleted) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)
      loadImage(entry.target, loadCompleted)
    }
  })
}

const loadImage = (image, loadCompleted) => {
  const src = image.dataset.src
  fetchImage(src).then(() => {
    image.src = src
    removeCssClass(image, 'lazy')
    loadCompleted(image)
  })
}

const fetchImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = resolve
    image.onerror = reject
  })
}

export { lazyLoadImages }
```

There's still one thing

[Interserction Observer Polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)

#### Conclusion

Inteserction Observer is a powerful API. It let you implmenent lazy loading for rsources loading and reach performance and architectural application pattern that I had a chance to see only in mobile native apps. The web is filling the gap with native apps, and Intersection Observer are another demonstration that the 90% of the existing native mobile apps could become powerful web apps. As a consequence of the fact that in my daily job I'm still a native mobile app developer, I'm still following the iOS, Android and React Native scene and I'm still studying all the new tools and SDKs improvement released by Apple, Google and Facebook. But, you know, technology goes fast I have to be prepared for the future :relaxed:. Sooo, long live Intersection Observer!!! Web applications will be much more performant with your help :green_heart:.
