//2018-1-12日 默写代码-2  默写13的代码 //去默写绘制三角形的那一张，一次绘制三个点

//顶点着色器 vertex-SHADER-SOURSE(vec4和mat4的区别,attribute和uniform之间的区别)
//Float32Array变量是什么鬼?P72页 放置一组大量类似的数据类型所设置的变量类型,类型化数组(单精度32位浮点数)
//uniformMatrix4fv函数是干什么的?
//gl.vertexAttributePoint()//函数是干什么的?P75页 将缓冲区对象一次性赋值给attribute变量(物理地址, 精度精确到2位，gl.float
// 是传入的数据类型是float32的数据类型, 是否有返回值（无）,默认为0,偏移量)
//gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); 
//gl.drawArrays(gl.TRIANGLES, 0, n);?gl.drawArray函数 p82页  绘制三角形 点有n个
var VSHADER_SOURSE = 
'attribute vec4 a_Position;\n'+ //顶点变量是一个vec4变量
'uniform mat4 u_xformMartix'+
'void main(){\n'+
    'gl_Position = u_xformMartix * a_Position;'+ //矩阵 * 位置
'}\n';

//片源着色器Frag(初始化颜色)
var FSHADER_SOURSE =
'void main(){\n'+
'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
'}\n';

var Sx = 1.0, Sy = 1.5, Sz = 1.0;//放大倍数

function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_SOURSE, FSHADER_SOURSE);
    //初始化

    var xformMatrix = new Float32Array([ 
        Sx,   0.0,  0.0,  0.0,
        0.0,  Sy,   0.0,  0.0,
        0.0,  0.0,  Sz,   0.0,
        0.0,  0.0,  0.0,  1.0
    ]);



    var u_xformMartix = gl.getUniformLocation(gl.program,'u_xformMartix');//把二维矩阵从缓冲器中赋值给uniform变量
    gl.uniformMartix4fv(u_xformMartix,false,xformMatrix);
    //这样就设置好了u_xformMartix变量值了 然后渲染出来就可以了



    gl.clearColor(0, 0, 0, 1);//设置清空的默认颜色

    gl.clear(gl.COLOR_BUFFER_BIT); //赋值给变量颜色设置

}