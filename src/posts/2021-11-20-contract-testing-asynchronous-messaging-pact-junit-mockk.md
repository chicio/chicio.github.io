----
title: "Contract testing asynchronous messaging with Pact"
description: "Let’s see how we used pact to test a message-based interaction between two microservices with Pact"
date: 2021-11-20 image: ../images/posts/ddd-bounded-context-ubiquitous-language.jpg
tags: [test driven development, contract test, pact,]
comments: true 
math: false 
authors: [fabrizio_duroni]
----

In the last weeks I worked with my colleague XXX on a new feature for our company refund process (as may already know
from some of [my previous posts]() in the last 2 years I worked mainly on backend applications). In this new feature we
have a messaging-based communication between micro services. The messaging system used is [RabbitMQ](). In the company
we are already using [Pact](https://docs.pact.io "pact doc") to implement contract testing for the classic RESTful 
interaction between microservices (introduced by XXX). What is contract testing? let’s have a look at the definition from the Pact website.

> Contract tests assert that inter-application messages conform to a shared understanding that is documented in a contract. Without contract testing, the only way to ensure that applications will work correctly together is by using expensive and brittle integration tests.  
> Do you  [set your house on fire to test your smoke alarm?](https://dius.com.au/2014/05/19/simplifying-micro-service-testing-with-pacts/)  No, you test the contract it holds with your ears by using the testing button. Pact provides that testing button for your code, allowing you to safely confirm that your applications will work together without having to deploy the world first.

So contract testing is a way to ensure that two application communicate correctly by adhering to a contract that
describe the API or the message exchanged between them. Cool, isn’t it? 😏

![contract testing pact](../images/posts/pact-contract-testing.jpg "")

In this post I will show you how we tested a messaging interaction between two microservices using Pact. How does it 
work? Pact is a [consumer driven contract testing](https://martinfowler.com/articles/consumerDrivenContracts.html 
"consumer driven contract testing"): it is responsibility of the consumer to generate the contract that will be used 
by the provider to verify its correctness. As you can see from the image above, there are three key actors in pact test:

* the consumer of an API
* the provider of an API
* a pact broker, an application used to share contracts and verification results between consumers and providers.

The workflow to write a consumer driven contract test is the following one:

* write the contract test on the consumer
* publish the contract obtained by executing the contract test on the consumer side
* write the provider test using the contract published before as a proof of correctness of your API

The same flow is applied in case of a message/event driven architecture: start with the test of the message 
consumer, publish the contract and then write the message producer test.
Now that everything is clear we can start to write our first Pact test for message exchange between two microservices. 
Let’s go!!! 🚀

#### Setup

Our example application is composed by two microservices:

* `RefundService`, a spring boot web application that manages everything related to the refund of an order of a 
  customer. In our example this application will be the *producer* of a *refund ready message*.
* `AccountService`, a spring boot web application that manages everything related to the customer account. In our 
  example this application will be the *consumer* of a *refund ready message* that came from the `RefundService` application. 

Let's see the dependencies need by these applications. Both of them will depend on these libraries/languages:

* spring boot, kotlin, [arrow](https://arrow-kt.io "arrow kotlin") (kotlin functional programming library) 
  production code 
* spring boot starter test, [kotest](https://kotest.io) and [mockk](https://mockk.io) for the testing part

For writing our Pact test:

* `RefundService` will have the dependency needed in order to write the pact provider test `au.com.
  dius.pact.provider.junit5`
* `AccountService` will have the dependency needed in order to write the pact consumer  test `au.com.dius.pact.
  consumer.junit5`

In the `AccountService` application, so on the consumer side, we need also to set up the maven plugin `au.com.dius.
pact.provider.maven` that will let us publish our contracts on the pact broker. Below you can find the maven pom.xml 
of the applications.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.5.6</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>it.chicio.pact.provider</groupId>
	<artifactId>RefundService</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>RefundService</name>
	<description>Message provider example</description>
	<properties>
		<java.version>11</java.version>
		<kotlin.version>1.5.31</kotlin.version>
		<arrow.version>1.0.0</arrow.version>
		<pact.version>4.2.14</pact.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>
		<dependency>
			<groupId>org.jetbrains.kotlin</groupId>
			<artifactId>kotlin-reflect</artifactId>
		</dependency>
		<dependency>
			<groupId>org.jetbrains.kotlin</groupId>
			<artifactId>kotlin-stdlib-jdk8</artifactId>
		</dependency>
		<dependency>
			<groupId>com.fasterxml.jackson.module</groupId>
			<artifactId>jackson-module-kotlin</artifactId>
			<version>2.13.0</version>
		</dependency>
		<!-- arrow -->
		<dependency>
			<groupId>io.arrow-kt</groupId>
			<artifactId>arrow-core</artifactId>
			<version>${arrow.version}</version>
		</dependency>
		<!-- base test dependencies -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>io.kotest</groupId>
			<artifactId>kotest-runner-junit5-jvm</artifactId>
			<version>4.6.3</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>io.mockk</groupId>
			<artifactId>mockk</artifactId>
			<version>1.12.0</version>
			<scope>test</scope>
		</dependency>
		<!-- pact provider dependency -->
		<dependency>
			<groupId>au.com.dius.pact.provider</groupId>
			<artifactId>junit5</artifactId>
			<version>4.2.14</version>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
		<testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
			<plugin>
				<groupId>org.jetbrains.kotlin</groupId>
				<artifactId>kotlin-maven-plugin</artifactId>
				<configuration>
					<args>
						<arg>-Xjsr305=strict</arg>
					</args>
					<compilerPlugins>
						<plugin>spring</plugin>
					</compilerPlugins>
				</configuration>
				<dependencies>
					<dependency>
						<groupId>org.jetbrains.kotlin</groupId>
						<artifactId>kotlin-maven-allopen</artifactId>
						<version>${kotlin.version}</version>
					</dependency>
				</dependencies>
			</plugin>
		</plugins>
	</build>

</project>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.5.6</version>
		<relativePath/>
	</parent>
	<groupId>it.chicio.pact.consumer</groupId>
	<artifactId>AccountService</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>AccountService</name>
	<description>Message consumer example</description>
	<properties>
		<java.version>11</java.version>
		<kotlin.version>1.5.31</kotlin.version>
		<arrow.version>1.0.0</arrow.version>
		<pact.version>4.2.14</pact.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>
		<dependency>
			<groupId>org.jetbrains.kotlin</groupId>
			<artifactId>kotlin-reflect</artifactId>
		</dependency>
		<dependency>
			<groupId>org.jetbrains.kotlin</groupId>
			<artifactId>kotlin-stdlib-jdk8</artifactId>
		</dependency>
		<!-- arrow -->
		<dependency>
			<groupId>io.arrow-kt</groupId>
			<artifactId>arrow-core</artifactId>
			<version>${arrow.version}</version>
		</dependency>
		<!-- base test dependencies -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>io.kotest</groupId>
			<artifactId>kotest-runner-junit5-jvm</artifactId>
			<version>4.6.3</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>io.mockk</groupId>
			<artifactId>mockk</artifactId>
			<version>1.12.0</version>
			<scope>test</scope>
		</dependency>
		<!-- pact consumer dependency -->
		<dependency>
			<groupId>au.com.dius.pact.consumer</groupId>
			<artifactId>junit5</artifactId>
			<version>${pact.version}</version>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
		<testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
			<plugin>
				<groupId>org.jetbrains.kotlin</groupId>
				<artifactId>kotlin-maven-plugin</artifactId>
				<configuration>
					<args>
						<arg>-Xjsr305=strict</arg>
					</args>
					<compilerPlugins>
						<plugin>spring</plugin>
					</compilerPlugins>
				</configuration>
				<dependencies>
					<dependency>
						<groupId>org.jetbrains.kotlin</groupId>
						<artifactId>kotlin-maven-allopen</artifactId>
						<version>${kotlin.version}</version>
					</dependency>
				</dependencies>
			</plugin>
			<!-- pact publish plugin -->
			<plugin>
				<groupId>au.com.dius.pact.provider</groupId>
				<artifactId>maven</artifactId>
				<version>${pact.version}</version>
				<configuration>
					<pactBrokerUrl>http://localhost</pactBrokerUrl>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>
```

Now we need to set up our pact broker. For our example we can create a local instance using the docker compose file 
contained in the [pact broker official repo](). Obviously for a real production case you need to host your broker 
somewhere in your enviroment.

....


#### Implementation

….

#### Conclusion

….
