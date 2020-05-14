# chicio.github.io - www.fabrizioduroni.it

![Build](https://github.com/chicio/chicio.github.io/workflows/Build/badge.svg)
![Tests](https://github.com/chicio/chicio.github.io/workflows/Tests/badge.svg)
![Lighthouse](https://github.com/chicio/chicio.github.io/workflows/Lighthouse/badge.svg)
![Release](https://github.com/chicio/chicio.github.io/workflows/Release/badge.svg)
![dependecies](https://img.shields.io/librariesio/github/chicio/chicio.github.io)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chicio/chicio.github.io/blob/master/LICENSE.md)

My personal website, created using github pages.

***

### Installation

To run my website locally you need to install the following software:

- Node
- Ruby
- zsh

After you finished the installation you can do the setup of the local environment by launching the following commands from the root folder of this repo:

```bash
npm run setup
```  

Then you can build and launch my website locally with the following commands from the root folder of this repo:

```bash
npm run build
npm run copy-resources // do this only if you need to update fonts, images and 3D models.
npm run start
```

If you want to build a debug version of the site run the following commands from the root folder of this repo:

```bash
npm run debug
npm run start
```

### Overview

My website is hosted using Github Pages. It contains a bunch of jekyll templates used for home, posts, archive and
tags pages. All blog posts are created using markdown files (thanks Jekyll :grin:). For JS, CSS and assets build I
used gulp as build automation tool. I use rvm and the [pages-gem](https://github.com/github/pages-gem) to setup the github pages environment locally.  
On the homepage you can find also a three.js integration with a physically based scene, to highlight my computer graphics passion.
Soooo what are you waiting for???!! Go and checkout my [homepage](https://www.fabrizioduroni.it "homepage") and my
[blog](https://www.fabrizioduroni.it/blog/ "blog") :stuck_out_tongue_winking_eye:!!.