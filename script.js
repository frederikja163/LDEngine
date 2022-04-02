function main() {
    const canvas = document.querySelector("canvas");
    const state = createGamestate();
    const renderingSystem = new RenderingSystem(canvas, state);
    const canvasSize = new Vector2(canvas.clientWidth, canvas.clientHeight);
    const updateSystem = new UpdateSystem(state);
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
    copy() {
        return new Vector2(this.x, this.y);
    }
    lengthSqr() {
        return Vector2.dot(this, this);
    }
    length() {
        return Math.sqrt(this.lengthSqr());
    }
    orthorgonal() {
        return new Vector2(-this.y, this.x);
    }
    normalized() {
        return Vector2.mul(this, 1 / this.length());
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
        this.bufferSource = data;
    }
    getData() {
        return this.bufferSource;
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
class LineArray {
    constructor(renderer, lines) {
        this.renderer = renderer;
        this.lines = lines;
        this.shader = new Shader(renderer, `
        attribute vec2 aPosition;
        
        void main(){
            gl_Position = vec4(aPosition, 0, 1);
        }
        `, `
        precision mediump float;
        
        void main(){
            gl_FragColor = vec4(0.85, 0.1, 0.2, 1);
        }
        `);
        this.vbo = new VertexBuffer(renderer, new Float32Array());
        this.ebo = new ElementBuffer(renderer, new Uint16Array());
        this.vao = new VertexArray(renderer, this.ebo, this.shader);
        this.vao.addVertexAttributes(this.vbo, AttributeType.float, { count: 2, name: "aPosition" });
        this.setLines(lines);
    }
    setLines(lines) {
        const vertices = [];
        const indices = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const p1 = line.pos1;
            const p2 = line.pos2;
            const dif = Vector2.sub(p1, p2);
            const orth = Vector2.mul(dif.orthorgonal().normalized(), line.thickness);
            vertices.push(line.pos1.x + orth.x, line.pos1.y + orth.y, line.pos1.x - orth.x, line.pos1.y - orth.y, line.pos2.x + orth.x, line.pos2.y + orth.y, line.pos2.x - orth.x, line.pos2.y - orth.y);
            indices.push(i * 4 + 0, i * 4 + 1, i * 4 + 3, i * 4 + 0, i * 4 + 2, i * 4 + 3);
        }
        this.vbo.bind();
        this.vbo.setData(new Float32Array(vertices), WebGL2RenderingContext.STATIC_DRAW);
        this.vbo.unbind();
        this.ebo.bind();
        this.ebo.setData(new Uint16Array(indices), WebGL2RenderingContext.STATIC_DRAW);
        this.ebo.unbind();
        this.vao.updateElementBuffer(this.ebo);
        this.vao.addVertexAttributes(this.vbo, AttributeType.float, { count: 2, name: "aPosition" });
        this.lines = lines;
    }
    bind() {
        this.vao.bind();
        return { mode: WebGL2RenderingContext.TRIANGLES, elementCount: this.lines.length * 6 };
    }
    unbind() {
        this.vao.unbind();
    }
}
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2");
        this.gl.enable(WebGL2RenderingContext.BLEND);
        this.gl.blendFunc(WebGL2RenderingContext.SRC_COLOR, WebGL2RenderingContext.DST_COLOR);
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
    drawLines(vao) {
        vao.bind();
        this.gl.drawElements(WebGL2RenderingContext.LINES, vao.elementBuffer.getData().byteLength / 2, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
        vao.unbind();
    }
    drawLineStrip(vao) {
        vao.bind();
        this.gl.drawElements(WebGL2RenderingContext.LINE_STRIP, vao.elementBuffer.getData().byteLength / 2, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
        vao.unbind();
    }
    drawTriangles(vao) {
        vao.bind();
        this.gl.drawElements(WebGL2RenderingContext.TRIANGLES, vao.elementBuffer.getData().byteLength / 2, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
        vao.unbind();
    }
    draw(drawable) {
        const state = drawable.bind();
        this.gl.drawElements(state.mode, state.elementCount, WebGL2RenderingContext.UNSIGNED_SHORT, 0);
        drawable.unbind();
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
    getAttributeLocation(name) {
        return this.gl.getAttribLocation(this.handle, name);
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
class Sprite {
    constructor(renderer, texturePath, pos, size, angle = 0) {
        this.pos = pos;
        this.size = size;
        this.angle = angle;
        this.shader = new Shader(renderer, `
            attribute vec2 aPosition;
            attribute vec2 aTexCoord;
            
            uniform vec2 uPos;
            uniform vec2 uSize;
            uniform float uAngle;

            varying highp vec2 vTexCoord;

            void main()
            {
                float c = cos(uAngle);
                float s = sin(uAngle);
                vec2 pos = aPosition * uSize;
                pos = vec2(c * pos.x - s * pos.y, s * pos.x + c * pos.y) + uPos;
                gl_Position = vec4(pos, 0, 1);
                vTexCoord = aTexCoord;
            }
            `, `
            precision mediump float;

            varying highp vec2 vTexCoord;

            uniform sampler2D uTexture0;

            void main()
            {
                gl_FragColor = texture2D(uTexture0, vTexCoord);
            }
            `);
        const vbo = new VertexBuffer(renderer, new Float32Array([
            -1, -1, 0, 1,
            -1, 1, 0, 0,
            1, 1, 1, 0,
            1, -1, 1, 1
        ]));
        const ebo = new ElementBuffer(renderer, new Uint16Array([0, 1, 2, 0, 2, 3]));
        this.vertexArray = new VertexArray(renderer, ebo, this.shader);
        this.vertexArray.addVertexAttributes(vbo, AttributeType.float, { count: 2, name: "aPosition" }, { count: 2, name: "aTexCoord" });
        this.texture = new Texture(renderer, texturePath);
    }
    bind() {
        this.vertexArray.bind();
        this.shader.setUniform1i("uTexture0", 0);
        this.shader.setUniform2f("uPos", this.pos.x, this.pos.y);
        this.shader.setUniform2f("uSize", this.size.x, this.size.y);
        this.shader.setUniform1f("uAngle", this.angle * Math.PI / 180);
        this.texture.bind(TextureSlot.texture0);
        return { mode: WebGL2RenderingContext.TRIANGLES, elementCount: 6 };
    }
    unbind() {
        this.texture.unbind();
        this.vertexArray.unbind();
    }
}
var TextureSlot;
(function (TextureSlot) {
    TextureSlot[TextureSlot["texture0"] = WebGL2RenderingContext.TEXTURE0] = "texture0";
    TextureSlot[TextureSlot["texture1"] = WebGL2RenderingContext.TEXTURE1] = "texture1";
    TextureSlot[TextureSlot["texture2"] = WebGL2RenderingContext.TEXTURE2] = "texture2";
    TextureSlot[TextureSlot["texture3"] = WebGL2RenderingContext.TEXTURE3] = "texture3";
    TextureSlot[TextureSlot["texture4"] = WebGL2RenderingContext.TEXTURE4] = "texture4";
    TextureSlot[TextureSlot["texture5"] = WebGL2RenderingContext.TEXTURE5] = "texture5";
    TextureSlot[TextureSlot["texture6"] = WebGL2RenderingContext.TEXTURE6] = "texture6";
    TextureSlot[TextureSlot["texture7"] = WebGL2RenderingContext.TEXTURE7] = "texture7";
    TextureSlot[TextureSlot["texture8"] = WebGL2RenderingContext.TEXTURE8] = "texture8";
    TextureSlot[TextureSlot["texture9"] = WebGL2RenderingContext.TEXTURE9] = "texture9";
    TextureSlot[TextureSlot["texture10"] = WebGL2RenderingContext.TEXTURE10] = "texture10";
    TextureSlot[TextureSlot["texture11"] = WebGL2RenderingContext.TEXTURE11] = "texture11";
    TextureSlot[TextureSlot["texture12"] = WebGL2RenderingContext.TEXTURE12] = "texture12";
    TextureSlot[TextureSlot["texture13"] = WebGL2RenderingContext.TEXTURE13] = "texture13";
    TextureSlot[TextureSlot["texture14"] = WebGL2RenderingContext.TEXTURE14] = "texture14";
    TextureSlot[TextureSlot["texture15"] = WebGL2RenderingContext.TEXTURE15] = "texture15";
    TextureSlot[TextureSlot["texture16"] = WebGL2RenderingContext.TEXTURE16] = "texture16";
    TextureSlot[TextureSlot["texture17"] = WebGL2RenderingContext.TEXTURE17] = "texture17";
    TextureSlot[TextureSlot["texture18"] = WebGL2RenderingContext.TEXTURE18] = "texture18";
    TextureSlot[TextureSlot["texture19"] = WebGL2RenderingContext.TEXTURE19] = "texture19";
    TextureSlot[TextureSlot["texture20"] = WebGL2RenderingContext.TEXTURE20] = "texture20";
    TextureSlot[TextureSlot["texture21"] = WebGL2RenderingContext.TEXTURE21] = "texture21";
    TextureSlot[TextureSlot["texture22"] = WebGL2RenderingContext.TEXTURE22] = "texture22";
    TextureSlot[TextureSlot["texture23"] = WebGL2RenderingContext.TEXTURE23] = "texture23";
    TextureSlot[TextureSlot["texture24"] = WebGL2RenderingContext.TEXTURE24] = "texture24";
    TextureSlot[TextureSlot["texture25"] = WebGL2RenderingContext.TEXTURE25] = "texture25";
    TextureSlot[TextureSlot["texture26"] = WebGL2RenderingContext.TEXTURE26] = "texture26";
    TextureSlot[TextureSlot["texture27"] = WebGL2RenderingContext.TEXTURE27] = "texture27";
    TextureSlot[TextureSlot["texture28"] = WebGL2RenderingContext.TEXTURE28] = "texture28";
    TextureSlot[TextureSlot["texture29"] = WebGL2RenderingContext.TEXTURE29] = "texture29";
    TextureSlot[TextureSlot["texture30"] = WebGL2RenderingContext.TEXTURE30] = "texture30";
    TextureSlot[TextureSlot["texture31"] = WebGL2RenderingContext.TEXTURE31] = "texture31";
})(TextureSlot || (TextureSlot = {}));
class Texture {
    constructor(renderer, path) {
        this.gl = renderer.gl;
        this.handle = this.gl.createTexture();
        this.bind(TextureSlot.texture0);
        this.gl.texImage2D(WebGL2RenderingContext.TEXTURE_2D, 0, WebGL2RenderingContext.RGBA, 1, 1, 0, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.UNSIGNED_BYTE, new Uint8Array([255, 0, 255, 255]));
        this.unbind();
        const image = new Image();
        image.addEventListener("load", () => {
            this.bind(TextureSlot.texture0);
            this.gl.texImage2D(WebGL2RenderingContext.TEXTURE_2D, 0, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.RGBA, WebGL2RenderingContext.UNSIGNED_BYTE, image);
            this.gl.texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_WRAP_S, WebGL2RenderingContext.MIRRORED_REPEAT);
            this.gl.texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_WRAP_T, WebGL2RenderingContext.MIRRORED_REPEAT);
            this.gl.generateMipmap(WebGL2RenderingContext.TEXTURE_2D);
            this.unbind();
        });
        image.src = path;
    }
    bind(textureSlot) {
        this.gl.activeTexture(textureSlot);
        this.boundSlot = textureSlot;
        this.gl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.handle);
    }
    unbind() {
        this.gl.activeTexture(this.boundSlot);
        this.gl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, null);
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
        this.gl = renderer.gl;
        this.shader = shader;
        this.handle = this.gl.createVertexArray();
        this.updateElementBuffer(elementBuffer);
    }
    updateElementBuffer(elementBuffer) {
        this.elementBuffer = elementBuffer;
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
        let stride = 0;
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            stride += attribute.count * typeSize;
        }
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            const uniformLocation = this.shader.getAttributeLocation(attribute.name);
            gl.enableVertexAttribArray(uniformLocation);
            gl.vertexAttribPointer(uniformLocation, attribute.count, type, false, stride, offset);
            offset += typeSize * attribute.count;
        }
        vertexBuffer.unbind();
        this.unbind();
    }
    bind() {
        this.gl.bindVertexArray(this.handle);
        this.shader.bind();
        this.previouslyBoundVertexArray = VertexArray.boundVertexArray;
        VertexArray.boundVertexArray = this;
    }
    unbind() {
        this.shader.unbind();
        this.gl.bindVertexArray(this.previouslyBoundVertexArray?.handle ?? null);
        VertexArray.boundVertexArray = this.previouslyBoundVertexArray;
    }
}
var MuscleName;
(function (MuscleName) {
    MuscleName["rightForearm"] = "Right forearm";
    MuscleName["leftForearm"] = "Left forearm";
    MuscleName["rightBiscep"] = "Right biscep";
    MuscleName["leftBiscep"] = "Left biscep";
    MuscleName["heart"] = "Heart";
    MuscleName["brain"] = "Brain";
})(MuscleName || (MuscleName = {}));
function createGamestate() {
    return {
        debug: true,
        virusState: { src: "images/virus.png", speed: 0.0001, size: new Vector2(0.02, 0.02) },
        virus: [],
        bloodVeins: [
            {
                startMuscle: MuscleName.leftForearm,
                stopMuscle: MuscleName.leftBiscep,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.leftForearm,
                stopMuscle: MuscleName.leftBiscep,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.leftBiscep,
                stopMuscle: MuscleName.heart,
                thickness: 0.01,
            },
            {
                startMuscle: MuscleName.rightForearm,
                stopMuscle: MuscleName.rightBiscep,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.rightBiscep,
                stopMuscle: MuscleName.heart,
                thickness: 0.01,
            },
            {
                startMuscle: MuscleName.heart,
                stopMuscle: MuscleName.brain,
                thickness: 0.015,
            },
        ],
        wounds: [],
        muscles: [
            {
                name: MuscleName.rightForearm,
                pos: new Vector2(-0.57, 0.10),
                size: new Vector2(0.05, 0.075),
                angle: 40,
                src: "images/forearm.png",
                infected: false,
            },
            {
                name: MuscleName.rightBiscep,
                pos: new Vector2(-0.45, 0.27),
                size: new Vector2(0.05, 0.075),
                angle: -55,
                src: "images/bicep.png",
                infected: false,
            },
            {
                name: MuscleName.leftForearm,
                pos: new Vector2(0.57, 0.10),
                size: new Vector2(0.05, 0.075),
                angle: 40 - 90,
                src: "images/forearm.png",
                infected: false,
            },
            {
                name: MuscleName.leftBiscep,
                pos: new Vector2(0.45, 0.27),
                size: new Vector2(0.05, 0.075),
                angle: -55 + 90,
                src: "images/bicep.png",
                infected: false,
            },
            {
                name: MuscleName.heart,
                pos: new Vector2(0.1, 0.32),
                size: new Vector2(0.05, 0.05),
                angle: 0,
                src: "images/heart.png",
                infected: false,
            },
            {
                name: MuscleName.brain,
                pos: new Vector2(0, 0.7),
                size: new Vector2(0.05, 0.05),
                angle: 0,
                src: "images/brain.png",
                infected: false,
            },
        ],
        body: { src: "images/stickman.png" },
    };
}
function getVeinMuscle(state, name) {
    for (let j = 0; j < state.muscles.length; j++) {
        const muscle = state.muscles[j];
        if (muscle.name === name) {
            return muscle;
        }
    }
}
function virusGetPosition(virus) {
    return Vector2.add(virus.startPos, Vector2.mul(Vector2.sub(virus.endPos, virus.startPos), virus.position));
}
function spawnVirus(state, pos, muscleName, minSpawnTime, maxSpawnTime) {
    setTimeout(() => {
        const muscle = getVeinMuscle(state, muscleName);
        state.virus.push({ startPos: pos, endPos: muscle.pos, position: 0, endMuscle: muscle.name });
        spawnVirus(state, pos, muscleName, minSpawnTime, maxSpawnTime);
    }, Math.random() * (maxSpawnTime - minSpawnTime) + minSpawnTime);
}
class BloodVeinRenderer {
    constructor(renderer, state) {
        this.renderer = renderer;
        this.state = state;
        this.veins = new LineArray(renderer, []);
        this.veinCount = 0;
    }
    redraw() {
        if (this.veinCount != this.state.bloodVeins.length + this.state.wounds.length) {
            const lines = [];
            for (let i = 0; i < this.state.bloodVeins.length; i++) {
                const bloodVein = this.state.bloodVeins[i];
                const start = getVeinMuscle(this.state, bloodVein.startMuscle);
                const stop = getVeinMuscle(this.state, bloodVein.stopMuscle);
                lines.push({ pos1: start.pos, pos2: stop.pos, thickness: bloodVein.thickness });
            }
            for (let i = 0; i < this.state.wounds.length; i++) {
                const wound = this.state.wounds[i];
                const muscle = getVeinMuscle(this.state, wound.connection);
                lines.push({ pos1: wound.pos, pos2: muscle.pos, thickness: 0.001 });
            }
            this.veins.setLines(lines);
        }
        this.renderer.draw(this.veins);
    }
}
class BodyRenderer {
    constructor(renderer, state) {
        this.renderer = renderer;
        this.state = state;
        this.bodySprite = new Sprite(this.renderer, this.state.body.src, new Vector2(0, 0), new Vector2(0.8, 0.8));
    }
    redraw() {
        this.renderer.draw(this.bodySprite);
    }
}
class MuscleRenderer {
    constructor(renderer, state) {
        this.renderer = renderer;
        this.state = state;
        this.muscleSprites = [];
        for (let i = 0; i < state.muscles.length; i++) {
            const muscle = state.muscles[i];
            const normal = new Sprite(this.renderer, "images/" + muscle.name + ".png", muscle.pos, muscle.size, muscle.angle);
            const infected = new Sprite(this.renderer, "images/" + muscle.name + " infected.png", muscle.pos, muscle.size, muscle.angle);
            this.muscleSprites.push({ muscle: muscle, normal: normal, infected: infected });
        }
    }
    redraw() {
        for (let i = 0; i < this.muscleSprites.length; i++) {
            const muscleSprite = this.muscleSprites[i];
            if (muscleSprite.muscle.infected) {
                this.renderer.draw(muscleSprite.infected);
            }
            else {
                this.renderer.draw(muscleSprite.normal);
            }
        }
    }
}
class RenderingSystem {
    constructor(canvas, state) {
        this.renderer = new Renderer(canvas);
        this.renderers = [
            new BodyRenderer(this.renderer, state),
            new BloodVeinRenderer(this.renderer, state),
            new MuscleRenderer(this.renderer, state),
            new VirusRenderer(this.renderer, state),
        ];
        requestAnimationFrame(() => this.redraw());
    }
    redraw() {
        for (let i = 0; i < this.renderers.length; i++) {
            const renderer = this.renderers[i];
            renderer.redraw();
        }
        requestAnimationFrame(() => this.redraw());
    }
}
class TemplateRenderer {
    constructor(renderer, state) {
        this.renderer = renderer;
        this.state = state;
    }
    redraw() {
    }
}
class VirusRenderer {
    constructor(renderer, state) {
        this.renderer = renderer;
        this.state = state;
        this.sprite = new Sprite(this.renderer, this.state.virusState.src, new Vector2(0, 0), this.state.virusState.size);
    }
    redraw() {
        for (let i = 0; i < this.state.virus.length; i++) {
            const virus = this.state.virus[i];
            this.sprite.pos = virusGetPosition(virus);
            this.renderer.draw(this.sprite);
        }
    }
}
class DebugUpdater {
    constructor() {
        window.addEventListener("click", this.onClick);
    }
    onClick(ev) {
        const mouseX = (ev.x / window.innerWidth) * 2 - 1;
        const mouseY = (-ev.y / window.innerHeight) * 2 + 1;
        console.log(`new Vector2(${mouseX.toPrecision(2)}, ${mouseY.toPrecision(2)})`);
    }
    tick() {
    }
}
class MuscleToolTipUpdater {
    constructor(state) {
        const tooltipElem = document.createElement("div");
        tooltipElem.id = "tooltip";
        tooltipElem.style.display = "none";
        document.body.appendChild(tooltipElem);
        window.addEventListener("mousemove", (ev) => {
            const x = ev.x;
            const y = ev.y;
            tooltipElem.style.left = x + "px";
            tooltipElem.style.top = y + "px";
            const muscles = state.muscles;
            const mousePos = new Vector2((ev.x / window.innerWidth) * 2 - 1, (-ev.y / window.innerHeight) * 2 + 1);
            let closestMuscle = { distSqr: Vector2.sub(muscles[0].pos, mousePos).lengthSqr(), muscle: muscles[0] };
            for (let i = 0; i < muscles.length; i++) {
                const muscle = muscles[i];
                const distSqr = Vector2.sub(muscle.pos, mousePos).lengthSqr();
                if (distSqr < closestMuscle.distSqr) {
                    closestMuscle = { distSqr: distSqr, muscle: muscle };
                }
            }
            if (closestMuscle.distSqr <= closestMuscle.muscle.size.lengthSqr()) {
                tooltipElem.textContent = closestMuscle.muscle.name;
                tooltipElem.style.display = "block";
            }
            else {
                tooltipElem.style.display = "none";
            }
        });
    }
}
class MuscleUpdater {
    constructor(state) {
        this.state = state;
        this.infectedMuscles = [];
        setTimeout(() => {
            for (let i = 0; i < this.state.muscles.length; i++) {
                const muscle = this.state.muscles[i];
                if (muscle.infected && !this.infectedMuscles.find(m => m.name === muscle.name)) {
                    this.infectedMuscles.push(muscle);
                    spawnVirus(this.state, muscle.pos, muscle.name, 3000, 10000);
                }
            }
        }, 1000);
    }
}
class UpdateSystem {
    constructor(state) {
        this.updaters = [
            new MuscleToolTipUpdater(state),
            new WoundUpdater(state),
            new VirusUpdater(state),
        ];
        if (state.debug) {
            this.updaters.push(new DebugUpdater());
        }
    }
}
class VirusUpdater {
    constructor(state) {
        this.state = state;
        window.addEventListener("click", (ev) => this.onClick(ev));
        requestAnimationFrame((t) => this.updateVirus(t));
    }
    onClick(ev) {
        const mouseX = (ev.x / window.innerWidth) * 2 - 1;
        const mouseY = (-ev.y / window.innerHeight) * 2 + 1;
        const mouse = new Vector2(mouseX, mouseY);
        let closestVirus = { distanceSqr: 10000, index: -1 };
        for (let i = 0; i < this.state.virus.length; i++) {
            const virus = this.state.virus[i];
            const distSqr = Vector2.sub(mouse, virusGetPosition(virus)).lengthSqr();
            if (distSqr < this.state.virusState.size.lengthSqr()) {
                closestVirus = { distanceSqr: distSqr, index: i };
            }
        }
        if (closestVirus.distanceSqr < this.state.virusState.size.lengthSqr()) {
            this.state.virus.splice(closestVirus.index, 1);
        }
    }
    updateVirus(time) {
        const deltaTime = time - this.lastTime;
        for (let i = 0; i < this.state.virus.length; i++) {
            const virus = this.state.virus[i];
            virus.position += deltaTime * this.state.virusState.speed;
            if (virus.position >= 1) {
                if (Math.random() >= 0.5) {
                    const muscle = getVeinMuscle(this.state, virus.endMuscle);
                    muscle.infected = true;
                    this.state.virus.splice(i, 1);
                }
            }
        }
        this.lastTime = time;
        requestAnimationFrame((t) => this.updateVirus(t));
    }
}
class WoundUpdater {
    constructor(state) {
        this.state = state;
        setTimeout(() => this.placeWound(), 1000);
    }
    placeWound() {
        let thicknessSum = 0;
        for (let i = 0; i < this.state.bloodVeins.length; i++) {
            const vein = this.state.bloodVeins[i];
            thicknessSum += 1 - vein.thickness;
        }
        let randomValue = Math.random() * thicknessSum;
        for (let i = 0; i < this.state.bloodVeins.length; i++) {
            const vein = this.state.bloodVeins[i];
            randomValue -= 1 - vein.thickness;
            if (randomValue <= 0) {
                const angle = Math.random() * Math.PI * 2;
                const len = Math.random() * 0.05 + 0.1;
                const muscle = getVeinMuscle(this.state, vein.startMuscle);
                const pos = Vector2.add(muscle.pos, new Vector2(Math.cos(angle) * len, Math.sin(angle) * len));
                const wound = { pos: pos, connection: vein.startMuscle };
                this.state.wounds.push(wound);
                spawnVirus(this.state, wound.pos, wound.connection, 3000, 10000);
                setTimeout(() => this.placeWound(), Math.random() * 7000 + 3000);
                return;
            }
        }
    }
}
//# sourceMappingURL=script.js.map