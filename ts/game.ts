class Game {

    //fields/attributes
    private _element: HTMLElement = document.getElementById('container');
    private _ship: Character;
    private _timer: Timer;
    private _finishline: Finishline;
    private _asteroid: Array<Asteroid> = new Array(); //use an array if you have multiple gameItems of the same sort


    constructor() {
        //create some gameItems
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

        //add keydown handler to the window object
        window.addEventListener('keydown', this.keyDownHandler);

        //draw is initial state
        this.draw();
    }

    //methods
    public draw(): void {
        this._ship.draw(this._element);
        this._timer.draw(this._element);
        this._finishline.draw(this._element);
        for (let index = 0; index < this._asteroid.length; index++) {
            this._asteroid[index].drawAsteroids(this._element)
        }

    }

    //writing elements tot the DOM/HTML
    public render(): void {
        this.collision();
        this._ship.render();
        this._timer.render();
        this._finishline.render();
        for (let index = 0; index < this._asteroid.length; index++) {
            this._asteroid[index].render()
        }
    }

    //event handling
    public keyDownHandler = (e: KeyboardEvent): void => {

        Events.trigger('keydown', { temp: 'someInformation' });
        //this._scoreboard.resetScore(0); //without pub sub system
        this._timer.start(); //maybe own class.
        this.loop(); //call the gameloop

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
    public collision(): void {
        //use elem.getBoundingClientRect() for getting the right coordinates and measurements of the element
        const shipRect = document.getElementById('10').getBoundingClientRect();

        //asteroid 1
        if (shipRect.top <= 283.5 && shipRect.right >= 277.5 && shipRect.left <= 431.5 && shipRect.bottom >= 143.5) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 2
        else if (shipRect.top <= 500 && shipRect.right >= 395 && shipRect.left <= 618 && shipRect.bottom >= 319) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 3
        else if (shipRect.top <= 198.5 && shipRect.right >= 595.5 && shipRect.left <= 749.5 && shipRect.bottom >= 57.5) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 4
        else if (shipRect.top <= 211.5 && shipRect.right >= 857.5 && shipRect.left <= 984.5 && shipRect.bottom >= 92.4) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 5
        else if (shipRect.top <= 461.4 && shipRect.right >= 782.5 && shipRect.left <= 910.5 && shipRect.bottom >= 341.4) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 6
        else if (shipRect.top <= 688.4 && shipRect.right >= 1044.5 && shipRect.left <= 1305.5 && shipRect.bottom >= 462.4) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 7
        else if (shipRect.top <= 249.5 && shipRect.right >= 1075.5 && shipRect.left <= 1268.5 && shipRect.bottom >= 77.4) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 8
        else if (shipRect.top <= 400.4 && shipRect.right >= 1365.5 && shipRect.bottom >= 228) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }
        //asteroid 9
        else if (shipRect.top <= 690 && shipRect.left <= 244 && shipRect.bottom >= 200.5) {
            this._ship.xPos = 0;
            this._ship.yPos = 0;
        }

        //finish
        if (shipRect.top < -10) {
            this._timer.stop();
            window.removeEventListener('keydown', this.keyDownHandler);
            console.log('collision with finish');
        } else {
            console.log('no collision with finish');
        }
    }

    /**
    * Game loop 60 frames per seconds
    */
    private loop = () => {
        this.collision();
        this.render();
        requestAnimationFrame(this.loop);
        console.log("hoi")
    }
}