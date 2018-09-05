"use strict";
var _a;
var canvas;
var context;
var player;
var background;
var ground;
var gameSprites = {
    player: 'sprites/player.png',
    background: 'sprites/background.jpg',
    ground: 'sprites/ground.png'
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
    player = new PlayerGameObject(0, canvas.height - 100, 60, 70);
    player.setSprite(gameSprites.player);
    background = new GameObject(0, 0, canvas.width, canvas.height);
    background.setSprite(gameSprites.background);
    ground = new GameObject(0, canvas.height - 40, canvas.width, 100);
    ground.setSprite(gameSprites.ground);
    window.onkeydown = function (e) {
        player.changeMovingDirection((playerDirections[e.keyCode] || null));
        player.startToMove();
    };
    window.onkeyup = function (e) {
        player.stopToMove();
    };
    setInterval(loop, 1000 / 60);
}
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.render();
    ground.render();
    player.render();
}
window.onload = setup;
