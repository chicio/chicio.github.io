---
layout: post
title: "SceneKit and physically based rendering"
description: "In this post I will you guide you in the creation of a scene using SceneKit and its physically based rendering features."
date: 2017-08-11
tags: [computer graphics, physically based rendering]
comments: true
seo:
 - type: "BlogPosting"
---

*In this post I will you guide you in the creation of a scene using SceneKit and its physically based rendering features.*

---

SceneKit is one of the Apple framework I love the most. What is exaclty SceneKit? Let's see the definition from the developer apple website:

>SceneKit combines a high-performance rendering engine with a descriptive API for import, manipulation, and rendering of 3D assets. Unlike lower-level APIs such as Metal and OpenGL that require you to implement in precise detail the rendering algorithms that display a scene, SceneKit requires only descriptions of your scene’s contents and the actions or animations you want it to perform.

As you can see from the definition there's a lot of stuff inside it. Basically by using SceneKit you will be able to create games and other 3D application without the need to know any computer graphics algorithms, physics simulations stuff and so on. You basically describe a Scene in terms of objects and features and Apple will do everything for you :sunglasses:.  
One of the most interesting thing about SceneKit on the computer graphics side has been introduced in 2016: physically based rendering (PBR).  
We've already seen what physically based rendering is in [a previous post](https://www.fabrizioduroni.it/2017-10-10-physically-based-rendering-introduction.html "physically based introduction post"), so you already know its theoretical foundation stuff (or go to check it in case :wink:). So that means that SceneKit could render our scene using its own entirely new physically based rendering engine. Is it worth it? Sure!! :blush:  Thi is way in this post we will create a scene from scratch that uses the main physically based features you can find inside SceneKit. At the end of this post you will be able to render the scene contained in the image below. So it's time to start coding!!

