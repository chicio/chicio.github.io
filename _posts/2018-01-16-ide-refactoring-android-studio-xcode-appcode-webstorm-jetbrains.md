---
layout: post
title: "Android Studio vs XCode vs AppCode: a brief comparison about coding speed."
description: "In this posts I will compare the coding speed that it is possible to achieve in some of the Jetbrains 
IDEs and XCode, in terms of code creation and refactoring."
date: 2018-01-16
image: /assets/images/posts/androidstudio-xcode-appcode.jpg
tags: [IDE, android, java, ios, swift, mobile application development]
comments: true
seo:
    - type: "BlogPosting"
---

*In this posts I will compare the coding speed that it is possible to achieve in some of the Jetbrains 
 IDEs and XCode, in terms of code creation and refactoring.*

---

IDE, *Integrated Development Environment*, are the software developer toolboxes. When I started to work at 
[lastminute.com group](http://www.lastminutegroup.com "lastminute.com group") my knowledge 
of the Android platform was very limited. But... [lastminute.com group](http://www.lastminutegroup.com "lastminute.com group") 
is an [agile software development](https://en.wikipedia.org/wiki/Agile_software_development "agile software development") company 
and one of the technique we use during our development is [pair programming](https://en.wikipedia
.org/wiki/Pair_programming "pair programming"): two developers work at the same feature on the same workstation. 
As reported on Wikipedia, one of the the main advantages of pair programming is knowledge sharing:
 
 >Knowledge is constantly shared between pair programmers, whether in the industry or in a classroom, many sources 
 suggest that students show higher confidence when programming in pairs, and many learn whether it be from tips on 
 programming language rules to overall design skill. In "promiscuous pairing", each programmer communicates and 
 works with all the other programmers on the team rather than pairing only with one partner, which causes knowledge 
 of the system to spread throughout the whole team. Pair programming allows the programmers to examine their 
 partner's code and provide feedback which is necessary to increase their own ability to develop monitoring 
 mechanisms for their own learning activities.

This is why I started to work with my colleague [Francesco Bonfadelli](https://www.linkedin.com/in/fbonfadelli/ 
"Francesco Bonfadelli"), a senior Android, iOS and Backend developer. During our pair programming sessions I learned a 
lot about developing mobile apps for the Android platform. One of the thing I learned in the first few days is the 
difference between the official IDEs: Android Studio and XCode. After seeing the coding speed that Francesco was 
able to achieve during an Android coding session, and how much slower it is to do the same things
 in XCode for iOS, I realized how much more advanced is Android Studio with is set of refactoring features in 
 comparison with XCode.  
In this post I will briefly analyze some IDEs commonly used for mobile application development focusing on the 
coding speed that is possible to achieve by using them and I will explain to you why, at the
 time of this writing, I started to prefer the Jetbrains IDEs family (not only for mobile application development 
 :bowtie:).

### XCode
I always loved XCode. I started to use it 8 years ago and it's still here with me during my daily job. It opens in a 
few seconds and you can start to code very quickly. But.... what happens when your app code start to increase in terms 
of complexity and you need to do a simple refactoring operation? Does it help you in some way when it need to create 
a new class/property? Does it help you when you need to navigate in your code and you need to jump quickly from one 
class to another? Well, to be honest it doesn't help you so much. Even a simple renaming could become a painful 
operation, especially if you have a project with mixed Swift/Objective-C parts. Everything must be done manually. 
Consider for example this list of mixed code creation/refactoring operations:

 * create a new class
 * instantiate it and keep it as a local variable 
 * add a method to the previous class
 * add a parameter to the method previously created
 * extract the local variable as a property of controller in which I created it
 
In the following video I will try to do these operations in XCode. At the time of this writing the available XCode 
version is 9.2.

{% include youtube.html videoId="tsuS8UoSS1A" %}

**More than 2 minutes to implement all the stuff in the above list.**
Really slow, isn't it?!?? :fearful:

### Android Studio
Before [lastminute.com group](http://www.lastminutegroup.com "lastminute.com group"), I had used Android Studio just 
a few times for some very simple Android apps. Then I started to work with [Francesco](https://www.linkedin.com/in/fbonfadelli/ "Francesco Bonfadelli") 
and he introduced me to the power of Jetbrains IDEs. This IDE gives you the ability to navigate quickly in you source
 code, create and modify classes, and do a lot of other refactoring operations without leaving the keyboard! 
 Basically you can write code without forgetting about your mouse!! :open_mouth:. The list of keyboard shortcut you 
 can use in your development flow is endless. You can find the complete list [here](https://developer.android.com/studio/intro/keyboard-shortcuts.html "Android studio keyboard shortcut"). 
Let's try to do the exact same operations I did before with XCode, and I also add a rename of the class created at 
the end of all the previous operation.

{% include youtube.html videoId="Xp3v9VsgFjw" %}

**Only 50 seconds and I did all the stuff (and I wans't pushing hard on the keyboard..
.:stuck_out_tongue_winking_eye:).**
As you can see, Android Studio gives you the ability to write code at the speed of light!!! :flushed:.

### AppCode
As you can image, after working a few hours with Android Studio, I started to wonder if there's an IDE that let me 
setup the same write code style and workflow. Here another colleague that I worked with, [Tommaso Resti](https://www.linkedin.com/in/tommaso-resti-0ab5285a/ "Tommaso Resti"),
a senior iOS and Android developer, shown me AppCode for the first time. This is another IDE from JetBrains for iOS 
development. It allows you to improve your development speed by allowing you to use some of the refactoring tools 
that you can find in Android Studio. However it's not all peace and light in this case. Some of the refactoring tools
 are not available for Swift and you will still need XCode to work on Xib and Storyboard (the Jetbrains team 
 developed a plugin for interface builder, but that has been discontinued). 
 Anyway, if you start to get used to the Android Studio writing code workflow, you will feel at home with AppCode :relaxed:.

### Final thoughts 
Android Studio and AppCode are based on IntelliJ IDEA, the famous Java IDE from Jetbrains. But that's half of 
the story: Jetbrains IDE family is really big.
 You can find an IDE for each of your favourite language:
 * CLion, for C and C++
 * PhpStorm
 * PyCharm
 * RubyMine for Ruby
 * GoLand for GO
 * Rider for C#
 
So no worries: if you want to start to improve you coding speed probably there's an IDE for your favourite language. 
XCode will always have a special place in my heart. I will still continue to use it in my daily job as a mobile 
developer. But... the coding speed I gained with the Jetbrains IDEs could not be ignored:smiling_imp:. This is why I 
started to prefer :heart:. 