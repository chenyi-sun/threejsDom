//设置顶点着色器
//Vertex Shader Sourse(顶点 缓冲器 资源)
var VSHADER_SOURSE = 
'attribute vec4 a_Position;\n' +
'void main(){\n'+
'   gl_Position = a_Position;\n'+
'   gl_PointSize = 10.0;\n' +
'}\n';

//片源着色器
//Fragment Shader Sourse(碎片 缓冲器 资源) 
var FSHADER_SOURSE =
'void main(){\n' +
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
'}\n';

function main(){
    var canvas = document.getElementById('webgl');  // Retrieve <canvas> element(检索 canvas 元素)
    var gl = getWebGLContext(canvas); // Get the rendering context for WebGL(获取WebGL的填充内容)
    initShaders(gl,VSHADER_SOURSE,FSHADER_SOURSE);  // Initialize shaders （初始化缓冲区）
    
    var a_Position = gl.getAttribLocation(gl.program,'a_Position'); // Get the storage location of a_Position（获取顶点坐标存储地址）
    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);  // Pass vertex position to attribute variable (把需要修改的地址放到这个地址中)

    gl.clearColor(0.0,0.0,0.0,1.0); // Specify the color for clearing <canvas>(给canvas清除色 填充指定的颜色)
    gl.clear(gl.COLOR_BUFFER_BIT);  // Clear <canvas> (gl用缓冲区颜色去清空页面)
 
    gl.drawArrays(gl.POINTS,0, 1); //绘制顶点
}