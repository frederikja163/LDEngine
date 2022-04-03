class MuscleToolTipUpdater
{
    private readonly tooltipElem: HTMLDivElement;
    constructor(state: GameState)
    {
        this.tooltipElem = document.createElement("div");
        this.tooltipElem.id = "tooltip";
        this.tooltipElem.style.display = "none";
        document.body.appendChild(this.tooltipElem);

        window.addEventListener("click", () =>
        {
            document.getSelection().removeAllRanges();
        });

        window.addEventListener("mousemove", (ev: MouseEvent) =>
        {
            const muscles: Muscle[] = state.muscles;
            const mousePos: Vector2 = getMousePosition(ev.x, ev.y);
            let closestMuscle: {distSqr: number, muscle: Muscle} = {distSqr: Vector2.sub(muscles[0].pos, mousePos).lengthSqr(), muscle: muscles[0]};
            for(let i: number = 0; i < muscles.length; i++)
            {
                const muscle: Muscle = muscles[i];
                const distSqr: number = Vector2.sub(muscle.pos, mousePos).lengthSqr();
                if(distSqr < closestMuscle.distSqr)
                {
                    closestMuscle = {distSqr: distSqr, muscle: muscle};
                }
            }

            if(closestMuscle.distSqr <= closestMuscle.muscle.size)
            {
                this.displayTooltip(closestMuscle.muscle.name, ev.x, ev.y);
            }
            else
            {
                this.hideTooltip();
            }
        });
    }

    private displayTooltip(message: string, x: number, y: number): void
    {
        this.tooltipElem.textContent = message;
        this.tooltipElem.style.display = "block";
        this.tooltipElem.style.left = x + "px";
        this.tooltipElem.style.top = y + "px";
    }

    private hideTooltip(): void
    {
        this.tooltipElem.style.display = "none";
    }
}