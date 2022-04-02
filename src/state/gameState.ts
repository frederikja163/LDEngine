type Muscle = {name: MuscleName, pos: Vector2, size: Vector2, angle: number, infected: boolean, src: string}
type BodyState = {src: string};
type BloodVein = {startMuscle: MuscleName, stopMuscle: MuscleName, thickness: number}
// TODO: Maybe allow wounds to connect to other wounds?
type Wound = {pos: Vector2, connection: MuscleName};
type Virus = {startPos: Vector2, endPos: Vector2, position: number, endMuscle: MuscleName};
type VirusState = {src: string, speed: number, size: Vector2};

type GameState = {
    debug: boolean,
    virusState: VirusState,
    virus: Virus[],
    muscles: Muscle[],
    bloodVeins: BloodVein[],
    wounds: Wound[],
    body: BodyState,
};
enum MuscleName
{
    rightForearm = "Right forearm",
    leftForearm = "Left forearm",
    rightBiscep = "Right biscep",
    leftBiscep = "Left biscep",
    heart = "Heart",
    brain = "Brain",
}

function createGamestate(): GameState
{
    return {
        debug: true,
        virusState: {src: "images/virus.png", speed: 0.0001, size: new Vector2(0.02, 0.02)},
        virus: [],
        bloodVeins: [
            {
                startMuscle: MuscleName.leftForearm,
                stopMuscle: MuscleName.leftBiscep,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.leftForearm,
                stopMuscle: MuscleName.leftBiscep,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.leftBiscep,
                stopMuscle: MuscleName.heart,
                thickness: 0.01,
            },
            {
                startMuscle: MuscleName.rightForearm,
                stopMuscle: MuscleName.rightBiscep,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.rightBiscep,
                stopMuscle: MuscleName.heart,
                thickness: 0.01,
            },
            {
                startMuscle: MuscleName.heart,
                stopMuscle: MuscleName.brain,
                thickness: 0.015,
            },
        ],
        wounds: [],
        muscles: [
            {
                name: MuscleName.rightForearm,
                pos: new Vector2(-0.57, 0.10),
                size: new Vector2(0.05, 0.075),
                angle: 40,
                src: "images/forearm.png",
                infected: false,
            },
            {
                name: MuscleName.rightBiscep,
                pos: new Vector2(-0.45, 0.27),
                size: new Vector2(0.05, 0.075),
                angle: -55,
                src: "images/bicep.png",
                infected: false,
            },
            {
                name: MuscleName.leftForearm,
                pos: new Vector2(0.57, 0.10),
                size: new Vector2(0.05, 0.075),
                angle: 40 - 90,
                src: "images/forearm.png",
                infected: false,
            },
            {
                name: MuscleName.leftBiscep,
                pos: new Vector2(0.45, 0.27),
                size: new Vector2(0.05, 0.075),
                angle: -55 + 90,
                src: "images/bicep.png",
                infected: false,
            },
            {
                name: MuscleName.heart,
                pos: new Vector2(0.1, 0.32),
                size: new Vector2(0.05, 0.05),
                angle: 0,
                src: "images/heart.png",
                infected: false,
            },
            {
                name: MuscleName.brain,
                pos: new Vector2(0, 0.7),
                size: new Vector2(0.05, 0.05),
                angle: 0,
                src: "images/brain.png",
                infected: false,
            },
        ],
        body: {src: "images/stickman.png"},
    };
}