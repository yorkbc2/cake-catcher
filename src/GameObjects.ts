declare var context: CanvasRenderingContext2D|any;

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

    sprite: HTMLImageElement|null = null;

    constructor(x:number ,y:number ,w:number ,h:number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    setSprite(spriteUrl: string) {
        var img = new Image();
        img.src = spriteUrl;
        img.width = this.w;
        img.height = this.h;
        this.sprite = img;
    }

    render() {
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}

class PlayerGameObject extends GameObject {
    isInJumping:boolean = false;
    sj: number = this.s + 6;
    render() {
        this.move();
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
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
                if (this.y <= oldY - 120) {
                    this.down();
                    clearInterval(j);
                }
            }, 1000/60);
        }
    }
    down() {
        var oldY = this.y;
        var j = setInterval(() => {
            this.y += this.sj;
            if (this.y >= canvas.height - 100) {
                this.isInJumping = false;
                clearInterval(j);
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
                    if (this.y  <= canvas.height - 100)                
                        this.y += this.s;
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
