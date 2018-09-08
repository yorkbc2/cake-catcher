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

    constructor(x:number ,y:number ,w:number ,h:number, sprite?: string) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        if (typeof sprite === 'string') {
            this.setSprite(sprite);
        }
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

    slow(timeout:number) {
        var oldS = 8;
        var oldSJ = 14;
        this.s -= this.s/2;
        this.sj -= this.sj/2;
        setTimeout(() => {
            this.s = oldS;
            this.sj = oldSJ;
        }, timeout);
    }
}

class CakeGameObject extends GameObject {
    render() {
        if (collisionDetection(player, this)) {
            this.remove();
        }
        if (this.y >= canvas.height) {
            this.destroy();
        }
        this.y += 3;
        context.drawImage(this.getSprite(), this.x, this.y, this.w, this.h);
    }
    remove() {
        playAudioById(cakeAudioElements[randomX(cakeAudioElements.length)]);
        game.incrementScores();
        this.destroy();
    }
    destroy() {
        subjects.splice(subjects.indexOf(this), 1);
    }
}

class TimerGameObject extends CakeGameObject {
    render() {
        if (collisionDetection(player, this)) {
            this.remove();
        }
        if (this.y >= canvas.height) {
            this.destroy();
        }
        this.y += 3;
        context.drawImage(this.getSprite(), this.x, this.y, this.w, this.h);
    }
    remove() {
        player.slow(3000);
        playAudioById('oh');
        this.destroy();
    }
}

class RocketGameObject extends CakeGameObject {
    xd: number = 0;
    yd: number = 0;
    render() {
        if (collisionDetection(player, this)) {
            this.remove();
        }
        this.x += this.xd;
        this.y += this.yd;
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
    setPosition(pos: string="TOP") { 
        switch(pos) {
            case "TOP":
                this.x = randomX(canvas.width - 30);
                this.y = -60;
                this.xd = 0;
                this.yd = 2;
                this.w = 30;
                this.h = 50;
                break;
            case "LEFT":
                this.x = -60;
                this.y = randomX(canvas.height) + 20;
                this.xd = 2;
                this.yd = 0;
                break;
            case "RIGHT":
                this.x = canvas.width + 60;
                this.y = randomX(canvas.height) + 20;
                this.xd = -2;
                this.yd = 0;
        }
    }
    remove() {
        this.destroy();
        game.decrementHearts();
    }
    destroy() {
        rockets.splice(rockets.indexOf(this), 1);
    }
}