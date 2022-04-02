class DebugUpdater
{
    public constructor()
    {
        window.addEventListener("click", this.onClick);
    }

    private onClick(ev: MouseEvent): void
    {
        const mouseX: number = (ev.x / window.innerWidth) * 2 - 1;
        const mouseY: number = (-ev.y / window.innerHeight) * 2 + 1;
        // console.log("Mouse click on: (",
        //     mouseX,
        //     ", ",
        //     mouseY, ")");
        console.log(`new Vector2(${mouseX.toPrecision(2)}, ${mouseY.toPrecision(2)})`);
    }

    public tick(): void
    {
    }
}
