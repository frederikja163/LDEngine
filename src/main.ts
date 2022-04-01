function main(): void
{
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    const renderer: Renderer = new Renderer(canvas);

    const shader = new Shader(renderer, `
        attribute vec2 aPosition;

        void main()
        {
            gl_Position = vec4(aPosition, 0, 1);
        }
        `, `
        precision mediump float;

        void main()
        {
            gl_FragColor = vec4(1, 0, 1, 1);
        }
        `);

    const vbo: VertexBuffer = new VertexBuffer(renderer, new Float32Array([0, 0, 1, 1, 1, 0]));
    const ebo: ElementBuffer = new ElementBuffer(renderer, new Uint16Array([0, 1, 2]));
    const vao: VertexArray = new VertexArray(renderer, ebo, shader);
    vao.addVertexAttributes(vbo, AttributeType.float, {name: "aPosition", count: 2});

    shader.bind();
    vao.bind();
    renderer.gl.drawElements(WebGL2RenderingContext.TRIANGLES, 3, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
}

window.addEventListener("load", main);