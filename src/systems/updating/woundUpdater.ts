class WoundUpdater
{
    private readonly state: GameState;

    public constructor(state: GameState)
    {
        this.state = state;
    }

    public placeWound(): void
    {
        if(!this.state.alive) return;
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
                const len = Math.random() * 0.05 + 0.05;
                const muscle: Muscle = getVeinMuscle(this.state, vein.startMuscle);
                const pos = Vector2.add(muscle.pos, new Vector2(Math.cos(angle) * len, Math.sin(angle) * len));

                const wound: Wound = {pos: pos, connection: vein.startMuscle, sprite: Math.floor(Math.random() * this.state.woundConfig.spriteCount)};
                this.state.wounds.push(wound);
                // TODO: Base this cooldown on age.
                setTimeout(() => this.spawnVirus(wound), Math.random() * 1000 + 2000);
                return;
            }
        }
    }

    private spawnVirus(wound: Wound): void
    {
        if(!this.state.alive || wound.sprite === -1) return;
        const muscle: Muscle = getVeinMuscle(this.state, wound.connection);
        this.state.virus.push({startPos: wound.pos, endPos: muscle.pos, position: 0, endMuscle: muscle.name});
        // TODO: Base this cooldown on age.
        setTimeout(() => this.spawnVirus(wound), Math.random() * 3000 + 2000);
    }
}