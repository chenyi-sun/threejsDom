//2018-1-24
var VSHADER_SOURSE = 
'attribute vec4 a_Position;\n'+
'attribute vec2 a_TexCoord;\n'+
'varying vec2 v_TexCoord;\n'+
'void main(){\n'+
    'gl_Position = a_Position;\n'+
    'v_TexCoord = a_TexCoord;\n'+
'}\n';

var FSHADER_SOURSE = 
'#ifdef GL_ES\n'+
'precision mediump float\n'+
'#endif'+
'uniform sampler2D u_Sampler;\n'+
'varying vec2 v_TexCoord;\n'+
'void main(){'+
    'gl_FragColor = texture2D(u_Sampler, v_TexCoord)'+
'}\n';

function main(){
    var canvas = document.getElementById('canvas');
    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_SOURSE, FSHADER_SOURSE);

    var n = initVertex(gl);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    initTexture(gl, n);
}

function initVertex(gl){
     var vertexTexCoord = new Float32Array([
         -0.5,  0.5,   0.0, 1.0,
        -0.5, -0.5,   0.0, 0.0,
         0.5,  0.5,   1.0, 1.0,
         0.5, -0.5,   1.0, 0.0,
     ]);
     var n = 4;
      
     var size = vertexTexCoord.BYTES_PER_ELEMENT;

     var vertexBuffer = gl.createBuffer();

     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

     gl.bufferDate(gl.ARRAY_BUFFER, vertexTexCoord, gl.STATIC_DRAW);

     var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, size*4, 0);

     gl.enableVertexAttribArray(a_Position);

     var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');

     gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, size*4, size*2);

     gl.enableVertexAttribArray(a_TexCoord);

     return n;
}

function initTexture(gl, n){
    var texture = gl.createTexture();

    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

    var image = new Image();

    image.onload = function(){
        loadTexture(gl, n, u_Sampler, texture, image);
    }

    image.src = './sky.png';
}
function loadTexture(gl, n, u_Sampler, texture, image){
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.textParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGN_BYTES, image);

    gl.uniform(u_Sampler, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArray(gl.TRANGLE_STRIP, 0, n);
}


