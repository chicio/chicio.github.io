---
layout: post
title: "Learning Blender: animation"
description: "In this new post of the series "Learning Blender" I will talk about animations."
date: 2017-11-25
image: TO DO
tags: [computer graphics, blender]
comments: true
seo:
  - type: "BlogPosting"
---
 
*In this new post of the series "Learning Blender" I will talk about animations.*

---

In the [previous post of the series "Learning Blender"](TODO) we talked about camera and rendering options/effects in 
Blender. In this post we will talk about animation. Let's start from the timeline.  
The timeline is usually placed at the bottom of the default layout of Blender. In it you can select a specific frame 
by clicking on it in the timeline. We also have some controls to start/stop/fast back and forward the animation. 
There also the possibility to set a start and end frame of the animation. 

![blender animation timeline](/assets/images/posts/blender-animation-timeline.jpg "blender animation timeline")

To create an animation we need first of all to set keyframes. To do this we have to select the frame that we want as 
keyframe in the timeline, and the go in the space properties panel, change one of the spatial properties we want to 
animate (location, rotation or scale) and right click on them to show a menu where we can select "Insert keyframes". 
After that you will see the value of the property we decided to animate to become yellow (orange in my images below 
because I have a custom theme.).

![blender animation set keyframe 1](/assets/images/posts/blender-animation-set-keyframe-1.jpg "blender animation set keyframe 1")
![blender animation set keyframe 2](/assets/images/posts/blender-animation-set-keyframe-2.jpg "blender animation set keyframe 2")

To make an animation we need at least 2 keyframes. We can set keyframes also by selecting the record button in the 
timeline. This button will let us set a keyframe for the property we select from the list just near it. The keyframes
 are shown on the timeline as a yellow line. 
 
![blender animation set keyframe 3](/assets/images/posts/blender-animation-set-keyframe-3.jpg "blender animation set 
keyframe 3")
 
After settings the second keyframe we finally have our first animation. In the video below you can see the final result.

{% include youtube.html videoId="qTLJL-HF9vY" %}




 
That's all for camera and rendering. In the next post we will talk about animation.