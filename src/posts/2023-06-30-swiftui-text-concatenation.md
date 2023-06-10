---
title: "SwiftUI and the Text contatenations super powers"
description: "Do you need a way to compose beautiful text with images and custom font like you are used with Attributed String. The Text component has eveything we need to create some sort of 'attributed text' directly in SwiftUI. Let's go!!!"
date: 2023-06-30
image: ../images/posts/XXXX.jpg
tags: [swift, swiftui, ios, apple, mobile-application-development]
comments: true
math: false
authors: [fabrizio_duroni, marco_delucchi]
---

In some recent posts (have a look [here](https://technology.lastminute.com/widget-ios-swiftui-configuration-intent/ "swiftui widget friyay lastminute") and [here](https://technology.lastminute.com/widget-ios-swiftui-react-native/ "swiftui widget lastminute") ) we show a beautfiul project me and Marco are creating during our [Friyay at lastminute.com](https://technology.lastminute.com/tech-learning-and-development-friyay/ "lastminute.com friyay"): some widgets for our iOS apps.
For the second widget we developed, one that will show to our users their bookings information, we faced a challenge to display the information of hotels.  
Our mobile app designer [Rafael de Sena Martinez] asked us to display the hotel name and the hotel rating as if it was a single text, with the rating represented by a number of stars matching the rating itself.

![Image hotel name. + stars layout](../images/posts/XXXX.jpg)

From iOS 15 the `Text` supports the new `AttributedString` from the `Foundation` framework as a parameter. But... given that the ne AttributedString are not always [easy to use](https://stackoverflow.com/questions/75513158/how-do-you-add-an-image-attachment-to-an-attributedstring) and we wanted a more "SwiftUI native" way to create our custom text, we wondered if there was another way to do our implementation.  
Luckily we discovered that in SwiftUI the `+` is overloaded and does some incredible magic :crystal_ball:. It basically concates each `Text` content while keeping each own specific formatting :mind_blowing:. It's like having Attributed Strings directly implemented in SwiftUI :rocket:.  
After this discovery, we were ready to implement our own custom layout above. So let's no longer wait and jump into the implementation right now!!! :rocket:


## Implementation

XXXX..

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

## Conclusion

XXXX...
