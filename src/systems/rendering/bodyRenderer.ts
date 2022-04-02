class BodyRenderer implements IRenderer
{
    private readonly renderer: Renderer;
    private readonly state: GameState;

    private readonly bodySprite: Sprite;

    public constructor(renderer: Renderer, state: GameState)
    {
        this.renderer = renderer;
        this.state = state;

        this.bodySprite = new Sprite(this.renderer, this.state.body.src,
            new Vector2(0, 0), new Vector2(0.8, 0.8));
    }

    public redraw(): void
    {
        this.renderer.draw(this.bodySprite);
    }
}