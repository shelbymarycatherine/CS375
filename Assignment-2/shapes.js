let cone;
let sphere;
let cylinder;
let ms;
let angle;
let gl = undefined;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }
    
    // Add initialization code here
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);

    cone = new Cone(gl, 36);
    sphere = new Sphere(gl, 36, 18);
    cylinder = new Cylinder(gl, 36);
    
    ms = new MatrixStack();
    angle = 0.0;

    function render() {
        // Add rendering code here
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        angle += 3.0;
        angle %= 360.0
        
        // Render cone
        ms.push();
        ms.scale(0.7);
        ms.translate([0.0, 0.0, 0.0]);
        cone.MV = ms.current();
        gl.useProgram(cone.program);
        cone.color = vec4(1.0, 0.75, 0.8, 1.0);
        cone.draw();
        ms.pop();

        // Render sphere
        ms.push();
        ms.scale(0.2);
        ms.rotate(angle, [0.0, 0.1, 0.0]);
        ms.translate([-3.0, -2.0, 2.0]);
        sphere.MV = ms.current();
        sphere.color = vec4(0.2, 0.8, 0.8, 1.0);
        sphere.draw();
        ms.pop();

        // Render cylinder
        ms.push();
        ms.scale(0.2);
        ms.rotate(angle, [0.0, 0.1, 0.0]);
        ms.translate([-3.0, 2.0, 0.0]);
        cylinder.MV = ms.current();
        cylinder.draw();
        ms.pop();
    
        requestAnimationFrame(render);
    }

    render();
}

window.onload = init;

