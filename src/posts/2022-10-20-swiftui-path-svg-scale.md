---
title: "Use SwiftUI Path and Shape to render you svg files: a practical example"
description: "Let's have some fun with SwiftUI by drawing an inspiration title component leveraging Path and Shape."
date: 2022-10-20
image: ../images/posts/swiftui-path.jpg
tags: [swift, swiftui, ios, apple, mobile application development]
comments: true 
math: true 
authors: [fabrizio_duroni, marco_delucchi]
---

*Let's have some fun with SwiftUI by drawing an inspiration title component leveraging Path and Shape.*

---

As you may already know, at [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group") we have 
[Friyay instead of Friday](https://technology.lastminute.com/tech-learning-and-development-friyay/ "lastminute.com 
learning"). In the Friyay everyone can learn and improve his/her skill on any subject. In particular, as you seen 
from one of my [previous post](/2022/06/06/microfrontend-module-federation-dynamic-configuration/ "module 
federation"), I spent some Friday mornings putting in place the first microfrontend architecture for the customer 
area of lastminute.com websites (while also trying to master/study in deep some other topics).  
In the last weeks I started a new Friyay "secret" project with my colleague 
[Marco De Lucchi](https://www.linkedin.com/in/marcodelucchi/). As you may already remember [I already worked with 
Marco](/2020/01/18/react-native-activate-hermes/) in the past when I was part of the mobile app team. In this secret 
project we are developing something new for our mobile app 
using [SwiftUI](https://developer.apple.com/xcode/swiftui/ "swiftui"). We had various challenges to overcome. 
One of this has been to be able to display a cool inspirational title like the following one.

![swiftui path shapes](../images/posts/swiftui-path.jpg "swiftui path shapes")

The easiest way to go could be to simply include in the target bundle the localized version of an assets that 
represent the title above. This is easily achievable using 
[Xcode localized assets](https://developer.apple.com/documentation/xcode/localizing-assets-in-a-catalog "xcode 
localized assets"). But given that we were already having fun with SwiftUI (remember, it is a Friyay project 
:laughing:) and that we want to save bytes on the bundle size (that is always important), we decided to be bold and 
try to implement the title in the screenshot above using only code (no assets).  
So in this post we will show you our own personal journey into the world of SwiftUI `Path` and `Shape` and how we 
have been able to create the inspirational title in the screenshot above using only code. Let's go!! :rocket:

#### Implementation

...


... link reference affine transform + homogeneous coordinates 
https://people.cs.clemson.edu/~dhouse/courses/401/notes/affines-matrices.pdf

$$
\begin{bmatrix}
S_{x} & 0 & 0 \\
0 & S_{y} & 0 \\
0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
1 \\
\end{bmatrix}
=
\begin{bmatrix}
x \cdot S_{x}\\
y \cdot S_{y} \\
1 \\
\end{bmatrix}
$$

#### Conclusion

In this [github repository](https://github.com/chicio/Path-Example "swiftui path example") you can find the 
implementation fo the example described above. I cannot wait to share with you the entire project where we used 
the implementation above. Stay tuned! :ear: :rocket:
