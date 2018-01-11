class Game {

    //fields/attributes
    private _element: HTMLElement = document.getElementById('container');
    private _ship: Character;
    private _timer: Timer;
    private _restart: Timer;
    private _finishline: Finishline;
    private _asteroid: Array<Asteroid> = new Array(); //use an array if you have multiple gameItems of the same sort

    //constructor
    constructor() {
        //create some gameItems
        this._ship = new Character('ship', 10);
        this._timer = new Timer('timer', 11);
        this._restart = new Timer('restart', 13, 1450, 700);
        this._finishline = new Finishline('finishline', 12);
        this._asteroid[0] = new Asteroid('asteroid-1', 1, 200, 0);
        this._asteroid[1] = new Asteroid('asteroid-2', 2, 300, -150);
        this._asteroid[2] = new Asteroid('asteroid-3', 3, -100, -20);
        this._asteroid[3] = new Asteroid('asteroid-4', 4, 150, 0);
        this._asteroid[4] = new Asteroid('asteroid-5', 5, 75, 250);
        this._asteroid[5] = new Asteroid('asteroid-6', 6, 400, 300);
        this._asteroid[6] = new Asteroid('asteroid-7', 7, 400, -50);
        this._asteroid[7] = new Asteroid('asteroid-8', 8, 700, 100);
        this._asteroid[8] = new Asteroid('asteroid-9', 9, -800, -100);

        //add keydown handler to the window object
        window.addEventListener('keydown', this.keyDownHandler);

        //draw is initial state
        this.draw();

        //start the loop
        this.loop();
    }

    //methods
    private draw(): void {
        this._ship.draw(this._element);
        this._timer.draw(this._element);
        this._restart.drawRestart(this._element);
        this._finishline.draw(this._element);
        for (let index = 0; index < this._asteroid.length; index++) {
            this._asteroid[index].drawAsteroids(this._element)
        }
    }

    //writing elements tot the DOM/HTML
    private render(): void {
        this.collision();
        this._ship.render();
        this._timer.render();
        this._finishline.render();
        for (let index = 0; index < this._asteroid.length; index++) {
            this._asteroid[index].render()
        }
    }

    //event handling
    private keyDownHandler = (e: KeyboardEvent): void => {

        if (this._timer.doesntRun()) {
            console.log("Starting the timer");
            this._timer.startTime();
        }

        //move up W
        if (e.keyCode === 87) {
            this._ship.moveY(50)
            console.log('up');
            this.render();
        } //move left A
        else if (e.keyCode === 65) {
            this._ship.moveX(50)
            console.log('left');
            this.render();
        } //move down S
        else if (e.keyCode === 83) {
            this._ship.moveY(-50)
            console.log('down');
            this.render();
        } //move right D
        else if (e.keyCode === 68) {
            this._ship.moveX(-50)
            console.log('right');
            this.render();
        }
    }

    //detect collision between two objects
    private collision(): void {
        //use elem.getBoundingClientRect() for getting the right coordinates and measurements of the element
        const shipRect = document.getElementById('10').getBoundingClientRect();
        
        //asteroid 1
        if (shipRect.top <= 308 && shipRect.right >= 274.5 && shipRect.left <= 432.5 && shipRect.bottom >= 168) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 2
        else if (shipRect.top <= 530 && shipRect.right >= 401.5 && shipRect.left <= 609.5 && shipRect.bottom >= 345) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 3
        else if (shipRect.top <= 227 && shipRect.right >= 593.5 && shipRect.left <= 750.5 && shipRect.bottom >= 85) {
          console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 4
        else if (shipRect.top <= 211 && shipRect.right >= 857.5 && shipRect.left <= 985.5 && shipRect.bottom >= 92) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 5
        else if (shipRect.top <= 463 && shipRect.right >= 781.5 && shipRect.left <= 910.5 && shipRect.bottom >= 342) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 6
        else if (shipRect.top <= 690 && shipRect.right >= 1044.5 && shipRect.left <= 1270.5 && shipRect.bottom >= 462) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 7
        else if (shipRect.top <= 250 && shipRect.right >= 1075.5 && shipRect.left <= 1270.5 && shipRect.bottom >= 76) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 8
        else if (shipRect.top <= 399 && shipRect.right >= 1304.5 && shipRect.bottom >= 226) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 9
        else if (shipRect.top <= 620 && shipRect.left <= 244.5 && shipRect.bottom >= 203) {
            console.log('collision with Asteroid');
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }

        //finish
        if (shipRect.top < 55) {
            this._timer.stopTimer();
            window.removeEventListener('keydown', this.keyDownHandler);
            console.log('collision with finish');
        } else {
            console.log('no collision with finish');
        }
    }

    //Game loop 60 frames per seconds 
    private loop = () => {
        this.collision();
        this.render();
        requestAnimationFrame(this.loop);
    }
}