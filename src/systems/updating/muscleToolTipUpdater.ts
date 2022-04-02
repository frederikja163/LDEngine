class MuscleToolTipUpdater
{
    constructor(state: GameState)
    {
        const tooltipElem: HTMLDivElement = document.createElement("div");
        tooltipElem.id = "tooltip";
        tooltipElem.style.display = "none";
        document.body.appendChild(tooltipElem);

        window.addEventListener("mousemove", (ev: MouseEvent) =>
        {
            const x = ev.x;
            const y = ev.y;
            tooltipElem.style.left = x + "px";
            tooltipElem.style.top = y + "px";

            const muscles: Muscle[] = state.muscles;
            const mousePos: Vector2 = new Vector2((ev.x / window.innerWidth) * 2 - 1, (-ev.y / window.innerHeight) * 2 + 1);
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

            if(closestMuscle.distSqr <= closestMuscle.muscle.size.lengthSqr())
            {
                tooltipElem.textContent = closestMuscle.muscle.name;
                tooltipElem.style.display = "block";
            }
            else
            {
                tooltipElem.style.display = "none";
            }
        });
    }
}