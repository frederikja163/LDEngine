class ScoreUpdater
{
    private readonly state: GameState;
    private readonly highscore: number = 0;

    public constructor(state: GameState, events: Events)
    {
        this.state = state;

        const highscoreCookie: string = getCookie("highscore");
        if(highscoreCookie === "")
        {
            this.highscore = 0;
        }
        else
        {
            this.highscore = parseInt(highscoreCookie);
        }

        document.querySelector("#name").textContent = "Name: " + state.body.name;
        document.querySelector("#highscore").textContent = "Highscore: " + this.highscore;
        this.increaseAge();

        events.addEventListener(EventTypes.infected, (e: CustomEvent) => this.onInfected(e.detail));
    }

    private onInfected(muscle: Muscle): void
    {
        if(muscle.name === MuscleName.brain)
        {
            this.state.alive = false;
            if(this.state.body.age > this.highscore)
            {
                setCookie("highscore", this.state.body.age.toString(), 100);
            }
        }
    }

    private increaseAge(): void
    {
        if(!this.state.alive) return;
        this.state.body.age += 1;
        document.querySelector("#age").textContent = "Age: " + this.state.body.age;
        setTimeout(() => this.increaseAge(), 30000);
    }
}