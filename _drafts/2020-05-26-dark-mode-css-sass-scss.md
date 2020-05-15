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

First of all I needed to understand how it was possible to detect system appearance setting. It turns our this is really simple thanks to the `prefers-color-scheme` media query. At the moment of this writing this media query is [supported by all the major browsers](https://caniuse.com/#search=prefers-color-scheme). It accepts three values:

* no-preference, indicates that the user has made no preference known to the system (default to light usually)
* light, the user has expressed the preference for a page that has a light theme (dark text on light background).
* dark Indicates that user has expressed the preference for a page that has a dark theme (light text on dark background).

So I needed to define a strategy to write the CSS in a way that he will see the dark theme only if the system appearance is set to dark mode and fallback to the light theme for all the other cases. This is why I chose to define a media query only for the `dark` value of the `prefers-color-scheme` and keep the light theme values defined in the base CSS rules. So all the theme related rules will look like the following CSS code block.

```css
.a-rule {
  background-color: #FFFFFF;
}

@media(prefers-color-scheme: dark) {
  .a-rule {
    background-color: #000000;
  }
}
```

Now in my project I'm using [SASS](https://sass-lang.com/), a language that extends CSS enables you to use things like variables, nested rules, inline imports and more. So I wanted to find a way to write something in which I centralized this logic. In this way I will have a theme section of my sass source code that has the only responsibility to manage the theme for the entire website. This is possible in SASS by using `@mixin` and `@include`!! :heart_eyes: Let's see the definition from the official documentation.

>Mixins allow you to define styles that can be re-used throughout your stylesheet. They are defined using the @mixin at-rule. A mixin’s name can be any Sass identifier, and it can contain any statement other than top-level statements. They can be used to encapsulate styles that can be dropped into a single style rule; they can contain style rules of their own that can be nested in other rules or included at the top level of the stylesheet; or they can just serve to modify variables...Mixins are included into the current context using the @include at-rule, which is written @include <name> or @include <name>(<arguments...>), with the name of the mixin being included.

This is exactly what I need to create my "SASS theme manager". Let's see some code. First of all I defined a list of keys that identify the colors present in my theme.

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
```

Then I created a map that contains the definition of all colors....

......

Below you can find the entire implementation described above.

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
