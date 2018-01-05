/// <reference path="gameItem.ts" />

class Timer extends GameItem {
    private _time: number;
    private _started: boolean;
    private _start: number;
    

    constructor(name: string) {
        super(name);
        this._time = 0;
       
    }

    public get time(): number {
        return this._time;
    }

    public start(): void {
        this._started = true;
    }

    public stop(): void {
        this._started = false;
    }

    
    public draw(container: HTMLElement): void {
        //create div
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;

        //create p
        const p = document.createElement('p');
        p.innerHTML = 'The score is: ';

        //create span
        const span = document.createElement('span');
        span.innerHTML = this._time.toString();

        //append elements
        p.appendChild(span);
        this._element.appendChild(p);
        container.appendChild(this._element);
    }


    //update the state of the Scoreboard in the DOM
    public render(): void {
        //get the contents of span
        const scoreSpan = (<HTMLElement>this._element.childNodes[0].childNodes[1]);
        scoreSpan.innerHTML = this._time.toString();
    }
   
    // public addTime(): void {
    //     this._time += 1;
    // }

}