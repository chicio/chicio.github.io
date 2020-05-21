---
layout: post
title: "Use UIKit components in SwiftUI: UIViewControllerRepresentable and UIViewRepresentable"
description: "Do you know that it is possible to use UKit components in SwiftUI? Let's see how you can use UIViewRepresentable and UIViewControllerRepresentable to use your UIKit based component or to fill the gap for missing SwiftUI API."
date: 2020-06-08
image: /assets/images/posts/XXXX
tags: [computer graphics]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*Do you know that it is possible to use UKit components in SwiftUI? Let's see how you can use UIViewRepresentable and UIViewControllerRepresentable to use your UIKit based component or to fill the gap for missing SwiftUI API.*

---

SwiftUI has been around for almost year now. With its reactive paradigm approach it is a big step forward when compared to the UIKit imperative approach. But as a consequence of the fact that UIKit has been with us [for almost twelve years](https://en.wikipedia.org/wiki/IOS_SDK) and there are millions of apps already publish on the app store, a lot of developers have tons of UKit based library and custom components. Another interesting point is the fact that at the moment of this writing a lot of UIKit components from the iOS SDK  are [missing a counterpart in SwiftUI](https://www.hackingwithswift.com/quick-start/swiftui/answering-the-big-question-should-you-learn-swiftui-uikit-or-both "uikit missing swiftui").  
Anyway, you are just starting to develop a new app and you want to create it in SwiftUI (targeting only for iOS 13 because, you know, SwiftUI is compatible only with it :laughing:) without losing the ability to speed up you development by reusing your UIKit based libraries and components. Is there a solution to this problem? Yes!! :relaxed:
In this post I will show you how you can leverage the power of `UIViewRepresentable` and `UIViewControllerRepresentable` protocols to expose your UIKit views and controller as standard SwiftUI components. Before going deeper with an example let's see the definition of this two protocol from the official Apple documentation. Let's start from `UIViewRepresentable`:

>UIViewRepresentable. A wrapper for a UIKit view that you use to integrate that view into your SwiftUI view hierarchy...Adopt this protocol in one of your app's custom instances, and use its methods to create, update, and tear down your view. The creation and update processes parallel the behavior of SwiftUI views, and you use them to configure your view with your app's current state information...  
  
And here we have the other one for `UIViewControllerRepresentable`:

>UIViewControllerRepresentable. A view that represents a UIKit view controller...Adopt this protocol in one of your app's custom instances, and use its methods to create, update, and tear down your view controller. The creation and update processes parallel the behavior of SwiftUI views, and you use them to configure your view controller with your app's current state information...The system doesn't automatically communicate changes occurring within your view controller to other parts of your SwiftUI interface. When you want your view controller to coordinate with other SwiftUI views, you must provide a Coordinator instance to facilitate those interactions. For example, you use a coordinator to forward target-action and delegate messages from your view controller to any SwiftUI views.

There are a lot of concepts here: view lifecycle, notification, delegation and communication with Coordinator :cold_sweat: But don't worry, with an example you will see how easy it is to use `UIViewRepresentable` and `UIViewControllerRepresentable`.

#### Implementation

In this example we will create a simple app that will let the user select a document using and instance of the UIKit based controller `UIDocumentPickerViewController` and we will print the name of file selected using a UIKit `UILabel`. ...


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

```swift
struct DocumentPickerViewController: UIViewControllerRepresentable {
    var callback: (URL) -> ()

    func makeCoordinator() -> Coordinator {
        return Coordinator(documentController: self)
    }

    func updateUIViewController(_ uiViewController: UIDocumentPickerViewController,
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

