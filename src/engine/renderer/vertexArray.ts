enum AttributeType
{
    byte = WebGL2RenderingContext.BYTE,
    short = WebGL2RenderingContext.SHORT,
    unsignedByte = WebGL2RenderingContext.UNSIGNED_BYTE,
    float = WebGL2RenderingContext.FLOAT,
    halfFloat = WebGL2RenderingContext.HALF_FLOAT,
}

class VertexArray
{
    private previouslyBoundVertexArray: VertexArray | null;
    private static boundVertexArray: VertexArray | null;

    private readonly gl: WebGL2RenderingContext;
    private readonly handle: WebGLVertexArrayObject;
    private attributeCount: number = 0;

    public constructor(renderer: Renderer, elementBuffer: ElementBuffer)
    {
        this.gl = renderer.gl;

        this.handle = this.gl.createVertexArray();

        this.bind();
        elementBuffer.bind();
        this.unbind();
        elementBuffer.unbind();
    }

    public addVertexAttributes(vertexBuffer: VertexBuffer, type: AttributeType, ...attributeCounts: number[])
    {
        const gl = this.gl;

        this.bind();
        vertexBuffer.bind();

        let offset: number = 0;
        let typeSize: number = 0;
        switch(type)
        {
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

        for(let i: number = 0; i < attributeCounts.length; i++)
        {
            const count = attributeCounts[i];
            gl.enableVertexAttribArray(this.attributeCount);
            gl.vertexAttribPointer(this.attributeCount, count, type, false, 0, offset);

            offset += typeSize * count;
        }

        vertexBuffer.unbind();
        this.unbind();
    }

    public bind(): void
    {
        this.gl.bindVertexArray(this.handle);

        this.previouslyBoundVertexArray = VertexArray.boundVertexArray;
        VertexArray.boundVertexArray = this;
    }

    public unbind(): void
    {
        this.gl.bindVertexArray(this.previouslyBoundVertexArray?.handle ?? null);

        VertexArray.boundVertexArray = this.previouslyBoundVertexArray;
    }
}