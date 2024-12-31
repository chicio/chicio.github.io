---
title: "Create a circular carousel with parallax effect in React Native"
description: "Let's see how it is possible to create a circular carousel with parallax effect in React Native."
date: 2024-12-30
image: ../images/posts/daily-deals-featured.jpg
tags: [react native, swift, ios, apple, android, java, mobile application development, javascript, typescript, expo]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Let's see how it is possible to create a circular carousel with parallax effect in React Native.*

---

Recently, during a one-to-one meeting with my engineering manager, [Luca D'antona](https://www.linkedin.com/in/lucadantona/), 
we discussed some exciting animations we’d like to bring to our mobile apps at [lastminute.com](https://corporate.lastminute.com).
In particular, Luca pointed out how captivating the carousel on the home screen of the official  
[Apple TV app](https://www.apple.com/apple-tv-app/) is. This carousel stands out for its stunning parallax animation.
Essentially, as you scroll through the images of TV shows/movies, the images shift based on the scroll position,
adding a dynamic sense of motion to the entire experience. 
In our apps we have been using [React Native](/2018/07/04/react-native-typescript-existing-app/) for quite some 
time, but animations often have a bad reputation within this framework.
Luca challenged the team, asking: “Do you think it’s possible to implement such a cool animation on our daily deals carousel? ChatGPT says it should be possible!”
I took this challenge personally because I’m passionate about animations—a natural consequence of my love for 
[computer graphics](/2017/08/25/how-to-calculate-reflection-vector/)).
And here I am today, having successfully implemented the challenge and enhanced our daily deals carousel with this 
new, beautiful parallax effect.  
In this post, I’ll show you how to create a stunning full-screen circular carousel (that you can scroll endlessly) 
with a parallax effect on the images and an opacity animation for the text descriptions of each item. Below, you can 
find a video of the final result. 

`youtube: https://youtu.be/ECjX8bXVXzU`

To develop this carousel we will use:

* Expo
* React Native Reanimated
* Expo Linear Gradient

#### Implementation

Let's start from the implementation of the main carousel component, `ParallaxCarousel`.
This component is the one responsible for displaying the items and managing the scroll.
In particular, it has the responsibility to simulate the circular endless loop during the scroll.  


#### Conclusion

You can find the full implementation of what I described above in this [github repo](https://github.com/chicio/React-Native-Parallax-Carousel).
It was quite funny to implement this carousel and the parallax animation.
I hope I can add more animation during my FriYaY to improve our apps UX :heart:.
