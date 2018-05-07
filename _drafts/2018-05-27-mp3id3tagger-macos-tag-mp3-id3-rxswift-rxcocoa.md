---
layout: post
title: "Mp3ID3Tagger: a native macOS app to edit the ID3 tag of your mp3 files written using RxSwift and RxCocoa"
description: "Third part of a short series of post in which I describe my two latest project: ID3TagEditor and 
Mp3ID3Tagger. In this post I will talk about Mp3ID3Tagger, a macOS application to edit id3 tag of your mp3 files."
date: 2018-05-25
image: /assets/images/posts/mp3id3tagger-logo.jpg
tags: tags: [swift, macos, apple, rxswift, rxcocoa]
comments: true
seo:
 - type: "BlogPosting"
---

*Third part of a short series of post in which I describe my two latest project: ID3TagEditor and 
 Mp3ID3Tagger. In this post I will talk about Mp3ID3Tagger, a macOS application to edit id3 tag of your mp3 files.*

---

In [this previous post](/blog/2018/05/25/born-id3tageditor-mp3id3tagger.html "born id3tageditor mp3id3tagger") I 
described the reason why I develop [Mp3ID3Tagger](https://github.com/chicio/Mp3ID3Tagger "mp3 id3 tag editor macos"),
 a macOS app to edit the id3 tag of your mp3 files that leverage on the power of [ID3TagEditor](/blog/2018/05/26/id3tageditor-swift-read-write-id3-tag-mp3.html). Below you can find 
 the app logo.
 
![MP3ID3Tagger macOS app RxSwift](/assets/images/posts/mp3id3tagger-logo.jpg "MP3ID3Tagger macOS app RxSwift")
 
So how did I developed MP3ID3Tagger? I was about to start the development following the classic approach to develop 
an app on every Apple OS: [Model View Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller 
"Model View Controller") and plain Swift. But then I though: "This is the perfect project to test one of the last programming technique I 
recently learned: Reactive Programming/Reaactive Extensions with RxSwift and RxCocoa!!!!!! In this way I can also try
 to use a different architectural pattern: the [Model View ViewModel (MVVM)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel "Model View ViewModel")" :sunglasses:. 
What kind of architectural pattern is the MVVM? What are Reactive Programming, Reactive Extensions, 
RxSwift and RxCocoa???  
Let's start from the first one. The MVVM is an architectural pattern invented by the Microsoft software engigneers 
Ken Cooper and Ted Peters. As for other architecture patterns [I described in the past](/2017/08/11/model-view-presenter-architecture-ios-swift-unit-test.html "Model View Presenter"), the MVVM is useful to 
clearly separate the UI development from the business logic. The main components of the MVVM are:

* the *Model*, that usually represents the business logic of the application. 
* the *View*, as in the other architectural pattern, the view is the structure, layout, and appearance of what a user sees on the screen.
* the *View model*, that usually represents an abstraction of the view exposing public properties and commands. 
* the *Binder* interprets bindings defined in (typically) the View, observes the View Model for changes in state and 
updates the View and finally observes the View for changes in state and updates the View Model.

From the definition above we see that the MVVM needs something to bind the view to the view model in a platform 
independent way. This is wht we need RxSwift, RxCocoa and Reactive Extensions. What are they? LEt's see some quote 
for the definitions:

>Reactive Extensions (also known as ReactiveX or Rx) is a set of tools allowing imperative programming languages to 
operate on sequences of data regardless of whether the data is synchronous or asynchronous. It provides a set of 
sequence operators that operate on each item in the sequence. .... ReactiveX is API for asynchronous programming with 
 observable streams ... RxSwift is the Swift version of ReactiveX (Rx) .... RxCocoa is a framework that helps make 
 Cocoa APIs used in iOS and OS X easier to use with reactive techniques ....

So RxSwift and RxCocoa let us create an abstraction from the platform specific UI implementation and let us implement
 our ViewModel by working in an event-driven way: the ViewModel only works with streams of data that comes from 
 `Observable` and `Subjects` of RxSwift. 
 XXX DEFINIZIONE DI OBSERVABLE E SUBJECT
 RxCocoa gives us an abstraction over Cocoa and Cocoa Touch specific 
 components and let us work with generic observable UI component. This basically means that:
  
  * RxSwift and RxCocoa are our Binder of the MVVM 
  * the Various View and View Controllers are the View of the MVVM
  * the ID3TagEditor will be the Model of the MVVM 
  * the ViewModel will connect the View and the ID3TagEditor Model in a platform UI independent way
  
With this architecture we can also think about using the same Model and ViewModel on different platform. So if in the
 future I will develop an iOS version of Mp3ID3Tagger, I will only have to develop the View part.
So let's start to see how I implemented Mp3ID3Tagger, the app subject of this post.
The first building block is the `BindableView` protocol, that represents the View part in the MVVM architecture. This 
protocol must be implemented only by subclasses of the `NSViewController`. The protocol contains a property and a 
function. The `viewModel` forces the class (the View) to have a property that represents its ViewModel. The function 
`bindViewModel` is where the View and the View model are bound together. The `bindViewModel` must be called inside 
one the lifecycle methods of the `NSViewController`. 

```swift
protocol BindableView where Self: NSViewController {
    associatedtype ViewModelType
    var viewModel: ViewModelType! { get set }
    func bindViewModel()
}
```

Then there's a `ViewModel` base class. This class is useful to centralize the setup of a `disposeBag`. The 
`DisposeBag` it’s an RxSwift component that keeps a reference to all the `Disposable` you add to it. The `Observable`
 are `Disposable`, so you can add them to it to have an ARC-like behaviour: when the `DisposeBag` will be released all
  the `Disposable`  instances it keeps will be released as well. So by having the `ViewModel` base class all the 
  ViewModel will have a `disposeBag` by default where they will add their disposables.



 

 

