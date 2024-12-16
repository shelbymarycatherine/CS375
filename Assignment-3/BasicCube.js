class BasicCube {
    constructor(gl) {
        this.gl = gl;

        // Define vertices and colors
        const vertices = new Float32Array([
            // Front face (CCW order)
            -0.5, -0.5,  0.5,  1, 0, 0, // vertex 0
             0.5, -0.5,  0.5,  1, 0, 0, // vertex 1
             0.5,  0.5,  0.5,  1, 0, 0, // vertex 2
            -0.5,  0.5,  0.5,  1, 0, 0, // vertex 3

            // Back face (CCW order)
            -0.5, -0.5, -0.5,  0, 1, 0, // vertex 4
             0.5, -0.5, -0.5,  0, 1, 0, // vertex 5
             0.5,  0.5, -0.5,  0, 1, 0, // vertex 6
            -0.5,  0.5, -0.5,  0, 1, 0, // vertex 7
        ]);

        const indices = new Uint16Array([
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
        ]);

        this.vertexCount = indices.length;

        // Create buffers
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        // Define shaders
        this.vertexShaderSource = `
            in vec4 aPosition;
            in vec3 aColor;
            uniform mat4 P;
            uniform mat4 MV;

            out vec3 vColor;

            void main() {
                gl_Position = P * MV * aPosition;
                vColor = aColor;
            }
        `;

        this.fragmentShaderSource = `
            precision mediump float;
            in vec3 vColor;
            out vec4 FragColor;

            void main() {
                FragColor = vec4(vColor, 1.0);
            }
        `;

        // Create shader program
        this.program = new ShaderProgram(gl, this.vertexShaderSource, this.fragmentShaderSource);

        // Attribute locations
        this.positionAttribLocation = gl.getAttribLocation(this.program.program, "aPosition");
        this.colorAttribLocation = gl.getAttribLocation(this.program.program, "aColor");

        // Initialize rotation angle
        this.rotationAngle = 0;
    }

    draw() {
        this.program.use();

        // Update the model view matrix for rotation
        this.rotationAngle += 0.01; // Increment the rotation angle
        const rotationMatrix = mat4.create();
        mat4.rotate(rotationMatrix, rotationMatrix, this.rotationAngle, [0, 1, 0]);
        this.program.setUniformMatrix4fv('MV', rotationMatrix);

        // Bind and enable attributes
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(this.positionAttribLocation, 3, this.gl.FLOAT, false, 6 * 4, 0);
        this.gl.enableVertexAttribArray(this.positionAttribLocation);

        this.gl.vertexAttribPointer(this.colorAttribLocation, 3, this.gl.FLOAT, false, 6 * 4, 3 * 4);
        this.gl.enableVertexAttribArray(this.colorAttribLocation);

        // Draw the cube
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements(this.gl.TRIANGLES, this.vertexCount, this.gl.UNSIGNED_SHORT, 0);

        // Disable vertex attributes
        this.gl.disableVertexAttribArray(this.positionAttribLocation);
        this.gl.disableVertexAttribArray(this.colorAttribLocation);
    }
}
