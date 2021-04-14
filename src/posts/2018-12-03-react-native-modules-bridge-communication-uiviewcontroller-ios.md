---
title: "React Native: a simple architecture for Native Modules communication with your UIViewController on iOS"
description: "In this post I will talk about a simple architecture for communication between React Native Native
modules (aka bridges) and your native code on iOS."
date: 2018-12-03
image: ../images/posts/native-modules-communication-ios.jpg
tags: [react native, javascript, swift, objective-c, ios, apple, android, java, mobile application development]
comments: true
math: false
authors: [fabrizio_duroni]
---

*In this post I will talk about a simple architecture for communication between React Native Native modules (aka
bridges) and your native code on iOS.*

---

[As we saw in a previous post for fragments/Activities Android](/2018/12/02/react-native-modules-bridge-communication-activitiy-fragment-android/), 
sometimes when you integrated React Native in an existing app, you will want to be able let your Native Modules
bridges communicate with your `UIVIewController`, especially the ones that contain the React Native View. In this post I
will show you an architecture to put in place this communication on iOS, that will be compatible with all the features
of React Native (for example it will work also with the live reload functionality). This is an architecture I put in
place for our apps at [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com"). To show this
architecture I will create a simple app that show a React Native screen as a modal. I will then implement the close
button functionality by calling a native module from the `onPress` on a React Native button. Below you can see the final
result.

`youtube: https://www.youtube.com/watch?v=rJLX27nancs`

The architecture I put in place is based on the `NSNotificationCenter`. The description of this component of the iOS SDK
is the following one:

> A notification dispatch mechanism that enables the broadcast of information to registered observers. Objects register with a notification center to receive notifications (NSNotification objects) using the addObserver(_:selector:name:object:) or addObserver(forName:object:queue:using:) methods. When an object adds itself as an observer, it specifies which notifications it should receive. An object may therefore call this method several times in order to register itself as an observer for several different notifications.

This definition basically means that with this api we are able to register class to events send by another one. This is
exactly what we need to put in place the communication between our Native Modules bridges and our `UIViewController`.
Let's start from the `MainViewController`. In it there's only a button with an action to start the React Native modal
UIViewController called `ReactNativeModalViewController`.

 ```swift
 class MainViewController: UIViewController {
     override func viewDidLoad() {
         super.viewDidLoad()
     }

     @IBAction func showReactNativeModal(_ sender: Any) {
         present(ReactNativeModalViewController(), animated: true, completion: nil)
     }
 }
 ```

The `ReactNativeModalViewController` is a `UIViewController` with the setup needed to launch a React Native context.
This `UIViewController` is an observer of the `ReactEventCloseModal` event in the `NSNotificationCenter`. This event is
generated in the Native Modules bridge. The action executed for this event is contained in the `closeModal` event.

```swift
class ReactNativeModalViewController: UIViewController {
    override func viewDidLoad() {
        setupReactNative()
        registerToReactNativeEvents()
    }

    private func setupReactNative() {
        let rootView = RCTRootView(
            bundleURL: URL(string: "http://localhost:8081/index.bundle?platform=ios"),
            moduleName: "ReactNativeModal",
            initialProperties: nil,
            launchOptions: nil
        )
        self.view = rootView
    }

    private func registerToReactNativeEvents() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(closeModal),
                                               name: NSNotification.Name(rawValue: ReactEventCloseModal),
                                               object: nil)
    }

    @objc private func closeModal() {
        DispatchQueue.main.async { [unowned self] in
            self.dismiss(animated: true, completion: nil)
        }
    }
}
```

Now let's have a look at Native Module created for the app, the `ReactNativeModalBridge`. In this bridge there just one
react method, `closeModal`. This is the one called from the React Native JS side. In this method we are sending an event
with the identifier `ReactEventCloseModal`. This identifier is defined inside the
files `ReactNativeEvents.h/ReactNativeEvents.m` as a constant with string value `closeModal`.
The `ReactNativeModalViewController` is subscribed to this type of event (as we saw above). This basically means that
when the `closeModal` bridge method is called from the React Native Javascript code a new event `ReactEventCloseModal`
is generated and the `ReactNativeModalViewController` will execute the subscribed method defined in it. We have all
setup to have our Native Modules communication with our controllers :open_mouth:. Below you can find the header and
implementations of the `ReactNativeModalBridge` bridge (written in Objective-C :sparkling_heart:).

```objective_c
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface ReactNativeModalBridge : NSObject<RCTBridgeModule>

@end
  
  
#import "ReactNativeModalBridge.h"
#import "ReactNativeEvents.h"

@implementation ReactNativeModalBridge
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(closeModal) {
    [[NSNotificationCenter defaultCenter] postNotificationName:ReactEventCloseModal object:nil];
}

@end
```

Now it's time to see the javascript code. Below you can see the `ReactNativeModal` component. Inside this component
there is a call to the native module `NativeModules.ReactNativeModalBridge.closeModal()` described above. In this way
the modal will be closed directly from the native side.

```jsx
class ReactNativeModal extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello modal!</Text>
        <Text style={styles.message}>
          I'm a react native component. Click on the button to close me using native function.
        </Text>
        <Button
          title={"Close me"}
          onPress={() => NativeModules.ReactNativeModalBridge.closeModal()}
        />
      </View>
    );
  }
}
```

That's all for our native modules communication architecture iOS. You can find the complete example
in [this github repository](https://github.com/chicio/React-Native-Native-Modules-Communication). If you want to know
how we managed the same problem on the Android platform :rocket: you can
read [my other post about the same topic](/2018/12/02/react-native-modules-bridge-communication-activitiy-fragment-android/).
