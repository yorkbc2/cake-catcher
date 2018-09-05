"use strict";
var ARROW_RIGHT = 39;
var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_DOWN = 40;
var collisionDetectionBottom = function (elementOne, elementTwo) {
    if ((elementOne.x + elementOne.w >= elementTwo.x && elementOne.x <= elementTwo.x + elementTwo.w) &&
        (elementOne.y + elementOne.h >= elementTwo.y && elementOne.y <= elementTwo.y + elementTwo.h)) {
        return true;
    }
    else {
        return false;
    }
};
