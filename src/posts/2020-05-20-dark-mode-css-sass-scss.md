---
title: "Add dark mode support on your website with SASS and prefers-color-scheme media query"
description: "Dark mode support has been around for quite some time. Let's see how you can create a light theme and a
dark theme for your website that will be selected automatically based on the user system preference."
date: 2020-05-20
image: ../images/posts/dark-side-dark-mode.jpg
tags: [web development, javascript, pwa]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Dark mode support has been around for quite some time. Let's see how you can create a light theme and a dark theme for
your website that will be selected automatically based on the user system preference.*

---

Dark mode has been around for a while on all the major platforms: macOS, iOS, Android, Microsoft Windows
and [now also Linux](https://itsfoss.com/dark-mode-ubuntu/ "linux dark mode"). Well, aside from the discussion to decide
if [dark mode is better for your eyes of not](https://www.quora.com/Is-dark-mode-light-text-on-a-dark-background-really-better-for-the-eyes)
, it's clear that it gives you a big style improvement on your site.  
So it's a perfect time to add a Dark theme to your website that will be used as soon as your users use dark mode on
their system!!! This is why I decided to add dark mode to this site. Let's see how I did this by leveraging the power of
sass mixins and media queries.

#### Implementation

First of all I needed to understand how it was possible to detect system appearance setting. It turns our this is really
simple thanks to the `prefers-color-scheme` media query. At the moment of this writing this media query
is [supported by all the major browsers](https://caniuse.com/#search=prefers-color-scheme). It accepts three values:

* no-preference, indicates that the user has made no preference known to the system (default to light usually)
* light, the user has expressed the preference for a page that has a light theme (dark text on light background).
* dark Indicates that user has expressed the preference for a page that has a dark theme (light text on dark background)
  .

So I needed to define a strategy to write the CSS in a way that the user will see the dark theme only if the system
appearance is set to dark mode and fallback to the light theme for all the other cases. This is why I chose to define a
media query only for the `dark` value of the `prefers-color-scheme` and keep the light theme values defined in the base
CSS rules. So all the theme related rules will look like the following CSS code block.

```css
.a-rule {
    background-color: #FFFFFF;
}

@media (prefers-color-scheme: dark) {
    .a-rule {
        background-color: #000000;
    }
}
```

In my project I'm using [SASS](https://sass-lang.com/), a language that extends CSS enables you to use things like
variables, nested rules, inline imports and more. So I wanted to find a way to write something in which I centralized
this logic. In this way I will have a theme section in my sass source code that has the only responsibility to manage
the theme for the entire website. This is possible in SASS by using `@mixin` and `@include`!! :heart_eyes: Let's see the
definition from the official documentation.

> Mixins allow you to define styles that can be re-used throughout your stylesheet. They are defined using the `@mixin` at-rule. A mixin’s name can be any Sass identifier, and it can contain any statement other than top-level statements. They can be used to encapsulate styles that can be dropped into a single style rule; they can contain style rules of their own that can be nested in other rules or included at the top level of the stylesheet; or they can just serve to modify variables...Mixins are included into the current context using the `@include` at-rule, which is written `@include <name>` or `@include <name>(<arguments...>)`, with the name of the mixin being included.

This is exactly what I needed to create my "SASS theme manager". Let's see some code. First of all I defined a list of
keys that identify:

* the theme names
* the colors contained in each of my themes.

```scss
$dark-theme: "dark-theme";
$light-theme: "light-theme";

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

Then I created a new variable named `$themes` associated with
a [SASS map](https://sass-lang.com/documentation/values/maps) data structure. This map contains as key the two theme
name variables, `$dark-theme` and `$light-theme`, and the content is again a map with the association between color
names (the variables defined above) and the color HEX value.

```scss
$themes: (
        $light-theme: (
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
          /* ...other color keys with HEX values... */
        ),
        $dark-theme: (
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
          /* ...other color keys with HEX values... */
        )
);
```

Now I was ready to define the `@mixin` needed to apply the themes. We said in the introduction that we will apply the
dark mode based on the `@media (prefers-color-scheme: dark)` media query and we will use the light theme as default (
light theme or no user preference). This basically means that I needed to define a `@mixin` that let us apply a certain
property in both cases. I needed also to be able to eventually apply other property attributes other than the color
based on the current theme selected. For example I had rules for border styling like `border: 1px solid #BDBDBD` where
the color must be picked up from the correct theme based on the rule discussed before. So I
created `@mixin theme($themes, $property, $color, $additionalPropertiesPositionIsFront: false, $additionalProperties: '')`
that accepts the following properties:

* `$property`, the property that we want to change based on the theme selected for the current user
* `$color`, the color name to be picked up. This should be one of the variable seen above
* `$additionalPropertiesPositionIsFront`, a boolean that is used to understand if the additional properties to be
  concatenated with the color values should be placed before or after the color value. This property is optional and has
  a default value of false
* `$additionalProperties`, a string with the list of properties be concatenated with the color value. This property is
  optional and has a default value of empty string.

In this theme mixin I got the dark and light theme values by extracting theme from the `$themes` variable using
the `map-get` [SASS map function](https://sass-lang.com/documentation/modules/map "sass map function"). Then I used
another
mixin `@mixin themeProperty($theme, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties)` to
create the css rule `<property>: <value>` using the values received from the invocation. Inside it I did the
concatenation between the additional properties and the color value (if necessary) using the `+` operator and
the [SASS unquote function](https://sass-lang.com/documentation/modules/string "sass unquote function") to remove the
string quote and have in output from the mixin a standard css rule. The `themeProperty` is invoked two times, one for
the default value with the light time, and another one inside the `@media (prefers-color-scheme: dark)` query. Below you
can find the code of these two new mixin.

```scss
@mixin themeProperty($theme, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties) {
  @if $additionalPropertiesPositionIsFront {
    #{$property}: unquote($additionalProperties + ' ' + map-get($theme, $color));
  } @else {
    #{$property}: unquote(map-get($theme, $color) + ' ' + $additionalProperties);
  }
}

@mixin theme($property, $color, $additionalPropertiesPositionIsFront: false, $additionalProperties: '') {
  $light: map-get($themes, $light-theme);
  $dark: map-get($themes, $dark-theme);

  @include themeProperty($light, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);

  @media (prefers-color-scheme: dark) {
    @include themeProperty($dark, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);
  }
}
```

This is all I needed two generate the CSS rules with the theme selection based on the appearance user preferences. Below
you can find the entire implementation described above (I removed some color names from the list because it is too big
and not so useful).

```scss
$dark-theme: "dark-theme";
$light-theme: "light-theme";

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
/* ...other color keys... */

$themes: (
        $light-theme: (
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
          /* ...other color keys with HEX values... */
        ),
        $dark-theme: (
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
          /* ...other color keys with HEX values... */
        )
);

@mixin themeProperty($theme, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties) {
  @if $additionalPropertiesPositionIsFront {
    #{$property}: unquote($additionalProperties + ' ' + map-get($theme, $color));
  } @else {
    #{$property}: unquote(map-get($theme, $color) + ' ' + $additionalProperties);
  }
}

@mixin theme($property, $color, $additionalPropertiesPositionIsFront: false, $additionalProperties: '') {
  $light: map-get($themes, $light-theme);
  $dark: map-get($themes, $dark-theme);

  @include themeProperty($light, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);

  @media (prefers-color-scheme: dark) {
    @include themeProperty($dark, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);
  }
}
```

With all the stuff above I was ready to "themify" my web site. All I needed to do (and if you read the article until
here you're ready too :smile:) was to call the `theme` mixin in my styles definition in order to apply the theme color
where I needed them. Below you can find an example where I'm setting the text color in a css class.

```scss
.blog-post-meta {
  @include theme('color', $secondary-text-color);
  /*... other rules ...*/
}
```

#### Conclusion

Nowadays it is important to give to the user the best experience when they use your software. Dark mode is another step
in this direction. By leveraging the power of tools like SASS you can implement a theme component in less then a hour.
Sooo now go and join the dark side (of themes). :hearts:
