cookieConsent();
$(document).ready(function () {
    var isMobileDevice = isAMobileDevice();
    var controller = new ScrollMagic.Controller();
    enableScroll();
    loadFonts();
    addTabsClickEvent(controller);
    addArrowDownClickEvent(isMobileDevice);
    sceneThreeJS(isMobileDevice);
    whoIAmAnimation(controller);
    projectsAnimation(controller);
    heartAnimation();
});

function enableScroll() {
    $("html").css('overflow-y','auto');
}

function resizeViewport(isMobile) {
    if (isMobile === true) {
        var bg = $("#profile-introduction, #rendering-surface, canvas");
        var resizeBackground = function () {
            bg.height($(window).height() + 60);
        };
        $(window).resize(resizeBackground);
        resizeBackground();
    }
}

function loadFonts() {
    WebFont.load({
        google: {families: ['Open Sans']}
    });
}

function cookieConsent() {
    window.addEventListener("load", function(){
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#9fa8da",
                    "text": "#ffffff"
                },
                "button": {
                    "background": "#448aff",
                    "text": "#ffffff"
                }
            },
            "theme": "classic",
            "content": {
                "dismiss": "Ok",
                "href": window.location.protocol + "//" +  window.location.host + "/cookie-policy.html",
                "message": "This website uses cookies to ensure you get the best experience."
            }
        })});
}

function addTabsClickEvent(controller) {
    var tabsNotOpened = {educationAndExperience: true};
    $("#profile-tabs").find("a").click(function (event) {
        showNewTab(event, $(this));
        if (isEducationTab() && educationTabHasNotBeenOpened(tabsNotOpened)) {
            timelineElementsAnimation(controller);
            updateTabsOpenedStatus(tabsNotOpened);
        } else {
            projectsAnimation(controller);
        }
    });
}

function addArrowDownClickEvent(isMobileDevice) {
    if (isMobileDevice === false) {
        $("#down-arrow").click(function (event) {
            event.preventDefault();
            TweenLite.to(window, 2, {scrollTo: "#who-am-i-container"});
        });
    }
}

function educationTabHasNotBeenOpened(tabsOpened) {
    return tabsOpened.educationAndExperience;
}

function updateTabsOpenedStatus(tabsOpened) {
    tabsOpened.educationAndExperience = !tabsOpened.educationAndExperience
}

function createTweenTimelineElement(idElement, completeFunction) {
    return TweenMax.staggerFrom(idElement, 1, {
        opacity: 0,
        onComplete: completeFunction
    }, 0.5);
}

function getTriggerElementIdForTimelineElement(cssId, index, timelineLength, timelineElements) {
    var idTriggerElement = cssId;
    if (index === timelineLength - 1) {
        idTriggerElement = "#" + $(timelineElements[timelineLength - 2]).attr('id');
    }
    return idTriggerElement;
}

function timelineElementsAnimation(controller) {
    var timelineElements = $('*[id^="timeline-element"]');
    var timelineLength = timelineElements.length;
    timelineElements.each(function (index) {
        var cssId = "#" + $(this).attr('id');
        var timelineElementTween = createTweenTimelineElement(cssId, function () {
            sceneTimeline.destroy();
        });
        var idTriggerElement = getTriggerElementIdForTimelineElement(
            cssId,
            index,
            timelineLength,
            timelineElements
        );
        var sceneTimeline = createScrollMagicScene(
            controller,
            idTriggerElement,
            timelineElementTween
        );
    });
}

function showNewTab(event, element) {
    event.preventDefault();
    element.tab('show');
}

function isEducationTab() {
    return $(".nav-tabs .active").attr("id") === "education-and-experience";
}

