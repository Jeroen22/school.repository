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
    function GameItem(name, id, xPosition, yPosition) {
        this._name = name;
        this._id = id;
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
        this._element.id = this._id.toString();
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
        var image = document.createElement('img');
        image.src = "./assets/images/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
    };
    GameItem.prototype.drawAsteroids = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._id.toString();
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
        var image = document.createElement('img');
        image.src = "./assets/images/asteroids/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
    };
    return GameItem;
}());
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(name, id, xPosition, yPosition) {
        return _super.call(this, name, id, xPosition, yPosition) || this;
    }
    return Asteroid;
}(GameItem));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name, id, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        return _super.call(this, name, id, xPosition, yPosition) || this;
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
    function Finishline(name, id, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        return _super.call(this, name, id, xPosition, yPosition) || this;
    }
    return Finishline;
}(GameItem));
var Game = (function () {
    function Game() {
        var _this = this;
        this._element = document.getElementById('container');
        this._asteroid = new Array();
        this.keyDownHandler = function (e) {
            if (_this._timer.doesntRun()) {
                console.log("Starting the timer");
                _this._timer.startTime();
            }
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
        this._ship = new Character('ship', 10);
        this._timer = new Timer('timer', 11);
        this._finishline = new Finishline('finishline', 12);
        this._asteroid[0] = new Asteroid('asteroid-1', 1, 200, 0);
        this._asteroid[1] = new Asteroid('asteroid-2', 2, 300, -150);
        this._asteroid[2] = new Asteroid('asteroid-3', 3, -100, -50);
        this._asteroid[3] = new Asteroid('asteroid-4', 4, 150, 0);
        this._asteroid[4] = new Asteroid('asteroid-5', 5, 75, 250);
        this._asteroid[5] = new Asteroid('asteroid-6', 6, 400, 300);
        this._asteroid[6] = new Asteroid('asteroid-7', 7, 400, -50);
        this._asteroid[7] = new Asteroid('asteroid-8', 8, 700, 100);
        this._asteroid[8] = new Asteroid('asteroid-9', 9, -800, -100);
        window.addEventListener('keydown', this.keyDownHandler);
        this.draw();
        this.loop();
    }
    Game.prototype.draw = function () {
        this._ship.draw(this._element);
        this._timer.draw(this._element);
        this._finishline.draw(this._element);
        for (var index = 0; index < this._asteroid.length; index++) {
            this._asteroid[index].drawAsteroids(this._element);
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
        var shipRect = document.getElementById('10').getBoundingClientRect();
        if (shipRect.top <= 283.5 && shipRect.right >= 277.5 && shipRect.left <= 431.5 && shipRect.bottom >= 143.5) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 500 && shipRect.right >= 395 && shipRect.left <= 618 && shipRect.bottom >= 319) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 198.5 && shipRect.right >= 595.5 && shipRect.left <= 749.5 && shipRect.bottom >= 57.5) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 211.5 && shipRect.right >= 857.5 && shipRect.left <= 984.5 && shipRect.bottom >= 92.4) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 461.4 && shipRect.right >= 782.5 && shipRect.left <= 910.5 && shipRect.bottom >= 341.4) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 688.4 && shipRect.right >= 1044.5 && shipRect.left <= 1305.5 && shipRect.bottom >= 462.4) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 249.5 && shipRect.right >= 1075.5 && shipRect.left <= 1268.5 && shipRect.bottom >= 77.4) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 400.4 && shipRect.right >= 1365.5 && shipRect.bottom >= 228) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 690 && shipRect.left <= 244 && shipRect.bottom >= 200.5) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        if (shipRect.top < 10) {
            this._timer.stopTimer();
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
    function Timer(name, id, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        var _this = _super.call(this, name, id, xPosition, yPosition) || this;
        _this._time = 0;
        _this._started = false;
        _this.interval = function () {
            console.log("interval");
            _this._time += 1;
            console.log(_this._time);
            _this.render();
            if (_this._started)
                setTimeout(_this.interval, 1000);
        };
        _this._time = 0;
        console.log("create a new timer");
        return _this;
    }
    Timer.prototype.startTime = function () {
        console.log("Start timer");
        this._started = true;
        setTimeout(this.interval, 1000);
    };
    Timer.prototype.stopTimer = function () {
        this._started = false;
        console.log("Stop timer");
    };
    Timer.prototype.doesntRun = function () {
        return !this._started;
    };
    Timer.prototype.draw = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._id.toString();
        var p = document.createElement('p');
        p.innerHTML = 'Your time: ';
        var span = document.createElement('span');
        span.innerHTML = this._time.toString();
        p.appendChild(span);
        this._element.appendChild(p);
        container.appendChild(this._element);
    };
    Timer.prototype.render = function () {
        var timeSpan = this._element;
        timeSpan.innerHTML = 'Your time: ' + this._time.toString();
        console.log(this);
    };
    return Timer;
}(GameItem));
//# sourceMappingURL=main.js.map