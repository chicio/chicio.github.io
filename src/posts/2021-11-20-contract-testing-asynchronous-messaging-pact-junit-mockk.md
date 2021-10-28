- - - -
title: "Contract testing asynchronous messaging with Pact"
description: "Let’s see how we used pact to test a message-based interaction between two microservices with Pact"
date: 2021-11-20 
image: .._images_posts/XXXX
tags: [test driven development, contract test, pact,]
comments: true 
math: false 
authors: [fabrizio_duroni, XXX]
- - - -

In the last weeks I worked with my colleague XXX on a new feature for our company refund process (as may already know from some of [my previous posts]() in the last 2 years I worked mainly on backend applications). In this new feature we have a messaging-based communication between micro services. The messaging system used is [RabbitMQ](). In the company we are already using [Pact]() to implement contract testing for the classic RESTful interaction between microservices (introduced by XXX). What is contract testing? let’s have a look at the definition from the Pact website.

> Contract tests assert that inter-application messages conform to a shared understanding that is documented in a contract. Without contract testing, the only way to ensure that applications will work correctly together is by using expensive and brittle integration tests.  
> Do you  [set your house on fire to test your smoke alarm?](https://dius.com.au/2014/05/19/simplifying-micro-service-testing-with-pacts/)  No, you test the contract it holds with your ears by using the testing button. Pact provides that testing button for your code, allowing you to safely confirm that your applications will work together without having to deploy the world first.  

So contract testing is a way to ensure that two application communicate correctly by adhering to a contract that describe the API or the message exchanged between them. Cool, isn’t it? 😏 

![contract testing pact](../images/posts/pact-contract-testing.jpg)
(source https://docs.pact.io)

In this post I will show you how we tested a messaging interaction between two microservices using Pact. Let’s go!!! 🚀🚀🚀🚀

#### Implementation

….

#### Conclusion

….
