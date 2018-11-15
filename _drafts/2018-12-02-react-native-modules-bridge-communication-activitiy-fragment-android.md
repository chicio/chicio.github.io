---
layout: post
title: "React Native: a simple architecture for Native Modules communication with your native code on Android"
description: "In this post I will talk about a simple architecture for communication between React Native Native 
modules (aka bridges) and your native code."
date: 2018-11-01
image: XXXX
tags: [react native, javascript, swift, ios, apple, android, java, mobile application development]
comments: true
seo:
 - type: "BlogPosting"
authors: [felice_giovinazzo, fabrizio_duroni]
---

*In this post I will talk about a simple architecture for communication between React Native Native 
 modules (aka bridges) and your native code.*

---

Sometimes a React Native app needs to access to the native API or needs/want to call some existing native code you 
already have in place. This is why Native Modules have been created for 
both [iOS](https://facebook.github.io/react-native/docs/native-modules-ios) and [Android](https://facebook.github.io/react-native/docs/native-modules-android).    
Sometimes when you integrated React Native in an existing app, you will want to be able let your Native 
Modules bridges communicate with your activities and fragment, especially the ones that contain the React Native View
. In this post I will show you an architecture to put in place this communication on Android, that will be compatible 
with all the features of React Native (for example it will work als with the live reload functionality).
This is an architecture I put in place with my colleague [Felice Giovinazzo](https://www.linkedin
.com/in/felice-giovinazzo-17277b55/) in our apps at [lastminute.com group](XXXXXX).
 Felice is a senior fullstack developer with many years of experiences (he is the "lastminute" veteran of our team) 
 and a computer graphics enthusiast like me :revolving_hearts::sparkling_heart:.  
To realize this architecture I will create a simple app that show a React Native screen as a modal. I will then 
implement the close button functionality by calling a native module from the `onPress` on a React Native button.
Below you can see the final result.

{% include youtube.html videoId="MdNqDQHNjRc" %}

The architecture we put in place is based on a **Event Bus** in which the Native Modules bridges notify the subscribed 
Activities/Fragments of the actions to be executed. So each one of them is subscribed to specific events to which they
 are able to respond. 
 We choose [Otto](http://square.github.io/otto/) as event bus library (we don't want to reinvent the wheel :AAAAAA:). 
Let's start from the `MainActivity`. In it there's only a button with an action to start the React Native modal activity

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void showReactNativeModal(View view) {
        startActivity(new Intent(this, ReactNativeModalActivity.class));
    }
}
```

The `ReactNativeModalActivity` is an activity with the setup needed to launch a React Native context. This activity 
register also itself to the event bus to be able to listen to events from the Native Modules bridges. In this case 
the activity is registered for just one event with the method `@Subscribe public void close(ReactNativeModalBridge
.CloseModalEvent event)`.

```java
public class ReactNativeModalActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    private final int OVERLAY_PERMISSION_REQ_CODE = 8762;
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerToReactEvents();
        askReactDrawingPermission();
        setupReactView();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterToReactEvents();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
        }
    }

    private void registerToReactEvents() {
        ((NativeModulesApplication)getApplication())
                .getBus()
                .register(this);
    }

    private void unregisterToReactEvents() {
        ((NativeModulesApplication)getApplication())
                .getBus()
                .unregister(this);
    }

    @Subscribe
    public void close(ReactNativeModalBridge.CloseModalEvent event) {
        finish();
    }

    private void askReactDrawingPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                Intent intent = new Intent(
                        Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName())
                );
                startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
            }
        }
    }

    private void setupReactView() {
        ...
    }

    ...
}

```

Now let's have a look at Native Module created for the app, the `ReactNativeModalBridge`. In this bridge there just 
one react method, `closeModal`. This is the one called from the React Native JS side. In this method we are sending 
an event of type `CloseModalEvent`. The `ReactNativeModalActivity` is subscribed to this type of event (as we saw 
above). This basically means that when the `closeModal` bridge method will be called from the React Native Javascript 
code a new event `CloseModalEvent` and the `ReactNativeModalActivity` will execute the subscribed method defined in 
it. We have all setup to have our Native Modules communication with our activities (and eventually fragment with the 
same approach if we need them :neckbeard:).

```java
public class ReactNativeModalBridge extends ReactContextBaseJavaModule {

    public ReactNativeModalBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @ReactMethod
    public void closeModal() {
        final Activity currentActivity = getCurrentActivity();
        currentActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ((NativeModulesApplication) currentActivity.getApplication())
                        .getBus()
                        .post(new CloseModalEvent());
            }
        });
    }

    public class CloseModalEvent { }
}
``` 

Now it's time to see the javascript code. Below you can see the `ReactNativeModal` component. In it there is a call 
to the native module `NativeModules.ReactNativeModalBridge.closeModal()` described above. In this way the modal will 
be closed directly from the native side.

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
 
That's all for our native modules communication architecture. Continue to read my blog if you want to know how we 
managed the same problem on the iOS platform :apple::iphone::heartbeat:
