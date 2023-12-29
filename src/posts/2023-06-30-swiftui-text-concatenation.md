---
title: "SwiftUI and the Text concatenations super powers"
description: "Do you need a way to compose beautiful text with images and custom font like you are used with 
Attributed String. The Text component has everything we need to create some sort of 'attributed text' directly in SwiftUI. Let's go!!!"
date: 2023-06-12
image: ../images/posts/swiftui-five-stars.png
tags: [swift, swiftui, ios, apple, mobile-application-development]
comments: true
math: false
authors: [fabrizio_duroni, marco_de_lucchi]
---

*Do you need a way to compose beautiful text with images and custom font like you are used with
Attributed String. The Text component has everything we need to create some sort of 'attributed text' directly in SwiftUI. Let's go!!!*

---

In some recent posts (have a look [here](https://technology.lastminute.com/widget-ios-swiftui-configuration-intent/ "swiftui widget friyay lastminute") and [here](https://technology.lastminute.com/widget-ios-swiftui-react-native/ "swiftui widget lastminute") ) we show a beautfiul project me and Marco are creating during our [Friyay at lastminute.com](https://technology.lastminute.com/tech-learning-and-development-friyay/ "lastminute.com friyay"): some widgets for our iOS apps.
For the second widget we developed, one that will show to our users their bookings information, we faced a challenge to display the information of hotels.  
Our mobile app designer [Rafael de Sena Martinez](https://www.linkedin.com/in/raffaelmartinez/ "Rafael Martinez 
lastminute.com") asked us to display the hotel name and the hotel rating as if it was a single text, with the rating 
represented by a number of stars matching the rating itself.

![The layout of the hotel widget](../images/posts/swiftui-hotel-layout.png)

From iOS 15 the `Text` supports the new `AttributedString` from the `Foundation` framework as a parameter. But... given that the ne AttributedString are not always [easy to use](https://stackoverflow.com/questions/75513158/how-do-you-add-an-image-attachment-to-an-attributedstring) and we wanted a more "SwiftUI native" way to create our custom text, we wondered if there was another way to do our implementation.  
Luckily we discovered that in SwiftUI the `+` is overloaded and does some incredible magic :crystal_ball:. It 
basically concatenates each `Text` content while keeping each own specific formatting :scream:. It's like having 
Attributed Strings directly implemented in SwiftUI :rocket:.  
After this discovery, we were ready to implement our own custom layout above. So let's no longer wait and jump into the implementation right now!!! :rocket:


#### Implementation

All our texts uses a custom font called [Ubuntu](https://fonts.google.com/specimen/Ubuntu "ubuntu font"), so first we had to find a way to apply this custom font to all the `Text` views in our code in a smart way (without reappying the entire `font` modifier every time).  
The overloaded `+` operator we discussed in the introduction is targeted on `Text` instances. This means that:

* if we create a custom modifier to apply the custom font, it should return a `Text` instance and not the opaque data type `some View`
* all the standard SwiftUI modifier applied to the concatenated `Text`s should be the one that return again `Text` instance, not the opaque data type `some View`

This is why we decided to create an extension of `Text` that applies our custom font.

```swift
enum TextWeight: String {
  case normal = "Ubuntu-Regular"
  case bold = "Ubuntu-Bold"
}

extension Text {
  func ubuntu(
    size: Double = 14.0,
    color: Color = Color("TextColorGray"),
    weight: TextWeight = TextWeight.normal
  ) -> Text {
    self
      .font(Font.custom(weight.rawValue, size: size))
      .foregroundColor(color)
  }
}
```

Now we were ready to create our custom layout. In order to create it we needed to create a new SwiftUI view that contains the name and the ratings stars. We named it `HotelNameWithStars`. This new view receive as parameters:

* the name of the hotel as a `String`
* the rating of the hotel as an `Int`

Obviously the text is separated in 2 parts: 

* the name, a dark grey text with font size 14 and font weight bold
* the rating stars, a yellow sequence of stars icons with font size 14

For the name, it was easy, we just create a Text instance that contains the hotel name and a space (to separate it from the stars). We put it in a function named `formattedName`.

``` swift
  //... other code

  private func formattedName() -> Text {
    return Text("\(name) ").ubuntu(size: 14.0, weight: TextWeight.bold)
  }

  //... other code
```

For the stars it was a little bit trickier. We needed to generate a text that contains a number of stars matching the rating. The star itself was a custom image in our bundle assets. We basically needed to "loop over the rating" and generate an instance of `Text`containing the yellow stars. Which is in functional programming the high order function that given a sequence of data structure and a combining operationg gives you a return value of a new type? Reduce :heart:.
So what we did:

* we created a `Range` data structure using the rating as upper bound
* we applied reduce to this range, combining the current accumulated stars as text with a new one, to which we applied also the custom formatting described above.

``` swift
  //... other code

  private func formattedStars() -> Text {
    return (0..<rating).reduce(Text("")) { toBeDisplayed, _ in
      toBeDisplayed + Text(Image("icon_star")).foregroundColor(Color.yellow).ubuntu(size: 14.0)
    }
  }

  //... other code
```

Now we were ready to combine all our `Text`s together. Obviously after combining multiple `Text`s, you can apply additional modifiers to obtained text. These modifier will be applied to the entire string content. In our case we needed to set the `lineLimit` to 3 and the `lineSpacing`.
We also have an addition `fixedSize` modifier that we need to tell to the component where this will be used that the text should not be truncated vertical.  
That's it. Below you can find the complete implementation.


```swift
fileprivate struct HotelNameWithStars: View {
  let name: String
  let rating: Int
  
  var body: some View {
    (formattedName() + formattedStars())
    .lineLimit(3)
    .lineSpacing(3)
    .fixedSize(horizontal: false, vertical: true)
  }
  
  private func formattedName() -> Text {
    return Text("\(name) ").ubuntu(size: 14.0, weight: TextWeight.bold)
  }
  
  private func formattedStars() -> Text {
    return (0..<rating).reduce(Text("")) { toBeDisplayed, _ in
      toBeDisplayed + Text(Image("icon_star")).foregroundColor(Color.yellow).ubuntu(size: 14.0)
    }
  }
}
```

#### Conclusion

We love SwiftUI :heart:. With every release Apple is making the app developer life easier than ever :rocket:. Also with the new additions during WWDC23, SwiftData and Macro above all, developers will have some fun in the near future :rocket:. Sooo stay tuned, our new widget where we implemented the custom layout above is going to be released very soon!!! :rocket:
