var THREE = require("./three.js");
// let canvas = document.getElementById('container');
let width = document.body.clientWidth;
let height =document.body.clientHeight;
// canvas.width = width;
// canvas.height = height;

console.log(height);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
camera.position.set(0, 0 ,5);

var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('container')
});
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);



function render(){
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();


window.onresize = function(){
    width = document.body.clientWidth;
    height= document.body.clientHeight;
    renderer.setSize(width, height);
}