---
layout: post
title: "End to end (e2e) cross platform testing for you mobile apps with Appium"
description: "In this post I will talk about how to use Appium to write cross platform end to end tests for you mobile apps."
date: 2019-02-10
image: /assets/images/posts/appium.jpg
tags: [javascript, swift, objective-c, ios, apple, android, java, mobile application development, react native, TDD]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this post I will talk about how to use Appium to write cross platform end to end tests for you mobile apps..*

---

During my daily job I'm used to write unit test for my code. In fact, I usually develop using [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development "TDD") technique. Anyway at the end of the development of a new feature you want to be sure that everything you developer works as expected. In particular, you want to test the entire new feature flow inside the app. This is usually what is called [end to end test](https://www.techopedia.com/definition/7035/end-to-end-test "end to end tests").
In the last few months the mobile team "Team Cook" at [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group"), of which I'm a member, decided to put in place an end to end testing infrastructure for the mobile apps of our main brand [lastminute.com](https://www.lastminute.com/), [volagratis](https://www.volagratis.com/) and [rumbo](https://www.rumbo.es/). In this post I will described this testing infrastructure and how it works.  

#### **Software**
To put in place the e2e infrastructure we choose:

- Jenkins as our CI platform. Jenkins was already in place for our build jobs and for the submssions on the stores or to [our internal beta programs](/2018/07/05/distribution-enterprise-app-ios-beta.html).
- Appium as end to end testing platform. We chose it because it let us test our apps for both iOS and Android with a single tests codebase. At the moment of this writing we used the Appium version 1.9.0. In particular we chose to use the appium implementation based on:
  - JavaScript, to be able to write our tests with a language with similar features to [TypeScript, the language we are using with React Native for our apps](/2018/07/04/react-native-typescript-existing-app.html "TypeScript React Native")
  - WebdriverIO is a JavaScript implementation of the Selenium 2.0 WebDriver API
  - [mocha](https://github.com/mochajs/mocha "mocha test framework"), a JavaScript test framework
  - [babel](https://github.com/babel/babel "babel es6"), is a compiler for writing next generation JavaScript
  - [Appium XCUITest Driver](https://appium.io/docs/en/drivers/ios-xcuitest/index.html "appium ios driver") for iOS
  - [Appium UiAutomator Driver](https://appium.io/docs/en/drivers/android-uiautomator2/index.html "appium android driver") for Android  
  - [Appium desktop App](https://github.com/appium/appium-desktop)

#### **Development**
The first thing we did was installing all the above software on our CI machine. As a consequence of the fact that we want to run tests for both iOS and Android a macOS based CI machine is needed (because you need to install Xcode). Fortunately, our CI machine was already an Apple Computer so we didn't need to change anything.  
After that we created a new javascript project, that we called `e2e-tests`, that follows the structure of the [WebdriverIO sample code contained in the Appium github repository](https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio "appium webdriverio sample"). This sample project is written using ES5 syntax, so we decided to upgrade to use ES6 syntax and compile it using Babel. This is possible by launching mocha and specifing babel as the compiler. This is the final command to launch our tests:

```shell
mocha --compilers js:babel-core/register --timeout 6000000 test
```

This is the final `package.json` with all the dependecies and scripts phases. 

```json
{
  "name": "e2e-tests",
  "version": "1.0.0",
  "description": "e2e tests",
  "main": "index.js",
  "scripts": {
    "pretest": "./download-artifacts.sh",
    "test": "mocha --compilers js:babel-core/register --timeout 6000000 test"
  },
  "author": "Fabrizio Duroni",
  "license": "MIT",
  "devDependencies": {
    "assert": "^1.4.1",
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "chai": "^4.1.2",
    "mocha": "^5.0.0",
    "webdriverio": "^4.12.0"
  }
}
```

As you may already notice from the package.json file above, there's a `pretest` phase that launches a script called `download-artifacts.sh`. This a custom script we added to download the latest release of our iOS ipa and Android apk artifacts. This will be the apps installed on the iOS simulators/Android emulators and tested with appium.  
After that we created the iOS and Android appium config to be used by our tests.

```javascript
import path from "path";

const iOSConfig = {
  protocol: "http",
  host: "localhost",
  port: 4723,
  path: "/wd/hub",
  logLevel: "verbose",
  desiredCapabilities: {
      platformName: "iOS",
      automationName: "XCUITest",
      deviceName: "iPhone 8",
      platformVersion: "11.4",
      clearSystemFiles: true,
      wdaStartupRetryInterval: 1000,
      useNewWDA: true,
      waitForQuiescence: false,
      shouldUseSingletonTestManager: false,
      app: path.resolve(__dirname, "..", "apps", "<ipa downloaded using pretest download.sh script>"),
      orientation: "PORTRAIT",
  }
};

const androidConfig = {
    host: "localhost",
    port: 4723,
    logLevel: "verbose",
    desiredCapabilities: {
        platformName: "Android",
        automationName: "UiAutomator2",
        deviceName: "Pixel_XL_API_27",
        platformVersion: "8.1",
        app: path.resolve(__dirname, "..", "apps", "<apk downloaded using pretest download.sh script>")
    }
};

export {iOSConfig, androidConfig}
```

One important thing to note about the configuration above is that for iOS we were forced to set the following four options:

```javascript
wdaStartupRetryInterval: 1000,
useNewWDA: true,
waitForQuiescence: false,
shouldUseSingletonTestManager: false,
```

These were need in order to avoid a [know bug in appium for iOS](https://github.com/appium/appium/issues/9645) that causes the appium test suite to get stuck during the creation of the appium WebdriverIO session.
After the configuration setup we were ready to write our first tests. To write them we used the [Appium desktop app](https://github.com/appium/appium-desktop "Appium desktop app") to record the interfaction with our apps. The outcome of the recording is a test source code written in the language + driver you prefer (in our case JavaScript + WebdriverIO).  Remember that appium uses the accessibility id on iOS and the content-desc on Android to unify the search method for both platform. If this fields are not setted correctly with the UI elements you interact with, the appium desktop app will generate a XPath queries for XCUITest or UiAutomator. This will cause you to write two tests with the same interaction just to change the UI elements identifier (or write some wrapper with parametrized UIElements). So the best solution to have appium works correctly is to set the fields above with the same values on both iOS and Android.  
After that we launched the appium server on the CI machine previously configured and we created a new Jenkins job that clones the `e2e-tests` project and runs the command:

```shell
npm run test
```

This job is autmatically triggered (cron) every day at 8 PM.
Tha's all for appium and mobile end to end tests. If you have any question don't hesitate to comment on this post below :sparkling_heart:.