class ScoreUpdater
{
    private readonly state: GameState;

    public constructor(state: GameState, events: Events)
    {
        this.state = state;

        events.addEventListener(EventTypes.infected, (e: CustomEvent) => this.onInfected(e.detail));
    }

    private onInfected(muscle: Muscle)
    {
        if(muscle.name === MuscleName.brain)
        {
            this.state.alive = false;
        }
    }
}