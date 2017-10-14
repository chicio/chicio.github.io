---
layout: post
title: "Asynchronous testing of closure in Swift"
description: "In this post I will talk about asynchronous testing in Swift."
date: 2018-01-19
image: /assets/images/posts/reflection.png
tags: [swift, ios, apple, mobile application development, test driven development]
comments: true
seo:
 - type: "BlogPosting"
---

*In this post I will talk about asynchronous testing in Swift.*

---

As we see in [this post](/2017/06/02/swift-closure-syntax.html "what are closure") and also in [this other one](/2017/06/14/swift-closure-demystifying-autoclosure-escaping.html "autoclose and escaping"), closures are one of the most important building block of Swift. They are extensively used inside the iOS SDK, and also the code I write everyday :stuck_out_tongue_winking_eye:.  
But in the previous posts about closures I didn't answer one very important question: how do can you unit test closure? It seems Apple has the answer for us!! Inside the iOS Testing framework we have **Expectation**. How do they work? To test thatclosure (and generally speaking asynchronous operations) behave as expected, you create one or more expectations within your test, and then fulfill those expectations when the asynchronous operation completes successfully. Your test method waits until all expectations are fulfilled or a specified timeout expires. The general code structure for expectation with closure is like the following example:

```swift
let expectation = XCTestExpectation(description: "Expectation description")

yourInstance.method(param: "aParam") {
    <Your assert using XCTAssert...>
    expectation.fulfill()
}
```

Basically the process to test closure/asynchronous operation is:

* create an expectation that is an instance of `XCTestExpectation`
* execute your closure, make your assert and call the method `fulfill` of `XCTestExpectation`

So, what about a more complex example? Let's see how powerful expectation are by implementation a use case with some dependency that uses closure to complete some taks, and how we can unit test the use case and the closure used by its dependency objects.
Suppose for example we have a [use case] class called `PasswordUpdateUseCase` with the following implementation:

```swift
public class PasswordUpdateUseCase {
    private let passwordService: PasswordService
    private let passwordRepository: PasswordRepository
    
    public init(passwordService: PasswordService, passwordRepository: PasswordRepository) {
        self.passwordService = passwordService
        self.passwordRepository = passwordRepository
    }
    
    public func update(password: String) {
        passwordService.update(password: password) { success, error in
            if success {
                self.passwordRepository.save(password: password)
            }
        }
    }
}
```

As you can see inside the `update` method we have an instance of `PasswordService` that, as the method name suggest, execute an update of the user password and return the result of the operation inside a closure. How do we test it? 

.........
