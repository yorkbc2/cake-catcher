"use strict";
var GameCore = /** @class */ (function () {
    function GameCore() {
        this.scores = 0;
        this.hearts = 1;
        this.loop = null;
        this.onincscores = null;
    }
    GameCore.prototype.preview = function () {
        var _this = this;
        context.globalAlpha = 0.5;
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#fff";
        context.font = "24px Calibri serif";
        context.fillText("Click to start!", canvas.width / 2 - 50, canvas.height / 2, 200);
        canvas.onclick = function () {
            if (_this.loop === null) {
                context.globalAlpha = 1;
                _this.start();
            }
        };
    };
    GameCore.prototype.end = function () {
        context.globalAlpha = 0.5;
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1;
        context.fillStyle = "#fff";
        context.font = "24px Calibra serif";
        context.fillText("You lose! Try again (click) :)", canvas.width / 2 - 125, canvas.height / 2 - 25, 250);
        context.fillText("Scores: " + this.scores, canvas.width / 2 - 50, canvas.height / 2 + 25, 100);
        clearInterval(this.loop);
        this.loop = null;
        var username = prompt("Enter your username:");
        if (username != "") {
            axios.post('https://cake-catcher.herokuapp.com/api/v1/records', {
                username: username.slice(0, 24),
                scores: this.scores
            }).then(function (response) {
                dashboard.getRecords(true);
            }).catch(function (error) {
                console.error(error);
            });
        }
        this.reset();
    };
    GameCore.prototype.start = function () {
        player = new PlayerGameObject(canvas.width / 2 - 25, canvas.height - 200, 50, 70);
        player.setSprite(gameSprites.player, gameSprites.player_reversed);
        platforms.push(function () {
            var platform = new GameObject(0, canvas.height - 150, 160, 40);
            platform.setSprite(gameSprites.platform);
            return platform;
        }());
        rocketLoop = setInterval(function () { rockets.push(createRocket()); }, 2000);
        platforms.push(createPlatform(gameSprites.platform, canvas.width - 160, canvas.height - 180, 160, 40));
        subjectLoop.push(setInterval(function () {
            subjects.push(createSubject());
        }, 2000));
        subjectLoop.push(setInterval(function () {
            if (randomX(2) === 1) {
                subjects.push(createTimer());
            }
        }, 3000));
        window.onkeydown = function (e) {
            player.changeMovingDirection((playerDirections[e.keyCode] || null));
            player.startToMove();
        };
        window.onkeyup = function (e) {
            player.stopToMove();
        };
        game.setLoop(setInterval(loop, 1000 / 60));
    };
    GameCore.prototype.reset = function () {
        subjects = [];
        rockets = [];
        player = new PlayerGameObject(canvas.width / 2 - 25, canvas.height - 200, 50, 70);
        player.setSprite(gameSprites.player, gameSprites.player_reversed);
        platforms = [];
        clearInterval(rocketLoop);
        rocketLoop = 0;
        subjectLoop.map(function (i) { return clearInterval(i); });
        subjectLoop = [];
        this.scores = 0;
        this.hearts = 5;
        this.loop = null;
    };
    GameCore.prototype.onIncrementScores = function (cb) {
        this.onincscores = typeof cb === 'function' ? cb : null;
        return this;
    };
    GameCore.prototype.decrementHearts = function () {
        this.hearts -= 1;
        if (this.hearts === 0) {
            this.end();
        }
    };
    GameCore.prototype.incrementScores = function () {
        this.scores += 1;
        if (typeof this.onincscores === 'function')
            this.onincscores(this.scores);
        return this;
    };
    GameCore.prototype.drawHearts = function () {
        for (var i = 0; i < this.hearts; i++) {
            context.drawImage(createSprite(gameSprites.heart, 30, 30), (canvas.width - 60) - i * 30, 20, 30, 30);
        }
    };
    GameCore.prototype.drawScores = function () {
        context.fillStyle = "#fff";
        context.font = "normal 24px Calibri";
        context.fillText('Scores: ' + this.scores, 10, 40);
    };
    GameCore.prototype.setLoop = function (loop) {
        this.loop = loop;
    };
    return GameCore;
}());
