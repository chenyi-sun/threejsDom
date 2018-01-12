//2018-1-12日 默写代码-3 复习6(test6) 一次性创建3个点的三角形，利用缓冲区,一次性创建三个顶点
var VSHADER_SOURSE = 
    'attribute vec4 a_Position;\n'
    'void mian{\n'+
        'gl_Position = a_Position;\n'+
    '}\n';

var FSHADER_SOURSE = 
    'void main(){\n'+
        'gl_Fragcolor = vec4(1.0, 0, 0, 1.0)\n'+
    '}\n';

function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    initShaders(gl,VSHADER_SOURSE,FSHADER_SOURSE); //初始化着色器

    var n = initVertexBuffers(gl); 
    //初始化顶点缓冲区

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

function initVertexBuffers(gl){
   var vertexs = new Float32Array([
       0.0, -0.5,  0.5,0,5,  -0.5, -0.5
   ]);
   var n = 3;

   var vertexBuffer = gl.createBuffer();

   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

   gl.BufferDate(gl.ARRAY_BUFFER, vertexs , gl.STATIC_DRAW);

   var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

   gl.vertexAttribPoint(a_Position, 2, gl.Float, false, 0, 0);

   gl.enableVertexAttribArray(a_Position);

}