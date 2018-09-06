"use strict";
var _a;
var canvas;
var context;
var player;
var background;
var ground;
var game;
var platforms = [];
var gameSprites = {
    player: 'sprites/player.png',
    player_reversed: 'sprites/player_flipped.png',
    background: 'sprites/background.jpg',
    ground: 'sprites/ground.png',
    platform: 'sprites/platform.png'
};
var playerDirections = (_a = {},
    _a[ARROW_RIGHT] = 0,
    _a[ARROW_LEFT] = 1,
    _a[ARROW_DOWN] = 2,
    _a[ARROW_UP] = 3,
    _a);
function setup() {
    canvas = document.querySelector('#game');
    context = canvas.getContext('2d');
    game = new GameCore();
    player = new PlayerGameObject(0, canvas.height - 200, 60, 70);
    player.setSprite(gameSprites.player, gameSprites.player_reversed);
    background = new GameObject(0, 0, canvas.width, canvas.height);
    background.setSprite(gameSprites.background);
    ground = new GameObject(0, canvas.height - 40, canvas.width, 100);
    ground.setSprite(gameSprites.ground);
    platforms.push(function () {
        var platform = new GameObject(0, canvas.height - 150, 160, 40);
        platform.setSprite(gameSprites.platform);
        return platform;
    }());
    platforms.push(createPlatform(gameSprites.platform, canvas.width - 160, canvas.height - 180, 160, 40));
    window.onkeydown = function (e) {
        player.changeMovingDirection((playerDirections[e.keyCode] || null));
        player.startToMove();
    };
    window.onkeyup = function (e) {
        player.stopToMove();
    };
    game.setLoop(setInterval(loop, 1000 / 60));
}
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.render();
    ground.render();
    platforms.map(function (p) { return p.render(); });
    player.render();
    game.drawScores();
}
window.onload = setup;
