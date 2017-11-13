---
layout: post
title: "React Native and Realm: custom manual link for an iOS app with custom directory structure"
description: "In this post I will show you how to install realm as a dependency in a react native project with custom folders structure without using react-native link command."
date: 2017-10-27
image: /assets/images/posts/TO-DO.png
tags: [react native, realm, swift, ios, apple, mobile application development]
comments: true
seo:
    - type: "BlogPosting"
---

In this post I will show you how to install realm as a dependency in a react native project with custom folders structure 
without using `react-native link` command.

---

What is React Native? It is one of the most successful and loved mobile development framework. It let you build *real native 
mobile* application using Javascript. It has been developed by Facebook. Let see the definition from the official website: 

>Build native mobile apps using JavaScript and React. React Native lets you build mobile apps using only JavaScript. 
 It uses the same design as React, letting you compose a rich mobile UI from declarative components. With React Native, 
 you don't build a “mobile web app”, an “HTML5 app”, or a “hybrid app”. You build a real mobile app that's indistinguishable 
 from an app built using Objective-C or Java. React Native uses the same fundamental UI building blocks as regular 
 iOS and Android apps. You just put those building blocks together using JavaScript and React.

Cool :sunglasses:!!!! Isn't it? Write once, deploy everywhere and without losing the performance/hardware access advantages 
of native code.  
Most of the time the react native framework will help you also to manage dependencies inside you project. But sometimes, especially 
if your project doesn't follow the classical react native directories structure you can find some problem in linking you external library. 
While I was working on an existing native app integrated with react native only a few months ago with custom installation, I found 
some problem to add Realm, the famous open source dbms, as a dependency to the project.  
In this post I will show you an example of how you can add Realm to your app with custom react native installation. Let's start :cold_sweat:!!
To describe the installation process I will use a sample app I created for this post called `ReactNativeRealmManualLink`. You can find 
it with realm installed on [this github repo](https://github.com/chicio/React-Native-Realm-Manual-Link 'React native realm manual link').   
Suppose you have a project like the one I linked above, in which React Native is contained in a subfolder of the iOS project, instead of the other way around 
in a classical standard react native installation. 

![react native realm directories](/assets/images/posts/react-native-realm-1-directories.jpg "react native realm directories")

First, to add realm as a dependecy we need to install it through npm with following command.

```shell
npm install --save realm
``` 

Then we try to link the library to the native code with the standard react native command.

```shell
react-native link realm
```

But here something strange happens: as you can see from the screenshot below the command fails  to link the library. 
So we need to find another way to install the library.

![react native realm link fails](/assets/images/posts/react-native-realm-2-link-fails.jpg "react native realm directories")

.....

   
 

