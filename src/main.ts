var canvas: HTMLCanvasElement;
var context;
var player: any;
var background: any;
var ground: any;
var game;
var platforms: GameObject[] = [];

var gameSprites = {
    player: 'sprites/player.png',
    background: 'sprites/background.jpg',
    ground: 'sprites/ground.png',
    platform: 'sprites/platform.png'
}

var playerDirections = {
    [ARROW_RIGHT]: 0,
    [ARROW_LEFT]: 1,
    [ARROW_DOWN]: 2,
    [ARROW_UP]: 3
}

function setup() {
    canvas = <HTMLCanvasElement>document.querySelector('#game');
    context = canvas.getContext('2d');

    game = new GameCore();

    player = new PlayerGameObject(0, canvas.height - 200 ,60,70);
    player.setSprite(gameSprites.player);

    background = new GameObject(0, 0, canvas.width, canvas.height);
    background.setSprite(gameSprites.background);

    ground = new GameObject(0, canvas.height - 40, canvas.width, 100);
    ground.setSprite(gameSprites.ground);

    platforms.push(function () {
        var platform = new GameObject(0, canvas.height - 150, 160, 40);
        platform.setSprite(gameSprites.platform);
        return platform;
    }())

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
}

window.onload = setup;