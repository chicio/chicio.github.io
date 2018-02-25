---
layout: post
title: "Code review: what it is and why it matters"
description: "In this post I will talk about code review: what it is and why it matters."
date: 2018-02-19
image: /assets/images/posts/01-technology-version-update.jpg
tags: [swift, ios, apple, mobile application development, test driven development]
comments: true
seo:
 - type: "BlogPosting"
---

*In this post I will talk about code review: what it is and why it matters.*

---

In some of my previous posts, for example [in this one](/2017/09/11/clean-code-meaningful-names.html "clean code 
meaningful names"), I talked about my new experience at [lastminute.com group](http://www.lastminutegroup.com "lastminute.com group") and how much
 here we care about code quality. In fact I already talked about the fact that we use to do [pair programming during 
 our daily job](/2018/01/16/ide-refactoring-android-studio-xcode-appcode-webstorm-jetbrains.html "pair programming").
  But clean code and pair programming are not the only techniques we use to be sure that our software matches high code 
  quality standard :sunglasses:.  
  One of the most important procedure I use during my daily job with my colleagues is code review. What is it? Let's 
  see a standard definition from [wikipedia](https://en.wikipedia.org/wiki/Code_review "code review"):
  
  >A code review is a process where two or more developers visually inspect a set of program code, typically, several times. The code can be a method, a class, or an entire program. The main code-review objectives are:
  >* Best Practice: a more efficient, less error-prone, or more elegant way to accomplish a given task.  
  >* Error Detection: discovering logical or transitional errors.  
  >* Vulnerability Exposure: identifying and averting common vulnerabilities like Cross-Site Scripting, 
  Injection, Buffer Overflow, Excessive Disclosure, etc.
  >* Malware Discovery ~ This often-overlooked and very special code-review objective looks for segments of code that 
   appear extraneous, questionable, or flat-out weird. The intent is to discover back doors, Trojans, and time bombs.
    In today’s world malevolent code is a very real threat and should not be overlooked, especially by Government agencies. 

The definition is simple and clear. Basically you go through the code of another guy (or from a couple if they are 
doing pair programming) to find errors, bugs, code style/best practice not compliant to the team set of rules.  
Three weeks ago I attended a coding dojo with my colleagues [Angelo Sciarra](https://www.linkedin.com/in/angelosciarra/ "Angelo Sciarra"). 
Angelo is a senior full-stack software engineer with many years of experience.  
You may wonder now what is also a coding dojo. So again, here we are with
 another [definition](http://codingdojo.org/WhatIsCodingDojo/ "coding dojo") :bowtie::

> A Coding Dojo is a meeting where a bunch of coders get together to work on a programming challenge. They are there 
have fun and to engage in DeliberatePractice in order to improve their skills.

 
During the dojo that I attended with Angelo we tried to resolve the [Minesweeper problem](http://codingdojo.org/kata/Minesweeper/ "Minesweeper").   
Basically we had to write an automatic Minesweeper resolver (do you remember the Windows one? :heart_eyes:). At the 
end of the dojo we didn't complete the task, so I decided to try to solve it in another way. I developed a 
complete command line version of a Minesweeper resolver and let Angelo do the code review of my implementation. In this way I can show you the 
power of code review :neckbeard: (and last but not least how much meticulous is Angelo during is code review 
:cold_sweat::sweat_smile::cupid:).  

{% include adsense-article-middle.html %} 

So let's start to see which kind of observation I received from Angelo, that basically include most of the 
observation you could receive during a code review. Before starting, you can look [this repository](https://github.com/chicio/Minesweeper "Minesweeper kata dojo") 
if you want to have a look at the entire Minesweeper implementation I develop and, on the [Code review pull request](https://github.com/chicio/Minesweeper/pull/1) you can find the observation/new implementation from Angelo. Usually 
the code reviewer doesn't implement himself/herself the stuff of his/her observation, but in this case we did it so 
that we can share the code before/after the code review in a pull request (and also to show you the skills of Angelo 
:heart_eyes:).  
The first observation I received from Angelo is about the java JDK version I used for my project. I did the setup of 
the project using JDK 1.5 instead of JDK 1.8 (as you may know, this is a more recent version). In general it is 
common to receive suggestion about technology specific problems/setup/changes, especially if your code reviewer is 
more experienced than you on that type of technology.  

![technology version update](/assets/images/posts/01-technology-version-update.jpg "technology version update")

In fact Angelo gave me another technology advice during the review. He suggested to change some pieces of code with 
others that leverage the power of functional programming. This is really interesting because it is easy 
imagine how much knowledge you can absord from the experience of your code reviewer.
   
![functional update](/assets/images/posts/03-functional-field.jpg "functional update")
![functional update with new class](/assets/images/posts/04-new-fields-class.jpg "functional update with new class")






```swift
let expectation = XCTestExpectation(description: "Expectation description")

yourInstance.method(param: "aParam") {
    <Your assert using XCTAssert...>
    expectation.fulfill()
}

wait(for: [expectation], timeout: <time to wait the fulfillment of the expecation>)
```

