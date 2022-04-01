class Renderer
{
    private readonly canvas: HTMLCanvasElement;
    public readonly gl: WebGL2RenderingContext;

    public constructor(canvas: HTMLCanvasElement)
    {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2");

        this.resize();
        window.addEventListener("resize", this.resize);
    }

    private resize(): void
    {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
}