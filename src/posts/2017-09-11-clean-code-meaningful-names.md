---
title: "Clean Code: meaningful names"
description: "In this post I will talk about clean code and how important are the name you choose while you're
developing software."
date: 2017-09-11
image: ../images/posts/meaningful-names.jpg
tags: [clean code]
comments: true
math: false
authors: [fabrizio_duroni]
---

*In this post I will talk about clean code and how important are the name you choose while you're developing software.*

---

I always cared about the software I developed. I also always though that what makes a real professional software
developer is how much he/she care about the software he/she is creating: the approach to the problem, the attention to
details in code, the passion put into creating every single line of code, the focus on the mission to solve his/her
customer problems with your software.  
When I started to work at [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group") I discovered
that I'm not the only one to think about software development in this way.  
In fact an entire new approach to software development has been create
by [Robert Cecil Martin](https://en.wikipedia.org/wiki/Robert_Cecil_Martin "Robert Cecil Martin"), known as "Uncle
Bob" (what??!?!!? :stuck_out_tongue:) and famous also to be the guy that invented
the [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design) "Solid principles"). The name of
this new approach to software development is **clean code**.  
So as I promised in [my first post](/2017/05/10/about-me/ "about me") on this blog I will publish a series of
articles in which I will talk about the foundation of clean code and my personal experiences with it. So let's start the
discussion with one of the principles of clean code that impressed me the most: meaningful naming.

![Remember: you NEED to choose your names carefully!](../images/posts/meaningful-names.jpg "Remember: you NEED to choose your names carefully!")

As stated by Uncle Bob in the beautiful meme above, this principle is simple: choose your name carefully. But what does
it really mean to "choose carefully"? :confused:. Choosing the right names means the following thing:

* **Names should reveal intent.** Names should answer why a variable, a class or a method exists, what it does and how
  it must be used.
* **Avoid disinformation.** Names should not contains false clues about the scope of a variable, method or class. Taking
  an example from Uncle Bob's clean code: "Do not refer to a grouping of accounts as an accountList, unless it is
  actually a list...So accountGroups or just plain accounts would be better".
* **Don't use noise words.** Adding in the name something like "Info" , "Data" doesn't give you any value.
* **Use pronounceable names.** This is simple: use names that humans can pronounce without feeling stupid.
* **Use searchable names.** Avoid single-letter names and numeric constants that make your components harder to find.
* **Avoid encodings.** Avoid unnecessary encoding notation, like for
  example [Hungarian Notation](https://en.wikipedia.org/wiki/Hungarian_notation "Hungarian Notation") in which the name
  of a variable or function indicates its type.
* **Avoid member prefix.** Don't add unnecessary name prefix.
* **Avoid encoding interface and implementations.** Avoid encoding interface with "I" and concrete implementation with "
  Impl". If you really need to encode, do it for the implementation.
* **Use noun or noun phrase for classes.**
* **Use verb or verb phrase for methods.**
* **One word per concept.** Choose a word for a concept and always use it each time you have to refer to it in code.
* **Use solution domain names.** Your code will be read by other programmers. Math names, algorithm names, pattern names
  are all good choices.
* **Use problem domain names.** If no "programmer oriented name" exists, go with names taken from the problem domain.

Let's see an example to understand the real value of naming classes, methods, functions and variable in the right way.
For example, take a look at the following C++ code:

```c++
struct pt {
    float x;
    float y;
    float z;
};

struct mt {
public:
    float m[4][4];
};

class Obj {
public:
    bool act;
    mt matr;
    std::vector<pt> ms;
};

class GameManager {
public:

    GameManager(std::vector<Obj> anObjList){
        objList = anObjList;
    }

    std::vector<Obj> get() {
        std::vector<Obj> newObjList;
        for (auto currObj : newObjList) {
            if (currObj.act && currObj.ms.size() > 0) {
                newObjList.push_back(currObj);
            }
        }
        return newObjList;
    }

private:

    std::vector<Obj> objList;
};
```

Even if you can maybe get a feeling of what is going, it's hard to really understand all the details of this code, and
every class, struct is supposed to do and to represent. What are `pt` and `mt`???? What is supposed to represent
a `GameManager` and an `Obj`? And the method `get`, what wants to get????? :cold_sweat:. You can see that a lot of
things are a little bit obscure in this code.  
We can try to refactor it following the names guidelines we exposed above. Do you think the code will improve in this
way? You can judge it by yourself:

```c++
struct Point {
    float x;
    float y;
    float z;
};

struct Matrix {
public:
    float values[4][4];
};

class GameObject {
public:
    bool isActive;
    Matrix transformation;
    std::vector<Point> mesh;
};

class Scene {
public:

    Scene(std::vector<GameObject> newGameObjects){
        gameObjects = newGameObjects;
    }

    std::vector<GameObject> getValidGameObjects() {
        std::vector<GameObject> activeGameObjects;
        for (auto gameObject : gameObjects) {
            if (isValid(gameObject)) {
                activeGameObjects.push_back(gameObject);
            }
        }
        return activeGameObjects;
    }

private:

    std::vector<GameObject> gameObjects;

    bool isValid(GameObject gameObject) {
        return gameObject.isActive && isValid(gameObject.mesh);
    }

    bool isValid(std::vector<Point> mesh) {
        return mesh.size() > 0;
    }
};
```

Whoah!! I mean, the code now seems self explained. Each instruction appears more clear in its intents. Each class,
struct and method doesn't need any additional comment/documentation. I think it's really amazing how some changes to the
names could improve the quality of a piece of code dramatically like in our case. We're done with names :relieved:. You
can find the complete
example [here](https://github.com/chicio/Clean-Code-Meaningful-Names "Renaming clean code example")
I hope that this article will convince you that the names you choose define how much you code is "beautiful" in terms of
readability and also, more import, maintainability. Quoting
what [Grady Booch](https://en.wikipedia.org/wiki/Grady_Booch "Grady Booch") said about clean code:

> Clean Code reads like a well-written prose.

Choosing the right names is the first step to make your code more similar to a well-written prose.
