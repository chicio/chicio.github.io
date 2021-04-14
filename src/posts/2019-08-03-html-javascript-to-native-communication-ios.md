---
title: "Web to native code communication on iOS using WKScriptMessageHandler"
description: "Did you know that it is possible to call Swift/Objective-C code from the JavaScript code of a web page
displayed inside a WKWebView?"
date: 2019-08-03
image: ../images/posts/swift-js.jpg
tags: [swift, objective-c, ios, apple, mobile application development, javascript, web development]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Did you know that it is possible to call Swift code from the JavaScript code of a web page displayed inside a
WKWebView?*

---

Sooner or later every mobile developer in the world had the following specific need: integrate a website page inside an
app. Usually the integration to be developed requires a deep integration between web and native: the app must react to
some changes in the web page based on the user interactions or some other events (automatic refresh, geolocation etc.).
The old way to do this integration was to catch some url change/page load using the classical UIWebView delegate
methods. But starting from iOS 8 (this is old but gold :trophy::stuck_out_tongue_winking_eye:) there's a better way to
do this integration using `WKWebView`s and `WKScriptMessageHandler`. In this post I will show you how is it possible to
use them to call Swift code from Javascript code inside a webpage.

#### Implementation

Suppose for example we have a simple html page that contains a form with 2 input fields and a button. We want to be able
to read the form data inserted when the user clicks on the button and do some action on the Swift code side. In this
sample case we will show a simple `UIAlertController` that contains the form data.  
Let's start by setting up the controller that will display the form, `FormViewController`. The first thing to do is to
setup the `WKWebView` and add it to the main `UIView` of our controller. After that we can already setup the code that
will load the web page in the function `loadPage` (in this case, to keep the example as simple as possible, the webpage
is loaded from a local file in the `Bundle`).

```swift
class FormViewController: UIViewController {
    private var wkWebView: WKWebView!

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidLoad()
        self.setupWKWebview()
        self.loadPage()
    }

    private func setupWKWebview() {
        self.wkWebView = WKWebView(frame: self.view.bounds, configuration: self.getWKWebViewConfiguration())
        self.view.addSubview(self.wkWebView)
    }

    private func loadPage() {
        if let url = Bundle.main.url(forResource: "form", withExtension: "html") {
            self.wkWebView.load(URLRequest(url: url))
        }
    }

    ...
}
```

The code is pretty basic here. The important thing that you can see in the piece of code above is the call to
a `getWKWebViewConfiguration` method. Let's see the implementation of this method.

```swift
class FormViewController: UIViewController, WKScriptMessageHandler {

    ...

    private func getWKWebViewConfiguration() -> WKWebViewConfiguration {
        let userController = WKUserContentController()
        userController.add(self, name: "observer")
        let configuration = WKWebViewConfiguration()
        configuration.userContentController = userController
        return configuration
    }

    ...
}
```

This is where the "magic binding" between the Javascript code and the native side happens. In fact, by setting
the `FormViewController` as `WKScriptMessageHandler` using the `WKUserContentController`, we will receive each message
that is send from the webpage using the message handler `window.webkit.messageHandlers.observer`. As you can
see, `observer` is the name that we specified in the `WKUserContentController` configuration during its creation.  
After the setup we can implement the `WKScriptMessageHandler` protocol
method `userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage)`
and decide what to do with the form data received. In this case I decided that the message that we will receive will
have the following structure:

```javascript
{
  name: '<a name>',
    email
:
  '<an email>'
}
```

This message will be converted to a Swift `Dictionary` and will be put in the `body` of the `WKScriptMessage` received
by the `WebKit` SDK. So we can proceed with the unwrap of each property of this dictionary and show them in
a `UIAlertViewController`. Below you can find the final implementation of the `FormViewController`.

```swift
class FormViewController: UIViewController, WKScriptMessageHandler {
    private var wkWebView: WKWebView!

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidLoad()
        self.setupWKWebview()
        self.loadPage()
    }

    private func setupWKWebview() {
        self.wkWebView = WKWebView(frame: self.view.bounds, configuration: self.getWKWebViewConfiguration())
        self.view.addSubview(self.wkWebView)
    }

    private func loadPage() {
        if let url = Bundle.main.url(forResource: "form", withExtension: "html") {
            self.wkWebView.load(URLRequest(url: url))
        }
    }

    private func getWKWebViewConfiguration() -> WKWebViewConfiguration {
        let userController = WKUserContentController()
        userController.add(self, name: "observer")
        let configuration = WKWebViewConfiguration()
        configuration.userContentController = userController
        return configuration
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if let data = message.body as? [String : String], let name = data["name"], let email = data["email"] {
            showUser(email: email, name: name)
        }
    }

    private func showUser(email: String, name: String) {
        let userDescription = "\(email) \(name)"
        let alertController = UIAlertController(title: "User", message: userDescription, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "OK", style: .default))
        present(alertController, animated: true)
    }
}
```

Let's see now the implementation of the web page. It will contain a standard html form. We attach a call to
a `submitForm` Javascript function that will get the data from the form (using standard `getElementById` calls) and
construct the message to be sent. After that, we can send the message with the
call `window.webkit.messageHandlers.observer.postMessage(message)`. Below you can find the complete implementation of
the web page.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>ExploreWKWebViewJavascript</title>
  <script type="text/javascript">
    function submitForm() {
      var message = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
      };
      window.webkit.messageHandlers.observer.postMessage(message);
    }
  </script>
</head>
<body>
<div>
  <h2>Enter your data:</h2>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="Enter email" name="email">
  </div>
  <div>
    <label for="name  ">Name:</label>
    <input type="value" id="name" placeholder="Enter name" name="name">
  </div>
  <button onclick="submitForm()">Click me</button>
</div>
</body>
</html>
```

One important thing to note: `window.webkit.messageHandlers` is expose on the `window` as a global object only when your
page is displayed on a iOS device inside a `WKWebView`. This means that if you're planning to show your webpage with
this kind of binding also on other platform, you will need to implement a guard on the `webkit.messageHandlers` object.
You can find the complete example in
this [github repository](https://github.com/chicio/Explore-WKScriptMessageHandler "WKScriptMessageHandler github repository").

#### Conclusion

The `WKWebView` and the `WKScriptMessageHandler` are really powerful. They let you implement a deeper web to native
integration that could significantly improve the general user experiences. `WKScriptMessageHandler`, another useful tool
in the toolbox of every iOS Developer :iphone:.
