declare var context: CanvasRenderingContext2D;

interface IGameObject {
    x: number;
    y: number;
    w: number;
    h: number;

    s: number;

    d: number;
    m: boolean;
   
    sprite?: HTMLImageElement|null;
}

class GameObject implements IGameObject {
    x: number = 0;
    y: number = 0;
    w: number = 0;
    h: number = 0;

    s: number = 8;

    d: number = 0;
    m: boolean = false;

    sprite: HTMLImageElement = new Image();
    generalSprite: HTMLImageElement = new Image();
    reversedSprite: HTMLImageElement = new Image();
    transformed: boolean = false;

    constructor(x:number ,y:number ,w:number ,h:number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    setSprite(spriteUrl: string, reversedSprite: string = "") {
        this.sprite = this.generalSprite = createSprite(spriteUrl, this.w, this.h);
        this.reversedSprite = createSprite((reversedSprite||spriteUrl), this.w, this.h);
    }

    getSprite() {
        if (this.transformed === true) {
            return this.reversedSprite;
        }
        return this.generalSprite;
    }

    render() {
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}

class PlayerGameObject extends GameObject {
    isInJumping:boolean = false;
    sj: number = this.s + 6;
    onPlatform: boolean = false;

    render() {
        

        if ((typeof platforms.filter(p => (
            collisionDetectionBottom(this, p) === true
        ))[0] !== 'undefined') ||
            collisionDetectionBottom(this, ground)) {
            this.onPlatform = true;
        } else {
            this.onPlatform = false;
        }
        if (this.onPlatform === false && this.isInJumping === false) {
            this.y += this.sj;
        }
        this.move();
        if (this.d === 1 && this.transformed === false) {
            this.transformed = true;
        } else if (this.d === 0) {
            this.transformed = false;
        }
        context.drawImage(this.getSprite(), this.x, this.y, this.w, this.h);
    }
    startToMove() {
        this.m = true;
    }
    stopToMove() {
        this.m = false;
    }
    changeMovingDirection(dir: number) {
        this.d = dir || 0;
    }
    jump() {
        if (this.isInJumping === false) {
            var oldY = this.y;
            this.isInJumping = true;
            var j = setInterval(() => {
                this.y -= this.sj;
                if (this.y <= oldY - 200) {
                    this.down();
                    clearInterval(j);
                }
            }, 1000/60);
        }
    }
    down() {
        var oldY = this.y;
        var j = setInterval(() => {
            if (this.onPlatform === true) {
                clearInterval(j)
                this.isInJumping = false;
            } else {
                this.y += this.sj;
            }
        }, 1000/60);
    }
    move() {
        if (this.m === true) {
            switch (this.d) {
                case 1:
                    if (this.x >= 0)
                        this.x -= this.s;
                    break;
                case 2:
                    this.y += this.sj;
                    break;
                case 3: 
                    this.jump();
                    break; 
                case 0:
                    if (this.x + this.w <= canvas.width)
                        this.x += this.s;
                    break;
            }
        }
    }
}
