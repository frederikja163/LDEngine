class Powerups
{
    private woundCooldown: number = 0;
    private disinfectCooldown: number = 0;

    constructor(state: GameState)
    {
        document.querySelector("#powerups-wound").addEventListener("click", () =>
        {
            if(!state.alive || this.woundCooldown != 0) return;

            const wounds: Wound[] = [];
            for(let i: number = 0; i < state.wounds.length; i++)
            {
                if(state.wounds[i].sprite != -1)
                {
                    wounds.push(state.wounds[i]);
                }
            }
            if(wounds.length == 0)
            {
                return;
            }
            selectRandom(wounds).sprite = -1;
            this.woundCooldown = woundCooldown(state.body.age);
            document.querySelector("#powerups-wound").lastChild.textContent = this.woundCooldown.toString();
        });
        document.querySelector("#powerups-disinfect").addEventListener("click", () =>
        {
            if(!state.alive || this.disinfectCooldown != 0) return;

            const muscles: Muscle[] = [];
            for(let i: number = 0; i < state.muscles.length; i++)
            {
                if(state.muscles[i].infected)
                {
                    muscles.push(state.muscles[i]);
                }
            }

            if(muscles.length == 0)
            {
                return;
            }
            selectRandom(muscles).infected = false;
            this.disinfectCooldown = disinfectCooldown(state.body.age);
            document.querySelector("#powerups-disinfect").lastChild.textContent = this.disinfectCooldown.toString();
        });
        // document.querySelector("#powerups-freeze").addEventListener("click", () =>
        // {
        //     if(!state.alive) return;
        // })
        const interval: number = setInterval(() =>
        {
            if(!state.alive)
            {
                clearInterval(interval);
                return;
            }
            this.woundCooldown -= this.woundCooldown > 0 ? 1 : 0;
            document.querySelector("#powerups-wound").lastChild.textContent = this.woundCooldown.toString();
            this.disinfectCooldown -= this.disinfectCooldown > 0 ? 1 : 0;
            document.querySelector("#powerups-disinfect").lastChild.textContent = this.disinfectCooldown.toString();
        }, 1000);
    }
}