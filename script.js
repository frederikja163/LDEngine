function main() {
    const canvas = document.querySelector("canvas");
    const renderer = new Renderer(canvas);
    const vbo = new VertexBuffer(renderer, new Float32Array([0, 0, 1, 1, 1, 0]));
    const ebo = new ElementBuffer(renderer, new Uint16Array([0, 1, 2]));
    const vao = new VertexArray(renderer, ebo);
    vao.addVertexAttributes(vbo, AttributeType.float, 2);
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
    shader.bind();
    vao.bind();
    renderer.gl.drawElements(WebGL2RenderingContext.TRIANGLES, 3, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
}
window.addEventListener("load", main);
var BufferTarget;
(function (BufferTarget) {
    BufferTarget[BufferTarget["VertexBuffer"] = WebGL2RenderingContext.ARRAY_BUFFER] = "VertexBuffer";
    BufferTarget[BufferTarget["ElementBuffer"] = WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER] = "ElementBuffer";
})(BufferTarget || (BufferTarget = {}));
var BufferUsageHint;
(function (BufferUsageHint) {
    BufferUsageHint[BufferUsageHint["staticRead"] = WebGL2RenderingContext.STATIC_READ] = "staticRead";
    BufferUsageHint[BufferUsageHint["staticDraw"] = WebGL2RenderingContext.STATIC_DRAW] = "staticDraw";
    BufferUsageHint[BufferUsageHint["staticCopy"] = WebGL2RenderingContext.STATIC_COPY] = "staticCopy";
    BufferUsageHint[BufferUsageHint["streamRead"] = WebGL2RenderingContext.STREAM_READ] = "streamRead";
    BufferUsageHint[BufferUsageHint["streamDraw"] = WebGL2RenderingContext.STREAM_DRAW] = "streamDraw";
    BufferUsageHint[BufferUsageHint["streamCopy"] = WebGL2RenderingContext.STREAM_COPY] = "streamCopy";
    BufferUsageHint[BufferUsageHint["dynamicRead"] = WebGL2RenderingContext.DYNAMIC_READ] = "dynamicRead";
    BufferUsageHint[BufferUsageHint["dynamicDraw"] = WebGL2RenderingContext.DYNAMIC_DRAW] = "dynamicDraw";
    BufferUsageHint[BufferUsageHint["dynamicCopy"] = WebGL2RenderingContext.DYNAMIC_COPY] = "dynamicCopy";
})(BufferUsageHint || (BufferUsageHint = {}));
class Buffer {
    constructor(renderer, bufferTarget) {
        this.gl = renderer.gl;
        this.handle = this.gl.createBuffer();
        this.bufferTarget = bufferTarget;
    }
    delete() {
        this.gl.deleteBuffer(this.handle);
    }
    setData(data, usage) {
        this.gl.bufferData(this.bufferTarget, data, usage);
    }
    bind() {
        if (Buffer.boundBuffer[this.bufferTarget] == this) {
            return;
        }
        this.gl.bindBuffer(this.bufferTarget, this.handle);
        this.previouslyBoundBuffer = Buffer.boundBuffer[this.bufferTarget];
        Buffer.boundBuffer[this.bufferTarget] = this;
    }
    unbind() {
        this.gl.bindBuffer(this.bufferTarget, this.previouslyBoundBuffer?.handle ?? null);
        Buffer.boundBuffer[this.bufferTarget] = this.previouslyBoundBuffer;
    }
}
Buffer.boundBuffer = [];
class VertexBuffer extends Buffer {
    constructor(renderer, data) {
        super(renderer, BufferTarget.VertexBuffer);
        this.bind();
        this.setData(data, BufferUsageHint.staticDraw);
        this.unbind();
    }
}
class ElementBuffer extends Buffer {
    constructor(renderer, data) {
        super(renderer, BufferTarget.ElementBuffer);
        this.bind();
        this.setData(data, BufferUsageHint.staticDraw);
        this.unbind();
    }
}
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2");
        this.resize();
        window.addEventListener("resize", this.resize);
    }
    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
}
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["VertexShader"] = WebGL2RenderingContext.VERTEX_SHADER] = "VertexShader";
    ShaderType[ShaderType["FragmentShader"] = WebGL2RenderingContext.FRAGMENT_SHADER] = "FragmentShader";
})(ShaderType || (ShaderType = {}));
class Shader {
    constructor(renderer, vertSrc, fragSrc) {
        this.uniformLocations = new Map();
        const gl = renderer.gl;
        this.gl = gl;
        const vert = this.createShader(ShaderType.VertexShader, vertSrc);
        const frag = this.createShader(ShaderType.FragmentShader, fragSrc);
        const handle = gl.createProgram();
        this.handle = handle;
        gl.attachShader(handle, vert);
        gl.attachShader(handle, frag);
        gl.linkProgram(handle);
        const il = gl.getProgramInfoLog(handle);
        if (il != "") {
            console.error(il);
        }
        gl.detachShader(handle, vert);
        gl.deleteShader(vert);
        gl.detachShader(handle, frag);
        gl.deleteShader(frag);
    }
    delete() {
        this.gl.deleteProgram(this.handle);
    }
    createShader(type, src) {
        const gl = this.gl;
        const handle = gl.createShader(type);
        gl.shaderSource(handle, src);
        gl.compileShader(handle);
        const il = gl.getShaderInfoLog(handle);
        if (il != "") {
            console.error(il);
        }
        return handle;
    }
    bind() {
        if (Shader.boundShader == this) {
            return;
        }
        this.gl.useProgram(this.handle);
        this.previouslyBoundShader = Shader.boundShader;
        Shader.boundShader = this;
    }
    unbind() {
        this.gl.useProgram(this.previouslyBoundShader?.handle ?? null);
        Shader.boundShader = this.previouslyBoundShader;
    }
    getUniformLocation(name) {
        if (this.uniformLocations.has(name)) {
            return this.uniformLocations.get(name);
        }
        return this.gl.getUniformLocation(this.handle, name);
    }
    setUniform1f(name, value1) {
        const location = this.getUniformLocation(name);
        this.gl.uniform1f(location, value1);
    }
    setUniform1i(name, value1) {
        const location = this.getUniformLocation(name);
        this.gl.uniform1i(location, value1);
    }
    setUniform2f(name, value1, value2) {
        const location = this.getUniformLocation(name);
        this.gl.uniform2f(location, value1, value2);
    }
    setUniform2i(name, value1, value2) {
        const location = this.getUniformLocation(name);
        this.gl.uniform2i(location, value1, value2);
    }
    setUniform3f(name, value1, value2, value3) {
        const location = this.getUniformLocation(name);
        this.gl.uniform3f(location, value1, value2, value3);
    }
    setUniform3i(name, value1, value2, value3) {
        const location = this.getUniformLocation(name);
        this.gl.uniform3i(location, value1, value2, value3);
    }
    setUniform4f(name, value1, value2, value3, value4) {
        const location = this.getUniformLocation(name);
        this.gl.uniform4f(location, value1, value2, value3, value4);
    }
    setUniform4i(name, value1, value2, value3, value4) {
        const location = this.getUniformLocation(name);
        this.gl.uniform4i(location, value1, value2, value3, value4);
    }
}
var AttributeType;
(function (AttributeType) {
    AttributeType[AttributeType["byte"] = WebGL2RenderingContext.BYTE] = "byte";
    AttributeType[AttributeType["short"] = WebGL2RenderingContext.SHORT] = "short";
    AttributeType[AttributeType["unsignedByte"] = WebGL2RenderingContext.UNSIGNED_BYTE] = "unsignedByte";
    AttributeType[AttributeType["float"] = WebGL2RenderingContext.FLOAT] = "float";
    AttributeType[AttributeType["halfFloat"] = WebGL2RenderingContext.HALF_FLOAT] = "halfFloat";
})(AttributeType || (AttributeType = {}));
class VertexArray {
    constructor(renderer, elementBuffer) {
        this.attributeCount = 0;
        this.gl = renderer.gl;
        this.handle = this.gl.createVertexArray();
        this.bind();
        elementBuffer.bind();
        this.unbind();
        elementBuffer.unbind();
    }
    addVertexAttributes(vertexBuffer, type, ...attributeCounts) {
        const gl = this.gl;
        this.bind();
        vertexBuffer.bind();
        let offset = 0;
        let typeSize = 0;
        switch (type) {
            case AttributeType.byte:
                typeSize = 1;
                break;
            case AttributeType.short:
                typeSize = 2;
                break;
            case AttributeType.unsignedByte:
                typeSize = 1;
                break;
            case AttributeType.float:
                typeSize = 4;
                break;
            case AttributeType.halfFloat:
                typeSize = 2;
                break;
            default:
                console.error(type, " is not a valide attribute type.");
                break;
        }
        for (let i = 0; i < attributeCounts.length; i++) {
            const count = attributeCounts[i];
            gl.enableVertexAttribArray(this.attributeCount);
            gl.vertexAttribPointer(this.attributeCount, count, type, false, 0, offset);
            offset += typeSize * count;
        }
        vertexBuffer.unbind();
        this.unbind();
    }
    bind() {
        this.gl.bindVertexArray(this.handle);
        this.previouslyBoundVertexArray = VertexArray.boundVertexArray;
        VertexArray.boundVertexArray = this;
    }
    unbind() {
        this.gl.bindVertexArray(this.previouslyBoundVertexArray?.handle ?? null);
        VertexArray.boundVertexArray = this.previouslyBoundVertexArray;
    }
}
//# sourceMappingURL=script.js.map