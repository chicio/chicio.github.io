---
layout: post
title: "Unit testing in Kotlin with JUnit 5 and MockK"
description: "I recently discovered MockK, a mocking library created for Kotlin. Let's see how it is possible to write modern unit tests with MockK + JUnit 5."
date: 2021-01-31
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

As I told you in my [last post](/2020/12/23/rest-template-webclient-spring-boot.html), in the last months during my daily job I wrote a lot of Kotlin backend code during my daily job. Usually I develop new stuff using Test Driven Development (TDD) technique. Specifically, most of the time I use the [mockist approach](https://martinfowler.com/articles/mocksArentStubs.html#ClassicalAndMockistTesting). This basically means that I need a mock library. For Java there are JMock and Mockito, and in fact I usually use Mockito. It is possible to use this library with Kotlin but [it has some limitations](https://antonioleiva.com/mockito-2-kotlin/). So I started to wonder if there was an alternative, and I found that in [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group") we were already using MockK, a mocking library "written in Kotlin for Kotlin" :smirk:. In this post I will show you how to use MockK and JUnit 5 to improve you unit tests. To do this, I will migrate to Kotlin + MockK + JUnit 5 an old kata I did some time ago in Java + Mockito: the Minesweeper. So let's start!!

#### Implementation

Let's start from the installation. For this kata I use [maven](https://maven.apache.org "maven") to manage my dependecies. To install JUnit 5 I use the JUnit 5 [Bill of materials](https://www.baeldung.com/spring-maven-bom "bom"), usually abbreviated to BOM. If you don't know what a BOM is, you can find the definition below (keep in my that also that BOM is a general concept and you can find it also in other build system like for example Gradle).

> BOM is a special kind of POM that is used to control the versions of a project’s dependencies and provide a central place to define and update those versions. BOM provides the flexibility to add a dependency to our module without worrying about the version that we should depend on. 

The installation of MockK is easier. The only thing I need to do is just to add the dependecy to the pom file. Last but not list  Below you can find the entire pom file.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <kotlin.version>1.4.21</kotlin.version>
    </properties>

    <groupId>it.chicio.minesweeper</groupId>
    <artifactId>minesweeper</artifactId>
    <version>1.0</version>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.junit</groupId>
                <artifactId>junit-bom</artifactId>
                <version>5.7.0</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.mockk</groupId>
            <artifactId>mockk</artifactId>
            <version>1.10.4</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib-jdk8</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.jetbrains.kotlin</groupId>
                <artifactId>kotlin-maven-plugin</artifactId>
                <version>${kotlin.version}</version>
                <executions>
                    <execution>
                        <id>compile</id>
                        <phase>compile</phase>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>test-compile</id>
                        <phase>test-compile</phase>
                        <goals>
                            <goal>test-compile</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <jvmTarget>1.8</jvmTarget>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <executions>
                    <execution>
                        <id>compile</id>
                        <phase>compile</phase>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>testCompile</id>
                        <phase>test-compile</phase>
                        <goals>
                            <goal>testCompile</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

The migration to Kotlin of the project was easy with IntelliJ IDEA: I just launched the automatic conversion that you can find in the menu `Code -> Convert Java File to Kotlin File` and that fixed the code obtained. In particular, given the fact that there weren't [nullability annotations](https://www.jetbrains.com/help/idea/nullable-and-notnull-annotations.html "java nullability annotations"), all the fields of all the classes were created as Optional.  
After the converions I started to rewrite all the tests. Let's start to see the `FieldTest`, an test without mocking where I just needed to migrate from JUnit 5.

- Field test per junit
-- displayname
-- nested

...

#### Conclusion



FONTI
- https://junit.org/junit5/docs/current/user-guide/#dependency-metadata
- https://www.baeldung.com/junit-5
- https://stackoverflow.com/questions/27256429/is-org-junit-assert-assertthat-better-than-org-hamcrest-matcherassert-assertthat
- https://www.polidea.com/blog/junit-5-in-kotlin-testing/
- https://www.baeldung.com/kotlin/junit-5-kotlin
- https://junit.org/junit5/docs/current/user-guide/#extensions
- https://www.baeldung.com/junit-5-extensions
