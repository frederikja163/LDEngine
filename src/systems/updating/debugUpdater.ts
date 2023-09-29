class DebugUpdater
{
    public constructor()
    {
        window.addEventListener("click", this.onClick);
    }

    private onClick(ev: MouseEvent): void
    {
        const mouse = getMousePosition(ev.x, ev.y);
        // console.log("Mouse click on: (",
        //     mouseX,
        //     ", ",
        //     mouseY, ")");
        console.log(`new Vector2(${mouse.x.toPrecision(2)}, ${mouse.y.toPrecision(2)})`);
    }
}
