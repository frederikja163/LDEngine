class TemplateRenderer implements IRenderer
{
    private readonly renderer: Renderer;
    private readonly state: GameState;

    public constructor(renderer: Renderer, state: GameState)
    {
        this.renderer = renderer;
        this.state = state;
    }

    public redraw(): void
    {

    }
}