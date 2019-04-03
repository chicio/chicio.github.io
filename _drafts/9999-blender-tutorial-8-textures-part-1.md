---
layout: post
title: "Blender tutorial: textures - part 1."
description: "In this new post of the series Blender tutorial I will talk about textures."
date: 2017-11-25
image: /assets/images/posts/blender-create-texture.jpg
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---

*In this new post of the series Blender tutorial I will talk about textures.*

---

In the [previous post of the series "Blender tutorial"](TODO) we talked about materials in Blender. In this post we 
will start to learn how to use textures.  
As you may already know, textures are useful to add realism to a material. We can manage textures from the texture 
tab inside the properties panel. From that panel we can create a new texture by clicking on the + button. After 
creating a new texture, some options are displayed that let us customize how the texture looks like. The type of 
texture we select changes the options displayed: there will be a specific section of properties for the type we 
choose.

{% include blog-lazy-image.html description="blender create texture" src="/assets/images/posts/blender-create-texture.jpg" %}
  
In the various section of the texture panel we have the "influence section". This section is very important because 
it let us customize how the texture will affect the final material. This means that we can use textures to change not
 only the final color of the material but also the shading components, geometry, specular highlight and so on.

{% include blog-lazy-image.html description="blender texture influence" src="/assets/images/posts/blender-texture-influence.jpg" %}

To add the image to be used as texture we have to select the type "Image or movie". After that we can scroll in the 
option of the texture to the Image section and we can choose between create a new image or open an existing one. 

{% include blog-lazy-image.html description="blender texture add image" src="/assets/images/posts/blender-texture-add-image.jpg" %}

After that we need to define the mapping of the texture on the surface. We can find this section by scrolling down in
 the texture tab. The most important option here is "Coordinates". This option let us define the mapping of 
 texture coordinates on the image. By default is set to generated, that means that the coordinates are generated by 
 blender for the defaults primitives. Then there's the UV option, that maps to coordinates baked into the object. 

{% include blog-lazy-image.html description="blender texture choose mapping" src="/assets/images/posts/blender-texture-choose-mapping.jpg" %}

Remember that after an images has been selected as texture, it will not be shown in the 3D window if we choose the 
texture visualization unless we load it in the UV editor. To do it choose UV editing layout and load the texture 
using the open button.

{% include blog-lazy-image.html description="blender texture uv load image for 3d view" src="/assets/images/posts/blender-texture-uv-load-image-for-3d-view.jpg" %}

The UV editor is the main tool to work with texture. By using it we can precisely apply a texture to an object using 
the unwrap texture tools. To do this we need first to define seams. Seams (as in sewing) are where the ends of a mesh
 are sewn together. Blender uses seams to understand where to unwrap the mesh. We can defines seams by selecting the 
 edges we want to mark and use the menu Mesh -> Edges -> Mark Seams. We can recognized seams as they are reported as 
 red lines in the 3D window.

{% include blog-lazy-image.html description="blender texture mark seams" src="/assets/images/posts/blender-texture-mark-seams.jpg" %}

The we can unwrap the mesh by just selecting Mesh -> UV unwrap -> Unwrap. After that we can scale, translate and 
rotate the unwrapped mesh to fit into the texture. After that we will finally see the texture on our mesh.

{% include blog-lazy-image.html description="blender texture unwrap 1" src="/assets/images/posts/blender-texture-unwrap-1.jpg" %}
{% include blog-lazy-image.html description="blender texture unwrap 2" src="/assets/images/posts/blender-texture-unwrap-2.jpg" %}

We can also create projection mapping using the UV projection. This basically means projecting a sphere, cylinder or 
a cube onto our project to get some rough mapping that we can tweak later. We can find UV projection under Mesh -> UV
 Unwrap -> <Sphere/Cylinder/Cube> projection. 

{% include blog-lazy-image.html description="blender uv projection" src="/assets/images/posts/blender-uv-projection.jpg" %}

In the next post we will talk about other textures technique available in Blender.