class MuscleUpdater
{
    private readonly state: GameState;

    public constructor(state: GameState, events: Events)
    {
        this.state = state;

        events.addEventListener(EventTypes.infected, (e: CustomEvent) => this.spawnVirus(e.detail));
    }

    public spawnVirus(muscle: Muscle): void
    {
        if(!this.state.alive || !muscle.infected) return;

        const endMuscle = getRandomNeighboor(this.state, muscle);
        this.state.virus.push({startPos: muscle.pos, endPos: endMuscle.pos, position: 0, endMuscle: endMuscle.name});
        setTimeout(() => this.spawnVirus(muscle), Math.random() * 7000 + 3000);
    }
}