![Physically based scene right](https://raw.githubusercontent.com/chicio/Exploring-SceneKit/master/Screenshots/physically-based-rendering-scene-right.jpg "Physically based scene right")


The general approch used in the construction of the scene will be the following: for each main scene category component we will create a class that encapsulate the creation of the `SCNNode`, the base SceneKit unit element, and its setup to obtain the feature we want.  
The first class we are going to create a `Light` class that encapsulate the base features we need to set on the light: position, rotation and generic color. Light in SceneKit are represented using the `SCNLight` class. 

```swift
class Light {
    let node: SCNNode
    
    init(lightNode: SCNNode) {
        node = lightNode
    }
    
    init(lightFeatures: LightFeatures) {
        node = SCNNode()
        createLight()
        set(lightFeatures: lightFeatures)
    }
    
    func createLight() {
        node.light = SCNLight()
    }
    
    private func set(lightFeatures: LightFeatures) {
        node.light?.color = lightFeatures.color
        node.position = lightFeatures.position
        node.eulerAngles = lightFeatures.orientation;
    }
}
```

The basic features of the light must be passed at construction time using a `LightFeatures` objects.

```swift
class LightFeatures {
    let position: SCNVector3
    let orientation: SCNVector3
    let color: UIColor
    
    init(position: SCNVector3, orientation: SCNVector3, color: UIColor) {
        self.position = position
        self.orientation = orientation
        self.color = color
    }
}
```

We are now ready to create our `PhysicallyBasedLight` as an child of `Light` class. Our physically based light will be of type `.directional`, and we will customize its `intensity` and `temperature`. The intensity is the flux of the light (again, go to check [my first post](https://www.fabrizioduroni.it/2017-10-10-physically-based-rendering-introduction.html "physically based introduction post") if you don't know what it is :stuck_out_tongue:), and the second one is the color temperature expressed in Kelvin (remeber: 6500 correspond to pure white sunlight). We also activate other interesting features: by setting `castsShadow` to `true` we activate the rendering of shadow using shadow mapping technique, and by setting `orthographicScale` to `10` we extend a little bit the visible area the construction of the shadow map.

```swift
class PhysicallyBasedLight: Light {
    
    init(lightFeatures: LightFeatures, physicallyBasedLightFeatures: PhysicallyBasedLightFeatures) {
        super.init(lightFeatures: lightFeatures)
        set(physicallyBasedLightFeatures: physicallyBasedLightFeatures)
        activateShadow()
    }
    
    private func set(physicallyBasedLightFeatures: PhysicallyBasedLightFeatures) {
        node.light?.type = .directional
        node.light?.intensity = physicallyBasedLightFeatures.lumen
        node.light?.temperature = physicallyBasedLightFeatures.temperature
    }
    
    private func activateShadow() {
        node.light?.castsShadow = true
        node.light?.orthographicScale = 10        
    }
}
```
As for the basic light, we create also for the physically based features an class that will store the configuration and that must be injected at construction time (as you can see from the previous class init), that we will call `PhysicallyBasedLightFeatures`.

```swift
class PhysicallyBasedLightFeatures {
    let lumen: CGFloat
    let temperature: CGFloat
    
    init(lumen: CGFloat, temperature: CGFloat) {
        self.lumen = lumen
        self.temperature = temperature
    }
}
```

For physically based rendering we need also another kind of lighting setup to achieve the best result. We need to set on the `SCNScene`, the object that contains all the `SCNNode` elements of a scene, the `lightingEnviroment` and `background` properties. These ones let SceneKit approximate more accurately the indirect lighting calculation. To set this features we create a new class, `PhysicallyBasedLightingEnviroment`, that will receive the scene to setup. On that this class will set a cubemap on the `lightingEnviroment.contents` property and its intensity on the `lightingEnviroment.intensity` property. To match the result of this lighting setup, it will set the `background.contents` with the same cubemap used before. 

```swift
class PhysicallyBasedLightingEnviroment {
    let cubeMap: [String]
    let intensity: CGFloat
    
    init(cubeMap: [String], intensity: CGFloat) {
        self.cubeMap = cubeMap
        self.intensity = intensity
    }
    
    func setLightingEnviromentFor(scene: SCNScene) {
        scene.lightingEnvironment.contents = cubeMap
        scene.lightingEnvironment.intensity = intensity
        scene.background.contents = cubeMap
    }
}
```

Next step: camera. We create a `Camera` class, that will contain a reference, again, to a `SCNNode` on which an `SCNCamera` has been defined. For the camera we need to set first of all some geometric properties like the position, rotation and the pivot point that we will use as reference for the animation of the camera. Last but not least we set the flag `wantHDR` to apply [High Dynamic Range](https://en.wikipedia.org/wiki/High_dynamic_range "High Dynamic Range") post processing to adjust the general brightness of the scene with respect to the display.

```swift
class Camera {
    let node: SCNNode
    
    init(cameraNode: SCNNode, wantsHDR: Bool = false) {
        node = cameraNode
        setAdvancedFeatures(wantsHDR: wantsHDR)
    }
    
    init(position: SCNVector3, rotation: SCNVector4, wantsHDR: Bool = false, pivot: SCNMatrix4? = nil) {
        node = SCNNode()
        createCameraOnNode()
        setAdvancedFeatures(wantsHDR: wantsHDR)
        set(position: position, rotation: rotation, pivot: pivot)
    }
    
    private func createCameraOnNode() {
        node.camera = SCNCamera()
    }
    
    private func setAdvancedFeatures(wantsHDR: Bool) {
        node.camera?.automaticallyAdjustsZRange = true
        node.camera?.wantsHDR = wantsHDR
    }
    
    private func set(position aPosition: SCNVector3, rotation aRotation: SCNVector4, pivot aPivot: SCNMatrix4?) {
        node.position = aPosition
        node.rotation = aRotation
        node.pivot = aPivot ?? node.pivot
    }
}
```

Now its time to think about the objects we want to display in the scene. For that reason we create a `Object`  class that will represent each kind of object we want to create in the scene. Obviously as for the previous classes, also the `Object` class will expose a `node` property of type `SCNNode` that represents our object in the scene. We define this class with multiple initializer that let as create object instance from various configuration: init as an empty object, init using a `SCNGeomtry` instance, using a mesh loaded as a `MDLObject` using the [Model I\O](https://developer.apple.com/documentation/modelio "Model I\O") Apple framework. This framework let us import/export 3D models in a wide range of common available formats.

```swift
class Object {
    let node: SCNNode
    
    init(position: SCNVector3, rotation: SCNVector4) {
        node = SCNNode()
        node.castsShadow = true
        set(position: position, rotation: rotation)
    }
    
    init(geometry: SCNGeometry, position: SCNVector3, rotation: SCNVector4) {
        node = SCNNode(geometry: geometry)
        node.castsShadow = true
        set(position: position, rotation: rotation)
    }
    
    init(mesh: MDLObject, position: SCNVector3, rotation: SCNVector4) {
        node = SCNNode(mdlObject: mesh)
        node.castsShadow = true
        set(position: position, rotation: rotation)
    }
    
    private func set(position: SCNVector3, rotation: SCNVector4) {
        node.position = position
        node.rotation = rotation
    }
}
```

Now we are ready to define a `PhysicallyBasedObject` class that will inherit all the capabilities of the `Object` class and will set all the features needed to make the object rendered using physically based rendering. Even if all the initializer are available to this subclass, we will require a mesh as `MDLObject` at construction, because we will display a some particular mesh objects (we will discuss about them later). At constrution time we will require also a position and rotation and `PhysicallyBasedMaterial` material. By assigning it to the `firstMaterial` property of the `geometry` of our node, our object will be rendered as a physically based object using the SceneKit physically based rendering engine. NB: the mesh that we will use doesn't contain any material so by assigning the `firstMaterial` property the mesh will use it for the entire surface.

```swift
class PhysicallyBasedObject: Object {
    
    init(mesh: MDLObject, material: PhysicallyBasedMaterial, position: SCNVector3, rotation: SCNVector4) {
        super.init(mesh: mesh, position: position, rotation: rotation)
        node.geometry?.firstMaterial = material.material
    }
}
```

So, the next question is: How is `PhysicallyBasedMaterial` composed? We create `PhysicallyBasedMaterial` as a class with a single property `material` of type `SCNMaterial`.
