---
layout: post
title: "Learning Blender: advanced modeling - part 1"
description: "In this new post of the series "Learning Blender" I will talk about advanced modeling in Blender."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
 - type: "BlogPosting"
---

*In this new post of the series "Learning Blender" I will talk about advanced modeling in Blender.*

---

In the In the [previous post of the series "Learning Blender"](TODO) we talked about the basics of modeling in Blender. In this post we will continue to study the 
art modeling by starting to analyze Blender advanced modeling tools.  
Let's start from modifiers. All the operation we saw in the previous modeling post were all "one time operation": 
after we apply them we can't change their properties to modify the result we obtain. Modifiers let us apply 
modification to a mesh that is possible to revert, modify and preview. When we are sure about the result, we can 
apply the modifier to get the mesh modification we want.  
We can apply a modifier by selecting an object (right click on it) and go under the properties panel and clicking the 
wrench icon. Here we can select a modifier from the list "Add modifier".

![blender add modifier](/assets/images/posts/blender-add-modifier.jpg "blender add modifier")

For example let's try to add a simple deform to a cube. After adding it we see our cube deformed. We can than tweak 
the parameters of the deformation as we prefer. Each modifier as its own properties, based of which type of 
modification it applies to the mesh. Anyway there are some common button to:

* show/hide the modifier result during rendering
* show/hide the modifier result in the 3D window
* show/hide the modifier result in the 3D window in Edit mode
* show/hide the cage of the modifier in the 3D window

![blender add modifier icons](/assets/images/posts/blender-add-modifier-icons.jpg "blender add modifier icons")

After that we have the subdivision surface. As stated on Wikipedia, subdivision surface is a technique discovered 
simultaneously by Edwin Catmull and Jim Clark:

> A subdivision surface, in the field of 3D computer graphics, is a method of representing a smooth surface via the 
specification of a coarser piecewise linear polygon mesh. The smooth surface can be calculated from the coarse mesh 
as the limit of recursive subdivision of each polygonal face into smaller faces that better approximate the smooth surface.

This basically means that with subdivision surface we can approximate smoother surfaces starting from another one.  
In Blender we can apply subdivision surface as a modifier.

![blender add subdivision surface](/assets/images/posts/blender-add-subdivision-surface.jpg "blender add subdivision surface")

After the subdivision is applied it is possible to modify the mesh only on the original edges and faces of the mesh. 
In fact this elements will be the only one that we can select from our mesh. 

![blender added subdivision surface](/assets/images/posts/blender-added-subdivision-surface.jpg "blender added subdivision surface")

Another interesting modifier is the Mirror Modifier. It is especially useful when you need to do Symmetric modeling. 
After applying this modifier every operation you made on one side of your mesh will be mirrored on the other side. 
For this reason, especially when you're modeling some character/organic mesh, it is useful to delete one side of the 
mesh and mirror the other one (with all the modification you do). In the option of the modifier you can choose on 
which axis the mirroring must be applied.

![blender mirror modifier](/assets/images/posts/blender-mirror-modifier.jpg "blender mirror modifier")

Another interesting tool the "Loop Cut and Slide". With this option we can add edge loops
 to our mesh. This tool is useful especially when you need to have more mesh polygon to model the mesh details you want.

![blender loop edge and slide](/assets/images/posts/blender-loop-edge-and-slide.jpg "blender loop edge and slide")


