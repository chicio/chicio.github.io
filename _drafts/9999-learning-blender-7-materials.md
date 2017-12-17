---
  layout: post
title: "Learning Blender: materials."
description: "In this new post of the series "Learning Blender" I will talk about materials."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---

*In this new post of the series "Learning Blender" I will talk about materials*

---

In the [previous post of the series "Learning Blender"](TODO) we talked about the outliner, layers, groups and 
hierarchies in Blender. In this post we will start some details to our models by learning how to use materials.  
To set a material on an object we can select the material tab from the properties panel, and the press the new button.

![blender create material](/assets/images/posts/blender-create-material.jpg "blender create material")

After creating we material a new list of option to customize it appears. We have the possibility to change the 
material's name. We can select the material type. The available options are: 

* Surface, render object as a surface
* Wire, render the edges of faces as wires
* Volume, render object as a volume
* Halo, render object as halo particles

Most of the time (9/10 times) we will use the surface types. The other are for special effects we will see in the 
future. The we have other options to customize the main components of the material. The definition given below of this 
components are from an artist point of view. If your're interested in some deeper details on the computer graphics 
side, you can have a look at [this documentation](http://graphics.cs.cmu.edu/nsp/course/15-462/Spring04/slides/07-lighting.pdf "Lighting computer graphics")
(on the web you can find plenty of resources about this topic). So the main material components are:

* diffuse, the main color of the objects 
* specular, that define the highlights
* shading, that defines the type light emission of the material, the ambient component that empirically models the 
result of indirect lighting and other options (that we will see in details later)
* transparency
* mirror
* subsurface scattering, to model material in which light will enter on a point of the surface and will exit from 
another one. This component is useful to model translucency effects.
* strand, to model hair particles
* shadows
* other options

![blender material panel](/assets/images/posts/blender-material-panel.jpg "blender material panel")

We can assign multiple material to the same objects. To do it we just need to :

* add a new material slot using the plus button
* select (in edit mode) the part of the object to which we want to apply the material and click the assign button 

![blender multiple material](/assets/images/posts/blender-multiple-material.jpg "blender multiple material")

Now let's star to have a deeper look at the diffuse component. As we said before, the diffuse component defines the 
main color of our object. The default shader applied to it is the lambert shader. Lambertian is an ideal diffuse 
reflection that ideally reflect equally the light in all direction. We have also the possibility to choose one of the
 other shaders:
 
 * Oren-Nayar, a shader that models also the roughness of the surface
 * Toon shading, a shader with hard light cutting off 
 * Minnaert, a shader with rim-light effects (useful when you need this effects but you don't wont to place a
  light behind the object)
 * Fresnel, a shader that also inverts specularity of the objects.
 
 All the diffuse shader types have an intensity parameter to adjust their contribution to the final look of the objects.

![blender material diffuse component](/assets/images/posts/blender-material-diffuse-component.jpg "blender material diffuse component")


...specular