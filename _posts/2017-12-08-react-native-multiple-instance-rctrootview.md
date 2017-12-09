---
layout: post
title: "React Native: use multiple RTCRootView instances in an existing iOS app"
description: "In this post I show you how is it possible to use multiple RCTRootView instances in an existing iOS app."
date: 2017-12-08
image: /assets/images/posts/react-native-crash-reload-with-debugger.jpg
tags: [react native, realm, swift, ios, apple, mobile application development]
comments: true
seo:
 - type: "BlogPosting"
---

*In this post I show you how is it possible to use multiple RCTRootView instances in an existing iOS app.*

---

If we want to start to use React Native in an existing app, it's really easy. We can have our first React 
Native component live inside our app by just following the [getting started tutorial for existing app](https://facebook
.github.io/react-native/docs/integration-with-existing-apps.html "getting started tutorial for existing app"). But what 
happen if we need to use multiple react native component in different parts of your existing app :fearful:? In this 
tutorial I will show you how we can use multiple instances of `RCTRootView` to show different React Native components
 in different parts of your app. 
 Consider, for example, a simple iOS existing app with React Native. It has two very simple React Native components: 
 
* `BlueScreen`, that shows a blue view
* `RedScreen`, shows a red view

```jsx
import React from "react"
import {View, AppRegistry, StyleSheet} from "react-native";

class BlueScreen extends React.Component {
    render() {
        return (
            <View style={styles.blue} />
        );
    }
}

class RedScreen extends React.Component {
    render() {
        return (
            <View style={styles.red} />
        );
    }
}

const styles = StyleSheet.create({
    blue: {
        backgroundColor: "#0000FF",
        width: "100%",
        height: "100%"
    },
    red: {
        backgroundColor: "#FF0000",
        width: "100%",
        height: "100%"
    }
});

AppRegistry.registerComponent('BlueScreen', () => BlueScreen);
AppRegistry.registerComponent('RedScreen', () => RedScreen);
```

On the native side there's a controller, `ReactViewController`, that shows React Native components given their name. 

