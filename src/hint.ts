class Hint
{
    private readonly hintElem: HTMLElement;

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
            "My id is fake, my actual name is Frederik",
            "What's a ludum dare?",
        ]);

        setTimeout(() =>
        {
            this.hideHint();
        }, 5000);
    }

    public displayHint(): void
    {
        this.hintElem.style.display = "";
        this.hintElem.textContent = selectRandom(["Hover over me for x-ray vision.",
            "Hit that little bugger!",
            "Click the viruses to fend them off!",
        ]);

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