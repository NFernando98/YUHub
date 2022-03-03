// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import React from 'react'
/**
 * This functions renders the adele robot model to the webpage
 */
export function renderAdele( container ) {
    // a basic three.js scene
var renderer, scene, camera, controls;
let mixer = null;
let clock = new THREE.Clock();

init();
animate();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x000000, 0 );
    container.appendChild(renderer.domElement);
    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 200, 800);
    camera.lookAt(scene.position);

    // (camera) controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // light    
    var light = new THREE.PointLight(0xffffff);
    light.position.set(100, 250, 250);
    scene.add(light);

    // adele model
   var loader = new THREE.GLTFLoader()
   var url = "https://cdn.glitch.com/68b56b18-ecd5-43f1-aad6-453eac070643%2FRobotExpressive.glb?v=1596736813681"
      loader.load(url, (data) => {
            let gltf = data;
            var object;
            if (gltf.scene !== undefined) {
                object = gltf.scene; // default scene
            } else if (gltf.scenes.length > 0) {
                object = gltf.scenes[0]; // other scene
            }
             data.scene.traverse((child) => {

              if (child instanceof THREE.Mesh) {
              const {map, color} = child.material;
              	child.material = new THREE.MeshBasicMaterial({
                map: map,
                color: color.add(new THREE.Color(0.1, 0.1, 2.1))
                });
              }
             })
            object.scale.multiplyScalar(50)
            scene.add(object)

            let animations = gltf.animations;
          	if ( animations && animations.length ) {
              mixer = new THREE.AnimationMixer( object );
                  let animation = animations[ 3 ];
                  mixer.clipAction( animation ).play();
          }
      })

    // events
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	if (mixer) mixer.update(clock.getDelta());
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
}

export function AdeleViewer() {
    return (
        <div id="adeleViewer" style={{
            position: 'absolute', 
            width: '30%',
            height: '30%',
            top: '50%',
            left: '20%',
            color: 'red',
            transform: 'translate(-90%, -10%) scale(.3)',
            zIndex: "-10"
        }}></div>
    )
}

window.addEventListener("load", ()=>{
    const container = document.querySelector("#adeleViewer")
    window.$("#adeleViewer").hide();
    renderAdele(container);
})