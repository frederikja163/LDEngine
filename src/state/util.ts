
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

function getMousePosition(mouseX: number, mouseY: number): Vector2
{
    return new Vector2((mouseX / window.innerHeight) * 2 - 1, (-mouseY / window.innerHeight) * 2 + 1);
}

function selectRandom<T>(obj: T[]): T
{
    const index = Math.floor(Math.random() * obj.length);
    return obj[index];
}

const soundElements: HTMLAudioElement[] = [];
function playSound(sound: string)
{
    let audioElem = soundElements[0];
    if(!audioElem || audioElem.duration > 0 && !audioElem.paused)
    {
        // audio is playing
        audioElem = document.createElement("audio");
        document.body.appendChild(audioElem);
    }
    else
    {
        soundElements.pop();
    }
    audioElem.src = sound;
    audioElem.play();
    soundElements.push(audioElem);
}

function random(min: number, max: number): number
{
    return Math.random() * (max - min) + min;
}

// Cookie methods from: https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname: string, cvalue: string, exdays: number)
{
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname: string): string
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while(c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}