```swift
import UIKit
import React

class ReactViewController: UIViewController {
    init(moduleName: String) {
        super.init(nibName: nil, bundle: nil)
        view = RCTRootView(bundleURL: URL(string: "http://localhost:8081/index.bundle?platform=ios"),
                           moduleName: moduleName,
                           initialProperties: nil,
                           launchOptions: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
```
There's also another controller, `MainViewController`, that shows the React Native components above using multiple 
instance of the `ReactViewController`. The UI of the app is very simple: there are two buttons on the view of the 
`MainViewController`. A tap on the first one shows the `ReactViewController` with a `RCTRootView` that contains the 
`RedComponent`. A tap on the second one shows the `ReactViewController` with a `RCTRootView` that contains the 
`BlueComponent`.  
This basically means that in this apps there are multiple `RCTRootView`, one for each controller created. This 
instances are kept alive at the same time. The code to start the React Native components is the same contained in the 
[getting started tutorial for existing app](https://facebook.github.io/react-native/docs/integration-with-existing-apps.html "getting started tutorial for existing app").

```swift
class MainViewController: UIViewController {
    private let blueViewController: ReactViewController
    private let redViewController: ReactViewController

    required init?(coder aDecoder: NSCoder) {
        blueViewController = ReactViewController(moduleName: "BlueScreen")
        redViewController = ReactViewController(moduleName: "RedScreen")
        super.init(coder: aDecoder)
    }
    
    @IBAction func showRedScreen(_ sender: Any) {
        navigationController?.pushViewController(redViewController, animated: true)
    }
    
    @IBAction func showBlueScreen(_ sender: Any) {
        navigationController?.pushViewController(blueViewController, animated: true)
    }
}
```

If we try to run the app now we will see something things very strange:

* if we do a live reload, we will see our **React components refreshed multiple times**
* if we press cmd + ctrl + z in the simulator **2 dev menu will be shown**

![React Native multiple dev menus](/assets/images/posts/react-native-multiple-debugger.gif "React Native multiple dev menus")   

* if we do a **live reload while we're in debug mode the app could crash**

![React Native crash multiple view](/assets/images/posts/react-native-crash-reload-with-debugger.jpg "React Native crash multiple view")   

What's happening here? Well, something is missing in our code. If we take a look at the comments in the code of 
react native for the `RCTRootView` initializer, we will note something very strange:

```objective-c
...

/**
 * - Designated initializer -
 */
- (instancetype)initWithBridge:(RCTBridge *)bridge
                    moduleName:(NSString *)moduleName
             initialProperties:(NSDictionary *)initialProperties NS_DESIGNATED_INITIALIZER;

/**
 * - Convenience initializer -
 * A bridge will be created internally.
 * This initializer is intended to be used when the app has a single RCTRootView,
 * otherwise create an `RCTBridge` and pass it in via `initWithBridge:moduleName:`
 * to all the instances.
 */
- (instancetype)initWithBundleURL:(NSURL *)bundleURL
                       moduleName:(NSString *)moduleName
                initialProperties:(NSDictionary *)initialProperties
                    launchOptions:(NSDictionary *)launchOptions;
                    
...
```   

Whaaaaaaattttt :laughing:?????!?!?!??? This basically means that the documentation in the getting started is 
considering the case where we will have just one `RCTRootView` instance. But as we can see from the comment we have
 the solution: we need to use the other `RCTRootView` initializer and we can start to use multiple React Native views
  in the same app. So the new `ReactViewController` with the new `RCTRootView` initialization is the following one:

```swift
import UIKit
import React

class ReactViewController: UIViewController {
    
    init(moduleName: String, bridge: RCTBridge) {
        super.init(nibName: nil, bundle: nil)
        view = RCTRootView(bridge: bridge,
                           moduleName: moduleName,
                           initialProperties: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
```

Where do we get an instance of `RCTBridge` to pass to the init of the `ReactViewController` and `RCTRootView`? A new
 object, `ReactNativeBridge`, creates a new `RCTBridge` instance and store it as a property.  
The `RCTBridge` instance needs a `RCTBridgeDelegate`. Another new object, `ReactNativeBridgeDelegate`, will be the 
delegate of the `RCTBridge`.

```swift
class ReactNativeBridge {
    let bridge: RCTBridge
    
    init() {
        bridge = RCTBridge(delegate: ReactNativeBridgeDelegate(), launchOptions: nil)
    }
}

class ReactNativeBridgeDelegate: NSObject, RCTBridgeDelegate {
    
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        return URL(string: "http://localhost:8081/index.bundle?platform=ios")
    }
}
```

Now it is possible to modify the `MainViewController`. This controller will create a `ReactNativeBridge` with a 
single `RCTBridge` instance. This instance will be passed to the two `ReactViewController`. So they will basically 
share the same bridge instance.

```swift
class MainViewController: UIViewController {
    private let blueViewController: ReactViewController
    private let redViewController: ReactViewController
    private let reactNativeBridge: ReactNativeBridge
    
    required init?(coder aDecoder: NSCoder) {
        reactNativeBridge = ReactNativeBridge()
        blueViewController = ReactViewController(moduleName: "BlueScreen",
                                                 bridge: reactNativeBridge.bridge)
        redViewController = ReactViewController(moduleName: "RedScreen",
                                                bridge: reactNativeBridge.bridge)
        super.init(coder: aDecoder)
    }
    
    @IBAction func showRedScreen(_ sender: Any) {
        navigationController?.pushViewController(redViewController, animated: true)
    }
    
    @IBAction func showBlueScreen(_ sender: Any) {
        navigationController?.pushViewController(blueViewController, animated: true)
    }
}
```

Now if we try to run the app again everything will work as expected:

* if we do a live reload, we will see our **React components refreshed just one time**
* if we press cmd + ctrl + z in the simulator **1 dev menu will be shown**

![React Native single dev menus](/assets/images/posts/react-native-single-debugger.gif "React Native single dev menus")   

* **no more crashes with live reload in debug mode**

The entire source code of the app used as example for this post is contained in [this github repo](https://github.com/chicio/React-Native-Multiple-RCTRootView "React native multiple RCTRootView"). 
Now we're ready to use multiple React Native components at the same time in our app :relieved:.
