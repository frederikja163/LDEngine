class Sprite implements IDrawable
{
    private readonly shader: Shader;
    private readonly texture: Texture;

    public readonly vertexArray: VertexArray;
    public pos: Vector2;
    public readonly size: Vector2;
    public readonly angle: number;

    constructor(renderer: Renderer, texturePath: string, pos: Vector2, size: Vector2, angle: number = 0)
    {
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
            1, -1, 1, 1]));
        const ebo = new ElementBuffer(renderer, new Uint16Array([0, 1, 2, 0, 2, 3]));
        this.vertexArray = new VertexArray(renderer, ebo, this.shader);
        this.vertexArray.addVertexAttributes(vbo, AttributeType.float,
            {count: 2, name: "aPosition"}, {count: 2, name: "aTexCoord"});

        this.texture = new Texture(renderer, texturePath);
    }

    public bind(): {mode: number, elementCount: number}
    {
        this.vertexArray.bind();
        this.shader.setUniform1i("uTexture0", 0);
        this.shader.setUniform2f("uPos", this.pos.x, this.pos.y);
        this.shader.setUniform2f("uSize", this.size.x, this.size.y);
        this.shader.setUniform1f("uAngle", this.angle * Math.PI / 180);
        this.texture.bind(TextureSlot.texture0);

        return {mode: WebGL2RenderingContext.TRIANGLES, elementCount: 6};
    }

    public unbind(): void
    {
        this.texture.unbind();
        this.vertexArray.unbind();
    }
}