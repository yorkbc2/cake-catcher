"use strict";
var _a;
var canvas;
var context;
var player;
var background;
var ground;
var game;
var platforms = [];
var subjects = [];
var cakeAudioElements = ['mhm', 'crumple', 'yummy'];
var rocketPositions = ['TOP', 'LEFT', 'RIGHT'];
var rockets = [];
var dashboard;
var rocketLoop;
var subjectLoop = [];
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
        getRandom: function (r) {
            switch (r) {
                case 0:
                    return { pos: "TOP", img: this.TOP };
                case 1:
                    return { pos: "LEFT", img: this.LEFT };
                case 2:
                    return { pos: "RIGHT", img: this.RIGHT };
            }
        },
        TOP: 'sprites/rocket_down.png',
        LEFT: 'sprites/rocket_right.png',
        RIGHT: 'sprites/rocket_left.png'
    }
};
var playerDirections = (_a = {},
    _a[ARROW_RIGHT] = 0,
    _a[ARROW_LEFT] = 1,
    _a[ARROW_DOWN] = 2,
    _a[ARROW_UP] = 3,
    _a);
function setup() {
    dashboard = new Dashboard();
    dashboard.getRecords();
    canvas = document.querySelector('#game');
    context = canvas.getContext('2d');
    player = new PlayerGameObject(canvas.width / 2 - 25, canvas.height - 200, 50, 70);
    player.setSprite(gameSprites.player, gameSprites.player_reversed);
    background = new GameObject(0, 0, canvas.width, canvas.height);
    background.setSprite(gameSprites.background);
    ground = new GameObject(0, canvas.height - 40, canvas.width, 100);
    ground.setSprite(gameSprites.ground);
    game = new GameCore();
    game.onIncrementScores(function (scores) {
        if (scores % 4 === 0 && player.s >= 1.4) {
            player.s -= 0.4;
        }
    });
    game.preview();
}
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.render();
    ground.render();
    platforms.map(function (p) { return p.render(); });
    player.render();
    subjects.map(function (s) { return s.render(); });
    rockets.map(function (r) { return r.render(); });
    game.drawHearts();
    game.drawScores();
}
window.onload = setup;
