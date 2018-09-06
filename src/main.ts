var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var player: any;
var background: any;
var ground: any;
var game: GameCore;
var platforms: GameObject[] = [];
var subjects: GameObject[] = [];
var cakeAudioElements = ['mhm', 'crumple', 'yummy'];

var gameSprites = {
    player: 'sprites/player.png',
    player_reversed: 'sprites/player_flipped.png',
    background: 'sprites/background.jpg',
    ground: 'sprites/ground.png',
    platform: 'sprites/platform.png',
    subjects: [
        'sprites/cake.png',
        'sprites/donut.png',
        'sprites/cake_2.png'
    ],
    timer: 'sprites/timer.png'
}

var playerDirections = {
    [ARROW_RIGHT]: 0,
    [ARROW_LEFT]: 1,
    [ARROW_DOWN]: 2,
    [ARROW_UP]: 3
}

function setup() {
    canvas = <HTMLCanvasElement>document.querySelector('#game');
    context = <CanvasRenderingContext2D>canvas.getContext('2d');

    player = new PlayerGameObject(canvas.width/2-25, canvas.height - 200 ,50 ,70);
    player.setSprite(gameSprites.player, gameSprites.player_reversed);

    background = new GameObject(0, 0, canvas.width, canvas.height);
    background.setSprite(gameSprites.background);

    ground = new GameObject(0, canvas.height - 40, canvas.width, 100);
    ground.setSprite(gameSprites.ground);

    platforms.push(function () {
        var platform = new GameObject(0, canvas.height - 150, 160, 40);
        platform.setSprite(gameSprites.platform);
        return platform;
    }())

    platforms.push(<GameObject>createPlatform(gameSprites.platform, canvas.width - 160, canvas.height - 180, 160, 40));
    setInterval(() => {
        subjects.push(createSubject());
    }, 2000);
    setInterval(() => {
        if (randomX(2) === 1) {
            subjects.push(createTimer());
        }
        
    }, 3000);

    game = new GameCore();
    game.onIncrementScores((scores:number) => {
        if (scores % 4 === 0 && player.s >= 1.4) {
            player.s -= 0.4;
        }
    });

    window.onkeydown = (e) => {
        player.changeMovingDirection((playerDirections[e.keyCode] || null));
        player.startToMove();
    }

    window.onkeyup = (e) => {
        player.stopToMove();
    }

    game.setLoop(setInterval(loop, 1000/60));
}  

function loop() {
    context.clearRect(0,0,canvas.width, canvas.height);
    background.render();
    ground.render();
    platforms.map(p => p.render());
    player.render();
    subjects.map(s => s.render());
    game.drawScores();
}

window.onload = setup;