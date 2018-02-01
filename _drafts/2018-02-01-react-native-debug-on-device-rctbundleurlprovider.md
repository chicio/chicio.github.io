---
layout: post
title: "React Native: build, run and debug on a real device on iOS"
description: "In this post I will talk about how to setup up your react native project on iOS to build, run and debug it on a real device."
date: 2018-02-01
image: TODO
tags: [react native, swift, ios, apple, mobile application development, javascript]
comments: true
seo:
 - type: "BlogPosting"
---

*"In this post I will talk about how to setup up you React Native project on iOS to build, run and debug it on a real
 device."*

---

In the last few days I was working in pair programming with my colleague [Mariano Patafio](https://www.linkedin.com/in/mariano-patafio-4a8b7426/ "Mariano Patafio") 
on some new features for a React Native app. [Mariano](https://www.linkedin.com/in/mariano-patafio-4a8b7426/ "Mariano Patafio") 
is a senior iOS and Android developer and a true "Apple fag" :laughing: (like me :stuck_out_tongue_closed_eyes:).
At some point during our pair session we wanted to test the app on an iOS real device. The app we where working on 
was an existing iOS app in which we added some React Native views. If you follow the instructions contained in the 
React Native doc about integrating it in an existing app, you will discover that with that setup you will not be able
 to run your app on a real device from XCode. It will work just in the simulator.  
In this post I will show you what we discovered: it is possible with the right setup to build, run and debug your 
React Native app from XCode. To do this I will use the React Native example app I used in this [previous post I wrote 
about how to create multiple RCTRootView inside you existing app integrated with React Native](/2017/12/08/react-native-multiple-instance-rctrootview.html "react native multiple rctrootview"). 
The app is very simple: it contains a main screen with 2 buttons that let the user open two different React Native 
views. 
.....
                                                                                               