function profileAnimation(completeFunction) {
    var profileTimeline = new TimelineMax({onComplete: completeFunction});
    profileTimeline.to("#profile-name", 0.5, {opacity: 1, ease: Bounce.easeOut});
    profileTimeline.to("#profile-job", 0.5, {opacity: 1, ease: Bounce.easeOut});
    profileTimeline.to("#profile-image", 0.8, {scale: 1, ease: Bounce.easeOut});
    profileTimeline.staggerTo(".profile-icon", 0.25, {
        scale: 1,
        opacity: 1,
        ease: Bounce.ease
    }, 0.1);
    profileTimeline.to("#down-arrow", 0.5, {opacity: 1, ease: Power1.easeOut});
}

function projectAnimation(controller, imagePosition, idText, idImage) {
    var xPercent = calculateXPercentNeeded(imagePosition);
    var tweenImage = createTweenImage(idImage, xPercent.image);
    var tweenText = createTweenText(idText, xPercent.text, function () {
        sceneImage.destroy();
        sceneText.destroy();
    });
    var sceneImage = createScrollMagicScene(controller, idImage, tweenImage);
    var sceneText = createScrollMagicScene(controller, idText, tweenText);
}

function whoIAmAnimation(controller) {
    var whoAmIIconsRandomed = getRandomSortedIcons();
    var whoAmITimeline = createTimeLineWhoIAm(whoAmIIconsRandomed, "#who-am-i-description", function () {
        sceneWhoAmI.destroy();
    });
    var sceneWhoAmI = createScrollMagicScene(controller, "#who-am-i-description", whoAmITimeline);
}

function projectsAnimation(controller) {
    projectAnimation(controller, "right", "#spectral-clara-lux-tracer-info", "#spectral-clara-lux-tracer-image");
    projectAnimation(controller, "left", "#spectral-brdf-explorer-info", "#spectral-brdf-explorer-image");
    projectAnimation(controller, "right", "#ray-tracing-info", "#ray-tracing-image");
    projectAnimation(controller, "left", "#rangeuislider-info", "#rangeuislider-image");
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
    whoIAmTimeline.from(idWhoIAmDescription, 1, {opacity: 0, ease: SlowMo.linear});
    whoIAmTimeline.staggerFrom(whoIAmIconsRandomed, 1, {
        opacity: 0,
        scale: 0,
        ease: Elastic.easeInOut
    }, 0.1);
    return whoIAmTimeline;
}

function calculateXPercentNeeded(imagePosition) {
    var xPercentImage = -50;
    var xPercentText = 50;
    if (imagePosition === "right") {
        xPercentImage = 50;
        xPercentText = -50;
    }
    return {image: xPercentImage, text: xPercentText};
}

function createTweenImage(idImage, xPercentImage) {
    return TweenLite.from(idImage, 0.7, {
        opacity: 0,
        xPercent: xPercentImage
    });
}

function createTweenText(idText, xPercentText, completeFunction) {
    return TweenLite.from(idText, 0.7, {
        opacity: 0,
        xPercent: xPercentText,
        delay: 0.5,
        onComplete: completeFunction
    });
}

function createScrollMagicScene(controller, idElementTrigger, tween) {
    return new ScrollMagic.Scene({
        triggerElement: idElementTrigger
    }).setTween(tween).addTo(controller);
}

function heartAnimation() {
    TweenMax.from("#heart", 0.7, {
        scale: 0.4,
        repeat: -1,
        yoyo: true
    });
}

function downArrowAnimation() {
    TweenMax.to("#down-arrow", 0.5, {
        bottom: 45,
        repeat: -1,
        yoyo: true,
        delay: 0.5
    });
}

function isAMobileDevice() {
    var isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        isMobile = true;
    return isMobile;
}

function showRenderingSurfaceAnimation() {
    TweenMax.to("#rendering-surface", 0.5, {
        opacity: 1,
        delay: 0.5
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
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
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

function sceneThreeJS(isMobileDevice) {
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
        hideLoaderAnimation(function () {
            resizeViewport(isMobileDevice);
            profileAnimation(function () {
                render();
                downArrowAnimation();
                showRenderingSurfaceAnimation();
            });
        });
    };
}
