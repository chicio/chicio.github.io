import {
  Scene,
  TextureLoader,
  DefaultLoadingManager,
  Vector3,
  Color,
  HemisphereLight,
  PerspectiveCamera,
  PointLight,
  WebGLRenderer,
  PCFSoftShadowMap,
  Geometry,
  PointsMaterial,
  Points,
  MeshPhysicalMaterial,
  Mesh,
  RepeatWrapping,
  MeshStandardMaterial,
  PlaneGeometry
} from 'three/build/three.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js'
import { animation } from '../common/animation'

const sceneThreeJS = () => {
  const plyLoader = new PLYLoader()
  const scene = new Scene()
  const textureLoader = new TextureLoader()
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
  DefaultLoadingManager.onLoad = () => renderLoop(renderer, scene, camera, orbit)
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
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
    reflectivity: 0.7
  },
  new Vector3(3, -3, 0),
  new Vector3(0, -Math.PI / 3.0, 0)
)

const dragon = () => new Object3D(
  'assets/models/dragon.ply',
  {
    color: 0x448AFF,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 0.0,
    clearcoatRoughness: 0.2,
    reflectivity: 1
  },
  new Vector3(-3, -3, 0),
  new Vector3(0, -Math.PI, 0)
)

const bunny = () => new Object3D(
  'assets/models/bunny.ply',
  {
    color: 0xCCFFFF,
    roughness: 0.9,
    metalness: 0.1,
    clearcoat: 0.0,
    clearcoatRoughness: 0.5,
    reflectivity: 0.1
  },
  new Vector3(0, -3, 1.5),
  new Vector3(0, -Math.PI, 0)
)

const orbitsControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.autoRotate = true
  controls.enablePan = false
  controls.keyPanSpeed = 7.0
  controls.enableKeys = false
  controls.target = new Vector3(0, 0, 0)
  controls.mouseButtons = {}
  controls.dispose()
  return controls
}

const setup = (renderer, camera, scene) => {
  document.getElementById('rendering-surface').appendChild(renderer.domElement)
  scene.background = new Color(0x303F9F)
  setWindowResizeListener(camera, renderer)
}

const renderLoop = (renderer, scene, camera, orbit) => {
  const renderFrame = () => {
    requestAnimationFrame(renderFrame)
    orbit.update()
    renderer.render(scene, camera)
  }
  showRenderingSurfaceAnimation()
  renderFrame()
}

const lights = (scene) => {
  scene.add(pointLight())
  scene.add(new HemisphereLight(0x303F9F, 0x000000, 1))
}

const camera3D = () => {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 8
  camera.position.y = 0
  camera.position.x = 0
  return camera
}

const pointLight = () => {
  const light = new PointLight(0xffffff, 1, 20, 2)
  light.power = 1700
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.heigth = 512
  light.shadow.radius = 1.5
  light.position.set(0, 5, 3)
  return light
}

const renderer3D = () => {
  const renderer = new WebGLRenderer({ alpha: true })
  renderer.physicallyCorrectLights = true
  renderer.gammaInput = true
  renderer.gammaOutput = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight)
  return renderer
}

const stars = (textureLoader, completeLoad) => {
  textureLoader.load('assets/models/textures/circle.png', function (texture) {
    const starsGeometry = new Geometry()
    for (let i = 0; i < 10000; i++) {
      const star = new Vector3()
      star.x = 2000 * Math.random() - 1000
      star.y = 2000 * Math.random()
      star.z = 2000 * Math.random() - 1000
      starsGeometry.vertices.push(star)
    }
    const starsMaterial = new PointsMaterial({
      color: 0x888888,
      map: texture,
      transparent: true
    })
    const stars = new Points(starsGeometry, starsMaterial)
    completeLoad(stars)
  })
}

const meshWithPBRMaterial = (plyLoader, object, completeLoad) => {
  plyLoader.load(object.path, (geometry) => {
    geometry.computeVertexNormals()
    const material = new MeshPhysicalMaterial(object.properties)
    const mesh = new Mesh(geometry, material)
    mesh.position.set(object.position.x, object.position.y, object.position.z)
    mesh.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    completeLoad(mesh)
  })
}

const floor = (textureLoader, completionFunction) => {
  textureLoader.load('assets/models/textures/marble.jpg', function (texture) {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(100, 100)
    const floorMat = new MeshStandardMaterial({
      roughness: 0.7,
      metalness: 0.1,
      map: texture
    })
    const floorGeometry = new PlaneGeometry(1000, 1000)
    const floorMesh = new Mesh(floorGeometry, floorMat)
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

export { sceneThreeJS }