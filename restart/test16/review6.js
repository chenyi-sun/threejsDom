//2018-1-16 默写 test12代码
 
var VSHADER_SOURSE = 
'attribute vec4 a_Position;\n'+
'uniform mat4 u_xformMatrix;\n'+
'void main(){\n'+
    'gl_Position = a_Position * u_xformMatrix;\n'+
'}\n';

var FSHADER_SOURSE = 
'void main(){\n'+
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0)'+
'}\n';

var angle = 90;
function main(){
    var canvas = document.getElementById('canvas');
    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_SOURSE, FSHADER_SOURSE); 

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

    var radius = Math.PI*angle / 180.0;
    var sinb = Math.sin(radius), cosb = Math.cos(radius);

    var matrix = new Float32Array([
        cosb, sinb, 0.0 , 0.0,
        -sinb, -cosb, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);//设置mat4转换矩阵

    gl.uniformVc4f(u_xformMatrix, false, matrix);

    var n = initVertex(gl);//设置顶端缓冲区a_Position

    var color = gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.DrawArrays(gl.TRIANGLE_FAN, 0, n);
}

function initVertex(gl){
    var vertries = new Float32Array([
        0.0, 0.5, 0.5,-0.5, -0.5, -0.5
    ]);

    var n = 3;

    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferdate(gl.ARRAY_BUFFER, vertries, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}