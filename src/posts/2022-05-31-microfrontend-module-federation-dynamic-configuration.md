---
title: "Create a microfrontend app using module federation and dynamic configuration"
description: "We are used to the term microservice in the backend world. Is there a way to achieve the same architectural indipendence in the frontend world? Let's see how it is possible to create a microfrontend app by leveraging Webpack 5 module federation with a widget-based custom remote configuration."
date: 2022-05-31
image: ../images/posts/XXXXX.jpg
tags: [react, web development, architectural pattern]
comments: true 
math: false 
authors: [fabrizio_duroni, alex_stabile, ?luca_mor?]
---

*We are used to the term microservice in the backend world. Is there a way to achieve the same architectural indipendence in the frontend world? Let's see how it is possible to create a microfrontend app by leveraging Webpack 5 module federation with a widget-based custom remote configuration.*

---

As you may already know from [my previous post], in the last weeks I started to work in a new team on a new project at [lm group](https://lmgroup.lastminute.com "lastminute"). The goals we have is to renew the foundations of the company software overall architecture by introducing in the development workflow new technologies. While on the backend we defined a clear path to reach our goal from the beginning (DDD + Axon), on the frontend we still had some doubt. In fact the application we are developing, a new booking cancellation flow, will be integrated in our myarea, an app where the user that manage his/her bookings. We decided to develop this new app with React + Styled Components + Our internal design system, that in lastminute.com is the standard frontend stack (and is in some way already "enough" modern). But there was one problem: coupling between apps.  
The myarea app at the moment already loads some widgets (usually associated to specific features) as npm packages. This packages are developed by different teams/external companies. This basically means:

* that if a team want to deploy a new version of their widget, they have to update the package json of the myarea app, tag and release it.
* there is a coupling between the dependecies of the widgets and of the myarea. This means that you have to keep in sync every dependecy version (eg. do massive React upgrade in every app/widget).

This was unacceptable. We wanted to be independent with our new "cancellation widget", in terms of deployment and dependencies. This why we started to investigate how we can implement a microfrontend architecture for our myarea. What is the microfrontend architecture pattern? 

....spiega microfrontend

...introduci module federation

#### Implementation

....TODO


#### Conclusion


....TODO

