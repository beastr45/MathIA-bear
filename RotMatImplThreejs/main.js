import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 10, 10).normalize();
scene.add(directionalLight);

const light = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(light);

const loader = new GLTFLoader();
let monkey; // Declare monkey outside loader callback for scope

loader.load('assets/untitled.glb', function (gltf) {
    monkey = gltf.scene;
    scene.add(monkey);

    if (monkey.children.length > 0 && monkey.children[0].isMesh) {
        const mesh = monkey.children[0];
        const newColor = new THREE.Color(0xf300f0); // Magenta color
        mesh.material.color.copy(newColor);
    }

    animate(); // Start animation after loading
}, undefined, function (error) {
    console.error(error);
});

camera.position.z = 8;

const myMatrix = new THREE.Matrix4();
const clock = new THREE.Clock();

function animate() {
    // Get the elapsed time since the last frame
    const deltaTime = clock.getDelta();

    myMatrix.identity();

    // In RPM
    const rotationSpeed = (30 / 60) * (2 * Math.PI); // Adjust the rotation speed as needed

    const rotationAngle = deltaTime * rotationSpeed;
    myMatrix.set(
        Math.cos(rotationAngle),  0, Math.sin(rotationAngle), 0,   // Row 1
        0, Math.cos(rotationAngle), -Math.sin(rotationAngle), 0,                                                // Row 2
        -Math.sin(rotationAngle), Math.sin(rotationAngle), Math.cos(rotationAngle), 0,  // Row 3
        0, 0, 0, 1                                                 // Row 4
    );

    if (monkey) {
        monkey.applyMatrix4(myMatrix);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
// // Detect faulty WebGL support
// if (THREE.WEBGL.isWebGLAvailable()) {
//     // Initiate function or other initializations here
// } else {
//     const warning = THREE.WEBGL.getWebGLErrorMessage();
//     document.getElementById('container').appendChild(warning);
// }
