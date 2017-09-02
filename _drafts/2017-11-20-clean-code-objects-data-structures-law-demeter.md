---
layout: post
title: "Clean Code: meaningful names"
description: "In this post I will talk about clean code: data structures, objects and the law of demeter."
date: 2017-08-11
image: /assets/images/posts/uncle-bob-defender-of-clean-code.jpg
tags: [clean code]
comments: true
seo:
 - type: "BlogPosting"
---

In this post I will talk about clean code: data structures, objects and the law of demeter.

---

*Data structures and objects*. Two things each programmer have to deal with each day of his/her job life.
But wait, do we really know the definition of them? Let's see what [Uncle Bob](https://en.wikipedia.org/wiki/Robert_Cecil_Martin "Robert Cecil Martin") says about them in its *Clean Code* book:

>Objects hide their data behind abstractions and expose functions that operate on that data. Data structure expose their data and have no meaningful functions.

It's easy to see that they are opposites. A lot of programmer are convinced of the fact that in software development  everything should be an Object. If you think about the nature of objects you will see that there are times where you just want simple plain data structure and work of them. This is a consequence of the fact that adding new function to an object may require much more work, because maybe you need all the objects of a same type to add the new function. This give us the following definitions, stated by [Uncle Bob](https://en.wikipedia.org/wiki/Robert_Cecil_Martin "Robert Cecil Martin") in its *Clean Code* book:

>Procedural code (code using data structures) makes it easy to add new functions without changing the existing data structures. Object oriented code, on the other hand, makes it easy to add new classes without chaging existing functions.

>Procedural code makes it hard to add new data structures because all the functions must change. Object oriented code makes it hard to add new functions because all the classes must change.

Following the previous fact we exposed, we are now ready to introduct the **law of demeter** that says a **module should not know about innards of the objects it manipulates**. The focus of this law is to improve the decoupling of objects. More precisely its definition is:

>A method *f* of a class *C* should only call the methods of these:
> 
> * *C*
> * an object created by *f*
> * an object passed as argument to *f*
> * an object held in a instance variable of *C*

This bring us to talk about what is called as *train wreck*: concatenation of function/properties calls. The difference between object and data structure gives us a clear understand of when a train wreck is really dangerous:

* **if in a method your working with data structures, law of demeter is not applied to them because is natural for a data structure to expose their internal structure.**
* **if in a method your working with objects, then you should consider concatenation of method calls as violation of the law of demeter**

Next time you will write a piece of code try to consider these concepts and how they can improve your code.

![Clean code uncle bob superman](/assets/images/posts/uncle-bob-defender-of-clean-code.jpg "Clean code uncle bob superman")