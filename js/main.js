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
    };
    Character.prototype.moveX = function (xPosition) {
        this._xPos -= xPosition;
    };
    return Character;
}(GameItem));
var Events = (function () {
    function Events() {
    }
    Events.on = function (eventName, fn) {
        Events.topics[eventName] = Events.topics[eventName] || [];
        Events.topics[eventName].push(fn);
    };
    Events.off = function (eventName, fn) {
        if (this.topics[eventName]) {
            for (var i = 0; i < this.topics[eventName].length; i++) {
                if (this.topics[eventName][i] === fn) {
                    this.topics[eventName].splice(i, 1);
                    break;
                }
            }
            ;
        }
    };
    Events.trigger = function (eventName, data) {
        if (Events.topics[eventName]) {
            Events.topics[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    };
    Events.topics = {};
    return Events;
}());
var Finishline = (function (_super) {
    __extends(Finishline, _super);
    function Finishline(name, id, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        return _super.call(this, name, id, xPosition, yPosition) || this;
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
                _this._ship.moveY(10);
                console.log('up');
                _this.render();
            }
            else if (e.keyCode === 65) {
                _this._ship.moveX(10);
                console.log('left');
                _this.render();
            }
            else if (e.keyCode === 83) {
                _this._ship.moveY(-10);
                console.log('down');
                _this.render();
            }
            else if (e.keyCode === 68) {
                _this._ship.moveX(-10);
                console.log('right');
                _this.render();
            }
        };
        this.loop = function () {
            _this.collision();
            _this.render();
            requestAnimationFrame(_this.loop);
        };
        this.startHandler = function (e) {
            Events.trigger('startPosition', { temp: 'someInformation' });
            _this._timer.start();
            _this.loop();
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
        var shipRect = document.getElementById('10').getBoundingClientRect();
        console.log(shipRect.top);
        if (shipRect.top <= 283.5 && (shipRect.right >= 277.5 && shipRect.left <= 431.5 && shipRect.bottom >= 143.5)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 500 && (shipRect.right >= 395 && shipRect.left <= 618 && shipRect.bottom >= 319)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 198.5 && (shipRect.right >= 595.5 && shipRect.left <= 749.5 && shipRect.bottom >= 57.5)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 211.5 && (shipRect.right >= 857.5 && shipRect.left <= 984.5 && shipRect.bottom >= 92.4)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 461.4 && (shipRect.right >= 782.5 && shipRect.left <= 910.5 && shipRect.bottom >= 341.4)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 688.4 && (shipRect.right >= 1044.5 && shipRect.left <= 1305.5 && shipRect.bottom >= 462.4)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 249.5 && (shipRect.right >= 1075.5 && shipRect.left <= 1268.5 && shipRect.bottom >= 77.4)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 400.4 && (shipRect.right >= 1365.5 && shipRect.bottom >= 228)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        else if (shipRect.top <= 690 && (shipRect.left <= 244 && shipRect.bottom >= 200.5)) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        if (shipRect.top < -10) {
            this._timer.stop();
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
        _this._started = false;
        _this._time = 0;
        Events.on('startPosition', function () { return _this.start(); });
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
        console.log("Start timer");
        this._started = true;
    };
    Timer.prototype.stop = function () {
        this._started = false;
        console.log("Stop timer");
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