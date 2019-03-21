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

It seems really cool!!! :sunglasses:. **In this post I will described my experience with Flow. I will show you how I integrated it in the js build process and how I used it to do static type checking for the JavaScript codebase of this website.**  

#### Installation and setup

First of all, I added flow to my dev dependecies. I decided to use flow in combination with [flow-remove-types](https://github.com/flowtype/flow-remove-types "flow remove types"), a small CLI tool for stripping Flow type annotations from files.

```shell
npm install --save-dev flow-remove-types
npm install --save-dev flow-bin
```

Then I decided to create a new script phase `flow` that launches the script `flow.sh`. In this shell scriptwhere I do all the flow operations: 

* I move into my js folder with `cd _js`
* I run flow to execute the static type checking on my code base with the command `../node_modules/.bin/flow`
* I run flow-remove-types to strip flow type annotations from js files. The generated files are saved in the folder `../_jsbuild/` specified in the destination folder flag `-d`. I also specified the `--pretty` option in order to be able to remove the whitespaces that flow-remove-types leaves in the source when it removes the types annotation.

Below you can see the entire script I created (that you can find also [here](https://github.com/chicio/chicio.github.io/blob/master/_scripts/flow.sh "flow script")).

```shell
#!/usr/bin/env sh

# Enter into js source folder
cd _js

# Run flow
../node_modules/.bin/flow

# Remove flow types
../node_modules/.bin/flow-remove-types ../_js/ -d ../_jsbuild/ -i flow-typed/ --pretty
```

The final steup of the setup was to install [flow-typed](https://github.com/flow-typed/flow-typed "flow typed"). Flow-type is a repository of third-party library interface definitions for use with Flow. In the next section I will explain to you why I need it (and also you will need it :wink:). You need to install it globally. This could be done with the following command (I ran this command in the setup script I have for my site, that I launch when I have to prepare the development enviroment on a new computer):

```shell
npm install --global flow-typed
```

#### Adding types
Let's start to add some types. Flow support the following primitive types

* boolean
* number
* string
* void(undefined)
* null
* any, a way to opt-out of using the type checker. A variable of type `any` will accept any type of value. Using any is completely unsafe, and should be avoided whenever possible.
* mixed, will accept any type of value as `any`. The difference is that when you try to use a value of a mixed type you must first figure out what the actual type is or you’ll end up with an error.

....(lazy load animation)

#### Flow vs TypeScript

#### Conclusion