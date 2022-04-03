class UpdateSystem
{
    private readonly updaters: object[];

    public constructor(state: GameState, events: Events)
    {
        this.updaters = [
            new MuscleToolTipUpdater(state),
            new WoundUpdater(state),
            new VirusUpdater(state, events),
            new MuscleUpdater(state, events),
            new ScoreUpdater(state, events),
        ];

        if(state.debug)
        {
            this.updaters.push(new DebugUpdater());
        }
    }
}