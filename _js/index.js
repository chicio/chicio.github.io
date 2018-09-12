import OrbitControls from 'orbit-controls-es6';
import * as THREE from 'three';
import PLYLoader from 'three-ply-loader';
import isWebGLEnabled from 'detector-webgl';
import {TweenLite, TweenMax, TimelineLite, Elastic} from "gsap";
import ScrollMagic from 'scrollmagic';
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
import {cookieConsent} from './cookie-consent'
import {fontLoader} from './font-loader';
import {isAMobileDevice} from "./mobile-device-detector";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

$(document).ready(() => {
    cookieConsent();
    const isMobileDevice = isAMobileDevice();
    const controller = new ScrollMagic.Controller();
    enableScroll();
    fontLoader();
    addArrowDownClickEvent(isMobileDevice);
    startHeaderAnimation(isMobileDevice);
    whoIAmAnimation(controller);
});

const enableScroll = () => $("html").css('overflow-y','auto');

const resizeViewport = (isMobile) => {
    if (isMobile === true) {
        const bg = $("#profile-introduction, #rendering-surface, canvas");
        $(window).resize(() => bg.height($(window).height() + 60));
        bg.height($(window).height() + 60);
    }
};

function addArrowDownClickEvent(isMobileDevice) {
    if (isMobileDevice === false) {
        $("#down-arrow").click(event => {
            event.preventDefault();
            TweenLite.to(window, 2, {scrollTo: "#who-am-i-container"});
        });
    }
}

function profileAnimation(completeFunction) {
    TweenMax.to(".center-content", 0.5, {
        opacity: 1,
        onComplete: completeFunction
    });
    downArrowAnimation();
}

function whoIAmAnimation(controller) {
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

function createLight() {
    var lightGeometry = new THREE.SphereGeometry(0);
    var lightMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000
    });
    var light = new THREE.PointLight(0xffffff, 1, 20, 2);
    light.power = 1700;
    light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.heigth = 512;
    light.shadow.radius = 1.5;
    light.add(new THREE.Mesh(lightGeometry, lightMaterial));
    light.position.set(0, 5, 3);
    return light;
}

function createCamera() {
    var camera = new THREE.PerspectiveCamera(75, $(window).width() / $(window).height(), 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 0;
    camera.position.x = 0;
    return camera;
}

function createHemisphereLight() {
    return new THREE.HemisphereLight(0x303F9F, 0x000000, 1);
}

function loadStars(textureLoader, completeLoad) {
    textureLoader.load("assets/models/textures/circle.png", function (texture) {
        var starsGeometry = new THREE.Geometry();
        for (var i = 0; i < 10000; i++) {
            var star = new THREE.Vector3();
            star.x = 2000 * Math.random() - 1000;
            star.y = 2000 * Math.random();
            star.z = 2000 * Math.random() - 1000;
            starsGeometry.vertices.push(star)
        }
        var starsMaterial = new THREE.PointsMaterial({
            color: 0x888888,
            map: texture,
            transparent: true,
        });
        var stars = new THREE.Points(starsGeometry, starsMaterial);
        completeLoad(stars);
    });
}

function loadPlyModelUsingPhysicalMaterial(plyLoader, path, parameters, position, rotation, completeLoad) {
    plyLoader.load(path, function (geometry) {
        var material = new THREE.MeshPhysicalMaterial(parameters);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        mesh.castShadow = true;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        completeLoad(mesh);
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

function setWindowResizeListener(camera, renderer) {
    window.addEventListener('resize', function () {
        camera.aspect = $(window).width() / $(window).height();
        camera.updateProjectionMatrix();
        renderer.setSize($(window).width(), $(window).height());
    }, false);
}

function createOrbitsControls(camera, renderer) {
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.enablePan = false;
    controls.keyPanSpeed = 7.0;
    controls.enableKeys = false;
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.mouseButtons = {};
    controls.dispose();
    return controls;
}

function createRenderer() {
    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.physicallyCorrectLights = true;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize($(window).width(), $(window).height());
    return renderer;
}

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
    var scene = new THREE.Scene();
    var camera = createCamera();
    var textureLoader = new THREE.TextureLoader();
    var plyLoader = new THREE.PLYLoader();
    var renderer = createRenderer();
    var controls = createOrbitsControls(camera, renderer);
    document.getElementById("rendering-surface").appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x303F9F);
    scene.add(createLight());
    scene.add(createHemisphereLight());
    loadStars(textureLoader, function (stars) {
        scene.add(stars);
    });
    loadPlyModelUsingPhysicalMaterial(
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
    loadPlyModelUsingPhysicalMaterial(
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
    loadPlyModelUsingPhysicalMaterial(
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
    var render = function () {
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
