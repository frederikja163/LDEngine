class WoundRenderer implements IRenderer
{
    private readonly renderer: Renderer;
    private readonly state: GameState;
    private readonly sprites: Sprite[];

    public constructor(renderer: Renderer, state: GameState)
    {
        this.renderer = renderer;
        this.state = state;

        this.sprites = [];
        for(let i: number = 0; i < this.state.woundConfig.spriteCount; i++)
        {
            this.sprites.push(new Sprite(this.renderer, `images/wounds/wound${i + 1}.png`, new Vector2(0, 0), this.state.woundConfig.size, 0))
        }
    }

    public redraw(): void
    {
        for(let i: number = 0; i < this.state.wounds.length; i++)
        {
            const wound: Wound = this.state.wounds[i];
            if(wound.sprite === -1)
            {
                continue;
            }
            const sprite: Sprite = this.sprites[wound.sprite];
            sprite.pos = wound.pos;
            this.renderer.draw(sprite);
        }
    }
}