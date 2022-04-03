class Hint
{
    private readonly hintElem: HTMLElement;
    private totalHintCount: number = 0;

    public constructor()
    {
        this.hintElem = document.body.querySelector("#hint");
    }

    public displayMessage(): void
    {
        this.hintElem.style.display = "";
        this.hintElem.textContent = selectRandom([
            "Be gone thot.",
            "Good job!",
            "I hate viruses.",
            "I wonder how long i can stay alive for.",
            "Woah, you scared me there.",
            "Oh, hello, have you been there the whole time?",
            "My id is fake, my actual name is Dave",
            "What's a ludum dare?"
        ]);

        setTimeout(() =>
        {
            this.hideHint();
        }, 5000);
    }

    public displayHint(): void
    {
        const hints = [
            "Click the viruses to kill them",
            "View your powerups on the right of the screen.",
            "Press Q to heal your wounds.",
            "W will disinfect a muscle.",
            "Hit that little bugger!",
            "The longer the game goes on the older i get",
            "When i get older you grow weaker",
            "Powerups gets slower as i age",
            "How long do i get to live?",
            "Remember to vote for this game on ludum dare"
        ];
        if(this.totalHintCount >= hints.length)
        {
            this.displayMessage();
            return;
        }
        this.hintElem.style.display = "";
        this.hintElem.textContent = hints[this.totalHintCount++];

        setTimeout(() =>
        {
            this.hideHint();
        }, 5000);
    }

    public displayEvent(): void
    {
        this.hintElem.style.display = "";
        this.hintElem.textContent = selectRandom(["I have fallen and can't get up!",
            "Ouch that one hurt!",
            "I now have a few extra wounds for my collection.",
            "Why does this keep happening?",
            "Why me?",
            "Stop pushing me!",
            "I wish the russians would end the war soon!",
            "Life hurts"
        ]);

        setTimeout(() =>
        {
            this.hideHint();
        }, 5000);
    }

    public hideHint(): void
    {
        this.hintElem.style.display = "none";
    }
}