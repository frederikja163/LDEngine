class UpdateSystem
{
    private readonly updaters: object[];
    private readonly state: GameState;
    private readonly woundUpdater: WoundUpdater;
    private readonly hint: Hint;

    public constructor(state: GameState, events: Events)
    {
        this.state = state;
        this.hint = new Hint();

        this.woundUpdater = new WoundUpdater(state);
        this.updaters = [
            new MuscleToolTipUpdater(state),
            this.woundUpdater,
            new VirusUpdater(state, events),
            new MuscleUpdater(state, events),
            new ScoreUpdater(state, events),
            new Powerups(state),
        ];

        if(state.debug)
        {
            this.updaters.push(new DebugUpdater());
        }

        setTimeout(() =>
        {
            this.spawnEvent();
        }, 1000);
    }

    private spawnEvent()
    {
        for(let i = 0; i < woundCount(this.state.body.age); i++)
        {
            this.woundUpdater.placeWound();
        }
        this.hint.displayEvent();

        setTimeout(() =>
        {
            if(!this.state.alive) return;
            this.spawnEvent();
        }, eventTime(this.state.body.age));

        setTimeout(() =>
        {
            if(!this.state.alive) return;
            this.hint.displayHint();
        }, eventTime(this.state.body.age) / 2);
    }
}