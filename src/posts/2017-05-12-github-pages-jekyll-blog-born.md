---
title: "Github Pages and Jekyll: chicio coding birth"
description: "So, how was created this blog? Let's go through the development process of its creation. Boring and fun at
the same time."
date: 2017-05-12
image: ../images/authors/fabrizio-duroni.jpg
tags: [web development, github pages, jekyll, node, gulp, bootstrap, threejs, javascript]
comments: true
math: false
authors: [fabrizio_duroni]
---

*So, how I created this blog? Let's go through the development process of its creation. This is yet another blog post
about the creation of a website using Github Pages and Jekyll. But you know, I have to do it.*

---

This will be the first official post of my blog. So, the topic from which I want to start is the development of this
website. This is a *blog post about this blog* (are you serious!? :laughing:). This blog has been built
using [Github Pages](https://pages.github.com "Github Pages"). What exactly are they? Let's see the definition taken
from the github documentation:

> GitHub Pages is designed to host your personal, organization, or project pages directly from a GitHub repository. To learn more about the different types of GitHub Pages sites, see "User, organization, and project pages." You can create and publish GitHub Pages online using the Jekyll Theme Chooser. If you prefer to work locally, you can use GitHub Desktop or the command line. GitHub Pages is a static site hosting service and doesn't support server-side code such as, PHP, Ruby, or Python.

Github Pages supports Jekyll. Also in this case let's see the definition from the documentation:

> Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites.

This seems the perfect combination for a personal site + blog!!!
Let's see what I used to develop this blog:

* Github Pages
* Jekyll
* Node + Gulp as a task/build runner for development
* Bootstrap + Sass for CSS/HTML
* Gsap and Scrollmagic for animation
* Cloudflare as CDN

I also used threejs for the background scene on my [homepage](/ "homepage"). I will talk about it in a different post.
First of all I installed node. Then I created
the [Jekyll basic directory structure](https://jekyllrb.com/docs/structure/
"Jekyll basic directory structure"). Then I run the command:

```shell
npm init
```

to create the package.json (the file that will contain the metadata of my project, including its dependencies).  
Then I installed Gulp:

```shell
npm install --save-dev gulp
```

I decided to use the following gulp libraries to improve my work (using the same command used for Gulp to install them):

* gulp-concat and gulp-uglify to concatenate all my css and js in a style.min.css, index.min.js and vendor.min.js (the
  last one for third party library)
* gulp-sass to compile sass into CSS
* gulp-uglify for minification
* child_process to launch Jekyll along side Gulp, as explained by Aaron Lasseigne on
  his [blog post](https://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/ "Aaron Lasseigne")
* critical to dynamically extract the CSS critical path from the various template, in order to be complaint with the
  Google page speed recommendation.
* browser-sync for live reloading during development
* travis for CI

You can find the complete gulpfile in this [github gist](https://gist.github.com/chicio/ce1b5339fa2f30c0c14fceb3616d60d3).  
As you can see I have two gulp task. I use the first from my local environment during development. The second one is
used by by travis to make a test build on each commit. All the assets created are saved in the assets folder. Jekyll
copies each folder that is not prefix with and underscore. I also installed some gems to improve and automatize some
function of my site:

* jekyll-seo-tag, to automatically create meta and JSON-LD
* jekyll-sitemap, to automatically generate the sitemap
* octopress-minify-html, to minify the HTML
* jekyll-paginate, to support pagination
* jemoji, to support emoji in posts

Each of this gem has its own configuration values in the `_config.yml` or in the front matter using the YAML format.  
With this setup it was easy to develop. To start the development environment I just have to execute the shell command
below.

```shell
gulp
```

This command launch the default gulp task and start to write my HTML/CSS/Javascript code. The website is updated on each
modification and live rendered in the browser (thank you browser-sync :relaxed: ).  
After the implementation, made also some infrastructure setup to customize my github pages website. In particular, I 
added two things:

* I bought a custom domain, fabrizioduroni.it, to substitute the default github pages url for user site ("username"
  .github.io).
* I added CloudFlare CDN in order to:
    * speed up the content loading and reach the 99% score on the Google Pagespeed test
    * add HTTPS and HTTP/2 support

In this way the pages load faster than light :zap:.  
That's it. My website + blog is up and running!!
