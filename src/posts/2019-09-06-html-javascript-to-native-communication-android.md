---
title: "Web to native code communication on Android using JavaScript Interfaces"
description: "Javascript Interface can be helpful when you need to call native code from a webview on Android."
date: 2019-09-06 
image: ../images/posts/android-js.jpg
tags: [android, java, mobile application development, javascript, web development]
comments: true 
math: false 
authors: [fabrizio_duroni]
---

*Javascript Interface can be helpful when you need to call native code from a WebView on Android.*

---

In a [previous post]( "javascript swift") I described how you can call native Swift code from the JavaScript code of web
page loaded inside a `WKWebView`. Today I will show you how to achieve the same result for tan Android Apps. I will a
part of the Android SDK called `JavascriptInterface`.

#### Implementation

I will use the same simple I used in the previous post for iOS. The html page contains a form with 2 input fields and a
button. We want to be able to read the form data inserted when the user clicks on the button and do some action on the
Java code side. In this sample case we will show a simple `AlertDialog` that contains the form data. Let's start by
setting up the `Activity` that will display the form, `MainActivity`. The first thing to do is to setup the `WebView` by
declaring it in the activity layout. After that we can already setup the code that will load the web page in
the `onCreate` method of the `MainActivity`.

```java
public class MainActivity extends AppCompatActivity {

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView formWebView = findViewById(R.id.webview);
        formWebView.getSettings().setJavaScriptEnabled(true);
        formWebView.addJavascriptInterface(new FormJavascriptInterface(this), "Android");
        formWebView.loadUrl("file:///android_asset/form.html");
    }
}
```

The important thing to note in the code above is the
call `formWebView.addJavascriptInterface(new FormJavascriptInterface(this), "Android");`. By calling this method we are
creating on the `window` global javascript variable a new object called `Android`. I will be able to use it by
calling `window.Android.<some method>`. Where are this method declared? As you can see the first parameter of the
method `addJavascriptInterface` is an object called `FormJavascriptInterface`. This class contains a method
named `showUser` annotated with `@JavascriptInterface`. This annotation enable the Android SDK to expose this method to
the `window.Android` object exposed on the web side.

```java
public class FormJavascriptInterface {
    private Context context;

    FormJavascriptInterface(Context context) {
        this.context = context;
    }

    @JavascriptInterface
    public void showUser(String name, String email) {
        new AlertDialog.Builder(context)
                .setTitle("User")
                .setMessage(name + " " + email)
                .show();
    }
}
```

So as you can imagine now I'm able to call the method `showUser` inside the html page loaded in the `WebView`. Let's see
the final implementation of the web page.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>ExploreWKWebViewJavascript</title>
  <script type="text/javascript">
    function submitForm() {
      Android.showUser(document.getElementById("name").value, document.getElementById("email").value);
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
    <label for="name">Name:</label>
    <input type="value" id="name" placeholder="Enter name" name="name">
  </div>
  <button onclick="submitForm()">Click me</button>
</div>
</body>
</html>
```

As you can see in the submit form we are calling the method we saw before annotated `@JavascriptInterface`. The
parameter are passed as a normal JavaScript call.  
You can find the complete code example in
this [github repository](https://github.com/chicio/Explore-JavascriptInterfaces "github repository").

#### Conclusion

The `JavascriptInterface` is really powerful. It lets you implement a deeper web to native integration that could
significantly improve the general user experiences. `JavascriptInterface`, the best web to native integration for :
robot: Android :robot:.
