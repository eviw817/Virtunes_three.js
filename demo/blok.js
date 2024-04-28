import * as THREE from 'three';
import { PointerLockControls } from './PointerLockControls.js';

let container, camera, scene, renderer;
let controls;

function init() {
  container = document.getElementById('canvas');

  // Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Create the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Create the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Create controls for camera movement
  controls = new PointerLockControls(camera, container);
  container.addEventListener('click', () => controls.lock());

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  // Start the animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  scene.rotation.y += 0.01;

  // Render the scene with the camera
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize the scene
init();
