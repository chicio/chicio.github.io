---
layout: post
title: "Learning Blender: light - part 1."
description: "In this new post of the series "Learning Blender" I will talk about light."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---

*In this new post of the series "Learning Blender" I will talk about light.*

---

In the [previous post of the series "Learning Blender"](TODO) we talked about textures in Blender. In this post we 
will explore lights in Blender.  
First of all we need to clarify one thing: lights in Blender are called lamps. So in all menus and option we will 
find that word to identify lights.  
To add a light to our scenes, just use the option Add -> Lamp and select one of the light type available.  Let's add 
for example a simple point light. 

![blender add light](/assets/images/posts/blender-add-light.jpg "blender add light")

We can then customize the light properties using the related tab in the properties panel. In this section you can 
find specific customizable properties for each type of light.
For example for a point light we can customize:

* the falloff of the light, so how the light decrease when you get away from it
* negative, to transform the light so that it will subtract illumination from the scene
* diffuse and specular, so that the light will be used to render only specular or diffuse component of a material
* energy, how much bright the light is
* distance, the maximum light distance at which it will still affect objects

![blender properties point light](/assets/images/posts/blender-point-light.jpg "blender point light")

For the point light (and also some other kind of light) it is possible to enable shadows. To do that we have to 
choose ray shadow in the light properties panel and customize the look and feel of the shadow. Here we can also 
define the number of samples to be used to generate the shadows: the higher the better shadow we obtain (if you 
want to know more about ray tracing shadows, you can read [this article](https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing/implementing-the-raytracing-algorithm)"ray tracing shadow rays"). 
To actually render the shadow, we need also to set the shadow flag enable in the renderer settings properties panel.

![blender shadow enable 1](/assets/images/posts/blender-shadow-enable-1.jpg "blender shadow enable 1")
![blender shadow enable 2](/assets/images/posts/blender-shadow-enable-2.jpg "blender shadow enable 2")

There are other types of lights. 

