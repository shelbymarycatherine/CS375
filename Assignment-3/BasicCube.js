class BasicCube {
    constructor(gl) {
        this.gl = gl;

        // Define vertices and colors for the cube
        const vertices = [
            // Front face (CCW order)
            -0.5, -0.5,  0.5, 1, 0, 0, // vertex 0
             0.5, -0.5,  0.5, 1, 0, 0, // vertex 1
             0.5,  0.5,  0.5, 1, 0, 0, // vertex 2
            -0.5,  0.5,  0.5, 1, 0, 0, // vertex 3

            // Back face (CCW order)
            -0.5, -0.5, -0.5, 0, 1, 0, // vertex 4
             0.5, -0.5, -0.5, 0, 1, 0, // vertex 5
             0.5,  0.5, -0.5, 0, 1, 0, // vertex 6
            -0.5,  0.5, -0.5, 0, 1, 0, // vertex 7
        ];

        const indices = [
            // Front face
            0, 1, 2,  0, 2, 3,
            // Right face
            1, 5, 6,  1, 6, 2,
            // Back face
            4, 7, 6,  4, 6, 5,
            // Left face
            7, 4, 0,  7, 0, 3,
            // Top face
            3, 2, 6,  3, 6, 7,
            // Bottom face
            4, 5, 1,  4, 1, 0,
        ];

        this.vertexCount = indices.length;

        // Create buffers
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }

    draw() {
        const program = this.gl.program; // assuming this.gl.program is your shader program
        const positionAttribLocation = this.gl.getAttribLocation(program, "aPosition");
        const colorAttribLocation = this.gl.getAttribLocation(program, "aColor");

        // Enable and set vertex attribute pointers
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(positionAttribLocation, 3, this.gl.FLOAT, false, 6 * 4, 0);
        this.gl.enableVertexAttribArray(positionAttribLocation);

        this.gl.vertexAttribPointer(colorAttribLocation, 3, this.gl.FLOAT, false, 6 * 4, 3 * 4);
        this.gl.enableVertexAttribArray(colorAttribLocation);

        // Bind index buffer and draw
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements(this.gl.TRIANGLES, this.vertexCount, this.gl.UNSIGNED_SHORT, 0);
    }
}
