class Game {

    //fields/attributes
    private _element: HTMLElement = document.getElementById('container');
    private _ship: Character;
    private _timer: Timer;
    private _finishline: Finishline;
    private _asteroid: Array<Asteroid> = new Array(); //use an array if you have multiple gameItems of the same sort
  

    constructor() {
        //create some gameItems
        this._ship = new Character('ship');
        this._timer = new Timer('timer');
        this._finishline = new Finishline('finishline');
        this._asteroid[0] = new Asteroid( 'asteroid-1', 1, 300, 400);
        this._asteroid[1] = new Asteroid( 'asteroid-2', 2, -600, 200);
        this._asteroid[2] = new Asteroid( 'asteroid-3', 3, -220, 250);
        this._asteroid[3] = new Asteroid( 'asteroid-4', 4, 500, 200);
        this._asteroid[4] = new Asteroid( 'asteroid-5', 5, 100, 200);
        this._asteroid[5] = new Asteroid( 'asteroid-6', 6, 350, -100);
        this._asteroid[6] = new Asteroid( 'asteroid-7', 7, 150, -100);
        this._asteroid[7] = new Asteroid( 'asteroid-8', 8, 500, -500);

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
            this._asteroid[index].draw(this._element)
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
        const finishRect = document.getElementById('finishline').getBoundingClientRect();
        const shipRect = document.getElementById('ship').getBoundingClientRect();
        const asteroidtRect = document.getElementById('asteroid-1').getBoundingClientRect();

        // if (asteroidtRect.bottom = shipRect.top) {
        //     console.log('collision');
        // } else {
        //     console.log('no collision');
        // }

        // console.log(shipRect.bottom)
        // console.log(asteroidtRect.bottom)
        // console.log(shipRect.left)
        // console.log(asteroidtRect.left)

        // console.log(finishRect.bottom);

        if (shipRect.bottom < 8.662498474121094) {
            // this._timer.addScore();
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
    requestAnimationFrame(this.loop)
  }
}