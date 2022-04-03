interface IRenderer
{
    redraw(): void;
}

class RenderingSystem
{
    private readonly renderers: IRenderer[];
    private readonly alwaysOn: IRenderer[];
    private readonly woundRenderer: IRenderer;
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
        this.woundRenderer = new WoundRenderer(this.renderer, state);

        this.renderers = [
            new MuscleRenderer(this.renderer, state),
            new BloodVeinRenderer(this.renderer, state),
            new VirusRenderer(this.renderer, state),
        ];

        canvas.addEventListener("mouseenter", (ev) => this.enableOverlay());
        canvas.addEventListener("mouseleave", (ev) => this.disableOverlay());
        document.querySelector("#powerups").addEventListener("mouseenter", (ev) => this.enableOverlay());
        document.querySelector("#powerups").addEventListener("mouseleave", (ev) => this.disableOverlay());

        setTimeout(() =>
        {
            requestAnimationFrame(() => this.redraw());
        }, 100);
    }

    private enableOverlay(): void
    {
        this.isOverlayActive = true;
    }
    private disableOverlay(): void
    {
        this.isOverlayActive = false;
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
        this.woundRenderer.redraw();
        requestAnimationFrame(() => this.redraw());
    }
}