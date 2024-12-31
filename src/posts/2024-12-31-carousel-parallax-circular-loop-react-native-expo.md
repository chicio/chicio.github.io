---
title: "Create a circular carousel with parallax effect in React Native"
description: "Let's see how it is possible to create a circular carousel with parallax effect in React Native by 
leveraging the power of React Native Reanimated."
date: 2024-12-30
image: ../images/posts/react-native-parallax-carousel.jpg
tags: [react native, swift, ios, apple, android, java, mobile application development, javascript, typescript, expo]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Let's see how it is possible to create a circular carousel with parallax effect in React Native by
leveraging the power of React Native Reanimated.*

---

Recently, during a one-to-one meeting with my engineering manager, [Luca D'antona](https://www.linkedin.com/in/lucadantona/), 
we discussed some exciting animations we’d like to bring to our mobile apps at [lastminute.com](https://corporate.lastminute.com).
In particular, Luca pointed out how captivating the carousel on the home screen of the official 
[Apple TV app](https://www.apple.com/apple-tv-app/) is.  
This carousel stands out for its stunning parallax animation.
Essentially, as you scroll through the images of TV shows and movies, the images shift based on the scroll position,
adding a dynamic sense of motion to the entire experience. 
In our apps we have been using [React Native](/2018/07/04/react-native-typescript-existing-app/) for quite some 
time, but animations often have a bad reputation within this framework.
Luca challenged the team, asking: “Do you think it’s possible to implement such a cool animation on our daily deals 
carousel? ChatGPT says it should be possible!”.  
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
This component is a `Animated.FlatList` responsible for displaying the items and managing the scroll.
In particular, it has the responsibility to simulate the circular endless loop during the scroll.

```tsx
import {FC} from 'react';
import Animated from 'react-native-reanimated';
import {ParallaxCarouselItemData} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item-data";
import {ParallaxCarouselItem} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item";
import {useCircularCarousel} from "@/parallax-carousel/use-circular-carousel";

export const ParallaxCarousel: FC<{ items: ParallaxCarouselItemData[] }> = ({ items }) => {
    const {
        scrollX,
        flatListRef,
        itemsWithFakeEntries,
        scrollHandler,
        getItemLayout
    } = useCircularCarousel(items);

    return (
        <Animated.FlatList
            ref={flatListRef}
            data={itemsWithFakeEntries}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="normal"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={({item, index}: { item: ParallaxCarouselItemData, index: number }) =>
                <ParallaxCarouselItem index={index} scrollX={scrollX} item={item}/>}
            pagingEnabled
            initialScrollIndex={1}
            getItemLayout={getItemLayout}
            bounces={false}
        />
    );
};
```

How can we do this? From the staring array of `ParallaxCarouselItemData`, we generate a new one where **we add fake 
entries**:

* one element at the beginning of the array, that is a copy of the last element that you can 
  find in 
  the original array.
* one element at the end of the array, that is a copy of the first item in the original array

This new array will be the one used as data source by the `Animated.FlatList`.
Now we can implement a `scrollHandler` using `useAnimatedScrollHandler`, where we put in place a logic for which 
when we reach one of these fake entries we added above, we **scroll without animation** to the corresponding real item.
On top of the circular loop logic we also need to store the `scrollX` offset position into a Reanimated `SharedValue`.
We will use it to implement the parallax and opacity animations.

One final note: to avoid calculation about where we need to "force scroll", we are using the `scrollToIndex` method 
of `FlatList`. This requires implementing also the `getItemLayout` callback for the flatList that gives the ability to the FlatList 
to cache in some way the offset of each item (and perform very fast the `scrolltoIndex` operation).  

```tsx
import {ParallaxCarouselItemData} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item-data";
import Animated, {runOnJS, useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import {useMemo} from "react";
import {Dimensions} from "react-native";

const { width } = Dimensions.get('window');

export const useCircularCarousel = (items: ParallaxCarouselItemData[]) => {
    const scrollX = useSharedValue(0);
    const flatListRef = useAnimatedRef<Animated.FlatList<ParallaxCarouselItemData>>();
    const itemsWithFakeEntries = useMemo(
        () => [items[items.length - 1], ...items, items[0]],
        [items]
    );

    const scrollToIndex = (index: number) => {
        flatListRef.current?.scrollToIndex({ index: index, animated: false });
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: event => {
            const index = Math.round(event.contentOffset.x / width);

            if (index < 1) {
                runOnJS(scrollToIndex)(items.length);
            } else if (index > items.length) {
                runOnJS(scrollToIndex)(1);
            }
        }
    });

    const getItemLayout= (_: ArrayLike<ParallaxCarouselItemData> | null | undefined, index: number) =>
        ({ length: width, offset: width * index, index })

    return {
        scrollX,
        flatListRef,
        itemsWithFakeEntries,
        scrollHandler,
        getItemLayout
    }
}
```

Now that we have our carousel in `FlatList` iin place, we can implement the `ParallaxCarouselItem` component. This 
component receive the `scrollX` offset from the parent, and pass it to the `useParallaxWithOpacityAnimations` hook 
to calculate the animation needed.
In terms strictly of UI, the component is quite straight forward.  
It has an image fullscreen, wrapped by a `Animated.View` that we will use to apply the parallax animation.
A `LinearGradient` is used to add som contrast with the texts at the bottom of the item, created using `Animated.Text` views.  

```tsx
import Animated, {SharedValue} from "react-native-reanimated";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {ParallaxCarouselItemData} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item-data";
import {LinearGradient} from 'expo-linear-gradient';
import {
    useParallaxWithOpacityAnimations
} from "@/parallax-carousel/parallax-carousel-item/use-parallax-with-opacity-animations";

const { width, height } = Dimensions.get('window');

export const ParallaxCarouselItem: FC<{ index: number, scrollX: SharedValue<number>; item: ParallaxCarouselItemData }> = ({ index, scrollX, item }) => {
    const {parallaxAnimatedStyle, opacityAnimatedStyle} = useParallaxWithOpacityAnimations(index, scrollX, width);

    return (
        <View style={styles.itemContainer}>
            <Animated.View style={[styles.imageContainer, parallaxAnimatedStyle]}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </Animated.View>
            <LinearGradient
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#00000000', '#000000CC']}
            >
                <View style={styles.caption}>
                    <Animated.Text style={[opacityAnimatedStyle, styles.title]}>{item.title}</Animated.Text>
                    <Animated.Text style={[opacityAnimatedStyle, styles.description]}>{item.description}</Animated.Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageContainer: {
        width: width,
        height: height,
        overflow: 'hidden',
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    caption: {
        paddingHorizontal: 24,
        position: "absolute",
        bottom: 60,
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: 'white'
    },
    description: {
        fontSize: 18,
        color: 'white',
        fontStyle: 'italic',
        height: 80
    },
    gradient: {
        height: '40%',
        width: '100%',
        marginTop: 'auto'
    }
});
```

So let's see the implementation of `useParallaxWithOpacityAnimations`. In this hook we generate two animated styles 
using the `useAnimatedStyle` reanimated hook.
Both these styles are based on the same `inputRange` that spans between an offset, with respect to the entire 
`FlatList` width, that include the current carousel item, the previous one and the next one.
We use this input range to `interpolate` the `scrollX` current value for two different purposes:

* calculate the `translationX` we want to apply on the items to simulate the parallax effects. This style is the one applied to the items images. In this way the 
  animation is tied to the scroll, and given how we defined the intervals and the `inputRange` (far left, center, 
  far right), when the scroll ends, and we are focusing on an item the parallax effect will be 0, and so the item will 
  be perfectly centered (no parallax).
  It is possible to tweak the `200` (pixel) value used in the output range of `translateX` to increased/decrease the 
  animation (higher, more movement)
* calculate the `opacity` we want to apply to the items text descriptions. The same consideration we made for the 
  `translationX` applies also here (so in this case item centered/scroll ends, `opacity` is equal to 1, so 
  visible/no opacity)

```tsx
import {interpolate, SharedValue, useAnimatedStyle} from "react-native-reanimated";

export const useParallaxWithOpacityAnimations = (
    index: number,
    scrollX: SharedValue<number>,
    width: number
) => {
    const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
    ];

    const parallaxAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: interpolate(scrollX.value, inputRange, [-200, 0, 200])}],
    }));

    const opacityAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollX.value, inputRange, [0, 1, 0])
    }));

    return {
        parallaxAnimatedStyle,
        opacityAnimatedStyle,
    }
}
```

One last note: pay attention to the styles `imageContainer` and `itemContainer`, applied to the `Animated.View` that 
contains the image and to the `View` that contains the carousel item.
Both these rules have `overflow: hidden`.
This is needed because we are moving around the images, and we don't want them to overlap between each other.
We just want the item carousel content to move inside its container, that is basically what a parallax effect is.  

We are now ready to add our `ParallaxCarousel` component to the `RootLayout` of the expo example app, with some test 
data.

```tsx
import {ParallaxCarousel} from "@/parallax-carousel/parallax-carousel";

const items = [
  {
    id: '1',
    image: 'https://static.vecteezy.com/system/resources/previews/012/201/404/non_2x/beautiful-landscape-of-green-tea-plantation-in-the-morning-with-foreground-orange-flowers-2000-tea-plantation-doi-angkhang-mountain-chiangmai-thailand-free-photo.jpg',
    title: 'Morning Serenity',
    description: 'Golden sunlight dances over a lush tea plantation, framed by vibrant orange flowers in the foreground.'
  },
  {
    id: '2',
    image: 'https://d3n8a8pro7vhmx.cloudfront.net/backcountryhunters/pages/10800/attachments/original/1640022886/Arizona_Lake_Mead_National_Recreation_Area_00003.jpg',
    title: 'Desert Oasis',
    description: 'A serene desert lake reflecting the warm hues of the surrounding canyon, an invitation to escape.'
  },
  {
    id: '3',
    image: 'https://kenkoimagingusa.com/cdn/shop/articles/Simple_Landscape_Photography_Tips_With_Tons_of_Impact.jpg?v=1566068838&width=1920',
    title: 'Mountain Majesty',
    description: 'Towering peaks covered in a light mist, standing strong against the backdrop of an endless sky.'
  },
];

export default function RootLayout() {
  return <ParallaxCarousel items={items} />;
}
```

#### Conclusion

You can find the full implementation of what I described above in this [github repo](https://github.com/chicio/React-Native-Parallax-Carousel).
It was quite funny to implement this carousel and the parallax animation.
I hope I can add more animations during my FriYaY to improve our apps UX :heart:.
