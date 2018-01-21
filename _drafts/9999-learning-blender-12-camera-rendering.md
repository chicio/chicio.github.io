---
layout: post
title: "Learning Blender: camera and rendering"
description: "In this new post of the series "Learning Blender" I will talk about camera and rendering."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---

*In this new post of the series "Learning Blender" I will talk about camera and rendering.*

---

In the [previous post of the series "Learning Blender"](TODO) we talked about light in Blender. In this post we 
will talk about camera and rendering. Let's start from camera.  
If we select a camera, we can access its properties from the specific camera tab in the properties panel. Here we 
have a section called "Display", that let us customize how we see the camera in the viewport (limits, names and so 
on). Then we have a "Lens" section, where we can choose the type of the camera:

* orthogonal
* perspective
* panoramic

For the perspective camera we can change:

* the focal length
* the shift, so as the word say we can change the shift of the camera from its center
* the clipping, the start end distance between which the object see by the camera will be rendered.

For the orthographic camera the most important parameter is the orthographic scale, that represent the maximum 
dimension (in scene units) of the portion of space captured from the camera.

![blender camera options](/assets/images/posts/blender-camera-options.jpg "blender camera options")

We can place cameras manually or we can use constraints. We can create a constraint by clicking the specific 
constraint tab (the one with the chain as icon) in the properties panel of the camera and add a new constraint. We 
can use for example a Damped Track and correlate the movement of our camera to the position of an object we select as
 the one to be tracked.
 
![blender camera constraints](/assets/images/posts/blender-camera-constraints.jpg "blender camera constraints")

For what concerns rendering, we have the possibility to control it in the properties panel under the render tab (the 
one with the camera). For example we can customize where the render will happen. By default the render will show the 
result in the image editor, but we can change it by selecting one of the available option in the list. We can change 
the dimensions of the render result in terms of width/height but also in terms of FPS (we will see why this parameter
 is important in a future post about animations). We can also customize the algorithm used for anti aliasing. Very 
 important, we can also customize the shading option (as we already see in a previous post about shadows), the 
 performance (for example by adjusting the number of thread that Blender will be allowed to use), and the format of 
 final output of the rendering.
 
![blender render option](/assets/images/posts/blender-render-option.jpg "blender render option")

.....

