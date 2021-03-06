function eventTime(age: number): number
{
    return 1 / age * 1000000;
}

function woundCount(age: number): number
{
    return random(age / 10, age / 10 + 2);
}

function ageIncrease(age: number): number
{
    return 1 / age * 1000000;
}

function woundCooldown(age: number): number
{
    return Math.floor(Math.max(1, age / 5 - 10));
}

function disinfectCooldown(age: number): number
{
    return Math.floor(age / 10);
}