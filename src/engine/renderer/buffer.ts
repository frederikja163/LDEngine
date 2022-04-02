enum BufferTarget
{
    VertexBuffer = WebGL2RenderingContext.ARRAY_BUFFER,
    ElementBuffer = WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER,
}

enum BufferUsageHint
{
    staticRead = WebGL2RenderingContext.STATIC_READ,
    staticDraw = WebGL2RenderingContext.STATIC_DRAW,
    staticCopy = WebGL2RenderingContext.STATIC_COPY,
    streamRead = WebGL2RenderingContext.STREAM_READ,
    streamDraw = WebGL2RenderingContext.STREAM_DRAW,
    streamCopy = WebGL2RenderingContext.STREAM_COPY,
    dynamicRead = WebGL2RenderingContext.DYNAMIC_READ,
    dynamicDraw = WebGL2RenderingContext.DYNAMIC_DRAW,
    dynamicCopy = WebGL2RenderingContext.DYNAMIC_COPY,
}

class Buffer
{
    private previouslyBoundBuffer: Buffer | null;
    private static readonly boundBuffer: (Buffer | null)[] = [];

    private readonly gl: WebGL2RenderingContext;
    private readonly handle: WebGLBuffer;
    private readonly bufferTarget: BufferTarget;
    private bufferSource: BufferSource;

    public constructor(renderer: Renderer, bufferTarget: BufferTarget)
    {
        this.gl = renderer.gl;
        this.handle = this.gl.createBuffer();
        this.bufferTarget = bufferTarget;
    }

    public delete(): void
    {
        this.gl.deleteBuffer(this.handle);
    }

    public setData(data: BufferSource, usage: BufferUsageHint)
    {
        this.gl.bufferData(this.bufferTarget, data, usage);
        this.bufferSource = data;
    }

    public getData(): BufferSource
    {
        return this.bufferSource;
    }

    public bind(): void
    {
        if(Buffer.boundBuffer[this.bufferTarget] == this)
        {
            return;
        }

        this.gl.bindBuffer(this.bufferTarget, this.handle);

        this.previouslyBoundBuffer = Buffer.boundBuffer[this.bufferTarget];
        Buffer.boundBuffer[this.bufferTarget] = this;
    }

    public unbind(): void
    {
        this.gl.bindBuffer(this.bufferTarget, this.previouslyBoundBuffer?.handle ?? null);

        Buffer.boundBuffer[this.bufferTarget] = this.previouslyBoundBuffer;
    }
}

class VertexBuffer extends Buffer
{
    public constructor(renderer: Renderer, data: Float32Array)
    {
        super(renderer, BufferTarget.VertexBuffer);
        this.bind();
        this.setData(data, BufferUsageHint.staticDraw);
        this.unbind();
    }
}

class ElementBuffer extends Buffer
{
    public constructor(renderer: Renderer, data: Uint16Array)
    {
        super(renderer, BufferTarget.ElementBuffer);
        this.bind();
        this.setData(data, BufferUsageHint.staticDraw);
        this.unbind();
    }
}