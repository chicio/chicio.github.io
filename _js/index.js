import * as THREE from 'three';
import PLYLoader from 'three-ply-loader';
import isWebGLEnabled from 'detector-webgl';
import {Elastic, TimelineLite, TweenLite, TweenMax} from "gsap";
import ScrollMagic from 'scrollmagic';
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
import jQuery from "jquery";
import {cookieConsent} from './cookie-consent'
import {fontLoader} from './font-loader';
import {isAMobileDevice} from "./mobile-device-detector";
import {enableScroll} from "./scroll-manager";
import {camera3D, meshWithPBRMaterial, orbitsControls, pointLight, renderer3D, stars} from "./scene-3D";

window.$ = window.jQuery = jQuery;

$(document).ready(() => {
    cookieConsent();
    enableScroll();
    fontLoader();
    startHeaderAnimation(isAMobileDevice());
    whoIAmAnimation();
});

const resizeViewport = (isMobile) => {
    if (isMobile === true) {
        const bg = $("#profile-introduction, #rendering-surface, canvas");
        $(window).resize(() => bg.height($(window).height() + 60));
        bg.height($(window).height() + 60);
    }
};

function profileAnimation(completeFunction) {
    TweenMax.to(".center-content", 0.5, {
        opacity: 1,
        onComplete: completeFunction
    });
    downArrowAnimation();
}

function whoIAmAnimation() {
    const controller = new ScrollMagic.Controller();
    var whoAmIIconsRandomed = getRandomSortedIcons();
    var whoAmITimeline = createTimeLineWhoIAm(whoAmIIconsRandomed, "#who-am-i-description", function () {
        sceneWhoAmI.destroy();
    });
    var sceneWhoAmI = createScrollMagicScene(controller, "#who-am-i-description", whoAmITimeline);
}

function getRandomSortedIcons() {
    var whoIAmIcons = $(".who-am-i-icon").toArray();
    whoIAmIcons.sort(function () {
        return 0.5 - Math.random()
    });
    return whoIAmIcons;
}

function createTimeLineWhoIAm(whoIAmIconsRandomed, idWhoIAmDescription, completeFunction) {
    var whoIAmTimeline = new TimelineLite({onComplete: completeFunction});
    whoIAmTimeline.staggerFrom(whoIAmIconsRandomed, 1, {
        opacity: 0,
        scale: 0,
        ease: Elastic.easeInOut
    }, 0.1);
    return whoIAmTimeline;
}

function createScrollMagicScene(controller, idElementTrigger, tween) {
    return new ScrollMagic.Scene({
        triggerElement: idElementTrigger
    }).setTween(tween).addTo(controller);
}

function downArrowAnimation() {
    TweenMax.to("#down-arrow", 0.5, {
        opacity: 1
    });
}

function showRenderingSurfaceAnimation() {
    TweenMax.to("#rendering-surface", 0.5, {
        opacity: 1,
        delay: 0.2
    });
}

function hideLoaderAnimation(completionFunction) {
    TweenLite.to("#loader", 0.3, {
        opacity: 0,
        onComplete: completionFunction
    });
}

function loadFloor(textureLoader, completionFunction) {
    textureLoader.load("assets/models/textures/marble.jpg", function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(100, 100);
        var floorMat = new THREE.MeshStandardMaterial({
            roughness: 0.7,
            metalness: 0.1,
            map: texture
        });
        var floorGeometry = new THREE.PlaneGeometry(1000, 1000);
        var floorMesh = new THREE.Mesh(floorGeometry, floorMat);
        floorMesh.receiveShadow = true;
        floorMesh.rotation.x = -Math.PI / 2.0;
        floorMesh.position.y = -3;
        floorMesh.matrixAutoUpdate = false;
        floorMesh.updateMatrix();
        completionFunction(floorMesh);
    });
}

const setWindowResizeListener = (camera, renderer) => {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
};

function startThreeJSSceneIfSupported(isMobileDevice) {
    if (isWebGLEnabled && isMobileDevice === false) {
        sceneThreeJS();
    }
}

function startHeaderAnimation(isMobileDevice) {
    hideLoaderAnimation(function () {
        resizeViewport(isMobileDevice);
        profileAnimation(function () {
            startThreeJSSceneIfSupported(isMobileDevice);
        });
    });
}

function sceneThreeJS() {
    PLYLoader(THREE);
    let plyLoader = new THREE.PLYLoader();
    let scene = new THREE.Scene();
    let textureLoader = new THREE.TextureLoader();
    let camera = camera3D();
    let renderer = renderer3D();
    let controls = orbitsControls(camera, renderer);
    document.getElementById("rendering-surface").appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x303F9F);
    scene.add(pointLight());
    scene.add(new THREE.HemisphereLight(0x303F9F, 0x000000, 1));
    stars(textureLoader, function (stars) {
        scene.add(stars);
    });
    meshWithPBRMaterial(
        plyLoader,
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
        new THREE.Vector3(0, -Math.PI / 3.0, 0),
        function (mesh) {
            scene.add(mesh);
        }
    );
    meshWithPBRMaterial(
        plyLoader,
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
        new THREE.Vector3(0, -Math.PI, 0),
        function (mesh) {
            scene.add(mesh);
        }
    );
    meshWithPBRMaterial(
        plyLoader,
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
        new THREE.Vector3(0, -Math.PI, 0),
        function (mesh) {
            scene.add(mesh);
        }
    );
    loadFloor(textureLoader, function (mesh) {
        scene.add(mesh);
    });
    const render = () => {
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    };
    setWindowResizeListener(camera, renderer);
    THREE.DefaultLoadingManager.onLoad = function () {
        render();
        showRenderingSurfaceAnimation();
    };
}
