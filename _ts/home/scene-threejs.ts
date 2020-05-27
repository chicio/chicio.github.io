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
  MeshPhysicalMaterialParameters,
  PlaneGeometry,
  GammaEncoding
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { animation } from '../common/animation'

interface Object3D {
  path: string;
  properties: MeshPhysicalMaterialParameters;
  position: Vector3;
  rotation: Vector3;
}

const lucy = (): Object3D => ({
  path: 'assets/models/lucy.ply',
  properties: {
    color: 0x3F51B5,
    roughness: 0.5,
    metalness: 0.7,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
    reflectivity: 0.7
  },
  position: new Vector3(3, -3, 0),
  rotation: new Vector3(0, -Math.PI / 3.0, 0)
})

const dragon = (): Object3D => ({
  path: 'assets/models/dragon.ply',
  properties: {
    color: 0x448AFF,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 0.0,
    clearcoatRoughness: 0.2,
    reflectivity: 1
  },
  position: new Vector3(-3, -3, 0),
  rotation: new Vector3(0, -Math.PI, 0)
})

const bunny = (): Object3D => ({
  path: 'assets/models/bunny.ply',
  properties: {
    color: 0xCCFFFF,
    roughness: 0.9,
    metalness: 0.1,
    clearcoat: 0.0,
    clearcoatRoughness: 0.5,
    reflectivity: 0.1
  },
  position: new Vector3(0, -3, 1.5),
  rotation: new Vector3(0, -Math.PI, 0)
})

const camera3D = (): PerspectiveCamera => {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 8
  camera.position.y = 0
  camera.position.x = 0
  return camera
}

const renderer3D = (): WebGLRenderer => {
  const renderer = new WebGLRenderer({ alpha: true })
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = GammaEncoding
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight)
  return renderer
}

const orbitsControls = (camera: PerspectiveCamera, renderer: WebGLRenderer): OrbitControls => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.autoRotate = true
  controls.enablePan = false
  controls.keyPanSpeed = 7.0
  controls.enableKeys = false
  controls.target = new Vector3(0, 0, 0)
  controls.dispose()
  return controls
}

const setWindowResizeListener = (camera: PerspectiveCamera, renderer: WebGLRenderer): void => {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)
}

const setup = (renderer: WebGLRenderer, camera: PerspectiveCamera, scene: Scene): void => {
  document.getElementById('rendering-surface')?.appendChild(renderer.domElement)
  scene.background = new Color(0x303F9F)
  setWindowResizeListener(camera, renderer)
}

const pointLight = (): PointLight => {
  const light = new PointLight(0xffffff, 1, 20, 2)
  light.power = 1700
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.height = 512
  light.shadow.radius = 1.5
  light.position.set(0, 5, 3)
  return light
}

const lights = (scene: Scene): void => {
  scene.add(pointLight())
  scene.add(new HemisphereLight(0x303F9F, 0x000000, 1))
}

const stars = (textureLoader: TextureLoader, completeLoad: (starts: Points) => void): void => {
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

const meshWithPBRMaterial = (plyLoader: PLYLoader, object: Object3D, completeLoad: (mesh: Mesh) => void): void => {
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

const floor = (textureLoader: TextureLoader, completionFunction: (mesh: Mesh) => void): void => {
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

const showRenderingSurfaceAnimation = (): void => animation('rendering-surface', 'show')

const renderLoop = (renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera, orbit: OrbitControls): void => {
  const renderFrame = (): void => {
    requestAnimationFrame(renderFrame)
    orbit.update()
    renderer.render(scene, camera)
  }
  showRenderingSurfaceAnimation()
  renderFrame()
}

const sceneThreeJS = (): void => {
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
  DefaultLoadingManager.onLoad = (): void => renderLoop(renderer, scene, camera, orbit)
}

export { sceneThreeJS }
