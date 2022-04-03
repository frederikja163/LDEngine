class UpdateSystem
{
    private readonly updaters: object[];

    public constructor(state: GameState)
    {
        this.updaters = [
            new MuscleToolTipUpdater(state),
            new WoundUpdater(state),
            new VirusUpdater(state),
            new MuscleUpdater(state)
        ];

        if(state.debug)
        {
            this.updaters.push(new DebugUpdater());
        }
    }
}