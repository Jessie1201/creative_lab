import * as THREE from 'three';
import * as dat from 'dat.gui';

let scene, camera, renderer, cube;

let createCube = function () {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
        color: 'blue',
        wireframe: true
    })
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

// set up the environment -
// initiallize scene, camera, objects and renderer
let init = function () {
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    // camera
    camera = new THREE.PerspectiveCamera(60,
        window.innerWidth / window.innerHeight,
        1, 1000);
    camera.position.z = 5;

    // objects
    // let axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);
    createCube();

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
};

// main animation loop - calls 50-60 in a second.
let mainLoop = function () {
    let ADD = 0.01;
    console.log("Hello");
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
    cube.rotation.x += ADD;
    cube.rotation.y += ADD;
    cube.rotation.z += ADD;
};

// ------------- Run program ------------ //
init();
mainLoop();

// -------------- Debug ----------------- //
const gui = new dat.GUI();
gui.add(camera.position, 'x');
gui.add(camera.position, 'y');
gui.add(camera.position, 'z');

let axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);