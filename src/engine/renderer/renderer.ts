class Renderer
{
    private readonly canvas: HTMLCanvasElement;
    public readonly gl: WebGL2RenderingContext;

    public constructor(canvas: HTMLCanvasElement)
    {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2");

        this.gl.enable(WebGL2RenderingContext.BLEND);
        this.gl.blendFunc(WebGL2RenderingContext.SRC_ALPHA, WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA);

        this.resize();
        window.addEventListener("resize", () => this.resize());
    }

    private resize(): void
    {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    public clear(): void
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public drawLines(vao: VertexArray): void
    {
        vao.bind();

        this.gl.drawElements(WebGL2RenderingContext.LINES, vao.elementBuffer.getData().byteLength / 2, WebGL2RenderingContext.UNSIGNED_SHORT, 0);

        vao.unbind();
    }

    public drawLineStrip(vao: VertexArray)
    {
        vao.bind();

        this.gl.drawElements(WebGL2RenderingContext.LINE_STRIP, vao.elementBuffer.getData().byteLength / 2, WebGL2RenderingContext.UNSIGNED_SHORT, 0);

        vao.unbind();
    }

    public drawTriangles(vao: VertexArray)
    {
        vao.bind();

        this.gl.drawElements(WebGL2RenderingContext.TRIANGLES, vao.elementBuffer.getData().byteLength / 2, WebGL2RenderingContext.UNSIGNED_SHORT, 0);

        vao.unbind();
    }

    public draw(drawable: IDrawable)
    {
        const state: {mode: number, elementCount: number} = drawable.bind();

        this.gl.drawElements(state.mode, state.elementCount, WebGL2RenderingContext.UNSIGNED_SHORT, 0);

        drawable.unbind();
    }
}