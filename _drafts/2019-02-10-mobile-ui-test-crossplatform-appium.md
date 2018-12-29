---
layout: post
title: "End to end (e2e) testing cross platform for you mobile apps with Appium"
description: "In this post I will talk about how to use Appium to write cross platform end to end tests."
date: 2019-02-10
image: /assets/images/posts/XXXXX
tags: [react native, javascript, swift, objective-c, ios, apple, android, java, mobile application development]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*In this post I will talk about how to use Appium to write cross platform end to end tests.*

---

During my daily job I'm used to write unit test for my code. In fact, I usually develop using [Test Driven Development]() technique. Anyway at the end of the development of a new feature you want to be sure that everything you developer works as expected. In particular, you want to test the entire new feature flow inside the app. This is usually what is called [end to end test]().
In the last few months the mobile team "team cook" at [lastminute.com group](), of which I'm a member, decided to put in place an end to end testing infrastructure for the mobile apps of our main brand [lastminute.com](https://lmgroup.lastminute.com/), [volagratis](https://www.volagratis.com/) and [rumbo](https://www.rumbo.es/). In this post I will described this testing infrastructure and how it works.  

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

#### **How it works**
The first thing we did was installing all the above software on our CI machine. As a consequence of the fact that we want to run tests for both iOS and Android a macOS based CI machine is needed (because you need to install Xcode). Fortunately, our CI machine was already an Apple Computer so we didn't need to change anything.  
After that we created a new javascript project that follows the structure of the [WebdriverIO sample code contained in the Appium github repository](https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio "appium webdriverio sample"). This sample project is written using ES5 syntax, so we decided to upgrade to use ES6 syntax and compile it using Babel. This is possible by launching mocha and specifing babel as the compiler. This is the final command to launch our tests:

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

One important thing to note about the configuration above is that for iOS we were forced to set the following for options:

```javascript
wdaStartupRetryInterval: 1000,
useNewWDA: true,
waitForQuiescence: false,
shouldUseSingletonTestManager: false,
```

This were need in order to avoid a [know bug in appium for iOS](https://github.com/appium/appium/issues/9645) that causes the appium test suite be get stuck on iOS during the creation of the appium webdriver session.
