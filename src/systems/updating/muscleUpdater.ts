class MuscleUpdater
{
    private readonly state: GameState;
    private infectedMuscles: Muscle[];

    public constructor(state: GameState)
    {
        this.state = state;

        this.infectedMuscles = [];
        setTimeout(() =>
        {
            // Add newly infected muscles to the infected group.
            for(let i: number = 0; i < this.state.muscles.length; i++)
            {
                const muscle: Muscle = this.state.muscles[i];
                if(muscle.infected && !this.infectedMuscles.find(m => m.name === muscle.name))
                {
                    this.infectedMuscles.push(muscle);
                    spawnVirus(this.state, muscle.pos, muscle.name, 3000, 10000);
                }
            }
        }, 1000);
    }
}