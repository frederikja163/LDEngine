type Muscle = {name: MuscleName, pos: Vector2, size: number, infected: boolean}
type BodyState = {src: string, size: Vector2};
type BloodVein = {startMuscle: MuscleName, stopMuscle: MuscleName, thickness: number}
// TODO: Maybe allow wounds to connect to other wounds?
type Wound = {pos: Vector2, connection: MuscleName};
type Virus = {startPos: Vector2, endPos: Vector2, position: number, endMuscle: MuscleName};
type VirusState = {src: string, speed: number, size: Vector2};

type GameState = {
    debug: boolean,
    alive: boolean,
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
    rightThigh = "Right thigh",
    leftThigh = "Left thigh",
    rightCalf = "Right calf",
    leftCalf = "Left calf",
    abs = "Abs",
    heart = "Heart",
    brain = "Brain",
}

function createGamestate(): GameState
{
    return {
        debug: false,
        alive: true,
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
                startMuscle: MuscleName.rightCalf,
                stopMuscle: MuscleName.rightThigh,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.rightThigh,
                stopMuscle: MuscleName.abs,
                thickness: 0.01,
            },
            {
                startMuscle: MuscleName.leftCalf,
                stopMuscle: MuscleName.leftThigh,
                thickness: 0.008,
            },
            {
                startMuscle: MuscleName.leftThigh,
                stopMuscle: MuscleName.abs,
                thickness: 0.01,
            },
            {
                startMuscle: MuscleName.abs,
                stopMuscle: MuscleName.heart,
                thickness: 0.012,
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
                pos: new Vector2(-0.35, 0.00),
                size: 0.011,
                infected: false,
            },
            {
                name: MuscleName.rightBiscep,
                pos: new Vector2(-0.32, 0.32),
                size: 0.01,
                infected: false,
            },
            {
                name: MuscleName.rightThigh,
                pos: new Vector2(-0.18, -0.32),
                size: 0.02,
                infected: false,
            },
            {
                name: MuscleName.rightCalf,
                pos: new Vector2(-0.25, -0.7),
                size: 0.015,
                infected: false,
            },
            {
                name: MuscleName.leftForearm,
                pos: new Vector2(0.35, 0.00),
                size: 0.011,
                infected: false,
            },
            {
                name: MuscleName.leftBiscep,
                pos: new Vector2(0.32, 0.32),
                size: 0.01,
                infected: false,
            },
            {
                name: MuscleName.leftThigh,
                pos: new Vector2(0.18, -0.32),
                size: 0.02,
                infected: false,
            },
            {
                name: MuscleName.leftCalf,
                pos: new Vector2(0.25, -0.7),
                size: 0.015,
                infected: false,
            },
            {
                name: MuscleName.abs,
                pos: new Vector2(0, -0.1),
                size: 0.01,
                infected: false,
            },
            {
                name: MuscleName.heart,
                pos: new Vector2(0.06, 0.32),
                size: 0.01,
                infected: false,
            },
            {
                name: MuscleName.brain,
                pos: new Vector2(0, 0.85),
                size: 0.01,
                infected: false,
            },
        ],
        body: {src: "images/character.png", size: new Vector2(0.95, 0.95)},
    };
}