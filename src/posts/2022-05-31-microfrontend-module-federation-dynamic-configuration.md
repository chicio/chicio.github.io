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

This was unacceptable. We wanted to be independent with our new "cancellation widget", in terms of deployment and dependencies. This why we started to investigate how we can implement a microfrontend architecture for our myarea. What is the microfrontend architecture pattern? Let's see what [micro-frontends.org](https://micro-frontends.org "microfrontend in action website") tells us:

> The term Micro Frontends first came up in ThoughtWorks Technology Radar at the end of 2016. It extends the concepts of micro services to the frontend world. ... The idea behind Micro Frontends is to think about a website or web app as a composition of features which are owned by independent teams. Each team has a distinct area of business or mission it cares about and specialises in. A team is cross functional and develops its features end-to-end, from database to user interface.

The definition is telling us what we already know from the microservice world in the backend: we want to create a frontend application where each team can independently develop and deploy their feature-specific frontend widget/app. Independetly means:

* the apps can have different technology stacks (eg. one app can use React and another one can use Vue as UI framework)
* the apps run in "isolations", they don't need to/they don't have to force the teams to share dependecies between apps
* the apps can be deployed as standalone: so no need to have one app that declare for example the other one as npm dependecy.

There are various way to achive the microfrontend architecture, that usually require a lot of custom work/development and/or the usage of specific frameworks (eg. [single-spa](https://github.com/single-spa/single-spa "single-spa") etc.). With the release of Webpack 5 there is a new game-changer player in the microfrontend world: Module Federation.
What is Module Federation? It is a JavaScript architecture invented by Zack Jackson and Marais Rossouw that is now integrated into Webpack 5 core APIs. Let's read the explanation from Zack about Module Federation:

>A scalable solution to sharing code between independent applications has never been convenient, and near impossible at scale. The closest we had was externals or DLLPlugin, forcing centralized dependency on a external file. It was a hassle to share code, the separate applications were not truly standalone and usually, a limited number of dependencies are shared. Moreover, sharing actual feature code or components between separately bundled applications is unfeasible, unproductive, and unprofitable. ... Module federation allows a JavaScript application to dynamically load code from another application — in the process, sharing dependencies, if an application consuming a federated module does not have a dependency needed by the federated code — Webpack will download the missing dependency from that federated build origin.
Code is shared if it can be, but fallbacks exist in each case. Federated code can always load its dependencies but will attempt to use the consumers’ dependencies before downloading more payload. Less code duplication, dependency sharing just like a monolithic Webpack build.

... completa spiegazione module federation


#### Implementation

....TODO


#### Conclusion


....TODO

