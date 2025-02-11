## ATTENTION: I moved my website to Next.js + Vercel. You can find the new implementation in the [chicio-blog](https://github.com/chicio/chicio-blog "fabrizioduroni.it") repository. I kept this repository as a documentation of the old implmentation.

[![Build](https://github.com/chicio/chicio.github.io/actions/workflows/build.yml/badge.svg)](https://github.com/chicio/chicio.github.io/actions/workflows/build.yml)
[![Test](https://github.com/chicio/chicio.github.io/actions/workflows/test.yml/badge.svg)](https://github.com/chicio/chicio.github.io/actions/workflows/test.yml)
![Release](https://github.com/chicio/chicio.github.io/workflows/Release/badge.svg)
![CodeQL](https://github.com/chicio/chicio.github.io/workflows/CodeQL/badge.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chicio/chicio.github.io/blob/master/LICENSE.md)

<p align="center">
  <a href="https://www.fabrizioduroni.it">
    <img alt="Fabrizio Duroni" src="https://github.com/chicio/chicio.github.io/blob/source/src/images/icon.png?raw=true" width="120" />
  </a>
</p>
<h1 align="center">
  chicio.github.io - www.fabrizioduroni.it
</h1>

My personal website, created using github pages and GatsbyJS.

***

## Installation

To run my website locally you need to install the following software:

- Node
- Gatsby cli (`npm install -g gatsby-cli`)

Then you can use the following commands to run the site in developer mode.

```shell
npm run install
npm start
```

If you want a production version of the website, then run the following commands.

```shell
npm run install
npm run build
npm run serve
```

To deploy a new version in production:

* create and push a new tag (v*.*.*)
* run the deploy script with the following command

```shell
npm run deploy
```

To bumb up dependecies versions use the following command: 

```shell
npx npm-check-updates -u 
```

## Overview

My website has been created for Github Pages using:


* [GatsbyJS](https://www.gatsbyjs.com/) with the following plugins:
    * [gatsby-plugin-image](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/)
    * [gatsby-plugin-google-tag](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/)
    * [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/)
    * [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/)
    * [gatsby-plugin-manifest](https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/)
    * [gatsby-plugin-offline](https://www.gatsbyjs.com/plugins/gatsby-plugin-offline/)
    * [gatsby-plugin-sharp](https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/)
    * [gatsby-transformer-sharp](https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/)
    * [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/)
    * [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/)
        * [gatsby-remark-images](https://www.gatsbyjs.com/plugins/gatsby-remark-images/)
        * [gatsby-remark-emojis](https://www.gatsbyjs.com/plugins/gatsby-remark-emojis/)
        * [gatsby-remark-embed-video](https://www.gatsbyjs.com/plugins/gatsby-remark-embed-video/)
        * [gatsby-remark-katex](https://www.gatsbyjs.com/plugins/gatsby-remark-katex/)
        * [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/)
    * [gatsby-plugin-feed](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/)
    * [gatsby-plugin-catch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)
* [Styled components](https://styled-components.com)
* [TypeScript](https://www.typescriptlang.org) 
* [Jest](https://github.com/facebook/jest) + [React Testing Library](https://github.com/testing-library/react-testing-library)
* [react transition group](https://reactcommunity.org/react-transition-group/)

Go and checkout my [homepage](https://www.fabrizioduroni.it "homepage") and my [blog](https://www.fabrizioduroni.it/blog/ "blog").
