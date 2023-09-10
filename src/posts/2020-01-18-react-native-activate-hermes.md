---
title: "How to: enable Hermes JavaScript engine in your React Native app"
description: "React native 0.60.4 has a new cool feature for Android: a new JavaScript engine called Hermes. Let's see
how you can turn it on in your React Native application to get all its benefits."
date: 2020-01-18 
image: ../images/posts/hermes.jpg
tags: [react native, swift, ios, apple, android, java, mobile application development, javascript, typescript]
comments: true 
math: false 
authors: [fabrizio_duroni, francesco_bonfadelli, marco_de_lucchi]
---

*React native 0.60.4 has a new cool feature for Android: a new JavaScript engine called Hermes. Let's see how you can
turn it on in your React Native application to get all its benefits.*

---

As you already may know, there has been some complains in the past related to the performance of React Native on the
Android platform. One of the main reason was due to a big difference in the React Native architecture implementation
between Android and iOS: the JavaScript engine used to execute your code. On iOS React Native uses
the [JavaScript Core engine exposed in the iOS SDK](https://developer.apple.com/documentation/javascriptcore). On
Android the SDK doesn't offer the same feature, so the React Native Android implementation embeds a compiled version of
the JavaScript Core engine. As a consequence of this fact the engine used on Android didn't receive the regular updates
that the iOS counterpart received on each system major update, and was also not optimized for React Native and generally
speaking for executing JavaScript code for mobiles apps. This is the reason why the Facebook React Native team decided
to
create [Hermes, an open source JavaScript engine optimized for mobile apps](https://engineering.fb.com/android/hermes/)
.  
Which benefits does the new Engine bring to the table? As reported in the presentation blog post, there were a few key
metrics kept in consideration by the Facebook React Native team:

> For JavaScript-based mobile applications, user experience benefits from attention to a few primary metrics:
>
>The time it takes for the app to become usable, called time to interact (TTI)
> The download size (on Android, APK size)
> Memory utilization

That seems really cool!! Hermes is available starting from React Native 0.60.4. Now the question is: how can you start
to use it? Let's see how we enabled this new cool new engine in the [lm group](https://careers.lastminute.com/) mobile
apps (did you remember [how much we love React Native](/2018/07/04/react-native-typescript-existing-app/)?) while we
were doing the upgrade to the latest version of React Native in order to enable AndroidX in our apps.

#### Implementation

The first thing to do is to set the `enableHermes` option to true in the React Native project configuration. This is
typically done in the `build.gradle` app file or, if you have one, in your `react.gradle` custom gradle file at app
level.

```groovy
project.ext.react = [
  /// ...other options...
  enableHermes: true
]
```

Then we need to tell to ProGuard (if you're using it) to keep some Hermes classes.

```java
-keep class com.facebook.hermes.unicode.** { *; }
```

In the [official documentation](https://facebook.github.io/react-native/docs/hermes "hermes react native setup") these
are all the step needed to activate Hermes. So we added these configurations to our apps and we launched our app, but we
got the following error.

```shell
2020-01-17 22:04:30.194 5745-6293/it.app E/SoLoader: couldn't find DSO to load: libhermes.so
2020-01-17 22:04:30.646 5745-6293/it.app E/AndroidRuntime: FATAL EXCEPTION: create_react_context
    Process: it.app, PID: 5745
    java.lang.UnsatisfiedLinkError: couldn't find DSO to load: libhermes.so
        at com.facebook.soloader.SoLoader.doLoadLibraryBySoName(SoLoader.java:738)
        at com.facebook.soloader.SoLoader.loadLibraryBySoName(SoLoader.java:591)
        at com.facebook.soloader.SoLoader.loadLibrary(SoLoader.java:529)
        at com.facebook.soloader.SoLoader.loadLibrary(SoLoader.java:484)
        at com.facebook.hermes.reactexecutor.HermesExecutor.<clinit>(HermesExecutor.java:20)
        at com.facebook.hermes.reactexecutor.HermesExecutorFactory.create(HermesExecutorFactory.java:27)
        at com.facebook.react.ReactInstanceManager$5.run(ReactInstanceManager.java:952)
        at java.lang.Thread.run(Thread.java:761)
```

As the error says, the compilation is failing because gradle is not able to find one the shared libraries used by
Hermes. If you think well we are also missing a part in our setup: we said that React Native contains a compiled version
of Hermes, but we are not telling to gradle where it can pick the `aar` file that contains it. Let's fix this problem
with the help of the [React Native upgrade tool](https://react-native-community.github.io/upgrade-helper/).  
First we need to add to the `repository` section in the main gradle file a new maven repository (that is contained in
the node_modules of the app).

```groovy
//....

allprojects {
    repositories {
      //....
      maven { url("$rootDir/../node_modules/jsc-android/dist") }
      //....
    }
}

//....
```

Then we need to declare the Hermes compiled version as dependencies in the `build.gradle` file.

```groovy
//...

debugImplementation files("../../node_modules/hermes-engine/android/hermes-debug.aar")
qaReleaseImplementation files("../../node_modules/hermes-engine/android/hermes-release.aar")
releaseImplementation files("../../node_modules/hermes-engine/android/hermes-release.aar")

//...
```

As you can see from above we needed to link the `aar` version of Hermes specifically for each build variant we have. We
also need to rename our `qa` flavor to `qaRelease` and link it to the `hermes-release.aar` file. Why? Because our QA
build configuration inherits from the release one, and the **`react.gradle` contained in the React Native
itself (`node_modules/react-native/react.gradle`)** does some checks based on the flavor name and, if it contains
release, it performs some additional operations for apps with Hermes enabled related to the generation of the sourcemap
and the removal of the debugger libraries (not needed for a release build). Below you can find the parts that do checks
on the variant name.

```groovy
//...

if (enableHermes) {
  doLast {
    def hermesFlags;
    def hbcTempFile = file("${jsBundleFile}.hbc")
    exec {
      if (targetName.toLowerCase().contains("release")) {
        // Can't use ?: since that will also substitute valid empty lists
        hermesFlags = config.hermesFlagsRelease
        if (hermesFlags == null) hermesFlags = ["-O", "-output-source-map"]
        } else {
          hermesFlags = config.hermesFlagsDebug
          if (hermesFlags == null) hermesFlags = []
        }

        if (Os.isFamily(Os.FAMILY_WINDOWS)) {
          commandLine("cmd", "/c", getHermesCommand(), "-emit-binary", "-out", hbcTempFile, jsBundleFile, *hermesFlags)
      } else {
        commandLine(getHermesCommand(), "-emit-binary", "-out", hbcTempFile, jsBundleFile, *hermesFlags)
      }
    }

    //....
  }
}

//...
def isRelease = targetName.toLowerCase().contains("release")
def libDir = "$buildDir/intermediates/transforms/"
def vmSelectionAction = {
    fileTree(libDir).matching {
        if (enableHermes) {
            // For Hermes, delete all the libjsc* files
            include "**/libjsc*.so"

            if (isRelease) {
                // Reduce size by deleting the debugger/inspector
                include '**/libhermes-inspector.so'
                include '**/libhermes-executor-debug.so'
            } else {
                // Release libs take precedence and must be removed
                // to allow debugging
                include '**/libhermes-executor-release.so'
            }
        } else {
            // For JSC, delete all the libhermes* files
            include "**/libhermes*.so"
        }
    }.visit { details ->
        def targetVariant = ".*/transforms/[^/]*/${targetPath}/.*"
        def path = details.file.getAbsolutePath().replace(File.separatorChar, '/' as char)
        if (path.matches(targetVariant) && details.file.isFile()) {
            details.file.delete()
        }
    }
}
```

#### Conclusion

Hermes is one of the cool new features contained in the new version of React Native :sunglasses:. Stay tuned for more
updates and see how we are using all of them here
at [lm group](https://careers.lastminute.com/ "lastminute.com careers").
