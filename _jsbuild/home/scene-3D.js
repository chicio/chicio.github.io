import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import PLYLoader from 'three-ply-loader'
import isWebGLEnabled from 'detector-webgl'
import { isAMobileDevice } from '../common/mobile-device-detector'
import { animation } from '../common/animation'

const scene3D = () => {
  if (isWebGLEnabled && isAMobileDevice() === false) {
    setTimeout(sceneThreeJS, 3000)
  }
}

const sceneThreeJS = () => {
  PLYLoader(THREE)
  let plyLoader = new THREE.PLYLoader()
  let scene = new THREE.Scene()
  let textureLoader = new THREE.TextureLoader()
  const camera = camera3D()
  const renderer = renderer3D()
  const orbit = orbitsControls(camera, renderer)
  setup(renderer, camera, scene)
  lights(scene)
  stars(textureLoader, stars => scene.add(stars))
  meshWithPBRMaterial(plyLoader, lucy(), mesh => scene.add(mesh))
  meshWithPBRMaterial(plyLoader, dragon(), mesh => scene.add(mesh))
  meshWithPBRMaterial(plyLoader, bunny(), mesh => scene.add(mesh))
  floor(textureLoader, mesh => scene.add(mesh))
  THREE.DefaultLoadingManager.onLoad = () => renderLoop(renderer, scene, camera, orbit)
}

class Object3D {
  constructor (path, properties, position, rotation) {
    this.path = path
    this.properties = properties
    this.position = position
    this.rotation = rotation
  }
}

const lucy = () => new Object3D(
  'assets/models/lucy.ply',
  {
    color: 0x3F51B5,
    roughness: 0.5,
    metalness: 0.7,
    clearCoat: 0.5,
    clearCoatRoughness: 0.5,
    reflectivity: 0.7
  },
  new THREE.Vector3(3, -3, 0),
  new THREE.Vector3(0, -Math.PI / 3.0, 0)
)

const dragon = () => new Object3D(
  'assets/models/dragon.ply',
  {
    color: 0x448AFF,
    roughness: 0.1,
    metalness: 0.9,
    clearCoat: 0.0,
    clearCoatRoughness: 0.2,
    reflectivity: 1
  },
  new THREE.Vector3(-3, -3, 0),
  new THREE.Vector3(0, -Math.PI, 0)
)

const bunny = () => new Object3D(
  'assets/models/bunny.ply',
  {
    color: 0xCCFFFF,
    roughness: 0.9,
    metalness: 0.1,
    clearCoat: 0.0,
    clearCoatRoughness: 0.5,
    reflectivity: 0.1
  },
  new THREE.Vector3(0, -3, 1.5),
  new THREE.Vector3(0, -Math.PI, 0)
)

const orbitsControls = (camera, renderer) => {
  let controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.autoRotate = true
  controls.enablePan = false
  controls.keyPanSpeed = 7.0
  controls.enableKeys = false
  controls.target = new THREE.Vector3(0, 0, 0)
  controls.mouseButtons = {}
  controls.dispose()
  return controls
}

const setup = (renderer, camera, scene) => {
  document.getElementById('rendering-surface').appendChild(renderer.domElement)
  scene.background = new THREE.Color(0x303F9F)
  setWindowResizeListener(camera, renderer)
}

const renderLoop = (renderer, scene, camera, orbit) => {
  const renderFrame = () => {
    global.requestAnimationFrame(renderFrame)
    orbit.update()
    renderer.render(scene, camera)
  }
  showRenderingSurfaceAnimation()
  renderFrame()
}

const lights = (scene) => {
  scene.add(pointLight())
  scene.add(new THREE.HemisphereLight(0x303F9F, 0x000000, 1))
}

const camera3D = () => {
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 8
  camera.position.y = 0
  camera.position.x = 0
  return camera
}

const pointLight = () => {
  let light = new THREE.PointLight(0xffffff, 1, 20, 2)
  light.power = 1700
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.heigth = 512
  light.shadow.radius = 1.5
  light.position.set(0, 5, 3)
  return light
}

const renderer3D = () => {
  let renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.physicallyCorrectLights = true
  renderer.gammaInput = true
  renderer.gammaOutput = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight)
  return renderer
}

const stars = (textureLoader, completeLoad) => {
  textureLoader.load('assets/models/textures/circle.png', function (texture) {
    let starsGeometry = new THREE.Geometry()
    for (let i = 0; i < 10000; i++) {
      let star = new THREE.Vector3()
      star.x = 2000 * Math.random() - 1000
      star.y = 2000 * Math.random()
      star.z = 2000 * Math.random() - 1000
      starsGeometry.vertices.push(star)
    }
    let starsMaterial = new THREE.PointsMaterial({
      color: 0x888888,
      map: texture,
      transparent: true
    })
    let stars = new THREE.Points(starsGeometry, starsMaterial)
    completeLoad(stars)
  })
}

const meshWithPBRMaterial = (plyLoader, object, completeLoad) => {
  plyLoader.load(object.path, geometry => {
    let material = new THREE.MeshPhysicalMaterial(object.properties)
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(object.position.x, object.position.y, object.position.z)
    mesh.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z)
    mesh.castShadow = true
    mesh.matrixAutoUpdate = false
    mesh.updateMatrix()
    completeLoad(mesh)
  })
}

const floor = (textureLoader, completionFunction) => {
  textureLoader.load('assets/models/textures/marble.jpg', function (texture) {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(100, 100)
    let floorMat = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      metalness: 0.1,
      map: texture
    })
    let floorGeometry = new THREE.PlaneGeometry(1000, 1000)
    let floorMesh = new THREE.Mesh(floorGeometry, floorMat)
    floorMesh.receiveShadow = true
    floorMesh.rotation.x = -Math.PI / 2.0
    floorMesh.position.y = -3
    floorMesh.matrixAutoUpdate = false
    floorMesh.updateMatrix()
    completionFunction(floorMesh)
  })
}

const showRenderingSurfaceAnimation = () => animation('rendering-surface', 'show')

const setWindowResizeListener = (camera, renderer) => {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)
}

export { scene3D }
