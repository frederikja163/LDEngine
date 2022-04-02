class BloodVeinRenderer implements IRenderer
{
    private readonly renderer: Renderer;
    private readonly state: GameState;
    private readonly veins: LineArray;
    private readonly veinCount: number;

    public constructor(renderer: Renderer, state: GameState)
    {
        this.renderer = renderer;
        this.state = state;

        this.veins = new LineArray(renderer, []);

        this.veinCount = 0;
    }

    public redraw(): void
    {
        if(this.veinCount != this.state.bloodVeins.length + this.state.wounds.length)
        {
            const lines: Line[] = [];
            for(let i = 0; i < this.state.bloodVeins.length; i++)
            {
                const bloodVein: BloodVein = this.state.bloodVeins[i];
                const start: Muscle = getVeinMuscle(this.state, bloodVein.startMuscle);
                const stop: Muscle = getVeinMuscle(this.state, bloodVein.stopMuscle);
                lines.push({pos1: start.pos, pos2: stop.pos, thickness: bloodVein.thickness});
            }
            for(let i = 0; i < this.state.wounds.length; i++)
            {
                const wound: Wound = this.state.wounds[i];
                const muscle: Muscle = getVeinMuscle(this.state, wound.connection);
                lines.push({pos1: wound.pos, pos2: muscle.pos, thickness: 0.001});
            }
            this.veins.setLines(lines);
        }

        this.renderer.draw(this.veins);
    }
}