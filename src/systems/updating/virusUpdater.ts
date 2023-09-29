class VirusUpdater
{
    private readonly state: GameState;
    private lastTime: number;
    private readonly events: Events
    private mousePos: Vector2 = new Vector2(-1, -1);

    public constructor(state: GameState, events: Events)
    {
        this.state = state;
        this.events = events;

        window.addEventListener("mousemove", (ev) => this.onMouseMove(ev));
        window.addEventListener("click", (ev) => this.onClick(ev));

        requestAnimationFrame((t) => this.updateVirus(t));
    }

    private onMouseMove(ev: MouseEvent)
    {
        this.mousePos = getMousePosition(ev.x, ev.y);
    }

    private onClick(ev: MouseEvent): void
    {
        if(!this.state.alive) return;
        const mouse = this.mousePos;

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
            playSound("sounds/virus squish.wav");
        }
    }

    private updateVirus(time: number): void
    {
        if(!this.state.alive) return;

        const deltaTime = time - this.lastTime;
        for(let i: number = 0; i < this.state.virus.length; i++)
        {
            const virus: Virus = this.state.virus[i];
            virus.position += deltaTime * this.state.virusState.speed;

            if(virus.position >= 1)
            {
                const muscle: Muscle = getVeinMuscle(this.state, virus.endMuscle);
                if(Math.random() >= 0.25)
                {
                    muscle.infected = true;
                    this.state.virus.splice(i++, 1);
                    this.events.dispatchEvent(new CustomEvent(EventTypes.infected, {detail: muscle}));
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


        let foundVirus: boolean = false;
        for(let i: number = 0; i < this.state.virus.length; i++)
        {
            const virus: Virus = this.state.virus[i];
            const distSqr: number = Vector2.sub(this.mousePos, virusGetPosition(virus)).lengthSqr();
            if(distSqr < this.state.virusState.size.lengthSqr())
            {
                document.body.style.cursor = "pointer";
                foundVirus = true;
                break;
            }
        }
        if(!foundVirus)
        {
            document.body.style.cursor = "default";
        }

        this.lastTime = time;
        requestAnimationFrame((t) => this.updateVirus(t));
    }
}