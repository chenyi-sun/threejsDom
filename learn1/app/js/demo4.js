var THREE = require("./three.js");
// let canvas = document.getElementById('container');
let width = document.body.clientWidth;
let height =document.body.clientHeight;
// canvas.width = width;
// canvas.height = height;
let accept = width/height;

console.log(height);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, accept, 0.1, 1000);
camera.position.set(0, 0 ,10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('container')
});
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );


var geometry = new THREE.SphereGeometry(1,8,6,0,Math.PI*1,0, Math.PI*1);
// var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    opacity: 0.65,
    wireframe: true
 });
// var meterial = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.rotation.x = -1.5;
// cube.rotation.y = 3;
// cube.rotation.z = 3;


function render(){
    // cube.rotation.x += 0.05;
    // cube.rotation.y += 0.05;
    requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();


window.onresize = function(){
    width = document.body.clientWidth;
    height= document.body.clientHeight;
    accept = width/height;
    renderer.setSize(width, height);
}