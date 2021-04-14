---
title: "Use UIKit components in SwiftUI: UIViewControllerRepresentable and UIViewRepresentable"
description: "Do you know that it is possible to use UKit components in SwiftUI? Let's see how you can use
UIViewRepresentable and UIViewControllerRepresentable to use your UIKit based component or to fill the gap for missing
SwiftUI API."
date: 2020-07-02
image: ../images/posts/use-uikit-in-swiftui.jpg
tags: [swift, ios, apple, mobile application development]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Do you know that it is possible to use UKit components in SwiftUI? Let's see how you can use UIViewRepresentable and
UIViewControllerRepresentable to use your UIKit based component or to fill the gap for missing SwiftUI API.*

---

SwiftUI has been around for more than a year now. With its reactive paradigm approach it is a big step forward when
compared to the UIKit imperative approach. But as a consequence of the fact that UIKit has been with
us [for almost twelve years](https://en.wikipedia.org/wiki/IOS_SDK) and there are millions of apps already publish on
the app store, a lot of developers have tons of UKit based library and custom components. Another interesting point is
the fact that at the moment of this writing a lot of UIKit components from the iOS SDK
are [missing a counterpart in SwiftUI](https://www.hackingwithswift.com/quick-start/swiftui/answering-the-big-question-should-you-learn-swiftui-uikit-or-both "uikit missing swiftui")
.  
Anyway, you are just starting to develop a new app and you want to create it in SwiftUI (targeting only for iOS 13 and
up because, you know, for compatibility reason :laughing:) without losing the ability to speed up you development by
reusing your UIKit based libraries and components. Is there a solution to this problem? Yes!! :relaxed:  
In this post I will show you how you can leverage the power of `UIViewRepresentable` and `UIViewControllerRepresentable`
protocols to expose your UIKit views and controller as standard SwiftUI components. Before going deeper with an example
let's see the definition of this two protocol from the official Apple documentation.  
Let's start
from [UIViewRepresentable](https://developer.apple.com/documentation/swiftui/uiviewrepresentable "uiviewrepresentable documentation"):

> UIViewRepresentable. A wrapper for a UIKit view that you use to integrate that view into your SwiftUI view hierarchy...Adopt this protocol in one of your app's custom instances, and use its methods to create, update, and tear down your view. The creation and update processes parallel the behavior of SwiftUI views, and you use them to configure your view with your app's current state information...

And here we have the other one
for [UIViewControllerRepresentable](https://developer.apple.com/documentation/swiftui/uiviewcontrollerrepresentable "uiviewcontrollerrepresentable"):

> UIViewControllerRepresentable. A view that represents a UIKit view controller...Adopt this protocol in one of your app's custom instances, and use its methods to create, update, and tear down your view controller. The creation and update processes parallel the behavior of SwiftUI views, and you use them to configure your view controller with your app's current state information...The system doesn't automatically communicate changes occurring within your view controller to other parts of your SwiftUI interface. When you want your view controller to coordinate with other SwiftUI views, you must provide a Coordinator instance to facilitate those interactions. For example, you use a coordinator to forward target-action and delegate messages from your view controller to any SwiftUI views.

There are a lot of concepts here: view lifecycle, notification, delegation and communication with Coordinator. :
cold_sweat: But don't worry, with an example you will see how easy it is to use `UIViewRepresentable`
and `UIViewControllerRepresentable`.

#### Implementation

In this example we will create a simple app that will let the user select a document using and instance of the UIKit
based controller `UIDocumentPickerViewController` and we will print the name of the file selected using a customized
UIKit `UILabel`. Let's start from the custom UIKit `UILabel` view. To use our custom `UILabel` in SwiftUI we need to
wrap it in a struct that implements the first protocol we saw above: `UIViewRepresentable`. This protocol contains two
methods:

- `makeUIView(context: Self.Context) -> Self.UIViewType`, a method where you create the UIKit to be used in SwiftUI
- `updateUIView(_ uiView: Self.UIViewType, context: Self.Context)` a method called when the view must be redrawn due to
  external changes (e.g. a State update)

The `Self.UIViewType` type is
an [associated type](https://www.hackingwithswift.com/articles/74/understanding-protocol-associated-types-and-their-constraints "swift protocol associated type")
of the protocol and it must match the type of the UIKit view wrapped.  
So for our example we can implement a `DocumentNameLabel` struct that implements the `UIViewRepresentable` protocol. In
the `makeUIView` method we create an instance of the customized UILabel that we want to expose. In the `updateUIView` we
will update the text shown by the label with the value contained in a `@Binding` var updated from the container view (do
you
remember [what is a @Binding var](https://www.hackingwithswift.com/quick-start/swiftui/what-is-the-binding-property-wrapper "binding swiftui")
, right?).

```swift
struct DocumentNameLabel: UIViewRepresentable {
    @Binding var content: String

    func makeUIView(context: Context) -> UILabel {
        let label = UILabel()
        label.backgroundColor = #colorLiteral(red: 0.721568644, green: 0.8862745166, blue: 0.5921568871, alpha: 1)
        label.layer.borderColor = #colorLiteral(red: 0.2745098174, green: 0.4862745106, blue: 0.1411764771, alpha: 1)
        label.layer.borderWidth = 2
        return label
    }

    func updateUIView(_ uiView: UILabel, context: Context) {
        uiView.text = content
    }
}
```

After the view, we need to take care of the UIKit controller used to select the
document, `UIDocumentPickerViewController`. We will wrap it in a struct that implements
the `UIViewControllerRepresentable`. This protocol contains four methods:

- `makeUIViewController(context: Self.Context) -> Self.UIViewControllerType`, a method used to create the instance of
  the view controller to be used in your SwiftUI screen
- `updateUIViewController(Self.UIViewControllerType, context: Self.Context)`, a method called when the view controller
  must be redrawn/updated due to external changes (e.g. a State update)
- `makeCoordinator() -> Self.Coordinator`, a method used to create the custom instance that you use to communicate
  changes from your view controller to other parts of your SwiftUI interface
- `static func dismantleUIViewController(Self.UIViewControllerType, coordinator: Self.Coordinator)`, a method called to
  clean up additional resources used by the view controller when it is dismissed

As for the previous protocol, The `Self.UIViewControllerType` type is
an [associated type](https://www.hackingwithswift.com/articles/74/understanding-protocol-associated-types-and-their-constraints "swift protocol associated type")
of the protocol and he must match the type of the UIViewController wrapped.  
Le't start from the first method reported above, where we will create the instance of
the `UIDocumentPickerViewController` that we want to expose to SwiftUI. The delegate of this controller will be
the `Coordinator` instance created in the `makeCoodinator` protocol method. So the Coordinator will be responder for all
the `UIDocumentPickerDelegate` methods. Remember that the `makeCoordinator` method is called before everything else when
we will create our `DocumentPickerViewController` instance in SwiftUI. The `Coordinator` receive a reference to the
wrapping struct. This reference is used to trigger a custom callback contained in the `var callback: (URL) -> ()`
property that is received at `DocumentPickerViewController` construction time when
the `documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL])` method of
the `UIDocumentPickerDelegate` protocol is invoked. In this way we are able to send back to SwiftUI the result of the
interaction with the `UIDocumentPickerViewController`. Last but not least there's also the `updateUIViewController`
method, but in this case with an empty implementation because we don't need to update the status of the view controller
using some SwiftUI state change.

```swift
struct DocumentPickerViewController: UIViewControllerRepresentable {
    var callback: (URL) -> ()

    func makeCoordinator() -> Coordinator {
        return Coordinator(documentController: self)
    }

    func updateUIViewController(
        _ uiViewController: UIDocumentPickerViewController,
        context: UIViewControllerRepresentableContext<DocumentPickerViewController>) {
    }

    func makeUIViewController(context: Context) -> UIDocumentPickerViewController {
        let controller = UIDocumentPickerViewController(documentTypes: [String(kUTTypeText)], in: .open)
        controller.delegate = context.coordinator
        return controller
    }

    class Coordinator: NSObject, UIDocumentPickerDelegate {
        var documentController: DocumentPickerViewController

        init(documentController: DocumentPickerViewController) {
            self.documentController = documentController
        }

        func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
            guard let url = urls.first, url.startAccessingSecurityScopedResource() else { return }
            defer { url.stopAccessingSecurityScopedResource() }
            documentController.callback(urls[0])
        }
    }
}
```

Now we are ready to use our UIKit controller and our custom UIView in a SwiftUI view. We can just add them to the `body`
field of our view and use them as a standard SwiftUI component. One thing to be noted is the set of the `frame` on
the `DocumentNameLabel` component. This is a consequence of the fact that sometimes the UIKit views wrapped with
the `UIViewRepresentable` protocol take as much space as they can in a `VStack` component. This means that if we don't
set the frame in our example the label would take the majority of the screen space (leaving only the space for button to
be shown).

```swift
struct ContentView: View {
    @State var isDocumentPickerPresented: Bool = false
    @State var documentUrl: String = ""

    var body: some View {
        VStack{
            Spacer()
            DocumentNameLabel(content: self.$documentUrl)
                .frame(height: 40)
            Button(action: {
                self.isDocumentPickerPresented.toggle()
            }, label: { Text("Document selection") })
                .frame(height: 40, alignment: .center)
                .sheet(isPresented: self.$isDocumentPickerPresented, content: {
                    DocumentPickerViewController { url in
                        self.documentUrl = url.lastPathComponent
                    }
                })
            Spacer()
        }
        .padding(10)
    }
}
```

#### Conclusion

You can find all the code above in
this [example repository on Github](https://github.com/chicio/Use-UIKit-In-SwiftUI "github swiftui uikit"). Don't
hesitate to clone it and start to play with the example. `UIViewRepresentable` and `UIViewControllerRepresentable` are
the tools provided by Apple to let you mix the power and versatility of UIKit with the declarative reactive approach of
SwiftUI. I hope that in next future releases of the iOS SDK there will be no need to write this custom wrapper
components at least for all the standard UIKit components.
