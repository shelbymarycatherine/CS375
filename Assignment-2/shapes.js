
let gl = undefined;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);

    let cone = new cone(gl, 36);
    let sphere = new Sphere(gl, 36, 18);
    let ms = new MatrixStack();
    let coneAngle = 0.0;
    let sphereAngle = 0.0;
    
    render();
}

function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    coneAngle += 3.0;
    coneAngle %= 360.0
    sphereAngle += 1.0;
    sphereAngle %= 360.0;

    ms.push();
    ms.scale(0.8);
    cone.MV = ms.current();
    sphere.MV = ms.current();
    cone.draw();
    sphere.draw();
    ms.pop();

    requestAnimationFrame(render);
}

window.onload = init;

