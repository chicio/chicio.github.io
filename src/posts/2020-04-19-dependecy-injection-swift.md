---
title: "How to: create your SUPER simple dependency injector container in Swift"
description: "There are a lot of dependency injection framework in the open source swift world with really cool features
like object graph, persistence etc. But what if all you need is a lightweight dependencies container? In this post I
will show you how to create it by leveraging the Metatype Type, Generics, the Hashable protocol and the Equatable
protocol."
date: 2020-04-19
image: ../images/posts/dp-container.jpg
tags: [swift, ios, apple, mobile application development]
comments: true
math: false
authors: [fabrizio_duroni]
---

*There are a lot of dependency injection framework in the open source swift world with really cool features like object
graph, persistence etc. But what if all you need is a lightweight dependencies container? In this post I will show you
how to create it by leveraging the Metatype Type, Generics, the Hashable protocol and the Equatable protocol.*

---

The open source Swift world is full of useful framework. You can find almost everything you need (there
are [rare cases where you need to write something that still doesn't exist](https://www.fabrizioduroni.it/2018/05/07/born-id3tageditor-mp3id3tagger/ "id3 tag editor")
out there). Anyway, a lot of the frameworks and libraries you will find out do more than you need. See for example the
world of the dependencies injection framework. We have a lot of alternatives from which we can
choose: [Swinject](https://github.com/Swinject/Swinject "dependencies injection swift Swinject")
, [Weaver](https://github.com/scribd/Weaver "dependecies injection swift Weaver") etc. This frameworks come with a lot
of features like: object graph construction, injection with property wrappers, instance persistence etc. This are all
useful feature, but if your needs are very limited (just a dependecies container register/resolver using protocol and
classes) the previous frameworks gives you just a big overhead and complexity on you code. This is why for my recent
project I tried to write my own very simple dependencies injector container by leveraging the power of Swift Metatype
and the Hashable protocol. Let's go and see the how I created it :smirk:.

#### Implementation

The main class of dependencies injector container is composed by 2 classes: `DependeciesContainer` and `DependencyKey`
.  
The main one stores in the field `dependecies` a dictionary of all the dependencies registered using an instance of the
second one. `DependeciesContainer` exposes two methods:

* `register<T>(type: T.Type, name: String? = nil, service: Any)`, that lets you register a new dependency in the
  container. It accepts 3 parameter. The first one is the `Type` of the dependency. The second one is a string that
  let's you identify different named variations of the same dependencies (e.g. you register `Cat` and `Dog`, two
  different implementation of an hypothetical `Animal` protocol). The third one is the instance saved in
  the `dependecies` dictionary.

* `resolve<T>(type: T.Type, name: String? = nil) -> T?`, that lets you get an instance previously registered. This
  method accept the same first two parameter of the previous method. It will return null if none of the registered
  instance has a combination of `type` and `name` as the one received as parameters.

As you can see both method extensively uses generics in order to be able to accept any possible class or protocol you
may want to use. This is the implementation of `DependeciesContainer`.

```swift
class DependeciesContainer {
    static let shared = DependeciesContainer()

    private init() {}

    private var dependecies: [DependencyKey : Any] = [:]

    func register<T>(type: T.Type, name: String? = nil, service: Any) {
        let dependencyKey = DependencyKey(type: type, name: name)
        dependecies[dependencyKey] = service
    }

    func resolve<T>(type: T.Type, name: String? = nil) -> T? {
        let dependencyKey = DependencyKey(type: type, name: name)
        return dependecies[dependencyKey] as? T
    }
}
```

Now, you can ask some question after seeing this code. First of all, what is a `Type`?
Apple [defines it](https://docs.swift.org/swift-book/ReferenceManual/Types.html#grammar_metatype-type "swift metatype")
as:

> A metatype type refers to the type of any type, including class types, structure types, enumeration types, and protocol types.

A metatype is the representation of the type of an instance. It allows you to use all of class properties and methods of
a type. It allows also to threat your code as a data. In this specific case we are using the `Type` metatype to identify
an instance from its own description.  
The second one question that you could ask is: how can you use the `DependecyKey` class instances as key in
your `dependecies` dictionary? This is possible thanks to the `Hashable` and `Equatable` protocols. This class
implements the `hash(into hasher: inout Hasher)` method of the `Hashable` protocol by using the combination of `type`
and `name` received from the `DependeciesContainer`. In that method I'm putting in the same hasher the `type` and
the `name`. In particular for the first one I'm extracting a unique identifier using the `ObjectIdentifier` function
from the Swift `Reflection` package.  
It also implements the `Equatable` protocol using the same fields in
the `static func == (lhs: DependencyKey, rhs: DependencyKey) -> Bool` method. By implementing this two protocol a class
could be used as key in a dictionary.

```swift
class DependencyKey: Hashable, Equatable {
    private let type: Any.Type
    private let name: String?

    init(type: Any.Type, name: String? = nil) {
        self.type = type
        self.name = name
    }

    func hash(into hasher: inout Hasher) {
        hasher.combine(ObjectIdentifier(type))
        hasher.combine(name)
    }

    static func == (lhs: DependencyKey, rhs: DependencyKey) -> Bool {
        return lhs.type == rhs.type && lhs.name == rhs.name
    }
}
```

This is all I need for my ultra light dependencies injector :heart_eyes:!!! Let's see it in action in an example.

```swift
protocol Animal {
    func isAlive() -> Bool
}

class Cat: Animal {
    func isAlive() -> Bool {
        true
    }

    func miaow() -> String {
        return "miaow"
    }
}

class Dog: Animal {
    func isAlive() -> Bool {
        true
    }

    func bark() -> String {
        return "wooof"
    }
}

class Tiger: Animal {
    func isAlive() -> Bool {
        true
    }

    func roar() -> String {
        return "roar"
    }
}


protocol Person {
    func breath() -> String
}

class SickPerson: Person {
    func breath() -> String {
        return "fiuu"
    }

    func cough() -> String {
        return "cough"
    }
}

let dc = DependeciesContainer.shared

// Register using class `Type` Dog
dc.register(type: Dog.self, service: Dog())
let dog = dc.resolve(type: Dog.self)!
print(String(describing: dog)) // "__lldb_expr_7.Dog\n"
print(dog.bark()) // "wooof\n"

// Register using protocol `Type` Person
dc.register(type: Person.self, service: SickPerson())
let person = dc.resolve(type: Person.self)!
print(String(describing: person)) // "__lldb_expr_7.SickPerson\n"
print(person.breath()) // "fiuu\n"
print((person as! SickPerson).cough()) // "cough\n"

// Register using protocol `Type` Animal and variations
dc.register(type: Animal.self, name: "Cat", service: Cat())
dc.register(type: Animal.self, name: "Tiger", service: Tiger())
let cat = dc.resolve(type: Animal.self, name: "Cat")!
print(String(describing: cat)) // "__lldb_expr_9.Cat\n"
print(cat.isAlive())
print((cat as! Cat).miaow()) //"miaow\n"
let tiger = dc.resolve(type: Animal.self, name: "Tiger")!
print(String(describing: tiger)) // "__lldb_expr_9.Tiger\n"
print(tiger.isAlive())
print((tiger as! Tiger).roar()) // "roar\n"
```

#### Conclusion

You can find all the code shown in this
post [in this Github repo](https://github.com/chicio/dependencies-injection-swift-example "custom tab bar swiftui").
Remember: sometimes with a couple of classes you can avoid to import big frameworks and library into your projects. You
just need to study hard the languages and SDK fundamental. :heartpulse:
