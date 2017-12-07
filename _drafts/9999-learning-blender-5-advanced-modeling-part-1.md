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
art 
modeling by starting to analyze Blender advanced modeling tools.  
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

.....subdivision surfaces.....
