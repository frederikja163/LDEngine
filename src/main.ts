/*
TODO: idle animation
Difficulty selection
eye animation
mouth animation


difficulty scaling
hint giving
*/

function main(): void
{
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    const events: Events = new Events();

    const state: GameState = createGamestate();
    const renderingSystem: RenderingSystem = new RenderingSystem(canvas, state);
    const canvasSize: Vector2 = new Vector2(canvas.clientWidth, canvas.clientHeight);


    document.querySelector("#name").textContent = "Name: " + state.body.name;
    document.querySelector("#highscore").textContent = "Highscore: " + getCookie("highscore");

    let started: boolean = false;
    canvas.addEventListener("click", () =>
    {
        if(started)
        {
            return;
        }
        const updateSystem: UpdateSystem = new UpdateSystem(state, events);
        started = true;

    })
}

window.addEventListener("load", main);