---
layout: post
title: "The born of ID3TagEditor and Mp3ID3Tagger and my journey into the ID3 tag standard"
description: "First part of a short series of post in which I describe my two latest project: ID3TagEditor and Mp3ID3Tagger. In this first post I will talk about why I started to develop them."
date: 2018-05-25
image: /assets/images/posts/XXXXXXX
tags: tags: [swift, ios, apple, mobile application development, macOS development]
comments: true
seo:
 - type: "BlogPosting"
---

*First part of a short series of post in which I describe my two latest project: ID3TagEditor and Mp3ID3Tagger. In this
first post I will talk about why I started to develop them.*

---

Recently I bought a new car. After a lot of search I finally decided to buy the Renault Clio 2017 1.5 dci. I love this
car. It has been a big step forward on my previous car. One of the most interesting feature of this car is its media
entertainment system: the Media Nav Evolution system. This system has a 7'' touchscreen with map integration and a basic
 smartphone integration with Siri voice recognition and phone call support.

![media nav clio](/assets/images/posts/media-nav-clio.jpg "media nav clio")

One of the thing the get my attention was the ability to start to listen to my mp3 collection while I'm driving (on my
previous car I had a standard cd player). So I prepared an usb key with some of my mp3 and I started to listen to them.
Now one thing get my attention: some of my songs where displayed on the touchscreen with information about the album and
 the cover of the album. I though: "Whoahh this is very cool!! I need to start to fill my mp3 with all this information".
 This is exactly the moment where my journey into the development of ID3TagEditor and Mp3ID3Tagger, but I was not yet
 aware of it :grin:

 XXXXX foto canzone con dati fillati su macchina

So I sat in front of my mac, I opened iTunes and I started to tag my mp3 files. I saved them on a usb key and I went to
my car to test them. The result was the following:

XXXX foto canzone senza cover


What the f**k is going on??!!?! :angry: The title and the album where displayed but the cover was not show on the screen.
So came back to my desk and started to download some native macOS app that let the user edit what I discovered was
called *ID3 tag*. I tried a lot of them, but none worked as expected. Then I found an app called Mp3Tag. This is Windows
 application that runs also on mac using Wine. So I downloaded it and tried to tag some mp3. I put them on a usb key and
  then.....


XXXX foto canzone che fa vedere i dati


Mp3Tag was working as expected :relieved:. But then I started to ask myself:"What is doing Mp3Tag that the other native
macOS application are not doing?". The only way to discover the reason behind this mystery was to compare an mp3 tagged
with Mp3Tag with an mp3 tagged with one of the other applications. So I opened with an [HexFiend](https://ridiculousfish.com/hexfiend/ "an hex editor") an 
mp3 tagged with iTunes and another one tagged with Mp3Tag and I compared them...

XXXX foto dove cambia bit della cover

Yep, a single bit could make a big difference :open_mouth:. The fact is that the [ID3 standard](http://id3.org/d3v2.3.0 
"ID3 standard") accept multiple type of attached picture for an mp3: front cover, back cover, icon, artist photo ecc. This different 
type of pictures are identified in the standard by a bit just after the MIME type. The problem is that iTunes and other "mp3 tagger" native 
macOS applications don't let the user modify the type of the cover: all this application set the bit to `0x00` that 
in the ID3 standard corresponds to the *"Other"* cover type. But the media nav system of my car displays cover 
inserted in the tag with a specific type, for example `0x03` *"Cover (Front)"*, that is the default type inserted
 by Mp3Tag. The `0x00` *"Other"* type is discarded. 
 My next question was: "How is it possible that there's not a **native** macOS solution? There are only cross 
 platform/web solution. I want something that a real Apple fag would be happy to use...". 
 Honestly, I didn't found it. So I started to think: "I could create it, using some modern framework/programming paradigm I studied in the 
 last months...In this way I can create my first macOS app and add some other interesting projects to my [Github 
 profile](https://github.com/chicio/ "chicio github")...and also I can work on a project where I don't have to launch
  the commands `npm install` or `mvn clean install` hundred times in a day...". 
 Here we are after two months of work with the public release of:
 
 * `ID3TagEditor`, a pure Swift library (only `Foundation` framework dependencies) to read/modify ID3 tag of your mp3 
 files (described [in this  post](XXXXXXXXXXX)) that support the following Apple OSes: macOS, iOS, watchOS and macOS 
 (so the entire Apple ecosystem :grin:)
 * `Mp3ID3Tagger`, a native macOS app written in Swift using the reactive programming paradigm and in particular its
  Rx variant with the frameworks RxSwift and RxCocoa (Rx????!?!?!? WHATTTT?!?!?!? :cold_sweat:).
  
If you are still interested in knowing details about the creation of this two projects, you can follow the link s
below:

* [ID3TagEditor: a Swift framework to read and write ID3 tag of your mp3 files for macOS, iOS, tvOS and watchOS]           
* [Mp3ID3Tagger: a native macOS app to edit the ID3 tag of your mp3 files written using RxSwift and RxCocoa]

XXXX photo loghi librerie           

I hope you will see how much love and passion I put into this projects and I also hope you will find all the 
technical details inside them interesting :sparkling_heart:.
