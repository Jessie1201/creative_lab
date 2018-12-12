var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");

// Created a GLSL program on the GPU
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

var program = createProgram(gl, vertexShader, fragmentShader);

// Supply data to the program created
var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
var positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// All above finished initialization
// Start rendering

// Resize the canvas
function resize(canvas) {
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    if (canvas.width != displayWidth ||
        canvas.height != displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
}

function darwScene() {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of ARRAY_BUFFER
var size = 2;
var type = gl.FLOAT;
var normalize = false;
var stride = 0;
var offset = 0;
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

// Execute the GLSL program
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);


