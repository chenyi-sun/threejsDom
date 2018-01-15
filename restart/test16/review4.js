//2018-1-15 默写 test6代码
 
var VSHADER_RESOURSE = 
'attribute vec4 a_Position;\n'+
'void main(){\n'+
    'gl_Position = a_Position;\n'+
'}\n';

var FSHADER_RESOURSE = 
'void main(){\n'+
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0)\n'+
'}\n';

function main(){
    var canvas = document.getElementById('canvas');
    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_RESOURSE, FSHADER_RESOURSE);

    var n = initBuffer(gl);


    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRANGLE_FAN, 0, n);
}

function initBuffer(gl){
    var vertices = new Float32Array([
        0.0, 0.5,  0.5, -0,5,  -0.5, -0.5
    ]); 

    var n = 3;

    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    
    gl.bufferDate(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(gl.program, 2,gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray();
    
    return n;
}   