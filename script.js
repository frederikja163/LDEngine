function main() {
    const canvas = document.querySelector("canvas");
    const renderer = new Renderer(canvas);
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
    const vbo = new VertexBuffer(renderer, new Float32Array([0, 0, 1, 1, 1, 0]));
    const ebo = new ElementBuffer(renderer, new Uint16Array([0, 1, 2]));
    const vao = new VertexArray(renderer, ebo, shader);
    vao.addVertexAttributes(vbo, AttributeType.float, { name: "aPosition", count: 2 });
    shader.bind();
    vao.bind();
    renderer.gl.drawElements(WebGL2RenderingContext.TRIANGLES, 3, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
}
window.addEventListener("load", main);
class Vector1 {
    constructor(x) {
        this.x = x;
    }
    lengthSqr() {
        return Vector1.dot(this, this);
    }
    length() {
        return Math.sqrt(this.lengthSqr());
    }
    static add(left, right) {
        if (right instanceof Vector1) {
            return new Vector1(left.x + right.x);
        }
        return new Vector1(left.x + right);
    }
    static sub(left, right) {
        if (right instanceof Vector1) {
            return new Vector1(left.x - right.x);
        }
        return new Vector1(left.x - right);
    }
    static mul(left, right) {
        if (right instanceof Vector1) {
            return new Vector1(left.x * right.x);
        }
        return new Vector1(left.x * right);
    }
    static dot(left, right) {
        return left.x * right.x;
    }
    static proj(base, shade) {
        return Vector1.mul(base, Vector1.mul(Vector1.mul(base, shade), 1 / base.lengthSqr()));
    }
    static angle(left, right) {
        return Math.acos(Vector1.dot(left, right) / (left.length() * right.length()));
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    lengthSqr() {
        return Vector2.dot(this, this);
    }
    length() {
        return Math.sqrt(this.lengthSqr());
    }
    static add(left, right) {
        if (right instanceof Vector2) {
            return new Vector2(left.x + right.x, left.y + right.y);
        }
        return new Vector2(left.x + right, left.y + right);
    }
    static sub(left, right) {
        if (right instanceof Vector2) {
            return new Vector2(left.x - right.x, left.y - right.y);
        }
        return new Vector2(left.x - right, left.y - right);
    }
    static mul(left, right) {
        if (right instanceof Vector2) {
            return new Vector2(left.x * right.x, left.y * right.y);
        }
        return new Vector2(left.x * right, left.y * right);
    }
    static dot(left, right) {
        return left.x * right.x + left.y * right.y;
    }
    static proj(base, shade) {
        return Vector2.mul(base, Vector2.mul(Vector2.mul(base, shade), 1 / base.lengthSqr()));
    }
    static angle(left, right) {
        return Math.acos(Vector2.dot(left, right) / (left.length() * right.length()));
    }
}
class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    lengthSqr() {
        return Vector3.dot(this, this);
    }
    length() {
        return Math.sqrt(this.lengthSqr());
    }
    static add(left, right) {
        if (right instanceof Vector3) {
            return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z);
        }
        return new Vector3(left.x + right, left.y + right, left.z + right);
    }
    static sub(left, right) {
        if (right instanceof Vector3) {
            return new Vector3(left.x - right.x, left.y - right.y, left.z - right.z);
        }
        return new Vector3(left.x - right, left.y - right, left.z - right);
    }
    static mul(left, right) {
        if (right instanceof Vector3) {
            return new Vector3(left.x * right.x, left.y * right.y, left.z * right.z);
        }
        return new Vector3(left.x * right, left.y * right, left.z * right);
    }
    static dot(left, right) {
        return left.x * right.x + left.y * right.y + left.z * right.z;
    }
    static proj(base, shade) {
        return Vector3.mul(base, Vector3.mul(Vector3.mul(base, shade), 1 / base.lengthSqr()));
    }
    static angle(left, right) {
        return Math.acos(Vector3.dot(left, right) / (left.length() * right.length()));
    }
}
class Vector4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    lengthSqr() {
        return Vector4.dot(this, this);
    }
    length() {
        return Math.sqrt(this.lengthSqr());
    }
    static add(left, right) {
        if (right instanceof Vector4) {
            return new Vector4(left.x + right.x, left.y + right.y, left.z + right.z, left.w + right.w);
        }
        return new Vector4(left.x + right, left.y + right, left.z + right, left.w + right);
    }
    static sub(left, right) {
        if (right instanceof Vector4) {
            return new Vector4(left.x - right.x, left.y - right.y, left.z - right.z, left.w - right.w);
        }
        return new Vector4(left.x - right, left.y - right, left.z - right, left.w - right);
    }
    static mul(left, right) {
        if (right instanceof Vector4) {
            return new Vector4(left.x * right.x, left.y * right.y, left.z * right.z, left.w * right.w);
        }
        return new Vector4(left.x * right, left.y * right, left.z * right, left.w * right);
    }
    static dot(left, right) {
        return left.x * right.x + left.y * right.y + left.z * right.z + right.w * left.w;
    }
    static proj(base, shade) {
        return Vector4.mul(base, Vector4.mul(Vector4.mul(base, shade), 1 / base.lengthSqr()));
    }
    static angle(left, right) {
        return Math.acos(Vector4.dot(left, right) / (left.length() * right.length()));
    }
}
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
    constructor(renderer, elementBuffer, shader) {
        this.attributeCount = 0;
        this.gl = renderer.gl;
        this.handle = this.gl.createVertexArray();
        this.bind();
        elementBuffer.bind();
        this.unbind();
        elementBuffer.unbind();
    }
    addVertexAttributes(vertexBuffer, type, ...attributes) {
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
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            const uniformLocation = this.shader.getUniformLocation(attribute.name);
            gl.enableVertexAttribArray(uniformLocation);
            gl.vertexAttribPointer(uniformLocation, attribute.count, type, false, 0, offset);
            offset += typeSize * attribute.count;
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