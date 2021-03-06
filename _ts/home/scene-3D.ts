import { isAMobileDevice } from '../common/mobile-device-detector'

const isWebGLEnabled = (): boolean => {
  const c = document.createElement('canvas');
  try {
    return !!window.WebGLRenderingContext && (!!c.getContext('experimental-webgl') || !!c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

const scene3D = (): void => {
  if (isWebGLEnabled() && !isAMobileDevice()) {
    setTimeout(() => { 
      import(/* webpackChunkName: "scene-threejs" */ './scene-threejs').then(module => module.sceneThreeJS())
    }, 3000);
  }
}

export { scene3D }