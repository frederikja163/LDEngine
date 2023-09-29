class VirusRenderer implements IRenderer
{
    private readonly renderer: Renderer;
    private readonly state: GameState;
    private readonly sprite: Sprite;

    public constructor(renderer: Renderer, state: GameState)
    {
        this.renderer = renderer;
        this.state = state;

        this.sprite = new Sprite(this.renderer, this.state.virusState.src, new Vector2(0, 0), this.state.virusState.size);
    }

    public redraw(): void
    {
        for(let i: number = 0; i < this.state.virus.length; i++)
        {
            const virus: Virus = this.state.virus[i];
            this.sprite.pos = virusGetPosition(virus);
            this.renderer.draw(this.sprite);
        }
    }
}