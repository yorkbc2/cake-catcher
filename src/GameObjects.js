"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = /** @class */ (function () {
    function GameObject(x, y, w, h) {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.s = 8;
        this.d = 0;
        this.m = false;
        this.sprite = new Image();
        this.generalSprite = new Image();
        this.reversedSprite = new Image();
        this.transformed = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    GameObject.prototype.setSprite = function (spriteUrl, reversedSprite) {
        if (reversedSprite === void 0) { reversedSprite = ""; }
        this.sprite = this.generalSprite = createSprite(spriteUrl, this.w, this.h);
        this.reversedSprite = createSprite((reversedSprite || spriteUrl), this.w, this.h);
    };
    GameObject.prototype.getSprite = function () {
        if (this.transformed === true) {
            return this.reversedSprite;
        }
        return this.generalSprite;
    };
    GameObject.prototype.render = function () {
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    };
    return GameObject;
}());
var PlayerGameObject = /** @class */ (function (_super) {
    __extends(PlayerGameObject, _super);
    function PlayerGameObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInJumping = false;
        _this.sj = _this.s + 6;
        _this.onPlatform = false;
        return _this;
    }
    PlayerGameObject.prototype.render = function () {
        var _this = this;
        if ((typeof platforms.filter(function (p) { return (collisionDetectionBottom(_this, p) === true); })[0] !== 'undefined') ||
            collisionDetectionBottom(this, ground)) {
            this.onPlatform = true;
        }
        else {
            this.onPlatform = false;
        }
        if (this.onPlatform === false && this.isInJumping === false) {
            this.y += this.sj;
        }
        this.move();
        if (this.d === 1 && this.transformed === false) {
            this.transformed = true;
        }
        else if (this.d === 0) {
            this.transformed = false;
        }
        context.drawImage(this.getSprite(), this.x, this.y, this.w, this.h);
    };
    PlayerGameObject.prototype.startToMove = function () {
        this.m = true;
    };
    PlayerGameObject.prototype.stopToMove = function () {
        this.m = false;
    };
    PlayerGameObject.prototype.changeMovingDirection = function (dir) {
        this.d = dir || 0;
    };
    PlayerGameObject.prototype.jump = function () {
        var _this = this;
        if (this.isInJumping === false) {
            var oldY = this.y;
            this.isInJumping = true;
            var j = setInterval(function () {
                _this.y -= _this.sj;
                if (_this.y <= oldY - 200) {
                    _this.down();
                    clearInterval(j);
                }
            }, 1000 / 60);
        }
    };
    PlayerGameObject.prototype.down = function () {
        var _this = this;
        var oldY = this.y;
        var j = setInterval(function () {
            if (_this.onPlatform === true) {
                clearInterval(j);
                _this.isInJumping = false;
            }
            else {
                _this.y += _this.sj;
            }
        }, 1000 / 60);
    };
    PlayerGameObject.prototype.move = function () {
        if (this.m === true) {
            switch (this.d) {
                case 1:
                    if (this.x >= 0)
                        this.x -= this.s;
                    break;
                case 2:
                    this.y += this.sj;
                    break;
                case 3:
                    this.jump();
                    break;
                case 0:
                    if (this.x + this.w <= canvas.width)
                        this.x += this.s;
                    break;
            }
        }
    };
    return PlayerGameObject;
}(GameObject));
