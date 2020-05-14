---
layout: post
title: "Dark mode support on your website with SASS"
description: "Dark mode support has been around for quite some time. Let's see how you can create a light theme and a dark theme for your website that will be used based on the Operating System preference."
date: 2020-05-26
image: /assets/images/posts/XXX
tags: [computer graphics]
comments: true
math: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*Dark mode support has been around for quite some time. Let's see how you can create a light theme and a dark theme for your website that will be used based on the Operating System preference.*

---

Dark mode has been around for a while on all the major platforms: macOS, iOS, Android, Microsoft Windows and [now also Linux](https://itsfoss.com/dark-mode-ubuntu/ "linux dark mode"). Well, aside from the discussion  to decide if [dark mode is better for your eyes of not](https://www.quora.com/Is-dark-mode-light-text-on-a-dark-background-really-better-for-the-eyes), it's clear that it gives you a big style improvement on your site.  
So it's a perfect time to add a Dark theme to your website that will be used as soon as your users use dark mode on their system!!! This is why I decided to add dark mode to this site. Let's see how I did this by leveraging the power of sass mixins and media queries.

#### Implementation

.....

```scss
$primary-color-dark: "primary-color-dark"; 
$primary-color: "primary-color"; 
$primary-color-light: "primary-color-light"; 
$primary-color-text: "primary-color-text"; 
$accent-color: "accent-color"; 
$primary-text-color: "primary-text-color"; 
$secondary-text-color: "secondary-text-color";
$divider-color: "divider-color";
$general-background: "general-background";
$general-background-light: "general-background-light";
/* ...other color variable strings... */

$themes: (
  light: (
    $primary-color-dark: #303F9F,
    $primary-color: #3F51B5,
    $primary-color-light: #DFDFF1,
    $primary-color-text: #FFFFFF,
    $accent-color: #0F67FF,
    $primary-text-color: #151515,
    $secondary-text-color: #575757,
    $divider-color: #BDBDBD,
    $general-background: #FAFAFA,
    $general-background-light: #FFFFFF,
    /* ...other association <color variable strings: color>... */
  ),
  dark: (
    $primary-color-dark: #303F9F,
    $primary-color: #3F51B5,
    $primary-color-light: #DFDFF1,
    $primary-color-text: #FFFFFF,
    $accent-color: #4fA7ff,
    $primary-text-color: #d7d7d8,
    $secondary-text-color: #A6A6A6,
    $divider-color: #575757,
    $general-background: #181918,
    $general-background-light: #363636,
    /* ...other association <color variable strings: color>... */
  )
);

@mixin themeProperty($theme, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties) {
  @if $additionalPropertiesPositionIsFront {
    #{$property}: unquote($additionalProperties + ' ' + map-get($theme, $color));    
  } @else { 
    #{$property}: unquote(map-get($theme, $color) + ' ' + $additionalProperties);
  }
}

@mixin theme($themes, $property, $color, $additionalPropertiesPositionIsFront: false, $additionalProperties: '') {
  $light: map-get($themes, 'light');
  $dark: map-get($themes, 'dark');
  
  @include themeProperty($light, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);

  @media (prefers-color-scheme: dark) {
    @include themeProperty($dark, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);
  }
}
```
