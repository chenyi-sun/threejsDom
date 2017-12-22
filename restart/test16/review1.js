//2017-12-21日 默写代码-1  draw函数没看。去默写之前的13,14

var VSHADER_SOURSE = //顶点着色器
'attribute vec4 a_Position;\n'+ //顶点坐标 vec4类型 可变变量
'uniform mat4 u_ModelMartix;\n'+ //矩阵 mat4类型 一致的变量
    'void main(){\n'+
    'gl_Position = a_Position * u_ModelMartix;\n'+
    '\n'+
'}\n';

var FSHADER_SOURSE = //片源着色器
'void main(){\n'+
    'gl_Flagcolor = vec4(1.0, 0.0, 0.0, 1.0)\n'+
'}\n';

function main(){
    var canvas = document.getElementById('webgl'); //获取canvas;
    var gl = getWebGLContent(canvas);
    initShaders(gl, VSHADER_SOURSE, FSHADER_SOURSE);

    var n = initVertexBuffers(gl); //绘制三角形，给顶点缓冲区传送参数 3

    gl.clearColor(0.0, 0.0, 0.0, 1.0); //设置清除颜色

    //创建旋转矩阵
    var u_ModelMatrix = gl.getUniformLocation(gl.program, u_ModelMartix); //获取矩阵的物理地址
    //gl.uniformMarix4fv(u_ModelMartix, false, 矩阵);    

    var modelMatrix = new Matrix4();//创建矩阵new方法 用的矩阵库函数

    var currentAngle = 0.0;

    //开始反复绘制三角形
    function tick(){
         currentAngle = animate(currentAngle);
         draw(gl, n,  currentAngle, modelMatrix, u_ModelMatrix);
         requestAnimationFrame(tick, canvas); 
    }
    tick();

}

function initVertexBuffers(gl){
    var vertriexs = new Float32Array([
        0.0, 0.5,  -0.5,-0.5, 0.5,-0.5
    ]);
    //一次性给顶点缓冲区传3个坐标，要用到缓冲区buffer
    var vertexBuffer = gl.createBuffer(); //先创建缓冲区

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//然后利用中间变量Array_buffer

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);//把vertices传给buffer变量然后传给
    //传给这个缓冲区。。然后这个变量就在gl.Float 里面了


    //获取顶点坐标系的物理地址
    var a_Position = gl.getAttribLocation(gl.program, a_Position);

    //给这个地址传变量,把这个变量放到顶点缓冲区(第二个变量，是只读取x,y值)
    gl.setAttribPoint(a_Position, 2, gl.FLOAT, false, 0 ,0);//几个参数值的意义忘掉了，回去看一下

    //gl.enable;允许使用这个缓冲区变量
    gl.enableVertexAttribArray(a_Position); 
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
  // Set the rotation matrix
  modelMatrix.setRotate(currentAngle, 0, 0, 1); // Rotation angle, rotation axis (0, 0, 1)
 
  // Pass the rotation matrix to the vertex shader
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
}


function animate(angle) {
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}