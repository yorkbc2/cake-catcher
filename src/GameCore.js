"use strict";
var GameCore = /** @class */ (function () {
    function GameCore() {
        this.scores = 0;
        this.hearts = 3;
        this.loop = null;
        this.onincscores = null;
    }
    GameCore.prototype.onIncrementScores = function (cb) {
        this.onincscores = typeof cb === 'function' ? cb : null;
        return this;
    };
    GameCore.prototype.decrementHearts = function () {
        this.hearts -= 1;
        if (this.hearts === 0) {
            this.endGame();
        }
    };
    GameCore.prototype.incrementScores = function () {
        this.scores += 1;
        if (typeof this.onincscores === 'function')
            this.onincscores(this.scores);
        return this;
    };
    GameCore.prototype.drawScores = function () {
        context.fillStyle = "#fff";
        context.font = "normal 24px Calibri";
        context.fillText('Scores: ' + this.scores, 10, 40);
    };
    GameCore.prototype.endGame = function () { };
    GameCore.prototype.setLoop = function (loop) {
        this.loop = loop;
    };
    return GameCore;
}());
