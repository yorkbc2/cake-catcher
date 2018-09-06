"use strict";
var ARROW_RIGHT = 39;
var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_DOWN = 40;
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
