
let gl = undefined;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Add initialization code here
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);

    let cone = new Cone(gl, 36);
    let ms = new MatrixStack();
    let angle = 0.0;
    
    render();
}

function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 3.0;
    angle %= 360.0
    
    ms.push();
    //ms.scale(0.8);
    cone.MV = ms.current();
    cone.draw();
    ms.pop();

    requestAnimationFrame(render);
}

window.onload = init;

