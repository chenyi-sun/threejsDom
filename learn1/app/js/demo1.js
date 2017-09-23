var THREE = require("./three.js");
var width,height,sphere;

function init(){
    var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('container')
    });

    renderer.setClearColor(0xeeeeee);
    var scene = new THREE.Scene();


    var camera = new THREE.PerspectiveCamera(45, 4/4, 1, 1000);
    camera.position.set(10, -10, 20);
    camera.lookAt(new THREE.Vector3(0,0,0));

    scene.add(camera);

    var material = new THREE.MeshBasicMaterial({
    color: 0xff0000
    });

    // planeGeo
    var planeGeo = new THREE.CubeGeometry(8, 8, 8);

    var plane = new THREE.Mesh(planeGeo, material);

    plane.position.x = 6;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);


    //TRIANGLE
    var triGeo = new THREE.Geometry();

    triGeo.vertices = [new THREE.Vector3(0, -0.8, 0),

    new THREE.Vector3(-2, -0.8, 0), new THREE.Vector3(-1, 0.8,0)];

    triGeo.faces.push(new THREE.Face3(0, 2, 1));

    var triangle = new THREE.Mesh(triGeo, material);

    scene.add(triangle);

    renderer.render(scene,camera);
}


init();