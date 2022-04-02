class WoundUpdater
{
    private readonly state: GameState;

    public constructor(state: GameState)
    {
        this.state = state;

        setTimeout(() => this.placeWound(), 1000);
    }

    public placeWound(): void
    {
        let thicknessSum = 0;
        for(let i: number = 0; i < this.state.bloodVeins.length; i++)
        {
            const vein: BloodVein = this.state.bloodVeins[i];
            thicknessSum += 1 - vein.thickness;
        }
        let randomValue: number = Math.random() * thicknessSum;

        for(let i: number = 0; i < this.state.bloodVeins.length; i++)
        {
            const vein: BloodVein = this.state.bloodVeins[i];
            randomValue -= 1 - vein.thickness;
            if(randomValue <= 0)
            {
                const angle = Math.random() * Math.PI * 2;
                const len = Math.random() * 0.05 + 0.1;
                const muscle: Muscle = getVeinMuscle(this.state, vein.startMuscle);
                const pos = Vector2.add(muscle.pos, new Vector2(Math.cos(angle) * len, Math.sin(angle) * len));

                const wound: Wound = {pos: pos, connection: vein.startMuscle};
                this.state.wounds.push(wound);
                spawnVirus(this.state, wound.pos, wound.connection, 3000, 10000);
                setTimeout(() => this.placeWound(), Math.random() * 7000 + 3000);
                return;
            }
        }
    }
}