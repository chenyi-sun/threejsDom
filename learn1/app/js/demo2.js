var THREE = require("./three.js");
var width,height,sphere;

function init(){
    var length = 20;
    var allChange = 30;
    var renderer = new THREE.WebGLRenderer({
     canvas: document.getElementById('container')
    });

    renderer.setClearColor(0xeeeeee);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 400/300, 1 ,100);
    camera.position.set(length,0,allChange);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
    //cube


    var meterial = new THREE.MeshNormalMaterial();
    //法向材质


    var cube = new THREE.Mesh(
        new THREE.CubeGeometry(9,6,9),
        meterial
    );
    scene.add(cube);
    var i = 1;
    var yinit = 2;
    function draw() {
        i = i + 0.2;
        yinit = yinit + 0.2;
        if(i>length){
            i = length;
        }
        if(yinit > allChange){
            yinit = allChange;
        }
        camera.position.set(i,0,yinit);
        renderer.render(scene,camera);
        
    }
    var id = setInterval(draw, 20);
}


init();