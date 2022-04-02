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

            const normal: Sprite = new Sprite(this.renderer, "images/" + muscle.name + ".png", muscle.pos, muscle.size, muscle.angle);
            const infected: Sprite = new Sprite(this.renderer, "images/" + muscle.name + " infected.png", muscle.pos, muscle.size, muscle.angle);
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