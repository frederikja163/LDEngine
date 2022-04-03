class VirusUpdater
{
    private readonly state: GameState;
    private lastTime: number;

    public constructor(state: GameState)
    {
        this.state = state;

        window.addEventListener("click", (ev) => this.onClick(ev));

        requestAnimationFrame((t) => this.updateVirus(t));
    }

    private onClick(ev: MouseEvent): void
    {
        const mouseX: number = (ev.x / window.innerWidth) * 2 - 1;
        const mouseY: number = (-ev.y / window.innerHeight) * 2 + 1;
        const mouse = new Vector2(mouseX, mouseY);

        let closestVirus: {distanceSqr: number, index: number} = {distanceSqr: 10000, index: -1};
        for(let i: number = 0; i < this.state.virus.length; i++)
        {
            const virus: Virus = this.state.virus[i];
            const distSqr: number = Vector2.sub(mouse, virusGetPosition(virus)).lengthSqr();
            if(distSqr < this.state.virusState.size.lengthSqr())
            {
                closestVirus = {distanceSqr: distSqr, index: i};
            }
        }

        if(closestVirus.distanceSqr < this.state.virusState.size.lengthSqr())
        {
            this.state.virus.splice(closestVirus.index, 1);
        }
    }

    private updateVirus(time: number): void
    {
        const deltaTime = time - this.lastTime;
        for(let i: number = 0; i < this.state.virus.length; i++)
        {
            const virus: Virus = this.state.virus[i];
            virus.position += deltaTime * this.state.virusState.speed;

            if(virus.position >= 1)
            {
                const muscle: Muscle = getVeinMuscle(this.state, virus.endMuscle);
                if(Math.random() >= 0.5)
                {
                    muscle.infected = true;
                    this.state.virus.splice(i, 1);
                }
                else
                {
                    const endMuscle: Muscle = getRandomNeighboor(this.state, muscle);
                    virus.endPos = endMuscle.pos;
                    virus.endMuscle = endMuscle.name;
                    virus.position = 0;
                    virus.startPos = muscle.pos;
                }
            }
        }
        this.lastTime = time;
        requestAnimationFrame((t) => this.updateVirus(t));
    }
}