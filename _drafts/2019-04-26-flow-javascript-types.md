---
layout: post
title: "Flow, the static type checker for Javascript: How to use it and a brief comparison with TypeScript"
description: "In this post I will talk about how I used Flow to do static type checking on the Javascript of a project and I will also do a brief comparison with its main rival TypeScript."
date: 2019-04-26
image: /assets/images/posts/appium.jpg
tags: [web development, javascript, typescript]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this post I will do a brief comparison between Flow and TypeScript.*

---

In my daily job at [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group") I usually work with TypeScript. Instead, my personal website (the one where you are reading this article), has been developed using JavaScript for the client side part.  
As you may already know Javascript is untyped, so it doesn't have static typing. This could lead to bug and it becames more error prone proportionally to the increase of the source code base. As I already explained [in another post](https://www.fabrizioduroni.it/2018/07/04/react-native-typescript-existing-app.html), TypeScript is a typed superset of Javascript that compiles to plain Javascript for any browser, any host and any OS (open source). TypeScript is basically “Javascript on steroid”: it provides optional, static type checking at compile time. Since it is a superset of JavaScript, all JavaScript code is valid TypeScript code.  
As a consequence of the fact that I already use Typescript during my daily job I started to think if there was another way to have static type checking on my Javascript code already in place for my website. You know, if you already know a tool or a programming language you want to try the other technologies you could find on the market so you're prepared for the future in your career :relaxed:. This is the reason why I decided to use [Flow](https://flow.org/) for my website Javascript source code.  
What is [Flow](https://flow.org/)? Flow is a static type checker for javascript. Let's see it's main features taken from the homepage of the official site:

>* TYPE INFERENCE: using data flow analysis, Flow infers types and tracks data as it moves through your code. You don't need to fully annotate your code before Flow can start to find bugs.
>* REALTIME FEEDBACK: Flow gives you fast feedback while you code by incrementally rechecking your code as you make changes.
>* JAVASCRIPT, YOUR WAY: Flow is designed to understand idiomatic JavaScript. It understands common JavaScript patterns and many of the weird things we JavaScript developers love to do.
>* EASY INTEGRATION: Flow integrates well with many tools, making it easy to insert into your existing workflow and toolchain.

It seems really cool!!! :sunglasses:. In this post I will described my experience with Flow. I will show you how I integrated it in the js build process and how I used it to do static type checking for the JavaScript codebase of this website.  

#### Installation

#### Adding types

#### Flow vs TypeScript

#### Conclusion