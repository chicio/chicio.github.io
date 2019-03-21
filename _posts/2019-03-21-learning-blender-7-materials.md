---
layout: post
title: "Learning Blender: materials"
description: "In this new post of the series "Learning Blender" I will talk about materials."
date: 2019-03-21
image: /assets/images/posts/blender-create-material.jpg
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this new post of the series "Learning Blender" I will talk about materials.*

---

In the [previous post of the series "Learning Blender"](/2018/10/18/blender-tutorial-6-outliner-layers-groups-hierarchies-scenes.html) we talked about the outliner, layers, groups and 
hierarchies in Blender. In this post we will start to add some details to our models by learning how to use **materials**.  
To set a material on an object we can select the material tab from the properties panel, and the press the new button.

![blender create material](/assets/images/posts/blender-create-material.jpg "blender create material")

After creating we material a new list of option to customize it appears. We have the possibility to change the material's name. We can select the material type. The available options are:

* *Surface*, render object as a surface
* *Wire*, render the edges of faces as wires
* *Volume*, render object as a volume
* *Halo*, render object as halo particles

Most of the time (9/10 times) we will use the surface types. The other are for special effects we will see in the future. Then we have other options to customize the main components of the material. The definitions given below of these components are from an artist point of view. If your're interested in some deeper details on the computer graphics side, you can have a look at [this documentation](https://www.cs.uic.edu/~jbell/CourseNotes/ComputerGraphics/LightingAndShading.html "Lighting computer graphics")
(on the web you can find plenty of resources about this topic). So the main material components are:

* *diffuse*, the main color of the objects
* *specular*, that define the highlights
* *shading*, that defines the type light emission of the material, the ambient component that empirically models the 
result of indirect lighting and other options (that we will see in details later)
* *transparency*
* *mirror*
* *subsurface scattering*, to model material in which light will enter on a point of the surface and will exit from 
another one. This component is useful to model translucency effects.
* *strand*, to model hair particles
* *shadows*
* *other options*

![blender material panel](/assets/images/posts/blender-material-panel.jpg "blender material panel")

We can assign multiple material to the same objects. To do it we just need to :

* add a new material slot using the plus button
* select (in edit mode) the part of the object to which we want to apply the material and click the assign button 

![blender multiple material](/assets/images/posts/blender-multiple-material.jpg "blender multiple material")

Now let's star to have a deeper look at the **diffuse component**. As we said before, the diffuse component defines the 
main color of our object. The default shader applied to it is the lambert shader. Lambertian is an ideal diffuse 
reflection that ideally reflect equally the light in all direction. We have also the possibility to choose one of the
 other shaders:

 * *Oren-Nayar*, a shader that models also the roughness of the surface
 * *Toon shading*, a shader with hard light cutting off 
 * *Minnaert*, a shader with rim-light effects (useful when you need this effects but you don't wont to place a
  light behind the object)
 * *Fresnel*, a shader that also inverts specularity of the objects.

 All the diffuse shader types have an intensity parameter to adjust their contribution to the final look of the objects.

![blender material diffuse component](/assets/images/posts/blender-material-diffuse-component.jpg "blender material diffuse component")

After the diffuse component there's the **specular component**. This component is used to represent the 
highlights/shininess of the surface. We can select the color as for the diffuse shader. We also have again a 
intensity parameter to tweak the contribution of the specular component to the final material appearance. There's a 
list of shader we can choose from:

* *cook-torrance*
* *phong*
* *blinn-phong*
* *toon*
* *wardiso*

![blender material specular component](/assets/images/posts/blender-material-specular-component.jpg "blender material specular component")

For both the diffuse and specular component we have also the **ramp option**. With this option it is possible to apply gradient on the surface. The ramp option could be useful to add a little bit more pop to the material final look. The starting values for ramp contains two color, but we can add as many intermediate points as we want.

![blender material ramp](/assets/images/posts/blender-material-ramp.jpg "blender material ramp")

We have also some shading option that we can use to set other to surface components. In particular we can set the ambient and emit components using the slider contained in this section. We can also completely turn off the shader by
 using the shadeless option, or using the tangent shading option to create tangent specular highlights.

![blender shading options](/assets/images/posts/blender-shading-options.jpg "blender shading options")

Now we will take a look at how we can create **reflective material**. To create a reflective material we can activate the
 Mirror component. We have some options to customize the final result of our reflection:

* *reflectivity*, that let us customize the amount of reflection
* *fresnel*, that let us customize the amount of reflection at grazing incidence
* *depth*, the maximum number of reflection bounce
* *max dist*, the maximum distance of object to be reflected
* *gloss*, to setup a glossy reflection effect

Remember that the mirror material result is visible only in the final render view.

![blender reflection](/assets/images/posts/blender-reflection.jpg "blender reflection")

After mirror material we can take a look at the **transparency component**. To make a transparent material we have to 
activate this component. There are 3 option:

* *z transparency*, a simple transparency without refraction or any other sort of realistic features
* *mask*, a simple masks for the Background. It uses the alpha channel to mix the color of each pixel on the active 
object plane with the color of the corresponding background pixel, according to the alpha channel of the pixel
* *raytrace*, a realistic transparency configurable with Index Of Refraction (IOR) and other parameters.

![blender transparency](/assets/images/posts/blender-transparency.jpg "blender transparency")

Last but not least we have **subsurface scattering**. As reported on [wikipedia](https://en.wikipedia.org/wiki/Subsurface_scattering "Subsurface scattering"):

> Subsurface scattering is a mechanism of light transport in which light penetrates the surface of a translucent object, is scattered by interacting with the material, and exits the surface at a different point

We have some parameter to modify the final result of this component:

* *index of refraction*
* *scale*, to determine how deep the light goes
* *rgb radius*, that is a color used to blur
* *scattering weights*, to tweak if the effects it is more on front then on the back
* *blend*

![blender subsurface scattering](/assets/images/posts/blender-subsurface-scattering.jpg "blender subsurface scattering")

In the next post we will talk about textures.