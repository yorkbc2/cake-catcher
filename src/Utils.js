"use strict";
var ARROW_RIGHT = 39;
var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_DOWN = 40;
var collisionDetection = function (f, s) {
    if ((f.x + f.w >= s.x && f.x <= s.x + s.w) &&
        (f.y <= s.y + s.h && f.y + f.h >= s.y)) {
        return true;
    }
    else {
        return false;
    }
};
var collisionDetectionBottom = function (elementOne, elementTwo) {
    if ((elementOne.x + elementOne.w >= elementTwo.x && elementOne.x <= elementTwo.x + elementTwo.w) &&
        (elementOne.y + elementOne.h >= elementTwo.y - 2 && elementOne.y <= elementTwo.y + 2)) {
        return true;
    }
    else {
        return false;
    }
};
var createSprite = function (imageSrc, width, height) {
    var img = new Image();
    img.src = imageSrc;
    img.width = width;
    img.height = height;
    return img;
};
var createPlatform = function (spriteUrl, x, y, w, h) {
    if ('GameObject' in window) {
        var platform = new GameObject(x, y, w, h);
        platform.setSprite(spriteUrl, '');
        return platform;
    }
};
var randomX = function (range) {
    return Math.floor(Math.random() * range);
};
var createSubject = function () {
    return new CakeGameObject(randomX(canvas.width - 25), -60, 50, 50, gameSprites.subjects[randomX(gameSprites.subjects.length)]);
};
var createTimer = function () {
    return new TimerGameObject(randomX(canvas.width - 22.5), -60, 45, 50, gameSprites.timer);
};
var createRocket = function () {
    return (function () {
        var sprite = gameSprites.rockets.getRandom(randomX(3));
        var rocket = new RocketGameObject(0, 0, 40, 20, sprite.img);
        rocket.setPosition(sprite.pos);
        return rocket;
    }());
};
var playAudioById = function (id) {
    document.getElementById(id).play();
};
