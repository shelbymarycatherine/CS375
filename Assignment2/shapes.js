let gl = undefined;
let cone;
const matrixStack = new MatrixStack();

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    const cone = new Cone(gl, 20); //Experiment with different values
    
    program = initShaders(gl, "vertex-shader", "fragment-shader");

    uAngle = gl.getUniformLocation(program, "uAngle");

    gl.clearColor(0.2, 0.2, 0.2, 1.0);

    render();
}

function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    matrixStack.push();
    matrixStack.loadIdentity();
    matrixStack.translate(0.0, 0.0);
    cone.draw;
    matrixStack.pop();

   // gl.uniform1f(uAngle, angle);
  //  gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(render);
}

window.onload = init;

