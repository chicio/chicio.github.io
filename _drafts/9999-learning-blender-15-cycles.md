---
layout: post
title: "Blender tutorial: cycles overview"
description: "In this new post of the series "Blender tutorial" I will talk about Cycles."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---
 
*In this new post of the series "Blender tutorial" I will talk about Cycles rendering engine.*

---

In the [previous post of the series "Blender Tutorial"](TODO) we talked about character rigging. In this post we will 
talk about the Cycles rendering engine. What is exactly Cycles?
Let's see a quote from Blender doc:

> Cycles is Blender’s ray-tracing production render engine.
    
Cycles is a state of the art ray tracing engine built into Blender. We can try to achieve the same level of realism 
of other computer graphics production tools (photorealistic level).  
Let's start by see how we can activate it. From the menu at the top of the 3D window choose *Cycle Render*. When we 
do this operation, the render properties tab will change, as a consequence of the fact that Cycles as other option 
compared to the standard *Blender Render*. One of the most important thing to note is that cycles uses the CPU and 
the GPU of our computer to render our scenes in interactive mode. This basically means that we can see the final 
rendered scene and navigate through it. Wonderful :heart_eyes:!!!

![blender cycles start](/assets/images/posts/blender-cycles-start.jpg "blender cycles start")
 
How do we create material for cycles? We can create a material from the same tab we previously saw. When the cycles 
render is selected the option to customize the material change accordingly. In particular there's a *surface* option 
where we can select from a list of BSDF the type of surface BSDF we want. The other option will change accordingly 
based on this selection. We can also add texture like for standard material. To do that we simply have to go into the
 color option and select the texture we want.

![blender cycles start](/assets/images/posts/blender-cycles-material.jpg "blender cycles start")
 
....
 

That's all my friends. I hope you enjoyed these series of tutorials about Blender.
