class Game {

    //fields/attributes
    private _element: HTMLElement = document.getElementById('container');
    private _ship: Character;
    private _timer: Timer;
    private _finishline: Finishline;
    private _asteroid: Array<Asteroid> = new Array(); //use an array if you have multiple gameItems of the same sort
  

    constructor() {
        //create some gameItems
        this._ship = new Character('ship', 1);
        this._timer = new Timer('timer', 1);
        this._finishline = new Finishline('finishline', 1);
        this._asteroid[0] = new Asteroid( 'asteroid-1', 1, 200, 0);
        this._asteroid[1] = new Asteroid( 'asteroid-2', 2, 300, -150);
        this._asteroid[2] = new Asteroid( 'asteroid-3', 3, -100, -50);
        this._asteroid[3] = new Asteroid( 'asteroid-4', 4, 150, 0);
        this._asteroid[4] = new Asteroid( 'asteroid-5', 5, 75, 250);
        this._asteroid[5] = new Asteroid( 'asteroid-6', 6, 400, 300);
        this._asteroid[6] = new Asteroid( 'asteroid-7', 7, -250, -600);
        this._asteroid[7] = new Asteroid( 'asteroid-8', 8, 400, -50);
        this._asteroid[8] = new Asteroid( 'asteroid-9', 9, 700, 100);
        this._asteroid[9] = new Asteroid( 'asteroid-10', 10, -800, -100);

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
        const finishRect = document.getElementById('1').getBoundingClientRect();
        const shipRect = document.getElementById('1').getBoundingClientRect();

        let index: any;
        let _idNumber: number = 1;
        for (index = 1; index < 11; index++) {
            let _idName: string = _idNumber.toString();
            const asteroidtRect = document.getElementById(_idName).getBoundingClientRect();
            if (shipRect.right == asteroidtRect.left && shipRect.bottom == asteroidtRect.bottom) {
                console.log("collision with Asteroid")
            }
            else if(shipRect.top >= asteroidtRect.bottom && shipRect.right <= asteroidtRect.left && shipRect.right >= asteroidtRect.left){
                console.log("collision with Asteroid")
            } else {
                console.log("no collision with Asteroid")
            }
            _idNumber++;

        // }

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
  }

  private startHandler = (e : Event)=>{
    Events.trigger('startPosition', {temp:'someInformation'});
    //this._scoreboard.resetScore(0); //without pub sub system
    this._timer.start(); //maybe own class.
    this.loop(); //call the gameloop
}
}
