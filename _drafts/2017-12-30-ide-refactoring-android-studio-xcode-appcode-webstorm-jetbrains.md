---
layout: post
title: "Android Studio vs XCode vs AppCode: an brief comparison
process."
description: "In this posts I will some compare Jetbrains IDEs and XCode."
date: 2018-02-03
image: /assets/images/posts/react-native-realm-10-build-works.jpg
tags: [IDE, android, java, mobile application development]
comments: true
seo:
    - type: "BlogPosting"
---

*In this posts I will talk about why I started to prefer Jetbrains IDEs for mobile app development.*

---

IDE, *Integrated Development Environment*, are the software developer toolboxes. When I started to work at 
[lastminute.com group](http://www.lastminutegroup.com "lastminute.com group") my knowledge 
of the Android platform was very limited. But... [lastminute.com group](http://www.lastminutegroup.com "lastminute.com group") 
is an [agile software development](https://en.wikipedia.org/wiki/Agile_software_development "agile software development") company 
and one of the technique we use is [pair programming](https://en.wikipedia.org/wiki/Pair_programming "pair 
programming"): two developers work at the same feature on the same workstation. As reported on Wikipedia, one of the
 the main advantages of pair programming is knowledge sharing:
 
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
difference between the official IDEs: Android Studio and XCode. After seeing the coding speed that Francesco is 
able to reach during the implementation of a new feature on Android, and how much slower it is to do the same things on XCode for 
iOS, I realized how much more advanced is Android Studio with is set of refactoring features in comparison with XCode.  
In this post I will briefly analyze this two IDEs by describing their main features. I will then show you why, at the
 time of this writing, I started to prefer the Jetbrains IDEs family for mobile application development 
(and not only for that :bowtie:).


### XCode
I always loved XCode. I started to use it 8 years ago and it's still here with me during my daily job. It opens in a 
few seconds and you can start to code very quickly. But.... what happens when your app code start to increase in term 
of complexity and you need to do a simple refactoring operation? Does it help you in some way when it need to create 
a new class/property? Does it help you when you need to navigate in your code and you need to jump quickly from one 
class to another? Well, to be honest it doesn't help you. Even a simple renaming could become a painful 
operation, especially if you have a project with mixed Swift/Objective-C parts. Everything must be done manually. 
Consider for example the creation of a class. This is how you have to do a class creation in XCode.  

///GIF class creation 

### Android Studio
Before [lastminute.com group](http://www.lastminutegroup.com "lastminute.com group"), I had used Android Studio just 
a few times for some very simple Android apps. Then I started to work with [Francesco](https://www.linkedin.com/in/fbonfadelli/ "Francesco Bonfadelli") 
and he introduced me to the power of Jetbrains IDEs. This IDE gives you the ability to navigate quickly in you source
 code, create and modify classes, and do a lot of other refactoring operations without leaving the keyboard! 
 Basically you can write code without forgetting about your mouse!! :open_mouth:. The list of keyboard shortcut you 
 can use in your development flow is endless. You can find the complete list [here](https://developer.android.com/studio/intro/keyboard-shortcuts.html "Android studio keyboard shortcut"). 
Let's try to do the same operation we did before with XCode: create a class.

///GIF class creation  

As you can see, Android Studio gives you the ability to write code at the speed of light!!! :flushed:.

### AppCode
As you can image, after working a few hours with Android Studio, I started to wonder if there's an IDE that let me 
setup the same write code style and workflow. Here another colleague that I worked with, [Tommaso Resti](https://www.linkedin.com/in/tommaso-resti-0ab5285a/ "Tommaso Resti"),
a senior iOS and Android developer, shown me for the first time AppCode. This is another IDE from JetBrains for iOS 
development. It allows you to improve your development speed by allowing you to use some of the refactoring tools 
that you can find in Android Studio. However it's not all peace and light in this case. Some of the refactoring tools
 are not available for Swift and you will still need XCode to work on Xib and Storyboard (the Jetbrains team 
 developed a plugin for interface builder, but that has been discontinued). 
 Anyway, if you start to get used to the Android Studio writing code workflow, you will feel at home with AppCode :relaxed:.

### Final thoughts 
Android Studio is based on IntelliJ IDEA, the famous Java IDE from Jetbrains. But Jetbrains IDE family is really big.
 You can find an IDE for each of your favourite language:
 * CLion, for C and C++
 * IntelliJ for Java (and maybe their most famous IDE)
 * PhpStorm
 * PyCharm
 * RubyMine for Ruby
 * GoLand for GO
 * Rider for C#
So no worries: if you want to start to improve you coding speed probably there's an IDE for your favourite language. 
XCode will always have a special place in my heart. I will still continue to use it in my daily Job as a mobile 
developer. But... the coding speed I gained with the Jetbrains IDEs let me prefer them for my daily job :smiling_imp:.    
       

      


