function eventTime(age: number): number
{
    return 1 / age * 1000000;
}

function woundCount(age: number): number
{
    return random(age / 10, age / 10 + 2);
}