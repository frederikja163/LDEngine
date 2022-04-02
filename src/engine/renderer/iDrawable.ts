interface IDrawable
{
    bind(): {mode: number, elementCount: number};
    unbind(): void;
}