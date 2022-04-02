type Line = {pos1: Vector2, pos2: Vector2, thickness: number};

class LineArray implements IDrawable
{
    private readonly renderer: Renderer;
    private vao: VertexArray;
    private lines: Line[];
    private readonly vbo: VertexBuffer;
    private readonly ebo: ElementBuffer;
    private readonly shader: Shader;

    public constructor(renderer: Renderer, lines: Line[])
    {
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
        this.vao.addVertexAttributes(this.vbo, AttributeType.float, {count: 2, name: "aPosition"});
        this.setLines(lines);
    }

    public setLines(lines: Line[]): void
    {
        const vertices: number[] = [];
        const indices: number[] = [];
        for(let i = 0; i < lines.length; i++)
        {
            const line: Line = lines[i];
            const p1: Vector2 = line.pos1;
            const p2: Vector2 = line.pos2;
            const dif: Vector2 = Vector2.sub(p1, p2);
            const orth: Vector2 = Vector2.mul(dif.orthorgonal().normalized(), line.thickness);
            vertices.push(line.pos1.x + orth.x, line.pos1.y + orth.y, line.pos1.x - orth.x, line.pos1.y - orth.y,
                line.pos2.x + orth.x, line.pos2.y + orth.y, line.pos2.x - orth.x, line.pos2.y - orth.y);
            indices.push(
                i * 4 + 0, i * 4 + 1, i * 4 + 3,
                i * 4 + 0, i * 4 + 2, i * 4 + 3);
        }

        this.vbo.bind();
        this.vbo.setData(new Float32Array(vertices), WebGL2RenderingContext.STATIC_DRAW);
        this.vbo.unbind();
        this.ebo.bind();
        this.ebo.setData(new Uint16Array(indices), WebGL2RenderingContext.STATIC_DRAW);
        this.ebo.unbind();

        this.vao.updateElementBuffer(this.ebo);
        this.vao.addVertexAttributes(this.vbo, AttributeType.float, {count: 2, name: "aPosition"});

        this.lines = lines;
    }

    public bind(): {mode: number; elementCount: number;}
    {
        this.vao.bind();

        return {mode: WebGL2RenderingContext.TRIANGLES, elementCount: this.lines.length * 6};
    }

    public unbind(): void
    {
        this.vao.unbind();
    }

}