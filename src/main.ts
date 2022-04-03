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
    const updateSystem: UpdateSystem = new UpdateSystem(state, events);
}

window.addEventListener("load", main);