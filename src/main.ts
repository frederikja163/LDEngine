function main(): void
{
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    const state: GameState = createGamestate();
    const renderingSystem: RenderingSystem = new RenderingSystem(canvas, state);
    const canvasSize: Vector2 = new Vector2(canvas.clientWidth, canvas.clientHeight);
    const updateSystem: UpdateSystem = new UpdateSystem(state);
}

window.addEventListener("load", main);