const ARROW_RIGHT: number = 39;
const ARROW_LEFT: number = 37;
const ARROW_UP: number = 38;
const ARROW_DOWN: number = 40;

const collisionDetection = <T extends GameObject>(f:T, s:T) => {
    if (
        (f.x + f.w >= s.x && f.x <= s.x + s.w) &&
        (f.y <= s.y + s.h && f.y + f.h >= s.y)
    ) {
        return true;
    } else {
        return false;
    }
}

const collisionDetectionBottom = <T extends GameObject>(elementOne:T, elementTwo:T) => {
    if (
        (elementOne.x + elementOne.w >= elementTwo.x && elementOne.x <= elementTwo.x + elementTwo.w) &&
        (elementOne.y + elementOne.h >= elementTwo.y - 2 && elementOne.y <= elementTwo.y + 2)
    ) {
        return true;
    } else {
        return false;
    }
}

const createSprite = (imageSrc: string, width: number, height: number):HTMLImageElement => {
    var img = new Image();
    img.src = imageSrc;
    img.width = width;
    img.height = height;
    return img;
}

const createPlatform = (spriteUrl:string, x:number, y:number, w:number, h:number) => {
    if ('GameObject' in window) {
        var platform = new GameObject(x,y,w,h);
        platform.setSprite(spriteUrl, '');
        return platform;
    }
}

const randomX = (range: number) => {
    return Math.floor(Math.random() * range);
}

const createSubject = () => {
    return new CakeGameObject(randomX(canvas.width - 25), -60, 50, 50, gameSprites.subjects[randomX(gameSprites.subjects.length)]);
}

const createTimer = () => {
    return new TimerGameObject(randomX(canvas.width - 22.5), -60, 45,50, gameSprites.timer);
}

const playAudioById = (id: string):void => {
    (<HTMLAudioElement>document.getElementById(id)).play();
}