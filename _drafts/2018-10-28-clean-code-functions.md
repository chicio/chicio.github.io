---
layout: post
title: "Clean Code: functions"
description: "In this post I will talk about clean code and functions."
date: 2018-10-28
image: /assets/images/posts/XXXXXXXX
tags: [clean code]
comments: true
seo:
 - type: "BlogPosting"
---

*In this post I will talk about clean code and functions.*

---

In a previous post I talked about [clean code](https://www.fabrizioduroni.it/2018/04/25/clean-code-objects-data-structures-law-demeter.html) and how much it is important to me. 
In this new post I will talk about another topic of the uncle bob clean code book: functions.  
How can we have write a good function/method? This is the list of the features that a function 
must have to be considered "good":

* Small
* Do one thing
* One level of abstraction
* Use descriptive names
* Low number of arguments
* Have no side effects
* Command Query Separation
* Prefer exception to error Codes
* "Don't repeat yourself"
  
  
#### **Small**

What does uncle bob mean when he talks about "small" functions? How much small must be a function to be considered 
"small" in the clean code dictionary? Let's take a quote from his book *clean code*:

>In the eighties we used to say that a function should be no bigger than a screen-full. Of course we said that at a 
time when VT100 screens were 24 lines by 80 columns, and our editors used 4 lines for administrative purposes. 
Nowadays with a cranked-down font and a nice big monitor, you can fit 150 characters on a line and a 100 lines or 
more on a screen. Lines should not be 150 characters long. Functions should not be 100 lines long. Functions should 
hardly ever be 20 lines long. 

Honestly I think that also 20 lines are already too much. You must consider that most of the automated code quality 
tools available on the market consider a function of 20 lines too much long by default. Sometimes you will be 
tempted to break this rule :grin:, but remember: smaller functions will always be more readable. To write such small 
function you have to follow some simple rules:

* the body of every `if else` must be of one line (most of the time a call to another function)
* the body of every `for` loop must be of one line (most of the time a call to another function)
* the body of every `while` loop must be of one line (most of the time a call to another function)
* no nested structure

#### **Do one thing**



