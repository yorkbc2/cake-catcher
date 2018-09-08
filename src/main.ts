var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var player: any;
var background: any;
var ground: any;
var game: GameCore;
var platforms: GameObject[] = [];
var subjects: GameObject[] = [];
var cakeAudioElements = ['mhm', 'crumple', 'yummy'];
var rocketPositions = ['TOP', 'LEFT', 'RIGHT'];
var rockets: GameObject[] = [];
var dashboard: Dashboard;
var rocketLoop: number;
var subjectLoop: Array<any> = [];
var gameSprites = {
    player: 'sprites/player.png',
    player_reversed: 'sprites/player_flipped.png',
    background: 'sprites/background.jpg',
    ground: 'sprites/ground.png',
    platform: 'sprites/platform.png',
    heart: 'sprites/heart.png',
    subjects: [
        'sprites/cake.png',
        'sprites/donut.png',
        'sprites/cake_2.png'
    ],
    timer: 'sprites/timer.png',
    rockets: {
        getRandom: function (r:number) {
            switch (r) {
                case 0: 
                    return {pos: "TOP", img: this.TOP};
                case 1:
                    return {pos: "LEFT", img: this.LEFT};
                case 2: 
                    return {pos: "RIGHT", img: this.RIGHT};
            }
        },
        TOP: 'sprites/rocket_down.png',
        LEFT: 'sprites/rocket_right.png',
        RIGHT: 'sprites/rocket_left.png'
    }
}


var playerDirections = {
    [ARROW_RIGHT]: 0,
    [ARROW_LEFT]: 1,
    [ARROW_DOWN]: 2,
    [ARROW_UP]: 3
}

function setup() {
    dashboard = new Dashboard();
    dashboard.getRecords();
    canvas = <HTMLCanvasElement>document.querySelector('#game');
    context = <CanvasRenderingContext2D>canvas.getContext('2d');

    player = new PlayerGameObject(canvas.width/2-25, canvas.height - 200 ,50 ,70);
    player.setSprite(gameSprites.player, gameSprites.player_reversed);

    background = new GameObject(0, 0, canvas.width, canvas.height);
    background.setSprite(gameSprites.background);

    ground = new GameObject(0, canvas.height - 40, canvas.width, 100);
    ground.setSprite(gameSprites.ground);

    game = new GameCore();
    game.onIncrementScores((scores:number) => {
        if (scores % 4 === 0 && player.s >= 1.4) {
            player.s -= 0.4;
        }
    });
    game.preview();
}  

function loop() {
    context.clearRect(0,0,canvas.width, canvas.height);
    background.render();
    ground.render();
    platforms.map(p => p.render());
    player.render();
    subjects.map(s => s.render());
    rockets.map(r => r.render());
    game.drawHearts();
    game.drawScores();
}

window.onload = setup;