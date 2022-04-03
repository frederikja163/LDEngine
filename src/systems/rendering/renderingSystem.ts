interface IRenderer
{
    redraw(): void;
}

class RenderingSystem
{
    private readonly renderers: IRenderer[];
    private readonly alwaysOn: IRenderer[];
    private readonly renderer: Renderer;
    private readonly state: GameState;
    private isOverlayActive: boolean = false;

    public constructor(canvas: HTMLCanvasElement, state: GameState)
    {
        this.renderer = new Renderer(canvas);
        this.state = state;

        this.alwaysOn = [
            new BodyRenderer(this.renderer, state),
        ];

        this.renderers = [
            new MuscleRenderer(this.renderer, state),
            new BloodVeinRenderer(this.renderer, state),
            new VirusRenderer(this.renderer, state),
        ];

        canvas.addEventListener("mouseenter", (ev) =>
        {
            this.isOverlayActive = true;
        });
        canvas.addEventListener("mouseleave", (ev) =>
        {
            this.isOverlayActive = false;
        });

        setTimeout(() =>
        {
            requestAnimationFrame(() => this.redraw());
        }, 100);
    }

    private redraw(): void
    {
        this.renderer.clear();
        for(let i: number = 0; i < this.alwaysOn.length; i++)
        {
            const renderer = this.alwaysOn[i];
            renderer.redraw();
        }
        if(this.isOverlayActive)
        {
            for(let i: number = 0; i < this.renderers.length; i++)
            {
                const renderer = this.renderers[i];
                renderer.redraw();
            }
        }
        requestAnimationFrame(() => this.redraw());
        if(this.state.alive)
        {
        }
    }
}