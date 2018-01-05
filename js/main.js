var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameItem = (function () {
    function GameItem(name, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        this._name = name;
        this._xPos = xPosition;
        this._yPos = yPosition;
    }
    Object.defineProperty(GameItem.prototype, "xPos", {
        set: function (xPosition) {
            this._xPos = xPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameItem.prototype, "yPos", {
        set: function (yPosition) {
            this._yPos = yPosition;
        },
        enumerable: true,
        configurable: true
    });
    GameItem.prototype.render = function () {
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
    };
    GameItem.prototype.draw = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
        var image = document.createElement('img');
        image.src = "./assets/images/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
    };
    return GameItem;
}());
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(name, id, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        var _this = _super.call(this, name, xPosition, yPosition) || this;
        _this._id = id;
        return _this;
    }
    Asteroid.prototype.remove = function (container) {
        var elem = document.getElementById(this._name + "-" + this._id);
        container.removeChild(elem);
    };
    return Asteroid;
}(GameItem));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        return _super.call(this, name, xPosition, yPosition) || this;
    }
    Character.prototype.moveY = function (yPosition) {
        this._yPos -= yPosition;
        this._element.classList.add('flying');
    };
    Character.prototype.moveX = function (xPosition) {
        this._xPos -= xPosition;
        this._element.classList.add('flying');
    };
    return Character;
}(GameItem));
var Finishline = (function (_super) {
    __extends(Finishline, _super);
    function Finishline(name) {
        return _super.call(this, name) || this;
    }
    Finishline.prototype.draw = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;
        var image = document.createElement('img');
        image.src = "./assets/images/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
    };
    return Finishline;
}(GameItem));
var Game = (function () {
    function Game() {
        var _this = this;
        this._element = document.getElementById('container');
        this._asteroid = new Array();
        this.keyDownHandler = function (e) {
            if (e.keyCode === 87) {
                _this._ship.moveY(50);
                console.log('up');
                _this.render();
            }
            else if (e.keyCode === 65) {
                _this._ship.moveX(50);
                console.log('left');
                _this.render();
            }
            else if (e.keyCode === 83) {
                _this._ship.moveY(-50);
                console.log('down');
                _this.render();
            }
            else if (e.keyCode === 68) {
                _this._ship.moveX(-50);
                console.log('right');
                _this.render();
            }
        };
        this.loop = function () {
            _this.collision();
            _this.render();
            requestAnimationFrame(_this.loop);
        };
        this._ship = new Character('ship');
        this._timer = new Timer('timer');
        this._finishline = new Finishline('finishline');
        this._asteroid[0] = new Asteroid('asteroid-1', 1, 300, 400);
        this._asteroid[1] = new Asteroid('asteroid-2', 2, -600, 200);
        this._asteroid[2] = new Asteroid('asteroid-3', 3, -220, 250);
        this._asteroid[3] = new Asteroid('asteroid-4', 4, 500, 200);
        this._asteroid[4] = new Asteroid('asteroid-5', 5, 100, 200);
        this._asteroid[5] = new Asteroid('asteroid-6', 6, 350, -100);
        this._asteroid[6] = new Asteroid('asteroid-7', 7, 150, -100);
        this._asteroid[7] = new Asteroid('asteroid-8', 8, 500, -500);
        window.addEventListener('keydown', this.keyDownHandler);
        this.draw();
    }
    Game.prototype.draw = function () {
        this._ship.draw(this._element);
        this._timer.draw(this._element);
        this._finishline.draw(this._element);
        for (var index = 0; index < this._asteroid.length; index++) {
            this._asteroid[index].draw(this._element);
        }
    };
    Game.prototype.render = function () {
        this.collision();
        this._ship.render();
        this._timer.render();
        this._finishline.render();
        for (var index = 0; index < this._asteroid.length; index++) {
            this._asteroid[index].render();
        }
    };
    Game.prototype.collision = function () {
        var finishRect = document.getElementById('finishline').getBoundingClientRect();
        var shipRect = document.getElementById('ship').getBoundingClientRect();
        var asteroidtRect = document.getElementById('asteroid-1').getBoundingClientRect();
        if (shipRect.bottom < 8.662498474121094) {
            window.removeEventListener('keydown', this.keyDownHandler);
            console.log('collision with finish');
        }
        else {
            console.log('no collision with finish');
        }
    };
    return Game;
}());
var app;
(function () {
    var init = function () {
        app = new Game();
    };
    window.addEventListener('load', init);
})();
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(name) {
        var _this = _super.call(this, name) || this;
        _this._started = false;
        _this._time = 0;
        return _this;
    }
    Timer.prototype.timer = function () {
        this._time += 1;
        return this.time;
    };
    Object.defineProperty(Timer.prototype, "time", {
        get: function () {
            return this._time;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.start = function () {
        this._started = false;
    };
    Timer.prototype.stop = function () {
        this._started = true;
    };
    Timer.prototype.draw = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;
        var p = document.createElement('p');
        p.innerHTML = 'Your time: ';
        var span = document.createElement('span');
        span.innerHTML = this._time.toString();
        p.appendChild(span);
        this._element.appendChild(p);
        container.appendChild(this._element);
    };
    Timer.prototype.render = function () {
        var scoreSpan = this._element.childNodes[0].childNodes[1];
        scoreSpan.innerHTML = this._time.toString();
    };
    return Timer;
}(GameItem));
//# sourceMappingURL=main.js.map