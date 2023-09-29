type MuscleSprite = {muscle: Muscle, normal: Sprite, infected: Sprite}
class MuscleRenderer implements IRenderer
{
    private readonly renderer: Renderer;
    private readonly state: GameState;
    private readonly muscleSprites: MuscleSprite[];

    public constructor(renderer: Renderer, state: GameState)
    {
        this.renderer = renderer;
        this.state = state;

        this.muscleSprites = [];
        for(let i: number = 0; i < state.muscles.length; i++)
        {
            const muscle: Muscle = state.muscles[i];

            let size: Vector2 = this.state.body.size;
            let name: string = muscle.name;
            if(name.startsWith("Right"))
            {
                size = Vector2.mul(size, new Vector2(-1, 1));
                name = "Left " + name.substring(6);
            }
            const normal: Sprite = new Sprite(this.renderer, "images/" + name + ".png", new Vector2(0, 0), size, 0);
            const infected: Sprite = new Sprite(this.renderer, "images/" + name + " infected.png", new Vector2(0, 0), size, 0);
            this.muscleSprites.push({muscle: muscle, normal: normal, infected: infected});
        }
    }

    public redraw(): void
    {
        for(let i: number = 0; i < this.muscleSprites.length; i++)
        {
            const muscleSprite: MuscleSprite = this.muscleSprites[i];
            if(muscleSprite.muscle.infected)
            {
                this.renderer.draw(muscleSprite.infected);
            }
            else
            {
                this.renderer.draw(muscleSprite.normal);
            }
        }
    }
}