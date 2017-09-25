// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =  //设置顶点位置信息
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =  //设置片缓冲区，颜色渲染
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  gl.drawArrays(gl.POINTS, 0, 1);
}

//1.获取canvas上下文
//2.!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE) 初始化着色器
//3.设置清除颜色
//4.清除屏幕
//5.将缓冲区的点渲染到页面,（0）从0开始 （1）只生成一个点