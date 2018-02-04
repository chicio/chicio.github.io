---
layout: post
title: "Learning Blender: armatures and character rigging"
description: "In this new post of the series "Learning Blender" I will talk about animations."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---
 
*In this new post of the series "Blender tutorial" I will talk about animations.*

---

In the [previous post of the series "Learning Blender"](TODO) we talked about animation. In this post we will talk 
about armatures and character rigging.  
Let's start from armatures. Armatures are composed of bones. We can create bones by selecting *Add -> Armature -> 
Single Bone*. Every bone is compose of:

* a base
* a body 
* a tip

By selecting the body we can move the entire bone into a new position. By selecting the base or the tip we can 
move just one of the end of the bone. When a bone is selected two new tab becomes available in the properties panel:

* the armature tab
* the bone tab

Let's see the armature tab first. First we have a the display options, to manage how the bone is displayed. We can 
also show the name, the color and more important we can activate the X-Ray mode that let us see the bone through the 
character.
  
![blender bones](/assets/images/posts/blender-bones.jpg "blender bones")
  
To create a complete armature we have some tools similar to the one we previously seen for modeling. After selecting 
edit mode, in the left panel of the 3D window we have the options extrude and subdivide that let us create a complete
 skeleton for a character. In the scene we will find our armature object with all the bones connected.

![blender armature](/assets/images/posts/blender-armature.jpg "blender armature")




That's all for animation. In the next post we will try to create about character rigging.
