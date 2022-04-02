
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

function spawnVirus(state: GameState, pos: Vector2, muscleName: MuscleName, minSpawnTime: number, maxSpawnTime: number): void
{
    setTimeout(() =>
    {
        const muscle: Muscle = getVeinMuscle(state, muscleName);
        state.virus.push({startPos: pos, endPos: muscle.pos, position: 0, endMuscle: muscle.name});
        spawnVirus(state, pos, muscleName, minSpawnTime, maxSpawnTime);
    }, Math.random() * (maxSpawnTime - minSpawnTime) + minSpawnTime);
}