class MuscleUpdater
{
    private readonly state: GameState;
    private infectedMuscles: Muscle[];

    public constructor(state: GameState)
    {
        this.state = state;

        this.infectedMuscles = [];
        setInterval(() =>
        {
            // Add newly infected muscles to the infected group.
            for(let i: number = 0; i < this.state.muscles.length; i++)
            {
                const muscle: Muscle = this.state.muscles[i];
                if(muscle.infected && !this.infectedMuscles.find(m => m.name === muscle.name))
                {
                    this.infectedMuscles.push(muscle);
                    this.spawnVirus(muscle);
                }
            }
        }, 1000);
    }

    public spawnVirus(muscle: Muscle): void
    {
        const endMuscle = getRandomNeighboor(this.state, muscle);
        this.state.virus.push({startPos: muscle.pos, endPos: endMuscle.pos, position: 0, endMuscle: endMuscle.name});
        setTimeout(() => this.spawnVirus(muscle), Math.random() * 7000 + 3000);
    }
}