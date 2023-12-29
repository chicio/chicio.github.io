---
title: "A simple react hook to detect scroll direction"
description: "How do you detect scroll direction using React hooks? Let’s find out in this new post."
date: 2022-01-02 
image: ../images/posts/react-hook-scroll-direction.jpg
tags: [react, web development, typescript]
comments: true 
math: false 
authors: [fabrizio_duroni]
---

*How do you detect scroll direction using React hooks? Let’s find out in this new post.*

--- 

In the last year I migrated this blog on [GatsbyJS](https://www.gatsbyjs.com). This basically means that now this blog is powered by [React, a framework I love](https://www.fabrizioduroni.it/2018/07/04/react-native-typescript-existing-app/). In particular, I used only [hooks](https://reactjs.org/docs/hooks-intro.html "react hooks") and functional components. One of the thing I had to do was to detect the scroll direction in order to implement the sticky header with hide on scroll feature that you can find at the top of this page (and everywhere on this website). How can we do this? Searching on the web I found this [well written post on stackoverflow](https://stackoverflow.com/questions/62497110/detect-scroll-direction-in-react-js "react scroll detection") that contains a raw implementation of what I needed. In this blog post I will show you how I evolved that react hook into into a production ready one that you can use to detect the scroll direction in a page.

#### Implementation

Let’s start from defining an enum that will represent the scroll direction. Let’s define it as string, because you know that [enums in typescript are dangerous if you don’t define explicit values](https://www.aaron-powell.com/posts/2020-05-27-the-dangers-of-typescript-enums/ "enum typescript danger") :bomb:. 

```typescript
export enum ScrollDirection {
  up = “up”,
  down = “down”,
}
```

Now we can start to create our hook. We will define it as `useScrollDirection`  function and we will define two thing:

* a `threshold` variable that will be use as threshold: we will detect change in the scroll direction if the user scrolls for at least `100`  pixels up or down
* a `scrollDir` react state defined with the `useState`  hook that will store the current scroll direction. This is what we will return as result from our hook.

After this we will use the `useEffect` hooks, an hook used to [perform side effects in functional components](https://reactjs.org/docs/hooks-effect.html "react hook effect"). Inside it we will define all the scroll detection logic. The `useEffect` hook is invoked without dependencies (the empty array `[]` passed as second parameter). As you may already know this basically means that its behavior will be equivalent to the `componentDidMount`  react class component lifecycle method. This is what we came up so far.

```typescript
import { useEffect, useState } from "react";

export enum ScrollDirection {
  up = “up”,
  down = “down”,
}

export const useScrollDirection = () => {
  const threshold = 100;
  const [scrollDir, setScrollDir] = useState(ScrollDirection.up);

  useEffect(() => {
    // …scroll detection logic
  }, []);

  return scrollDir;
};
```

Now we are ready to write our scroll detection logic. The first thing to do is to save the initial Y scroll position of the window when we execute the hook. We will store in the `previousScrollYPosition` variable. Then we will write some functions:

* `scrolledMoreThanThreshold` is a function that will detect is the user scroll more pixel than the ones defined in the `threshold` variable we defined before. To do this it will basically check that the absolute difference (no sign) between the  `previousScrollYPosition` and the current scroll position received as parameter is greater than `threshold`
* `isScrollingUp` is one of the two core function needed in order to detect the scroll direction. It basically check if the current scroll position is greater that the previous scroll position. We need also to define some **additional checks** needed in order to **to avoid to receive false positive scroll direction** (they will basically avoid scroll direction updates if the user is at the top/bottom of the page and it continues to scroll).
* `updateScrollDirection` is the other core function. It basically uses the previous defined functions to check if the user is scrolling more that the threshold and the scroll direction (using the `isScrollingUp`  function). It then update the `scrollDir`  state and the `previousScrollYPosition` variable if a scroll change has been detected.
* `onScroll`  is a function that attaches the  `updateScrollDirection` function to the `window.requestAnimationFrame` function so that we can calculate our scroll direction in sync with the window refresh frame rate (so if you have a refresh of 60 fps you will receive 60 calls per seconds). In this way we will be sure that our scroll direction calculation will happen after each page render/repaint.

Now we have all the functions we need in order to detect the scroll direction. 
The last thing we need to do is to attach the `onScroll` function to the scroll listener with the `window.addEventListener("scroll", onScroll);` instruction.
Wait…how do we clean/remove the listener? 🤔 Well, the `useEffect` hooks can return a function that will be used to cleanup every resource used in the hook when the component that launched it will be unmounted. 
So the (real 🙇) last thing we need to do is to return the clean up function that will basically call  `window.removeEventListener("scroll", onScroll)`  to remove the listener.
That’s it!!! 🚀🚀🚀 Below you can find the complete hook that you can copy/paste in your application. If you want you can try to go further by parametrizing some of the vaues used inside the hook (eg.: threshold)

```typescript 
import { useEffect, useState } from "react";

export enum ScrollDirection {
  up = “up”,
  down = “down”,
}

export const useScrollDirection = () => {
  const threshold = 100;
  const [scrollDir, setScrollDir] = useState(ScrollDirection.up);

  useEffect(() => {
    let previousScrollYPosition = window.scrollY;

    const scrolledMoreThanThreshold = (currentScrollYPosition: number) =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    const isScrollingUp = (currentScrollYPosition: number) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY;

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition)
          ? ScrollDirection.down
          : ScrollDirection.up;
        setScrollDir(newScrollDirection);
        previousScrollYPosition =
          currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollDir;
};
```

#### Conclusion

Did you enjoy reading my post? If so, support my work by 💞 [starring/funding some of my open source projects](https://github.com/chicio) 💞.
