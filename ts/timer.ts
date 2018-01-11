/// <reference path="gameItem.ts" />

class Timer extends GameItem {
    //fields
    private _time: number = 0;
    private _started: boolean = false;

    //constructor
    constructor(name: string, id: number, xPosition: number = 0, yPosition: number = 0) {
        super(name, id, xPosition, yPosition);
        this._time = 0;
        console.log("create a new timer");
    }

    //function that starts the timer
    public startTime(): void {
        console.log("Start timer");
        this._started = true;
        setTimeout(this.interval, 1000);
    }

    public interval = () => {
        console.log("interval");
        this._time += 1;
        console.log(this._time);
        this.render();
        if (this._started)
            setTimeout(this.interval, 1000);

    }

    //function that stops the timer
    public stopTimer(): void {
        this._started = false;
        console.log("Stop timer");
    }

    //function that checks if the timer is on
    public doesntRun(): boolean {
        return !this._started;
    }

    public draw(container: HTMLElement): void {
        //create div
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._id.toString();

        //create p
        const p = document.createElement('p');
        p.innerHTML = 'Your time: ';

        //create span
        const span = document.createElement('span');
        span.innerHTML = this._time.toString();

        //append elements
        p.appendChild(span);
        this._element.appendChild(p);
        container.appendChild(this._element);
    }

    public drawRestart(container: HTMLElement): void {
        //create div
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._id.toString();
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;

        //Create a restart button
        const button = document.createElement('button');
        button.id = 'restart';
        button.innerHTML = 'restart';
        button.addEventListener('click', this.startHandler);

        //append elements
        this._element.appendChild(button);
        container.appendChild(this._element);
    }

    //update the state of the timer in the DOM
    public render(): void {
        //get the contents of span
        const timeSpan = (<HTMLElement>this._element);
        timeSpan.innerHTML = 'Your time: ' + this._time.toString();
        console.log(this);
    }

    private startHandler = (e : Event)=>{
        location.reload();
    }
}