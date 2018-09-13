import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";

const orbitsControls = (camera, renderer) => {
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.enablePan = false;
    controls.keyPanSpeed = 7.0;
    controls.enableKeys = false;
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.mouseButtons = {};
    controls.dispose();
    return controls;
};

const camera3D = () => {
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 0;
    camera.position.x = 0;
    return camera;
};

const pointLight = () => {
    let light = new THREE.PointLight(0xffffff, 1, 20, 2);
    light.power = 1700;
    light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.heigth = 512;
    light.shadow.radius = 1.5;
    light.position.set(0, 5, 3);
    return light;
};

const renderer3D = () => {
    let renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.physicallyCorrectLights = true;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize($(window).width(), $(window).height());
    return renderer;
};

const stars = (textureLoader, completeLoad) => {
    textureLoader.load("assets/models/textures/circle.png", function (texture) {
        let starsGeometry = new THREE.Geometry();
        for (let i = 0; i < 10000; i++) {
            let star = new THREE.Vector3();
            star.x = 2000 * Math.random() - 1000;
            star.y = 2000 * Math.random();
            star.z = 2000 * Math.random() - 1000;
            starsGeometry.vertices.push(star)
        }
        let starsMaterial = new THREE.PointsMaterial({
            color: 0x888888,
            map: texture,
            transparent: true,
        });
        let stars = new THREE.Points(starsGeometry, starsMaterial);
        completeLoad(stars);
    });
};

const meshWithPBRMaterial = (plyLoader, path, parameters, position, rotation, completeLoad) => {
    plyLoader.load(path, geometry => {
        let material = new THREE.MeshPhysicalMaterial(parameters);
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        mesh.castShadow = true;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        completeLoad(mesh);
    });
};

export {orbitsControls, pointLight, renderer3D, stars, meshWithPBRMaterial, camera3D}

