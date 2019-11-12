---
layout: post
title: "Tutorial: implement a pull to refresh for you web application"
description: "Implementing a pull to refresh component in vanilla js for your progressive web app (PWA) it's really easy. Let's do it now!"
date: 2019-11-20
image: /assets/images/posts/XXXXXX
tags: [pwa, web development, javascript]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*Implementing a pull to refresh component in vanilla js for your progressive web app (PWA) it's really easy using cutting edge web technology (service worker, CSS new properties). Let's do it now!*

---

Some months ago I [transformed my website into a Progressive Web App]() (yes, the one you're reading now). By leveraging the power of service workers (and other some cool tricks that I will discuss in other posts :stuck_out_tongue_winking_eye:) my website page load time is below 50 milliseconds :open_mouth:. But with "the great power of service workers comes also great responsibility" (you remember [uncle Ben quote](https://www.google.com/search?q=from+great+power+comes+great+responsibility), right?), and one of this responsibility is let the user be able to refresh all the content whenever it wants (to check new/update stuff). Which is a mechanism/UX pattern that every user in the world already know for this kind of functionality? The [pull to refresh](https://en.wikipedia.org/wiki/Pull-to-refresh). The choice of this pattern is also a natural consequence of the fact that, as [I already told you previously in another post](), Progressive Web App are the technology that fill the gap between web and mobile native app. Unfortunately in the web development world there's not yet a standard component for pull to refresh. This is way in this post I will show you how to implement it from scratch without any JavaScript library/framework. I will only use vanilla JavaScript, HTML, CSS and the service worker *message* capability with `postMessage` and `MessageChannel` class. The pull to refresh described in this article is available on this site in all the blog pages (including this one, try it now!!! :smirk:)
Let's start from the implementation of the UI (HTML and CSS)

#### UI: HTML and CSS

You already know what we would like to achieve. The pull to refresh UI component should be something that appears at the top of the page when the user scroll beyond the page borders. At some point during the drag gesture the pull to refresh should stop itself from scrolling and show a loader that explain to the user that the content is reloading.
Let's start from the HTML. I added to the page structure a new div that will act as the container of the pull to refresh.
Inside it I added two other divs:

* one is used to show a loader/activity indicator that will start to rotate as soon as the user scroll to the maximum pull to refresh point (and as already explained above, at this point the reload of the content should have been started).

* the other one is used to show a message to the user that explaing to him/her what it is happening (this is a nice to have that I added because I liked it! :XXXXXX:)

Below you can find the entire html code snippet.

```html
<div id="pull-to-refresh" class="pull-to-refresh start-pull hidden-pull">
    <div id="pull-to-refresh-loader" class="pull-to-refresh-loader"></div>
    <div id="pull-to-refresh-status" class="pull-to-refresh-status">
        Pull down to refresh
    </div>
</div>
```

Let's see what I did on the CSS side.  .....

```scss
html {
  overscroll-behavior-y: contain;
}

.pullable-content {
  margin-top: 10px
}

.pull-to-refresh {
  height: 100px; 
  background-color: $general-background; 
  margin-top: 55px;
  margin-bottom: 10px;
  box-shadow: inset 0px -2px 6px 1px $divider-color;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;

  &.visible-pull {
    visibility: visible;
  }
  
  &.hidden-pull {
    visibility: hidden;
  }
  
  .pull-to-refresh-status {
    font-weight: bold;
    font-size: 14px;
  }

  .pull-to-refresh-loader {
    border: 3px solid $primary-color-dark;
    border-top: 3px solid $primary-color-light;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    opacity: 0;
  
    &.animate {
      animation: spin 1.25s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
}

.start-pull {
  transform: translateY(-100px); 
}

.end-pull {
  transform: translateY(-100px) !important;
  transition: 0.4s ease-in-out;
}
```

#### JavaScript


#### Service Worker


#### Conclusion