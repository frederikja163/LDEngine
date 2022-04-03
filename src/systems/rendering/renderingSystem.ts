interface IRenderer
{
    redraw(): void;
}

class RenderingSystem
{
    private readonly renderers: IRenderer[];
    private readonly renderer: Renderer;
    private readonly state: GameState;

    public constructor(canvas: HTMLCanvasElement, state: GameState)
    {
        this.renderer = new Renderer(canvas);
        this.state = state;

        this.renderers = [
            new BodyRenderer(this.renderer, state),
            new MuscleRenderer(this.renderer, state),
            new BloodVeinRenderer(this.renderer, state),
            new VirusRenderer(this.renderer, state),
        ];
        requestAnimationFrame(() => this.redraw());
    }

    private redraw(): void
    {
        this.renderer.clear();
        for(let i: number = 0; i < this.renderers.length; i++)
        {
            const renderer = this.renderers[i];
            renderer.redraw();
        }
        if(this.state.alive)
        {
            requestAnimationFrame(() => this.redraw());
        }
    }
}