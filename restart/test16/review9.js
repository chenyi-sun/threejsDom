//2018-1-22 
var VSHADER_SOURSE = 
'attribute vec4 a_Position;\n'+
'attribute vec2 a_TexCoord;\n'+
'varying vec2 v_TexCoord;\n'+
'void main(){\n'+
    'gl_Position = a_Position;\n'+
    'v_TexCoord = a_TexCoord;\n'+
'';

var FSHADER_SOURSE = 
'#ifdef GL_ES\n'+
'precision mediump float\n'+
'#endif\n'+
'uniform sampler2D u_Sampler;\n'+
'varying vec2 v_TexCoord;\n'+
'void main(){\n'+
    'gl_FragColor = texture2D(u_Sampler, v_TexCoord)'+
'}\n';

function main(){
    var canvase = document.getElementById('canvas');
    
    var gl = getWebGLContext(canvase);

    initShaders(gl, VSHADER_SOURSE, FSHADER_SOURSE);

    var n = initVertexBuffers(gl);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    initTextures(n, gl);
}

function initVertexBuffers(gl){
    var vertexTexCoords = new Float32Array([
        -0.5,  0.5,   0.0, 1.0,
        -0.5, -0.5,   0.0, 0.0,
        0.5,  0.5,   1.0, 1.0,
        0.5, -0.5,   1.0, 0.0,
    ]);

    var n = 4;

    var vertexSize = vertexTexCoords.BYTES_PER_ELEMENT;

    var vertexBuffer = gl.createBuffer();

    gl.initBuffer(gl.BUFFER_ARRAY, vertexBuffer);

    gl.bufferDate(gl.BUFFER_ARRAY, vertexTexCoords, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointers(a_Position, 2, false, gl.FLOAT, vertexSize* 4, 0);

    gl.enableVertexAttribArrays(a_Position);

    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');

    gl.vertexAttribPointers(a_TexCoord, 2, false, gl.FLOAT, vertexSize* 4, vertexSize*2);

    gl.enableVertexAttribArrays(a_TexCoord);

    return 0;
}

function initTextures(gl, n){
    var texture = gl.createTexture();

    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

    var image = new Image();

    image.onLoad = function(){
        loadTexture(gl, n , texture, u_Sampler, image);
    }

    image.src = "./sky.png";
}

function loadTexture(gl, n , texture, u_Sampler, image){
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParamerteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);a

    gl.texImage2D(gl.TEXTURE_2D, false, 0, gl.RGB, gl.RGB,gl.UNSIGN_BIT ,image);

    gl.uniform1i(u_Sampler, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRANGLE_STRIP, 0, n);
}