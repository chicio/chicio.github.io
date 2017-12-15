---
  layout: post
title: "Learning Blender: outliner, layers, groups, hierarchies and scenes."
description: "In this new post of the series "Learning Blender" I will talk about outliner, layers, groups, hierarchies and scenes."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---

*In this new post of the series "Learning Blender" I will talk about outliner, layers, groups, hierarchies and scenes.*

---

In the [previous post of the series "Learning Blender"](TODO) we talked about advanced modeling in Blender. In this post
 we will continue to explore the capabilities of Blender by analyzing outliner, layers, groups, hierarchies and 
 scenes.  
Let's start from the outliner. This one contains the complete list of the objects contained in the scene. Each on of 
them is represented with its material and geometry. It is possible to rename a mesh by right clicking on it and 
choosing rename. At the right of each mesh we have the restriction column. In it we have 3 buttons:

* the first button let us hide meshes in the 3D window
* the second button let us set a mesh as not selectable
* the third button let us hide meshes from the final renderer

![blender outliner](/assets/images/posts/blender-outliner.jpg "blender outliner")

Now let's talk about layers. We can find the layer panel at the bottom of the 3D window. Each layer is represented 
with a button similar to a checkbox. We can turn on/off a layer by clicking on their corresponding button. We can add
 a mesh to a specific layer by selecting the layer and creating the mesh we want (primitive or import it). We can 
 also move layer by using the "m key" shortcut or by using the menu Object -> Move to layer.
 
![blender layers](/assets/images/posts/blender-layers.jpg "blender layers")
 
Another way to organize our objects is by using groups. With groups you can select multiple objects at once. We can 
create groups and add an object to an existing group by using the menu in the property panel or by using the "ctrl + g
 keys" shortcut. 
 
![blender group](/assets/images/posts/blender-layers.jpg "blender group")


After layers and group we have scenes. Scenes allow us to create different set of our objects or new set with new 
object inside our project. We can create and manage scenes by using the outliner and the ad hoc menu at the top of 
the 3D window. We can create scenes that:

* are linked together: this means that a modification to one mesh in a scenes will be reflected also in the other.
* separated scene: this means that a modification to one mesh in a scenes will NOT be reflected also in the other.
