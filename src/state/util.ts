
function getVeinMuscle(state: GameState, name: MuscleName): Muscle
{
    for(let j = 0; j < state.muscles.length; j++)
    {
        const muscle: Muscle = state.muscles[j];
        if(muscle.name === name)
        {
            return muscle;
        }
    }
}

function virusGetPosition(virus: Virus): Vector2
{
    return Vector2.add(virus.startPos, Vector2.mul(Vector2.sub(virus.endPos, virus.startPos), virus.position));
}

function getRandomNeighboor(state: GameState, muscle: Muscle)
{
    const pair: Muscle[] = [];
    for(let i: number = 0; i < state.bloodVeins.length; i++)
    {
        const vein: BloodVein = state.bloodVeins[i];
        if(vein.startMuscle === muscle.name)
        {
            pair.push(getVeinMuscle(state, vein.stopMuscle));
        }
        else if(vein.stopMuscle === muscle.name)
        {
            pair.push(getVeinMuscle(state, vein.startMuscle));
        }
    }
    const index: number = Math.floor(Math.random() * pair.length);
    return pair[index];
}