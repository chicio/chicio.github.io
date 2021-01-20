---
layout: post
title: "Unit testing in Kotlin with JUnit 5 and MockK"
description: "I recently discovered MockK, a mocking library created for Kotlin. Let's see how it is possible to write modern unit tests with MockK + JUnit 5."
date: 2020-12-23
image: /assets/images/posts/XXXX.jpg
tags: [java, kotlin, test driven development]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*I recently discovered MockK, a mocking library created for Kotlin. Let's see how it is possible to write modern unit tests with MockK + JUnit 5.*

---

As I told you in my [last post](/2020/12/23/rest-template-webclient-spring-boot.html), in the last months during my daily job I wrote a lot of Kotlin backend code during my daily job. Usually I develop new stuff using Test Driven Development (TDD) technique. Specifically, most of the time I use the [mockist approach](https://martinfowler.com/articles/mocksArentStubs.html#ClassicalAndMockistTesting). This basically means that I need a mock library. For Java there are JMock and Mockito, and in fact I usually use Mockito. It is possible to this library with Kotlin but [it has some limitations](https://antonioleiva.com/mockito-2-kotlin/). So I started to wonder if there was an alternative created "espressamente" per kotlin, and I found that in XXXXlmn grouXXXX we were already using MockK....


FONTI
- https://junit.org/junit5/docs/current/user-guide/#dependency-metadata
- https://www.baeldung.com/junit-5
- https://www.baeldung.com/spring-maven-bom
- https://stackoverflow.com/questions/27256429/is-org-junit-assert-assertthat-better-than-org-hamcrest-matcherassert-assertthat
- https://www.polidea.com/blog/junit-5-in-kotlin-testing/
- https://www.baeldung.com/kotlin/junit-5-kotlin
- https://junit.org/junit5/docs/current/user-guide/#extensions
- https://www.baeldung.com/junit-5-extensions
