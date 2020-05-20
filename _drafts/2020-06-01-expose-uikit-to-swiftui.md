---
layout: post
title: "Use UIKit components in SwiftUI: UIViewControllerRepresentable and UIViewRepresentable"
description: "."
date: 2020-05-20
image: /assets/images/posts/dark-side-dark-mode.jpg
tags: [computer graphics]
comments: true
math: false
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni] 
---

*.*

---


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