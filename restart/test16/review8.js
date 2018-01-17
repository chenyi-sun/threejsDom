//2018-1-17 动画 test16方法
var VSHADER_SOURSE = 
'attribute vec4 a_Position;\n'+
'uniform mat4 u_xuniformMatrix;\n'+
'void main(){\n'+
    'gl_Position = u_xuniformMatrix * a_Position\n'+
'}\n';

var FSHADER_SOURSE = 
'void main(){\n'+
    'gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0)'+
'}\n';

function main(){
    var canvas = document.getElementById('canvas');
    var gl = getWebGLContext(canvas);
    initShader(gl, VSHADER_SOURSE, FSHADER_SOURSE);

    var n = initVertex(gl);

    var angle = 90;
    var matrix = new matrix4();
    matrix.setRotate(angle, 0, 0, 1); //设置旋转轴炜z轴 方向为负
    var u_xuniformMatrix = getUniformLocation(gl.program, 'u_xuniformMatrix');
    gl.uniformMatrix4fv(u_xuniformMatrix, false, matrix.element);

    gl.clearColor(0, 0 ,0 ,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRANGLE_FUN, 0, n); //第二个参数表示什么?
}

function initVertex(gl){
    var vertris = new Float32Array([
        0.0, 0.5,  0.5, 0.5,  -0.5, -0.5
    ]);

    var n = 3;
    var buffer =  gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferDate(gl.ARRAY_BUFFER, vertris, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointers(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}