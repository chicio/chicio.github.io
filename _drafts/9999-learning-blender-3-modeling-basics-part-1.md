---
layout: post
title: "Learning Blender: introduction to basics of modeling - part 1"
description: "In this new post of the series "Learning Blender" I will talk about the fundamental of modeling in 
Blender."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
 - type: "BlogPosting"
---

*In this new post of the series "Learning Blender" I will talk about the fundamental of modeling in Blender.*

---

In the [previous post of the series "Learning Blender"](TODO) we talked about how we can select and transforms 
objects. In this new post thing will start to get more interesting: we will start to talk about modeling.  
Firs of all let's see which kind of primitives mesh we can create with blender.  
We can start by opening a new file and removing the default cube mesh by selecting it and pressing the "x key". Now 
we are ready to add new primitive meshes. We can do it in two ways:

* from the Tools -> Create menu in the 3D window
* from the Add -> Mesh menu at the bottom of the 3D window, when we are in object or edit mode

Blender support a series of basic primitives, from which we can start modeling more complex meshes:

* plane
* cube
* circle
* UV sphere
* ico sphere
* cylinder
* cone
* torus

When we choose a primitive mesh to be created, it will be placed where the 3D cursor is pointing at the moment of 
creation. After the creation of the mesh, a new panel at the bottom left of the 3D window will be shown. In this 
panel we can customize the properties of the mesh. 

![blender modeling create primitive meshes](/assets/images/posts/blender-modeling-create-primitive-meshes.jpg 
"blender modeling create primitive meshes")

As we said before, we can start from a primitive mesh and model a more complex one. So the first thing we need is to 
able to select vertices, edges and faces. How can we do that? First, we need to choose *edit mode*, by selecting the 
mesh and by choosing it from the editing/interaction mode menu component in the 3D window (or alternately by pressing
 the "tab key"). After that, we can choose the selection mode between vertices, edge or faces in the bottom bar of 
 the 3D window or by pressing "ctrl + tab keys". 
 
![blender select edges faces vertices](/assets/images/posts/blender-select-edges-faces-vertices.jpg 
"blender select edges faces vertices")
 
After selecting the edges, vertices or faces that we want to modify, 3D axis will be shown near your selection. They
 are similar to the ones shown for transformations. By dragging one of these axes the selection will move 
 accordingly to the direction of the dragging.  
 We can improve the selection of edges by pressing "ctrl + alt + right click" while we are in edge selection mode: in
  this way we will be able to select edges loops, a series of connected closed edges series.  
  We can also improve the selection by using the more/less option to select entire levels of edges/vertices/faces.  

![blender modified mesh](/assets/images/posts/blender-modified-mesh.jpg "blender modified mesh")

By selecting individual edges, vertices and faces you can start modeling you meshes. Anyway, sometimes you will need 
to be able to do a more soft modeling than the one we already above in this article. This is evident especially while
 working on organic objects. This is why is it possible to use the *Proportional editing*. When we use the this kind 
 of modeling, the modification on a vertices/edge/face will influence the other element around with a proportional 
 falloff. You can activate the proportional editing using the menu Mesh -> Proportional Editing in edit mode or using
  the dedicated button in the bottom bar of the 3D window.
  
![blender modeling proportional editing](/assets/images/posts/blender-modeling-proportional-editing.jpg 
"blender modeling proportional editing")

Below you can find an example of two meshes modified with and without the proportional editing enable.It's easy to 
see the difference.

![blender modeling proportional editing example](/assets/images/posts/blender-modeling-proportional-editing-example.jpg 
"blender modeling proportional editing example")

In the next post we will continue to talk modeling basics.
